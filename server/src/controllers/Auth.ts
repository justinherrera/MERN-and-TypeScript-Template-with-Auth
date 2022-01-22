import User from 'models/User'
import handle from 'middlewares/handle'
import jwt from 'jsonwebtoken'
import config from '../config/index'
import { sendEmail } from '../utils/Email'
import crypto from 'crypto'

import { Request, Response, NextFunction } from "express"
import { LogError } from 'utils/LogError'

import 'express';

declare module 'express' {
  interface Request {
    user?: any;
  }
}

interface JwtPayload {
  id: string
  iat: number
  exp: number
}

const createToken = (user: { _id: string, password: string }, statusCode: number, res: Response) => {

    const id = user._id

    const token = jwt.sign({ id }, config.jwt.secretKey, {
        expiresIn: config.jwt.jwtExpiresIn,
    });

    const cookieOptions = {
      expires: new Date(
        Date.now() + Number(config.jwt.cookieExpiresIn) * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };

    res.cookie('jwt', token, cookieOptions);
  
    // Remove password from output
    user.password = undefined;
  
    res.status(statusCode).json({
      status: 'success',
      token,
      data: {
        user,
      },
    });

  };

export const signup =  handle(async (req: Request, res: Response): Promise<any> => {

        console.log('signup controller')

        const user = await User.create(req.body)

        createToken(user, 201, res)
    })

export const login = handle(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new LogError('Please provide email and password!', 400));
    }

    const user = await User.findOne({
      email,
    }).select('+password');
  
    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new LogError('Incorrect email or password', 401));
    }
  
    createToken(user, 200, res);
})

export const logout = handle(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 60 * 1000),
    httpOnly: true
  })
  res.status(200).json({ status: 'success' })
})


export const isAuth = handle(async (req: Request, res: Response, next: NextFunction): Promise<any> => {

    let token;
    if ( req.headers.authorization && req.headers.authorization.startsWith('Bearer') ) 
    {
      token = req.headers.authorization.split(' ')[1];
    }
    else if ( req.cookies.jwt )
    {
      token = req.cookies.jwt
    }


    if (!token) {
      return next(new LogError('You are not logged in!', 401));
    }

    const { id, iat, exp } = await jwt.verify(token, config.jwt.secretKey) as JwtPayload;

    const currentUser = await User.findById(id);

    if (!currentUser) {
      return next(
        new LogError('The user belonging to this token is no longer exists.', 401)
      );
    }


    if (currentUser.modifiedPassword(iat)) {
      return next(
        new LogError('User recently changed password, Please login again', 401)
      );
    }
  
    // Grant Access to Protected Route
    req.user = currentUser;
    res.locals.user = currentUser;
    next();
})


export const forgotPassword = handle(async (req: Request, res: Response, next: NextFunction): Promise<any> => {

  const user = await User.findOne({
    email: req.body.email,
  });

  if (!user) {
    return next(new LogError('There is no user with email address.', 404));
  }

  // Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({
    validateBeforeSave: false, // deactivate validators in schema
  });

  // Send it to user's email
  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/users/resetPassword/${resetToken}`;

  console.log(resetURL)

  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}. \nIf not, please ignore this email`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset token (valid for 10 min)',
      message,
    });

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email',
    });
  } catch (err) {

    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    
    await user.save({
      validateBeforeSave: false,
    });

    return next(new LogError('There was an error sending an email. Try again later', 500 ));
  }
})

export const resetPassword = handle(async (req: Request, res: Response, next: NextFunction): Promise<any> => {

  console.log('reset password function')
  console.log(req.params.token)

  // Get user based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // If token has not expired, and there is user, set the new password
  if (!user) {
    return next(new LogError('Token is invalid or has expired', 400));
  }

  if (!req.body.password) {
    res.json({
      message: 'Please provide a password'
    })
  } else if (!req.body.passwordConfirm) {
    res.json({
      message: 'Please confirm password'
    })
  }

  if(req.body.password !== req.body.passwordConfirm) {
    res.json({
      message: 'Passwords do not match'
    })
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // Update changedPasswordAt property for the user
  // Log user in, send JWT
  createToken(user, 201, res);
})
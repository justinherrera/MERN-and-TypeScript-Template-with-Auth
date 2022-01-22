import { body, validationResult, CustomValidator } from 'express-validator'
import User from 'models/User'

import { Request, Response, NextFunction } from "express"

type Errors = {
    [key: string]: string
}

interface err {
    param: string;
    msg: string;
}


interface UserDocument {
    name: string;
    email: string;
    active: boolean;
}

const isNameEmpty: CustomValidator = (value: string | undefined) => {
    if(value === undefined || value === '') {
        throw new Error('Please provide a name')
    }

    return true
}

const matchPassword: CustomValidator = (value: string | undefined, { req }) => {
    console.log(req.originalUrl.startsWith('/api'))
    if(value === undefined || value === '') {
        throw new Error('Please confirm password')
    }
    else if(value !== req.body.password) {
        throw new Error('Passwords do not match')
    }

    return true;
}

const isEmailExists: CustomValidator = async (value: string) => {
    await User.findOne({ email: value }).then((user: UserDocument): Promise<string> => {
        if (user) return Promise.reject('Email is already in use')
    })
}

export const userValidationRules = () => {
        return [

            // name must be provided
            body('name').toLowerCase().trim().custom(isNameEmpty),

            // email must be a valid email
            body('email').toLowerCase()
                .isEmail()
                .withMessage('Please provide a valid email')
                .normalizeEmail().custom(isEmailExists),

            // password must be at least 8 chars long
            body('password').isLength({ min: 8 })
            .withMessage('Password must be at least 8 characters long'),
            

            // passwords must match && must provided
            body('passwordConfirm').custom(matchPassword)
          ]
    }

export const validate = (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req)
        
        if (errors.isEmpty()) {
          return next()
        }

        const extractedErrors: Errors[] = []
        errors.array().map((err: err) => extractedErrors.push({ [err.param]: err.msg }))
      
        return res.status(422).json({
          success: "false",
          errors: extractedErrors,
        })
    }

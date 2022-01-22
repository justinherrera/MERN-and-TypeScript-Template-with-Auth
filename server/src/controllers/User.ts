import handle from 'middlewares/handle'
import User from 'models/User'
import { LogError } from 'utils/LogError'

import { Request, Response, NextFunction } from "express"


export const getAllUsers = handle(async (req: Request, res: Response): Promise<any> => {
        const users = await User.find({})

        res.json({ users })
})

export const getUser = handle(async (req: Request, res: Response): Promise<any> => {
        const user = await User.findById(req.params.id)

        res.json({ user })
})

export const updateProfile = handle(async (req: Request, res: Response, next: NextFunction): Promise<any> => {

        if (req.body.email || req.body.password) {
                res.json( {
                        status: 400,
                        message: "Email and Password is not allowed to update"
                } )
        }

        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true,
        });

        console.log(user)
          
        if (!user) {
                return next(new LogError('No document found with that ID', 404));
        }
          
        res.status(200).json({
                status: 'success',
                data: user
        });
})



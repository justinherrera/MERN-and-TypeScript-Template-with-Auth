import { body, validationResult, CustomValidator } from 'express-validator'
import Employer from 'models/Employer'

import { Request, Response, NextFunction } from "express"

type Errors = {
    [key: string]: string
}

interface err {
    param: string;
    msg: string;
}

interface EmployerDocument {
    company_name: string
    company_email: string
    company_address: string
    contact_name: string
    contact_tel: string
    active: boolean;
}

const isNameEmpty: CustomValidator = (value: string | undefined) => {
    if(value === undefined || value === '') {
        throw new Error('Please provide a name')
    }

    return true
}

const isEmailExists: CustomValidator = async (value: string) => {
    await Employer.findOne({ company_email: value }).then((employer: EmployerDocument): Promise<string> => {
        console.log(employer)
        if (employer) return Promise.reject('Email is already in use')
    })
}

export const employerValidationRules = () => {
        return [

            // name must be provided
            body('company_name').toLowerCase().trim().custom(isNameEmpty),

            // email must be a valid email
            body('company_email').toLowerCase()
                .isEmail()
                .withMessage('Please provide a valid email')
                .normalizeEmail().custom(isEmailExists),
                
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

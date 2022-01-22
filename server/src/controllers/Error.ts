import { NextFunction, Request, Response } from "express"

interface Error {
    statusCode: number
    name: string
    status: string
    message: string
    stack: string
}

const sendErrorDev = (err: Error, req: Request, res: Response) => {
    console.log(err.message)
    return res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    });   
};

const error = (err: Error, req: Request, res: Response, next: NextFunction) => {

    if(process.env.ENVIRONMENT === 'development') {
        if(err.name == 'JsonWebTokenError') {
            err.message = 'Invalid token. Please login.'
        }

        if(err.name == 'tokenExpiredError') {
            err.message = 'Your token has expired. Please login.'
        }
    
        err.statusCode = err.statusCode || 500;
        err.status = err.status || 'error'
    
        sendErrorDev(err, req, res);
    }

}

export default error
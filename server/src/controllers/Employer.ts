import handle from 'middlewares/handle'
import Employer from 'models/Employer'

import { Request, Response } from "express"


export const createEmployer = handle(async (req: Request, res: Response): Promise<any> => {
    const employer = await Employer.create(req.body)

    res.json({ employer })
})

export const getAllEmployers = handle(async (req: Request, res: Response): Promise<any> => {
        const employers = await Employer.find({})

        res.json({ employers })
})

export const getAllEmployer = handle(async (req: Request, res: Response): Promise<any> => {
        const employer = await Employer.findById(req.params.id)

        res.json({ employer })
})


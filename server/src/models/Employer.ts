import mongoose, { Schema, Document } from 'mongoose'
import bcrypt from 'bcrypt'

import { NextFunction } from "express"

interface EmployerInterface extends Document {
    company_name: string;
    company_email: string;
    company_address: string;
    contact_name: string;
    contact_tel: string;
    active: boolean;
}

const Employer = new Schema({
    company_name: String,
    company_email: String,
    company_address: String,
    contact_name: String,
    contact_tel: String,
    active: {
        type: Boolean,
        default: true,
        select: false
    }
})

  
export default mongoose.model<EmployerInterface>('Employer', Employer)
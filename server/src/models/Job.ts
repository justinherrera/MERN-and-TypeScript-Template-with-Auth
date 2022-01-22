import mongoose, { Schema, Document } from 'mongoose'

import { NextFunction } from "express"

interface JobInterface extends Document {
    posted_by: string;
    job_type: string;
    created_at: Date;
    job_description: string;
    job_location: string;
    active: boolean;
}

const Job = new Schema({
    posted_by: String,
    job_title: String,
    job_type: String,
    job_description: String,
    job_location: String,
    job_salary: Number,
    created_at: Date,
    active: Boolean
})

  
export default mongoose.model<JobInterface>('Job', Job)
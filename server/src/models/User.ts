import mongoose, { Schema, Document } from 'mongoose'
import bcrypt from 'bcrypt'
import crypto from 'crypto'

import { NextFunction } from "express"

interface UserInterface extends Document {
    _id: string;
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
    passwordChangedAt: Date;
    passwordResetToken: string,
    passwordResetExpires: number,
    active: boolean;
    correctPassword: (inputPassword: string, userPassword: string) => Promise<boolean>
    modifiedPassword: (jwtTimeStamp: number) => boolean
    createPasswordResetToken: () => string
}

const User = new Schema<UserInterface>({
    name: String,
    email: String,
    password: {
        type: String,
        required: true,
        select: false
    },
    passwordConfirm: String,
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Number,
    active: {
        type: Boolean,
        default: true,
        select: false
    }
})

User.pre<UserInterface>("save", async function (next: NextFunction) {

    if (!this.isModified("password")) return next();
  
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
  
    next();
})

User.methods.correctPassword = async (inputPassword, userPassword) => {
    return await bcrypt.compare(inputPassword, userPassword)
}

User.methods.modifiedPassword = function (jwtTimeStamp) {

    const passwordChangedAt = this.passwordChangedAt
    
    if (passwordChangedAt) {
        const changedTimestamp = passwordChangedAt.getTime() / 1000;
        return jwtTimeStamp < changedTimestamp; // Password has been changed
      }
    
      // False means not changed
      return false;
}

User.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  
    console.log({ resetToken }, this.passwordResetToken);
    return resetToken; 
}
  
export default mongoose.model<UserInterface>('User', User)
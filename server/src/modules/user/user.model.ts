import { Schema, model } from 'mongoose'
import { UserDocument } from './user.types'

const UserSchema = new Schema({
  avatar: { type: String, required: true },
  username: { type: String, required: true },
})

export const UserModel = model<UserDocument>('User', UserSchema)

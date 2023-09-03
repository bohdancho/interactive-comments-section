import { Schema, model } from 'mongoose'
import { UserDocument } from './user.types'

const UserSchema = new Schema({
  avatar: String,
  username: String,
})

export const UserModel = model<UserDocument>('User', UserSchema)

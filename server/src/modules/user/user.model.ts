import { Schema, model } from 'mongoose'
import { UserDocument } from '.'

const UserSchema = new Schema({
  avatar: String,
  username: String,
})

export const UserModel = model<UserDocument>('Users', UserSchema)

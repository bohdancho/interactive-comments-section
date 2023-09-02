import { Repository } from '@server/common'
import { Schema, model } from 'mongoose'
import { CreateUserDto, UpdateUserDto, UserDocument } from '.'

const UserSchema = new Schema({
  avatar: String,
  username: String,
})

export const UserModel = model<UserDocument>('User', UserSchema)
export const userRepository = new Repository<UserDocument, CreateUserDto, UpdateUserDto>(UserModel)

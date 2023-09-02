import { UserData } from '@shared/types'
import { Document } from 'mongoose'

export type UserDocument = UserData & Document

export type CreateUserDto = Partial<Omit<UserData, '_id'>>
export type UpdateUserDto = Partial<Omit<UserData, '_id'>>

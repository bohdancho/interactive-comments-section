import { UserData } from '@shared/types'

export type UserDocument = UserData & Document

export type CreateUserDto = Partial<Omit<UserData, '_id'>>
export type UpdateUserDto = Partial<Omit<UserData, '_id'>>

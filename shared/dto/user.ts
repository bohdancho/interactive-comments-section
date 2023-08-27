import { UserData } from '../types'

export type CreateUserDto = Omit<UserData, '_id'>

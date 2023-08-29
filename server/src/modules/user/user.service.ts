import { UserData } from '@shared/types'
import { Types } from 'mongoose'
import { UserDocument, UserModel } from '.'

export class UserService {
  async create({ username, avatar }: Omit<UserData, '_id'>): Promise<UserDocument> {
    const user = new UserModel({ username, avatar })

    await user.save()

    return user
  }

  async findOne(id: Types.ObjectId): Promise<UserDocument | null> {
    const user = await UserModel.findById(id)
    return user
  }
}

export const userService = new UserService()

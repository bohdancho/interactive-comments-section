import { CreateUserDto } from '@shared/dto'
import { ObjectId } from 'mongoose'
import { UserDocument, UserModel } from '.'

export class UserService {
  async create({ username, avatar }: CreateUserDto): Promise<UserDocument> {
    const user = new UserModel({ username, avatar })

    await user.save()

    return user
  }

  async findOne(id: ObjectId): Promise<UserDocument> {
    const user = await UserModel.findById(id)
    if (!user) throw new Error('User not found.')
    return user
  }
}

export const userService = new UserService()

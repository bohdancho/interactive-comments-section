import { CreateUserDto } from '@shared/dto'
import { ObjectId } from 'mongoose'
import { UserDocument, UserModel } from '.'

export class UserService {
  async create({ username, avatar }: CreateUserDto): Promise<UserDocument> {
    return new UserModel({ username, avatar })
  }

  async find(id: ObjectId): Promise<UserDocument> {
    const user = await UserModel.findById(id)
    if (!user) throw new Error('User not found.')
    return user
  }
}

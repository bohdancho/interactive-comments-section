import { Types } from 'mongoose'
import { CreateUserDto, UpdateUserDto, UserDocument, UserModel } from '.'

export class UserService {
  async findOne(id: Types.ObjectId): Promise<UserDocument | null> {
    return await UserModel.findById(id)
  }

  async findAll(): Promise<UserDocument[]> {
    return await UserModel.find()
  }

  async create({ username, avatar }: CreateUserDto): Promise<UserDocument> {
    return await new UserModel({ username, avatar }).save()
  }

  async update(id: Types.ObjectId, payload: UpdateUserDto): Promise<UserDocument | null> {
    return await UserModel.findByIdAndUpdate(id, payload, { new: true })
  }

  async delete(id: Types.ObjectId): Promise<UserDocument | null> {
    return await UserModel.findByIdAndDelete(id)
  }
}

export const userService = new UserService()

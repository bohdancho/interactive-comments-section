import { Service } from '@server/common'
import { Types } from 'mongoose'
import { CreateUserDto, UpdateUserDto, UserDocument, UserModel } from '.'

export class UserService implements Service<UserDocument> {
  async findOne(id: Types.ObjectId) {
    return await UserModel.findById(id)
  }

  async findAll() {
    return await UserModel.find()
  }

  async create({ username, avatar }: CreateUserDto) {
    return await new UserModel({ username, avatar }).save()
  }

  async update(id: Types.ObjectId, payload: UpdateUserDto) {
    return await UserModel.findByIdAndUpdate(id, payload, { new: true })
  }

  async delete(id: Types.ObjectId) {
    return await UserModel.findByIdAndDelete(id)
  }
}

export const userService = new UserService()

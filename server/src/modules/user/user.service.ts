import { Repository, Service } from '@server/common'
import { Types } from 'mongoose'
import { userRepository } from './user.model'
import { CreateUserDto, UpdateUserDto, UserDocument } from './user.types'

export class UserService implements Service<UserDocument> {
  constructor(private repository: Repository<UserDocument, CreateUserDto, UpdateUserDto>) {}

  findOne = (id: Types.ObjectId) => this.repository.findOne(id)
  findAll = () => this.repository.findAll()
  create = (payload: CreateUserDto) => this.repository.create(payload)
  update = (id: Types.ObjectId, payload: UpdateUserDto) => this.repository.update(id, payload)
  delete = (id: Types.ObjectId) => this.repository.delete(id)
}

export const userService = new UserService(userRepository)

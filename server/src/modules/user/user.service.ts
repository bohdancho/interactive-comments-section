import { IService, Repository } from '@server/common'
import mongoose from 'mongoose'

export class UserService<D extends mongoose.Document, CreateDto, UpdateDto extends mongoose.UpdateQuery<D>>
  implements IService<D, CreateDto, UpdateDto>
{
  constructor(private repository: Repository<D, CreateDto, UpdateDto>) {}

  findOne = (id: mongoose.Types.ObjectId) => this.repository.findOne(id)
  findAll = () => this.repository.findAll()
  create = (payload: CreateDto) => this.repository.create(payload)
  update = (id: mongoose.Types.ObjectId, payload: UpdateDto) => this.repository.update(id, payload)
  delete = (id: mongoose.Types.ObjectId) => this.repository.delete(id)
}

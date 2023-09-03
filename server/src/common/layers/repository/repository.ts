import { ErrorNotFound } from '@server/common'
import mongoose from 'mongoose'
import { IRepository } from './repository.interface'

export class Repository<D extends mongoose.Document, CreateQuery, UpdateQuery extends mongoose.UpdateQuery<D>>
  implements IRepository<D, CreateQuery, UpdateQuery>
{
  constructor(private model: mongoose.Model<D>) {}

  findOne(id: mongoose.Types.ObjectId) {
    return this.model.findById(id)
  }

  findAll() {
    return this.model.find()
  }

  create(payload: CreateQuery) {
    return new this.model(payload).save()
  }

  async update(id: mongoose.Types.ObjectId, payload: UpdateQuery) {
    const newItem = await this.model.findByIdAndUpdate(id, payload, { new: true })
    if (!newItem) throw new ErrorNotFound()
    return newItem
  }

  async delete(id: mongoose.Types.ObjectId) {
    const deletedItem = await this.model.findByIdAndDelete(id)
    if (!deletedItem) throw new ErrorNotFound()
  }
}

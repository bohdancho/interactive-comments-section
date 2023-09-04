import { ErrorNotFound } from '@server/common'
import mongoose from 'mongoose'
import { IRepository } from './repository.interface'

export class Repository<D extends mongoose.Document> implements IRepository<D> {
  constructor(private model: mongoose.Model<D>) {}

  findOne(id: mongoose.Types.ObjectId) {
    return this.model.findById(id)
  }

  findAll() {
    return this.model.find()
  }

  create(payload?: unknown) {
    return new this.model(payload).save()
  }

  async update(id: mongoose.Types.ObjectId, payload: mongoose.UpdateQuery<D>) {
    const updated = await this.model.findByIdAndUpdate(id, payload, { new: true })
    if (!updated) throw new ErrorNotFound()
    return updated
  }

  async delete(id: mongoose.Types.ObjectId) {
    const deletedItem = await this.model.findByIdAndDelete(id)
    if (!deletedItem) throw new ErrorNotFound()
  }
}

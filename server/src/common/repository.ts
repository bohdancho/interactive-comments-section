import { ErrorNotFound } from '@server/common'
import { Document, Model, Types, UpdateQuery } from 'mongoose'

export class Repository<D extends Document, CreateDto, UpdateDto extends UpdateQuery<D>> {
  constructor(private model: Model<D>) {}

  findOne(id: Types.ObjectId): Promise<D | null> {
    return this.model.findById(id)
  }

  findAll(): Promise<D[]> {
    return this.model.find()
  }

  create(payload: CreateDto): Promise<D> {
    return new this.model(payload).save()
  }

  async update(id: Types.ObjectId, payload: UpdateDto): Promise<D> {
    const newItem = await this.model.findByIdAndUpdate(id, payload, { new: true })
    if (!newItem) throw new ErrorNotFound()
    return newItem
  }

  async delete(id: Types.ObjectId): Promise<void> {
    const deletedItem = await this.model.findByIdAndDelete(id)
    if (!deletedItem) throw new ErrorNotFound()
  }
}

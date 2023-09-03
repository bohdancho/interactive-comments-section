import { Document, Types, UpdateQuery } from 'mongoose'

export interface IRepository<D extends Document, CreateDto, UpdateDto extends UpdateQuery<D>> {
  findOne(id: Types.ObjectId): Promise<D | null>
  findAll(): Promise<D[]>
  create(payload: CreateDto): Promise<D>
  update(id: Types.ObjectId, payload: UpdateDto): Promise<D>
  delete(id: Types.ObjectId): Promise<void>
}

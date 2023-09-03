import mongoose from 'mongoose'
export interface IRepository<D extends mongoose.Document, CreateQuery, UpdateQuery> {
  findOne(id: mongoose.Types.ObjectId): Promise<D | null>
  findAll(): Promise<D[]>
  create(payload: CreateQuery): Promise<D>
  update(id: mongoose.Types.ObjectId, payload: UpdateQuery): Promise<D>
  delete(id: mongoose.Types.ObjectId): Promise<void>
}

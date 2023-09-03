import mongoose from 'mongoose'
export interface IRepository<D extends mongoose.Document> {
  findOne(id: mongoose.Types.ObjectId): Promise<D | null>
  findAll(): Promise<D[]>
  create(payload: unknown): Promise<D>
  update(id: mongoose.Types.ObjectId, payload: mongoose.UpdateQuery<D>): Promise<D>
  delete(id: mongoose.Types.ObjectId): Promise<void>
}

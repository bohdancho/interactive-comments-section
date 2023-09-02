import { Document, Types } from 'mongoose'

export interface Service<D extends Document> {
  findOne(id: Types.ObjectId): Promise<D | null>
  findAll(): Promise<D[]>
  create(...args: unknown[]): Promise<D>
  update(...args: unknown[]): Promise<D>
  delete(id: Types.ObjectId): Promise<void>
}

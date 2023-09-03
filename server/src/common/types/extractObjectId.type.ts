import mongoose from 'mongoose'
type ObjectId = mongoose.Types.ObjectId

export type ExtractObjectId<T> = {
  [K in keyof T]: Extract<T[K], ObjectId | ObjectId[]> extends never ? T[K] : Extract<T[K], ObjectId | ObjectId[]>
}

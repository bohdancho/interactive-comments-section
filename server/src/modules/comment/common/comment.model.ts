import { Schema } from 'mongoose'

export const CommentCommonSchema = {
  createdAt: Number,
  body: String,
  author: { type: Schema.Types.ObjectId, ref: 'User' },
}

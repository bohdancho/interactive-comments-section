import { Schema } from 'mongoose'

export const CommentCommonSchema = {
  createdAt: { type: Number, required: true },
  body: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}
export const commentCommonPopulatePaths = ['author']

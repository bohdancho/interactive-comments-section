import { Schema, model } from 'mongoose'
import { RootCommentDocument } from './rootComment.types'

const RootCommentSchema = new Schema({
  createdAt: Number,
  body: String,
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  replies: [{ type: Schema.Types.ObjectId, ref: 'ReplyComment' }],
  // voting: String,
})

export const RootCommentModel = model<RootCommentDocument>('RootComment', RootCommentSchema)

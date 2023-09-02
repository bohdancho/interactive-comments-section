import { Schema, model } from 'mongoose'
import { ReplyCommentDocument } from '.'

const ReplyCommentSchema = new Schema({
  createdAt: Number,
  body: String,
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  replyTo: Object,
  // voting: String,
})

export const ReplyCommentModel = model<ReplyCommentDocument>('ReplyComment', ReplyCommentSchema)
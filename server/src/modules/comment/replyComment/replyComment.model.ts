import { Schema, model } from 'mongoose'
import { ReplyCommentDocument } from '.'

const ReplyCommentSchema = new Schema({
  createdAt: Number,
  body: String,
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  replyToUser: { type: Schema.Types.ObjectId, ref: 'User' },
  rootComment: { type: Schema.Types.ObjectId, ref: 'RootComment' },
  // voting: String,
})

export const ReplyCommentModel = model<ReplyCommentDocument>('ReplyComment', ReplyCommentSchema)

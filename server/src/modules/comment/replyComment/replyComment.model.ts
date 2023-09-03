import { Schema, model } from 'mongoose'
import { ReplyCommentDocument } from '.'
import { CommentCommonSchema } from '../common'

const ReplyCommentSchema = new Schema({
  ...CommentCommonSchema,
  replyToUser: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  rootComment: { type: Schema.Types.ObjectId, ref: 'RootComment', required: true },
  // voting: String,
})

export const ReplyCommentModel = model<ReplyCommentDocument>('ReplyComment', ReplyCommentSchema)

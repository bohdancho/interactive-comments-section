import { Schema, model } from 'mongoose'
import { CommentCommonSchema } from '../common'
import { RootCommentDocument } from './rootComment.types'

const RootCommentSchema = new Schema({
  ...CommentCommonSchema,
  replies: [{ type: Schema.Types.ObjectId, ref: 'ReplyComment' }],
  // voting: String,
})

export const RootCommentModel = model<RootCommentDocument>('RootComment', RootCommentSchema)

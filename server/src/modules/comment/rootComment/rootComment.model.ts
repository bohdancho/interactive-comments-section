import { Schema, model } from 'mongoose'
import { CommentCommonSchema, commentCommonPopulatePaths } from '../common'
import { RootCommentDocument } from './rootComment.types'

const RootCommentSchema = new Schema({
  ...CommentCommonSchema,
  replies: [{ type: Schema.Types.ObjectId, ref: 'ReplyComment' }],
  // voting: String,
})

export const RootCommentModel = model<RootCommentDocument>('RootComment', RootCommentSchema)
export const rootPopulatePaths = [...commentCommonPopulatePaths, 'replies']

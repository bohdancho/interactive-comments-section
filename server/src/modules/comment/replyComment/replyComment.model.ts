import { UserModel } from '@server/modules/user'
import { Schema, model } from 'mongoose'
import { CommentCommonSchema, commentPopulatePaths } from '../common'
import { RootCommentModel } from '../rootComment'
import { ReplyCommentDocument } from './replyComment.types'

const ReplyCommentSchema = new Schema({
  ...CommentCommonSchema,
  replyToUser: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  rootComment: { type: Schema.Types.ObjectId, ref: 'RootComment', required: true },
})

export const ReplyCommentModel = model<ReplyCommentDocument>('ReplyComment', ReplyCommentSchema)
export const replyPopulatePaths = [
  ...commentPopulatePaths,
  { path: 'replyToUser', model: UserModel },
  { path: 'rootComment', model: RootCommentModel },
]

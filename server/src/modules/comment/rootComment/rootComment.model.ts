import { Schema, model } from 'mongoose'
import { CommentCommonSchema } from '../common'
import { ReplyCommentModel, replyPopulatePaths } from '../replyComment'
import { RootCommentDocument } from './rootComment.types'

const RootCommentSchema = new Schema({
  ...CommentCommonSchema,
  replies: [{ type: Schema.Types.ObjectId, ref: 'ReplyComment' }],
})

console.log(replyPopulatePaths)
export const RootCommentModel = model<RootCommentDocument>('RootComment', RootCommentSchema)
export const rootPopulatePaths = [
  // ...commentPopulatePaths,
  {
    path: 'replies',
    model: ReplyCommentModel,
    populate: [...replyPopulatePaths],
  },
]

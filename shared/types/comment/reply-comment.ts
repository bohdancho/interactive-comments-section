import { Types } from 'mongoose'
import { CommentData } from '.'

export type ReplyCommentData = CommentData & {
  rootCommentId: Types.ObjectId
  replyToUser: string
}

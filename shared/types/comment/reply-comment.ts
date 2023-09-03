import mongoose from 'mongoose'
import { UserData } from '../user'
import { CommentData } from './comment'
import { RootCommentData } from './root-comment'

export type ReplyCommentData = CommentData & {
  rootComment: mongoose.Types.ObjectId | RootCommentData
  replyToUser: mongoose.Types.ObjectId | UserData
}

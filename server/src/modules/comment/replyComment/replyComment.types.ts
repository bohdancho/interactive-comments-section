import { ReplyCommentData } from '@shared/types'
import mongoose from 'mongoose'

export type ReplyCommentDocument = ReplyCommentData & mongoose.Document

// export type CreateReplyCommentDto = Pick<ReplyCommentData, 'author' | 'replyToUser' | 'rootComment'>
// export interface CreateReplyCommentDto {
//   author: mongoose.Types.ObjectId
//   replyToUser: mongoose.Types.ObjectId
//   rootComment: mongoose.Types.ObjectId
// }
export type CreateReplyCommentDto = Record<'author' | 'replyToUser' | 'rootComment', mongoose.Types.ObjectId>
export type UpdateReplyCommentDto = Pick<ReplyCommentData, 'body'>

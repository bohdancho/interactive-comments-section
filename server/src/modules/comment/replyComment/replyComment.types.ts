import { ReplyCommentData } from '@shared/types'
import { Document } from 'mongoose'

export type ReplyCommentDocument = ReplyCommentData & Document

export type CreateReplyCommentDto = Pick<ReplyCommentData, 'author' | 'replyToUser' | 'rootCommentId'>
export type UpdateReplyCommentDto = Pick<ReplyCommentData, 'body'>

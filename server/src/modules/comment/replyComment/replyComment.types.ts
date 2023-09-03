import { ExtractObjectId } from '@server/common/types'
import { ReplyCommentData } from '@shared/types'
import mongoose from 'mongoose'

export type ReplyCommentDocument = ReplyCommentData & mongoose.Document

export type CreateReplyCommentDto = ExtractObjectId<
  Pick<ReplyCommentData, 'author' | 'body' | 'replyToUser' | 'rootComment'>
>

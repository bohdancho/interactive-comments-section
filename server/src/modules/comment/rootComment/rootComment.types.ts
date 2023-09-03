import { ExtractObjectId } from '@server/common'
import { RootCommentData } from '@shared/types'
import { Document } from 'mongoose'

export type RootCommentDocument = RootCommentData & Document

export type CreateRootCommentDto = ExtractObjectId<Pick<RootCommentData, 'author'>>
export type UpdateRootCommentDto = Partial<Pick<RootCommentData, 'body'>>

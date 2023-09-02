import { ObjectId } from 'mongoose'
import { CommentData, ReplyCommentData } from '.'

export type RootCommentData = CommentData & { replies: ObjectId[] | ReplyCommentData[] }

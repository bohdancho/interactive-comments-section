import { ObjectId } from 'mongoose'
import { CommentData } from '.'

export type RootCommentData = CommentData & { replies: ObjectId[] }

import mongoose from 'mongoose'
import { CommentData, ReplyCommentData } from '.'

export type RootCommentData = CommentData & { replies: mongoose.Types.ObjectId[] | ReplyCommentData[] }

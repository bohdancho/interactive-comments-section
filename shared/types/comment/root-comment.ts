import { CommentData, ReplyCommentData } from '.'

export type RootCommentData = CommentData & { replies: ReplyCommentData }

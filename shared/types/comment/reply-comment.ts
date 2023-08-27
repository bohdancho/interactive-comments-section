import { CommentData } from '.'

export type ReplyCommentData = CommentData & {
  replyTo: { username: string }
}

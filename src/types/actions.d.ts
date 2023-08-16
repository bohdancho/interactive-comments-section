import { Data } from './data'

interface InitAction {
  type: 'init'
  payload: Data
}

interface CommentAction {
  type: 'comment'
  payload: { text: string }
}

interface ReplyAction {
  type: 'reply'
  payload: { text: string; replyToId: number }
}

interface DeleteCommentAction {
  type: 'deleteComment'
  payload: { id: number }
}

interface EditCommentAction {
  type: 'editComment'
  payload: { id: number; newText: string }
}

interface UpvoteAction {
  type: 'upvote'
  payload: { id: number }
}

interface DownvoteAction {
  type: 'downvote'
  payload: { id: number }
}

export type Action =
  | InitAction
  | CommentAction
  | ReplyAction
  | DeleteCommentAction
  | EditCommentAction
  | UpvoteAction
  | DownvoteAction

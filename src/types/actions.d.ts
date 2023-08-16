import { Comment } from './comment'
import { Data } from './data'

interface InitAction {
  type: 'init'
  payload: Data
}

interface UpdateCommentsAction {
  type: 'update-comments'
  payload: Comment[]
}

// interface CommentAction {
//   type: 'comment'
//   payload: { text: string }
// }

// interface ReplyAction {
//   type: 'reply'
//   payload: { text: string; replyToComment: number }
// }

// interface DeleteCommentAction {
//   type: 'deleteComment'
//   payload: { id: number }
// }

// interface EditCommentAction {
//   type: 'editComment'
//   payload: { id: number; newText: string }
// }

// interface UpvoteAction {
//   type: 'upvote'
//   payload: { id: number }
// }

// interface DownvoteAction {
//   type: 'downvote'
//   payload: { id: number }
// }

export type DataAction = InitAction | UpdateCommentsAction

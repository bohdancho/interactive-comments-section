import * as types from '../types'
import { CommentItem } from './comment/CommentItem'

export function CommentsList({
  commentsData,
}: {
  commentsData: types.Comment[]
}) {
  const getComment = (comment: types.Comment | types.Reply) => (
    <div key={comment.id} className='mb-16 last:mb-0'>
      <CommentItem comment={comment}></CommentItem>
    </div>
  )

  const commentsWithReplies = commentsData.map((commentData) => {
    const comments = [getComment(commentData)]

    commentData.replies.forEach((reply) => comments.push(getComment(reply)))
    return comments
  })

  return <>{commentsWithReplies}</>
}

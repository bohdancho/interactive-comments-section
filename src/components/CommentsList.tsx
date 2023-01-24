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
    const comment = getComment(commentData)
    const replies = commentData.replies.map((reply) => getComment(reply))

    return (
      <>
        {comment}
        <div className='pl-16 border-l-[2px] border-light-gray'>{replies}</div>
      </>
    )
  })

  return <>{commentsWithReplies}</>
}

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
    const rootComment = getComment(commentData)
    const replies = commentData.replies.length ? (
      <div className='pl-16 border-l-[2px] border-light-gray'>
        {commentData.replies.map((reply) => getComment(reply))}
      </div>
    ) : null

    return (
      <div key={commentData.id}>
        <>
          {rootComment}
          {replies}
        </>
      </div>
    )
  })

  return <>{commentsWithReplies}</>
}

import * as types from '../types'
import { CommentItem } from './comment/CommentItem'

export function CommentsList({
  commentsData,
}: {
  commentsData: types.Comment[]
}) {
  const comments = commentsData.map((comment) => (
    <div className='mb-16 last:mb-0'>
      <CommentItem key={comment.id} data={comment}></CommentItem>
    </div>
  ))

  return <>{comments}</>
}

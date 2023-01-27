import * as types from '../types'
import { CommentItem } from './comment/CommentItem'

export function CommentsList({ comments }: { comments: types.Comment[] }) {
  return (
    <>
      {comments.map((comment) => (
        <div key={comment.id} className='mb-16 last:mb-0 tablet:mb-20'>
          <CommentItem comment={comment}></CommentItem>
        </div>
      ))}
    </>
  )
}

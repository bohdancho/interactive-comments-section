import { useContext } from 'react'
import { CommentsContext } from '../App'
import { CommentItem } from './comment/CommentItem'

export function CommentsList() {
  const comments = useContext(CommentsContext)

  return (
    <>
      {comments
        ? comments.map((comment) => (
            <div key={comment.id} className='mb-16 last:mb-0 tablet:mb-20'>
              <CommentItem comment={comment}></CommentItem>
            </div>
          ))
        : null}
    </>
  )
}

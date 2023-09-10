import { AddComment } from './AddComment'
import { CommentsList } from './CommentsList'

export function CommentsSection() {
  return (
    <>
      <div className='mb-16'>
        <CommentsList></CommentsList>
      </div>
      <AddComment></AddComment>
    </>
  )
}

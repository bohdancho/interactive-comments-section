import * as types from '../types'
import { AddComment } from './AddComment'
import { CommentsList } from './CommentsList'

export function CommentsSection({
  comments,
  dispatchComments,
}: {
  comments: types.Comment[]
  dispatchComments: (comments: types.Comment[]) => void
}) {
  return (
    <>
      <div className='mb-16'>
        <CommentsList comments={comments}></CommentsList>
      </div>
      <AddComment></AddComment>
    </>
  )
}

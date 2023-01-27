import * as types from '../types'
import { AddComment } from './AddComment'
import { CommentsList } from './CommentsList'

export function CommentsSection({ comments }: { comments: types.Comment[] }) {
  return (
    <>
      <div className='mb-16'>
        <CommentsList commentsData={comments}></CommentsList>
      </div>
      <AddComment></AddComment>
    </>
  )
}


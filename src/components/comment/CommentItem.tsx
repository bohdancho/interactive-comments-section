import * as types from '../../types'
import { CommentActions } from './CommentActions'
import { CommentInfo } from './CommentInfo'
import { CommentVoting } from './CommentVoting'

export function CommentItem({ comment }: { comment: types.Comment }) {
  const info = { user: comment.user, createdAt: comment.createdAt }

  return (
    <div className='p-16 bg-white rounded grid grid-cols-[auto_auto] gap-16'>
      <div className='col-span-2'>
        <CommentInfo info={info}></CommentInfo>
      </div>
      <p className='col-span-2'>{comment.content}</p>
      <div>
        <CommentVoting></CommentVoting>
      </div>
      <CommentActions></CommentActions>
    </div>
  )
}

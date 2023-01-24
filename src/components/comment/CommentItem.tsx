import * as types from '../../types'
import { CommentActions } from './CommentActions'
import { CommentInfo } from './CommentInfo'
import { CommentVoting } from './CommentVoting'

export function CommentItem({ data }: { data: types.Comment }) {
  return (
    <div className='p-16 bg-white rounded grid grid-cols-[auto_auto] gap-16'>
      <div className='col-span-2'>
        <CommentInfo></CommentInfo>
      </div>
      <p className='col-span-2'>{data.content}</p>
      <div>
        <CommentVoting></CommentVoting>
      </div>
      <CommentActions></CommentActions>
    </div>
  )
}

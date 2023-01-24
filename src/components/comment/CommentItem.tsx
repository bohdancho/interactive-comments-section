import * as types from '../../types'
import { CommentActions } from './CommentActions'
import { CommentInfo } from './CommentInfo'
import { CommentVoting } from './CommentVoting'

export function CommentItem({ data }: { data: types.Comment }) {
  return (
    <div className='bg-white rounded-xl'>
      <CommentVoting></CommentVoting>
      <CommentInfo></CommentInfo>
      <CommentActions></CommentActions>
      <p>{data.content}</p>
    </div>
  )
}

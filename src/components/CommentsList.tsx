import * as types from '../types'
import { CommentItem } from './CommentItem'

export function CommentsList({
  commentsData,
}: {
  commentsData: types.Comment[]
}) {
  const comments = commentsData.map((comment) => (
    <CommentItem key={comment.id} data={comment}></CommentItem>
  ))

  return <>{comments}</>
}

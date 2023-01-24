import * as types from '../types'

export function CommentItem({ data }: { data: types.Comment }) {
  return (
    <>
      {data.user}
      {data.content}
    </>
  )
}

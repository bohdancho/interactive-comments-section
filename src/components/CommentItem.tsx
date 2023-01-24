import * as types from '../types'

export function CommentItem({ data }: { data: types.Comment }) {
  return (
    <div>
      <>
        {data.content}
        {data.user.username}
      </>
    </div>
  )
}

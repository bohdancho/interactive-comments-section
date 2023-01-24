import { useReducer } from 'react'
import * as types from '../../types'
import { CommentActions } from './CommentActions'
import { CommentInfo } from './CommentInfo'
import { CommentRating } from './CommentRating'

export function CommentItem({
  comment,
}: {
  comment: types.Comment | types.Reply
}) {
  const [isReplying, toggleIsReplying] = useReducer((prev) => !prev, false)

  return (
    <>
      <div className='p-16 bg-white rounded grid grid-cols-[min-content_auto] gap-16'>
        <div className='col-span-2'>
          <CommentInfo
            info={{ user: comment.user, createdAt: comment.createdAt }}
          ></CommentInfo>
        </div>
        <p className='col-span-2 text-grayish-blue'>{comment.content}</p>
        <div>
          <CommentRating rating={comment.rating}></CommentRating>
        </div>
        <CommentActions
          username={comment.user.username}
          toggleIsReplying={toggleIsReplying}
        ></CommentActions>
      </div>
      {String(isReplying)}
    </>
  )
}

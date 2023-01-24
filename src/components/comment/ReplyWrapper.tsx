import * as types from '../../types'
import { createContext, useReducer, useState } from 'react'
import { CommentItem } from './CommentItem'

export const ReplyContext = createContext<types.ReplyContextType | null>(null)

export function ReplyWrapper({
  comment,
}: {
  comment: types.Comment | types.Reply
}) {
  const [isReplying, setIsReplying] = useState(false)

  return (
    <ReplyContext.Provider
      value={{ toggleIsReplying: () => setIsReplying(!isReplying) }}
    >
      <CommentItem comment={comment}></CommentItem>
      {String(isReplying)}
    </ReplyContext.Provider>
  )
}

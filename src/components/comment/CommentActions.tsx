import * as types from '../../types'
import { useContext } from 'react'
import { UserContext } from '../CommentsSection'
import { ActionButton } from './ActionButton'
import { ReplyContext } from './ReplyWrapper'

export function CommentActions({ username }: { username: string }) {
  const currentUser = useContext(UserContext) as types.User
  const replyContext = useContext(ReplyContext) as types.ReplyContextType

  const buttons =
    currentUser.username === username ? (
      <>
        <ActionButton type='delete'></ActionButton>
        <ActionButton type='edit'></ActionButton>
      </>
    ) : (
      <ActionButton
        type='reply'
        onClick={replyContext.toggleIsReplying}
      ></ActionButton>
    )

  return <div className='flex justify-end gap-16'>{buttons}</div>
}

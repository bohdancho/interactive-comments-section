import * as types from '../../types'
import { DispatchWithoutAction, useContext } from 'react'
import { UserContext } from '../CommentsSection'
import { ActionButton } from './ActionButton'

export function CommentActions({
  username,
  toggleIsReplying,
}: {
  username: string
  toggleIsReplying: DispatchWithoutAction
}) {
  const currentUser = useContext(UserContext) as types.User

  const buttons =
    currentUser.username === username ? (
      <>
        <ActionButton type='delete'></ActionButton>
        <ActionButton type='edit'></ActionButton>
      </>
    ) : (
      <ActionButton type='reply' onClick={toggleIsReplying}></ActionButton>
    )

  return <div className='flex justify-end gap-16'>{buttons}</div>
}

import * as types from '../../types'
import { DispatchWithoutAction, useContext } from 'react'
import { ActionButton } from '../../ui'
import { UserContext } from '../../App'

export function CommentActions({
  username,
  toggleIsReplying,
  toggleIsEditing,
}: {
  username: string
  toggleIsReplying: DispatchWithoutAction
  toggleIsEditing: DispatchWithoutAction
}) {
  const currentUser = useContext(UserContext) as types.User

  const buttons =
    currentUser.username === username ? (
      <>
        <ActionButton type='delete'></ActionButton>
        <ActionButton type='edit' onClick={toggleIsEditing}></ActionButton>
      </>
    ) : (
      <ActionButton type='reply' onClick={toggleIsReplying}></ActionButton>
    )

  return <div className='flex justify-end gap-16'>{buttons}</div>
}

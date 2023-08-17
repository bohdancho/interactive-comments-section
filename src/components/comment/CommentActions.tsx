import { Dispatch, DispatchWithoutAction, useContext } from 'react'
import { DataDispatchContext } from '../../App'
import * as types from '../../types'
import { ActionButton } from '../../ui'

export function CommentActions({
  commentId,
  isOwnComment,
  toggleIsReplying,
  toggleIsEditing,
}: {
  commentId: number
  isOwnComment: boolean
  toggleIsReplying: DispatchWithoutAction
  toggleIsEditing: DispatchWithoutAction
}) {
  const dataDispatch = useContext(DataDispatchContext) as Dispatch<types.Action>
  const deleteComment = () =>
    dataDispatch({ type: 'deleteComment', payload: { id: commentId } })

  const buttons = isOwnComment ? (
    <>
      <ActionButton type='delete' onClick={deleteComment}></ActionButton>
      <ActionButton type='edit' onClick={toggleIsEditing}></ActionButton>
    </>
  ) : (
    <ActionButton type='reply' onClick={toggleIsReplying}></ActionButton>
  )

  return <div className='flex justify-end gap-16'>{buttons}</div>
}

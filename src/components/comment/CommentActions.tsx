import { Dispatch, DispatchWithoutAction, useContext, useReducer } from 'react'
import { DataDispatchContext } from '../../providers/DataProvider'
import * as types from '../../types'
import { ActionButton } from '../../ui'
import { ConfirmDelete } from './ConfirmDelete'

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
  const deleteComment = () => dataDispatch({ type: 'deleteComment', payload: { id: commentId } })
  const [isDeleting, toggleisDeleting] = useReducer((prev) => !prev, false)

  const buttons = isOwnComment ? (
    <>
      <ActionButton type='delete' onClick={toggleisDeleting}></ActionButton>
      <ActionButton type='edit' onClick={toggleIsEditing}></ActionButton>
    </>
  ) : (
    <ActionButton type='reply' onClick={toggleIsReplying}></ActionButton>
  )

  return (
    <>
      {isDeleting ? (
        <ConfirmDelete
          deleteComment={deleteComment}
          toggleIsDeleting={toggleisDeleting}
        ></ConfirmDelete>
      ) : null}
      <div className='flex justify-end gap-16'>{buttons}</div>
    </>
  )
}

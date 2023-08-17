import { Dispatch, DispatchWithoutAction, useContext, useReducer } from 'react'
import { DataDispatchContext } from '../../providers/DataProvider'
import * as types from '../../types'
import { ActionButton } from '../../ui'
import { ConfirmDelete } from './ConfirmDelete'

export function CommentActions({
  commentId,
  isOwnComment,
  toggleReplying,
  toggleEditing,
}: {
  commentId: number
  isOwnComment: boolean
  toggleReplying: DispatchWithoutAction
  toggleEditing: DispatchWithoutAction
}) {
  const dataDispatch = useContext(DataDispatchContext) as Dispatch<types.Action>
  const deleteComment = () => dataDispatch({ type: 'deleteComment', payload: { id: commentId } })
  const [isDeleting, toggleDeleting] = useReducer((prev) => !prev, false)

  const buttons = isOwnComment ? (
    <>
      <ActionButton type='delete' onClick={toggleDeleting}></ActionButton>
      <ActionButton type='edit' onClick={toggleEditing}></ActionButton>
    </>
  ) : (
    <ActionButton type='reply' onClick={toggleReplying}></ActionButton>
  )

  return (
    <>
      {isDeleting ? (
        <ConfirmDelete
          deleteComment={deleteComment}
          toggleDeleting={toggleDeleting}
        ></ConfirmDelete>
      ) : null}
      <div className='flex justify-end gap-16'>{buttons}</div>
    </>
  )
}

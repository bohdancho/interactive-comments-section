import { UIActionButton } from '@src/ui'
import { DispatchWithoutAction, useReducer } from 'react'

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
  // const dataDispatch = useContext(DataDispatchContext) as Dispatch<types.Action>
  // const deleteComment = () => dataDispatch({ type: 'deleteComment', payload: { id: commentId } })
  const [isDeleting, toggleDeleting] = useReducer((prev) => !prev, false)

  const buttons = isOwnComment ? (
    <>
      <UIActionButton type='delete' onClick={toggleDeleting}></UIActionButton>
      <UIActionButton type='edit' onClick={toggleEditing}></UIActionButton>
    </>
  ) : (
    <UIActionButton type='reply' onClick={toggleReplying}></UIActionButton>
  )

  return (
    <>
      {/* {isDeleting ? (
        <ConfirmDelete deleteComment={deleteComment} toggleDeleting={toggleDeleting}></ConfirmDelete>
      ) : null} */}
      <div className='flex justify-end gap-16'>{buttons}</div>
    </>
  )
}

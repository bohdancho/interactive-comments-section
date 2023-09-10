import { UIActionButton } from '@src/ui'
import { api } from '@src/utils'
import { DispatchWithoutAction, useReducer } from 'react'
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
  const utils = api.useContext()
  const deleteMutation = api.comment.deleteComment.useMutation({
    async onMutate({ id }) {
      await utils.comment.getAllRootComments.cancel()
      const prevData = utils.comment.getAllRootComments.getData()
      utils.comment.getAllRootComments.setData(
        undefined,
        (old) =>
          old?.reduce<typeof old>((commentAcc, comment) => {
            if (comment.id === id) {
              return commentAcc
            }
            return [
              ...commentAcc,
              {
                ...comment,
                replies: comment.replies.reduce<typeof comment.replies>((replyAcc, reply) => {
                  if (reply.id === id) {
                    return replyAcc
                  }
                  return [...replyAcc, reply]
                }, []),
              },
            ]
          }, []),
      )

      return { prevData }
    },
    onError(_err, _newPost, ctx) {
      utils.comment.getAllRootComments.setData(undefined, ctx?.prevData)
    },
    onSettled() {
      utils.comment.getAllRootComments.invalidate()
    },
  })

  const deleteComment = () => deleteMutation.mutate({ id: commentId })
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
      {isDeleting ? (
        <ConfirmDelete deleteComment={deleteComment} toggleDeleting={toggleDeleting}></ConfirmDelete>
      ) : null}
      <div className='flex justify-end gap-16'>{buttons}</div>
    </>
  )
}

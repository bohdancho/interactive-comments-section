import { User } from '@prisma/client'
import { UserContext } from '@src/providers'
import { UIButton, UITextarea } from '@src/ui'
import { RouterOutputs, api } from '@src/utils'
import { useContext, useState } from 'react'
import { AddComment } from '../AddComment'
import { CommentActions } from './CommentActions'
import { CommentInfo } from './CommentInfo'
import { CommentRating } from './CommentRating'

type Comment = RouterOutputs['comment']['getAllRootComments'][number]
type Reply = Comment['replies'][number]

export function CommentItem({
  comment,
  isReplying,
  isEditing,
  toggleReplying,
  toggleEditing,
}: {
  comment: Comment | Reply
  isReplying: boolean
  isEditing: boolean
  toggleReplying: () => void
  toggleEditing: () => void
}) {
  const currentUser = useContext(UserContext) as User
  const utils = api.useContext()
  const editMutation = api.comment.editComment.useMutation({
    async onMutate({ id, body }) {
      await utils.comment.getAllRootComments.cancel()
      const prevData = utils.comment.getAllRootComments.getData()
      utils.comment.getAllRootComments.setData(
        undefined,
        (old) =>
          old?.map((comment) => {
            if (comment.id === id) {
              return { ...comment, body }
            }

            return {
              ...comment,
              replies: comment.replies.map((reply) => (reply.id === id ? { ...reply, body } : reply)),
            }
          }),
      )

      return { prevData }
    },
    onError(_err, _newPost, ctx) {
      // If the mutation fails, use the context-value from onMutate
      utils.comment.getAllRootComments.setData(undefined, ctx?.prevData)
    },
    onSettled() {
      // Sync with server once mutation has settled
      utils.comment.getAllRootComments.invalidate()
    },
  })
  const [editValue, setEditValue] = useState(comment.body)
  const [focusEditTextarea, setFocusEditTextarea] = useState(false)

  const editComment = () => {
    const trimmedValue = editValue.trim()

    if (trimmedValue === '') {
      setEditValue('')
      setFocusEditTextarea(true)
      return
    }

    editMutation.mutate({ id: comment.id, body: trimmedValue })
    toggleEditing()
    setEditValue(editValue.trim())
  }

  const replyTo = comment.rootComment
    ? 'author' in comment.rootComment
      ? comment.rootComment.author.name
      : null
    : null

  return (
    <>
      <div className='grid grid-cols-[auto_auto] gap-16 rounded bg-white p-16 tablet:grid-cols-[min-content_1fr_min-content] tablet:grid-rows-[min-content_1fr] tablet:gap-24 tablet:p-24'>
        <div className='col-span-2 tablet:col-span-1 tablet:col-start-2 tablet:row-start-1'>
          <CommentInfo author={comment.author} createdAt={comment.createdAt}></CommentInfo>
        </div>
        <div className='col-span-2'>
          {isEditing ? (
            <div className='flex flex-col gap-16'>
              <UITextarea
                onEnter={editComment}
                placeholder='Edit your comment...'
                setValue={setEditValue}
                value={editValue}
                prefix={replyTo ? `@${replyTo} ` : undefined}
                focusTrigger={focusEditTextarea}
                setFocusTrigger={setFocusEditTextarea}
                focusOnInit={true}
                className='self-stretch'
              ></UITextarea>
              <UIButton onClick={editComment} className='self-end'>
                Update
              </UIButton>
            </div>
          ) : (
            <p className='text-grayish-blue'>
              {replyTo ? <span className='font-medium text-moderate-blue'>@{replyTo} </span> : null}
              {comment.body}
            </p>
          )}
        </div>
        <div className='tablet:row-span-2 tablet:row-start-1'>
          <CommentRating id={comment.id} rating={comment.rating} myVote={comment.myVote}></CommentRating>
        </div>
        <div className='flex justify-end tablet:col-start-3 tablet:row-start-1'>
          <CommentActions
            isOwnComment={comment.author.name === currentUser.name}
            commentId={comment.id}
            toggleReplying={toggleReplying}
            toggleEditing={toggleEditing}
          ></CommentActions>
        </div>
      </div>
      {isReplying ? (
        <div className='mt-8'>
          <AddComment
            onReply={toggleReplying}
            replyToUser={comment.author.name}
            rootCommentId={comment.rootCommentId ?? comment.id}
          ></AddComment>
        </div>
      ) : null}
    </>
  )
}

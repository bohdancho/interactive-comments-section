import { DataDispatchContext, UserContext } from '@/providers'
import * as types from '@/types'
import { UIButton, UITextarea } from '@/ui'
import { Dispatch, useContext, useState } from 'react'
import { CommentActions, CommentInfo, CommentRating } from '.'
import { AddComment } from '..'

export function CommentItem({
  comment,
  isReplying,
  isEditing,
  toggleReplying,
  toggleEditing,
}: {
  comment: types.Comment | types.Reply
  isReplying: boolean
  isEditing: boolean
  toggleReplying: () => void
  toggleEditing: () => void
}) {
  const currentUser = useContext(UserContext) as types.User
  const dataDispatch = useContext(DataDispatchContext) as Dispatch<types.Action>
  const [editValue, setEditValue] = useState(comment.content)
  const [focusEditTextarea, setFocusEditTextarea] = useState(false)

  const editComment = () => {
    const trimmedValue = editValue.trim()

    if (trimmedValue === '') {
      setEditValue('')
      setFocusEditTextarea(true)
      return
    }

    dataDispatch({
      type: 'editComment',
      payload: { id: comment.id, newText: editValue },
    })
    toggleEditing()
    setEditValue(editValue.trim())
  }

  const replyTo = 'replyingTo' in comment ? comment.replyingTo : null

  return (
    <>
      <div className='grid grid-cols-[auto_auto] gap-16 rounded bg-white p-16 tablet:grid-cols-[min-content_1fr_min-content] tablet:grid-rows-[min-content_1fr] tablet:gap-24 tablet:p-24'>
        <div className='col-span-2 tablet:col-span-1 tablet:col-start-2 tablet:row-start-1'>
          <CommentInfo info={{ user: comment.user, createdAt: comment.createdAt }}></CommentInfo>
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
              {comment.content}
            </p>
          )}
        </div>
        <div className='tablet:row-span-2 tablet:row-start-1'>
          <CommentRating
            id={comment.id}
            rating={comment.upvotedBy.length - comment.downvotedBy.length}
            upvotedByMe={comment.upvotedBy.includes(currentUser.username)}
            downvotedByMe={comment.downvotedBy.includes(currentUser.username)}
          ></CommentRating>
        </div>
        <div className='flex justify-end tablet:col-start-3 tablet:row-start-1'>
          <CommentActions
            isOwnComment={comment.user.username === currentUser.username}
            commentId={comment.id}
            toggleReplying={toggleReplying}
            toggleEditing={toggleEditing}
          ></CommentActions>
        </div>
      </div>
      {isReplying ? (
        <div className='mt-8'>
          <AddComment onReply={toggleReplying} replyToUser={comment.user.username} replyToId={comment.id}></AddComment>
        </div>
      ) : null}
    </>
  )
}

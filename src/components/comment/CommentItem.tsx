import { Dispatch, useContext, useState } from 'react'
import { DataDispatchContext } from '../../providers/DataProvider'
import { UserContext } from '../../providers/UserProvider'
import * as types from '../../types'
import { Button, Textarea } from '../../ui'
import { AddComment } from '../AddComment'
import { CommentActions } from './CommentActions'
import { CommentInfo } from './CommentInfo'
import { CommentRating } from './CommentRating'

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
      <div className='p-16 bg-white rounded grid grid-cols-[min-content_auto] gap-16 tablet:p-24 tablet:grid-cols-[min-content_auto_min-content] tablet:grid-rows-[min-content_auto] tablet:gap-24'>
        <div className='col-span-2 tablet:col-start-2 tablet:col-span-1 tablet:row-start-1'>
          <CommentInfo info={{ user: comment.user, createdAt: comment.createdAt }}></CommentInfo>
        </div>
        <div className='col-span-2'>
          {isEditing ? (
            <div className='flex flex-col gap-16'>
              <Textarea
                onEnter={editComment}
                placeholder='Edit your comment...'
                setValue={setEditValue}
                value={editValue}
                prefix={replyTo ? `@${replyTo} ` : undefined}
                focusTrigger={focusEditTextarea}
                setFocusTrigger={setFocusEditTextarea}
                focusOnInit={true}
                className='self-stretch'
              ></Textarea>
              <Button onClick={editComment} className='self-end'>
                Update
              </Button>
            </div>
          ) : (
            <p className='text-grayish-blue'>
              {replyTo ? <span className='font-medium text-moderate-blue'>@{replyTo} </span> : null}
              {comment.content}
            </p>
          )}
        </div>
        <div className='tablet:row-start-1 tablet:row-span-2'>
          <CommentRating
            id={comment.id}
            rating={comment.upvotedBy.length - comment.downvotedBy.length}
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
          <AddComment
            onReply={toggleReplying}
            replyToUser={comment.user.username}
            replyToId={comment.id}
          ></AddComment>
        </div>
      ) : null}
    </>
  )
}

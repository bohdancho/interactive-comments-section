import { Dispatch, useContext, useReducer, useState } from 'react'
import { DataDispatchContext } from '../../providers/DataProvider'
import { UserContext } from '../../providers/UserProvider'
import * as types from '../../types'
import { Button, Textarea } from '../../ui'
import { AddComment } from '../AddComment'
import { CommentActions } from './CommentActions'
import { CommentInfo } from './CommentInfo'
import { CommentRating } from './CommentRating'

export function CommentItem({ comment }: { comment: types.Comment | types.Reply }) {
  const currentUser = useContext(UserContext) as types.User
  const dataDispatch = useContext(DataDispatchContext) as Dispatch<types.Action>
  const [isReplying, toggleIsReplying] = useReducer((prev) => !prev, false)
  const [isEditing, toggleIsEditing] = useReducer((prev) => !prev, false)
  const [editValue, setEditValue] = useState(comment.content)
  const [focusEditTextarea, setFocusEditTextarea] = useState(false)

  const editComment = () => {
    if (editValue.trim() === '') {
      setFocusEditTextarea(true)
      return
    }

    dataDispatch({
      type: 'editComment',
      payload: { id: comment.id, newText: editValue },
    })
    toggleIsEditing()
  }

  const replyTo = 'replyingTo' in comment ? comment.replyingTo : null
  const hasReplies = 'replies' in comment && comment.replies.length

  return (
    <>
      <div className='p-16 bg-white rounded grid grid-cols-[min-content_auto] gap-16 tablet:p-24 tablet:grid-cols-[min-content_auto_auto] tablet:gap-24'>
        <div className='col-span-2 tablet:col-start-2 tablet:row-start-1'>
          <CommentInfo info={{ user: comment.user, createdAt: comment.createdAt }}></CommentInfo>
        </div>
        <div className='col-span-2'>
          {isEditing ? (
            <div className='flex flex-col items-end gap-16'>
              <Textarea
                placeholder='Edit your comment...'
                setValue={setEditValue}
                value={editValue}
                fixedValue={replyTo ? `@${replyTo} ` : undefined}
                focusTrigger={focusEditTextarea}
                setFocusTrigger={setFocusEditTextarea}
                focusOnInit={true}
              ></Textarea>
              <Button onClick={editComment}>Update</Button>
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
            toggleIsReplying={toggleIsReplying}
            toggleIsEditing={toggleIsEditing}
          ></CommentActions>
        </div>
      </div>
      {isReplying ? (
        <div className='mt-8'>
          <AddComment
            onReply={toggleIsReplying}
            replyToUser={comment.user.username}
            replyToId={comment.id}
          ></AddComment>
        </div>
      ) : null}
      {hasReplies ? (
        <div className='mt-16 pl-16 border-l-[2px] border-light-gray tablet:mt-20 tablet:pl-40 tablet:ml-40'>
          {comment.replies.map((reply) => (
            <div key={reply.id} className='mb-16 last:mb-0 tablet:mb-20'>
              <CommentItem comment={reply}></CommentItem>
            </div>
          ))}
        </div>
      ) : null}
    </>
  )
}

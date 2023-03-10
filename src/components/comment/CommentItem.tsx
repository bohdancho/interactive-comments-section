import { useReducer } from 'react'
import * as types from '../../types'
import { Button, Textarea } from '../../ui'
import { AddComment } from '../AddComment'
import { CommentActions } from './CommentActions'
import { CommentInfo } from './CommentInfo'
import { CommentRating } from './CommentRating'

export function CommentItem({
  comment,
}: {
  comment: types.Comment | types.Reply
}) {
  const [isReplying, toggleIsReplying] = useReducer((prev) => !prev, false)
  const [isEditing, toggleIsEditing] = useReducer((prev) => !prev, false)

  const replyTo = 'replyingTo' in comment ? comment.replyingTo : null
  const hasReplies = 'replies' in comment && comment.replies.length

  return (
    <>
      <div className='p-16 bg-white rounded grid grid-cols-[min-content_auto] gap-16 tablet:p-24 tablet:grid-cols-[min-content_auto_auto] tablet:gap-24'>
        <div className='col-span-2 tablet:col-start-2 tablet:row-start-1'>
          <CommentInfo
            info={{ user: comment.user, createdAt: comment.createdAt }}
          ></CommentInfo>
        </div>
        <div className='col-span-2'>
          {isEditing ? (
            <div className='flex flex-col items-end gap-16'>
              <Textarea
                placeholder='Edit your comment...'
                defaultValue={comment.content}
                fixedValue={replyTo ? `@${replyTo} ` : undefined}
                focusOnInit={true}
              ></Textarea>
              <Button>Update</Button>
            </div>
          ) : (
            <p className='text-grayish-blue'>
              {replyTo ? (
                <span className='font-medium text-moderate-blue'>
                  @{replyTo}{' '}
                </span>
              ) : null}
              {comment.content}
            </p>
          )}
        </div>
        <div className='tablet:row-start-1 tablet:row-span-2'>
          <CommentRating rating={comment.rating}></CommentRating>
        </div>
        <div className='flex justify-end tablet:col-start-3 tablet:row-start-1'>
          <CommentActions
            username={comment.user.username}
            toggleIsReplying={toggleIsReplying}
            toggleIsEditing={toggleIsEditing}
          ></CommentActions>
        </div>
      </div>
      {isReplying ? (
        <div className='mt-8'>
          <AddComment replyingToUser={comment.user.username}></AddComment>
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

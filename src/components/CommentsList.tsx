import { useContext, useState } from 'react'
import { DataContext } from '../providers/DataProvider'
import * as types from '../types'
import { CommentItem } from './comment/CommentItem'

const sortByScore: (a: types.Comment, b: types.Comment) => number = (a, b) => {
  const ratingA = a.upvotedBy.length - a.downvotedBy.length
  const ratingB = b.upvotedBy.length - b.downvotedBy.length
  return ratingB - ratingA
}

export function CommentsList() {
  const data = useContext(DataContext)
  const comments = data?.comments

  const [editingCommentId, setEditingCommentId] = useState<number | null>(null)
  const [replyingCommentId, setReplyingCommentId] = useState<number | null>(null)

  const toggleEditing = (id: number) => {
    if (editingCommentId === id) {
      setEditingCommentId(null)
    } else {
      setEditingCommentId(id)
      setReplyingCommentId(null)
    }
  }

  const toggleReplying = (id: number) => {
    if (replyingCommentId === id) {
      setReplyingCommentId(null)
    } else {
      setReplyingCommentId(id)
      setEditingCommentId(null)
    }
  }

  return (
    <>
      {comments
        ? comments.sort(sortByScore).map((comment) => (
            <div key={comment.id} className='mb-16 last:mb-0 tablet:mb-20'>
              <CommentItem
                comment={comment}
                isEditing={editingCommentId === comment.id}
                isReplying={replyingCommentId === comment.id}
                toggleEditing={() => toggleEditing(comment.id)}
                toggleReplying={() => toggleReplying(comment.id)}
              ></CommentItem>
              {comment.replies.length ? (
                <div className='mt-16 pl-16 border-l-[2px] border-light-gray tablet:mt-20 tablet:pl-40 tablet:ml-40'>
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className='mb-16 last:mb-0 tablet:mb-20'>
                      <CommentItem
                        comment={reply}
                        isEditing={editingCommentId === reply.id}
                        isReplying={replyingCommentId === reply.id}
                        toggleEditing={() => toggleEditing(reply.id)}
                        toggleReplying={() => toggleReplying(reply.id)}
                      ></CommentItem>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          ))
        : null}
    </>
  )
}

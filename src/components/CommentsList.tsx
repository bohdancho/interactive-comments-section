import { useContext } from 'react'
import { DataContext } from '../providers/DataProvider'
import { CommentItem } from './comment/CommentItem'

export function CommentsList() {
  const data = useContext(DataContext)
  const comments = data?.comments

  return (
    <>
      {comments
        ? comments.map((comment) => (
            <div key={comment.id} className='mb-16 last:mb-0 tablet:mb-20'>
              <CommentItem comment={comment}></CommentItem>
              {comment.replies.length ? (
                <div className='mt-16 pl-16 border-l-[2px] border-light-gray tablet:mt-20 tablet:pl-40 tablet:ml-40'>
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className='mb-16 last:mb-0 tablet:mb-20'>
                      <CommentItem comment={reply}></CommentItem>
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

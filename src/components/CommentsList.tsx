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
            </div>
          ))
        : null}
    </>
  )
}

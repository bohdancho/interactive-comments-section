import * as types from '../types'
import { useContext } from 'react'
import { UserContext } from './CommentsSection'
import { Button, Textarea, Image } from '../ui'

export function AddComment({ replyingToUser }: { replyingToUser?: string }) {
  const currentUser = useContext(UserContext) as types.User

  return (
    <form className='pt-16 px-16 pb-12 bg-white rounded'>
      <Textarea
        fixedValue={replyingToUser ? `@${replyingToUser} ` : undefined}
        focusLastChar={!!replyingToUser}
        className='mb-16'
        placeholder={!replyingToUser ? 'Add a comment...' : undefined}
      ></Textarea>
      <div className='flex justify-between items-center'>
        <Image
          className='w-32 h-32'
          image={currentUser.image}
          alt={currentUser.username}
        ></Image>
        <Button>{replyingToUser ? 'Reply' : 'Send'}</Button>
      </div>
    </form>
  )
}

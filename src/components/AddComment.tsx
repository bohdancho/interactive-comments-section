import * as types from '../types'
import { useContext } from 'react'
import { UserContext } from './CommentsSection'
import { Button, Textarea, Image } from '../ui'

export function AddComment({ isReply }: { isReply?: boolean }) {
  const currentUser = useContext(UserContext) as types.User

  return (
    <form className='pt-16 px-16 pb-12 bg-white rounded'>
      <Textarea
        className='mb-16'
        placeholder={`Add a ${isReply ? 'reply' : 'comment'}...`}
      ></Textarea>
      <div className='flex justify-between items-center'>
        <Image
          className='w-32 h-32'
          image={currentUser.image}
          alt={currentUser.username}
        ></Image>
        <Button>{isReply ? 'Reply' : 'Send'}</Button>
      </div>
    </form>
  )
}

import * as types from '../types'
import { useContext } from 'react'
import { UserContext } from './CommentsSection'
import { Button, Textarea, Image } from '../ui'

export function AddComment({ isReply }: { isReply?: boolean }) {
  const currentUser = useContext(UserContext) as types.User

  return (
    <form className='pt-16 px-16 pb-12 bg-white rounded'>
      <div className='mb-16'>
        <Textarea
          placeholder={`Add a ${isReply ? 'reply' : 'comment'}...`}
        ></Textarea>
      </div>
      <div className='flex justify-between items-center'>
        <div className='w-32 h-32'>
          <Image image={currentUser.image} alt={currentUser.username}></Image>
        </div>
        <div className='w-[104px]'>
          <Button placeholder={isReply ? 'Reply' : 'Send'}></Button>
        </div>
      </div>
    </form>
  )
}
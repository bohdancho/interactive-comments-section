import * as types from '../types'
import { useContext } from 'react'
import { UserContext } from './CommentsSection'
import { Button, Textarea, Image } from '../ui'

export function AddComment() {
  const currentUser = useContext(UserContext) as types.User

  return (
    <form className='pt-16 px-16 pb-12 bg-white rounded'>
      <div className='mb-16'>
        <Textarea placeholder='Add a comment...'></Textarea>
      </div>
      <div className='flex justify-between items-center'>
        <div className='w-32 h-32'>
          <Image image={currentUser.image} alt={currentUser.username}></Image>
        </div>
        <Button placeholder='Send'></Button>
      </div>
    </form>
  )
}

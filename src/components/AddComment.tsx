import * as types from '../types'
import { useContext } from 'react'
import { Button, Textarea, Image } from '../ui'
import { UserContext } from '../App'

export function AddComment({ replyingToUser }: { replyingToUser?: string }) {
  const currentUser = useContext(UserContext) as types.User

  return (
    <form className='pt-16 px-16 pb-12 grid grid-cols-2 items-center gap-16 bg-white rounded tablet:p-24 tablet:grid-cols-[min-content_auto_min-content] tablet:items-start'>
      <Textarea
        className='col-span-2 tablet:col-span-1 tablet:col-start-2'
        fixedValue={replyingToUser ? `@${replyingToUser} ` : undefined}
        focusLastChar={!!replyingToUser}
        placeholder={!replyingToUser ? 'Add a comment...' : undefined}
      ></Textarea>
      <Image
        className='w-32 tablet:w-40 tablet:col-start-1 tablet:row-start-1 tablet:mt-4'
        image={currentUser.image}
        alt={currentUser.username}
      ></Image>
      <Button className='justify-self-end'>
        {replyingToUser ? 'Reply' : 'Send'}
      </Button>
    </form>
  )
}

import * as types from '../types'
import { Image } from './Image'
import { useContext } from 'react'
import { UserContext } from './CommentsSection'

export function AddComment() {
  const currentUser = useContext(UserContext) as types.User

  return (
    <form className='pt-16 px-16 pb-12 bg-white rounded'>
      <textarea
        className='mb-16 py-12 pr-12 pl-24 block w-full border border-light-gray border-1 rounded focus:placeholder-transparent focus:border-moderate-blue outline-none resize-none'
        placeholder='Add a comment…'
      ></textarea>
      <div className='flex justify-between items-center'>
        <div className='w-32 h-32'>
          <Image image={currentUser.image} alt={currentUser.username}></Image>
        </div>
        <button
          className='bg-moderate-blue hover:bg-light-grayish-blue base-transition text-white py-12 px-32 rounded'
          onClick={(e) => e.preventDefault()}
        >
          Send
        </button>
      </div>
    </form>
  )
}

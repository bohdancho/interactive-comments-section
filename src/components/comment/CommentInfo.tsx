import { useContext } from 'react'
import * as types from '../../types'
import { UserContext } from '../CommentsSection'
import { Image } from '../Image'

export function CommentInfo({
  info,
}: {
  info: Pick<types.Comment, 'user' | 'createdAt'>
}) {
  const currentUser = useContext(UserContext) as types.User

  return (
    <div className='flex items-center gap-16'>
      <div className='flex items-center'>
        <div className='block w-32 mr-16'>
          <Image image={info.user.image} alt={info.user.username}></Image>
        </div>
        <span className='text-dark-blue font-medium'>{info.user.username}</span>
        {info.user.username === currentUser.username && (
          <span className='ml-8 text-sm text-white text-medium bg-moderate-blue rounded-sm pt-[1px] px-[6px] pb-[3px]'>
            you
          </span>
        )}
      </div>
      <span className='text-grayish-blue'>{info.createdAt}</span>
    </div>
  )
}

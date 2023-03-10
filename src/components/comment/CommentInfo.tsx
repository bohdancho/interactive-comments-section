import { useContext } from 'react'
import { UserContext } from '../../App'
import * as types from '../../types'
import { Image } from '../../ui/Image'

export function CommentInfo({
  info,
}: {
  info: Pick<types.Comment, 'user' | 'createdAt'>
}) {
  const currentUser = useContext(UserContext) as types.User

  return (
    <div className='flex items-center gap-16'>
      <div className='flex items-center'>
        <Image
          className='block w-32 mr-16'
          image={info.user.image}
          alt={info.user.username}
        ></Image>
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

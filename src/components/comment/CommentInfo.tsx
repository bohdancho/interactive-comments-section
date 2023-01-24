import { useContext } from 'react'
import * as types from '../../types'
import { UserContext } from '../CommentsSection'

export function CommentInfo({
  info,
}: {
  info: Pick<types.Comment, 'user' | 'createdAt'>
}) {
  const user = useContext(UserContext)

  return (
    <div className='flex items-center gap-16'>
      <div className='flex items-center'>
        <picture className='block w-32 mr-16'>
          <source
            srcSet={`avatars/image-${info.user.username}.webp`}
            type='image/webp'
          />
          <img
            src={`avatars/image-${info.user.username}.png`}
            alt={info.user.username}
          />
        </picture>
        <span className='text-dark-blue font-medium'>{info.user.username}</span>
        {info.user.username === user?.username && (
          <span className='ml-8 text-sm text-white text-medium bg-moderate-blue rounded-sm pt-[1px] px-[6px] pb-[3px]'>
            you
          </span>
        )}
      </div>
      <span className='text-grayish-blue'>{info.createdAt}</span>
    </div>
  )
}

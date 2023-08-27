import { UserContext } from '@src/providers'
import * as types from '@src/types'
import { UIImage } from '@src/ui'
import { formatTimeDifference } from '@src/utils'
import { useContext } from 'react'

export function CommentInfo({ info }: { info: Pick<types.Comment, 'user' | 'createdAt'> }) {
  const currentUser = useContext(UserContext) as types.User

  return (
    <div className='flex items-center gap-16'>
      <div className='flex items-center'>
        <UIImage className='mr-16 block w-32' image={info.user.image} alt={info.user.username}></UIImage>
        <span className='font-medium text-dark-blue'>{info.user.username}</span>
        {info.user.username === currentUser.username && (
          <span className='text-medium ml-8 rounded-sm bg-moderate-blue px-[6px] pt-[1px] pb-[3px] text-sm text-white'>
            you
          </span>
        )}
      </div>
      <span className='text-grayish-blue'>
        {typeof info.createdAt === 'number' ? formatTimeDifference(info.createdAt) : info.createdAt}
      </span>
    </div>
  )
}

import { User } from '@prisma/client'
import { UserContext } from '@src/providers'
import { formatTimeDifference } from '@src/utils'
import { useContext } from 'react'

export function CommentInfo({ author, createdAt }: { author: User; createdAt: string }) {
  const currentUser = useContext(UserContext) as User

  return (
    <div className='flex items-center gap-16'>
      <div className='flex items-center'>
        <img className='mr-16 block w-32' src={`./avatars/image-${author.name}.webp`} alt={author.name}></img>
        <span className='font-medium text-dark-blue'>{author.name}</span>
        {author.name === currentUser.name && (
          <span className='text-medium ml-8 rounded-sm bg-moderate-blue px-[6px] pt-[1px] pb-[3px] text-sm text-white'>
            you
          </span>
        )}
      </div>
      <span className='text-grayish-blue'>
        {typeof createdAt === 'number' ? formatTimeDifference(createdAt) : createdAt}
      </span>
    </div>
  )
}

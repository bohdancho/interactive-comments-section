import * as types from '../../types'

export function CommentInfo({
  info,
}: {
  info: Pick<types.Comment, 'user' | 'createdAt'>
}) {
  return (
    <div className='flex items-center gap-16'>
      <picture className='block w-32'>
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
      <span className='text-grayish-blue'>{info.createdAt}</span>
    </div>
  )
}

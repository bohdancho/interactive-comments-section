import * as types from '../../types'
import iconPlus from '../../assets/icon-plus.svg'
import iconMinus from '../../assets/icon-minus.svg'

export function CommentRating({ rating }: Pick<types.Comment, 'rating'>) {
  const getButton = (src: string, alt: string) => (
    <button className='w-40 h-40 flex items-center justify-center'>
      <img src={src} alt={alt} />
    </button>
  )

  return (
    <div className='inline-flex items-center gap-4 rounded-large bg-very-light-gray text-light-grayish-blue font-medium'>
      {getButton(iconPlus, 'upvote')}
      <span className='text-moderate-blue font-medium'>{rating}</span>
      {getButton(iconMinus, 'downvote')}
    </div>
  )
}

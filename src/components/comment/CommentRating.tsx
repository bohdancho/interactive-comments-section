import * as types from '../../types'
import iconPlus from '../../assets/icon-plus.svg'
import iconMinus from '../../assets/icon-minus.svg'
import SVG from 'react-inlinesvg'

export function CommentRating({ rating }: Pick<types.Comment, 'rating'>) {
  const getButton = (src: string, alt: string) => (
    <button className='w-40 h-40 flex items-center justify-center base-transition text-light-grayish-blue hover:text-moderate-blue'>
      <SVG src={src} />
    </button>
  )

  return (
    <div className='inline-flex items-center gap-4 rounded-large bg-very-light-gray font-medium tablet:flex-col tablet:gap-0'>
      {getButton(iconPlus, 'upvote')}
      <span className='text-moderate-blue font-medium'>{rating}</span>
      {getButton(iconMinus, 'downvote')}
    </div>
  )
}

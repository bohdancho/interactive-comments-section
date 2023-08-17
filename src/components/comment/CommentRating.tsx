import { Dispatch, useContext } from 'react'
import SVG from 'react-inlinesvg'
import { DataDispatchContext } from '../../App'
import iconMinus from '../../assets/icon-minus.svg'
import iconPlus from '../../assets/icon-plus.svg'
import * as types from '../../types'

export function CommentRating({ id, rating }: { id: number; rating: number }) {
  const dataDispatch = useContext(DataDispatchContext) as Dispatch<types.Action>
  const vote = (isUpvote: boolean) =>
    dataDispatch({ type: 'vote', payload: { id, isUpvote } })

  const getButton = (isUpvote: boolean) => (
    <button
      onClick={() => vote(isUpvote)}
      className='w-40 h-40 flex items-center justify-center base-transition text-light-grayish-blue hover:text-moderate-blue'
    >
      <SVG src={isUpvote ? iconPlus : iconMinus} />
    </button>
  )

  return (
    <div className='inline-flex items-center gap-4 rounded-large bg-very-light-gray font-medium tablet:flex-col tablet:gap-0'>
      {getButton(true)}
      <span className='text-moderate-blue font-medium'>{rating}</span>
      {getButton(false)}
    </div>
  )
}

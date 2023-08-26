import iconMinus from '@/assets/icon-minus.svg'
import iconPlus from '@/assets/icon-plus.svg'
import { DataDispatchContext } from '@/providers'
import * as types from '@/types'
import { Dispatch, useContext } from 'react'
import SVG from 'react-inlinesvg'

export function CommentRating({
  id,
  rating,
  upvotedByMe,
  downvotedByMe,
}: {
  id: number
  rating: number
  upvotedByMe: boolean
  downvotedByMe: boolean
}) {
  const dataDispatch = useContext(DataDispatchContext) as Dispatch<types.Action>
  const vote = (isUpvote: boolean) => dataDispatch({ type: 'vote', payload: { id, isUpvote } })

  const getButton = (isUpvote: boolean) => {
    const isActive = (upvotedByMe && isUpvote) || (downvotedByMe && !isUpvote)

    return (
      <button
        onClick={() => vote(isUpvote)}
        className={`${
          isActive ? 'text-moderate-blue' : 'text-light-grayish-blue'
        } base-transition flex h-40 w-40 items-center justify-center hover:text-moderate-blue active:text-dark-blue`}
      >
        <SVG src={isUpvote ? iconPlus : iconMinus} />
      </button>
    )
  }

  return (
    <div className='inline-flex items-center gap-4 rounded-large bg-very-light-gray font-medium tablet:flex-col tablet:gap-0'>
      {getButton(true)}
      <span className='font-medium text-moderate-blue'>{rating}</span>
      {getButton(false)}
    </div>
  )
}

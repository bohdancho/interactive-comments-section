import { Vote } from '@prisma/client'
import iconMinus from '@src/assets/icon-minus.svg'
import iconPlus from '@src/assets/icon-plus.svg'
import SVG from 'react-inlinesvg'

const icon = {
  [Vote.Upvote]: iconPlus,
  [Vote.Downvote]: iconMinus,
}

export function CommentRating({ id, rating, myVote }: { id: number; rating: number; myVote: Vote | undefined }) {
  // const dataDispatch = useContext(DataDispatchContext) as Dispatch<types.Action>
  // const vote = (isUpvote: boolean) => dataDispatch({ type: 'vote', payload: { id, isUpvote } })

  const getButton = (vote: Vote) => {
    // const isActive = (upvotedByMe && isUpvote) || (downvotedByMe && !isUpvote)
    const isActive = vote === myVote

    return (
      <button
        // onClick={() => vote(isUpvote)}
        className={`${
          isActive ? 'text-moderate-blue' : 'text-light-grayish-blue'
        } base-transition flex h-40 w-40 items-center justify-center hover:text-moderate-blue active:text-dark-blue`}
      >
        <SVG src={icon[vote]} />
      </button>
    )
  }

  return (
    <div className='inline-flex items-center gap-4 rounded-large bg-very-light-gray font-medium tablet:flex-col tablet:gap-0'>
      {getButton(Vote.Upvote)}
      <span className='font-medium text-moderate-blue'>{rating}</span>
      {getButton(Vote.Downvote)}
    </div>
  )
}

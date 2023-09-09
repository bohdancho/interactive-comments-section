import { Vote } from '@prisma/client'
import iconMinus from '@src/assets/icon-minus.svg'
import iconPlus from '@src/assets/icon-plus.svg'
import { api } from '@src/utils'
import SVG from 'react-inlinesvg'

const icon = {
  [Vote.Upvote]: iconPlus,
  [Vote.Downvote]: iconMinus,
}

export function CommentRating({ id, rating, myVote }: { id: number; rating: number; myVote: Vote | undefined }) {
  const voteQuery = api.voting.vote.useMutation()

  const getButton = (vote: Vote) => {
    const isActive = vote === myVote

    return (
      <button
        onClick={() => voteQuery.mutate({ commentId: id, clickedChoice: vote })}
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

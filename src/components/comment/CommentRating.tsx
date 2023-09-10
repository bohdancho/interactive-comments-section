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
  const utils = api.useContext()
  const voteMutation = api.voting.vote.useMutation({
    async onMutate({ commentId, clickedChoice }) {
      await utils.comment.getAllRootComments.cancel()
      const prevData = utils.comment.getAllRootComments.getData()
      utils.comment.getAllRootComments.setData(
        undefined,
        (old) =>
          old?.map((comment) => {
            if (comment.id === commentId) {
              return getOptimisticComment(comment, clickedChoice, rating)
            }

            return {
              ...comment,
              replies: comment.replies.map((reply) =>
                reply.id === commentId ? getOptimisticComment(reply, clickedChoice, rating) : reply,
              ),
            }
          }),
      )

      return { prevData }
    },
    onError(_err, _newPost, ctx) {
      // If the mutation fails, use the context-value from onMutate
      utils.comment.getAllRootComments.setData(undefined, ctx?.prevData)
    },
    onSettled() {
      // Sync with server once mutation has settled
      utils.comment.getAllRootComments.invalidate()
    },
  })

  const getButton = (vote: Vote) => {
    const isActive = vote === myVote

    return (
      <button
        onClick={() => voteMutation.mutate({ commentId: id, clickedChoice: vote })}
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

function getOptimisticComment<TComment extends { myVote?: Vote }>(
  comment: TComment,
  clickedChoice: Vote,
  rating: number,
): TComment {
  const newChoice = comment.myVote === clickedChoice ? undefined : clickedChoice
  return {
    ...comment,
    myVote: newChoice,
    rating: getOptimisticRating({ rating, oldChoice: comment.myVote, clickedChoice }),
  }
}

function getOptimisticRating({
  rating,
  oldChoice,
  clickedChoice,
}: {
  rating: number
  oldChoice: Vote | undefined
  clickedChoice: Vote
}): number {
  if (oldChoice === undefined) {
    return rating + getVoteValue(clickedChoice)
  }
  if (oldChoice === clickedChoice) {
    return rating - getVoteValue(clickedChoice)
  }
  return rating + 2 * getVoteValue(clickedChoice)
}

function getVoteValue(vote: Vote): number {
  switch (vote) {
    case Vote.Downvote:
      return -1
    case Vote.Upvote:
      return 1
  }
}

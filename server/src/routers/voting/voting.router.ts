import { UserVote, Vote } from '@prisma/client'
import { prisma, publicProcedure, router } from '@server/app'
import { z } from 'zod'

export const votingRouter = () =>
  router({
    vote: publicProcedure
      .input(z.object({ commentId: z.number(), clickedChoice: z.nativeEnum(Vote) }))
      .mutation(async ({ input: { commentId, clickedChoice }, ctx }) => {
        const previousChoice = (
          await prisma.userVote.findUnique({
            where: { commentId_userId: { commentId, userId: ctx.user.id } },
            select: { choice: true },
          })
        )?.choice

        const newChoice = previousChoice === clickedChoice ? undefined : clickedChoice
        const updatedVotesList = (await deleteOrUpsertVote({ newChoice, commentId, userId: ctx.user.id })).userVotes
        await prisma.comment.update({ where: { id: commentId }, data: { rating: getNewRating(updatedVotesList) } })
      }),
  })

async function deleteOrUpsertVote({
  newChoice,
  commentId,
  userId,
}: {
  newChoice: Vote | undefined
  commentId: number
  userId: number
}) {
  return await prisma.comment.update({
    where: { id: commentId },
    data: {
      userVotes: {
        delete: newChoice ? undefined : { commentId_userId: { commentId, userId } },
        upsert: newChoice
          ? {
              where: { commentId_userId: { commentId, userId } },
              update: { choice: newChoice },
              create: { choice: newChoice, userId },
            }
          : undefined,
      },
    },
    select: { userVotes: true },
  })
}

function getNewRating(updatedVotesList: UserVote[]): number {
  let upvotes = 0
  let downvotes = 0
  updatedVotesList.forEach((vote) => (vote.choice === 'Upvote' ? upvotes++ : downvotes++))
  return upvotes - downvotes
}

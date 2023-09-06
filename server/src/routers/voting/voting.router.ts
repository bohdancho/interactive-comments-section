import { UserVote, Vote } from '@prisma/client'
import { prisma, publicProcedure, router } from '@server/app'
import { z } from 'zod'

export const votingRouter = () =>
  router({
    vote: publicProcedure
      .input(z.object({ commentId: z.number(), vote: z.nativeEnum(Vote) }))
      .mutation(async ({ input: { commentId, vote }, ctx }) => {
        console.log('started')

        const comment = await prisma.comment.update({
          where: { id: commentId },
          data: {
            userVotes: {
              upsert: {
                where: { commentId_userId: { commentId, userId: ctx.user.id } },
                update: { vote },
                create: { vote, userId: ctx.user.id },
              },
            },
          },
          select: {
            userVotes: true,
          },
        })

        console.log(getNewRating(comment.userVotes))
        await prisma.comment.update({
          where: { id: commentId },
          data: { rating: getNewRating(comment.userVotes) },
        })
      }),
  })

function getNewRating(userVotes: UserVote[]) {
  const upvotes = userVotes.filter((vote) => vote.vote === Vote.Upvote).length
  const downvotes = userVotes.filter((vote) => vote.vote === Vote.Downvote).length

  return upvotes - downvotes
}

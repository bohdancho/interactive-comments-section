import { Vote } from '@prisma/client'
import { prisma, publicProcedure, router } from '@server/app'
import { TRPCError } from '@trpc/server'
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
        const increment = getRatingIncrement({ previousChoice, clickedChoice })

        await upsertOrDeleteVote({ commentId, userId: ctx.user.id, newChoice })
        await updateRating({ commentId, increment })
      }),
  })

async function upsertOrDeleteVote({
  commentId,
  userId,
  newChoice,
}: {
  commentId: number
  userId: number
  newChoice: Vote | undefined
}) {
  const commentId_userId = { commentId, userId }

  if (!newChoice) {
    await prisma.userVote.delete({ where: { commentId_userId } })
    return
  }

  await prisma.userVote.upsert({
    where: { commentId_userId },
    update: { choice: newChoice },
    create: { choice: newChoice, userId, commentId },
  })
}

function getRatingIncrement({
  previousChoice,
  clickedChoice,
}: {
  previousChoice: Vote | undefined
  clickedChoice: Vote
}): number {
  if (!previousChoice) {
    return getChoiceValue(clickedChoice)
  }
  if (previousChoice !== clickedChoice) {
    return 2 * getChoiceValue(clickedChoice)
  }
  if (previousChoice === clickedChoice) {
    return -1 * getChoiceValue(clickedChoice)
  }

  throw new TRPCError({
    code: 'INTERNAL_SERVER_ERROR',
    message: 'Something went wrong with rating',
  })
}

function getChoiceValue(choice: Vote): 1 | -1 {
  switch (choice) {
    case 'Upvote':
      return 1
    case 'Downvote':
      return -1
  }
}

async function updateRating({ commentId, increment }: { commentId: number; increment: number }): Promise<void> {
  await prisma.comment.update({ where: { id: commentId }, data: { rating: { increment } } })
}

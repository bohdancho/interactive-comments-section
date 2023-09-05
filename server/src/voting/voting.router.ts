import { Vote } from '@prisma/client'
import { prisma, publicProcedure, router } from '@server/app'
import { z } from 'zod'

export const votingRouter = () =>
  router({
    vote: publicProcedure
      .input(z.object({ commentId: z.number(), vote: z.nativeEnum(Vote) }))
      .mutation(async ({ input: { commentId, vote }, ctx }) => {
        return await prisma.userVote.upsert({
          where: { commentId_userId: { commentId, userId: ctx.user.id } },
          update: { vote },
          create: { vote, commentId, userId: ctx.user.id },
        })
      }),
  })

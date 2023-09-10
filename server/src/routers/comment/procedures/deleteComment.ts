import { prisma, publicProcedure } from '@server/app'
import { z } from 'zod'

export const deleteComment = () =>
  publicProcedure.input(z.object({ id: z.number() })).mutation(async ({ input: { id }, ctx }) => {
    return prisma.comment.delete({
      where: { id, authorId: ctx.user.id },
    })
  })

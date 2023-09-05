import { prisma, publicProcedure } from '@server/app'
import { z } from 'zod'

export const addComment = () =>
  publicProcedure
    .input(z.object({ body: z.string(), rootCommentId: z.number().optional() }))
    .mutation(async ({ input: { body, rootCommentId }, ctx }) => {
      return prisma.comment.create({
        data: {
          authorId: ctx.user.id,
          body,
          rootCommentId,
        },
      })
    })

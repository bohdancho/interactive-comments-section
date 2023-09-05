import { prisma, publicProcedure } from '@server/app'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

export const editComment = () =>
  publicProcedure
    .input(z.object({ body: z.string(), id: z.number() }))
    .mutation(async ({ input: { body, id }, ctx }) => {
      const comment = await prisma.comment.findUnique({ where: { id } })
      if (comment?.authorId !== ctx.user.id) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'You are not allowed to edit this comment.',
        })
      }

      return prisma.comment.update({
        where: { id },
        data: { body },
      })
    })

import { PrismaClient } from '@prisma/client'
import { TRPCError, initTRPC } from '@trpc/server'
import { z } from 'zod'
import { fetchUser } from './user'
import { Context } from './user/user.context'

const t = initTRPC.context<Context>().create()

export const router = t.router
export const middleware = t.middleware
export const publicProcedure = t.procedure.use(fetchUser())

export const prisma = new PrismaClient()

const findCommentDto = {
  id: true,
  createdAt: true,
  body: true,
  author: true,
  rating: true,
}
export const appRouter = router({
  comment: router({
    getAllRootComments: publicProcedure.query(() => {
      return prisma.comment.findMany({
        where: { rootComment: null },
        select: {
          ...findCommentDto,
          replies: {
            select: { ...findCommentDto },
          },
        },
      })
    }),
    addComment: publicProcedure
      .input(z.object({ body: z.string(), rootCommentId: z.number().optional() }))
      .mutation(async ({ input: { body, rootCommentId }, ctx }) => {
        return prisma.comment.create({
          data: {
            authorId: ctx.user.id,
            body,
            rootCommentId,
          },
        })
      }),
    editComment: publicProcedure
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
      }),
  }),
})
export type AppRouter = typeof appRouter

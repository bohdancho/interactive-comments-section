import { PrismaClient } from '@prisma/client'
import { TRPCError, initTRPC } from '@trpc/server'
import { z } from 'zod'

const defaultUserName = 'juliusomo'
const t = initTRPC.create()
export const router = t.router
export const publicProcedure = t.procedure

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
      .mutation(async ({ input: { body, rootCommentId } }) => {
        const user = await prisma.user.findUnique({ where: { name: defaultUserName } })
        if (!user) {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Default user not found in the database.',
          })
        }

        return prisma.comment.create({ data: { authorId: user.id, body, rootCommentId } })
      }),
  }),
})
export type AppRouter = typeof appRouter

import { prisma, publicProcedure, router } from '@server/app'

export const getUserRouter = () =>
  router({
    usersList: publicProcedure.query(() => {
      return prisma.user.findMany()
    }),
  })

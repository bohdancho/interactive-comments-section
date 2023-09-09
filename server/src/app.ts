import { PrismaClient } from '@prisma/client'
import { initTRPC } from '@trpc/server'
import { Context, DEFAULT_USER_NAME } from './context'
import { commentRouter, votingRouter } from './routers'

const t = initTRPC.context<Context>().create()

export const router = t.router
export const middleware = t.middleware
export const publicProcedure = t.procedure

export const prisma = new PrismaClient()

export const appRouter = router({
  getUser: publicProcedure.query(() => prisma.user.findUniqueOrThrow({ where: { name: DEFAULT_USER_NAME } })),
  comment: commentRouter(),
  voting: votingRouter(),
})
export type AppRouter = typeof appRouter

import { PrismaClient } from '@prisma/client'
import { initTRPC } from '@trpc/server'
import { commentRouter } from './comment'
import { Context, fetchUser } from './user'

const t = initTRPC.context<Context>().create()

export const router = t.router
export const middleware = t.middleware
export const publicProcedure = t.procedure.use(fetchUser())

export const prisma = new PrismaClient()

export const appRouter = router({
  comment: commentRouter(),
})
export type AppRouter = typeof appRouter

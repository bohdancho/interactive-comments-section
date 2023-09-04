import { PrismaClient } from '@prisma/client'
import { initTRPC } from '@trpc/server'
import { getUserRouter } from './modules'

const t = initTRPC.create()
export const router = t.router
export const publicProcedure = t.procedure

export const prisma = new PrismaClient()

export const appRouter = router({ user: getUserRouter() })
export type AppRouter = typeof appRouter

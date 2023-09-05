import { prisma } from '@server/app'
import { TRPCError } from '@trpc/server'

const DEFAULT_USER_NAME = 'juliusomo'

export const createContext = async () => {
  const user = await prisma.user.findUnique({ where: { name: DEFAULT_USER_NAME } })
  if (!user) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: `Default user with name ${DEFAULT_USER_NAME} not found in the database.`,
    })
  }

  return { user }
}
export type Context = typeof createContext

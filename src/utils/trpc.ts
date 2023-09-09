import { AppRouter } from '@server/app'
import { createTRPCReact } from '@trpc/react-query'
import { inferRouterOutputs } from '@trpc/server'

export const api = createTRPCReact<AppRouter>()
export type RouterOutputs = inferRouterOutputs<AppRouter>

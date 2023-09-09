import { User } from '@prisma/client'
import { trpc } from '@src/utils'
import { ReactNode, createContext } from 'react'

export const UserContext = createContext<User | null>(null)

export function UserProvider({ children }: { children: ReactNode }) {
  const user = trpc.getUser.useQuery().data
  return user ? <UserContext.Provider value={user}>{children}</UserContext.Provider> : null
}

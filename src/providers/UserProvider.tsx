import { ReactNode, createContext } from 'react'
import * as types from '../types'

export const UserContext = createContext<types.User | null>(null)

export function UserProvider({ user, children }: { user: types.User; children: ReactNode }) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}

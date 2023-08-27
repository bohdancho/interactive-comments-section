import * as types from '@src/types'
import { ReactNode, createContext, useContext } from 'react'
import { DataContext } from './DataProvider'

export const UserContext = createContext<types.User | null>(null)

export function UserProvider({ children }: { children: ReactNode }) {
  const data = useContext(DataContext)

  return data ? <UserContext.Provider value={data.currentUser}>{children}</UserContext.Provider> : null
}

import { ReactNode, createContext, useContext } from 'react'
import * as types from '../types'
import { DataContext } from './DataProvider'

export const UserContext = createContext<types.User | null>(null)

export function UserProvider({ children }: { children: ReactNode }) {
  const data = useContext(DataContext)

  return data ? (
    <UserContext.Provider value={data.currentUser}>{children}</UserContext.Provider>
  ) : null
}

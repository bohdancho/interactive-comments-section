import { createContext, useEffect, useState } from 'react'
import * as types from '../types'
import { CommentsList } from './CommentsList'

export const UserContext = createContext<types.User | null>(null)

export function CommentsSection() {
  const [data, setData] = useState<types.Data | null>(null)

  useEffect(() => {
    const dataFetch = async () => {
      const data = await (await fetch('data.json')).json()

      console.log(data)
      setData(data)
    }

    dataFetch()
  }, [])

  return data ? (
    <UserContext.Provider value={data.currentUser}>
      <CommentsList commentsData={data.comments} />
    </UserContext.Provider>
  ) : null
}


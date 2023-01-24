import { useEffect, useState } from 'react'
import * as types from '../types'
import { CommentsList } from './CommentsList'

export function CommentsSection() {
  const [data, setData] = useState<types.Data | undefined>()

  useEffect(() => {
    const dataFetch = async () => {
      const data = await (await fetch('data.json')).json()

      console.log(data)
      setData(data)
    }

    dataFetch()
  }, [])

  return data ? <CommentsList commentsData={data.comments} /> : null
}


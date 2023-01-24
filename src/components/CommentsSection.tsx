import { useEffect, useState } from 'react'
import { Data } from '../models/data.model'

export function CommentsSection() {
  const [data, setData] = useState<Data | undefined>()

  useEffect(() => {
    const dataFetch = async () => {
      const data = await (await fetch('data.json')).json()

      console.log(data)
      setData(data)
    }

    dataFetch()
  }, [])

  return <div>Comments Section</div>
}


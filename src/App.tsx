import * as types from './types'
import { createContext, useEffect, useState } from 'react'
import './App.css'
import { CommentsSection } from './components/CommentsSection'

export const UserContext = createContext<types.User | null>(null)
const LS_DATA_KEY = 'data'

function App() {
  const [data, setData] = useState<types.Data | null>(null)

  useEffect(() => {
    const localJSON = localStorage.getItem(LS_DATA_KEY)
    if (localJSON && JSON.parse(localJSON)) {
      const localData = JSON.parse(localJSON)
      setData(localData)
      return
    }

    const dataFetch = async () => {
      const response = (await (await fetch('./data.json')).json()) as types.Data

      setData(response)
      localStorage.setItem(LS_DATA_KEY, JSON.stringify(response))
    }

    dataFetch()
  }, [])

  useEffect(() => {
    if (data) {
      localStorage.setItem(LS_DATA_KEY, JSON.stringify(data))
    }
  }, [data])

  return data ? (
    <UserContext.Provider value={data.currentUser}>
      <div className='py-32 px-16 min-h-screen bg-very-light-gray flex justify-center'>
        <div className='max-w-[730px]'>
          <CommentsSection comments={data.comments} />
        </div>
      </div>
    </UserContext.Provider>
  ) : null
}

export default App

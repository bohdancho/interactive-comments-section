import * as types from './types'
import { useState, useEffect, createContext } from 'react'
import './App.css'
import { CommentsSection } from './components/CommentsSection'

export const UserContext = createContext<types.User | null>(null)

function App() {
  const [data, setData] = useState<types.Data | null>(null)

  useEffect(() => {
    const dataFetch = async () => {
      const data = await (await fetch('data.json')).json()

      setData(data)
    }

    dataFetch()
  })

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


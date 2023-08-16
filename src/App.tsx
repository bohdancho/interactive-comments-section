import { createContext, useEffect, useReducer } from 'react'
import './App.css'
import { CommentsSection } from './components/CommentsSection'
import * as types from './types'

export const UserContext = createContext<types.User | null>(null)
const LS_DATA_KEY = 'data'

const dataReducer = (state: null | types.Data, action: types.DataAction) => {
  switch (action.type) {
    case 'init':
      return action.payload
    case 'update-comments':
      return state ? { ...state, comments: action.payload } : state
    default:
      return state
  }
}

function App() {
  const [data, dispatchData] = useReducer(dataReducer, null)
  const dispatchComments = (comments: types.Comment[]) =>
    dispatchData({ type: 'update-comments', payload: comments })

  useEffect(() => {
    const localJSON = localStorage.getItem(LS_DATA_KEY)
    if (localJSON && JSON.parse(localJSON)) {
      const localData = JSON.parse(localJSON)
      dispatchData({ type: 'init', payload: localData })
      return
    }

    const dataFetch = async () => {
      const response = (await (await fetch('./data.json')).json()) as types.Data

      dispatchData({ type: 'init', payload: response })
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
          <CommentsSection
            comments={data.comments}
            dispatchComments={dispatchComments}
          />
        </div>
      </div>
    </UserContext.Provider>
  ) : null
}

export default App

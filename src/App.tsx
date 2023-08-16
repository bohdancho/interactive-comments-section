import { Dispatch, Reducer, createContext, useEffect, useReducer } from 'react'
import './App.css'
import { CommentsSection } from './components/CommentsSection'
import * as types from './types'

export const UserContext = createContext<types.User | null>(null)
export const CommentsContext = createContext<types.Comment[] | null>(null)
export const DataDispatchContext = createContext<Dispatch<types.Action> | null>(
  null
)

const LS_DATA_KEY = 'data'

type DataReducer = Reducer<null | types.Data, types.Action>

const dataReducer: DataReducer = (state, action) => {
  switch (action.type) {
    case 'init':
      return action.payload
    case 'comment':
      return state
        ? {
            ...state,
            comments: [
              ...state.comments,
              {
                id: 1, // todo implement comments count and actual id here
                content: action.payload.text,
                createdAt: Date.now().toString(), // todo implement time
                rating: 0,
                user: state.currentUser,
                replies: [],
              },
            ],
          }
        : state
    default:
      return state
  }
}

function App() {
  const [data, dispatchData] = useReducer<DataReducer>(dataReducer, null)

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
      <CommentsContext.Provider value={data.comments}>
        <DataDispatchContext.Provider value={dispatchData}>
          <div className='py-32 px-16 min-h-screen bg-very-light-gray flex justify-center'>
            <div className='max-w-[730px]'>
              <CommentsSection />
            </div>
          </div>
        </DataDispatchContext.Provider>
      </CommentsContext.Provider>
    </UserContext.Provider>
  ) : null
}

export default App

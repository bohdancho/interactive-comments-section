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
                id: state.commentsCount + 1,
                content: action.payload.text,
                createdAt: Date.now(),
                rating: 0,
                user: state.currentUser,
                replies: [],
              },
            ],
            commentsCount: state.commentsCount + 1,
          }
        : state
    case 'editComment':
      if (!state) {
        return state
      }

      const { id, newText: content } = action.payload
      return {
        ...state,
        comments: state.comments.map((comment) => {
          if (comment.id === id) {
            return { ...comment, content }
          }
          return {
            ...comment,
            replies: comment.replies.map((reply) =>
              reply.id === id ? { ...reply, content } : reply
            ),
          }
        }),
      }
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

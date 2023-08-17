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

const handleVoting: <T extends types.Comment | types.Reply>(
  comment: T,
  isUpvote: boolean,
  currentUsername: string
) => T = (comment, isUpvote, currentUsername) => {
  let tookVoteBack = false
  const alreadyUpvoted = comment.upvotedBy.includes(currentUsername)
  const alreadyDownvoted = comment.downvotedBy.includes(currentUsername)

  if ((alreadyUpvoted && isUpvote) || (alreadyDownvoted && !isUpvote)) {
    tookVoteBack = true
  }

  const newUpvotedBy = comment.upvotedBy.filter(
    (username) => username !== currentUsername
  )
  const newDownvotedBy = comment.downvotedBy.filter(
    (username) => username !== currentUsername
  )

  if (!tookVoteBack) {
    if (isUpvote) {
      newUpvotedBy.push(currentUsername)
    } else {
      newDownvotedBy.push(currentUsername)
    }
  }

  return {
    ...comment,
    upvotedBy: newUpvotedBy,
    downvotedBy: newDownvotedBy,
  }
}

type DataReducer = Reducer<null | types.Data, types.Action>
const dataReducer: DataReducer = (state, action) => {
  if (action.type === 'init') {
    return action.payload
  }
  if (!state) {
    return state
  }

  switch (action.type) {
    case 'comment': {
      return {
        ...state,
        commentsCount: state.commentsCount + 1,
        comments: [
          ...state.comments,
          {
            id: state.commentsCount + 1,
            content: action.payload.text,
            createdAt: Date.now(),
            upvotedBy: [],
            downvotedBy: [],
            user: state.currentUser,
            replies: [],
          },
        ],
      }
    }
    case 'reply': {
      const { text, replyToId } = action.payload
      return {
        ...state,
        commentsCount: state.commentsCount + 1,
        comments: state.comments.map((comment) => {
          const replyToIndex = comment.replies.findIndex(
            (reply) => reply.id === replyToId
          )

          if (replyToId !== comment.id && replyToIndex === -1) {
            return comment
          }
          return {
            ...comment,
            replies: [
              ...comment.replies,
              {
                user: state.currentUser,
                id: state.commentsCount + 1,
                content: text,
                createdAt: Date.now(),
                upvotedBy: [],
                downvotedBy: [],
                replyingTo:
                  replyToIndex === -1
                    ? comment.user.username
                    : comment.replies[replyToIndex].user.username,
              },
            ],
          }
        }),
      }
    }
    case 'editComment': {
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
    }
    case 'deleteComment': {
      const id = action.payload.id
      return {
        ...state,
        comments: state.comments.reduce<types.Comment[]>(
          (comments, comment) => {
            if (comment.id === id) {
              return comments
            }
            return [
              ...comments,
              {
                ...comment,
                replies: comment.replies.filter((reply) => reply.id !== id),
              },
            ]
          },
          []
        ),
      }
    }
    case 'vote': {
      const { id, isUpvote } = action.payload
      const currentUsername = state.currentUser.username

      return {
        ...state,
        comments: state.comments.map((comment) => {
          if (comment.id !== id) {
            return {
              ...comment,
              replies: comment.replies.map((reply) =>
                reply.id === id
                  ? handleVoting(reply, isUpvote, currentUsername)
                  : reply
              ),
            }
          }

          return handleVoting(comment, isUpvote, currentUsername)
        }),
      }
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

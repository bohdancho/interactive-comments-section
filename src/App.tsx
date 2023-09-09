import { Vote } from '@prisma/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import { useState } from 'react'
import './App.css'
import { CommentsSection } from './components'
import { UserProvider } from './providers'
import { api } from './utils'

function ApiTest() {
  const allComments = api.comment.getAllRootComments.useQuery()
  const addComment = api.comment.addComment.useMutation()
  const vote = api.voting.vote.useMutation()

  function addCommentHandler() {
    const firstComment = allComments.data?.at(0)
    if (!firstComment) {
      addComment.mutate({ body: 'root' })
      return
    }
    addComment.mutate({ body: 'reply', rootCommentId: firstComment.id })
  }

  function voteHandler(choice: Vote) {
    const firstComment = allComments.data?.at(0)
    if (!firstComment) return
    console.log(firstComment.id, choice)
    vote.mutate({ commentId: firstComment.id, clickedChoice: choice })
  }

  return (
    <>
      {allComments.data?.map((comment) => (
        <div key={comment.id}>
          {comment.author.name}, {comment.body}, {comment.createdAt}, {comment.id}, {comment.rating},{' '}
          {comment.replies.map((reply) => (
            <div key={reply.id}>{reply.body}</div>
          ))}
        </div>
      ))}
      <button type='button' onClick={addCommentHandler}>
        add comment
      </button>
      <button type='button' onClick={() => voteHandler(Vote.Downvote)}>
        downvote
      </button>
      <button type='button' onClick={() => voteHandler(Vote.Upvote)}>
        upvote
      </button>
    </>
  )
}

function App() {
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    api.createClient({
      links: [
        httpBatchLink({
          url: 'http://localhost:4200/trpc',
          // You can pass any HTTP headers you wish here
        }),
      ],
    }),
  )

  return (
    <api.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <div className='min-h-screen bg-very-light-gray px-16 py-32'>
            <div className='mx-auto max-w-[730px]'>
              <CommentsSection />
            </div>
          </div>
        </UserProvider>
      </QueryClientProvider>
    </api.Provider>
  )

  // return (
  //   <DataProvider>
  //     <UserProvider>
  //       <div className='flex min-h-screen justify-center bg-very-light-gray py-32 px-16'>
  //         <div className='max-w-[730px]'>
  //           <CommentsSection />
  //         </div>
  //       </div>
  //     </UserProvider>
  //   </DataProvider>
  // )
}

export default App

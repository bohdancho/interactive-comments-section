import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import { useState } from 'react'
import './App.css'
import { CommentsSection } from './components'
import { UserProvider } from './providers'
import { api } from './utils'

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
}

export default App

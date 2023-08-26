import './App.css'
import { CommentsSection } from './components/CommentsSection'
import { DataProvider } from './providers/DataProvider'
import { UserProvider } from './providers/UserProvider'

function App() {
  return (
    <DataProvider>
      <UserProvider>
        <div className='flex min-h-screen justify-center bg-very-light-gray py-32 px-16'>
          <div className='max-w-[730px]'>
            <CommentsSection />
          </div>
        </div>
      </UserProvider>
    </DataProvider>
  )
}

export default App

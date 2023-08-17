import './App.css'
import { CommentsSection } from './components/CommentsSection'
import { DataProvider } from './providers/DataProvider'
import { UserProvider } from './providers/UserProvider'

function App() {
  return (
    <DataProvider>
      <UserProvider>
        <div className='py-32 px-16 min-h-screen bg-very-light-gray flex justify-center'>
          <div className='max-w-[730px]'>
            <CommentsSection />
          </div>
        </div>
      </UserProvider>
    </DataProvider>
  )
}

export default App

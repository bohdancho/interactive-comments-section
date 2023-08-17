import './App.css'
import { CommentsSection } from './components/CommentsSection'
import { DataProvider } from './providers/DataProvider'

function App() {
  return (
    <DataProvider>
      <div className='py-32 px-16 min-h-screen bg-very-light-gray flex justify-center'>
        <div className='max-w-[730px]'>
          <CommentsSection />
        </div>
      </div>
    </DataProvider>
  )
}

export default App

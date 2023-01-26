import './App.css'
import { CommentsSection } from './components/CommentsSection'

function App() {
  return (
    <div className='py-32 px-16 min-h-screen bg-very-light-gray flex justify-center'>
      <div className='max-w-[730px]'>
        <CommentsSection />
      </div>
    </div>
  )
}

export default App


import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import Dashboard from './pages/Dashboard'
import AddStudent from './pages/AddStudent'

function App() {

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
        <Toaster position="top-right" />
        
        <nav className="bg-white shadow-sm p-4 mb-8">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold text-indigo-600">🎓 Student Admin</h1>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto p-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add" element={<AddStudent />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App

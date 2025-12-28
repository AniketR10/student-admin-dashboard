// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AddStudent from './pages/AddStudent';
import Dashboard from './pages/Dashboard';
import StudentView from './pages/StudentView';

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <nav className="bg-white shadow-sm p-4 mb-8">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold text-indigo-600">🎓 Student Portal</h1>
          </div>
        </nav>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        <Route path="/admin-dashboard" element={<Dashboard />} />
        <Route path="/student-dashboard" element={<StudentView/> } />
        <Route path="*" element={<Navigate to="/login" />} />
        <Route path="/add" element={<AddStudent />} />
      </Routes>
    </Router>
  );
}

export default App;
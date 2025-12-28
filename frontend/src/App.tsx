import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AddStudent from './pages/AddStudent';
import Dashboard from './pages/Dashboard';
import StudentView from './pages/StudentView';
import { LogOut } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const hideLogout = ['/login', '/signup'].includes(location.pathname)

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')

    toast.success('Logged out successfully');

    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-sm p-4 mb-8 sticky top-0 z-10">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold text-indigo-600">🎓 Student Portal</h1>
        
        {!hideLogout && (
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-500 hover:text-red-600 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-red-50"
          >
            <LogOut size={18} />
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-10">
        <Toaster position="top-right" />
        
        <Navbar />

        <div className="max-w-4xl mx-auto px-4">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            <Route path="/admin-dashboard" element={<Dashboard />} />
            <Route path="/student-dashboard" element={<StudentView />} />
            <Route path="/add" element={<AddStudent />} />
            
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
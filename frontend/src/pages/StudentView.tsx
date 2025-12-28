import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, BookOpen, LogOut, ShieldCheck } from 'lucide-react';

const StudentView = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    
    if (!storedUser) {
      navigate('/login');
      return;
    }
    
    setUser(JSON.parse(storedUser));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
        <div className="bg-indigo-600 h-32 w-full relative">
          <div className="absolute -bottom-12 left-8">
            <div className="h-24 w-24 bg-white rounded-full p-1 shadow-md">
              <div className="h-full w-full bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                <User size={40} />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-16 pb-8 px-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-gray-500 flex items-center gap-2 mt-1">
                <ShieldCheck size={16} className="text-indigo-600" />
                Student Account
              </p>
            </div>
            
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 text-gray-500 hover:text-red-600 transition-colors px-4 py-2 rounded-lg hover:bg-red-50"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div className="flex items-center gap-3 mb-2 text-gray-600">
                <Mail size={20} />
                <span className="font-semibold text-sm uppercase tracking-wide">Email Address</span>
              </div>
              <p className="text-lg font-medium text-gray-900 pl-8">{user.email}</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div className="flex items-center gap-3 mb-2 text-gray-600">
                <BookOpen size={20} />
                <span className="font-semibold text-sm uppercase tracking-wide">Enrolled Course</span>
              </div>
              <p className="text-lg font-medium text-gray-900 pl-8">
                {user.course || "Not Assigned"}
              </p>
            </div>

          </div>

          <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3 text-green-800">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
            <p className="text-sm font-medium">Your account is active and in good standing.</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default StudentView;
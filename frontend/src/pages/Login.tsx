import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ShieldCheck, GraduationCap, ArrowLeft, Loader2 } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  
  const [loginType, setLoginType] = useState<'selection' | 'admin' | 'student'>('selection');
  
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' , course: ''});

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:3000/api/login', {
        ...form,
        course: loginType === 'student' ? form.course : undefined
      });
      const user = res.data.user;

      if (loginType === 'admin' && user.role !== 'admin') {
        toast.error("Access Denied: You are not an Admin.");
        setLoading(false);
        return;
      }

      if (loginType === 'student' && user.role !== 'student') {
        toast.error("Please login via the Admin portal.");
        setLoading(false);
        return;
      }
      

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(user));
      
      toast.success(`Welcome back, ${user.name}!`);

      if (user.role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/student-dashboard');
      }

    } catch (error: any) {
      toast.error(error.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  if (loginType === 'selection') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-gray-500">Choose your login portal to continue</p>
          </div>

          <div className="grid gap-4">
            <button
              onClick={() => setLoginType('admin')}
              className="flex items-center gap-4 p-6 bg-white border-2 border-transparent hover:border-indigo-600 rounded-2xl shadow-sm hover:shadow-md transition-all group text-left"
            >
              <div className="bg-indigo-100 p-4 rounded-full group-hover:bg-indigo-600 transition-colors">
                <ShieldCheck size={32} className="text-indigo-600 group-hover:text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Admin Portal</h3>
                <p className="text-sm text-gray-500">Login to manage students and courses</p>
              </div>
            </button>

            <button
              onClick={() => setLoginType('student')}
              className="flex items-center gap-4 p-6 bg-white border-2 border-transparent hover:border-emerald-600 rounded-2xl shadow-sm hover:shadow-md transition-all group text-left"
            >
              <div className="bg-emerald-100 p-4 rounded-full group-hover:bg-emerald-600 transition-colors">
                <GraduationCap size={32} className="text-emerald-600 group-hover:text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Student Portal</h3>
                <p className="text-sm text-gray-500">Access your profile and grades</p>
              </div>
            </button>
          </div>
          
          <p className="mt-8 text-center text-sm text-gray-400">
            Don't have an admin account? <Link to="/signup" className="text-indigo-600 font-semibold">Sign up</Link>
          </p>
        </div>
      </div>
    );
  }

  const isAdmin = loginType === 'admin';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm relative">
        
        <button 
          onClick={() => setLoginType('selection')}
          className="absolute top-6 left-6 text-gray-400 hover:text-gray-800 transition"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="text-center mb-8 mt-4">
          <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 
            ${isAdmin ? 'bg-indigo-100 text-indigo-600' : 'bg-emerald-100 text-emerald-600'}`}
          >
            {isAdmin ? <ShieldCheck size={32} /> : <GraduationCap size={32} />}
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {isAdmin ? 'Admin Login' : 'Student Login'}
          </h2>
          <p className="text-sm text-gray-500">Enter your credentials to access</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input 
              required
              type="email" 
              className={`w-full border p-2.5 rounded-lg outline-none focus:ring-2 
                ${isAdmin ? 'focus:ring-indigo-500' : 'focus:ring-emerald-500'}`}
              placeholder="name@example.com"
              onChange={e => setForm({...form, email: e.target.value})}
            />
          </div>

          {!isAdmin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Enrolled Course</label>
              <input 
                required type="text" 
                className="w-full border p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Ex: Computer Science"
                onChange={e => setForm({...form, course: e.target.value})}
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              required
              type="password" 
              className={`w-full border p-2.5 rounded-lg outline-none focus:ring-2 
                ${isAdmin ? 'focus:ring-indigo-500' : 'focus:ring-emerald-500'}`}
              placeholder="••••••••"
              onChange={e => setForm({...form, password: e.target.value})}
            />
          </div>

          <button 
            disabled={loading}
            className={`w-full py-2.5 rounded-lg font-bold text-white transition flex justify-center items-center gap-2
              ${isAdmin 
                ? 'bg-indigo-600 hover:bg-indigo-700' 
                : 'bg-emerald-600 hover:bg-emerald-700'
              }`}
          >
            {loading ? <Loader2 className="animate-spin" /> : "Sign In"}
          </button>
        </form>

      </div>
    </div>
  );
};

export default Login;
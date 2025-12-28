import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ 
    name: '', email: '', password: '', role: 'student' 
  });

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/signup', form);
      toast.success("Account created! Please login.");
      navigate('/login');
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">Create Account</h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <input 
            type="text" placeholder="Full Name" className="w-full border p-2 rounded"
            onChange={e => setForm({...form, name: e.target.value})}
          />
          <input 
            type="email" placeholder="Email" className="w-full border p-2 rounded"
            onChange={e => setForm({...form, email: e.target.value})}
          />
          <input 
            type="password" placeholder="Password" className="w-full border p-2 rounded"
            onChange={e => setForm({...form, password: e.target.value})}
          />

          <button className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
            Register as Admin
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Already have an account? <Link to="/login" className="text-indigo-600 font-bold">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ArrowLeft, Loader2 } from 'lucide-react';
import type { StudentForm } from '../types';
import { API_URL } from '../config';

const AddStudent = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const [form, setForm] = useState<StudentForm>({ 
    name: '', 
    email: '', 
    course: '' ,
    password: '',

  });

  const handleSubmit = async (e: React.FormEvent) => {``
    e.preventDefault();
    try {
        setIsLoading(true);
      await axios.post(`${API_URL}/api/students`, {
        ...form,
        role: "student"
    });
      toast.success("Student added successfully!");
      navigate('/admin-dashboard');
    } catch (error: any) {
      const msg = error || "Something went wrong";
      toast.error(msg);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <Link to="/" className="text-gray-500 flex items-center gap-2 mb-4 hover:text-gray-800">
        <ArrowLeft size={18} /> Back to Dashboard
      </Link>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h2 className="text-xl font-bold mb-4">Add New Student</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input 
              required
              type="text" 
              className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Ex: John Doe"
              value={form.name}
              onChange={(e) => setForm({...form, name: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input 
              required
              type="email" 
              className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Ex: john@example.com"
              value={form.email}
              onChange={(e) => setForm({...form, email: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              required
              type="password" 
              className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Set New Student's Password here."
              value={form.password}
              onChange={(e) => setForm({...form, password: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
            <input 
              required
              type="text" 
              className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Ex: Computer Science"
              value={form.course}
              onChange={(e) => setForm({...form, course: e.target.value})}
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className={`w-full py-2 rounded-lg font-medium transition flex justify-center items-center gap-2 
              ${isLoading 
                ? "bg-indigo-400 cursor-not-allowed" 
                : "bg-indigo-600 hover:bg-indigo-700 text-white"
              }`}
              >
            {
                isLoading ? (
                    <>
                    <Loader2 className="animate-spin" size={20} />
                     Creating...
                    </>
                ) : (
                    "Create Student"
                )
            }
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;
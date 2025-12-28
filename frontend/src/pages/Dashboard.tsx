import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Trash2, UserPlus, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import type { Student } from '../types';

const Dashboard = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
        setIsLoading(true);
      const res = await axios.get<Student[]>('http://localhost:3000/api/students');
      setStudents(res.data);
    } catch (error) {
      toast.error("failed to fetch students");
    } finally {
        setIsLoading(false)
    }
  };

  const handleDelete = async (id: number) => {
    if(!window.confirm("Are you sure?")) return;
    
    try {
      await axios.delete(`http://localhost:3000/api/students/${id}`);
      toast.success("Student deleted!");
      fetchStudents();
    } catch (error) {
      toast.error("failed to delete");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Student List</h2>
        <Link to="/add" className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700">
          <UserPlus size={18} /> Add Student
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Course</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            { isLoading ? (
                <tr>
                <td colSpan={4} className="p-12 text-center">
                  <div className="flex flex-col items-center justify-center text-gray-500">
                    <Loader2 className="animate-spin mb-2 text-indigo-600" size={32} />
                    <p>Loading students...</p>
                  </div>
                </td>
              </tr> 
            ): students.length === 0 ? (
               <tr><td colSpan={4} className="p-8 text-center text-gray-400">No students found.</td></tr>
            ) : (
              students.map((student) => (
                <tr key={student.ID} className="hover:bg-gray-50">
                  <td className="p-4 font-medium">{student.name}</td>
                  <td className="p-4 text-gray-500">{student.email}</td>
                  <td className="p-4">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {student.course}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button 
                      onClick={() => handleDelete(student.ID)}
                      className="text-red-500 hover:text-red-700 p-2"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
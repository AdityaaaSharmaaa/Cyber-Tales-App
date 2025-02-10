import { useState, useEffect } from 'react';
import { Calendar, Search, Book, Brain, Trophy, Users } from 'lucide-react';
import { getClassProgress, generateChartData } from '../utils/dashboard';
import { ChildProgress, DashboardFilters } from '../types/dashboard';
import { ProgressChart } from './ProgressChart';
import { auth } from '../config/firebase';

export const TeacherDashboard = () => {
  const [students, setStudents] = useState<ChildProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<DashboardFilters>({
    dateRange: 'week',
    activityType: 'all',
    searchQuery: ''
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        if (!auth.currentUser) return;
        const data = await getClassProgress(auth.currentUser.uid);
        setStudents(data);
      } catch (error) {
        console.error('Error loading dashboard:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const getClassStats = () => {
    return {
      averageScore: students.reduce((acc, s) => acc + s.averageScore, 0) / students.length,
      totalQuizzes: students.reduce((acc, s) => acc + s.quizzesTaken, 0),
      totalStories: students.reduce((acc, s) => acc + s.storiesCompleted, 0)
    };
  };

  if (loading) {
    return <div className="p-6">Loading dashboard...</div>;
  }

  const classStats = getClassStats();

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-purple-600">Teacher Dashboard</h1>
        <div className="flex space-x-4">
          {/* Similar filters as ParentDashboard */}
        </div>
      </div>

      {/* Class Overview */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="bg-white rounded-xl p-6 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800">Class Average</h3>
            <Trophy className="w-6 h-6 text-yellow-500" />
          </div>
          <div className="text-3xl font-bold text-purple-600">{classStats.averageScore.toFixed(1)}%</div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800">Total Quizzes</h3>
            <Brain className="w-6 h-6 text-blue-500" />
          </div>
          <div className="text-3xl font-bold text-purple-600">{classStats.totalQuizzes}</div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800">Stories Completed</h3>
            <Book className="w-6 h-6 text-green-500" />
          </div>
          <div className="text-3xl font-bold text-purple-600">{classStats.totalStories}</div>
        </div>
      </div>

      {/* Student List */}
      <div className="bg-white rounded-xl p-6 shadow-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Student Progress</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-200">
                <th className="pb-3 font-bold text-gray-600">Student</th>
                <th className="pb-3 font-bold text-gray-600">Total Points</th>
                <th className="pb-3 font-bold text-gray-600">Avg. Score</th>
                <th className="pb-3 font-bold text-gray-600">Quizzes</th>
                <th className="pb-3 font-bold text-gray-600">Stories</th>
                <th className="pb-3 font-bold text-gray-600">Last Active</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.uid} className="border-b border-gray-100">
                  <td className="py-3">{student.displayName}</td>
                  <td className="py-3 font-bold text-purple-600">{student.totalPoints}</td>
                  <td className="py-3">{student.averageScore}%</td>
                  <td className="py-3">{student.quizzesTaken}</td>
                  <td className="py-3">{student.storiesCompleted}</td>
                  <td className="py-3 text-gray-500">
                    {new Date(student.lastActive).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Progress Charts */}
      <div className="bg-white rounded-xl p-6 shadow-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Class Progress</h2>
        <ProgressChart data={generateChartData(students, filters)} />
      </div>
    </div>
  );
}; 
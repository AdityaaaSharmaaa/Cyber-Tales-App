import { useState, useEffect } from 'react';
import { getChildrenProgress } from '../utils/dashboard';
import { ChildProgress, DashboardFilters } from '../types/dashboard';
import { auth } from '../config/firebase';

export const ParentDashboard = () => {
  const [children, setChildren] = useState<ChildProgress[]>([]);
  const [filters, setFilters] = useState<DashboardFilters>({
    timeRange: 'week',
    metric: 'points'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (!auth.currentUser) return;
      try {
        const data = await getChildrenProgress(auth.currentUser.uid);
        setChildren(data);
      } catch (error) {
        console.error('Error loading children data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

    if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-purple-600">Parent Dashboard</h1>
      
      {/* Filters */}
      <div className="flex gap-4">
        <select
          value={filters.timeRange}
          onChange={(e) => setFilters({ ...filters, timeRange: e.target.value as DashboardFilters['timeRange'] })}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="year">This Year</option>
        </select>

        <select
          value={filters.metric}
          onChange={(e) => setFilters({ ...filters, metric: e.target.value as DashboardFilters['metric'] })}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="points">Points</option>
          <option value="quizzes">Quizzes</option>
          <option value="stories">Stories</option>
        </select>
      </div>

      {/* Children Progress */}
      <div className="grid gap-4">
        {children.map((child) => (
          <div key={child.uid} className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="font-bold text-lg mb-2">{child.name}</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-gray-600">Total Points</p>
                <p className="text-2xl font-bold text-purple-600">
                  {child.progress.totalPoints}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Quizzes Taken</p>
                <p className="text-2xl font-bold text-blue-600">
                  {child.progress.quizzesTaken}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Stories Read</p>
                <p className="text-2xl font-bold text-green-600">
                  {child.progress.storiesRead}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 
import { useState, useEffect } from 'react';
import { LogOut, Edit2, Trophy, Book, Brain, Flame } from 'lucide-react';
import { auth, db } from '../config/firebase';
import { signOut } from 'firebase/auth';
import { doc, updateDoc, onSnapshot } from 'firebase/firestore';

export const ProfileScreen = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(auth.currentUser?.displayName || '');
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<any>(null);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleUpdateUsername = async () => {
    if (!auth.currentUser || !username.trim()) return;
    
    setLoading(true);
    try {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      await updateDoc(userRef, {
        displayName: username.trim()
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Update error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!auth.currentUser) return;

    // Real-time listener for user stats
    const unsubscribe = onSnapshot(doc(db, 'users', auth.currentUser.uid), 
      (doc) => {
        if (doc.exists()) {
          setStats(doc.data());
        }
      },
      (error) => {
        console.error('Error loading stats:', error);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-purple-600">Profile</h1>
        <button
          onClick={handleLogout}
          className="flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Logout
        </button>
      </div>

      {/* User Info */}
      <div className="bg-white rounded-xl p-6 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <div>
            {isEditing ? (
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter username"
                />
                <button
                  onClick={handleUpdateUsername}
                  disabled={loading}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-bold">{username}</h2>
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <Edit2 className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            )}
            <p className="text-gray-600">{auth.currentUser?.email}</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-purple-50 p-4 rounded-xl">
            <div className="flex items-center space-x-2 mb-2">
              <Trophy className="w-5 h-5 text-purple-600" />
              <h3 className="font-bold text-purple-600">Total Points</h3>
            </div>
            <p className="text-2xl font-bold">{stats?.totalPoints || 0}</p>
          </div>

          <div className="bg-blue-50 p-4 rounded-xl">
            <div className="flex items-center space-x-2 mb-2">
              <Brain className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-blue-600">Quizzes Completed</h3>
            </div>
            <p className="text-2xl font-bold">{stats?.quizzesTaken || 0}</p>
          </div>

          <div className="bg-green-50 p-4 rounded-xl">
            <div className="flex items-center space-x-2 mb-2">
              <Book className="w-5 h-5 text-green-600" />
              <h3 className="font-bold text-green-600">Stories Read</h3>
            </div>
            <p className="text-2xl font-bold">{stats?.storiesRead || 0}</p>
          </div>

          <div className="bg-orange-50 p-4 rounded-xl">
            <div className="flex items-center space-x-2 mb-2">
              <Flame className="w-5 h-5 text-orange-600" />
              <h3 className="font-bold text-orange-600">Login Streak</h3>
            </div>
            <p className="text-2xl font-bold">{stats?.loginStreak || 0} days</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl p-6 shadow-md">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {stats?.recentActivities?.slice(0, 5).map((activity: any) => (
            <div 
              key={activity.id} 
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                {activity.type === 'quiz' ? (
                  <Brain className="w-5 h-5 text-blue-500" />
                ) : (
                  <Book className="w-5 h-5 text-green-500" />
                )}
                <div>
                  <p className="font-medium">{activity.title}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(activity.completedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              {activity.type === 'quiz' && (
                <div className="text-purple-600 font-bold">
                  {activity.score}%
                </div>
              )}
            </div>
          ))}
          {(!stats?.recentActivities || stats.recentActivities.length === 0) && (
            <p className="text-gray-500 text-center">No recent activities</p>
          )}
        </div>
      </div>
    </div>
  );
}; 
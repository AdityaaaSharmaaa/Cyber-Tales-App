import { useState, useEffect } from 'react';
import { Trophy, Star, Book, Calendar, Crown, Target } from 'lucide-react';
import { auth, db } from '../config/firebase';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { UserStats } from '../types/user';

export const RewardsScreen = () => {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!auth.currentUser) {
      console.log('No user logged in');
      return;
    }

    console.log('Fetching data for user:', auth.currentUser.uid);
    
    let unsubscribe: () => void;
    
    const setupListener = async () => {
      try {
        const docRef = doc(db, 'users', auth.currentUser!.uid);
        
        // Set up real-time listener first
        unsubscribe = onSnapshot(
          docRef,
          (doc) => {
            if (doc.exists()) {
              console.log('Document data:', doc.data());
              setStats(doc.data() as UserStats);
              setLoading(false);
            } else {
              // If document doesn't exist, create it
              const defaultData = {
                uid: auth.currentUser!.uid,
                email: auth.currentUser!.email,
                displayName: auth.currentUser!.email?.split('@')[0] || '',
                role: 'kid',
                totalPoints: 0,
                quizzesTaken: 0,
                storiesRead: 0,
                perfectQuizzes: 0,
                loginStreak: 0,
                badges: [],
                lastLoginDate: new Date().toISOString(),
                recentActivities: []
              };
              
              setDoc(docRef, defaultData, { merge: true })
                .then(() => {
                  setStats(defaultData as UserStats);
                  setLoading(false);
                })
                .catch((error) => {
                  console.error('Error creating document:', error);
                  setError('Failed to create user data');
                  setLoading(false);
                });
            }
          },
          (error) => {
            console.error('Error loading stats:', error);
            setError('Failed to load rewards data');
            setLoading(false);
          }
        );
      } catch (error) {
        console.error('Setup error:', error);
        setError('Failed to setup rewards data');
        setLoading(false);
      }
    };

    setupListener();
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center">
        <p className="text-purple-600">Loading your rewards...</p>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="p-6 flex justify-center items-center">
        <p className="text-red-600">{error || 'Error loading stats'}</p>
      </div>
    );
  }

  const badges = [
    {
      id: 'quiz-master',
      name: 'Quiz Master',
      icon: '🏆',
      description: 'Score 90% or higher on 5 quizzes',
      requirement: stats.perfectQuizzes >= 5,
      progress: `${stats.perfectQuizzes}/5`
    },
    {
      id: 'bookworm',
      name: 'Bookworm',
      icon: '📚',
      description: 'Read 10 stories',
      requirement: stats.storiesRead >= 10,
      progress: `${stats.storiesRead}/10`
    },
    {
      id: 'streak-master',
      name: 'Streak Master',
      icon: '🔥',
      description: 'Login for 7 days in a row',
      requirement: stats.loginStreak >= 7,
      progress: `${stats.loginStreak}/7`
    },
    {
      id: 'point-collector',
      name: 'Point Collector',
      icon: '⭐',
      description: 'Earn 1000 total points',
      requirement: stats.totalPoints >= 1000,
      progress: `${stats.totalPoints}/1000`
    }
  ] as const;

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-purple-600">Your Rewards</h2>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-md">
          <div className="flex items-center space-x-2 mb-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <span className="text-gray-600">Total Points</span>
          </div>
          <p className="text-2xl font-bold text-purple-600">
            {stats.totalPoints}
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-md">
          <div className="flex items-center space-x-2 mb-2">
            <Star className="w-5 h-5 text-yellow-500" />
            <span className="text-gray-600">Perfect Quizzes</span>
          </div>
          <p className="text-2xl font-bold text-purple-600">
            {stats.perfectQuizzes}
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-md">
          <div className="flex items-center space-x-2 mb-2">
            <Book className="w-5 h-5 text-yellow-500" />
            <span className="text-gray-600">Stories Read</span>
          </div>
          <p className="text-2xl font-bold text-purple-600">
            {stats.storiesRead}
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-md">
          <div className="flex items-center space-x-2 mb-2">
            <Calendar className="w-5 h-5 text-yellow-500" />
            <span className="text-gray-600">Login Streak</span>
          </div>
          <p className="text-2xl font-bold text-purple-600">
            {stats.loginStreak} days
          </p>
        </div>
      </div>

      {/* Badges */}
      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-4">Your Badges</h3>
        <div className="grid grid-cols-2 gap-4">
          {badges.map((badge) => {
            const [current, total] = badge.progress.split('/').map(Number);
            const progressPercent = Math.min((current / total) * 100, 100);
            
            return (
              <div
                key={badge.id}
                className={`bg-white p-4 rounded-xl shadow-md ${
                  badge.requirement ? 'opacity-100' : 'opacity-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">{badge.icon}</span>
                  <div>
                    <h4 className="font-bold text-gray-800">{badge.name}</h4>
                    <p className="text-sm text-gray-600">{badge.description}</p>
                    <div className="mt-2 flex items-center space-x-2">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-purple-600 rounded-full transition-all duration-500"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600">{badge.progress}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Next Goals */}
      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-4">Next Goals</h3>
        <div className="bg-white p-4 rounded-xl shadow-md">
          <div className="space-y-4">
            {stats.perfectQuizzes < 5 && (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Crown className="w-5 h-5 text-purple-500" />
                  <span>Get {5 - stats.perfectQuizzes} more perfect quizzes</span>
                </div>
                <Target className="w-5 h-5 text-gray-400" />
              </div>
            )}
            {stats.storiesRead < 10 && (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Book className="w-5 h-5 text-purple-500" />
                  <span>Read {10 - stats.storiesRead} more stories</span>
                </div>
                <Target className="w-5 h-5 text-gray-400" />
              </div>
            )}
            {stats.loginStreak < 7 && (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-purple-500" />
                  <span>Keep logging in for {7 - stats.loginStreak} more days</span>
                </div>
                <Target className="w-5 h-5 text-gray-400" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}; 
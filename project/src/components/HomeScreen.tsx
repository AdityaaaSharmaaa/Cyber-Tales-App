import React, { useState, useEffect } from 'react';
import { Rocket, Brain, Trophy, Book, Award, ChevronRight, BarChart2 } from 'lucide-react';
import { db } from '../config/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth } from '../config/firebase';
import { motion } from 'framer-motion';

interface HomeScreenProps {
  setActiveTab: (tab: string) => void;
}

interface Progress {
  storiesCompleted: number;
  totalStories: number;
  quizzesCompleted: number;
  totalQuizzes: number;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ setActiveTab }) => {
  const [progress, setProgress] = useState<Progress>({
    storiesCompleted: 0,
    totalStories: 6, // Total number of sentinel stories
    quizzesCompleted: 0,
    totalQuizzes: 8  // Total number of quizzes
  });

  useEffect(() => {
    const fetchProgress = async () => {
      if (!auth.currentUser) return;

      try {
        // Fetch completed stories
        const storiesRef = collection(db, 'userProgress');
        const storiesQuery = query(
          storiesRef,
          where('userId', '==', auth.currentUser.uid),
          where('type', '==', 'story'),
          where('completed', '==', true)
        );
        const storiesSnapshot = await getDocs(storiesQuery);
        
        // Fetch completed quizzes
        const quizzesQuery = query(
          storiesRef,
          where('userId', '==', auth.currentUser.uid),
          where('type', '==', 'quiz'),
          where('completed', '==', true)
        );
        const quizzesSnapshot = await getDocs(quizzesQuery);

        setProgress(prev => ({
          ...prev,
          storiesCompleted: storiesSnapshot.size,
          quizzesCompleted: quizzesSnapshot.size
        }));
      } catch (error) {
        console.error('Error fetching progress:', error);
      }
    };

    fetchProgress();
  }, []);

  const ProgressBar = ({ completed, total, type }: { completed: number, total: number, type: string }) => (
    <div className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">
          {type} Progress
        </span>
        <span className="text-sm font-medium text-purple-600">
          {Math.round((completed / total) * 100)}%
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(completed / total) * 100}%` }}
          transition={{ duration: 0.5 }}
          className="bg-purple-600 h-2.5 rounded-full"
        />
      </div>
    </div>
  );

  const navigateToNextContent = (type: 'story' | 'quiz') => {
    // Logic to find next incomplete content
    setActiveTab(type === 'story' ? 'stories' : 'quiz');
  };

  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-purple-600">Cyber Tales</h1>
        <p className="text-gray-600 mt-2">Begin your adventure!</p>
      </div>

      {/* Main Actions */}
      <div className="space-y-4">
        <button
          onClick={() => setActiveTab('stories')}
          className="w-full p-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white flex items-center"
        >
          <Rocket className="w-8 h-8 mr-4" />
          <div className="text-left">
            <h2 className="text-xl font-bold">See Stories</h2>
            <p className="text-sm opacity-90">Explore new adventures</p>
          </div>
        </button>

        <button
          onClick={() => setActiveTab('quiz')}
          className="w-full p-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl text-white flex items-center"
        >
          <Brain className="w-8 h-8 mr-4" />
          <div className="text-left">
            <h2 className="text-xl font-bold">Take Quiz</h2>
            <p className="text-sm opacity-90">Test your knowledge</p>
          </div>
        </button>

        <button
          onClick={() => setActiveTab('rewards')}
          className="w-full p-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl text-white flex items-center"
        >
          <Trophy className="w-8 h-8 mr-4" />
          <div className="text-left">
            <h2 className="text-xl font-bold">My Progress</h2>
            <p className="text-sm opacity-90">View your achievements</p>
          </div>
        </button>
      </div>

      {/* Daily Challenge */}
      <div className="p-6 bg-purple-50 rounded-xl">
        <h3 className="text-lg font-bold text-purple-600">Daily Challenge</h3>
        <p className="text-purple-600 mt-1">Complete today's story to earn extra points!</p>
      </div>

      {/* Progress Section */}
      <div className="bg-white rounded-xl p-6 shadow-md mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          My Progress
        </h2>
        <ProgressBar 
          completed={progress.storiesCompleted} 
          total={progress.totalStories} 
          type="Stories"
        />
        <ProgressBar 
          completed={progress.quizzesCompleted} 
          total={progress.totalQuizzes} 
          type="Quizzes"
        />
      </div>

      {/* Action Buttons */}
      <div className="space-y-4">
        <button
          onClick={() => navigateToNextContent('story')}
          className="w-full p-4 bg-white rounded-xl shadow-md flex items-center justify-between hover:bg-purple-50 transition-colors"
        >
          <div className="flex items-center">
            <Book className="w-6 h-6 text-purple-600 mr-3" />
            <div className="text-left">
              <div className="font-semibold text-gray-800">Continue Stories</div>
              <div className="text-sm text-gray-500">
                {progress.storiesCompleted} of {progress.totalStories} completed
              </div>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>

        <button
          onClick={() => navigateToNextContent('quiz')}
          className="w-full p-4 bg-white rounded-xl shadow-md flex items-center justify-between hover:bg-purple-50 transition-colors"
        >
          <div className="flex items-center">
            <Award className="w-6 h-6 text-purple-600 mr-3" />
            <div className="text-left">
              <div className="font-semibold text-gray-800">Take Next Quiz</div>
              <div className="text-sm text-gray-500">
                {progress.quizzesCompleted} of {progress.totalQuizzes} completed
              </div>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>

        <button
          onClick={() => setActiveTab('progress')}
          className="w-full p-4 bg-white rounded-xl shadow-md flex items-center justify-between hover:bg-purple-50 transition-colors"
        >
          <div className="flex items-center">
            <BarChart2 className="w-6 h-6 text-purple-600 mr-3" />
            <div className="text-left">
              <div className="font-semibold text-gray-800">Detailed Progress</div>
              <div className="text-sm text-gray-500">
                View all activities
              </div>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
      </div>
    </div>
  );
};
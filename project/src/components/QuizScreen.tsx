import { useState, useEffect } from 'react';
import { Brain } from 'lucide-react';
import { quizzes } from '../data/quizzes';
import { QuizPlayer } from './QuizPlayer';
import { QuizResult } from './QuizResult';
import { Quiz } from '../types/quiz';
import { collection, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

export const QuizScreen = () => {
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [completedQuizzes, setCompletedQuizzes] = useState<Record<string, number>>({});

  useEffect(() => {
    if (!auth.currentUser) return;

    const quizzesRef = collection(db, `users/${auth.currentUser.uid}/completedQuizzes`);
    const unsubscribe = onSnapshot(quizzesRef, (snapshot) => {
      const completed = Object.fromEntries(
        snapshot.docs.map(doc => [doc.id, doc.data().score])
      );
      setCompletedQuizzes(completed);
    });

    return () => unsubscribe();
  }, []);

  const handleQuizComplete = (score: number) => {
    setQuizScore(score);
  };

  const handleRetry = () => {
    setQuizScore(null);
  };

  const handleClose = () => {
    setSelectedQuiz(null);
    setQuizScore(null);
  };

  if (selectedQuiz && quizScore !== null) {
    return (
      <QuizResult
        score={quizScore}
        totalPoints={selectedQuiz.totalPoints}
        onRetry={handleRetry}
        onClose={handleClose}
      />
    );
  }

  if (selectedQuiz) {
    return (
      <QuizPlayer
        quiz={selectedQuiz}
        onClose={handleClose}
        onComplete={handleQuizComplete}
      />
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-purple-600">Quizzes</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quizzes.map((quiz) => (
          <div 
            key={quiz.id} 
            className="relative bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            {completedQuizzes[quiz.id] !== undefined && (
              <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                Score: {completedQuizzes[quiz.id]}%
              </div>
            )}
            <button
              onClick={() => setSelectedQuiz(quiz)}
              className="w-full p-6 text-left"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <Brain className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">{quiz.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{quiz.description}</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-purple-600">
                  {quiz.totalPoints} Points
                </span>
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
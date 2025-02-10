import { useState, useEffect } from 'react';
import { ArrowLeft, Timer } from 'lucide-react';
import { Quiz, QuizQuestion } from '../types/quiz';
import { doc, getDoc, updateDoc, increment, arrayUnion, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

interface QuizPlayerProps {
  quiz: Quiz;
  onClose: () => void;
  onComplete: (score: number) => void;
}

export const QuizPlayer = ({ quiz, onClose, onComplete }: QuizPlayerProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  const playSound = (correct: boolean) => {
    const audio = new Audio(correct ? '/sounds/correct.mp3' : '/sounds/wrong.mp3');
    audio.play().catch(() => {}); // Ignore errors if sound can't play
  };

  const handleAnswer = (optionIndex: number) => {
    if (selectedAnswer !== null) return; // Prevent multiple answers
    
    setSelectedAnswer(optionIndex);
    const correct = optionIndex === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(score + Math.floor(quiz.totalPoints / quiz.questions.length));
      playSound(true);
    } else {
      playSound(false);
    }
    
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
      setShowExplanation(false);
    } else {
      handleQuizComplete(score);
    }
  };

  const handleQuizComplete = async (score: number) => {
    if (!auth.currentUser) return;
    
    const userRef = doc(db, 'users', auth.currentUser.uid);
    const quizRef = doc(db, `users/${auth.currentUser.uid}/completedQuizzes`, quiz.id);
    
    try {
      const finalScore = Math.round((score / quiz.totalPoints) * 100);
      const isPerfect = score === quiz.totalPoints;

      await updateDoc(userRef, {
        totalPoints: increment(score),
        quizzesTaken: increment(1),
        perfectQuizzes: increment(isPerfect ? 1 : 0),
        recentActivities: arrayUnion({
          id: Date.now().toString(),
          type: 'quiz',
          title: quiz.title,
          score: finalScore,
          completedAt: new Date().toISOString()
        })
      });

      // Mark quiz as completed
      await setDoc(quizRef, {
        completedAt: new Date().toISOString(),
        score: finalScore,
        title: quiz.title
      });
    } catch (error) {
      console.error('Error updating completion:', error);
    }

    onComplete(score);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-500 to-pink-500 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button 
            onClick={onClose}
            className="text-white hover:text-purple-200"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="ml-4 flex-1">
            <div className="h-2 bg-white bg-opacity-30 rounded-full">
              <div 
                className="h-2 bg-white rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            {currentQuestion.question}
          </h2>

          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={selectedAnswer !== null}
                className={`w-full p-4 rounded-xl text-left transition-all transform hover:scale-105 ${
                  selectedAnswer === null
                    ? 'bg-gray-100 hover:bg-gray-200'
                    : selectedAnswer === index
                    ? isCorrect
                      ? 'bg-green-100 border-2 border-green-500'
                      : 'bg-red-100 border-2 border-red-500'
                    : index === currentQuestion.correctAnswer && showExplanation
                    ? 'bg-green-100 border-2 border-green-500'
                    : 'bg-gray-100'
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          {showExplanation && (
            <div className={`mt-6 p-4 rounded-xl ${
              isCorrect ? 'bg-green-100' : 'bg-red-100'
            }`}>
              <p className="text-sm">{currentQuestion.explanation}</p>
            </div>
          )}

          {selectedAnswer !== null && (
            <button
              onClick={handleNext}
              className="w-full mt-6 py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-colors"
            >
              {currentQuestionIndex < quiz.questions.length - 1 ? 'Next Question' : 'See Results'}
            </button>
          )}
        </div>

        {/* Score */}
        <div className="mt-4 text-center text-white">
          <p className="text-lg font-bold">Score: {score}</p>
        </div>
      </div>
    </div>
  );
}; 
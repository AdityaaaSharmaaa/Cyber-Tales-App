import { Trophy, ArrowRight, RefreshCw } from 'lucide-react';

interface QuizResultProps {
  score: number;
  totalPoints: number;
  onRetry: () => void;
  onClose: () => void;
}

export const QuizResult = ({ score, totalPoints, onRetry, onClose }: QuizResultProps) => {
  const percentage = (score / totalPoints) * 100;
  
  const getBadge = () => {
    if (percentage >= 90) return '🏆 Quiz Master';
    if (percentage >= 70) return '🌟 Star Student';
    if (percentage >= 50) return '👍 Good Try';
    return '💪 Keep Learning';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md text-center">
        <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
        
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {getBadge()}
        </h2>
        
        <p className="text-4xl font-bold text-purple-600 mb-4">
          {score}/{totalPoints}
        </p>
        
        <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
          <div 
            className="h-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-1000"
            style={{ width: `${percentage}%` }}
          />
        </div>

        <div className="space-y-3">
          <button
            onClick={onRetry}
            className="w-full py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-colors flex items-center justify-center"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Try Again
          </button>
          
          <button
            onClick={onClose}
            className="w-full py-3 bg-gray-100 text-gray-800 rounded-xl font-bold hover:bg-gray-200 transition-colors flex items-center justify-center"
          >
            <ArrowRight className="w-5 h-5 mr-2" />
            Next Quiz
          </button>
        </div>
      </div>
    </div>
  );
}; 
import { useState, useEffect } from 'react';
import { Trophy, Medal } from 'lucide-react';
import { getLeaderboard } from '../utils/gamification';
import { LeaderboardEntry } from '../types/gamification';

export const LeaderboardScreen = () => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLeaderboard = async () => {
      const data = await getLeaderboard();
      setEntries(data);
      setLoading(false);
    };

    loadLeaderboard();
  }, []);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-purple-600">Leaderboard</h2>

      <div className="space-y-4">
        {entries.map((entry, index) => (
          <div
            key={entry.uid}
            className="bg-white rounded-xl p-4 shadow-md flex items-center space-x-4"
          >
            <div className="flex-shrink-0 w-8 text-center">
              {index < 3 ? (
                <Medal className={`w-6 h-6 mx-auto ${
                  index === 0 ? 'text-yellow-500' :
                  index === 1 ? 'text-gray-400' :
                  'text-orange-500'
                }`} />
              ) : (
                <span className="text-gray-500 font-bold">{index + 1}</span>
              )}
            </div>

            <div className="flex-1">
              <h3 className="font-bold text-gray-800">{entry.displayName}</h3>
              <p className="text-sm text-gray-600">{entry.totalPoints} points</p>
            </div>

            {index === 0 && (
              <Trophy className="w-6 h-6 text-yellow-500 animate-bounce" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
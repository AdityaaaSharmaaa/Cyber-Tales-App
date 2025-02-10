export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: number;
  type: 'quiz_score' | 'stories_read' | 'perfect_quiz' | 'login_streak';
}

export interface UserStats {
  uid: string;
  displayName: string;
  totalPoints: number;
  quizzesTaken: number;
  storiesRead: number;
  perfectQuizzes: number;
  loginStreak: number;
  badges: string[];  // Badge IDs
  lastLoginDate: string;
}

export interface LeaderboardEntry {
  uid: string;
  displayName: string;
  totalPoints: number;
  rank?: number;
} 
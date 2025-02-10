export interface UserActivity {
  id: string;
  type: 'quiz' | 'story';
  title: string;
  score?: number;
  completedAt: string;
}

export interface UserStats {
  uid: string;
  email: string;
  displayName: string;
  role: 'kid' | 'parent' | 'teacher';
  totalPoints: number;
  quizzesTaken: number;
  storiesRead: number;
  perfectQuizzes: number;
  loginStreak: number;
  badges: string[];
  lastLoginDate: string;
  recentActivities: UserActivity[];
} 
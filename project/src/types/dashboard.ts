export interface ChildProgress {
  uid: string;
  name: string;
  progress: {
    quizzesTaken: number;
    storiesRead: number;
    totalPoints: number;
  };
}

export interface Activity {
  id: string;
  type: 'quiz' | 'story';
  title: string;
  score?: number;
  completedAt: string;
}

export interface ProgressChart {
  labels: string[];
  data: number[];
}

export interface DashboardFilters {
  timeRange: 'week' | 'month' | 'year';
  metric: 'quizzes' | 'stories' | 'points';
} 
export interface UserProgress {
  userId: string;
  type: 'story' | 'quiz';
  contentId: string;
  completed: boolean;
  timestamp: Date;
} 
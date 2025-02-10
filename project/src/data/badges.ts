import { Badge } from '../types/gamification';

export const badges: Badge[] = [
  {
    id: 'quiz_master',
    name: 'Quiz Master',
    description: 'Score 90% or higher on 5 quizzes',
    icon: '🏆',
    requirement: 5,
    type: 'perfect_quiz'
  },
  {
    id: 'bookworm',
    name: 'Bookworm',
    description: 'Read 10 stories',
    icon: '📚',
    requirement: 10,
    type: 'stories_read'
  },
  {
    id: 'streak_master',
    name: 'Streak Master',
    description: 'Login for 7 days in a row',
    icon: '🔥',
    requirement: 7,
    type: 'login_streak'
  },
  {
    id: 'point_collector',
    name: 'Point Collector',
    description: 'Earn 1000 total points',
    icon: '⭐',
    requirement: 1000,
    type: 'quiz_score'
  }
]; 
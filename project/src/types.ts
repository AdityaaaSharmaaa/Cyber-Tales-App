export interface Story {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
}

export interface Quiz {
  id: string;
  title: string;
  score: number;
  totalQuestions: number;
}

export interface LeaderboardEntry {
  id: string;
  username: string;
  score: number;
  avatar: string;
}
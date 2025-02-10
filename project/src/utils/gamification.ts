import { db } from '../config/firebase';
import { collection, doc, getDoc, getDocs, updateDoc, query, orderBy, limit } from 'firebase/firestore';
import { UserStats, LeaderboardEntry } from '../types/gamification';
import { badges } from '../data/badges';

export const getUserStats = async (uid: string): Promise<UserStats> => {
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);
  
  if (!docSnap.exists()) {
    throw new Error('User stats not found');
  }
  
  return docSnap.data() as UserStats;
};

export const updateUserStats = async (uid: string, updates: Partial<UserStats>) => {
  const docRef = doc(db, 'users', uid);
  await updateDoc(docRef, updates);
};

export const checkAndAwardBadges = async (stats: UserStats): Promise<string[]> => {
  const newBadges: string[] = [];
  
  for (const badge of badges) {
    if (!stats.badges.includes(badge.id)) {
      let requirement = 0;
      
      switch (badge.type) {
        case 'quiz_score':
          requirement = stats.totalPoints;
          break;
        case 'stories_read':
          requirement = stats.storiesRead;
          break;
        case 'perfect_quiz':
          requirement = stats.perfectQuizzes;
          break;
        case 'login_streak':
          requirement = stats.loginStreak;
          break;
      }
      
      if (requirement >= badge.requirement) {
        newBadges.push(badge.id);
        stats.badges.push(badge.id);
      }
    }
  }
  
  if (newBadges.length > 0) {
    await updateUserStats(stats.uid, { badges: stats.badges });
  }
  
  return newBadges;
};

export const getLeaderboard = async (): Promise<LeaderboardEntry[]> => {
  const q = query(
    collection(db, 'users'),
    orderBy('totalPoints', 'desc'),
    limit(10)
  );
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc, index) => ({
    uid: doc.id,
    displayName: doc.data().displayName,
    totalPoints: doc.data().totalPoints,
    rank: index + 1
  }));
}; 
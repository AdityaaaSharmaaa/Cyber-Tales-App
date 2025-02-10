import { db } from '../config/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { ChildProgress, DashboardFilters, ProgressChart } from '../types/dashboard';

export const getChildrenProgress = async (parentId: string): Promise<ChildProgress[]> => {
  const q = query(
    collection(db, 'users'),
    where('parentId', '==', parentId),
    where('role', '==', 'kid')
  );
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    uid: doc.id,
    ...doc.data()
  } as ChildProgress));
};

export const getClassProgress = async (teacherId: string): Promise<ChildProgress[]> => {
  const q = query(
    collection(db, 'users'),
    where('teacherId', '==', teacherId),
    where('role', '==', 'kid')
  );
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    uid: doc.id,
    ...doc.data()
  } as ChildProgress));
};

export const generateChartData = (
  children: ChildProgress[],
  filters: DashboardFilters
): ProgressChart => {
  const data = children.map(child => {
    switch (filters.metric) {
      case 'quizzes': return child.progress.quizzesTaken;
      case 'stories': return child.progress.storiesRead;
      case 'points': return child.progress.totalPoints;
    }
  });

  return {
    labels: children.map(child => child.name),
    data
  };
}; 
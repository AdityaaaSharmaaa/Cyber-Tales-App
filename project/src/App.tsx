import { useState, useEffect } from 'react';
import { auth } from './config/firebase';
import { User } from 'firebase/auth';
import { Navigation } from './components/Navigation';
import { HomeScreen } from './components/HomeScreen';
import { QuizScreen } from './components/QuizScreen';
import { LeaderboardScreen } from './components/LeaderboardScreen';
import { AuthScreen } from './components/AuthScreen';
import { RewardsScreen } from './components/RewardsScreen';
import { ParentDashboard } from './components/ParentDashboard';
import { TeacherDashboard } from './components/TeacherDashboard';
import { getDoc, doc } from 'firebase/firestore';
import { db } from './config/firebase';
import { ProfileScreen } from './components/ProfileScreen';
import { LoadingScreen } from './components/LoadingScreen';
import AIStoryGenerator from './components/AIStoryGenerator';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      try {
        setUser(user);
        if (user) {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setUserRole(userDoc.data()?.role);
          }
        } else {
          setUserRole(null);
        }
      } catch (error: any) {
        console.error('Auth error:', error);
        if (error?.message?.includes('offline')) {
          alert('You appear to be offline. Please check your internet connection.');
        }
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <AuthScreen />;
  }

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return userRole === 'parent' ? <ParentDashboard /> :
               userRole === 'teacher' ? <TeacherDashboard /> :
               <HomeScreen setActiveTab={setActiveTab} />;
      case 'stories':
        return <AIStoryGenerator />;
      case 'quiz':
        return <QuizScreen />;
      case 'rewards':
        return <RewardsScreen />;
      case 'profile':
        return <ProfileScreen />;
      case 'leaderboard':
        return <LeaderboardScreen />;
      default:
        return <HomeScreen setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {renderScreen()}
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

export default App;
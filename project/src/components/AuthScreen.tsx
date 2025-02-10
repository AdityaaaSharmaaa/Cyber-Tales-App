import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, UserCheck } from 'lucide-react';
import { auth } from '../config/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

type UserRole = 'kid' | 'parent' | 'teacher';

export const AuthScreen = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('kid');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await handleRegister();
      }
    } catch (err: any) {
      console.error('Auth error:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError('Please enter your email first');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      alert('Password reset email sent!');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userRef = doc(db, 'users', userCredential.user.uid);
      
      const userData = {
        uid: userCredential.user.uid,
        email,
        displayName: email.split('@')[0],
        role,
        // Initialize stats
        totalPoints: 0,
        quizzesTaken: 0,
        storiesRead: 0,
        perfectQuizzes: 0,
        loginStreak: 0,
        badges: [],
        lastLoginDate: new Date().toISOString(),
        recentActivities: []
      };

      // Wait for the document to be created
      await setDoc(userRef, userData, { merge: true });
      
      // Verify the document was created
      const docSnap = await getDoc(userRef);
      if (!docSnap.exists()) {
        throw new Error('Failed to create user document');
      }
      
      console.log('User document created successfully:', docSnap.data());
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-xl">
        <h1 className="text-3xl font-bold text-center text-purple-600 mb-8">
          {isLogin ? 'Welcome Back!' : 'Join the Adventure!'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full pl-12 pr-12 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {!isLogin && (
              <div className="relative">
                <UserCheck className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as UserRole)}
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="kid">Kid</option>
                  <option value="parent">Parent</option>
                  <option value="teacher">Teacher</option>
                </select>
              </div>
            )}
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-100 text-red-600 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isLoading ? 'Loading...' : isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6 text-center">
          {isLogin && (
            <button
              onClick={handleForgotPassword}
              className="text-sm text-purple-600 hover:underline mb-4 block mx-auto"
            >
              Forgot Password?
            </button>
          )}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-gray-600 hover:text-purple-600"
          >
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Login'}
          </button>
        </div>
      </div>
    </div>
  );
}; 
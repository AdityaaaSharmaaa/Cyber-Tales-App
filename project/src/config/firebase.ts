import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { 
  initializeFirestore,
  persistentLocalCache,
  persistentSingleTabManager
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCnqqiXAFsFHtSqsaqUW0tTHVgS7Lu2ejI",
  authDomain: "cybertales.firebaseapp.com",
  projectId: "cybertales",
  storageBucket: "cybertales.firebasestorage.app",
  messagingSenderId: "1076223709418",
  appId: "1:1076223709418:web:cf1b53c2512f65b0ed4793"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Initialize Firestore with persistence enabled
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    cacheSizeBytes: 50000000,
    tabManager: persistentSingleTabManager({ forceOwnership: true })
  })
}); 
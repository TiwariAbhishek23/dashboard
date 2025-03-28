import { initializeApp, getApps } from 'firebase/app';
import { getAuth, onAuthStateChanged, setPersistence, browserLocalPersistence, User } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
let firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(firebase_app);

// Set persistence to LOCAL to maintain the auth state
setPersistence(auth, browserLocalPersistence).catch((error) => {
  console.error('[Firebase] Error setting auth persistence:', error);
});

// Define storage keys
const TOKEN_STORAGE_KEY = 'firebase:token';
const USER_STORAGE_KEY = `firebase:authUser:${firebaseConfig.apiKey}:[DEFAULT]`;

// Enhanced auth state management with token handling
export function useAuth() {
  return {
    onAuthStateChanged: (callback: (user: User | null) => void) => {
      return onAuthStateChanged(auth, async (user) => {
        if (user) {
          console.log('[Firebase] Auth state changed: User logged in', {
            uid: user.uid,
            email: user.email,
            emailVerified: user.emailVerified
          });
          
          try {
            const token = await user.getIdToken(true); // Force refresh token
            console.log('[Firebase] Token fetched successfully:', token.substring(0, 10) + '...');
            // Store token in localStorage for cross-app synchronization
            localStorage.setItem(TOKEN_STORAGE_KEY, token);
            // Dispatch storage event manually for same-window updates
            window.dispatchEvent(new StorageEvent('storage', {
              key: TOKEN_STORAGE_KEY,
              newValue: token,
              oldValue: null,
              storageArea: localStorage
            }));
          } catch (error) {
            console.error('[Firebase] Error fetching token:', error);
            localStorage.removeItem(TOKEN_STORAGE_KEY);
            // Dispatch storage event for token removal
            window.dispatchEvent(new StorageEvent('storage', {
              key: TOKEN_STORAGE_KEY,
              newValue: null,
              oldValue: localStorage.getItem('firebase:token'),
              storageArea: localStorage
            }));
          }
        } else {
          console.log('[Firebase] Auth state changed: User logged out');
          const oldToken = localStorage.getItem(TOKEN_STORAGE_KEY);
          localStorage.removeItem(TOKEN_STORAGE_KEY);
          // Dispatch storage event for logout
          window.dispatchEvent(new StorageEvent('storage', {
            key: 'firebase:token',
            newValue: null,
            oldValue: oldToken,
            storageArea: localStorage
          }));
        }
        callback(user);
      });
    }
  };
}

export default firebase_app;
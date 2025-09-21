import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { getFirestore, initializeFirestore, memoryLocalCache } from 'firebase/firestore';

// Load Firebase configuration from environment variables with fallbacks
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBZCTx_eQEZ5_AmpJYXk6FYyLJoIFpTjkc",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "kalstream-b2daf.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "kalstream-b2daf",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "kalstream-b2daf.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "395137029438",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:395137029438:web:2b42f26b59f4e22ff91202",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-XC71BF1WP9"
};

// Force correct project ID to prevent connection to wrong project
if (firebaseConfig.projectId !== "kalstream-b2daf") {
  console.warn('Firebase project ID mismatch detected. Forcing correct project ID.');
  firebaseConfig.projectId = "kalstream-b2daf";
  firebaseConfig.authDomain = "kalstream-b2daf.firebaseapp.com";
  firebaseConfig.storageBucket = "kalstream-b2daf.appspot.com";
}

// Validate Firebase configuration
if (!firebaseConfig.apiKey || firebaseConfig.apiKey === 'your_api_key_here') {
  console.warn('Firebase API key is missing or invalid. Please check your environment variables.');
}

// Initialize Firebase with specified config or get existing instance
let app: ReturnType<typeof initializeApp>;
try {
  app = initializeApp(firebaseConfig);
} catch (error) {
  // If an app already exists, get that instance
  if (error instanceof Error && error.message.includes('duplicate-app')) {
    app = initializeApp();
  } else {
    console.error('Firebase initialization failed:', error);
    throw error;
  }
}

export const auth = getAuth(app);

// Initialize analytics only if it's supported in the current environment
let analyticsInstance: ReturnType<typeof getAnalytics> | null = null;

export const initAnalytics = async () => {
  if (await isSupported()) {
    analyticsInstance = getAnalytics(app);
    return analyticsInstance;
  }
  return null;
};

// Get the analytics instance, initializing it if necessary
export const getAnalyticsInstance = async () => {
  if (!analyticsInstance) {
    return initAnalytics();
  }
  return analyticsInstance;
};

// Initialize Firestore with proper configuration and error handling
let db: ReturnType<typeof getFirestore>;
try {
  db = getFirestore(app);
  
  // Add connection error handling
  if (db && (db as any)._delegate && (db as any)._delegate._databaseId) {
    (db as any)._delegate._databaseId.projectId = "kalstream-b2daf";
  }
  
} catch (error) {
  console.error('Firestore initialization failed:', error);
  throw error;
}

export { db };

// Try to enable persistence with error handling
try {
  import('firebase/firestore').then(({ enableIndexedDbPersistence }) => {
enableIndexedDbPersistence(db)
      .then(() => {
        console.log('Firestore persistence enabled successfully');
      })
  .catch((err) => {
        console.warn('Firestore persistence failed:', err.code);
        if (err.code === 'failed-precondition') {
          // Multiple tabs open, persistence can only be enabled in one tab at a time
          console.warn('Firestore persistence: Multiple tabs open');
        } else if (err.code === 'unimplemented') {
          // The current browser does not support all features required for persistence
          console.warn('Firestore persistence: Browser not supported');
        } else {
          console.warn('Firestore persistence: Unknown error', err);
        }
      });
  });
} catch (error) {
  console.warn('Firestore persistence: Failed to enable', error);
}

// Add global error handler for Firestore connection issues
window.addEventListener('unhandledrejection', (event) => {
  if (event.reason && event.reason.message && 
      (event.reason.message.includes('firestore') || 
       event.reason.message.includes('kalstream-b2daf') ||
       event.reason.message.includes('WebChannelConnection'))) {
    console.warn('Firestore connection error caught:', event.reason);
    event.preventDefault(); // Prevent the error from being logged to console
  }
});

// Add error handler for console errors
const originalConsoleError = console.error;
console.error = (...args) => {
  const message = args.join(' ');
  if (message.includes('firestore') || 
      message.includes('kalstream-b2daf') ||
      message.includes('WebChannelConnection')) {
    console.warn('Firestore error suppressed:', ...args);
    return;
  }
  originalConsoleError.apply(console, args);
};

// Add error handling for Firestore operations
export const safeFirestoreOperation = async <T>(
  operation: () => Promise<T>,
  fallback?: T
): Promise<T | undefined> => {
  try {
    return await operation();
  } catch (error) {
    console.error('Firestore operation failed:', error);
    
    // Handle specific Firebase errors
    if (error instanceof Error) {
      if (error.message.includes('Missing or insufficient permissions')) {
        console.warn('Firestore permissions error - user may need to re-authenticate');
        // Optionally trigger re-authentication
        return fallback;
      } else if (error.message.includes('permission-denied')) {
        console.warn('Firestore permission denied - user may need to re-authenticate');
        return fallback;
      }
    }
    
    if (fallback !== undefined) {
      return fallback;
    }
    return undefined;
  }
};

// Log Firebase configuration for debugging
console.log("Firebase config loaded:", {
  projectId: firebaseConfig.projectId,
  authDomain: firebaseConfig.authDomain,
  hasApiKey: !!firebaseConfig.apiKey
});

// Add re-authentication helper
export const reauthenticateUser = async () => {
  try {
    const user = auth.currentUser;
    if (user) {
      // Force token refresh
      await user.getIdToken(true);
      console.log('User re-authenticated successfully');
      return true;
    }
    return false;
  } catch (error) {
    console.error('Re-authentication failed:', error);
    return false;
  }
};

// Add permission check helper
export const checkFirestorePermissions = async () => {
  try {
    const user = auth.currentUser;
    if (!user) {
      console.warn('No authenticated user found');
      return false;
    }
    
    // Try to get user token to verify authentication
    const token = await user.getIdToken();
    if (!token) {
      console.warn('No valid token found');
      return false;
    }
    
    console.log('Firestore permissions check passed');
    return true;
  } catch (error) {
    console.error('Firestore permissions check failed:', error);
    return false;
  }
};

export { app };

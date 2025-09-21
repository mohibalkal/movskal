
import React, { useEffect, useState } from 'react';
import { 
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { auth } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import { AuthContext, AuthContextType } from '@/contexts/auth';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleAuthError = (error: FirebaseError) => {
    toast({
      title: "Authentication Error",
      description: error.message,
      variant: "destructive",
    });
    // Do not throw error here to avoid unhandled promise rejections in React context
  };

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: "Welcome back!",
        description: "You have successfully signed in.",
      });
    } catch (error) {
      if (error instanceof FirebaseError) {
        handleAuthError(error);
        return;
      }
      // Optionally handle non-Firebase errors here
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast({
        title: "Account created",
        description: "Your account has been created successfully.",
      });
    } catch (error) {
      if (error instanceof FirebaseError) {
        handleAuthError(error);
      }
      throw error;
    }
  };

  // Note: To fully resolve COOP/COEP issues with popup authentication,
  // ensure your server sets these headers:
  // Cross-Origin-Opener-Policy: same-origin
  // Cross-Origin-Embedder-Policy: require-corp
  // This is required for secure popup window handling in modern browsers.

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const popup = window.open('', '_blank');
      if (popup) {
        popup.close(); // Preload and close to avoid popup blockers
      }
      const result = await signInWithPopup(auth, provider);
      // Check if popup was closed by user
      if (popup && popup.closed) {
        toast({
          title: "Popup Closed",
          description: "Authentication popup was closed before completing sign-in.",
          variant: "destructive",
        });
        return;
      }
      toast({
        title: "Welcome!",
        description: "You have successfully signed in with Google.",
      });
    } catch (error) {
      if (error instanceof FirebaseError) {
        // Fallback to redirect if popup is blocked or interrupted
        if (
          error.code === 'auth/popup-blocked' ||
          error.code === 'auth/cancelled-popup-request' ||
          error.code === 'auth/popup-closed-by-user'
        ) {
          try {
            const provider = new GoogleAuthProvider();
            await signInWithRedirect(auth, provider);
            return;
          } catch (redirectError) {
            if (redirectError instanceof FirebaseError) {
              handleAuthError(redirectError);
              return;
            }
          }
        }
        handleAuthError(error);
        return;
      }
      // Optionally handle non-Firebase errors here
    }
  };

  const logout = async () => {
    console.log("logout function called");
    try {
      await signOut(auth);
      toast({
      title: "Signed out",
        description: "You have been signed out successfully.",
      });
    } catch (error) {
      if (error instanceof FirebaseError) {
        handleAuthError(error);
        return;
      }
      // Optionally handle non-Firebase errors here
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      signIn,
      signUp,
      signInWithGoogle,
      logout,
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// Function to refresh the Firebase Auth token
const refreshToken = async () => {
  try {
    const user = auth.currentUser;
    if (user) {
      await user.getIdToken(true); // Force refresh
      console.log("Token refreshed successfully");
    }
  } catch (error) {
    console.error("Error refreshing token:", error);
  }
};

// Set interval to refresh token every 30 minutes
setInterval(refreshToken, 30 * 60 * 1000);

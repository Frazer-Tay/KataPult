import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, googleProvider, db } from '../firebase';
import { signInWithPopup, signInWithRedirect, signOut, onAuthStateChanged, getRedirectResult, setPersistence, browserLocalPersistence, browserSessionPersistence } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null); // Custom data from Firestore (e.g. username)
  const [loading, setLoading] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false); // Flag to trigger onboarding
  const [authError, setAuthError] = useState(null); // Store auth errors

  async function loginWithGoogle() {
    setAuthError(null);

    try {
      // Force account selection to clear bad auth state on iOS and bypass corrupt passkey sessions
      googleProvider.setCustomParameters({ prompt: 'select_account' });

      // Explicitly set persistence before login to catch environments where storage is blocked
      await setPersistence(auth, browserLocalPersistence).catch(() => {
        return setPersistence(auth, browserSessionPersistence);
      });

      // ALWAYS default to popup on all platforms to prevent iOS WebKit tracking prevention
      // from wiping out the redirect session state.
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Check if user exists in Firestore
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        setIsNewUser(true); // User needs to pick a username
      } else {
        setUserData(userSnap.data());
      }
      return user;
    } catch (error) {
      console.error("Google sign-in failed", {
        code: error.code,
        message: error.message,
        customData: error.customData,
        authDomain: auth.app.options.authDomain,
        currentOrigin: window.location.origin,
        userAgent: navigator.userAgent
      });
      setAuthError(error);
      throw error;
    }
  }

  function logout() {
    setUserData(null);
    setIsNewUser(false);
    return signOut(auth);
  }

  // Function called during onboarding to save the chosen username
  async function completeOnboarding(username) {
    if (!currentUser) return;
    if (!isNewUser) {
      console.warn("Attempted to onboard an already existing user. Aborting.");
      return;
    }

    try {
      const userRef = doc(db, 'users', currentUser.uid);
      const newData = {
        uid: currentUser.uid,
        email: currentUser.email,
        displayName: currentUser.displayName,
        photoURL: currentUser.photoURL,
        username: username,
        role: 'learner',
        xp: 0,
        streak: 0,
        level: 1,
        lastActiveDate: new Date().toLocaleDateString('en-CA'),
        createdAt: serverTimestamp()
      };

      // Use merge: true so if by some fluke the document exists, we don't wipe out other fields
      await setDoc(userRef, newData, { merge: true });
      setUserData(newData);
      setIsNewUser(false);
    } catch (error) {
      console.error("Error saving username:", error);
      throw error;
    }
  }

  async function addExperience(amount) {
    if (!currentUser || !userData) return;

    try {
      const userRef = doc(db, 'users', currentUser.uid);

      const todayDate = new Date();
      const todayStr = todayDate.toLocaleDateString('en-CA'); // Format: YYYY-MM-DD
      const lastActiveDateStr = userData.lastActiveDate || '';

      let newStreak = userData.streak || 0;

      if (lastActiveDateStr !== todayStr) {
        if (lastActiveDateStr) {
          const lastActiveDate = new Date(lastActiveDateStr);
          // Set both dates to midnight to calculate day difference accurately
          todayDate.setHours(0, 0, 0, 0);
          lastActiveDate.setHours(0, 0, 0, 0);

          const diffTime = todayDate.getTime() - lastActiveDate.getTime();
          const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

          if (diffDays === 1) {
            newStreak += 1;
          } else if (diffDays > 1) {
            newStreak = 1; // Reset streak if missed a day
          }
        } else {
          newStreak = 1;
        }
      }

      const newXP = (userData.xp || 0) + amount;

      const updateData = {
        xp: newXP,
        streak: newStreak,
        lastActiveDate: todayStr
      };

      await setDoc(userRef, updateData, { merge: true });
      setUserData(prev => ({ ...prev, ...updateData }));

    } catch (error) {
      console.error("Error adding experience:", error);
    }
  }

  useEffect(() => {
    let isMounted = true;
    let unsubscribe = () => {};

    const initializeAuth = async () => {
      try {
        await getRedirectResult(auth);
      } catch (error) {
        console.error("Redirect auth error:", error);
        if (isMounted) setAuthError(error);
      }

      unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (!isMounted) return;
        setCurrentUser(user);

        if (user) {
          try {
            // Fetch custom user data if they exist
            const userRef = doc(db, 'users', user.uid);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
              setUserData(userSnap.data());
              import('../utils/analytics').then(({ identifyUser }) => {
                identifyUser(user.uid, { email: user.email, username: userSnap.data().username });
              });
            } else {
              setIsNewUser(true);
              import('../utils/analytics').then(({ identifyUser }) => {
                identifyUser(user.uid, { email: user.email });
              });
            }
          } catch (err) {
            console.error("Error fetching user data:", err);
          }
        } else {
          setUserData(null);
          setIsNewUser(false);
        }

        setLoading(false);
      });
    };

    initializeAuth();

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  const value = {
    currentUser,
    userData,
    isAdmin: userData?.role === 'admin',
    isNewUser,
    authError,
    setAuthError,
    loginWithGoogle,
    logout,
    completeOnboarding,
    addExperience
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

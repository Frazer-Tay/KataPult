import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, googleProvider, db } from '../firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
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

  async function loginWithGoogle() {
    try {
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
      console.error("Error logging in with Google:", error);
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
        createdAt: serverTimestamp()
      };
      
      await setDoc(userRef, newData);
      setUserData(newData);
      setIsNewUser(false);
    } catch (error) {
      console.error("Error saving username:", error);
      throw error;
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
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
      } else {
        setUserData(null);
        setIsNewUser(false);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userData,
    isAdmin: userData?.role === 'admin',
    isNewUser,
    loginWithGoogle,
    logout,
    completeOnboarding
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

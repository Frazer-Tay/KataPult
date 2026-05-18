import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from './AuthContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { recordLearnerActivity } from '../utils/activityTracker';

const ProgressContext = createContext();

export const useProgress = () => useContext(ProgressContext);

export const ProgressProvider = ({ children }) => {
  const { currentUser, userData } = useAuth();
  
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [level, setLevel] = useState(1);
  const [lastActiveDate, setLastActiveDate] = useState(null);
  const [dailyChallengeStatus, setDailyChallengeStatus] = useState('available');

  // Use refs to hold the latest state for callbacks without triggering re-renders
  const stateRef = useRef({ xp: 0, streak: 0, lastActiveDate: null });

  // Initialize from userData or localStorage (fallback)
  useEffect(() => {
    // If logged in, use cloud data
    let storedXp = 0;
    let storedStreak = 0;
    let storedDate = null;
    let storedDailyChallengeDate = null;
    let storedDailyChallengeStatus = null;

    if (userData) {
      storedXp = userData.xp || 0;
      storedStreak = userData.streak || 0;
      storedDate = userData.lastActiveDate || null;
      storedDailyChallengeDate = userData.lastDailyChallengeDate || null;
      storedDailyChallengeStatus = userData.dailyChallengeStatus || null;
    } else {
      // Fallback for unauthenticated state (e.g. before login)
      storedXp = parseInt(localStorage.getItem('katapult_xp') || '0', 10);
      storedStreak = parseInt(localStorage.getItem('katapult_streak') || '0', 10);
      storedDate = localStorage.getItem('katapult_last_active_date');
      storedDailyChallengeDate = localStorage.getItem('katapult_last_daily_challenge_date');
      storedDailyChallengeStatus = localStorage.getItem('katapult_daily_challenge_status');
    }

    setXp(storedXp);
    setLevel(Math.floor(storedXp / 100) + 1);
    stateRef.current.xp = storedXp;

    const today = new Date().toISOString().split('T')[0];

    // Check daily challenge status
    if (storedDailyChallengeDate === today && storedDailyChallengeStatus) {
      setDailyChallengeStatus(storedDailyChallengeStatus); // 'completed' or 'failed'
    } else {
      setDailyChallengeStatus('available');
      localStorage.removeItem('katapult_daily_challenge_status');
    }

    if (storedDate) {
      const lastDateObj = new Date(storedDate);
      const todayObj = new Date(today);
      const diffTime = Math.abs(todayObj - lastDateObj);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

      if (diffDays === 0) {
        setStreak(storedStreak);
        setLastActiveDate(storedDate);
      } else if (diffDays === 1) {
        setStreak(storedStreak + 1);
        setLastActiveDate(today);
      } else {
        setStreak(1);
        setLastActiveDate(today);
      }
    } else {
      setStreak(1);
      setLastActiveDate(today);
      stateRef.current.streak = 1;
      stateRef.current.lastActiveDate = today;
    }
  }, [userData]); // Re-run when userData loads

  // Keep ref in sync
  useEffect(() => {
    stateRef.current = { xp, streak, lastActiveDate };
  }, [xp, streak, lastActiveDate]);

  const addXP = useCallback(async (amount) => {
    const { xp: currentXp, streak: currentStreak, lastActiveDate: currentLastActiveDate } = stateRef.current;
    
    let newXp = currentXp + amount;
    let newLevel = Math.floor(newXp / 100) + 1;
    let newStreak = currentStreak;
    const today = new Date().toISOString().split('T')[0];
    let didUpdateStreak = false;

    if (currentLastActiveDate !== today) {
        newStreak = currentStreak + 1;
        setLastActiveDate(today);
        didUpdateStreak = true;
    }

    // Update Ref immediately so rapid consecutive calls don't overwrite each other
    stateRef.current = { 
      xp: newXp, 
      streak: newStreak, 
      lastActiveDate: didUpdateStreak ? today : currentLastActiveDate 
    };

    // Optimistic UI update
    setXp(newXp);
    setLevel(newLevel);
    if (didUpdateStreak) setStreak(newStreak);

    // Sync to Cloud
    if (currentUser) {
      try {
        recordLearnerActivity({
          eventType: 'xp_awarded',
          xpAmount: amount
        }).catch((e) => {
          console.warn('Failed to record XP award:', e);
        });

        const updates = { xp: newXp, level: newLevel };
        if (didUpdateStreak) {
          updates.streak = newStreak;
          updates.lastActiveDate = today;
        }
        await updateDoc(doc(db, 'users', currentUser.uid), updates);
      } catch (e) {
        console.error("Failed to sync XP to cloud:", e);
      }
    } else {
      // Local fallback
      localStorage.setItem('katapult_xp', newXp);
      if (didUpdateStreak) {
        localStorage.setItem('katapult_streak', newStreak);
        localStorage.setItem('katapult_last_active_date', today);
      }
    }
  }, [currentUser]);

  const completeDailyChallenge = useCallback(async (status) => {
    const today = new Date().toISOString().split('T')[0];
    setDailyChallengeStatus(status);
    
    if (currentUser) {
      try {
        await updateDoc(doc(db, 'users', currentUser.uid), {
          dailyChallengeStatus: status,
          lastDailyChallengeDate: today
        });
      } catch (e) {
        console.error("Failed to sync daily challenge:", e);
      }
    } else {
      localStorage.setItem('katapult_last_daily_challenge_date', today);
      localStorage.setItem('katapult_daily_challenge_status', status);
    }
    
    if (status === 'completed') {
      recordLearnerActivity({
        eventType: 'test_result',
        section: 'Daily Challenge',
        route: '/daily-challenge',
        score: 50,
        completed: true
      }).catch((e) => {
        console.warn('Failed to record daily challenge result:', e);
      });
      await addXP(50);
    } else {
      recordLearnerActivity({
        eventType: 'test_result',
        section: 'Daily Challenge',
        route: '/daily-challenge',
        score: 0,
        completed: true
      }).catch((e) => {
        console.warn('Failed to record daily challenge result:', e);
      });
    }
  }, [currentUser, addXP]);

  // Memoize the context value to prevent unnecessary re-renders of consuming components
  const contextValue = React.useMemo(() => ({
    xp, 
    streak, 
    level, 
    addXP, 
    dailyChallengeStatus, 
    completeDailyChallenge
  }), [xp, streak, level, addXP, dailyChallengeStatus, completeDailyChallenge]);

  return (
    <ProgressContext.Provider value={contextValue}>
      {children}
    </ProgressContext.Provider>
  );
};

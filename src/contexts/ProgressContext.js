import React, { createContext, useContext, useState, useEffect } from 'react';

const ProgressContext = createContext();

export const useProgress = () => useContext(ProgressContext);

export const ProgressProvider = ({ children }) => {
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [level, setLevel] = useState(1);
  const [lastActiveDate, setLastActiveDate] = useState(null);
  const [dailyChallengeStatus, setDailyChallengeStatus] = useState('available');

  // Initialize from localStorage
  useEffect(() => {
    const storedXp = parseInt(localStorage.getItem('katapult_xp') || '0', 10);
    const storedStreak = parseInt(localStorage.getItem('katapult_streak') || '0', 10);
    const storedDate = localStorage.getItem('katapult_last_active_date');
    const storedDailyChallengeDate = localStorage.getItem('katapult_last_daily_challenge_date');
    const storedDailyChallengeStatus = localStorage.getItem('katapult_daily_challenge_status');
    
    setXp(storedXp);
    setLevel(Math.floor(storedXp / 100) + 1);

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
        // Already active today
        setStreak(storedStreak);
        setLastActiveDate(storedDate);
      } else if (diffDays === 1) {
        // Consecutive day
        setStreak(storedStreak + 1);
        setLastActiveDate(today);
        localStorage.setItem('katapult_streak', storedStreak + 1);
        localStorage.setItem('katapult_last_active_date', today);
      } else {
        // Streak broken
        setStreak(1);
        setLastActiveDate(today);
        localStorage.setItem('katapult_streak', 1);
        localStorage.setItem('katapult_last_active_date', today);
      }
    } else {
      // First time
      setStreak(1);
      setLastActiveDate(today);
      localStorage.setItem('katapult_streak', 1);
      localStorage.setItem('katapult_last_active_date', today);
    }
  }, []);

  const addXP = (amount) => {
    setXp((prevXp) => {
      const newXp = prevXp + amount;
      localStorage.setItem('katapult_xp', newXp);
      setLevel(Math.floor(newXp / 100) + 1);
      return newXp;
    });

    // Ensure streak is counted if they earn XP
    const today = new Date().toISOString().split('T')[0];
    if (lastActiveDate !== today) {
        setLastActiveDate(today);
        setStreak(prev => {
            const newStreak = prev + 1;
            localStorage.setItem('katapult_streak', newStreak);
            return newStreak;
        });
        localStorage.setItem('katapult_last_active_date', today);
    }
  };

  const completeDailyChallenge = (status) => { // 'completed' or 'failed'
    const today = new Date().toISOString().split('T')[0];
    setDailyChallengeStatus(status);
    localStorage.setItem('katapult_last_daily_challenge_date', today);
    localStorage.setItem('katapult_daily_challenge_status', status);
    
    if (status === 'completed') {
      addXP(50); // 50 XP bonus for completing
    }
  };

  return (
    <ProgressContext.Provider value={{ xp, streak, level, addXP, dailyChallengeStatus, completeDailyChallenge }}>
      {children}
    </ProgressContext.Provider>
  );
};

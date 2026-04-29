// src/components/AnalyticsTracker.js
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView, trackEvent, initAnalytics } from '../utils/analytics'; // Assuming your utility is in src/utils/analytics.js

const AnalyticsTracker = () => {
  const location = useLocation();
  const sessionStartTimeRef = useRef(Date.now());

  useEffect(() => {
    // Initialize Analytics if it hasn't been already
    initAnalytics(); 
  }, []);

  useEffect(() => {
    // Track page view when location changes
    trackPageView(location.pathname + location.search);
  }, [location]);

  useEffect(() => {
    // Track total session time when user leaves or closes the tab
    const handleBeforeUnloadOrVisibilityChange = () => {
      if (document.visibilityState === 'hidden' || document.visibilityState === 'unloaded') {
        const endTime = Date.now();
        const durationInSeconds = Math.round((endTime - sessionStartTimeRef.current) / 1000);
        
        if (durationInSeconds >= 1) {
          trackEvent('Total_Session_Time', {
            duration_seconds: durationInSeconds
          });
          // Reset timer so if they come back to the tab, it starts a new "session segment"
          sessionStartTimeRef.current = Date.now();
        }
      } else if (document.visibilityState === 'visible') {
        // User came back to the tab, reset timer
        sessionStartTimeRef.current = Date.now();
      }
    };

    window.addEventListener('visibilitychange', handleBeforeUnloadOrVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnloadOrVisibilityChange);

    return () => {
      window.removeEventListener('visibilitychange', handleBeforeUnloadOrVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnloadOrVisibilityChange);
    };
  }, []);

  return null; // This component does not render anything
};

export default AnalyticsTracker;
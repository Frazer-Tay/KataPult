// src/components/AnalyticsTracker.js
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView, trackEvent, initAnalytics } from '../utils/analytics';

const AnalyticsTracker = () => {
  const location = useLocation();
  const sessionStartTimeRef = useRef(Date.now());

  useEffect(() => {
    initAnalytics(); 
  }, []);

  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);

  useEffect(() => {
    const handleBeforeUnloadOrVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        const endTime = Date.now();
        const durationInSeconds = Math.round((endTime - sessionStartTimeRef.current) / 1000);
        
        if (durationInSeconds >= 1) {
          trackEvent('Total_Session_Time', {
            duration_seconds: durationInSeconds
          });
          sessionStartTimeRef.current = Date.now();
        }
      } else if (document.visibilityState === 'visible') {
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

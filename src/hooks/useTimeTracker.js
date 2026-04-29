import { useEffect, useRef } from 'react';
import { trackEvent } from '../utils/analytics';

/**
 * Custom hook to track the time a user spends on a specific section/component.
 * It records the start time on mount and sends a GA event with the duration on unmount.
 * 
 * @param {string} sectionName - The name of the section (e.g., 'Vocabulary', 'Imbuhan')
 */
const useTimeTracker = (sectionName) => {
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    // Reset start time on mount (in case component remounts without unmounting fully in strict mode)
    startTimeRef.current = Date.now();

    return () => {
      // Calculate duration on unmount
      const endTime = Date.now();
      const durationInSeconds = Math.round((endTime - startTimeRef.current) / 1000);

      // Only send if they spent at least 1 second
      if (durationInSeconds >= 1) {
        trackEvent('Time_Spent_Section', {
          section: sectionName,
          duration_seconds: durationInSeconds
        });
      }
    };
  }, [sectionName]);
};

export default useTimeTracker;

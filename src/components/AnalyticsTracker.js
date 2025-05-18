// src/components/AnalyticsTracker.js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView, initGA } from '../utils/analytics'; // Assuming your utility is in src/utils/analytics.js

const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Initialize GA if it hasn't been already (e.g., if index.js initialization was missed or for robustness)
    // Although, initGA in index.js should ideally handle this once.
    // This component is primarily for tracking page views on route changes.
    initGA(); // Call initGA here as well to ensure it's initialized before tracking
  }, []);


  useEffect(() => {
    // Track page view when location changes
    trackPageView(location.pathname + location.search);
  }, [location]);

  return null; // This component does not render anything
};

export default AnalyticsTracker;
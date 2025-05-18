// src/utils/analytics.js
import ReactGA from 'react-ga4';

// IMPORTANT: REPLACE WITH YOUR ACTUAL MEASUREMENT ID
const GA_MEASUREMENT_ID = "G-2HHGEPXFS0"; // <--- YOUR ACTUAL ID HERE
const IS_PRODUCTION = process.env.NODE_ENV === "production";

let isInitialized = false;

export const initGA = () => {
  // Check if the ID is not the placeholder AND is actually set
  if (IS_PRODUCTION && GA_MEASUREMENT_ID && GA_MEASUREMENT_ID !== "G-XXXXXXXXXX" && GA_MEASUREMENT_ID.startsWith("G-")) {
    if (!isInitialized) {
        ReactGA.initialize(GA_MEASUREMENT_ID);
        isInitialized = true;
        console.log("Google Analytics Initialized via utility with ID:", GA_MEASUREMENT_ID);
    }
  } else if (IS_PRODUCTION) {
    console.warn(`Google Analytics Measurement ID is invalid or placeholder: [${GA_MEASUREMENT_ID}]. Analytics will not be initialized.`);
  } else if (!IS_PRODUCTION) {
    console.log("Google Analytics not initialized in development mode (via utility).");
  }
};

export const trackPageView = (path) => {
  if (IS_PRODUCTION && isInitialized) {
    ReactGA.send({ hitType: "pageview", page: path, title: document.title });
    console.log(`GA Pageview (util): ${path}`);
  }
};

export const trackEvent = (category, action, label, value) => {
  if (IS_PRODUCTION && isInitialized) {
    const eventData = { category, action };
    if (label) eventData.label = label;
    if (value !== undefined && typeof value === 'number') eventData.value = value; // GA4 expects value to be a number
    ReactGA.event(eventData);
    console.log(`GA Event (util): Category: ${category}, Action: ${action}, Label: ${label}, Value: ${value}`);
  }
};
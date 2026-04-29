// src/utils/analytics.js
import posthog from 'posthog-js';

const POSTHOG_API_KEY = "phc_zpi4smVqjohH5CSHn3azTz49aGJiTU3mboSLT84pGyr4";
const POSTHOG_HOST = "https://us.i.posthog.com";
const IS_PRODUCTION = process.env.NODE_ENV === "production";

let isInitialized = false;

export const initAnalytics = () => {
  if (!isInitialized) {
    // PostHog handles development vs production well (you can filter by hostname in their UI)
    posthog.init(POSTHOG_API_KEY, {
      api_host: POSTHOG_HOST,
      autocapture: true, // Automatically captures clicks, pageviews, etc.
      capture_pageview: false // We will trigger pageviews manually for React Router
    });
    isInitialized = true;
    console.log("PostHog Analytics Initialized");
  }
};

export const trackPageView = (path) => {
  if (isInitialized) {
    posthog.capture('$pageview', {
      $current_url: window.location.origin + path
    });
    console.log(`PostHog Pageview (util): ${path}`);
  }
};

export const trackEvent = (eventName, properties = {}) => {
  if (isInitialized) {
    posthog.capture(eventName, properties);
    console.log(`PostHog Event (util): ${eventName}`, properties);
  }
};
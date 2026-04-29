// src/utils/analytics.js
import posthog from 'posthog-js';

const POSTHOG_API_KEY = "phc_zpi4smVqjohH5CSHn3azTz49aGJiTU3mboSLT84pGyr4";
const POSTHOG_HOST = "https://us.i.posthog.com";

let isInitialized = false;

export const initAnalytics = () => {
  if (isInitialized) {
    return posthog;
  }

  posthog.init(POSTHOG_API_KEY, {
    api_host: POSTHOG_HOST,
    autocapture: true,
    capture_pageview: false
  });

  isInitialized = true;
  console.log("PostHog Analytics Initialized");
  return posthog;
};

export const trackPageView = (path) => {
  initAnalytics();
  posthog.capture('$pageview', {
    $current_url: window.location.href,
    path
  });
  console.log(`PostHog Pageview (util): ${path}`);
};

export const trackEvent = (eventName, properties = {}) => {
  initAnalytics();
  posthog.capture(eventName, properties);
  console.log(`PostHog Event (util): ${eventName}`, properties);
};

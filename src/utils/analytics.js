// src/utils/analytics.js
import posthog from 'posthog-js';

const POSTHOG_API_KEY = process.env.REACT_APP_POSTHOG_API_KEY || '';
const POSTHOG_HOST = process.env.REACT_APP_POSTHOG_HOST || 'https://us.i.posthog.com';
const POSTHOG_DISTINCT_ID_KEY = 'katapult_posthog_distinct_id';
const LEGACY_USER_ID_KEY = 'user_id';

let isInitialized = false;
let anonymousId = null;
let isAnalyticsEnabled = Boolean(POSTHOG_API_KEY);

const getAnonymousId = () => {
  if (anonymousId) {
    return anonymousId;
  }

  const existingPostHogId = localStorage.getItem(POSTHOG_DISTINCT_ID_KEY);
  const legacyUserId = localStorage.getItem(LEGACY_USER_ID_KEY);

  anonymousId = existingPostHogId || legacyUserId;

  if (!anonymousId) {
    anonymousId = crypto.randomUUID
      ? crypto.randomUUID()
      : `katapult-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }

  localStorage.setItem(POSTHOG_DISTINCT_ID_KEY, anonymousId);
  localStorage.setItem(LEGACY_USER_ID_KEY, anonymousId);

  return anonymousId;
};

export const initAnalytics = () => {
  if (!isAnalyticsEnabled) {
    return null;
  }

  if (isInitialized) {
    return posthog;
  }

  posthog.init(POSTHOG_API_KEY, {
    api_host: POSTHOG_HOST,
    autocapture: true,
    capture_pageview: false,
    bootstrap: {
      distinctID: getAnonymousId()
    }
  });

  isInitialized = true;
  return posthog;
};

export const trackPageView = (path, properties = {}) => {
  if (!initAnalytics()) {
    return;
  }

  posthog.capture('$pageview', {
    $current_url: window.location.href,
    path,
    ...properties
  });
};

export const trackEvent = (eventName, properties = {}) => {
  if (!initAnalytics()) {
    return;
  }

  posthog.capture(eventName, properties);
};

export const identifyUser = (uid, properties = {}) => {
  if (!initAnalytics()) {
    return;
  }

  posthog.identify(uid, properties);
};

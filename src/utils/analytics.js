// src/utils/analytics.js
import posthog from 'posthog-js';

const POSTHOG_API_KEY = "phc_zpi4smVqjohH5CSHn3azTz49aGJiTU3mboSLT84pGyr4";
const POSTHOG_HOST = "https://us.i.posthog.com";
const POSTHOG_DISTINCT_ID_KEY = 'katapult_posthog_distinct_id';
const LEGACY_USER_ID_KEY = 'user_id';

let isInitialized = false;
let anonymousId = null;

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

const directCapture = (eventName, properties = {}) => {
  const payload = {
    api_key: POSTHOG_API_KEY,
    event: eventName,
    distinct_id: getAnonymousId(),
    properties: {
      ...properties,
      $current_url: window.location.href,
      $host: window.location.host,
      $pathname: window.location.pathname,
      $browser_timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    },
    timestamp: new Date().toISOString()
  };

  fetch(`${POSTHOG_HOST}/capture/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    keepalive: true
  }).catch((error) => {
    console.warn(`PostHog direct capture failed: ${eventName}`, error);
  });
};

export const initAnalytics = () => {
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
  console.log("PostHog Analytics Initialized");
  return posthog;
};

export const trackPageView = (path, properties = {}) => {
  initAnalytics();
  posthog.capture('$pageview', {
    $current_url: window.location.href,
    path,
    ...properties
  });
  directCapture('katapult_pageview', { path, ...properties });
  console.log(`PostHog Pageview (util): ${path}`);
};

export const trackEvent = (eventName, properties = {}) => {
  initAnalytics();
  posthog.capture(eventName, properties);
  directCapture(`katapult_${eventName}`, properties);
  console.log(`PostHog Event (util): ${eventName}`, properties);
};

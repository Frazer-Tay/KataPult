// src/components/AnalyticsTracker.js
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView, trackEvent, initAnalytics } from '../utils/analytics';
import { recordLearnerActivity } from '../utils/activityTracker';

const ROUTE_SECTIONS = [
  { prefix: '/persamaan-latihan', section: 'Persamaan Latihan' },
  { prefix: '/test/imbuhan', section: 'Imbuhan Test' },
  { prefix: '/test/persamaan', section: 'Persamaan Test' },
  { prefix: '/daily-challenge', section: 'Daily Challenge' },
  { prefix: '/surat', section: 'Surat Resmi' },
  { prefix: '/test-setup', section: 'Test Setup' },
  { prefix: '/vocabulary', section: 'Vocabulary' },
  { prefix: '/flashcards', section: 'Flashcards' },
  { prefix: '/persamaan', section: 'Persamaan MCQ' },
  { prefix: '/karangan', section: 'Karangan' },
  { prefix: '/imbuhan', section: 'Imbuhan' },
  { prefix: '/', section: 'Home' }
];

const getSectionForRoute = (route) => {
  const match = ROUTE_SECTIONS.find(({ prefix }) => (
    prefix === '/' ? route === '/' : route.startsWith(prefix)
  ));

  return match ? match.section : 'Unknown';
};

const AnalyticsTracker = () => {
  const location = useLocation();
  const sessionStartTimeRef = useRef(Date.now());
  const sectionVisitRef = useRef(null);

  const flushSectionTime = (reason) => {
    const currentVisit = sectionVisitRef.current;

    if (!currentVisit) {
      return;
    }

    const durationInSeconds = Math.round((Date.now() - currentVisit.startedAt) / 1000);

    if (durationInSeconds >= 1) {
      trackEvent('Time_Spent_Section', {
        section: currentVisit.section,
        route: currentVisit.route,
        duration_seconds: durationInSeconds,
        reason
      });
      recordLearnerActivity({
        eventType: 'section_time',
        section: currentVisit.section,
        route: currentVisit.route,
        durationSeconds: durationInSeconds
      }).catch((error) => {
        console.warn('Failed to record section time:', error);
      });
    }

    sectionVisitRef.current = {
      ...currentVisit,
      startedAt: Date.now()
    };
  };

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    const route = location.pathname || '/';
    const routeWithSearch = `${route}${location.search}`;
    const section = getSectionForRoute(route);

    if (sectionVisitRef.current && sectionVisitRef.current.route !== route) {
      flushSectionTime('route_change');
    }

    sectionVisitRef.current = {
      route,
      section,
      startedAt: Date.now()
    };

    trackPageView(routeWithSearch, { route, section });
    trackEvent('Section_Visited', { route, section });
    recordLearnerActivity({
      eventType: 'section_visit',
      section,
      route
    }).catch((error) => {
      console.warn('Failed to record section visit:', error);
    });
  }, [location]);

  useEffect(() => {
    const flushSessionTime = (reason) => {
      const durationInSeconds = Math.round((Date.now() - sessionStartTimeRef.current) / 1000);

      if (durationInSeconds >= 1) {
        trackEvent('Total_Session_Time', {
          duration_seconds: durationInSeconds,
          route: sectionVisitRef.current?.route || location.pathname || '/',
          section: sectionVisitRef.current?.section || getSectionForRoute(location.pathname || '/'),
          reason
        });
        recordLearnerActivity({
          eventType: 'session_time',
          section: sectionVisitRef.current?.section || getSectionForRoute(location.pathname || '/'),
          route: sectionVisitRef.current?.route || location.pathname || '/',
          durationSeconds: durationInSeconds
        }).catch((error) => {
          console.warn('Failed to record session time:', error);
        });
      }

      sessionStartTimeRef.current = Date.now();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        flushSectionTime('tab_hidden');
        flushSessionTime('tab_hidden');
      } else if (document.visibilityState === 'visible') {
        sessionStartTimeRef.current = Date.now();
        sectionVisitRef.current = {
          route: location.pathname || '/',
          section: getSectionForRoute(location.pathname || '/'),
          startedAt: Date.now()
        };
      }
    };

    const handleBeforeUnload = () => {
      flushSectionTime('before_unload');
      flushSessionTime('before_unload');
    };

    window.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [location]);

  return null;
};

export default AnalyticsTracker;

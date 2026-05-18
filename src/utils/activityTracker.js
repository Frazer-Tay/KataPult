import { doc, increment, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

const SECTION_KEY_PATTERN = /[^a-z0-9]+/g;

export const getSectionKey = (section = 'unknown') => {
  const normalized = section
    .toLowerCase()
    .replace(SECTION_KEY_PATTERN, '_')
    .replace(/^_+|_+$/g, '');

  return normalized || 'unknown';
};

export const recordLearnerActivity = async ({
  eventType,
  section,
  route,
  durationSeconds = 0
}) => {
  const user = auth.currentUser;

  if (!user) {
    return;
  }

  const safeDuration = Number.isFinite(durationSeconds)
    ? Math.max(0, Math.min(Math.round(durationSeconds), 60 * 60 * 6))
    : 0;
  const sectionKey = getSectionKey(section);
  const activityRef = doc(db, 'learnerActivity', user.uid);

  const baseUpdate = {
    uid: user.uid,
    email: user.email || '',
    displayName: user.displayName || '',
    photoURL: user.photoURL || '',
    lastSeenAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  };

  if (route) {
    baseUpdate.lastRoute = route;
  }

  const eventUpdates = {
    section_visit: {
      sectionVisitCount: increment(1),
      [`sectionTotals.${sectionKey}.name`]: section || 'Unknown',
      [`sectionTotals.${sectionKey}.visits`]: increment(1),
      [`sectionTotals.${sectionKey}.lastRoute`]: route || '',
      [`sectionTotals.${sectionKey}.lastSeenAt`]: serverTimestamp()
    },
    section_time: {
      totalSectionSeconds: increment(safeDuration),
      [`sectionTotals.${sectionKey}.name`]: section || 'Unknown',
      [`sectionTotals.${sectionKey}.seconds`]: increment(safeDuration),
      [`sectionTotals.${sectionKey}.lastRoute`]: route || '',
      [`sectionTotals.${sectionKey}.lastSeenAt`]: serverTimestamp()
    },
    session_time: {
      totalSessionSeconds: increment(safeDuration),
      sessionFlushCount: increment(1)
    }
  };

  await setDoc(activityRef, {
    ...baseUpdate,
    ...(eventUpdates[eventType] || {})
  }, { merge: true });
};

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
  durationSeconds = 0,
  correct,
  itemType,
  score = 0,
  xpAmount = 0,
  completed = false
}) => {
  const user = auth.currentUser;

  if (!user) {
    return;
  }

  const safeDuration = Number.isFinite(durationSeconds)
    ? Math.max(0, Math.min(Math.round(durationSeconds), 60 * 60 * 6))
    : 0;
  const sectionKey = getSectionKey(section);
  const itemTypeKey = getSectionKey(itemType || 'unknown');
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
    },
    answer_attempt: {
      totalAttempts: increment(1),
      totalCorrect: increment(correct ? 1 : 0),
      totalIncorrect: increment(correct ? 0 : 1),
      [`sectionTotals.${sectionKey}.name`]: section || 'Unknown',
      [`sectionTotals.${sectionKey}.attempts`]: increment(1),
      [`sectionTotals.${sectionKey}.correct`]: increment(correct ? 1 : 0),
      [`sectionTotals.${sectionKey}.incorrect`]: increment(correct ? 0 : 1),
      [`questionTypeTotals.${itemTypeKey}.name`]: itemType || 'Unknown',
      [`questionTypeTotals.${itemTypeKey}.attempts`]: increment(1),
      [`questionTypeTotals.${itemTypeKey}.correct`]: increment(correct ? 1 : 0),
      [`questionTypeTotals.${itemTypeKey}.incorrect`]: increment(correct ? 0 : 1)
    },
    test_result: {
      testsCompleted: increment(completed ? 1 : 0),
      totalScore: increment(Number.isFinite(score) ? Math.max(0, Math.round(score)) : 0),
      [`sectionTotals.${sectionKey}.name`]: section || 'Unknown',
      [`sectionTotals.${sectionKey}.testsCompleted`]: increment(completed ? 1 : 0),
      [`sectionTotals.${sectionKey}.score`]: increment(Number.isFinite(score) ? Math.max(0, Math.round(score)) : 0)
    },
    xp_awarded: {
      xpEarned: increment(Number.isFinite(xpAmount) ? Math.max(0, Math.round(xpAmount)) : 0),
      xpAwardCount: increment(1)
    }
  };

  await setDoc(activityRef, {
    ...baseUpdate,
    ...(eventUpdates[eventType] || {})
  }, { merge: true });
};

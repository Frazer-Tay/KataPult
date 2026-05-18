import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';

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
  const eventPayload = {
    uid: user.uid,
    email: user.email || '',
    displayName: user.displayName || '',
    eventType,
    section: section || 'Unknown',
    route: route || '',
    durationSeconds: safeDuration,
    createdAt: serverTimestamp()
  };

  if (typeof correct === 'boolean') {
    eventPayload.correct = correct;
  }

  if (itemType) {
    eventPayload.itemType = itemType;
  }

  if (Number.isFinite(score)) {
    eventPayload.score = Math.max(0, Math.min(Math.round(score), 1000));
  }

  if (Number.isFinite(xpAmount)) {
    eventPayload.xpAmount = Math.max(0, Math.min(Math.round(xpAmount), 500));
  }

  if (typeof completed === 'boolean') {
    eventPayload.completed = completed;
  }

  await addDoc(collection(db, 'activityEvents'), eventPayload);
};

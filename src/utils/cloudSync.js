import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

/**
 * Saves a piece of state to the user's Firestore appState subcollection.
 * @param {string} userId - The Firebase Auth UID of the user.
 * @param {string} key - The unique storage key (e.g. 'l1_vocab_queue').
 * @param {any} data - The data to store.
 */
export const saveStateToCloud = async (userId, key, data) => {
  if (!userId || !key || data === undefined) return;
  try {
    const stateDocRef = doc(db, `users/${userId}/appState`, key);
    await setDoc(stateDocRef, { data, updatedAt: new Date().toISOString() }, { merge: true });
  } catch (error) {
    console.warn(`Failed to save state ${key} to cloud:`, error);
  }
};

/**
 * Loads a piece of state from the user's Firestore appState subcollection.
 * @param {string} userId - The Firebase Auth UID of the user.
 * @param {string} key - The unique storage key.
 * @returns {any|null} The stored data, or null if it doesn't exist.
 */
export const loadStateFromCloud = async (userId, key) => {
  if (!userId || !key) return null;
  try {
    const stateDocRef = doc(db, `users/${userId}/appState`, key);
    const docSnap = await getDoc(stateDocRef);
    if (docSnap.exists()) {
      return docSnap.data().data;
    }
    return null;
  } catch (error) {
    console.warn(`Failed to load state ${key} from cloud:`, error);
    return null;
  }
};

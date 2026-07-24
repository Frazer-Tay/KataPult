import { useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { saveStateToCloud, loadStateFromCloud } from '../utils/cloudSync';

/**
 * A custom hook that creates a randomized queue of item IDs and saves it to localStorage.
 * It allows users to continue exactly where they left off without seeing duplicates,
 * until the entire set of questions has been exhausted, at which point it reshuffles.
 *
 * @param {string} storageKey - Unique key for localStorage (e.g., 'l1_vocab_queue')
 * @param {Array} allItemsArray - The array of all possible items (must have unique .id properties)
 * @returns {Object} { currentIndex, advanceToNext }
 */
export function useRandomizedResumableQueue(storageKey, allItemsArray) {
  const [queue, setQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { currentUser } = useAuth();
  const isInitializedRef = useRef(false);

  useEffect(() => {
    if (!allItemsArray || allItemsArray.length === 0) return;

    const initializeQueue = async () => {
      const allIds = allItemsArray.map(item => item.id);
      let initialQueue = [];
      let source = 'none';

      // 1. Try to load from Cloud if logged in
      if (currentUser && !isInitializedRef.current) {
        const cloudData = await loadStateFromCloud(currentUser.uid, storageKey);
        if (cloudData && Array.isArray(cloudData)) {
          initialQueue = cloudData.filter(id => allIds.includes(id));
          source = 'cloud';
          // Sync to local
          localStorage.setItem(storageKey, JSON.stringify(initialQueue));
        }
      }

      // 2. Fallback to Local Storage
      if (initialQueue.length === 0) {
        const savedQueueStr = localStorage.getItem(storageKey);
        if (savedQueueStr) {
          try {
            const parsed = JSON.parse(savedQueueStr);
            if (Array.isArray(parsed)) {
              initialQueue = parsed.filter(id => allIds.includes(id));
              source = 'local';
            }
          } catch (e) {
            console.warn(`Failed to parse ${storageKey} from localStorage`, e);
          }
        }
      }

      // 3. Create a fresh queue if both failed
      if (initialQueue.length === 0) {
        initialQueue = [...allIds].sort(() => Math.random() - 0.5);
        localStorage.setItem(storageKey, JSON.stringify(initialQueue));
        if (currentUser) {
          saveStateToCloud(currentUser.uid, storageKey, initialQueue);
        }
      } else if (source === 'local' && currentUser) {
        // We loaded from local, but user is logged in. Let's sync this up to the cloud.
        saveStateToCloud(currentUser.uid, storageKey, initialQueue);
      }

      setQueue(initialQueue);
      isInitializedRef.current = true;

      const firstItemId = initialQueue[0];
      const actualIndex = allItemsArray.findIndex(item => item.id === firstItemId);
      setCurrentIndex(actualIndex >= 0 ? actualIndex : 0);
    };

    initializeQueue();
  }, [storageKey, allItemsArray, currentUser]);

  const advanceToNext = useCallback(() => {
    setQueue(prevQueue => {
      if (prevQueue.length === 0 || !allItemsArray || allItemsArray.length === 0) return prevQueue;

      // Remove the current item (it has now been seen)
      let newQueue = prevQueue.slice(1);

      // If the queue is now empty, the user has seen everything.
      // Replenish the deck and shuffle it again!
      if (newQueue.length === 0) {
        const allIds = allItemsArray.map(item => item.id);
        newQueue = [...allIds].sort(() => Math.random() - 0.5);
      }

      // Save the new queue to localStorage
      localStorage.setItem(storageKey, JSON.stringify(newQueue));

      // Save to Cloud
      if (currentUser) {
        saveStateToCloud(currentUser.uid, storageKey, newQueue);
      }

      // Update the currentIndex to match the new item at the top of the queue
      const nextItemId = newQueue[0];
      const actualIndex = allItemsArray.findIndex(item => item.id === nextItemId);
      setCurrentIndex(actualIndex >= 0 ? actualIndex : 0);

      return newQueue;
    });
  }, [storageKey, allItemsArray, currentUser]);

  return { currentIndex, advanceToNext, queueLength: queue.length };
}

export default useRandomizedResumableQueue;

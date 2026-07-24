import { useEffect, useState } from 'react';
import { getLearningSummary, LEARNING_PROGRESS_EVENT } from '../utils/learningProgress';

const useLearningProgress = (userId) => {
  const [summary, setSummary] = useState(() => getLearningSummary(userId));

  useEffect(() => {
    const refresh = (event) => {
      if (!event?.detail?.userId || event.detail.userId === userId) {
        setSummary(getLearningSummary(userId));
      }
    };

    refresh();
    window.addEventListener(LEARNING_PROGRESS_EVENT, refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener(LEARNING_PROGRESS_EVENT, refresh);
      window.removeEventListener('storage', refresh);
    };
  }, [userId]);

  return summary;
};

export default useLearningProgress;

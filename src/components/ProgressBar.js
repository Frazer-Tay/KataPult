// src/components/ProgressBar.js
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { recordLearningProgress } from '../utils/learningProgress';
import styles from './ProgressBar.module.css';

const ProgressBar = ({ current, total, label = "Progress" }) => {
  const location = useLocation();
  const { currentUser } = useAuth();
  const safeCurrent = total > 0 ? Math.min(Math.max(current, 0), total) : 0;
  const percentage = total > 0 ? Math.round((safeCurrent / total) * 100) : 0;

  useEffect(() => {
    recordLearningProgress({
      userId: currentUser?.uid,
      route: location.pathname,
      label,
      current: safeCurrent,
      total
    });
  }, [currentUser?.uid, label, location.pathname, safeCurrent, total]);

  return (
    <div className={styles.progressBarContainer} role="status" aria-live="polite">
      <div className={styles.progressLabels}>
        <span className={styles.progressLabel}>{label}</span>
        <span className={styles.progressText}>{safeCurrent} of {total}<small>{percentage}%</small></span>
      </div>
      <div className={styles.progressBarBackground}>
        <div
          className={styles.progressBarFill}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={safeCurrent}
          aria-valuemin="0"
          aria-valuemax={total}
          aria-label={`${label} progress`}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;

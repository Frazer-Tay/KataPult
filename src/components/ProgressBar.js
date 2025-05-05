// src/components/ProgressBar.js
import React from 'react';
import styles from './ProgressBar.module.css';

const ProgressBar = ({ current, total, label = "Progress" }) => {
  const percentage = total > 0 ? Math.min(Math.max(((current-1) / total) * 100, 0), 100) : 0;
  // Corrected calculation for display: current should be at least 1 when showing progress
  const displayCurrent = Math.max(current, 1);

  return (
    <div className={styles.progressBarContainer}>
      <div className={styles.progressLabels}>
        <span className={styles.progressLabel}>{label}</span>
        <span className={styles.progressText}>{displayCurrent} / {total}</span>
      </div>
      <div className={styles.progressBarBackground}>
        <div
          className={styles.progressBarFill}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin="0"
          aria-valuemax="100"
          aria-label={`${label} progress`}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
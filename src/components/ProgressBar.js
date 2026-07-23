// src/components/ProgressBar.js
import React from 'react';
import styles from './ProgressBar.module.css';

const ProgressBar = ({ current, total, label = "Progress" }) => {
  const safeCurrent = total > 0 ? Math.min(Math.max(current, 0), total) : 0;
  const percentage = total > 0 ? Math.round((safeCurrent / total) * 100) : 0;

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

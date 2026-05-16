import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';

const LandingPage = () => {
  return (
    <div className={styles.landingContainer}>
      <header className={styles.heroHeader}>
        <h1 className={styles.heroTitle}>
          Welcome to <span>KataPult</span>
        </h1>
        <p className={styles.heroSubtitle}>
          Select your learning track to begin mastering Bahasa Indonesia.
        </p>
      </header>

      <div className={styles.levelSelectionGrid}>
        <Link to="/level1" className={`${styles.levelCard} ${styles.level1Card}`}>
          <div className={styles.levelIcon}>🌱</div>
          <h2 className={styles.levelTitle}>Indonesia Level 1</h2>
          <p className={styles.levelDesc}>
            Start your journey. Build fundamental vocabulary and basic grammar. (Coming Soon)
          </p>
          <div className={styles.levelCTA}>
            Explore Track <span>→</span>
          </div>
        </Link>

        <Link to="/dashboard" className={styles.levelCard}>
          <div className={styles.levelIcon}>🚀</div>
          <h2 className={styles.levelTitle}>Indonesia Level 2</h2>
          <p className={styles.levelDesc}>
            Advanced mastery. Dive into complex affixes, synonyms, and formal writing.
          </p>
          <div className={styles.levelCTA}>
            Continue Learning <span>→</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;

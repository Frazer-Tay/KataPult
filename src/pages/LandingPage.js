import React from 'react';
import { Link } from 'react-router-dom';
import UiIcon from '../components/UiIcon';
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

      <div className={styles.levelSelectionList}>
        <Link to="/foundation" className={`${styles.levelCard} ${styles.primaryCard}`}>
          <div className={styles.cardContent}>
            <div className={styles.levelIcon}><UiIcon name="compass" size={36} /></div>
            <div className={styles.cardText}>
              <h2 className={styles.levelTitle}>Bahasa Foundation</h2>
              <p className={styles.levelDesc}>
                Your first step to mastering Indonesian. Learn essential vocabulary and basic reading through fun stories.
              </p>
            </div>
          </div>
          <div className={styles.levelCTA}>
            Start Journey <UiIcon name="arrowRight" size={18} />
          </div>
        </Link>

        <Link to="/level1" className={`${styles.levelCard} ${styles.secondaryCard}`}>
          <div className={styles.cardContent}>
            <div className={styles.levelIcon}><UiIcon name="sprout" size={36} /></div>
            <div className={styles.cardText}>
              <h2 className={styles.levelTitle}>Indonesia Level 1</h2>
              <p className={styles.levelDesc}>
                Build fundamental vocabulary and basic grammar. (Coming Soon)
              </p>
            </div>
          </div>
          <div className={styles.levelCTA}>
            Explore Track <UiIcon name="arrowRight" size={18} />
          </div>
        </Link>

        <Link to="/dashboard" className={`${styles.levelCard} ${styles.tertiaryCard}`}>
          <div className={styles.cardContent}>
            <div className={styles.levelIcon}><UiIcon name="rocket" size={36} /></div>
            <div className={styles.cardText}>
              <h2 className={styles.levelTitle}>Indonesia Level 2</h2>
              <p className={styles.levelDesc}>
                Advanced mastery. Dive into complex affixes, synonyms, and formal writing.
              </p>
            </div>
          </div>
          <div className={styles.levelCTA}>
            Continue Learning <UiIcon name="arrowRight" size={18} />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;

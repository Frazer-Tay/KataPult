import React from 'react';
import { Link } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';
import styles from './HomePage.module.css';

const Level1Dashboard = () => {
  const { xp, streak, level } = useProgress();

  const scrollToModules = (e) => {
    e.preventDefault();
    const modulesSection = document.getElementById('modules');
    if (modulesSection) {
      modulesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroProgressBadge}>
           🔥 Streak: {streak} Day{streak !== 1 && 's'} | ⭐ Level {level} ({xp} XP)
        </div>
        <h1 className={styles.heroTitle}>Build <span style={{color: 'var(--primary-color)'}}>Bahasa Indonesia</span> 🇮🇩 fundamentals.</h1>
        <p className={styles.heroSubtitle}>
          Master foundational vocabulary and basic sentence structures for Indonesia Level 1.
        </p>
        <div className={styles.heroActions}>
          <button onClick={scrollToModules} className={styles.heroPrimaryCTA}>Start Learning</button>
        </div>
      </section>

      {/* Recommended Path */}
      <section className={styles.pathSection}>
        <h2 className={styles.sectionHeading}>Your Path to Mastery</h2>
        <div className={styles.pathSteps}>
          <div className={styles.pathStep}>
            <div className={styles.stepNumber}>1</div>
            <div className={styles.stepTextContent}>
              <div className={styles.stepTitle}>Build Core Vocab</div>
              <div className={styles.stepDesc}>Learn essential everyday words</div>
            </div>
          </div>
          <div className={styles.pathDivider}></div>
          <div className={styles.pathStep}>
            <div className={styles.stepNumber}>2</div>
            <div className={styles.stepTextContent}>
              <div className={styles.stepTitle}>Practice Context</div>
              <div className={styles.stepDesc}>Understand how words are used</div>
            </div>
          </div>
        </div>
      </section>

      {/* Module Groups */}
      <section id="modules" className={styles.modulesSection}>
        <div className={styles.moduleGroup}>
          <h3 className={styles.groupHeading}>Simulasi Ujian (Exam Simulation)</h3>
          <div className={styles.moduleGrid}>
            
            <Link to="/level1/reading" className={styles.moduleCard}>
              <div className={`${styles.iconBlock} ${styles.iconReading}`} style={{backgroundColor: '#16a085'}}>📖</div>
              <div className={styles.moduleInfo}>
                <span className={styles.moduleTitle}>Bagian I: Reading</span>
                <span className={styles.moduleDesc}>Pemahaman bacaan dan esai pendek.</span>
              </div>
              <div className={styles.moduleArrow}>→</div>
            </Link>

            <Link to="/level1/sentence" className={styles.moduleCard}>
              <div className={`${styles.iconBlock} ${styles.iconSentence}`} style={{backgroundColor: '#8e44ad'}}>✍️</div>
              <div className={styles.moduleInfo}>
                <span className={styles.moduleTitle}>Bagian II: Kalimat</span>
                <span className={styles.moduleDesc}>Latihan konstruksi kalimat.</span>
              </div>
              <div className={styles.moduleArrow}>→</div>
            </Link>

            <Link to="/level1/imbuhan-practice" className={styles.moduleCard}>
              <div className={`${styles.iconBlock} ${styles.iconImbuhan}`} style={{backgroundColor: '#e67e22'}}>🔗</div>
              <div className={styles.moduleInfo}>
                <span className={styles.moduleTitle}>Bagian III: Imbuhan</span>
                <span className={styles.moduleDesc}>Melengkapi kalimat dengan imbuhan.</span>
              </div>
              <div className={styles.moduleArrow}>→</div>
            </Link>

            <Link to="/level1/cloze" className={styles.moduleCard}>
              <div className={`${styles.iconBlock} ${styles.iconCloze}`} style={{backgroundColor: '#2980b9'}}>🧩</div>
              <div className={styles.moduleInfo}>
                <span className={styles.moduleTitle}>Bagian IV: Cloze</span>
                <span className={styles.moduleDesc}>Isian rumpang dengan kata pilihan.</span>
              </div>
              <div className={styles.moduleArrow}>→</div>
            </Link>

            <Link to="/level1/writing" className={styles.moduleCard}>
              <div className={`${styles.iconBlock} ${styles.iconWriting}`} style={{backgroundColor: '#e74c3c'}}>📝</div>
              <div className={styles.moduleInfo}>
                <span className={styles.moduleTitle}>Bagian V & VI: Menulis</span>
                <span className={styles.moduleDesc}>Surat resmi dan karangan (200 kata).</span>
              </div>
              <div className={styles.moduleArrow}>→</div>
            </Link>

            <Link to="/level1/vocabulary" className={styles.moduleCard}>
              <div className={`${styles.iconBlock} ${styles.iconVocab}`}>📚</div>
              <div className={styles.moduleInfo}>
                <span className={styles.moduleTitle}>Core Vocabulary</span>
                <span className={styles.moduleDesc}>Hafalan kata dasar (Warm-up).</span>
              </div>
              <div className={styles.moduleArrow}>→</div>
            </Link>

          </div>
        </div>
      </section>

      {/* Motivational Footer */}
      <footer className={styles.motivationalFooter}>
        <p>A solid foundation is the key to fluency.</p>
      </footer>
    </div>
  );
};

export default Level1Dashboard;

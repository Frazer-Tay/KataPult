import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';
import { getDueWords } from '../utils/srsLogic';
import { vocabularyData } from '../data/vocabulary';
import styles from './HomePage.module.css';

const HomePage = () => {
  const { xp, streak, level, dailyChallengeStatus } = useProgress();

  const dueCount = useMemo(() => {
    try {
      const filteredData = vocabularyData.filter(item => item.word && item.definition && item.level === 2);
      return getDueWords(filteredData).dueWords.length;
    } catch {
      return 0;
    }
  }, []);

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
        <h1 className={styles.heroTitle}>Build <span style={{color: 'var(--primary-color)'}}>Bahasa Indonesia</span> 🇮🇩 confidence, one focused drill at a time.</h1>
        <p className={styles.heroSubtitle}>
          Master Indonesian vocabulary, affixes, synonyms, and formal writing with targeted practice modes.
        </p>
        <div className={styles.heroActions}>
          <Link to="/test-setup" className={styles.heroPrimaryCTA}>Start Custom Test</Link>
          <button onClick={scrollToModules} className={styles.heroSecondaryCTA}>Browse Practice Modes</button>
        </div>
      </section>

      {/* Value Cards */}
      <section className={styles.valueSection}>
        <div className={styles.valueCard}>
          <span className={styles.valueIcon}>🎯</span>
          <span className={styles.valueText}>Focused drills</span>
        </div>
        <div className={styles.valueCard}>
          <span className={styles.valueIcon}>✍️</span>
          <span className={styles.valueText}>Writing-ready phrases</span>
        </div>
        <div className={styles.valueCard}>
          <span className={styles.valueIcon}>⏱️</span>
          <span className={styles.valueText}>Custom test mode</span>
        </div>
      </section>

      {/* Recommended Path */}
      <section className={styles.pathSection}>
        <h2 className={styles.sectionHeading}>Recommended Path</h2>
        <div className={styles.pathSteps}>
          <div className={styles.pathStep}>
            <div className={styles.stepNumber}>1</div>
            <div className={styles.stepTextContent}>
              <div className={styles.stepTitle}>Build Vocab</div>
              <div className={styles.stepDesc}>Start with Vocabulary & Flashcards</div>
            </div>
          </div>
          <div className={styles.pathDivider}></div>
          <div className={styles.pathStep}>
            <div className={styles.stepNumber}>2</div>
            <div className={styles.stepTextContent}>
              <div className={styles.stepTitle}>Form Words</div>
              <div className={styles.stepDesc}>Practise Imbuhan & Persamaan</div>
            </div>
          </div>
          <div className={styles.pathDivider}></div>
          <div className={styles.pathStep}>
            <div className={styles.stepNumber}>3</div>
            <div className={styles.stepTextContent}>
              <div className={styles.stepTitle}>Test Yourself</div>
              <div className={styles.stepDesc}>Take a Custom Test under pressure</div>
            </div>
          </div>
        </div>
      </section>

      {/* Module Groups */}
      <section id="modules" className={styles.modulesSection}>
        
        {/* Daily Challenge Group */}
        <div className={styles.moduleGroup}>
          <h3 className={styles.groupHeading}>Daily Challenge ⚔️</h3>
          <div className={styles.moduleGrid} style={{ gridTemplateColumns: '1fr' }}>
            <Link to="/daily-challenge" className={`${styles.moduleCard} ${dailyChallengeStatus !== 'available' ? styles.disabledCard : ''}`} style={dailyChallengeStatus === 'available' ? { border: '2px solid #ff9f43', backgroundColor: 'rgba(255,159,67,0.05)' } : { pointerEvents: 'none', opacity: 0.7 }}>
              <div className={`${styles.iconBlock}`} style={{ backgroundColor: '#ff9f43' }}>🏆</div>
              <div className={styles.moduleInfo}>
                <h4 className={styles.moduleTitle}>
                  {dailyChallengeStatus === 'available' ? "Mainkan Tantangan Hari Ini!" : "Selesai untuk hari ini!"}
                </h4>
                <p className={styles.moduleDesc}>
                  {dailyChallengeStatus === 'available' 
                    ? "Tes campuran 10 pertanyaan. Hadiah: 50 XP. Kesempatan: 3 Nyawa." 
                    : "Kembali besok untuk tantangan baru."}
                </p>
              </div>
            </Link>
          </div>
        </div>

        <div className={styles.moduleGroup}>
          <h3 className={styles.groupHeading}>Practice</h3>
          <div className={styles.moduleGrid}>
            <Link to="/vocabulary" className={styles.moduleCard}>
              <div className={`${styles.iconBlock} ${styles.iconVocab}`}>📚</div>
              <div className={styles.moduleInfo}>
                <span className={styles.moduleTitle}>
                    Vocabulary 
                    {dueCount > 0 && <span className={styles.srsBadge}>{dueCount} Review</span>}
                </span>
                <span className={styles.moduleDesc}>Learn new words with examples.</span>
              </div>
              <div className={styles.moduleArrow}>→</div>
            </Link>

            <Link to="/imbuhan" className={styles.moduleCard}>
              <div className={`${styles.iconBlock} ${styles.iconImbuhan}`}>🔗</div>
              <div className={styles.moduleInfo}>
                <span className={styles.moduleTitle}>Imbuhan</span>
                <span className={styles.moduleDesc}>Master word formation & affixes.</span>
              </div>
              <div className={styles.moduleArrow}>→</div>
            </Link>

            <Link to="/persamaan" className={styles.moduleCard}>
              <div className={`${styles.iconBlock} ${styles.iconPersamaan}`}>🔄</div>
              <div className={styles.moduleInfo}>
                <span className={styles.moduleTitle}>Persamaan MCQ</span>
                <span className={styles.moduleDesc}>Test your synonym knowledge.</span>
              </div>
              <div className={styles.moduleArrow}>→</div>
            </Link>

            <Link to="/persamaan-latihan" className={styles.moduleCard}>
              <div className={`${styles.iconBlock} ${styles.iconPersamaanLat}`}>✍️</div>
              <div className={styles.moduleInfo}>
                <span className={styles.moduleTitle}>Persamaan Latihan</span>
                <span className={styles.moduleDesc}>Practise synonyms by filling in blanks.</span>
              </div>
              <div className={styles.moduleArrow}>→</div>
            </Link>
          </div>
        </div>

        <div className={styles.moduleGroup}>
          <h3 className={styles.groupHeading}>Writing Support</h3>
          <div className={styles.moduleGrid}>
            <Link to="/karangan" className={styles.moduleCard}>
              <div className={`${styles.iconBlock} ${styles.iconKarangan}`}>📝</div>
              <div className={styles.moduleInfo}>
                <span className={styles.moduleTitle}>Karangan</span>
                <span className={styles.moduleDesc}>Enrich your essay vocabulary.</span>
              </div>
              <div className={styles.moduleArrow}>→</div>
            </Link>

            <Link to="/flashcards" className={styles.moduleCard}>
              <div className={`${styles.iconBlock} ${styles.iconFlashcards}`}>🗂️</div>
              <div className={styles.moduleInfo}>
                <span className={styles.moduleTitle}>Flashcards</span>
                <span className={styles.moduleDesc}>Review key phrases & essay points.</span>
              </div>
              <div className={styles.moduleArrow}>→</div>
            </Link>

            <Link to="/surat" className={styles.moduleCard}>
              <div className={`${styles.iconBlock} ${styles.iconSurat}`}>✉️</div>
              <div className={styles.moduleInfo}>
                <span className={styles.moduleTitle}>Surat Resmi</span>
                <span className={styles.moduleDesc}>Learn formal letter structures.</span>
              </div>
              <div className={styles.moduleArrow}>→</div>
            </Link>
          </div>
        </div>

        <div className={styles.moduleGroup}>
          <h3 className={styles.groupHeading}>Assessment</h3>
          <div className={styles.moduleGrid}>
            <Link to="/test-setup" className={`${styles.moduleCard} ${styles.moduleCardTest}`}>
              <div className={`${styles.iconBlock} ${styles.iconTest}`}>⏱️</div>
              <div className={styles.moduleInfo}>
                <span className={styles.moduleTitle}>Custom Test</span>
                <span className={styles.moduleDesc}>Challenge yourself with a custom setup.</span>
              </div>
              <div className={styles.moduleArrow}>→</div>
            </Link>
          </div>
        </div>

      </section>

      {/* Motivational Footer */}
      <footer className={styles.motivationalFooter}>
        <p>Short daily practice beats last-minute cramming.</p>
      </footer>
    </div>
  );
};

export default HomePage;
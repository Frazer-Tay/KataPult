import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import useLearningProgress from '../hooks/useLearningProgress';
import UiIcon from '../components/UiIcon';
import appLogo from '../assets/images/app-logo.png';
import paperRocketCompanion from '../assets/images/katapult-paper-rocket.webp';
import styles from './LandingPage.module.css';

const tracks = [
  {
    to: '/foundation',
    icon: 'compass',
    eyebrow: 'Starting from the basics',
    title: 'Bahasa Foundation',
    description: 'Essential vocabulary, short stories, pictures, and everyday language.',
    meta: 'Beginner',
    tone: 'blue'
  },
  {
    to: '/level1',
    icon: 'sprout',
    eyebrow: 'Building confidence',
    title: 'Bahasa Indonesia Level 1',
    description: 'Reading, sentence construction, cloze passages, and guided writing.',
    meta: 'Developing',
    tone: 'green'
  },
  {
    to: '/dashboard',
    icon: 'rocket',
    eyebrow: 'Advanced and exam-focused',
    title: 'Bahasa Indonesia Level 2',
    description: 'Affixes, synonyms, formal vocabulary, writing support, and test practice.',
    meta: 'Advanced',
    tone: 'violet'
  }
];

const sampleOptions = ['malas', 'tekun', 'ragu'];
const correctSampleAnswer = 'tekun';

const LandingPage = () => {
  const { currentUser, userData } = useAuth();
  const { continueEntry } = useLearningProgress(currentUser?.uid);
  const [sampleAnswer, setSampleAnswer] = useState('');
  const sampleIsCorrect = sampleAnswer === correctSampleAnswer;
  const displayName = userData?.username || currentUser?.displayName?.split(' ')[0] || 'Learner';
  const primaryDestination = currentUser ? (continueEntry?.route || '/dashboard') : '/login';
  const primaryLabel = currentUser
    ? (continueEntry ? `Continue ${continueEntry.title}` : 'Open your dashboard')
    : 'Start learning';

  const scrollToSample = () => {
    document.getElementById('practice-preview')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className={styles.landingPage}>
      <header className={styles.landingNav}>
        <Link className={styles.brand} to="/" aria-label="KataPult home">
          <img src={appLogo} alt="" />
          <span><strong>KataPult</strong><small>Bahasa practice companion</small></span>
        </Link>
        <div className={styles.navActions}>
          {currentUser ? (
            <>
              <span className={styles.welcomeText}>Hi, {displayName}</span>
              <Link className={styles.navButton} to="/dashboard">Dashboard</Link>
            </>
          ) : (
            <Link className={styles.navButton} to="/login">Log in</Link>
          )}
        </div>
      </header>

      <main className={styles.landingMain}>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}><UiIcon name="star" size={15} /> Focused Bahasa Indonesia practice</span>
            <h1>Master Bahasa Indonesia. Keep your momentum.</h1>
            <p className={styles.heroSubtitle}>
              Strengthen vocabulary, grammar, reading, and writing through focused sessions that remember exactly where you stopped.
            </p>
            <div className={styles.heroActions}>
              <Link className={styles.primaryCta} to={primaryDestination}>
                {primaryLabel} <UiIcon name="arrowRight" size={19} />
              </Link>
              <button className={styles.secondaryCta} onClick={scrollToSample} type="button">
                Try a sample question
              </button>
            </div>
            <div className={styles.trustStrip} aria-label="KataPult benefits">
              <span><UiIcon name="check" size={15} /> Google sign-in</span>
              <span><UiIcon name="check" size={15} /> Progress saved</span>
              <span><UiIcon name="check" size={15} /> Mobile friendly</span>
            </div>
          </div>

          <div className={styles.proofVisual} id="practice-preview">
            <div className={styles.practiceWindow}>
              <div className={styles.windowHeader}>
                <span className={styles.windowDots} aria-hidden="true"><i /><i /><i /></span>
                <span>Live practice preview</span>
                <span className={styles.questionCount}>{sampleAnswer ? '3' : '2'} of 5</span>
              </div>
              <div className={styles.miniProgress} aria-label={`${sampleAnswer ? 60 : 40}% complete`}>
                <span style={{ width: sampleAnswer ? '60%' : '40%' }} />
              </div>
              <div className={styles.questionBody}>
                <span className={styles.skillLabel}>Persamaan kata</span>
                <h2>Apakah sinonim yang paling tepat untuk <strong>rajin</strong>?</h2>
                <p>Choose the closest meaning.</p>
                <div className={styles.sampleOptions}>
                  {sampleOptions.map((option) => {
                    const isSelected = sampleAnswer === option;
                    const isCorrectOption = option === correctSampleAnswer;
                    const showCorrect = Boolean(sampleAnswer) && isCorrectOption;
                    const showIncorrect = isSelected && !sampleIsCorrect;
                    return (
                      <button
                        key={option}
                        className={`${styles.sampleOption} ${isSelected ? styles.selectedOption : ''} ${showCorrect ? styles.correctOption : ''} ${showIncorrect ? styles.incorrectOption : ''}`}
                        onClick={() => setSampleAnswer(option)}
                        type="button"
                        aria-pressed={isSelected}
                      >
                        <span>{option}</span>
                        {(showCorrect || showIncorrect) && <UiIcon name={showCorrect ? 'check' : 'x'} size={17} />}
                      </button>
                    );
                  })}
                </div>
                {sampleAnswer && (
                  <div className={`${styles.sampleFeedback} ${sampleIsCorrect ? styles.feedbackSuccess : styles.feedbackError}`} role="status" aria-live="polite">
                    <span><UiIcon name={sampleIsCorrect ? 'check' : 'x'} size={18} /></span>
                    <div>
                      <strong>{sampleIsCorrect ? 'Excellent—tekun is correct.' : 'Almost—tekun is the closest synonym.'}</strong>
                      <small>{sampleIsCorrect ? '+5 XP · Your progress is ready to continue.' : 'Mistakes become useful review opportunities.'}</small>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className={styles.mascotWrap}>
              <img src={paperRocketCompanion} alt="KataPult paper rocket learning companion" />
              <span>Learn. Launch. Keep moving.</span>
            </div>
          </div>
        </section>

        {currentUser && continueEntry && (
          <section className={styles.resumeSection} aria-labelledby="resume-heading">
            <div className={styles.resumeIcon}><UiIcon name={continueEntry.icon || 'rocket'} size={25} /></div>
            <div className={styles.resumeCopy}>
              <span>Welcome back, {displayName}</span>
              <h2 id="resume-heading">Continue {continueEntry.title}</h2>
              <p>{continueEntry.label || 'Your latest practice session'}{typeof continueEntry.percentage === 'number' ? ` · ${continueEntry.percentage}% complete` : ''}</p>
            </div>
            {typeof continueEntry.percentage === 'number' && (
              <div className={styles.resumeProgress} aria-label={`${continueEntry.percentage}% complete`}>
                <span style={{ width: `${continueEntry.percentage}%` }} />
              </div>
            )}
            <Link className={styles.resumeButton} to={continueEntry.route}>Resume <UiIcon name="arrowRight" size={18} /></Link>
          </section>
        )}

        <section className={styles.trackSection} aria-labelledby="track-heading">
          <div className={styles.sectionHeading}>
            <span>Your learning path</span>
            <h2 id="track-heading">{currentUser ? 'Choose what to strengthen next.' : 'Where are you in your Bahasa journey?'}</h2>
            <p>Select the track that best matches your current confidence. You can switch levels at any time.</p>
          </div>
          <div className={styles.trackGrid}>
            {tracks.map((track) => (
              <Link key={track.to} className={`${styles.trackCard} ${styles[track.tone]}`} to={track.to}>
                <div className={styles.trackTop}>
                  <span className={styles.trackIcon}><UiIcon name={track.icon} size={25} /></span>
                  <span className={styles.trackMeta}>{track.meta}</span>
                </div>
                <span className={styles.trackEyebrow}>{track.eyebrow}</span>
                <h3>{track.title}</h3>
                <p>{track.description}</p>
                <span className={styles.trackAction}>Explore track <UiIcon name="arrowRight" size={17} /></span>
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.momentumSection}>
          <div><UiIcon name="brain" size={22} /><span><strong>Smart review</strong><small>Return to words before you forget them.</small></span></div>
          <div><UiIcon name="clipboard" size={22} /><span><strong>Focused practice</strong><small>Short sessions with immediate feedback.</small></span></div>
          <div><UiIcon name="rocket" size={22} /><span><strong>Visible momentum</strong><small>Resume from the exact place you stopped.</small></span></div>
        </section>
      </main>

      <footer className={styles.landingFooter}>
        <span>KataPult</span>
        <p>Practise consistently. Progress confidently.</p>
        <small>Revision support only. Content is not endorsed by an examination body.</small>
        {!currentUser && <Link to="/login">Log in to save your progress</Link>}
      </footer>
    </div>
  );
};

export default LandingPage;

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';
import { getDailyChallengeData } from '../utils/dailySeed';
import { recordLearnerActivity } from '../utils/activityTracker';
import useTimeTracker from '../hooks/useTimeTracker';
import { useSettings } from '../contexts/SettingsContext';
import ProgressBar from '../components/ProgressBar';
import UiIcon from '../components/UiIcon';
import { CompletionCard, FeedbackBanner, LoadingState, PracticeActions, StatusBadge } from '../components/SharedUI';
import styles from './DailyChallengePage.module.css';

const LIVES_START_COUNT = 3;

const DailyChallengePage = () => {
  useTimeTracker('DailyChallenge');
  const navigate = useNavigate();
  const { dailyChallengeStatus, completeDailyChallenge } = useProgress();
  const { englishAssist } = useSettings();

  const [testItems, setTestItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lives, setLives] = useState(LIVES_START_COUNT);

  const [userInput, setUserInput] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [isTestOver, setIsTestOver] = useState(false);

  const inputRef = useRef(null);
  const nextButtonRef = useRef(null);

  useEffect(() => {
    // If user already did it today, lock them out or show summary
    if (dailyChallengeStatus === 'completed' || dailyChallengeStatus === 'failed') {
      setIsTestOver(true);
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    const data = getDailyChallengeData(today);
    setTestItems(data);
  }, [dailyChallengeStatus]);

  const currentItem = useMemo(() => {
    return (testItems && testItems.length > 0 && currentIndex < testItems.length)
      ? testItems[currentIndex]
      : null;
  }, [testItems, currentIndex]);

  const handleMCQClick = (option) => {
    if (isAnswered) return;
    setIsAnswered(true);
    setSelectedAnswer(option);

    const correct = option === currentItem.correctAnswer;
    setIsCorrect(correct);
    recordLearnerActivity({
      eventType: 'answer_attempt',
      section: 'Daily Challenge',
      route: '/daily-challenge',
      itemType: currentItem.type,
      correct
    }).catch((error) => console.warn('Failed to record answer attempt:', error));

    if (!correct) {
      setLives(prev => prev - 1);
    }
    setTimeout(() => nextButtonRef.current?.focus(), 100);
  };

  const handleInputCheck = () => {
    if (isAnswered || !userInput.trim()) return;
    setIsAnswered(true);

    const correct = userInput.trim().toLowerCase() === currentItem.correctAnswer.toLowerCase();
    setIsCorrect(correct);
    recordLearnerActivity({
      eventType: 'answer_attempt',
      section: 'Daily Challenge',
      route: '/daily-challenge',
      itemType: currentItem.type,
      correct
    }).catch((error) => console.warn('Failed to record answer attempt:', error));

    if (!correct) {
      setLives(prev => prev - 1);
    }
    setTimeout(() => nextButtonRef.current?.focus(), 100);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleInputCheck();
    }
  };

  const loadNextQuestion = () => {
    if (lives <= 0) {
      completeDailyChallenge('failed');
      setIsTestOver(true);
      return;
    }

    if (currentIndex < testItems.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsAnswered(false);
      setIsCorrect(null);
      setUserInput('');
      setSelectedAnswer(null);
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      completeDailyChallenge('completed');
      setIsTestOver(true);
    }
  };

  // If already completed or failed from Context
  if (isTestOver || dailyChallengeStatus !== 'available') {
    const isWin = dailyChallengeStatus === 'completed' || (isTestOver && lives > 0);
    return (
      <div className={styles.container}>
        <CompletionCard
          title={isWin ? (englishAssist ? 'Daily challenge complete' : 'Tantangan harian selesai') : (englishAssist ? 'Challenge finished' : 'Tantangan berakhir')}
          description={isWin ? (englishAssist ? 'Excellent work. A new daily challenge will be ready tomorrow.' : 'Kerja bagus. Tantangan harian baru akan tersedia besok.') : (englishAssist ? 'You are out of lives. Rest, review, and try a new challenge tomorrow.' : 'Kesempatan Anda habis. Istirahat, pelajari kembali, dan coba tantangan baru besok.')}
          xp={isWin ? 50 : undefined}
          actions={<button className="primaryButton" onClick={() => navigate('/dashboard')}>{englishAssist ? 'Back to dashboard' : 'Kembali ke dasbor'}</button>}
        />
      </div>
    );
  }

  if (!currentItem) {
    return <LoadingState label={englishAssist ? 'Loading challenge...' : 'Memuat tantangan...'} />;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.pageTitle}>{englishAssist ? 'Daily Challenge' : 'Tantangan Harian'}</h2>
      <ProgressBar current={currentIndex + 1} total={testItems.length} label={englishAssist ? 'Progress' : 'Progres'} />

      <div className={styles.gameStats}>
        <StatusBadge tone={lives === 1 ? 'warning' : 'success'}>{englishAssist ? 'Lives' : 'Nyawa'}: {lives}/{LIVES_START_COUNT}</StatusBadge>
        <StatusBadge tone="info">{englishAssist ? 'Question' : 'Pertanyaan'}: {currentIndex + 1}/{testItems.length}</StatusBadge>
      </div>

      <div className={styles.questionCard}>
        <span className={styles.questionType}>
          {englishAssist ? 'Type:' : 'Tipe:'} {currentItem.type === 'vocab' ? (englishAssist ? 'Vocabulary' : 'Kosakata') : currentItem.type === 'imbuhan' ? (englishAssist ? 'Affixes' : 'Imbuhan') : (englishAssist ? 'Synonyms' : 'Persamaan Kata')}
        </span>
        <p className={styles.questionText}>{currentItem.question}</p>

        {currentItem.example && (
          <p className={styles.exampleText}>"{currentItem.example}"</p>
        )}

        {currentItem.sentence && (
          <p className={styles.exampleText} dangerouslySetInnerHTML={{ __html: currentItem.sentence.replace(/___|\[____\]|\[_____\]|\[______\]/g, `[____]`) }} />
        )}

        {currentItem.hint && !isAnswered && (
          <p style={{fontSize: '0.9rem', color: 'var(--secondary-text-color)'}}>Hint: {currentItem.hint}</p>
        )}
      </div>

      {/* Input Mode (Imbuhan) */}
      {currentItem.type === 'imbuhan' && (
        <div className={`${styles.inputSection} ${isAnswered && !isCorrect ? 'shake-animation' : ''} ${isAnswered && isCorrect ? 'pulse-animation' : ''}`}>
          <input
            ref={inputRef}
            type="text"
            className={`${styles.input} ${isAnswered ? (isCorrect ? styles.inputCorrect : styles.inputIncorrect) : ''}`}
            placeholder={englishAssist ? "Type your answer..." : "Ketik jawaban Anda..."}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleInputKeyDown}
            disabled={isAnswered}
            autoFocus
            autoCapitalize="none"
          />
          {!isAnswered && (
             <button className="primaryButton" onClick={handleInputCheck} disabled={!userInput.trim()} style={{marginTop: '1rem'}}>
               {englishAssist ? 'Check' : 'Periksa'}
             </button>
          )}
        </div>
      )}

      {/* MCQ Mode (Vocab / Persamaan) */}
      {(currentItem.type === 'vocab' || currentItem.type === 'persamaan') && (
        <div className={`${styles.optionsGrid} ${isAnswered && !isCorrect ? 'shake-animation' : ''}`}>
          {currentItem.options.map((opt, idx) => {
            const isTheCorrectAnswer = opt === currentItem.correctAnswer;
            let btnClass = styles.optionButton;
            if (isAnswered) {
              if (selectedAnswer === opt) {
                btnClass += isCorrect ? ` ${styles.correctSelected} pulse-animation` : ` ${styles.incorrectSelected}`;
              } else if (isTheCorrectAnswer) {
                btnClass += ` ${styles.correctUnselected}`;
              } else {
                btnClass += ` ${styles.disabled}`;
              }
            }
            return (
              <button
                key={idx}
                className={btnClass}
                onClick={() => handleMCQClick(opt)}
                disabled={isAnswered}
              >
                {opt}
              </button>
            );
          })}
        </div>
      )}

      {/* Feedback & Next */}
      {isAnswered && (
        <>
          <FeedbackBanner status={isCorrect ? 'success' : 'error'} title={isCorrect ? (englishAssist ? 'Correct' : 'Benar') : (englishAssist ? 'Not quite' : 'Belum tepat')}>
            {!isCorrect && (englishAssist ? `The correct answer is ${currentItem.correctAnswer}.` : `Jawaban yang benar adalah ${currentItem.correctAnswer}.`)}
          </FeedbackBanner>
          {currentItem.explanation && (
            <div className={styles.explanationBox}>
              <p className={styles.explanationTitle}>{englishAssist ? 'Explanation:' : 'Penjelasan:'}</p>
              <p>{currentItem.explanation}</p>
            </div>
          )}
          <PracticeActions>
            <button className="nextButton" ref={nextButtonRef} onClick={loadNextQuestion}>
              {currentIndex === testItems.length - 1 || lives <= 0 ? (englishAssist ? "Finish" : "Selesai") : (englishAssist ? "Next" : "Lanjut")} <UiIcon name="arrowRight" size={18} />
            </button>
          </PracticeActions>
        </>
      )}

    </div>
  );
};

export default DailyChallengePage;

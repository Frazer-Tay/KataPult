import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';
import { getDailyChallengeData } from '../utils/dailySeed';
import useTimeTracker from '../hooks/useTimeTracker';
import ProgressBar from '../components/ProgressBar';
import styles from './DailyChallengePage.module.css';

const LIVES_START_COUNT = 3;

const DailyChallengePage = () => {
  useTimeTracker('DailyChallenge');
  const navigate = useNavigate();
  const { dailyChallengeStatus, completeDailyChallenge } = useProgress();
  
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
        <div className={styles.completedState}>
          <div className={styles.completedIcon}>{isWin ? '🌟' : '💀'}</div>
          <h2 className={styles.pageTitle}>
            {isWin ? "Tantangan Harian Selesai!" : "Tantangan Harian Gagal"}
          </h2>
          {isWin ? (
            <p className={styles.successMessage}>Luar biasa! Anda mendapat +50 XP hari ini.</p>
          ) : (
            <p className={styles.failMessage}>Kesempatan habis. Coba lagi besok!</p>
          )}
          <p style={{marginBottom: '2rem'}}>Tantangan Harian baru akan tersedia besok.</p>
          <button className="primaryButton" onClick={() => navigate('/')}>
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  if (!currentItem) {
    return <div className="loading-page">Memuat Tantangan...</div>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.pageTitle}>Tantangan Harian</h2>
      <ProgressBar current={currentIndex + 1} total={testItems.length} label="Progres" />
      
      <div className={styles.gameStats}>
        <span className={styles.statItem}>Nyawa: {'❤️'.repeat(lives) + (lives < LIVES_START_COUNT ? '💔'.repeat(LIVES_START_COUNT - lives) : '')}</span>
        <span className={styles.statItem}>Pertanyaan: {currentIndex + 1} / {testItems.length}</span>
      </div>

      <div className={styles.questionCard}>
        <span className={styles.questionType}>
          Tipe: {currentItem.type === 'vocab' ? 'Kosakata' : currentItem.type === 'imbuhan' ? 'Imbuhan' : 'Persamaan Kata'}
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
            placeholder="Ketik jawaban Anda..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleInputKeyDown}
            disabled={isAnswered}
            autoFocus
            autoCapitalize="none"
          />
          {!isAnswered && (
             <button className="primaryButton" onClick={handleInputCheck} disabled={!userInput.trim()} style={{marginTop: '1rem'}}>
               Periksa
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
          <div className={`${styles.feedback} ${isCorrect ? styles.correctFeedback : styles.incorrectFeedback}`}>
            {isCorrect ? "Benar! 👍" : `Salah. Jawaban yang benar: ${currentItem.correctAnswer}`}
          </div>
          {currentItem.explanation && (
            <div className={styles.explanationBox}>
              <p className={styles.explanationTitle}>Penjelasan:</p>
              <p>{currentItem.explanation}</p>
            </div>
          )}
          <div className={styles.buttonRow}>
            <button className="nextButton" ref={nextButtonRef} onClick={loadNextQuestion}>
              {currentIndex === testItems.length - 1 || lives <= 0 ? "Selesai" : "Lanjut"} <span className="arrowIcon">→</span>
            </button>
          </div>
        </>
      )}

    </div>
  );
};

export default DailyChallengePage;

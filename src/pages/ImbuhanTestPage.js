// src/pages/ImbuhanTestPage.js
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { imbuhanData } from '../data/imbuhan';
import { useProgress } from '../contexts/ProgressContext';
import styles from './ImbuhanTestPage.module.css';
import ProgressBar from '../components/ProgressBar';

const shuffleArray = (array) => {
  if (!Array.isArray(array)) return [];
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
};

const QUESTION_TIME_LIMIT = 30; // seconds per question
const LIVES_START_COUNT = 3;
const BASE_POINTS_PER_CORRECT_ANSWER = 10;
const HINT_PENALTY = 5;
const STREAK_BONUS_POINTS = 5;
const MAX_STREAK_BONUS_MULTIPLIER = 3;


const ImbuhanTestPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addXP } = useProgress();
  const { numQuestions = 10 } = location.state || {};

  const [testItems, setTestItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(LIVES_START_COUNT);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME_LIMIT);
  const [showHint, setShowHint] = useState(false);
  const [hintUsedThisQuestion, setHintUsedThisQuestion] = useState(false); 
  const [isTestOver, setIsTestOver] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [streak, setStreak] = useState(0);

  const inputRef = useRef(null);
  const timerRef = useRef(null);
  const nextButtonRef = useRef(null);
  const isAnsweredRef = useRef(isAnswered); // Ref to keep track of isAnswered for timeouts

  useEffect(() => {
    isAnsweredRef.current = isAnswered;
  }, [isAnswered]);

  const currentItem = useMemo(() => {
    return (testItems && testItems.length > 0 && currentIndex < testItems.length)
      ? testItems[currentIndex]
      : null;
  }, [testItems, currentIndex]);


  const handleTimeOut = useCallback(() => {
    if (isAnsweredRef.current) return;
    setIsAnswered(true);
    setIsCorrect(false);
    setLives(prevLives => prevLives - 1);
    setStreak(0);
    setTimeout(() => nextButtonRef.current?.focus(), 50);
  }, []);

  const startTimer = useCallback(() => {
    setTimeLeft(QUESTION_TIME_LIMIT);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerRef.current);
          handleTimeOut(); 
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  }, [handleTimeOut]);

  useEffect(() => {
    if (currentItem && !isTestOver) {
        startTimer();
    }
    return () => clearInterval(timerRef.current);
  }, [currentItem, startTimer, isTestOver]);


  useEffect(() => {
    setIsLoading(true);
    const allValidImbuhan = imbuhanData.filter(
      item => item.root && item.targetWord && item.sentence && item.hint && item.explanation
    );
    if (allValidImbuhan.length === 0) {
        alert(`Tidak ada data Imbuhan yang valid. Tidak dapat memulai tes.`);
        navigate('/test-setup');
        setIsLoading(false);
        return;
    }
    if (allValidImbuhan.length < numQuestions) {
        alert(`Tidak cukup data Imbuhan (${allValidImbuhan.length}) untuk tes ${numQuestions} pertanyaan. Jumlah pertanyaan diatur ke ${allValidImbuhan.length}.`);
        const shuffled = shuffleArray([...allValidImbuhan]);
        setTestItems(shuffled.slice(0, allValidImbuhan.length));
    } else {
        const shuffled = shuffleArray([...allValidImbuhan]);
        setTestItems(shuffled.slice(0, numQuestions));
    }
    setCurrentIndex(0);
    setScore(0);
    setCorrectAnswersCount(0);
    setLives(LIVES_START_COUNT);
    setIsTestOver(false);
    setIsAnswered(false);
    setIsCorrect(null);
    setShowHint(false);
    setHintUsedThisQuestion(false);
    setStreak(0);
    setIsLoading(false);
  }, [numQuestions, navigate]);

  const loadNextQuestion = useCallback(() => {
    if (currentIndex < testItems.length - 1 && lives > 0) {
      setCurrentIndex(prev => prev + 1);
      setUserInput('');
      setIsAnswered(false);
      setIsCorrect(null);
      setShowHint(false);
      setHintUsedThisQuestion(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setIsTestOver(true);
      clearInterval(timerRef.current);
    }
  }, [currentIndex, testItems.length, lives]);

  const checkAnswer = useCallback(() => {
    if (isAnsweredRef.current || !currentItem) return;

    clearInterval(timerRef.current);
    setIsAnswered(true);
    const correctAnswer = currentItem.targetWord.toLowerCase();
    const userAnswer = userInput.trim().toLowerCase();
    const correct = userAnswer === correctAnswer;

    setIsCorrect(correct);
    if (correct) {
      setCorrectAnswersCount(prev => prev + 1);
      
      const currentStreak = streak + 1;
      setStreak(currentStreak);
      
      let pointsEarned = BASE_POINTS_PER_CORRECT_ANSWER;
      const timeBonus = Math.max(0, Math.floor((timeLeft / QUESTION_TIME_LIMIT) * BASE_POINTS_PER_CORRECT_ANSWER));
      
      if (currentStreak >= 2) {
        pointsEarned += STREAK_BONUS_POINTS * Math.min(currentStreak - 1, MAX_STREAK_BONUS_MULTIPLIER);
      }
      
      setScore(prevScore => prevScore + pointsEarned + timeBonus);
    } else {
      setLives(prevLives => prevLives - 1);
      setStreak(0);
    }
    setTimeout(() => nextButtonRef.current?.focus(), 100);
  }, [userInput, currentItem, timeLeft, streak]);

  useEffect(() => {
    if (lives <= 0 && !isTestOver) {
      setIsTestOver(true);
      clearInterval(timerRef.current);
    }
  }, [lives, isTestOver]);

  useEffect(() => {
    if (isTestOver && score > 0) {
      addXP(score);
    }
  }, [isTestOver, score, addXP]);

  const handleInputKeyDown = (event) => { // Changed from onKeyPress
    if (event.key === 'Enter' && !isAnswered && userInput.trim()) {
      checkAnswer();
    }
  };

  const handleShowHint = () => {
    if (!hintUsedThisQuestion && !isAnswered) {
        setShowHint(true);
        setHintUsedThisQuestion(true);
        setScore(prevScore => Math.max(0, prevScore - HINT_PENALTY)); // Deduct points for hint
    } else if (isAnswered) {
        setShowHint(true); // Allow viewing hint after answer without penalty
    }
  };

  const displaySentenceWithBlank = () => {
    if (!currentItem || !currentItem.sentence) return "[Kalimat tidak tersedia]";
    return currentItem.sentence.replace(/___|\[____\]|\[_____\]|\[______\]/g, `<span class="${styles.blankPlaceholder}">[____]</span>`);
  };

  if (isLoading) {
    return <div className="loading-page">Menyiapkan Tes...</div>;
  }

  if (isTestOver) {
    const accuracy = testItems.length > 0 ? ((correctAnswersCount / testItems.length) * 100).toFixed(1) : 0;
    return (
      <div className={styles.container}>
        <h2 className={styles.pageTitle}>Tes Selesai!</h2>
        <div className={styles.resultsCard}>
          <p className={styles.score}>Skor Akhir Anda: {score}</p>
          <p className={styles.accuracy}>
            Jawaban Benar: {correctAnswersCount} / {testItems.length} ({accuracy}%)
          </p>
          {lives <= 0 && ! (correctAnswersCount === testItems.length) && <p className={styles.gameOverMessage}>Kesempatan Habis!</p>}
          {correctAnswersCount === testItems.length && lives > 0 && <p className={styles.perfectScoreMessage}>Sempurna! ⭐</p> }
          <button className="primaryButton" style={{marginTop: '20px'}} onClick={() => navigate('/test-setup')}>
            Coba Tes Lain
          </button>
          <button className="secondaryButton" style={{marginTop: '10px'}} onClick={() => navigate('/')}>
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  if (!currentItem) {
    return <div className="loading">Memuat pertanyaan berikutnya...</div>;
  }

  return (
    <div className={styles.container}>
      <ProgressBar current={currentIndex + 1} total={testItems.length} label="Progres Tes" />
      <div className={styles.gameStats}>
        <span className={styles.statItem}>Skor: {score}</span>
        <span className={styles.statItem}>Sisa Waktu: {timeLeft}s</span>
        <span className={styles.statItem}>Nyawa: {'❤️'.repeat(lives) + (lives < LIVES_START_COUNT ? '💔'.repeat(LIVES_START_COUNT - lives) : '')}</span>
        {streak >= 2 && <span className={styles.statItem} style={{color: '#ff9800', fontWeight: 'bold'}}>🔥 Streak x{streak}!</span>}
      </div>

      <div className={styles.questionCard}>
        <p className={styles.label}>Lengkapi kalimat berikut:</p>
        <p className={styles.sentence} dangerouslySetInnerHTML={{ __html: displaySentenceWithBlank() }} />
        <div className={styles.promptSection}>
          <div className={styles.promptItem}>
            <p className={styles.promptLabel}>Kata Dasar (Root):</p>
            <p className={styles.promptValue}>{currentItem.root}</p>
          </div>
          <div className={styles.promptItem}>
            {!showHint || isAnswered ? ( // Show hint button if not shown OR if answered (to re-show)
              <button onClick={handleShowHint} className={styles.hintButton} disabled={isAnswered && showHint}>
                💡 {showHint && isAnswered ? "Lihat Hint Lagi" : `Tampilkan Hint (-${HINT_PENALTY} Poin)`}
              </button>
            ) : (
              <>
                <p className={styles.promptLabel}>Hint (Arti Kata):</p>
                <p className={styles.promptValue}>{currentItem.hint}</p>
              </>
            )}
          </div>
        </div>
      </div>

      {isAnswered && isCorrect && streak >= 3 && (
        <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', marginTop: '-10px', marginBottom: '10px' }}>
          <span className="floating-combo">🔥 Combo x{streak}!</span>
        </div>
      )}

      <div className={`${styles.inputSection} ${isAnswered && !isCorrect ? 'shake-animation' : ''} ${isAnswered && isCorrect ? 'pulse-animation' : ''}`} style={isAnswered && isCorrect ? {borderRadius: '12px', padding: '10px'} : {}}>
        <label htmlFor="testInput" className={styles.instruction}>Ketik bentuk kata yang tepat:</label>
        <input
          id="testInput"
          ref={inputRef}
          type="text"
          className={`${styles.input} ${isAnswered ? (isCorrect ? styles.inputCorrect : styles.inputIncorrect) : ''}`}
          placeholder="Jawaban Anda..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleInputKeyDown}
          disabled={isAnswered}
          autoFocus
          autoCapitalize="none"
        />
      </div>

      {isAnswered && (
        <div className={`${styles.feedback} ${isCorrect ? styles.correctFeedback : styles.incorrectFeedback}`}>
          {isCorrect ? "Benar! 👍" : `Salah. Jawaban yang benar: ${currentItem.targetWord}`}
          {timeLeft === 0 && !isCorrect && isAnswered && " (Waktu Habis)"}
        </div>
      )}
       {isAnswered && currentItem.explanation && (
            <div className={styles.explanationBox}>
                <p className={styles.explanationTitle}>Penjelasan:</p>
                <p>{currentItem.explanation}</p>
            </div>
        )}

      <div className={styles.buttonRow}>
        {!isAnswered && (
          <button className="primaryButton" onClick={checkAnswer} disabled={!userInput.trim()}>
            Periksa
          </button>
        )}
        {isAnswered && (
          <button className="nextButton" ref={nextButtonRef} onClick={loadNextQuestion}>
            {currentIndex === testItems.length - 1 || lives <= 0 ? "Lihat Hasil" : "Lanjut"}
            <span className="arrowIcon">→</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ImbuhanTestPage;
// src/pages/ImbuhanTestPage.js
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { imbuhanData } from '../data/imbuhan';
import styles from './ImbuhanTestPage.module.css'; // We'll create this
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

const ImbuhanTestPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { numQuestions = 10 } = location.state || {}; // Get numQuestions from route state

  const [testItems, setTestItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [isCorrect, setIsCorrect] = useState(null); // null, true, or false
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3); // Number of chances
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME_LIMIT);
  const [showHint, setShowHint] = useState(false);
  const [isTestOver, setIsTestOver] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const inputRef = useRef(null);
  const timerRef = useRef(null);
  const nextButtonRef = useRef(null);

  const currentItem = useMemo(() => {
    return (testItems && testItems.length > 0 && currentIndex < testItems.length)
      ? testItems[currentIndex]
      : null;
  }, [testItems, currentIndex]);

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
  }, []); // Add handleTimeOut to dependency array if it's defined outside or changes

  const handleTimeOut = useCallback(() => {
    if (isAnswered) return; // Already answered
    setIsAnswered(true);
    setIsCorrect(false); // Mark as incorrect if time runs out
    setLives(prevLives => prevLives - 1);
    // No direct score penalty for timeout, just loss of life and incorrect answer
    setTimeout(() => nextButtonRef.current?.focus(), 50);
  }, [isAnswered]); // Added isAnswered

  useEffect(() => {
    startTimer(); // Start timer when component mounts or currentItem changes
    return () => clearInterval(timerRef.current); // Cleanup on unmount
  }, [currentItem, startTimer]);


  useEffect(()_ => {
    const allValidImbuhan = imbuhanData.filter(
      item => item.root && item.targetWord && item.sentence && item.hint && item.explanation
    );
    if (allValidImbuhan.length < numQuestions) {
        alert(`Tidak cukup data Imbuhan (${allValidImbuhan.length}) untuk tes ${numQuestions} pertanyaan. Harap kurangi jumlah pertanyaan atau tambahkan data.`);
        navigate('/test-setup');
        return;
    }
    const shuffled = shuffleArray([...allValidImbuhan]);
    setTestItems(shuffled.slice(0, numQuestions));
    setCurrentIndex(0);
    setScore(0);
    setLives(3);
    setIsTestOver(false);
    setIsLoading(false);
  }, [numQuestions, navigate]);

  const loadNextQuestion = useCallback(() => {
    if (currentIndex < testItems.length - 1 && lives > 0) {
      setCurrentIndex(prev => prev + 1);
      setUserInput('');
      setIsAnswered(false);
      setIsCorrect(null);
      setShowHint(false);
      startTimer(); // Restart timer for the new question
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setIsTestOver(true);
      clearInterval(timerRef.current);
    }
  }, [currentIndex, testItems.length, lives, startTimer]);

  const checkAnswer = useCallback(() => {
    if (isAnswered || !currentItem) return;

    clearInterval(timerRef.current); // Stop timer on answer
    setIsAnswered(true);
    const correctAnswer = currentItem.targetWord.toLowerCase();
    const userAnswer = userInput.trim().toLowerCase();
    const correct = userAnswer === correctAnswer;

    setIsCorrect(correct);
    if (correct) {
      setScore(prevScore => prevScore + 10 + Math.max(0, timeLeft - (QUESTION_TIME_LIMIT / 2))); // Points + bonus for speed
    } else {
      setLives(prevLives => prevLives - 1);
    }
    // Focus next button after a short delay to allow feedback to be seen
    setTimeout(() => nextButtonRef.current?.focus(), 100);
  }, [userInput, currentItem, isAnswered, timeLeft]);

  useEffect(() => {
    if (lives <= 0 && !isTestOver) {
      setIsTestOver(true);
      clearInterval(timerRef.current);
    }
  }, [lives, isTestOver]);

  const handleInputKeyPress = (event) => {
    if (event.key === 'Enter' && !isAnswered && userInput.trim()) {
      checkAnswer();
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
    return (
      <div className={styles.container}>
        <h2 className={styles.pageTitle}>Tes Selesai!</h2>
        <div className={styles.resultsCard}>
          <p className={styles.score}>Skor Akhir Anda: {score}</p>
          <p className={styles.accuracy}>
            Jawaban Benar: {score / 10 > 0 ? Math.floor(score/10) : 0} / {testItems.length} {/* Simplistic, improve if bonus is complex */}
          </p>
          {lives <= 0 && <p className={styles.gameOverMessage}>Kesempatan Habis!</p>}
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
        <span className={styles.statItem}>Nyawa: {'❤️'.repeat(lives) + '💔'.repeat(3 - lives)}</span>
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
            {!showHint && !isAnswered ? (
              <button onClick={() => setShowHint(true)} className={styles.hintButton}>
                💡 Tampilkan Hint (-5 Poin)
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

      <div className={styles.inputSection}>
        <label htmlFor="testInput" className={styles.instruction}>Ketik bentuk kata yang tepat:</label>
        <input
          id="testInput"
          ref={inputRef}
          type="text"
          className={`${styles.input} ${isAnswered ? (isCorrect ? styles.inputCorrect : styles.inputIncorrect) : ''}`}
          placeholder="Jawaban Anda..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyPress={handleInputKeyPress}
          disabled={isAnswered}
          autoFocus
          autoCapitalize="none"
        />
      </div>

      {isAnswered && (
        <div className={`${styles.feedback} ${isCorrect ? styles.correctFeedback : styles.incorrectFeedback}`}>
          {isCorrect ? "Benar! 👍" : `Salah. Jawaban: ${currentItem.targetWord}`}
          {timeLeft === 0 && !isCorrect && " (Waktu Habis)"}
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
            Lanjut <span className="arrowIcon">→</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ImbuhanTestPage;
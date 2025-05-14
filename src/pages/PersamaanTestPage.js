// src/pages/PersamaanTestPage.js
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { persamaanData } from '../data/persamaan';
import styles from './PersamaanTestPage.module.css';
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

// Same getDistractors as in PersamaanPage.js
const getDistractors = (allItems, currentItem, count = 3) => {
  const distractors = new Set();
  if (!Array.isArray(allItems) || !currentItem || !currentItem.word || !Array.isArray(currentItem.synonyms)) {
    console.error("Invalid input to getDistractors in PersamaanTestPage");
    return [];
  }

  const currentWordLower = currentItem.word.toLowerCase();
  const correctSynonymStringsLower = currentItem.synonyms.map(sObj => sObj.synonym.toLowerCase());

  const potentialDistractorWords = allItems
    .map(item => item.word)
    .filter(Boolean)
    .filter(word => {
      const wordLower = word.toLowerCase();
      return wordLower !== currentWordLower && !correctSynonymStringsLower.includes(wordLower);
    });

  const shuffledPool = shuffleArray([...new Set(potentialDistractorWords)]);

  for (const word of shuffledPool) {
    if (distractors.size >= count) break;
    distractors.add(word);
  }

  let fallbackCounter = 1;
  while (distractors.size < count) {
    const fallback = `[Opsi Salah ${fallbackCounter++}]`;
     if (![...distractors].includes(fallback)) {
        distractors.add(fallback);
    }
    if (fallbackCounter > count + 10) break;
  }
  return Array.from(distractors);
};


const QUESTION_TIME_LIMIT = 20;
const LIVES_START_COUNT = 3;
const BASE_POINTS_PER_CORRECT = 10;
const STREAK_BONUS_POINTS = 5;
const MAX_STREAK_BONUS_MULTIPLIER = 3;

const PersamaanTestPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { numQuestions = 10 } = location.state || {};

  const [testItems, setTestItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [options, setOptions] = useState([]); // Array of string options
  const [correctSynonymForCurrent, setCorrectSynonymForCurrent] = useState(null); // The correct synonym string for the current item
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(LIVES_START_COUNT);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME_LIMIT);
  const [streak, setStreak] = useState(0);
  const [isTestOver, setIsTestOver] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);

  const timerRef = useRef(null);
  const nextButtonRef = useRef(null);
  const optionButtonRefs = useRef([]);
  const isAnsweredRef = useRef(isAnswered);
  const pageRef = useRef(null);

  useEffect(() => {
    isAnsweredRef.current = isAnswered;
  }, [isAnswered]);

  const currentItem = useMemo(() => {
    return (testItems && testItems.length > 0 && currentIndex < testItems.length)
      ? testItems[currentIndex]
      : null;
  }, [testItems, currentIndex]);

  const generateOptions = useCallback(() => {
    if (!currentItem || !Array.isArray(currentItem.synonyms) || currentItem.synonyms.length === 0) {
      setOptions([]);
      setCorrectSynonymForCurrent(null);
      return;
    }
    // Pick one correct synonym object, then extract its string
    const chosenCorrectSynonymObj = currentItem.synonyms[Math.floor(Math.random() * currentItem.synonyms.length)];
    setCorrectSynonymForCurrent(chosenCorrectSynonymObj.synonym); // Store the string

    const distractors = getDistractors(persamaanData, currentItem, 3); // 3 distractors for 4 total options
    const allOptionStrings = shuffleArray([chosenCorrectSynonymObj.synonym, ...distractors]);
    setOptions(allOptionStrings);
    optionButtonRefs.current = allOptionStrings.map((_, i) => optionButtonRefs.current[i] || React.createRef());
  }, [currentItem, getDistractors]);

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
      generateOptions();
      startTimer();
    }
    return () => clearInterval(timerRef.current);
  }, [currentItem, generateOptions, startTimer, isTestOver]);

  useEffect(() => {
    setIsLoading(true);
    const allValidPersamaan = persamaanData.filter(item => item.word && Array.isArray(item.synonyms) && item.synonyms.length > 0 && item.example_sentence_target && item.synonyms.every(s => s.synonym && s.example_sentence_synonym));
    if (allValidPersamaan.length === 0) {
        alert("Tidak ada data Persamaan yang valid dengan contoh kalimat. Tidak dapat memulai tes.");
        navigate('/test-setup');
        setIsLoading(false);
        return;
    }
    let itemsForTest;
    if (allValidPersamaan.length < numQuestions) {
        alert(`Tidak cukup data Persamaan (${allValidPersamaan.length}) untuk tes ${numQuestions} pertanyaan. Jumlah pertanyaan diatur ke ${allValidPersamaan.length}.`);
        itemsForTest = shuffleArray([...allValidPersamaan]);
    } else {
        itemsForTest = shuffleArray([...allValidPersamaan]).slice(0, numQuestions);
    }
    setTestItems(itemsForTest);
    setCurrentIndex(0); setScore(0); setCorrectAnswersCount(0); setLives(LIVES_START_COUNT);
    setIsTestOver(false); setIsAnswered(false); setIsCorrect(null); setStreak(0);
    setIsLoading(false);
  }, [numQuestions, navigate]);

  const loadNextQuestion = useCallback(() => {
    if (currentIndex < testItems.length - 1 && lives > 0) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null); setIsAnswered(false); setIsCorrect(null);
    } else {
      setIsTestOver(true); clearInterval(timerRef.current);
    }
  }, [currentIndex, testItems.length, lives]);

  const handleOptionClick = useCallback((selectedOptionString) => {
    if (isAnsweredRef.current || !currentItem || !correctSynonymForCurrent) return;
    clearInterval(timerRef.current);
    setIsAnswered(true); setSelectedAnswer(selectedOptionString);
    const correct = selectedOptionString.toLowerCase() === correctSynonymForCurrent.toLowerCase();
    setIsCorrect(correct);
    if (correct) {
      setCorrectAnswersCount(prev => prev + 1);
      const currentStreak = streak + 1; setStreak(currentStreak);
      let pointsEarned = BASE_POINTS_PER_CORRECT;
      if (currentStreak >= 2) { pointsEarned += STREAK_BONUS_POINTS * Math.min(currentStreak -1, MAX_STREAK_BONUS_MULTIPLIER); }
      setScore(prevScore => prevScore + pointsEarned);
    } else {
      setLives(prevLives => prevLives - 1); setStreak(0);
    }
    setTimeout(() => nextButtonRef.current?.focus(), 100);
  }, [currentItem, streak, timeLeft, correctSynonymForCurrent]);

  useEffect(() => { if (lives <= 0 && !isTestOver) { setIsTestOver(true); clearInterval(timerRef.current); } }, [lives, isTestOver]);

  const getRank = (finalScore, totalQuestions) => { const percentage = totalQuestions > 0 ? (correctAnswersCount / totalQuestions) * 100 : 0; if (percentage >= 90) return "Pakar Persamaan Kata 🥇"; if (percentage >= 75) return "Jagoan Sinonim 👍"; if (percentage >= 50) return "Pencari Kata ✨"; return "Pemula Bersemangat 🌱"; };

  if (isLoading) { return <div className="loading-page">Menyiapkan Tes Persamaan...</div>; }
  if (isTestOver) {
    const accuracy = testItems.length > 0 ? ((correctAnswersCount / testItems.length) * 100).toFixed(1) : 0;
    const rank = getRank(score, testItems.length);
    return (
      <div className={styles.container}>
        <h2 className={styles.pageTitle}>Tes Persamaan Selesai!</h2>
        <div className={styles.resultsCard}>
          <p className={styles.rank}>{rank}</p>
          <p className={styles.score}>Skor Akhir: {score}</p>
          <p className={styles.accuracy}>Jawaban Benar: {correctAnswersCount} / {testItems.length} ({accuracy}%)</p>
          {lives <= 0 && !(correctAnswersCount === testItems.length) && <p className={styles.gameOverMessage}>Kesempatan Habis!</p>}
          <button className="primaryButton" style={{marginTop: '20px'}} onClick={() => navigate('/test-setup')}>Ulangi Pengaturan Tes</button>
          <button className="secondaryButton" style={{marginTop: '10px'}} onClick={() => navigate('/')}>Kembali ke Beranda</button>
        </div>
      </div>
    );
  }
  if (!currentItem || !correctSynonymForCurrent) { return <div className="loading">Memuat pertanyaan berikutnya...</div>; }

  return (
    <div className={styles.container} ref={pageRef} tabIndex={-1}>
      <ProgressBar current={currentIndex + 1} total={testItems.length} label="Progres Tes Persamaan" />
      <div className={styles.gameStats}>
        <span className={styles.statItem}>Skor: {score}</span>
        <span className={styles.statItemTimer}>⏳ {timeLeft}s</span>
        <span className={styles.statItem}>Nyawa: {'❤️'.repeat(lives) + (lives < LIVES_START_COUNT ? '💔'.repeat(LIVES_START_COUNT - lives) : '')}</span>
        {streak >=2 && <span className={`${styles.statItem} ${styles.streakIndicator}`}>🔥 Streak x{streak}!</span>}
      </div>

      <div className={styles.questionCard}>
        <p className={styles.instructionPersamaan}>Carikan persamaan kata (sinonim) untuk:</p>
        <h2 className={styles.wordToFind}>{currentItem.word}</h2>
        {currentItem.example_sentence_target && (
            <p className={styles.exampleSentenceTarget}>"{currentItem.example_sentence_target}"</p>
        )}
      </div>

      <div className={styles.optionsGrid}>
        {options.map((optionString, index) => {
          const isTheCorrectAnswer = optionString.toLowerCase() === correctSynonymForCurrent.toLowerCase();
          let buttonClassName = styles.optionButton;
          if (isAnswered) {
            if (selectedAnswer === optionString) {
              buttonClassName += isCorrect ? ` ${styles.correctSelected}` : ` ${styles.incorrectSelected}`;
            } else if (isTheCorrectAnswer) {
              buttonClassName += ` ${styles.correctUnselected}`;
            } else {
                buttonClassName += ` ${styles.disabled}`;
            }
          }
          return ( <button key={`${currentItem.id}-opt-${index}`} ref={el => optionButtonRefs.current[index] = el} className={buttonClassName} onClick={() => handleOptionClick(optionString)} disabled={isAnswered} > {optionString} </button> );
        })}
      </div>
      {isAnswered && (
        <div className={`${styles.feedback} ${isCorrect ? styles.correctFeedback : styles.incorrectFeedback}`}>
          {isCorrect ? `Tepat Sekali! "${correctSynonymForCurrent}" adalah sinonim yang benar. 🎉` :
            `Kurang Tepat. Sinonim yang benar antara lain: ${currentItem.synonyms.map(s=>s.synonym).join(', ')}.`}
          {!isCorrect && currentItem.synonyms.find(sObj => sObj.synonym.toLowerCase() === correctSynonymForCurrent.toLowerCase())?.example_sentence_synonym && (
            <p className={styles.feedbackExample}>
                Contoh penggunaan "{correctSynonymForCurrent}": "<em>{currentItem.synonyms.find(sObj => sObj.synonym.toLowerCase() === correctSynonymForCurrent.toLowerCase()).example_sentence_synonym}</em>"
            </p>
          )}
          {timeLeft === 0 && !isCorrect && isAnswered && " (Waktu Habis)"}
        </div>
      )}
      {isAnswered && (
          <button className="nextButton" ref={nextButtonRef} onClick={loadNextQuestion} style={{marginTop: '20px'}}>
            {currentIndex === testItems.length - 1 || lives <= 0 ? "Lihat Hasil" : "Pertanyaan Berikutnya"}
            <span className="arrowIcon">→</span>
          </button>
        )}
    </div>
  );
};

export default PersamaanTestPage;
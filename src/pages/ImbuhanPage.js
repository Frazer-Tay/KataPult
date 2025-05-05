// src/pages/ImbuhanPage.js
import React, { useState, useEffect, useCallback, useMemo } from 'react';
// Correct the import path if your data file is named differently or in another location
import { imbuhanData } from '../data/imbuhan';
import styles from './ImbuhanPage.module.css';

const shuffleArray = (array) => {
    // Ensure input is an array before trying to shuffle
    if (!Array.isArray(array)) {
        console.error("shuffleArray received non-array:", array);
        return []; // Return empty array or handle error appropriately
    }
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
};

const ImbuhanPage = () => {
  const [shuffledItems, setShuffledItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); // State for loading errors

  // Memoize current item
  const currentItem = useMemo(() => {
    if (shuffledItems && shuffledItems.length > 0 && currentIndex < shuffledItems.length) {
      return shuffledItems[currentIndex];
    }
    return null;
  }, [shuffledItems, currentIndex]);

  // Initial data loading and shuffling
  useEffect(() => {
    setIsLoading(true);
    setError(null); // Reset error on load
    try {
      // --- CRITICAL CHECK ---
      if (!imbuhanData || !Array.isArray(imbuhanData)) {
          throw new Error("Imbuhan data is not loaded correctly or is not an array.");
      }
      // --- END CRITICAL CHECK ---

      const initialItems = shuffleArray([...imbuhanData]);
      setShuffledItems(initialItems);
      setCurrentIndex(0);
    } catch (err) {
       console.error("Error loading/shuffling Imbuhan data:", err);
       setError("Gagal memuat data Imbuhan. Periksa konsol untuk detail."); // User-friendly error
    } finally {
        setIsLoading(false);
    }
  }, []); // Empty dependency array ensures this runs only once on mount


  // Effect to reset state for the *next* item *after* currentItem changes
   useEffect(() => {
       // Only reset if not loading, not the initial state, and currentItem is valid
       if (!isLoading && currentItem) {
         setUserInput('');
         setFeedback('');
         setIsCorrect(false);
         setShowNextButton(false);
       }
   }, [currentItem, isLoading]); // Depend on currentItem


  const handleReshuffle = () => {
    setIsLoading(true);
    setError(null);
    try {
        if (!imbuhanData || !Array.isArray(imbuhanData)) {
            throw new Error("Imbuhan data is not available for reshuffle.");
        }
        const reshuffled = shuffleArray([...imbuhanData]);
        setShuffledItems(reshuffled);
        setCurrentIndex(0);
    } catch (err) {
        console.error("Error reshuffling Imbuhan data:", err);
        setError("Gagal memulai ulang latihan.");
    } finally {
      setIsLoading(false);
    }
  };

  const loadNextItem = useCallback(() => {
    // Check if shuffledItems is valid before proceeding
    if (!shuffledItems || shuffledItems.length === 0) {
        console.warn("Attempted to load next item, but shuffledItems is empty or invalid.");
        return;
    }
    if (currentIndex < shuffledItems.length - 1) {
      setCurrentIndex(prevIndex => prevIndex + 1);
    } else {
      setCurrentIndex(shuffledItems.length); // Go beyond bounds for completion
    }
  }, [currentIndex, shuffledItems]);


  const checkAnswer = useCallback(() => {
    if (!currentItem || isCorrect) return;

    const correctAnswer = currentItem.targetWord ? currentItem.targetWord.toLowerCase() : '';
    const userAnswer = userInput.trim().toLowerCase();

    if (correctAnswer && userAnswer === correctAnswer) { // Check if correctAnswer exists
      setFeedback('Benar!');
      setIsCorrect(true);
      setShowNextButton(false);
      setTimeout(loadNextItem, 1200);
    } else {
      setFeedback(`Salah. Jawaban yang benar: ${currentItem.targetWord || '[Tidak Ada]'}`);
      setIsCorrect(false);
      setShowNextButton(true);
    }
  }, [currentItem, isCorrect, userInput, loadNextItem]);

  const handleKeyPress = useCallback((event) => {
    if (event.key === 'Enter' && !isCorrect && userInput.trim()) {
      checkAnswer();
    }
  }, [checkAnswer, isCorrect, userInput]);

  const isCompleted = currentIndex >= shuffledItems.length && shuffledItems.length > 0 && !isLoading;

  // --- Render States ---

  if (isLoading) {
       return <div className={styles.loading}>Memuat pertanyaan...</div>;
  }

  if (error) {
       return <div className={styles.error}>{error}</div>;
  }

  if (isCompleted) {
    return (
      <div className={styles.container}>
        <p className={styles.completionMessage}>Latihan Imbuhan Selesai!</p>
        <button className={styles.button} onClick={handleReshuffle}>
          Ulangi Latihan
        </button>
      </div>
    );
  }

  if (currentItem) {
      return (
        <div className={styles.container}>
          <div className={styles.card}>
            <p className={styles.label}>Kata Dasar (Root):</p>
            <h2 className={styles.rootWord}>{currentItem.root || '[Tidak Ada]'}</h2>
            <p className={styles.label}>Arti yang Dimaksud (Target Meaning):</p>
            <p className={styles.definition}>{currentItem.targetDefinition || '[Tidak Ada]'}</p>
          </div>

          <div className={styles.inputSection}>
            <label htmlFor="imbuhanInput" className={styles.instruction}>
              Tulis bentuk kata berimbuhan yang benar:
            </label>
            <input
              id="imbuhanInput"
              type="text"
              className={styles.input}
              placeholder="Jawaban Anda..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isCorrect}
              autoCapitalize="none"
              aria-describedby="feedbackArea"
            />
          </div>

          {feedback && (
            <p id="feedbackArea" className={`${styles.feedback} ${isCorrect ? styles.correct : styles.incorrect}`} role="alert">
              {feedback}
            </p>
          )}

          <div className={styles.buttonRow}>
            {!isCorrect && (
                <button
                className={styles.button}
                onClick={checkAnswer}
                disabled={!userInput.trim()}
                >
                Periksa (Check)
                </button>
            )}
            {showNextButton && (
              <button className={styles.button} onClick={loadNextItem}>
                Lanjut (Next)
              </button>
            )}
          </div>
        </div>
      );
  }

  // Fallback if no items loaded but not loading/error/completed
  return <div className={styles.loading}>Tidak ada data imbuhan untuk ditampilkan.</div>;
};

export default ImbuhanPage;
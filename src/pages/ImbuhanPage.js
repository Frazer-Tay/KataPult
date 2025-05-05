// src/pages/ImbuhanPage.js
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { imbuhanData } from '../data/imbuhan';
import styles from './ImbuhanPage.module.css'; // Ensure CSS Module is imported

const shuffleArray = (array) => {
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
  const [feedback, setFeedback] = useState(''); // '', 'Benar!', 'Salah. Jawaban: ...'
  const [isCorrect, setIsCorrect] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false); // Control next button visibility
  const [isLoading, setIsLoading] = useState(true); // Loading state

  // Memoize current item to prevent unnecessary recalculations
  const currentItem = useMemo(() => {
    if (shuffledItems.length > 0 && currentIndex < shuffledItems.length) {
      return shuffledItems[currentIndex];
    }
    return null;
  }, [shuffledItems, currentIndex]);

  // Initial shuffle and setup on mount
  useEffect(() => {
    try {
      const initialItems = shuffleArray([...imbuhanData]);
      setShuffledItems(initialItems);
      setCurrentIndex(0);
      setIsLoading(false); // Mark loading as complete
    } catch (error) {
       console.error("Error shuffling or setting initial data:", error);
       setIsLoading(false); // Also stop loading on error
       // Optionally set an error message state to display to the user
    }
    // Reset other states on initial load or reshuffle
    setUserInput('');
    setFeedback('');
    setIsCorrect(false);
    setShowNextButton(false);
  }, []); // Empty dependency array: run only once on mount

   // Effect to reset state when currentItem changes *after* initial load
   useEffect(() => {
       if (!isLoading) { // Only run after initial load/shuffle
         setUserInput('');
         setFeedback('');
         setIsCorrect(false);
         setShowNextButton(false);
       }
   }, [currentItem, isLoading]); // Depend on currentItem and isLoading


  const handleReshuffle = () => {
    setIsLoading(true); // Show loading briefly during reshuffle
    try {
        const reshuffled = shuffleArray([...imbuhanData]);
        setShuffledItems(reshuffled);
        setCurrentIndex(0);
        setIsLoading(false);
    } catch (error) {
        console.error("Error reshuffling data:", error);
        setIsLoading(false);
    }
    // Reset other states handled by the useEffect above depending on currentItem
  };

  const loadNextItem = useCallback(() => {
    if (currentIndex < shuffledItems.length - 1) {
      setCurrentIndex(prevIndex => prevIndex + 1);
      // State resets (like input, feedback) are handled by the useEffect watching currentItem
    } else {
      // Handle completion - set index beyond bounds
      setCurrentIndex(shuffledItems.length);
    }
  }, [currentIndex, shuffledItems.length]);


  const checkAnswer = useCallback(() => {
    if (!currentItem || isCorrect) return;

    const correctAnswer = currentItem.targetWord.toLowerCase();
    const userAnswer = userInput.trim().toLowerCase();

    if (userAnswer === correctAnswer) {
      setFeedback('Benar!');
      setIsCorrect(true);
      setShowNextButton(false);
      setTimeout(loadNextItem, 1200);
    } else {
      setFeedback(`Salah. Jawaban yang benar: ${currentItem.targetWord}`);
      setIsCorrect(false);
      setShowNextButton(true);
    }
  }, [currentItem, isCorrect, userInput, loadNextItem]);

  const handleKeyPress = useCallback((event) => {
    if (event.key === 'Enter' && !isCorrect && userInput.trim()) {
      checkAnswer();
    }
  }, [checkAnswer, isCorrect, userInput]);

  const isCompleted = currentIndex >= shuffledItems.length && shuffledItems.length > 0;

  // Render Loading state
  if (isLoading) {
       return <div className={styles.loading}>Memuat pertanyaan...</div>;
  }

  // Render Completion state
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

  // Render Active Question state (only if currentItem is valid)
  if (currentItem) {
      return (
        <div className={styles.container}>
          <div className={styles.card}>
            <p className={styles.label}>Kata Dasar (Root):</p>
            <h2 className={styles.rootWord}>{currentItem.root}</h2>
            <p className={styles.label}>Arti yang Dimaksud (Target Meaning):</p>
            <p className={styles.definition}>{currentItem.targetDefinition}</p>
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
            {!isCorrect && ( // Only show Check button if not already correct
                <button
                className={styles.button}
                onClick={checkAnswer}
                disabled={!userInput.trim()}
                >
                Periksa (Check)
                </button>
            )}
            {showNextButton && ( // Show Next button only when feedback indicates incorrect
              <button className={styles.button} onClick={loadNextItem}>
                Lanjut (Next)
              </button>
            )}
          </div>
        </div>
      );
  }

  // Fallback if something went wrong (e.g., data is empty but not loading/completed)
  return <div className={styles.loading}>Terjadi kesalahan memuat data.</div>;
};

export default ImbuhanPage;
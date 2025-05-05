// src/pages/ImbuhanPage.js
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { imbuhanData } from '../data/imbuhan';
import styles from './ImbuhanPage.module.css';
import ProgressBar from '../components/ProgressBar'; // Assuming ProgressBar component exists

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

const ImbuhanPage = () => {
  const [allItems, setAllItems] = useState([]); // Holds the original full list
  const [displayItems, setDisplayItems] = useState([]); // Holds the items currently being practiced (full or missed)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [missedItems, setMissedItems] = useState(new Set()); // Track IDs of missed items in the current round
  const [isReviewing, setIsReviewing] = useState(false); // Are we in review mode?

  const { currentItem, totalItemsInSet } = useMemo(() => {
    const item = (displayItems && displayItems.length > 0 && currentIndex < displayItems.length)
      ? displayItems[currentIndex]
      : null;
    return { currentItem: item, totalItemsInSet: displayItems?.length || 0 };
  }, [displayItems, currentIndex]);

  // Initial Load
  useEffect(() => {
    setIsLoading(true);
    setError(null);
    try {
      if (!imbuhanData || !Array.isArray(imbuhanData) || imbuhanData.length === 0) {
        throw new Error("No valid Imbuhan data found.");
      }
      const initialData = shuffleArray([...imbuhanData]);
      setAllItems([...imbuhanData]); // Store original
      setDisplayItems(initialData);
      setCurrentIndex(0);
      setMissedItems(new Set()); // Reset missed items
      setIsReviewing(false);
    } catch (err) {
      console.error("Error loading/shuffling Imbuhan data:", err);
      setError("Gagal memuat data Imbuhan.");
    } finally {
      setIsLoading(false);
    }
  }, []); // Run only on mount

  // Effect to reset input/feedback for the next item
  useEffect(() => {
    if (!isLoading && currentItem) {
      setUserInput('');
      setFeedback('');
      setIsCorrect(false);
      setShowNextButton(false);
    }
  }, [currentItem, isLoading]);

  // Function to start over with all items
  const handleReshuffleAll = () => {
    if (allItems.length === 0) return;
    setIsLoading(true);
    setError(null);
    setDisplayItems(shuffleArray([...allItems]));
    setCurrentIndex(0);
    setMissedItems(new Set()); // Clear missed items
    setIsReviewing(false);
    setIsLoading(false);
  };

  // Function to start review of missed items
  const handleReviewMistakes = () => {
    if (missedItems.size === 0) return; // Nothing to review
    setIsLoading(true);
    setError(null);
    // Find the actual items from allItems based on missed IDs
    const itemsToReview = allItems.filter(item => missedItems.has(item.id));
    setDisplayItems(shuffleArray(itemsToReview)); // Shuffle the missed items
    setCurrentIndex(0);
    setMissedItems(new Set()); // Clear missed items for the *next* round
    setIsReviewing(true); // Set review mode flag
    setIsLoading(false);
  };

  const loadNextItem = useCallback(() => {
    if (!displayItems || displayItems.length === 0) return;
    if (currentIndex < displayItems.length - 1) {
      setCurrentIndex(prevIndex => prevIndex + 1);
    } else {
      setCurrentIndex(displayItems.length); // Go beyond bounds for completion
    }
  }, [currentIndex, displayItems]);

  const checkAnswer = useCallback(() => {
    if (!currentItem || isCorrect) return;
    const correctAnswer = currentItem.targetWord ? currentItem.targetWord.toLowerCase() : '';
    const userAnswer = userInput.trim().toLowerCase();

    if (correctAnswer && userAnswer === correctAnswer) {
      setFeedback('Tepat! Jawaban Benar.');
      setIsCorrect(true);
      setShowNextButton(false);
      // If reviewing, remove from potential future review if now correct
      // Note: This logic might be simpler if we just clear missedItems on starting review
      // missedItems.delete(currentItem.id); // Optional: Refine this later if needed
      setTimeout(loadNextItem, 1500);
    } else {
      setFeedback(`Kurang Tepat. Jawaban: ${currentItem.targetWord || '[N/A]'}`);
      setIsCorrect(false);
      setShowNextButton(true);
      // Add to missed items Set (IDs ensure uniqueness)
      setMissedItems(prev => new Set(prev).add(currentItem.id));
    }
  }, [currentItem, isCorrect, userInput, loadNextItem]); // Removed missedItems from deps

  const handleKeyPress = useCallback((event) => {
    if (event.key === 'Enter' && !isCorrect && userInput.trim()) {
      checkAnswer();
    }
  }, [checkAnswer, isCorrect, userInput]);

  const isCompleted = currentIndex >= totalItemsInSet && totalItemsInSet > 0 && !isLoading;
  const mistakesMadeCount = missedItems.size; // Count mistakes *before* review starts


  // --- Render Logic ---
  if (isLoading) {
    return <div className={styles.loading}>Memuat pertanyaan...</div>;
  }
  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  // Completion Screen
  if (isCompleted) {
    // Determine message based on whether it was a review session
    const completionText = isReviewing
      ? "✨ Sesi Review Selesai! ✨"
      : "✨ Latihan Imbuhan Selesai! ✨";

    return (
      <div className={styles.container}>
        <p className={styles.completionMessage}>{completionText}</p>
        {/* Show mistakes only after the initial run, not after review */}
        {!isReviewing && mistakesMadeCount > 0 && (
           <p className={styles.completionSubMessage}>
             Anda membuat {mistakesMadeCount} kesalahan.
           </p>
        )}
        <div className={styles.completionActions}>
            {/* Only show "Review Mistakes" if there were mistakes in the last FULL run */}
            {!isReviewing && mistakesMadeCount > 0 && (
                 <button className="secondaryButton" onClick={handleReviewMistakes}>
                    🔁 Ulangi Kesalahan ({mistakesMadeCount})
                 </button>
            )}
            <button className="primaryButton" onClick={handleReshuffleAll}>
                {!isReviewing ? 'Ulangi Semua' : 'Mulai Lagi Semua'}
            </button>
        </div>
      </div>
    );
  }

  // Active Question
  if (!currentItem) {
      // Should generally not happen if loading/error/completion are handled
     return <div className={styles.loading}>Memuat soal berikutnya...</div>;
   }

  return (
    <div className={styles.container}>
        {/* Progress Bar */}
        <ProgressBar
            current={currentIndex + 1}
            total={totalItemsInSet}
            label={isReviewing ? "Review Kesalahan" : "Progress"}
         />
        <div className={styles.card}>
            <p className={styles.label}>Kata Dasar (Root):</p>
            <h2 className={styles.rootWord}>{currentItem.root || '[N/A]'}</h2>
            <p className={styles.label}>Arti yang Dimaksud (Target Meaning):</p>
            <p className={styles.definition}>{currentItem.targetDefinition || '[N/A]'}</p>
        </div>

        <div className={styles.inputSection}>
            <label htmlFor="imbuhanInput" className={styles.instruction}>
                Tulis bentuk kata berimbuhan yang benar:
            </label>
            <input
            id="imbuhanInput"
            type="text"
            className={`${styles.input} ${isAnswered ? (isCorrect ? styles.inputCorrect : styles.inputIncorrect) : ''}`}
            placeholder="Jawaban Anda..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isCorrect}
            autoCapitalize="none"
            aria-describedby="feedbackArea"
            aria-invalid={isAnswered && !isCorrect}
            />
        </div>

        {isAnswered && feedback && (
        <p id="feedbackArea" className={`${styles.feedback} ${isCorrect ? styles.correctFeedback : styles.incorrectFeedback}`} role="alert">
            {feedback}
        </p>
        )}

        <div className={styles.buttonRow}>
        {!isAnswered && (
            <button
            className="primaryButton" // Use global style
            onClick={checkAnswer}
            disabled={!userInput.trim()}
            >
            Periksa Jawaban
            </button>
        )}
        {showNextButton && (
            <button className="nextButton" onClick={loadNextItem}>
            Lanjut <span className="arrowIcon">→</span>
            </button>
        )}
        </div>
    </div>
  );
};

export default ImbuhanPage;
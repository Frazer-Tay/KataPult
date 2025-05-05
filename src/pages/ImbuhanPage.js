// src/pages/ImbuhanPage.js
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { imbuhanData } from '../data/imbuhan';
import styles from './ImbuhanPage.module.css';
import ProgressBar from '../components/ProgressBar'; // Import ProgressBar

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
  const [allItems, setAllItems] = useState([]);
  const [displayItems, setDisplayItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [missedItems, setMissedItems] = useState(new Set());
  const [isReviewing, setIsReviewing] = useState(false);
  const [mistakesMadeCountDuringRun, setMistakesMadeCountDuringRun] = useState(0);
  // --- ADD isAnswered STATE ---
  const [isAnswered, setIsAnswered] = useState(false); // Track if current question was answered

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
      setAllItems([...imbuhanData]);
      setDisplayItems(initialData);
      setCurrentIndex(0);
      setMissedItems(new Set());
      setIsReviewing(false);
      setIsAnswered(false); // Reset on load
    } catch (err) {
      console.error("Error loading/shuffling Imbuhan data:", err);
      setError("Gagal memuat data Imbuhan.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Effect to reset state for the next item
  useEffect(() => {
    if (!isLoading && currentItem) {
      setUserInput('');
      setFeedback('');
      setIsCorrect(false);
      setShowNextButton(false);
      setIsAnswered(false); // Reset answered state for new item
    }
  }, [currentItem, isLoading]);


  const handleReshuffleAll = () => {
    if (allItems.length === 0) return;
    setIsLoading(true);
    setError(null);
    setIsReviewing(false); // Ensure not in review mode
    const reshuffled = shuffleArray([...allItems]);
    setDisplayItems(reshuffled);
    setCurrentIndex(0);
    setMissedItems(new Set());
    setMistakesMadeCountDuringRun(0);
    setIsAnswered(false);
    setIsLoading(false);
  };

  const handleReviewMistakes = () => {
    // Use mistakesMadeCountDuringRun to check if review is possible
    const mistakeIds = Array.from(missedItems);
    if (mistakeIds.length === 0) return;

    setIsLoading(true);
    setError(null);
    const itemsToReview = allItems.filter(item => mistakeIds.includes(item.id));
    if (itemsToReview.length > 0) {
        setDisplayItems(shuffleArray(itemsToReview));
        setCurrentIndex(0);
        setMissedItems(new Set()); // Clear for the next *full* run
        setIsReviewing(true);
        setMistakesMadeCountDuringRun(0); // Reset count for the review session
        setIsAnswered(false);
    } else {
         console.warn("Mistake IDs found, but no matching items in allItems.");
         setError("Tidak dapat memulai review kesalahan.");
    }
     setIsLoading(false);
  };

  const loadNextItem = useCallback(() => {
    if (!displayItems || displayItems.length === 0) return;
    if (currentIndex < displayItems.length - 1) {
      setCurrentIndex(prevIndex => prevIndex + 1);
      // State resets (input, feedback, isAnswered) handled by useEffect [currentItem]
    } else {
      setCurrentIndex(displayItems.length);
    }
  }, [currentIndex, displayItems]);

  const checkAnswer = useCallback(() => {
    // Use isAnswered state to prevent re-checking
    if (!currentItem || isAnswered) return;
    setIsAnswered(true); // Mark as answered

    const correctAnswer = currentItem.targetWord ? currentItem.targetWord.toLowerCase() : '';
    const userAnswer = userInput.trim().toLowerCase();

    if (correctAnswer && userAnswer === correctAnswer) {
      setFeedback('Tepat! Jawaban Benar.');
      setIsCorrect(true);
      setShowNextButton(false);
      setTimeout(loadNextItem, 1500);
    } else {
      setFeedback(`Kurang Tepat. Jawaban: ${currentItem.targetWord || '[N/A]'}`);
      setIsCorrect(false);
      setShowNextButton(true);
      // Add to missed items only if NOT currently reviewing
      if (!isReviewing) {
            setMissedItems(prev => new Set(prev).add(currentItem.id));
            setMistakesMadeCountDuringRun(prev => prev + 1);
      }
    }
  }, [currentItem, isAnswered, isReviewing, userInput, loadNextItem]); // Add isAnswered, isReviewing

  const handleKeyPress = useCallback((event) => {
    // Use isAnswered state here too
    if (event.key === 'Enter' && !isAnswered && userInput.trim()) {
      checkAnswer();
    }
  }, [checkAnswer, isAnswered, userInput]); // Add isAnswered

  const isCompleted = currentIndex >= totalItemsInSet && totalItemsInSet > 0 && !isLoading;
  const finalMistakeCount = missedItems.size; // Use this for the completion screen button

  // --- Render Logic ---
  if (isLoading) {
       return <div className={styles.loading}>Memuat pertanyaan...</div>;
  }
  if (error) {
       return <div className={styles.error}>{error}</div>;
  }

  // --- Completion Screen ---
  if (isCompleted) {
      const completionText = isReviewing
        ? "✨ Sesi Review Selesai! ✨"
        : "✨ Latihan Imbuhan Selesai! ✨";
      // Use mistakesMadeCountDuringRun for the message after the *initial* run
      const mistakesToShow = isReviewing ? 0 : mistakesMadeCountDuringRun;

    return (
      <div className={styles.container}>
        <p className={styles.completionMessage}>{completionText}</p>
        {mistakesToShow > 0 && (
           <p className={styles.completionSubMessage}>
             Anda membuat {mistakesToShow} kesalahan pada putaran ini.
           </p>
        )}
        <div className={styles.completionActions}>
            {/* Use finalMistakeCount (from the Set) to decide if Review button shows */}
            {finalMistakeCount > 0 && (
                 <button className="secondaryButton" onClick={handleReviewMistakes}>
                    🔁 Ulangi Kesalahan ({finalMistakeCount})
                 </button>
            )}
            <button className="primaryButton" onClick={handleReshuffleAll}>
                 Ulangi Semua
            </button>
        </div>
      </div>
    );
  }

   // --- Active Question Screen ---
   if (!currentItem) {
     return <div className={styles.loading}>Memuat soal berikutnya...</div>;
   }

  return (
    <div className={styles.container}>
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
            // Use isAnswered state for conditional styling
            className={`${styles.input} ${isAnswered ? (isCorrect ? styles.inputCorrect : styles.inputIncorrect) : ''}`}
            placeholder="Jawaban Anda..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={handleKeyPress}
            // Use isAnswered state to disable after check, not just isCorrect
            disabled={isAnswered}
            autoCapitalize="none"
            aria-describedby="feedbackArea"
            aria-invalid={isAnswered && !isCorrect}
            />
        </div>

        {/* Use isAnswered state to show feedback */}
        {isAnswered && feedback && (
        <p id="feedbackArea" className={`${styles.feedback} ${isCorrect ? styles.correctFeedback : styles.incorrectFeedback}`} role="alert">
            {feedback}
        </p>
        )}

        <div className={styles.buttonRow}>
        {/* Use isAnswered state to show Check button */}
        {!isAnswered && (
            <button
            className="primaryButton"
            onClick={checkAnswer}
            disabled={!userInput.trim()}
            >
            Periksa Jawaban
            </button>
        )}
        {/* Use showNextButton state (set only on incorrect) */}
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
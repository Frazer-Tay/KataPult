// src/pages/ImbuhanPage.js
import React, { useState, useEffect, useCallback, useMemo } from 'react';
// V-- CRITICAL: Ensure this exact line is correct --V
import { imbuhanData } from '../data/imbuhan';
import styles from './ImbuhanPage.module.css';
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

const LOCAL_STORAGE_KEY = 'kataPultImbuhanState';

const ImbuhanPage = () => {
  const [allItems, setAllItems] = useState([]);
  const [displayItems, setDisplayItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [missedItems, setMissedItems] = useState(new Set()); // Persisted via localStorage indirectly
  const [isReviewing, setIsReviewing] = useState(false);

  const { currentItem, totalItemsInSet } = useMemo(() => {
    const item = (displayItems && displayItems.length > 0 && currentIndex < displayItems.length)
      ? displayItems[currentIndex]
      : null;
    return { currentItem: item, totalItemsInSet: displayItems?.length || 0 };
  }, [displayItems, currentIndex]);

  // Load initial state or saved state
  useEffect(() => {
    setIsLoading(true);
    setError(null);
    try {
      const filteredData = imbuhanData.filter(item => item.root && item.targetWord && item.targetDefinition);
      if (filteredData.length === 0) throw new Error("No valid Imbuhan data found.");
      setAllItems(filteredData);

      const savedStateJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedStateJSON) {
        const savedState = JSON.parse(savedStateJSON);
        if (savedState && typeof savedState.currentIndex === 'number' && Array.isArray(savedState.displayItems) && Array.isArray(savedState.missedItems)) {
             console.log("Resuming Imbuhan from saved state:", savedState);
             setDisplayItems(savedState.displayItems);
             setCurrentIndex(savedState.currentIndex);
             setMissedItems(new Set(savedState.missedItems)); // Restore Set from array
             setIsReviewing(savedState.isReviewing || false); // Restore review mode
             setIsAnswered(false); // Always start unanswered
        } else {
            console.warn("Invalid Imbuhan saved state found, starting fresh.");
            localStorage.removeItem(LOCAL_STORAGE_KEY);
            loadDataSet(filteredData, false); // Load fresh full set
        }
      } else {
        console.log("No saved Imbuhan state, starting fresh.");
        loadDataSet(filteredData, false); // Load fresh full set
      }
    } catch (err) {
      console.error("Error initializing Imbuhan page:", err);
      setError("Gagal memuat data Imbuhan.");
      setAllItems([]);
      setDisplayItems([]);
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Load on mount

  // Helper to load a specific dataset (full or review)
  const loadDataSet = useCallback((itemsToLoad, isReviewSession) => {
      setDisplayItems(shuffleArray([...itemsToLoad]));
      setCurrentIndex(0);
      setIsReviewing(isReviewSession);
      setIsAnswered(false);
      setFeedback('');
      setUserInput('');
      // Only reset missedItems when starting a FULL run
      if (!isReviewSession) {
          setMissedItems(new Set());
      }
      // Clear localStorage ONLY when starting a fresh FULL run
      if (!isReviewSession) {
         localStorage.removeItem(LOCAL_STORAGE_KEY);
         console.log("Starting fresh full Imbuhan run, cleared saved state.");
      }
  }, []); // Removed isReviewing from deps, pass as arg

  // Save state to localStorage
  useEffect(() => {
    if (isLoading || error || !displayItems || displayItems.length === 0) return;

    const isCompleted = currentIndex >= displayItems.length;
     if (isCompleted) {
        // Decide whether to clear storage on completion or keep missed items for review button
        // Let's keep it until "Ulangi Semua" is clicked
        // localStorage.removeItem(LOCAL_STORAGE_KEY);
        // console.log("Imbuhan session completed, cleared saved state.");
        return;
     }

    try {
      const stateToSave = {
        currentIndex: currentIndex,
        displayItems: displayItems,
        missedItems: Array.from(missedItems), // Convert Set to Array for storage
        isReviewing: isReviewing,
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stateToSave));
      // console.log("Imbuhan state saved:", stateToSave);
    } catch (err) {
      console.error("Failed to save Imbuhan state to localStorage:", err);
    }
  }, [currentIndex, displayItems, missedItems, isReviewing, isLoading, error]);

  // Start Over (All items)
  const handleReshuffleAll = () => {
    if (allItems.length === 0) return;
    loadDataSet(allItems, false); // Load all, mark as NOT reviewing
  };

  // Start Review (Missed items)
  const handleReviewMistakes = () => {
    const mistakeIds = Array.from(missedItems);
    if (mistakeIds.length === 0) return; // Nothing to review
    const itemsToReview = allItems.filter(item => mistakeIds.includes(item.id));
     if (itemsToReview.length > 0) {
        loadDataSet(itemsToReview, true); // Load review set, mark as reviewing
    } else {
         setError("Tidak dapat memulai review, data kesalahan tidak ditemukan.");
    }
  };

  // Go to Next Item
  const loadNextItem = useCallback(() => {
     if (!displayItems || displayItems.length === 0) return;
     if (currentIndex < displayItems.length) { // Use length directly
        setCurrentIndex(prevIndex => prevIndex + 1);
        // Reset answer state is handled by useEffect [currentItem]
    }
  }, [currentIndex, displayItems]);

  // Check Answer Logic
  const checkAnswer = useCallback(() => {
    if (!currentItem || isAnswered) return;
    setIsAnswered(true);

    const correctAnswer = currentItem.targetWord ? currentItem.targetWord.toLowerCase() : '';
    const userAnswer = userInput.trim().toLowerCase();

    if (correctAnswer && userAnswer === correctAnswer) {
      setFeedback('Tepat! Jawaban Benar. 👍');
      setIsCorrect(true);
      // If reviewing, we can potentially remove it from the *next* review list
      // For simplicity, we only build the review list from the *full* run's mistakes
      setTimeout(loadNextItem, 1500);
    } else {
      setFeedback(`Kurang Tepat. Jawaban: ${currentItem.targetWord || '[N/A]'}`);
      setIsCorrect(false);
      // Add to missed items only if NOT currently reviewing
      if (!isReviewing) {
            setMissedItems(prev => new Set(prev).add(currentItem.id));
      }
    }
  }, [currentItem, isAnswered, isReviewing, userInput, loadNextItem]); // Removed unnecessary deps

  const handleKeyPress = useCallback((event) => {
    if (event.key === 'Enter' && !isAnswered && userInput.trim()) {
      checkAnswer();
    } else if (event.key === 'Enter' && isAnswered && !isCorrect) {
        loadNextItem();
    }
  }, [checkAnswer, isAnswered, isCorrect, userInput, loadNextItem]);

  const isCompleted = currentIndex >= totalItemsInSet && totalItemsInSet > 0 && !isLoading;
  // Get the count of mistakes from the *persisted* set for the completion screen button
  const finalMistakeCount = missedItems.size;

  // --- Render Logic ---
  if (isLoading) {
       return <div className="loading">Memuat pertanyaan...</div>;
  }
  if (error) {
       return <div className="error">{error}</div>;
  }

  // --- Completion Screen ---
  if (isCompleted) {
      const completionText = isReviewing
        ? "✨ Sesi Review Imbuhan Selesai! ✨"
        : "✨ Latihan Imbuhan Selesai! ✨";

    return (
      <div className={styles.container}>
        <p className="completionMessage">{completionText}</p>
        {/* Show count only if mistakes were made during the last FULL run */}
        {!isReviewing && finalMistakeCount > 0 && (
           <p className="completionSubMessage">
             Anda membuat {finalMistakeCount} kesalahan pada putaran awal.
           </p>
        )}
        <div className={styles.completionActions}>
            {/* Show Review button only if mistakes exist and not currently reviewing */}
            {finalMistakeCount > 0 && !isReviewing && (
                 <button className="secondaryButton" onClick={handleReviewMistakes}>
                    🔁 Ulangi Kesalahan ({finalMistakeCount})
                 </button>
            )}
            <button className="primaryButton" onClick={handleReshuffleAll}>
                 {isReviewing ? 'Mulai Lagi Semua' : 'Ulangi Semua'}
            </button>
        </div>
      </div>
    );
  }

   // --- Active Question Screen ---
   if (!currentItem) {
     return <div className="loading">Tidak ada data imbuhan untuk ditampilkan.</div>;
   }

  return (
    <div className={styles.container}>
        <ProgressBar
            current={currentIndex + 1}
            total={totalItemsInSet}
            label={isReviewing ? "Review Kesalahan" : "Imbuhan"}
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
            placeholder="Ketik jawaban..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isAnswered}
            autoFocus={!isAnswered} // Autofocus on new question
            autoCapitalize="none"
            aria-describedby="feedbackArea"
            aria-invalid={isAnswered && !isCorrect}
            />
        </div>

        {isAnswered && feedback && (
        <div id="feedbackArea" className={`${styles.feedback} ${isCorrect ? styles.correctFeedback : styles.incorrectFeedback}`} role="alert">
            {feedback}
        </div>
        )}

        <div className={styles.buttonRow}>
        {!isAnswered && (
            <button
            className="primaryButton"
            onClick={checkAnswer}
            disabled={!userInput.trim()}
            >
            Periksa Jawaban
            </button>
        )}
        {/* Show Next button ONLY if answered and INCORRECT */}
        {isAnswered && !isCorrect && (
            <button className="nextButton" onClick={loadNextItem}>
            Lanjut <span className="arrowIcon">→</span>
            </button>
        )}
        </div>
    </div>
  );
};

export default ImbuhanPage;
// src/pages/ImbuhanPage.js
// Updated for sentence-based learning with hints
import React, { useState, useEffect, useCallback, useMemo } from 'react';
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

const LOCAL_STORAGE_KEY = 'kataPultImbuhanState_v3'; // New key for new structure

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
  const [missedItems, setMissedItems] = useState(new Set());
  const [isReviewing, setIsReviewing] = useState(false);

  const { currentItem, totalItemsInSet } = useMemo(() => {
    const item = (displayItems && displayItems.length > 0 && currentIndex < displayItems.length)
      ? displayItems[currentIndex]
      : null;
    return { currentItem: item, totalItemsInSet: displayItems?.length || 0 };
  }, [displayItems, currentIndex]);

  // Load Data function (handles loading/resetting state)
  const loadData = useCallback((itemsToLoad, isReviewSession) => {
      setIsLoading(true);
      setError(null);
      try {
          // Filter for items that have the necessary new fields
          const validItems = itemsToLoad.filter(item => item.root && item.targetWord && item.sentence && item.hint);

          if (!validItems || validItems.length === 0) {
              throw new Error("Tidak ada data Imbuhan yang valid (dengan kalimat/hint) untuk dimuat.");
          }
          setDisplayItems(shuffleArray([...validItems]));
          setCurrentIndex(0);
          setIsReviewing(isReviewSession);
          // Reset answer states
          setIsAnswered(false);
          setFeedback('');
          setUserInput('');
          setIsCorrect(false);
          // Reset mistakes only when starting a FULL run
          if (!isReviewSession) {
              setMissedItems(new Set());
              localStorage.removeItem(LOCAL_STORAGE_KEY);
              console.log("Starting fresh full Imbuhan run, cleared saved state.");
          }
      } catch (err) {
          console.error("Error loading/processing Imbuhan data:", err);
          setError("Gagal memuat data Imbuhan.");
          setDisplayItems([]);
      } finally {
          setIsLoading(false);
      }
  }, []); // Removed isReviewing dependency, passed as arg

  // Initial Load / Load from localStorage
  useEffect(() => {
    setIsLoading(true);
    setError(null);
    let initialLoadItems = [];
    try {
      // Basic check on imported data
      if (!imbuhanData || !Array.isArray(imbuhanData)) {
        throw new Error("Data Imbuhan dasar tidak valid.");
      }
      const filteredData = imbuhanData.filter(item => item.root && item.targetWord && item.sentence && item.hint);
      if (filteredData.length === 0) {
        throw new Error("Tidak ada data Imbuhan yang memenuhi format (root, targetWord, sentence, hint).");
      }
      setAllItems(filteredData); // Store valid items
      initialLoadItems = filteredData; // Use this for initial load if no saved state

      const savedStateJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedStateJSON) {
        const savedState = JSON.parse(savedStateJSON);
        // Validate saved state more thoroughly
        if (savedState && typeof savedState.currentIndex === 'number' &&
            Array.isArray(savedState.displayItemIds) && Array.isArray(savedState.missedItems))
        {
             console.log("Resuming Imbuhan from saved state:", savedState);
             const currentAllItemsMap = new Map(filteredData.map(item => [item.id, item]));
             // Reconstruct displayItems from IDs and current data source
             const validSavedDisplayItems = savedState.displayItemIds
                .map(id => currentAllItemsMap.get(id))
                .filter(Boolean); // Filter out any items not found in current source

             if(validSavedDisplayItems.length > 0 && savedState.currentIndex < validSavedDisplayItems.length) {
                setDisplayItems(validSavedDisplayItems); // Restore shuffled order
                setCurrentIndex(savedState.currentIndex);
                setMissedItems(new Set(savedState.missedItems)); // Restore Set
                setIsReviewing(savedState.isReviewing || false);
                setIsAnswered(false); // Always start new question unanswered
             } else {
                 console.warn("Invalid Imbuhan saved state (items/index mismatch), starting fresh.");
                 localStorage.removeItem(LOCAL_STORAGE_KEY);
                 loadData(initialLoadItems, false); // Use initial filtered data
             }
        } else {
            console.warn("Invalid Imbuhan saved state structure, starting fresh.");
            localStorage.removeItem(LOCAL_STORAGE_KEY);
            loadData(initialLoadItems, false);
        }
      } else {
        console.log("No saved Imbuhan state, starting fresh.");
        loadData(initialLoadItems, false);
      }
    } catch (err) {
      console.error("Error initializing Imbuhan page:", err);
      setError(err.message || "Gagal memuat data Imbuhan.");
      setAllItems([]);
      setDisplayItems([]);
    } finally {
      setIsLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Load on mount only


  // Save state to localStorage
  useEffect(() => {
    if (isLoading || error || !displayItems || displayItems.length === 0) return;
    const isCompleted = currentIndex >= displayItems.length;
     if (isCompleted) return; // Don't save completed state

    try {
      const stateToSave = {
        currentIndex: currentIndex,
        displayItemIds: displayItems.map(item => item.id), // Save only IDs
        missedItems: Array.from(missedItems),
        isReviewing: isReviewing,
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (err) {
      console.error("Failed to save Imbuhan state:", err);
    }
  }, [currentIndex, displayItems, missedItems, isReviewing, isLoading, error]);


  const handleReshuffleAll = () => {
    if (allItems.length === 0) return;
    setIsReviewing(false);
    loadData(allItems, false);
  };

  const handleReviewMistakes = () => {
    const mistakeIds = Array.from(missedItems);
    if (mistakeIds.length === 0) return;
    const itemsToReview = allItems.filter(item => mistakeIds.includes(item.id));
     if (itemsToReview.length > 0) {
        setIsReviewing(true);
        loadData(itemsToReview, true);
    } else {
         setError("Tidak dapat memulai review, data kesalahan tidak ditemukan.");
    }
  };

  const loadNextItem = useCallback(() => {
     if (!displayItems || displayItems.length === 0) return;
     if (currentIndex < displayItems.length) {
        setCurrentIndex(prevIndex => prevIndex + 1);
        // State resets happen in the useEffect watching currentItem
    }
  }, [currentIndex, displayItems]);


  const checkAnswer = useCallback(() => {
    if (!currentItem || isAnswered) return;
    setIsAnswered(true);

    const correctAnswer = currentItem.targetWord ? currentItem.targetWord.toLowerCase() : '';
    const userAnswer = userInput.trim().toLowerCase();

    if (correctAnswer && userAnswer === correctAnswer) {
      setFeedback('Tepat! Jawaban Benar. 👍');
      setIsCorrect(true);
      setTimeout(loadNextItem, 1500);
    } else {
      setFeedback(`Kurang Tepat. Jawaban: ${currentItem.targetWord || '[N/A]'}`);
      setIsCorrect(false);
      if (!isReviewing) {
            setMissedItems(prev => new Set(prev).add(currentItem.id));
      }
    }
  }, [currentItem, isAnswered, isReviewing, userInput, loadNextItem]); // Add isReviewing

  const handleKeyPress = useCallback((event) => {
    if (event.key === 'Enter' && !isAnswered && userInput.trim()) {
      checkAnswer();
    } else if (event.key === 'Enter' && isAnswered && !isCorrect) {
        loadNextItem();
    }
  }, [checkAnswer, isAnswered, isCorrect, userInput, loadNextItem]);

  const isCompleted = currentIndex >= totalItemsInSet && totalItemsInSet > 0 && !isLoading;
  const finalMistakeCount = missedItems.size;

  // Function to display sentence with blank filled (for feedback) - not used currently
  // const getCompletedSentence = () => {
  //   if (!currentItem || !currentItem.sentence) return "";
  //   return currentItem.sentence.replace(/___|\[____\]/g, `**${currentItem.targetWord}**`); // Simple markdown bold
  // };

  // Function to display sentence with blank placeholder
  const displaySentenceWithBlank = () => {
      if (!currentItem || !currentItem.sentence) return "[Kalimat tidak tersedia]";
      // Use a more distinct placeholder for styling if needed
      return currentItem.sentence.replace(/___|\[____\]/g, `<span class="${styles.blankPlaceholder}">[____]</span>`);
  };


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
      const mistakesToShow = finalMistakeCount;
    return (
      <div className={styles.container}>
        <p className="completionMessage">{completionText}</p>
        {!isReviewing && mistakesToShow > 0 && (
           <p className="completionSubMessage">Anda membuat {mistakesToShow} kesalahan pada putaran awal.</p>
        )}
        <div className={styles.completionActions}>
            {finalMistakeCount > 0 && !isReviewing && (
                 <button className="secondaryButton" onClick={handleReviewMistakes}>🔁 Ulangi Kesalahan ({finalMistakeCount})</button>
            )}
            <button className="primaryButton" onClick={handleReshuffleAll}>{isReviewing ? 'Mulai Lagi Semua' : 'Ulangi Semua'}</button>
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
            <p className={styles.label}>Lengkapi kalimat berikut:</p>
            {/* Display sentence with HTML for the blank span */}
            <p className={styles.sentence} dangerouslySetInnerHTML={{ __html: displaySentenceWithBlank() }} />

            <div className={styles.promptSection}>
                <div className={styles.promptItem}>
                    <p className={styles.promptLabel}>Kata Dasar (Root):</p>
                    <p className={styles.promptValue}>{currentItem.root || '[N/A]'}</p>
                </div>
                <div className={styles.promptItem}>
                    <p className={styles.promptLabel}>Hint (Arti Kata):</p>
                    <p className={styles.promptValue}>{currentItem.hint || '[N/A]'}</p>
                </div>
            </div>
        </div>

        <div className={styles.inputSection}>
            <label htmlFor="imbuhanInput" className={styles.instruction}>
                Ketik bentuk kata yang tepat untuk mengisi bagian kosong:
            </label>
            <input
            id="imbuhanInput"
            type="text"
            className={`${styles.input} ${isAnswered ? (isCorrect ? styles.inputCorrect : styles.inputIncorrect) : ''}`}
            placeholder="Jawaban Anda..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isAnswered}
            autoFocus={!isAnswered}
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
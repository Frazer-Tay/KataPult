// src/pages/ImbuhanPage.js
// Refined logic for input disabling/enabling
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

const LOCAL_STORAGE_KEY = 'kataPultImbuhanState_v3';

const ImbuhanPage = () => {
  const [allItems, setAllItems] = useState([]);
  const [displayItems, setDisplayItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isCorrect, setIsCorrect] = useState(false); // Tracks if the *last* answer was correct
  const [isAnswered, setIsAnswered] = useState(false); // Tracks if the *current* question has been answered
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [missedItems, setMissedItems] = useState(new Set());
  const [isReviewing, setIsReviewing] = useState(false);
  const [mistakesMadeCountDuringRun, setMistakesMadeCountDuringRun] = useState(0); // Renamed for clarity

  const { currentItem, totalItemsInSet } = useMemo(() => {
    const item = (displayItems && displayItems.length > 0 && currentIndex < displayItems.length)
      ? displayItems[currentIndex]
      : null;
    return { currentItem: item, totalItemsInSet: displayItems?.length || 0 };
  }, [displayItems, currentIndex]);

  // --- State Loading ---
  const loadData = useCallback((itemsToLoad, isReviewSession) => {
      setIsLoading(true);
      setError(null);
      try {
          const validItems = itemsToLoad.filter(item => item.root && item.targetWord && item.sentence && item.hint);
          if (!validItems || validItems.length === 0) {
              throw new Error("Tidak ada data Imbuhan yang valid (dengan kalimat/hint) untuk dimuat.");
          }
          setDisplayItems(shuffleArray([...validItems]));
          setCurrentIndex(0);
          setIsReviewing(isReviewSession);
          // Reset states crucial for starting a new set
          setIsAnswered(false);
          setIsCorrect(false); // Reset correctness state
          setFeedback('');
          setUserInput('');
          if (!isReviewSession) {
              setMissedItems(new Set());
              setMistakesMadeCountDuringRun(0);
              localStorage.removeItem(LOCAL_STORAGE_KEY);
              console.log("Starting fresh full Imbuhan run, cleared saved state.");
          }
      } catch (err) {
          console.error("Error loading Imbuhan data:", err);
          setError("Gagal memuat data Imbuhan.");
          setDisplayItems([]);
      } finally {
          setIsLoading(false);
      }
  }, []); // isReviewing should not be a dependency here

  // Initial Load / Load from localStorage
  useEffect(() => {
    setIsLoading(true);
    setError(null);
    let initialLoadItems = [];
    try {
      if (!imbuhanData || !Array.isArray(imbuhanData)) {
        throw new Error("Data Imbuhan dasar tidak valid.");
      }
      const filteredData = imbuhanData.filter(item => item.root && item.targetWord && item.sentence && item.hint);
      if (filteredData.length === 0) {
        throw new Error("Tidak ada data Imbuhan yang memenuhi format.");
      }
      setAllItems(filteredData);
      initialLoadItems = filteredData;

      const savedStateJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedStateJSON) {
        const savedState = JSON.parse(savedStateJSON);
        if (savedState && typeof savedState.currentIndex === 'number' && Array.isArray(savedState.displayItemIds) && Array.isArray(savedState.missedItems)) {
             const currentAllItemsMap = new Map(filteredData.map(item => [item.id, item]));
             const validSavedDisplayItems = savedState.displayItemIds.map(id => currentAllItemsMap.get(id)).filter(Boolean);
             if(validSavedDisplayItems.length > 0 && savedState.currentIndex < validSavedDisplayItems.length) {
                console.log("Resuming Imbuhan from saved state:", savedState);
                setDisplayItems(validSavedDisplayItems);
                setCurrentIndex(savedState.currentIndex);
                setMissedItems(new Set(savedState.missedItems));
                setIsReviewing(savedState.isReviewing || false);
                setIsAnswered(false); // Ensure starting unanswered
             } else {
                 console.warn("Invalid Imbuhan saved state (items/index mismatch), starting fresh.");
                 localStorage.removeItem(LOCAL_STORAGE_KEY);
                 loadData(initialLoadItems, false);
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

  // --- State Saving ---
  useEffect(() => {
    if (isLoading || error || !displayItems || displayItems.length === 0) return;
    const isCompleted = currentIndex >= displayItems.length;
     if (isCompleted) return; // Don't save completed state

    try {
      const stateToSave = {
        currentIndex: currentIndex,
        displayItemIds: displayItems.map(item => item.id),
        missedItems: Array.from(missedItems),
        isReviewing: isReviewing,
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (err) {
      console.error("Failed to save Imbuhan state:", err);
    }
  }, [currentIndex, displayItems, missedItems, isReviewing, isLoading, error]);

  // --- Event Handlers ---
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

  // Go to Next Item - simplified, resets happen via useEffect [currentItem]
  const loadNextItem = useCallback(() => {
     if (!displayItems || displayItems.length === 0) return;
     if (currentIndex < displayItems.length) {
        setCurrentIndex(prevIndex => prevIndex + 1);
    }
  }, [currentIndex, displayItems]);

  // Check Answer Logic
  const checkAnswer = useCallback(() => {
    if (!currentItem || isAnswered) return; // Check isAnswered state
    setIsAnswered(true); // Set answered state immediately

    const correctAnswer = currentItem.targetWord ? currentItem.targetWord.toLowerCase() : '';
    const userAnswer = userInput.trim().toLowerCase();
    const correct = correctAnswer && userAnswer === correctAnswer;

    setIsCorrect(correct); // Set correctness state

    if (correct) {
      setFeedback('Tepat! Jawaban Benar. 👍');
      setTimeout(loadNextItem, 1500);
    } else {
      setFeedback(`Kurang Tepat. Jawaban: ${currentItem.targetWord || '[N/A]'}`);
      if (!isReviewing) {
            setMissedItems(prev => new Set(prev).add(currentItem.id));
            // Don't update mistakesMadeCount here, use missedItems.size on completion
      }
    }
  }, [currentItem, isAnswered, isReviewing, userInput, loadNextItem]); // Added isAnswered


  // Handle Enter Key Press
  const handleKeyPress = useCallback((event) => {
    if (event.key === 'Enter') {
        if (!isAnswered && userInput.trim()) {
            checkAnswer(); // Check answer if Enter pressed and not yet answered
        } else if (isAnswered && !isCorrect) {
            loadNextItem(); // Go to next if Enter pressed after showing incorrect answer
        }
    }
  }, [checkAnswer, isAnswered, isCorrect, userInput, loadNextItem]);

  // Reset state when the current item changes *after* initial load
  useEffect(() => {
       if (!isLoading && currentItem) { // Check if we have a valid current item
         setUserInput('');
         setFeedback('');
         setIsCorrect(false);
         setIsAnswered(false); // CRITICAL: Reset answered state for the new item
       }
   }, [currentItem, isLoading]); // Depend only on currentItem and isLoading


  const isCompleted = currentIndex >= totalItemsInSet && totalItemsInSet > 0 && !isLoading;
  const finalMistakeCount = missedItems.size;

  // --- Render Logic ---
  if (isLoading) { return <div className="loading">Memuat pertanyaan...</div>; }
  if (error) { return <div className="error">{error}</div>; }

  // --- Completion Screen ---
  if (isCompleted) {
      const completionText = isReviewing ? "✨ Sesi Review Imbuhan Selesai! ✨" : "✨ Latihan Imbuhan Selesai! ✨";
      const mistakesToShow = finalMistakeCount; // Show mistakes based on the *persisted* set before review
    return (
      <div className={styles.container}>
        <p className="completionMessage">{completionText}</p>
        {/* Show mistake count ONLY after the initial run (not after review)
            AND only if mistakes were actually made */}
        {!isReviewing && mistakesToShow > 0 && (
           <p className="completionSubMessage">
             Anda membuat {mistakesToShow} kesalahan pada putaran awal.
           </p>
        )}
        <div className={styles.completionActions}>
            {/* Show Review button only if mistakes exist AND not currently reviewing */}
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
   if (!currentItem) { return <div className="loading">Memuat soal berikutnya...</div>; }

  // Function to display sentence with blank placeholder
  const displaySentenceWithBlank = () => {
      if (!currentItem || !currentItem.sentence) return "[Kalimat tidak tersedia]";
      return currentItem.sentence.replace(/___|\[____\]/g, `<span class="${styles.blankPlaceholder}">[____]</span>`);
  };


  return (
    <div className={styles.container}>
        <ProgressBar
            current={currentIndex + 1}
            total={totalItemsInSet}
            label={isReviewing ? "Review Kesalahan" : "Imbuhan"}
         />
        <div className={styles.card}>
            <p className={styles.label}>Lengkapi kalimat berikut:</p>
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
            // Use isAnswered state to determine if validation styles apply
            className={`${styles.input} ${isAnswered ? (isCorrect ? styles.inputCorrect : styles.inputIncorrect) : ''}`}
            placeholder="Jawaban Anda..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={handleKeyPress}
            // Disable input only AFTER an answer has been submitted
            disabled={isAnswered}
            autoFocus={!isAnswered} // Autofocus when not answered
            autoCapitalize="none"
            aria-describedby="feedbackArea"
            aria-invalid={isAnswered && !isCorrect}
            />
        </div>

        {/* Show feedback only AFTER answering */}
        {isAnswered && feedback && (
        <div id="feedbackArea" className={`${styles.feedback} ${isCorrect ? styles.correctFeedback : styles.incorrectFeedback}`} role="alert">
            {feedback}
        </div>
        )}

        <div className={styles.buttonRow}>
        {/* Show Check button only if NOT answered */}
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
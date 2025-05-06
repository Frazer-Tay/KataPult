// src/pages/ImbuhanPage.js
// Added keyboard navigation (Enter for Next on incorrect) and autofocus
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react'; // Import useRef
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
  const [isCorrect, setIsCorrect] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [missedItems, setMissedItems] = useState(new Set());
  const [isReviewing, setIsReviewing] = useState(false);
  const [mistakesMadeCountDuringRun, setMistakesMadeCountDuringRun] = useState(0);
  const inputRef = useRef(null); // Ref for the input field
  const pageRef = useRef(null); // Ref for the page container
  const nextButtonRef = useRef(null); // Ref for the next button

  const { currentItem, totalItemsInSet } = useMemo(() => {
    const item = (displayItems && displayItems.length > 0 && currentIndex < displayItems.length)
      ? displayItems[currentIndex]
      : null;
    return { currentItem: item, totalItemsInSet: displayItems?.length || 0 };
  }, [displayItems, currentIndex]);

  // Load Data function
  const loadData = useCallback((itemsToLoad, isReviewSession) => {
      // ... (loadData function remains the same as previous version)
       setIsLoading(true); setError(null);
      try {
          const validItems = itemsToLoad.filter(item => item.root && item.targetWord && item.sentence && item.hint);
          if (!validItems || validItems.length === 0) throw new Error("Tidak ada data Imbuhan valid.");
          setDisplayItems(shuffleArray([...validItems]));
          setCurrentIndex(0); setIsReviewing(isReviewSession);
          setIsAnswered(false); setFeedback(''); setUserInput(''); setIsCorrect(false);
          if (!isReviewSession) { setMissedItems(new Set()); setMistakesMadeCountDuringRun(0); localStorage.removeItem(LOCAL_STORAGE_KEY); }
      } catch (err) { console.error("Error loading Imbuhan:", err); setError(err.message); setDisplayItems([]); }
      finally { setIsLoading(false); }
  }, []);

  // Initial Load / Load from localStorage
  useEffect(() => {
    // ... (initial load logic remains the same as previous version)
    setIsLoading(true); setError(null); let initialLoadItems = [];
    try {
        if (!imbuhanData || !Array.isArray(imbuhanData)) throw new Error("Data Imbuhan dasar tidak valid.");
        const filteredData = imbuhanData.filter(item => item.root && item.targetWord && item.sentence && item.hint);
        if (filteredData.length === 0) throw new Error("Tidak ada data Imbuhan valid.");
        setAllItems(filteredData); initialLoadItems = filteredData;
        const savedStateJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (savedStateJSON) {
            const savedState = JSON.parse(savedStateJSON);
            if (savedState && typeof savedState.currentIndex === 'number' && Array.isArray(savedState.displayItemIds) && Array.isArray(savedState.missedItems)) {
                 const currentAllItemsMap = new Map(filteredData.map(item => [item.id, item]));
                 const validSavedDisplayItems = savedState.displayItemIds.map(id => currentAllItemsMap.get(id)).filter(Boolean);
                 if(validSavedDisplayItems.length > 0 && savedState.currentIndex < validSavedDisplayItems.length) {
                    setDisplayItems(validSavedDisplayItems); setCurrentIndex(savedState.currentIndex);
                    setMissedItems(new Set(savedState.missedItems)); setIsReviewing(savedState.isReviewing || false); setIsAnswered(false);
                 } else { localStorage.removeItem(LOCAL_STORAGE_KEY); loadData(initialLoadItems, false); }
            } else { localStorage.removeItem(LOCAL_STORAGE_KEY); loadData(initialLoadItems, false); }
        } else { loadData(initialLoadItems, false); }
    } catch (err) { console.error("Error init Imbuhan:", err); setError(err.message); setAllItems([]); setDisplayItems([]); }
    finally { setIsLoading(false); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Load on mount only

  // Save state to localStorage
  useEffect(() => {
    // ... (save state logic remains the same)
    if (isLoading || error || !displayItems || displayItems.length === 0) return;
    const isCompleted = currentIndex >= displayItems.length;
    if (isCompleted) return;
    try {
        const stateToSave = { currentIndex: currentIndex, displayItemIds: displayItems.map(item => item.id), missedItems: Array.from(missedItems), isReviewing: isReviewing, };
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (err) { console.error("Failed to save Imbuhan state:", err); }
  }, [currentIndex, displayItems, missedItems, isReviewing, isLoading, error]);

  // --- Focus Management & State Reset ---
  useEffect(() => {
       if (!isLoading && currentItem) {
         setUserInput('');
         setFeedback('');
         setIsCorrect(false);
         setIsAnswered(false);
         // Autofocus the input field when a new item loads and it's not loading/error
         // Use a small timeout to ensure the element is in the DOM
         setTimeout(() => inputRef.current?.focus(), 0);
       }
   }, [currentItem, isLoading]); // Depend only on currentItem and isLoading


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
         setError("Tidak dapat memulai review kesalahan.");
    }
  };

  const loadNextItem = useCallback(() => {
     if (!displayItems || displayItems.length === 0) return;
     if (currentIndex < displayItems.length) {
        setCurrentIndex(prevIndex => prevIndex + 1);
    }
  }, [currentIndex, displayItems]);

  const checkAnswer = useCallback(() => {
    if (!currentItem || isAnswered) return;
    setIsAnswered(true);
    const correctAnswer = currentItem.targetWord ? currentItem.targetWord.toLowerCase() : '';
    const userAnswer = userInput.trim().toLowerCase();
    const correct = correctAnswer && userAnswer === correctAnswer;
    setIsCorrect(correct);

    if (correct) {
      setFeedback('Tepat! Jawaban Benar. 👍');
      setTimeout(loadNextItem, 1500);
    } else {
      setFeedback(`Kurang Tepat. Jawaban: ${currentItem.targetWord || '[N/A]'}`);
      if (!isReviewing) {
            setMissedItems(prev => new Set(prev).add(currentItem.id));
      }
      // Focus the Next button after showing incorrect feedback
      setTimeout(() => nextButtonRef.current?.focus(), 0);
    }
  }, [currentItem, isAnswered, isReviewing, userInput, loadNextItem]);

  // --- Keyboard Navigation ---
  useEffect(() => {
    const handlePageKeyDown = (event) => {
        // Handle Enter on Next button when it's visible
        if (event.key === 'Enter' && isAnswered && !isCorrect) {
             // Check if the focused element is NOT the input field
             // (to avoid double-triggering if input still had focus somehow)
            if (document.activeElement !== inputRef.current) {
                loadNextItem();
            }
        }
        // Potentially add other global shortcuts here if needed
    };

    const pageElement = pageRef.current;
    if (pageElement) {
        pageElement.addEventListener('keydown', handlePageKeyDown);
    }
    return () => {
        if (pageElement) {
            pageElement.removeEventListener('keydown', handlePageKeyDown);
        }
    };
  }, [isAnswered, isCorrect, loadNextItem]); // Dependencies for the listener

  const handleInputKeyPress = useCallback((event) => {
    if (event.key === 'Enter' && !isAnswered && userInput.trim()) {
      checkAnswer();
    }
  }, [checkAnswer, isAnswered, userInput]);

  // --- Render Logic ---
  const isCompleted = currentIndex >= totalItemsInSet && totalItemsInSet > 0 && !isLoading;
  const finalMistakeCount = missedItems.size;

  if (isLoading) { return <div className="loading">Memuat pertanyaan...</div>; }
  if (error) { return <div className="error">{error}</div>; }

  if (isCompleted) {
      const completionText = isReviewing ? "✨ Sesi Review Imbuhan Selesai! ✨" : "✨ Latihan Imbuhan Selesai! ✨";
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

   if (!currentItem) { return <div className="loading">Tidak ada data imbuhan untuk ditampilkan.</div>; }

   const displaySentenceWithBlank = () => {
      if (!currentItem || !currentItem.sentence) return "[Kalimat tidak tersedia]";
      return currentItem.sentence.replace(/___|\[____\]/g, `<span class="${styles.blankPlaceholder}">[____]</span>`);
  };

  return (
    <div className={styles.container} ref={pageRef} tabIndex={-1}> {/* Add ref and tabIndex */}
        <ProgressBar current={currentIndex + 1} total={totalItemsInSet} label={isReviewing ? "Review Kesalahan" : "Imbuhan"} />
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
                ref={inputRef} // Add ref to input
                type="text"
                className={`${styles.input} ${isAnswered ? (isCorrect ? styles.inputCorrect : styles.inputIncorrect) : ''}`}
                placeholder="Jawaban Anda..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={handleInputKeyPress} // Use specific handler for input Enter
                disabled={isAnswered}
                // Removed autoFocus here, handled by useEffect [currentItem]
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
            <button className="primaryButton" onClick={checkAnswer} disabled={!userInput.trim()}>
                Periksa Jawaban
            </button>
        )}
        {isAnswered && !isCorrect && (
            // Add ref to next button
            <button className="nextButton" onClick={loadNextItem} ref={nextButtonRef}>
                Lanjut <span className="arrowIcon">→</span>
            </button>
        )}
        </div>
    </div>
  );
};

export default ImbuhanPage;
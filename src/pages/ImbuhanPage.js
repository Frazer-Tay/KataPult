// src/pages/ImbuhanPage.js
// Further refined keyboard handler and state management
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { imbuhanData } from '../data/imbuhan';
import styles from './ImbuhanPage.module.css';
import ProgressBar from '../components/ProgressBar';

const shuffleArray = (array) => { /* ... (same as before) ... */ if (!Array.isArray(array)) return []; let currentIndex = array.length, randomIndex; while (currentIndex !== 0) { randomIndex = Math.floor(Math.random() * currentIndex); currentIndex--; [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]; } return array; };
const LOCAL_STORAGE_KEY = 'kataPultImbuhanState_v3'; // Keep version consistent if data structure is same

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

  const inputRef = useRef(null);
  const pageRef = useRef(null);
  const nextButtonRef = useRef(null);

  // Refs for stable values in event listeners
  const isAnsweredRef = useRef(isAnswered);
  const isCorrectRef = useRef(isCorrect);
  const currentItemRef = useRef(null); // Ref for currentItem

  const { currentItem: currentItemFromMemo, totalItemsInSet } = useMemo(() => {
    const item = (displayItems && displayItems.length > 0 && currentIndex < displayItems.length)
      ? displayItems[currentIndex]
      : null;
    return { currentItem: item, totalItemsInSet: displayItems?.length || 0 };
  }, [displayItems, currentIndex]);

  // Update currentItemRef whenever currentItemFromMemo changes
  useEffect(() => {
    currentItemRef.current = currentItemFromMemo;
  }, [currentItemFromMemo]);


  const loadData = useCallback((itemsToLoad, isReviewSession) => {
      // ... (loadData logic from previous full script - ensure it resets all necessary states)
      setIsLoading(true); setError(null);
      try {
          const validItems = itemsToLoad.filter(item => item.root && item.targetWord && item.sentence && item.hint);
          if (!validItems || validItems.length === 0) throw new Error("Tidak ada data Imbuhan valid.");
          setDisplayItems(shuffleArray([...validItems])); setCurrentIndex(0); setIsReviewing(isReviewSession);
          setIsAnswered(false); setFeedback(''); setUserInput(''); setIsCorrect(false);
          if (!isReviewSession) { setMissedItems(new Set()); localStorage.removeItem(LOCAL_STORAGE_KEY); }
      } catch (err) { console.error("Error loading Imbuhan:", err); setError(err.message); setDisplayItems([]); }
      finally { setIsLoading(false); }
  }, []); // isReviewing is passed as arg, not a dep

  useEffect(() => {
    // ... (initial load from localStorage - same as previous)
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
  }, []);


  useEffect(() => {
    // ... (save state to localStorage - same as previous)
    if (isLoading || error || !displayItems || displayItems.length === 0) return;
    const isCompletedNow = currentIndex >= displayItems.length;
    if (isCompletedNow) { localStorage.removeItem(LOCAL_STORAGE_KEY); return; }
    try {
        const stateToSave = { currentIndex: currentIndex, displayItemIds: displayItems.map(item => item.id), missedItems: Array.from(missedItems), isReviewing: isReviewing, };
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (err) { console.error("Failed to save Imbuhan state:", err); }
  }, [currentIndex, displayItems, missedItems, isReviewing, isLoading, error]);

  useEffect(() => {
       if (!isLoading && currentItemFromMemo) { // Use currentItemFromMemo here
         setUserInput('');
         setFeedback('');
         setIsCorrect(false);
         setIsAnswered(false);
         setTimeout(() => inputRef.current?.focus(), 50); // Ensure input gets focus
       }
   }, [currentItemFromMemo, isLoading]);


  const handleReshuffleAll = () => { /* ... (same as previous) ... */ if (allItems.length === 0) return; setIsReviewing(false); loadData(allItems, false); };
  const handleReviewMistakes = () => { /* ... (same as previous) ... */ const mistakeIds = Array.from(missedItems); if (mistakeIds.length === 0) return; const itemsToReview = allItems.filter(item => mistakeIds.includes(item.id)); if (itemsToReview.length > 0) { setIsReviewing(true); loadData(itemsToReview, true); } else { setError("Tidak dapat memulai review kesalahan."); } };

  const loadNextItem = useCallback(() => {
     if (!displayItems || displayItems.length === 0) return;
     if (currentIndex < displayItems.length) {
        setCurrentIndex(prevIndex => prevIndex + 1);
    }
  }, [currentIndex, displayItems]);

  // --- Update Refs for Event Listeners ---
  useEffect(() => {
      isAnsweredRef.current = isAnswered;
      isCorrectRef.current = isCorrect;
  }, [isAnswered, isCorrect]);

  const checkAnswer = useCallback(() => {
    // Use currentItemRef.current for safety within this callback
    if (!currentItemRef.current || isAnsweredRef.current) return;
    setIsAnswered(true);

    const correctAnswer = currentItemRef.current.targetWord ? currentItemRef.current.targetWord.toLowerCase() : '';
    const userAnswer = userInput.trim().toLowerCase();
    const correct = correctAnswer && userAnswer === correctAnswer;
    setIsCorrect(correct);

    if (correct) {
      setFeedback('Tepat! Jawaban Benar. 👍');
      setTimeout(loadNextItem, 1500);
    } else {
      setFeedback(`Kurang Tepat. Jawaban: ${currentItemRef.current.targetWord || '[N/A]'}`);
      if (!isReviewing) {
            setMissedItems(prev => new Set(prev).add(currentItemRef.current.id));
            // No need to update mistakesMadeCountDuringRun here, use missedItems.size later
      }
      setTimeout(() => nextButtonRef.current?.focus(), 50);
    }
  }, [userInput, isReviewing, loadNextItem]); // Removed currentItem, isAnswered, isCorrect


  // --- Keyboard Navigation ---
  const handleInputKeyPress = useCallback((event) => {
    // Use isAnsweredRef.current here
    if (event.key === 'Enter' && !isAnsweredRef.current && userInput.trim()) {
      checkAnswer();
    }
  }, [checkAnswer, userInput]); // Removed isAnswered

  useEffect(() => {
    const handlePageKeyDown = (event) => {
        // Use refs here for the most up-to-date values
        const localIsCompleted = currentIndex >= (displayItems?.length || 0); // Recalculate based on current state
        if (localIsCompleted) return;

        if (event.key === 'Enter' && isAnsweredRef.current && !isCorrectRef.current) {
             if (document.activeElement !== inputRef.current && document.activeElement !== nextButtonRef.current) {
                 loadNextItem(); // If focus is not on input or next button
             } else if (document.activeElement === nextButtonRef.current) {
                 // If 'Next' button is focused, Enter should trigger it (default button behavior)
                 // No need for explicit loadNextItem() if button has onClick
             }
        }
    };
    const pageElement = pageRef.current;
    if (pageElement) { pageElement.addEventListener('keydown', handlePageKeyDown); }
    return () => { if (pageElement) pageElement.removeEventListener('keydown', handlePageKeyDown); };
  // Dependencies should be stable functions or values not changing rapidly
  }, [loadNextItem, currentIndex, displayItems]); // Key dependencies for the conditions


  const isCompleted = currentIndex >= totalItemsInSet && totalItemsInSet > 0 && !isLoading;
  const finalMistakeCount = missedItems.size; // This will be correct count from *previous full run* when review starts

  // --- Render Logic ---
  if (isLoading) { return <div className="loading">Memuat pertanyaan...</div>; }
  if (error) { return <div className="error">{error}</div>; }

  // --- Completion Screen ---
  if (isCompleted) {
      const completionText = isReviewing ? "✨ Sesi Review Imbuhan Selesai! ✨" : "✨ Latihan Imbuhan Selesai! ✨";
      // Use finalMistakeCount which reflects mistakes from the set that *led* to this completion screen
      const mistakesToShow = finalMistakeCount;
    return (
      <div className={styles.container}>
        <p className="completionMessage">{completionText}</p>
        {/* Show this message only if it was a full run and mistakes were made */}
        {!isReviewing && mistakesToShow > 0 && (
           <p className="completionSubMessage">Anda membuat {mistakesToShow} kesalahan pada putaran ini.</p>
        )}
        <div className={styles.completionActions}>
            {/* Show Review button only if mistakes exist AND we just finished a full run */}
            {mistakesToShow > 0 && !isReviewing && (
                 <button className="secondaryButton" onClick={handleReviewMistakes}>🔁 Ulangi Kesalahan ({mistakesToShow})</button>
            )}
            <button className="primaryButton" onClick={handleReshuffleAll}>
                 {isReviewing ? 'Mulai Lagi Semua' : 'Ulangi Semua'}
            </button>
        </div>
      </div>
    );
  }

   if (!currentItemFromMemo) { return <div className="loading">Memuat soal berikutnya...</div>; }

  const displaySentenceWithBlank = () => {
      if (!currentItemFromMemo || !currentItemFromMemo.sentence) return "[Kalimat tidak tersedia]";
      return currentItemFromMemo.sentence.replace(/___|\[____\]/g, `<span class="${styles.blankPlaceholder}">[____]</span>`);
  };

  return (
    <div className={styles.container} ref={pageRef} tabIndex={-1}>
        <ProgressBar current={currentIndex + 1} total={totalItemsInSet} label={isReviewing ? "Review Kesalahan" : "Imbuhan"} />
        <div className={styles.card}>
            <p className={styles.label}>Lengkapi kalimat berikut:</p>
            <p className={styles.sentence} dangerouslySetInnerHTML={{ __html: displaySentenceWithBlank() }} />
            <div className={styles.promptSection}>
                <div className={styles.promptItem}>
                    <p className={styles.promptLabel}>Kata Dasar (Root):</p>
                    <p className={styles.promptValue}>{currentItemFromMemo.root || '[N/A]'}</p>
                </div>
                <div className={styles.promptItem}>
                    <p className={styles.promptLabel}>Hint (Arti Kata):</p>
                    <p className={styles.promptValue}>{currentItemFromMemo.hint || '[N/A]'}</p>
                </div>
            </div>
        </div>
        <div className={styles.inputSection}>
            <label htmlFor="imbuhanInput" className={styles.instruction}>Ketik bentuk kata yang tepat:</label>
            <input
                id="imbuhanInput" ref={inputRef} type="text"
                className={`${styles.input} ${isAnswered ? (isCorrect ? styles.inputCorrect : styles.inputIncorrect) : ''}`}
                placeholder="Jawaban Anda..." value={userInput} onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={handleInputKeyPress} disabled={isAnswered}
                autoFocus={!isAnswered && !isLoading} // Autofocus more reliably
                autoCapitalize="none" aria-describedby="feedbackArea" aria-invalid={isAnswered && !isCorrect}
            />
        </div>
        {isAnswered && feedback && (
            <div id="feedbackArea" className={`${styles.feedback} ${isCorrect ? styles.correctFeedback : styles.incorrectFeedback}`} role="alert">{feedback}</div>
        )}
        <div className={styles.buttonRow}>
            {!isAnswered && (<button className="primaryButton" onClick={checkAnswer} disabled={!userInput.trim()}>Periksa Jawaban</button> )}
            {isAnswered && !isCorrect && ( <button className="nextButton" onClick={loadNextItem} ref={nextButtonRef}>Lanjut <span className="arrowIcon">→</span></button> )}
        </div>
    </div>
  );
};
export default ImbuhanPage;
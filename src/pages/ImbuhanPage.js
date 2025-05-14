// src/pages/ImbuhanPage.js
// ADDED: Previous/Next navigation buttons for practice revision
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { imbuhanData } from '../data/imbuhan';
import styles from './ImbuhanPage.module.css';
import ProgressBar from '../components/ProgressBar';

const shuffleArray = (array) => { if (!Array.isArray(array)) return []; let currentIndex = array.length, randomIndex; while (currentIndex !== 0) { randomIndex = Math.floor(Math.random() * currentIndex); currentIndex--; [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]; } return array; };
const LOCAL_STORAGE_KEY = 'kataPultImbuhanState_v4';
const getRandomThreshold = () => Math.floor(Math.random() * 4) + 2;

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
  const [missedItemsMaster, setMissedItemsMaster] = useState(new Set());
  const [isReviewingMistakes, setIsReviewingMistakes] = useState(false);
  const [retestQueue, setRetestQueue] = useState([]);
  const [correctStreak, setCorrectStreak] = useState(0);
  const [retestThreshold, setRetestThreshold] = useState(getRandomThreshold());
  const [showHint, setShowHint] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const inputRef = useRef(null);
  const pageRef = useRef(null);
  // No longer need nextButtonRef for auto-focus after incorrect if we have persistent nav
  const isCompletedRef = useRef(false);
  const currentItemRef = useRef(null);


  const { currentItem: currentItemFromMemo, totalItemsInSet } = useMemo(() => {
    const item = (displayItems && displayItems.length > 0 && currentIndex >= 0 && currentIndex < displayItems.length)
      ? displayItems[currentIndex]
      : null;
    currentItemRef.current = item; // Update ref for handlers
    return { currentItem: item, totalItemsInSet: displayItems?.length || 0 };
  }, [displayItems, currentIndex]);

  const resetItemState = useCallback(() => {
    setUserInput('');
    setFeedback('');
    setIsCorrect(false);
    setIsAnswered(false);
    setShowHint(false);
    setShowExplanation(false);
    if (inputRef.current) {
        inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (!isLoading && currentItemFromMemo) {
      // When currentItem changes (due to next/prev), reset its interaction state
      resetItemState();
    } else if (!isLoading && !currentItemFromMemo && totalItemsInSet > 0 && currentIndex >= totalItemsInSet) {
      // This means we've navigated past the end, effectively completing the set
      isCompletedRef.current = true;
      // Force a re-render to show completion screen if not already shown
      // This can happen if loadNextItem was called but didn't immediately trigger a re-render
      // that would evaluate the `isCompleted` variable for the return statement.
      setCurrentIndex(totalItemsInSet); // Or trigger a state update that causes re-render
    }
  }, [currentItemFromMemo, isLoading, resetItemState, totalItemsInSet, currentIndex]);


  const loadData = useCallback((itemsToLoad, isReviewSession) => {
      setIsLoading(true); setError(null);
      try {
          const validItems = itemsToLoad.filter(item => item.root && item.targetWord && item.sentence && item.hint);
          if (!validItems || validItems.length === 0) {
              throw new Error("Tidak ada data Imbuhan yang valid untuk dimuat.");
          }
          setDisplayItems(shuffleArray([...validItems]));
          setCurrentIndex(0);
          setIsReviewingMistakes(isReviewSession);
          resetItemState(); // Reset for the first item
          isCompletedRef.current = false;

          if (!isReviewSession) {
              setMissedItemsMaster(new Set());
              setRetestQueue([]);
              setCorrectStreak(0);
              setRetestThreshold(getRandomThreshold());
              localStorage.removeItem(LOCAL_STORAGE_KEY);
          }
      } catch (err) { console.error("Error loading Imbuhan data:", err); setError(err.message || "Gagal memuat data Imbuhan."); setDisplayItems([]); }
      finally { setIsLoading(false); }
  }, [resetItemState]);

  useEffect(() => {
    setIsLoading(true); setError(null);
    try {
      const filteredData = imbuhanData.filter(item => item.root && item.targetWord && item.sentence && item.hint);
      if (filteredData.length === 0) throw new Error("No valid Imbuhan data in source.");
      setAllItems(filteredData);
      const savedStateJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedStateJSON) {
        const savedState = JSON.parse(savedStateJSON);
        if (savedState && typeof savedState.currentIndex === 'number' &&
            Array.isArray(savedState.displayItemIds) && Array.isArray(savedState.missedItemsMaster) &&
            Array.isArray(savedState.retestQueue) && typeof savedState.correctStreak === 'number') {
            const currentAllItemsMap = new Map(filteredData.map(item => [item.id, item]));
            const validSavedDisplayItems = savedState.displayItemIds.map(id => currentAllItemsMap.get(id)).filter(Boolean);
            if(validSavedDisplayItems.length > 0 && savedState.currentIndex < validSavedDisplayItems.length) {
                setDisplayItems(validSavedDisplayItems);
                setCurrentIndex(savedState.currentIndex);
                setMissedItemsMaster(new Set(savedState.missedItemsMaster));
                setIsReviewingMistakes(savedState.isReviewingMistakes || false);
                setRetestQueue(savedState.retestQueue);
                setCorrectStreak(savedState.correctStreak);
                setRetestThreshold(savedState.retestThreshold || getRandomThreshold());
                // State for current item (userInput, feedback etc.) will be reset by currentItemFromMemo effect
            } else { loadData(filteredData, false); }
        } else { loadData(filteredData, false); }
      } else { loadData(filteredData, false); }
    } catch (err) { console.error("Error initializing Imbuhan page:", err); setError(err.message || "Gagal memuat data Imbuhan."); setAllItems([]); setDisplayItems([]); }
    finally { setIsLoading(false); }
  }, [loadData]); // loadData is now a dependency

  useEffect(() => {
    if (isLoading || error || !displayItems || displayItems.length === 0) return;
    const isCompletedNow = currentIndex >= displayItems.length;
    isCompletedRef.current = isCompletedNow;
    if (isCompletedNow) {
        if (localStorage.getItem(LOCAL_STORAGE_KEY)) { // Clear on actual completion only
            localStorage.removeItem(LOCAL_STORAGE_KEY);
        }
        return;
    }
    try {
      const stateToSave = {
        currentIndex: currentIndex, displayItemIds: displayItems.map(item => item.id),
        missedItemsMaster: Array.from(missedItemsMaster), isReviewingMistakes: isReviewingMistakes,
        retestQueue: retestQueue, correctStreak: correctStreak, retestThreshold: retestThreshold
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (err) { console.error("Failed to save Imbuhan state:", err); }
  }, [currentIndex, displayItems, missedItemsMaster, isReviewingMistakes, retestQueue, correctStreak, retestThreshold, isLoading, error]);

  const handleReshuffleAll = () => { if (allItems.length > 0) loadData(allItems, false); };
  const handleReviewMistakes = () => {
    const mistakeIds = Array.from(missedItemsMaster);
    if (mistakeIds.length === 0) {
        setFeedback("Tidak ada kesalahan untuk di-review."); // Give some feedback
        return;
    }
    const itemsToReview = allItems.filter(item => mistakeIds.includes(item.id));
    if (itemsToReview.length > 0) { loadData(itemsToReview, true); }
    else { setError("Tidak ada kesalahan untuk di-review, atau data item salah tidak ditemukan."); }
  };

  const advanceItem = useCallback((direction) => {
    if (!displayItems || displayItems.length === 0) return;

    let nextIndex = currentIndex;
    if (direction === 'next') {
        // Spaced Repetition Teaser Logic for "next"
        if (!isReviewingMistakes && retestQueue.length > 0 && correctStreak >= retestThreshold && currentIndex < displayItems.length -1) {
            const retestItemId = retestQueue[0];
            const retestItem = allItems.find(item => item.id === retestItemId);
            if (retestItem) {
                let nextDisplayItems = displayItems.filter(item => item.id !== retestItemId);
                const currentActualIndexInDisplay = nextDisplayItems.findIndex(item => item.id === currentItemRef.current?.id);
                if (currentActualIndexInDisplay !== -1 && currentActualIndexInDisplay < nextDisplayItems.length) {
                    nextDisplayItems.splice(currentActualIndexInDisplay + 1, 0, retestItem);
                } else {
                    nextDisplayItems.push(retestItem);
                }
                setDisplayItems(nextDisplayItems);
                nextIndex = nextDisplayItems.findIndex(item => item.id === retestItemId);
                setRetestQueue(prev => prev.slice(1));
                setCorrectStreak(0);
                setRetestThreshold(getRandomThreshold());
            } else {
                setRetestQueue(prev => prev.slice(1)); // Item not found, remove from queue
                nextIndex = Math.min(currentIndex + 1, displayItems.length); // Normal next
            }
        } else {
            nextIndex = Math.min(currentIndex + 1, displayItems.length); // Normal next, cap at length
        }
    } else if (direction === 'previous') {
        nextIndex = Math.max(currentIndex - 1, 0); // Normal previous, cap at 0
    }
    setCurrentIndex(nextIndex);
  }, [currentIndex, displayItems, allItems, retestQueue, correctStreak, isReviewingMistakes, retestThreshold]);

  const checkAnswer = useCallback(() => {
    if (!currentItemRef.current || isAnswered) return; // Use direct state here
    setIsAnswered(true);
    setShowExplanation(true);
    const correctAnswer = currentItemRef.current.targetWord ? currentItemRef.current.targetWord.toLowerCase() : '';
    const userAnswer = userInput.trim().toLowerCase();
    const correct = correctAnswer && userAnswer === correctAnswer;
    setIsCorrect(correct);

    if (correct) {
      setFeedback('Tepat! Jawaban Benar. 👍');
      setCorrectStreak(prev => prev + 1);
      if (retestQueue.includes(currentItemRef.current.id)) {
          setRetestQueue(prevQ => prevQ.filter(id => id !== currentItemRef.current.id));
      }
      // No automatic advance; user clicks Next
    } else {
      setFeedback(`Kurang Tepat. Jawaban yang benar: ${currentItemRef.current.targetWord || '[N/A]'}`);
      setCorrectStreak(0);
      setRetestThreshold(getRandomThreshold());
      if (!isReviewingMistakes) {
        setMissedItemsMaster(prev => new Set(prev).add(currentItemRef.current.id));
        if (!retestQueue.includes(currentItemRef.current.id)) {
            setRetestQueue(prevQ => [...prevQ, currentItemRef.current.id]);
        }
      }
    }
  }, [userInput, isReviewingMistakes, retestQueue, isAnswered]); // isAnswered in deps for re-check

  const handleInputKeyPress = useCallback((event) => {
    if (event.key === 'Enter' && !isAnswered && userInput.trim()) { // Use direct state
        checkAnswer();
    }
  }, [checkAnswer, userInput, isAnswered]);

  useEffect(() => {
    const handlePageKeyDown = (event) => {
        if (isCompletedRef.current) return;

        if (event.key === 'ArrowRight') {
            advanceItem('next');
            event.preventDefault();
        } else if (event.key === 'ArrowLeft') {
            advanceItem('previous');
            event.preventDefault();
        } else if (event.key === 'Enter' && isAnswered) {
            // If enter is pressed AFTER an answer, and not on an input/button, advance
            if (document.activeElement !== inputRef.current &&
                document.activeElement?.tagName !== 'BUTTON') {
                advanceItem('next');
                event.preventDefault();
            }
        }
    };
    const pageElement = pageRef.current;
    if (pageElement) { pageElement.addEventListener('keydown', handlePageKeyDown); }
    return () => { if (pageElement) { pageElement.removeEventListener('keydown', handlePageKeyDown); }};
  }, [advanceItem, isAnswered]); // isAnswered for the Enter key logic

  const toggleHint = () => { setShowHint(prev => !prev); };

  const isCompleted = currentIndex >= totalItemsInSet && totalItemsInSet > 0 && !isLoading;
  const finalMistakeCountForDisplay = missedItemsMaster.size;

  if (isLoading) { return <div className="loading">Memuat pertanyaan...</div>; }
  if (error) { return <div className="error">{error}</div>; }

  if (isCompleted) {
    const completionText = isReviewingMistakes ? "✨ Sesi Review Imbuhan Selesai! ✨" : "✨ Latihan Imbuhan Selesai! ✨";
    const mistakesToShow = finalMistakeCountForDisplay;
    return (
      <div className={styles.container}>
        <p className="completionMessage">{completionText}</p>
        {!isReviewingMistakes && mistakesToShow > 0 && (
          <p className="completionSubMessage">
            Anda memiliki {mistakesToShow} item yang salah pada putaran awal.
          </p>
        )}
        <div className={styles.completionActions}>
          {finalMistakeCountForDisplay > 0 && !isReviewingMistakes && (
            <button className="secondaryButton" onClick={handleReviewMistakes}>
              🔁 Ulangi Kesalahan ({finalMistakeCountForDisplay})
            </button>
          )}
          <button className="primaryButton" onClick={handleReshuffleAll}>
            {isReviewingMistakes ? 'Mulai Lagi Semua' : 'Ulangi Semua'}
          </button>
        </div>
      </div>
    );
  }

  if (!currentItemFromMemo) { return <div className="loading">Memuat data imbuhan... Coba segarkan halaman jika berlanjut.</div>; }
  const displaySentenceWithBlank = () => { if (!currentItemFromMemo || !currentItemFromMemo.sentence) return "[Kalimat tidak tersedia]"; return currentItemFromMemo.sentence.replace(/___|\[____\]|\[_____\]|\[______\]/g, `<span class="${styles.blankPlaceholder}">[____]</span>`); };

  return (
    <div className={styles.container} ref={pageRef} tabIndex={-1}>
      <ProgressBar current={currentIndex + 1} total={totalItemsInSet} label={isReviewingMistakes ? "Review Kesalahan Imbuhan" : "Imbuhan"} />
      <div className={styles.card}>
        <p className={styles.label}>Lengkapi kalimat berikut:</p>
        <p className={styles.sentence} dangerouslySetInnerHTML={{ __html: displaySentenceWithBlank() }} />
        <div className={styles.promptSection}>
          <div className={styles.promptItem}><p className={styles.promptLabel}>Kata Dasar (Root):</p><p className={styles.promptValue}>{currentItemFromMemo.root || '[N/A]'}</p></div>
          <div className={styles.promptItem}>
            {!showHint && !isAnswered ? (
              <button onClick={toggleHint} className={styles.hintButton}> 💡 Tampilkan Hint </button>
            ) : (
              <>
                <p className={styles.promptLabel}>Hint (Arti Kata):</p>
                <p className={styles.promptValue}>{currentItemFromMemo.hint || '[N/A]'}</p>
                {isAnswered && !showHint && <button onClick={toggleHint} className={styles.hintButton} style={{marginTop: '5px'}}>Tampilkan Hint Lagi</button>}
              </>
            )}
          </div>
        </div>
      </div>
      <div className={styles.inputSection}>
        <label htmlFor="imbuhanInput" className={styles.instruction}>Ketik bentuk kata yang tepat:</label>
        <input
          id="imbuhanInput" ref={inputRef} type="text"
          className={`${styles.input} ${isAnswered ? (isCorrect ? styles.inputCorrect : styles.inputIncorrect) : ''}`}
          placeholder="Jawaban Anda..." value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleInputKeyPress} // Changed from onKeyPress
          disabled={isAnswered}
          autoCapitalize="none"
          aria-describedby="feedbackArea explanationArea"
          aria-invalid={isAnswered && !isCorrect}
        />
      </div>
      {isAnswered && feedback && (<div id="feedbackArea" className={`${styles.feedback} ${isCorrect ? styles.correctFeedback : styles.incorrectFeedback}`} role="alert">{feedback}</div>)}
      {isAnswered && showExplanation && currentItemFromMemo.explanation && (
        <div id="explanationArea" className={styles.explanationBox} role="note">
          <p className={styles.explanationTitle}>Penjelasan:</p>
          <p>{currentItemFromMemo.explanation}</p>
        </div>
      )}
      <div className={styles.buttonRow}>
        <button
            className="secondaryButton"
            onClick={() => advanceItem('previous')}
            disabled={currentIndex === 0 || isLoading}
            aria-label="Pertanyaan Sebelumnya"
        >
            <span className="arrowIcon">←</span> Sebelumnya
        </button>
        {!isAnswered && (
          <button className="primaryButton" onClick={checkAnswer} disabled={!userInput.trim()}>
            Periksa
          </button>
        )}
        {isAnswered && ( // Show "Lanjut" only after an answer to prevent skipping unanswered questions easily
            <button
                className="nextButton"
                onClick={() => advanceItem('next')}
                disabled={isLoading || (currentIndex >= totalItemsInSet -1 && isCompletedRef.current)} // Disable if at the very end
                aria-label="Pertanyaan Berikutnya"
            >
                {currentIndex >= totalItemsInSet - 1 ? "Lihat Hasil" : "Lanjut"} <span className="arrowIcon">→</span>
            </button>
        )}
      </div>
    </div>
  );
};
export default ImbuhanPage;
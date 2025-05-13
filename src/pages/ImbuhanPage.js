// src/pages/ImbuhanPage.js
// Added Spaced Repetition Teaser with randomized threshold
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { imbuhanData } from '../data/imbuhan';
import styles from './ImbuhanPage.module.css';
import ProgressBar from '../components/ProgressBar';

const shuffleArray = (array) => { if (!Array.isArray(array)) return []; let currentIndex = array.length, randomIndex; while (currentIndex !== 0) { randomIndex = Math.floor(Math.random() * currentIndex); currentIndex--; [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]; } return array; };

const LOCAL_STORAGE_KEY = 'kataPultImbuhanState_v4'; // Incremented version for new state

const getRandomThreshold = () => Math.floor(Math.random() * 4) + 2; // Random int between 2 and 5

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
  const [missedItemsMaster, setMissedItemsMaster] = useState(new Set()); // All unique mistakes for final review
  const [isReviewingMistakes, setIsReviewingMistakes] = useState(false); // Final review mode
  const [retestQueue, setRetestQueue] = useState([]); // IDs for in-session re-test
  const [correctStreak, setCorrectStreak] = useState(0);
  const [retestThreshold, setRetestThreshold] = useState(getRandomThreshold());
  const [showHint, setShowHint] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const inputRef = useRef(null);
  const pageRef = useRef(null);
  const nextButtonRef = useRef(null);
  const isAnsweredRef = useRef(isAnswered); // Still useful for event handlers
  const isCorrectRef = useRef(isCorrect);   // Still useful for event handlers
  const currentItemRef = useRef(null);      // Still useful for event handlers
  const isCompletedRef = useRef(false);

  const { currentItem: currentItemFromMemo, totalItemsInSet } = useMemo(() => {
    const item = (displayItems && displayItems.length > 0 && currentIndex < displayItems.length)
      ? displayItems[currentIndex]
      : null;
    currentItemRef.current = item;
    return { currentItem: item, totalItemsInSet: displayItems?.length || 0 };
  }, [displayItems, currentIndex]);


  const loadData = useCallback((itemsToLoad, isReviewSession) => {
      setIsLoading(true); setError(null);
      try {
          const validItems = itemsToLoad.filter(item => item.root && item.targetWord && item.sentence && item.hint); // Explanation is optional here
          if (!validItems || validItems.length === 0) {
              throw new Error("Tidak ada data Imbuhan yang valid untuk dimuat.");
          }
          setDisplayItems(shuffleArray([...validItems]));
          setCurrentIndex(0);
          setIsReviewingMistakes(isReviewSession);
          setIsAnswered(false); setFeedback(''); setUserInput(''); setIsCorrect(false);
          setShowHint(false); setShowExplanation(false);
          isCompletedRef.current = false;

          if (!isReviewSession) {
              setMissedItemsMaster(new Set());
              setRetestQueue([]);
              setCorrectStreak(0);
              setRetestThreshold(getRandomThreshold()); // Set initial random threshold for a full run
              localStorage.removeItem(LOCAL_STORAGE_KEY);
              console.log("Starting fresh full Imbuhan run, cleared saved state.");
          }
      } catch (err) {
          console.error("Error loading Imbuhan data:", err);
          setError(err.message || "Gagal memuat data Imbuhan.");
          setDisplayItems([]);
      } finally {
          setIsLoading(false);
      }
  }, []); // isReviewing is passed as an argument, not a direct dependency for this core loading logic

  useEffect(() => {
    setIsLoading(true); setError(null);
    try {
      const filteredData = imbuhanData.filter(item => item.root && item.targetWord && item.sentence && item.hint); // Explanation optional
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
                console.log("Resuming Imbuhan from saved state:", savedState);
                setDisplayItems(validSavedDisplayItems);
                setCurrentIndex(savedState.currentIndex);
                setMissedItemsMaster(new Set(savedState.missedItemsMaster));
                setIsReviewingMistakes(savedState.isReviewingMistakes || false);
                setRetestQueue(savedState.retestQueue);
                setCorrectStreak(savedState.correctStreak);
                setRetestThreshold(savedState.retestThreshold || getRandomThreshold());
                setIsAnswered(false); setShowHint(false); setShowExplanation(false);
            } else {
                 console.warn("Invalid Imbuhan saved state (items/index), starting fresh.");
                 localStorage.removeItem(LOCAL_STORAGE_KEY); loadData(filteredData, false);
            }
        } else {
            console.warn("Invalid Imbuhan saved state structure, starting fresh.");
            localStorage.removeItem(LOCAL_STORAGE_KEY); loadData(filteredData, false);
        }
      } else {
        console.log("No saved Imbuhan state, starting fresh.");
        loadData(filteredData, false);
      }
    } catch (err) {
      console.error("Error initializing Imbuhan page:", err);
      setError(err.message || "Gagal memuat data Imbuhan.");
      setAllItems([]); setDisplayItems([]);
    } finally { setIsLoading(false); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Load on mount only

  useEffect(() => {
    if (isLoading || error || !displayItems || displayItems.length === 0) return;
    const isCompletedNow = currentIndex >= displayItems.length;
    isCompletedRef.current = isCompletedNow;
    if (isCompletedNow) return; // Don't save if already completed current set

    try {
      const stateToSave = {
        currentIndex: currentIndex, displayItemIds: displayItems.map(item => item.id),
        missedItemsMaster: Array.from(missedItemsMaster), isReviewingMistakes: isReviewingMistakes,
        retestQueue: retestQueue, correctStreak: correctStreak, retestThreshold: retestThreshold
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (err) { console.error("Failed to save Imbuhan state:", err); }
  }, [currentIndex, displayItems, missedItemsMaster, isReviewingMistakes, retestQueue, correctStreak, retestThreshold, isLoading, error]);

  useEffect(() => {
       if (!isLoading && currentItemRef.current) {
         setUserInput(''); setFeedback(''); setIsCorrect(false); setIsAnswered(false);
         setShowHint(false); setShowExplanation(false);
         setTimeout(() => inputRef.current?.focus(), 50);
       }
   }, [currentItemRef.current, isLoading]); // Depend on currentItemRef.current which is updated from useMemo

  const handleReshuffleAll = () => { if (allItems.length > 0) loadData(allItems, false); };
  const handleReviewMistakes = () => {
    const mistakeIds = Array.from(missedItemsMaster);
    if (mistakeIds.length === 0) return;
    const itemsToReview = allItems.filter(item => mistakeIds.includes(item.id));
    if (itemsToReview.length > 0) { loadData(itemsToReview, true); }
    else { setError("Tidak ada kesalahan untuk di-review."); }
  };

  const loadNextItem = useCallback(() => {
    if (!displayItems || displayItems.length === 0) return;

    // Spaced Repetition Teaser Logic:
    // Check retestQueue only if NOT in final review mode and streak is met
    if (!isReviewingMistakes && retestQueue.length > 0 && correctStreak >= retestThreshold) {
        const retestItemId = retestQueue[0];
        const retestItem = allItems.find(item => item.id === retestItemId);

        if (retestItem) {
            console.log("Imbuhan: Retesting item:", retestItem.root);
            // Strategy: Find the current item in displayItems. If found and not the last, splice the retestItem after it.
            // Otherwise, just append retestItem. This avoids direct index manipulation which can be tricky.
            // Remove the retestItem from its original position in displayItems if it exists there to avoid duplicates.
            let nextDisplayItems = displayItems.filter(item => item.id !== retestItemId);
            const currentActualIndexInDisplay = nextDisplayItems.findIndex(item => item.id === currentItemRef.current?.id);

            if (currentActualIndexInDisplay !== -1 && currentActualIndexInDisplay < nextDisplayItems.length) {
                 nextDisplayItems.splice(currentActualIndexInDisplay + 1, 0, retestItem);
            } else {
                // If currentItem not found or is the last, append retestItem
                nextDisplayItems.push(retestItem);
            }
            setDisplayItems(nextDisplayItems);
            // Set currentIndex to the new position of the retest item
            const newIndexOfRetestItem = nextDisplayItems.findIndex(item => item.id === retestItemId);
            setCurrentIndex(newIndexOfRetestItem !== -1 ? newIndexOfRetestItem : currentIndex + 1); // Fallback

            setRetestQueue(prev => prev.slice(1)); // Remove from retest queue
            setCorrectStreak(0); // Reset streak after showing a retest item
            setRetestThreshold(getRandomThreshold()); // Get new threshold for next retest
            return; // Exit early as we've handled the next item by re-ordering displayItems
        } else {
            // Item not found in allItems, remove from queue (shouldn't happen if data is consistent)
            setRetestQueue(prev => prev.slice(1));
        }
    }

    // Normal progression if no re-test
    if (currentIndex < displayItems.length) {
        setCurrentIndex(prevIndex => prevIndex + 1);
    }
  }, [currentIndex, displayItems, allItems, retestQueue, correctStreak, isReviewingMistakes, retestThreshold]); // Add retestThreshold

  useEffect(() => { isAnsweredRef.current = isAnswered; isCorrectRef.current = isCorrect; }, [isAnswered, isCorrect]);

  const checkAnswer = useCallback(() => {
    if (!currentItemRef.current || isAnsweredRef.current) return;
    setIsAnswered(true);
    setShowExplanation(true);
    const correctAnswer = currentItemRef.current.targetWord ? currentItemRef.current.targetWord.toLowerCase() : '';
    const userAnswer = userInput.trim().toLowerCase();
    const correct = correctAnswer && userAnswer === correctAnswer;
    setIsCorrect(correct);

    if (correct) {
      setFeedback('Tepat! Jawaban Benar. 👍');
      setCorrectStreak(prev => prev + 1); // Increment correct streak
      // Remove from retest queue if it was a retest item and answered correctly (it would have been at front of queue)
      if (retestQueue.includes(currentItemRef.current.id)) {
          setRetestQueue(prevQ => prevQ.filter(id => id !== currentItemRef.current.id));
      }
      setTimeout(loadNextItem, currentItemRef.current.explanation ? 3500 : 1500);
    } else {
      setFeedback(`Kurang Tepat. Jawaban: ${currentItemRef.current.targetWord || '[N/A]'}`);
      setCorrectStreak(0); // Reset streak
      setRetestThreshold(getRandomThreshold()); // Get new threshold after incorrect
      if (!isReviewingMistakes) {
        setMissedItemsMaster(prev => new Set(prev).add(currentItemRef.current.id));
        // Add to retestQueue if not already there and not a review session
        if (!retestQueue.includes(currentItemRef.current.id)) {
            setRetestQueue(prevQ => [...prevQ, currentItemRef.current.id]);
        }
      }
      setTimeout(() => nextButtonRef.current?.focus(), 50);
    }
  }, [userInput, isReviewingMistakes, loadNextItem, retestQueue]); // Added retestQueue

  const handleInputKeyPress = useCallback((event) => { if (event.key === 'Enter' && !isAnsweredRef.current && userInput.trim()) { checkAnswer(); } }, [checkAnswer, userInput]);
  useEffect(() => { const handlePageKeyDown = (event) => { const localIsCompleted = currentIndex >= (displayItems?.length || 0); if (localIsCompleted) return; if (event.key === 'Enter' && isAnsweredRef.current && !isCorrectRef.current) { if (document.activeElement !== inputRef.current && document.activeElement !== nextButtonRef.current) { loadNextItem(); } } }; const pageElement = pageRef.current; if (pageElement) pageElement.addEventListener('keydown', handlePageKeyDown); return () => { if (pageElement) pageElement.removeEventListener('keydown', handlePageKeyDown); }; }, [loadNextItem, currentIndex, displayItems]);

  const toggleHint = () => { setShowHint(prev => !prev); };

  const isCompleted = currentIndex >= totalItemsInSet && totalItemsInSet > 0 && !isLoading;
  const finalMistakeCountForDisplay = missedItemsMaster.size;

  if (isLoading) { return <div className="loading">Memuat pertanyaan...</div>; }
  if (error) { return <div className="error">{error}</div>; }
  if (isCompleted) { const completionText = isReviewingMistakes ? "✨ Sesi Review Imbuhan Selesai! ✨" : "✨ Latihan Imbuhan Selesai! ✨"; const mistakesToShow = finalMistakeCountForDisplay; return ( <div className={styles.container}> <p className="completionMessage">{completionText}</p> {!isReviewingMistakes && mistakesToShow > 0 && ( <p className="completionSubMessage"> Anda memiliki {mistakesToShow} item yang salah pada putaran awal. </p> )} <div className={styles.completionActions}> {finalMistakeCountForDisplay > 0 && !isReviewingMistakes && ( <button className="secondaryButton" onClick={handleReviewMistakes}> 🔁 Ulangi Kesalahan ({finalMistakeCountForDisplay}) </button> )} <button className="primaryButton" onClick={handleReshuffleAll}> {isReviewingMistakes ? 'Mulai Lagi Semua' : 'Ulangi Semua'} </button> </div> </div> ); }
  if (!currentItemFromMemo) { return <div className="loading">Tidak ada data imbuhan untuk ditampilkan.</div>; }
  const displaySentenceWithBlank = () => { if (!currentItemFromMemo || !currentItemFromMemo.sentence) return "[Kalimat tidak tersedia]"; return currentItemFromMemo.sentence.replace(/___|\[____\]|\[_____\]|\[______\]/g, `<span class="${styles.blankPlaceholder}">[____]</span>`); };

  return ( <div className={styles.container} ref={pageRef} tabIndex={-1}> <ProgressBar current={currentIndex + 1} total={totalItemsInSet} label={isReviewingMistakes ? "Review Kesalahan" : "Imbuhan"} /> <div className={styles.card}> <p className={styles.label}>Lengkapi kalimat berikut:</p> <p className={styles.sentence} dangerouslySetInnerHTML={{ __html: displaySentenceWithBlank() }} /> <div className={styles.promptSection}> <div className={styles.promptItem}><p className={styles.promptLabel}>Kata Dasar (Root):</p><p className={styles.promptValue}>{currentItemFromMemo.root || '[N/A]'}</p></div> <div className={styles.promptItem}> {!showHint && !isAnswered ? ( <button onClick={toggleHint} className={styles.hintButton}> 💡 Tampilkan Hint </button> ) : ( <> <p className={styles.promptLabel}>Hint (Arti Kata):</p> <p className={styles.promptValue}>{currentItemFromMemo.hint || '[N/A]'}</p> </> )} </div> </div> </div> <div className={styles.inputSection}> <label htmlFor="imbuhanInput" className={styles.instruction}>Ketik bentuk kata yang tepat:</label> <input id="imbuhanInput" ref={inputRef} type="text" className={`${styles.input} ${isAnswered ? (isCorrect ? styles.inputCorrect : styles.inputIncorrect) : ''}`} placeholder="Jawaban Anda..." value={userInput} onChange={(e) => setUserInput(e.target.value)} onKeyPress={handleInputKeyPress} disabled={isAnswered} autoFocus={!isAnswered && !isLoading} autoCapitalize="none" aria-describedby="feedbackArea explanationArea" aria-invalid={isAnswered && !isCorrect} /> </div> {isAnswered && feedback && (<div id="feedbackArea" className={`${styles.feedback} ${isCorrect ? styles.correctFeedback : styles.incorrectFeedback}`} role="alert">{feedback}</div>)} {isAnswered && showExplanation && currentItemFromMemo.explanation && ( <div id="explanationArea" className={styles.explanationBox} role="note"> <p className={styles.explanationTitle}>Penjelasan:</p> <p>{currentItemFromMemo.explanation}</p> </div> )} <div className={styles.buttonRow}> {!isAnswered && (<button className="primaryButton" onClick={checkAnswer} disabled={!userInput.trim()}>Periksa Jawaban</button> )} {isAnswered && !isCorrect && ( <button className="nextButton" onClick={loadNextItem} ref={nextButtonRef}>Lanjut <span className="arrowIcon">→</span></button> )} </div> </div> );
};
export default ImbuhanPage;
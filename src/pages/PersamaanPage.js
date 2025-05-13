// src/pages/PersamaanPage.js
// Added Randomized Spaced Repetition Teaser
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { persamaanData } from '../data/persamaan';
import styles from './PersamaanPage.module.css';
import ProgressBar from '../components/ProgressBar';

const shuffleArray = (array) => { /* ... (same shuffleArray) ... */ };
const getDistractors = (allItems, currentItem, count = 2) => { /* ... (same getDistractors) ... */ };
const LOCAL_STORAGE_KEY = 'kataPultPersamaanState_v4'; // Incremented
const getRandomThreshold = () => Math.floor(Math.random() * 4) + 2; // 2-5

const PersamaanPage = () => {
  const [allItems, setAllItems] = useState([]);
  const [displayItems, setDisplayItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [missedItemsMaster, setMissedItemsMaster] = useState(new Set());
  const [isReviewingMistakes, setIsReviewingMistakes] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [retestQueue, setRetestQueue] = useState([]);
  const [correctStreak, setCorrectStreak] = useState(0);
  const [retestThreshold, setRetestThreshold] = useState(getRandomThreshold());

  const optionButtonRefs = useRef([]);
  const pageRef = useRef(null);
  const nextButtonRef = useRef(null);
  const isAnsweredRef = useRef(isAnswered);
  const isCorrectRef = useRef(isCorrect);
  const currentItemRef = useRef(null);
  const isCompletedRef = useRef(false);

  const { currentItem: currentItemFromMemo, totalItemsInSet } = useMemo(() => {
    const item = (displayItems && displayItems.length > 0 && currentIndex < displayItems.length)
      ? displayItems[currentIndex]
      : null;
    currentItemRef.current = item;
    return { currentItem: item, totalItemsInSet: displayItems?.length || 0 };
  }, [displayItems, currentIndex]);

  const loadData = useCallback((itemsToLoad, isReviewSession) => {
    // ... (same as ImbuhanPage loadData, adjusted for Persamaan data structure)
      setIsLoading(true); setError(null);
      try {
          const validItems = itemsToLoad.filter(item => item.word && item.synonyms && item.synonyms.length > 0);
          if (!validItems || validItems.length === 0) throw new Error("Tidak ada data Persamaan yang valid.");
          setDisplayItems(shuffleArray([...validItems])); setCurrentIndex(0); setIsReviewingMistakes(isReviewSession);
          setIsAnswered(false); setFeedback(''); setSelectedAnswer(null); setIsCorrect(false);
          isCompletedRef.current = false;
          if (!isReviewSession) { setMissedItemsMaster(new Set()); setRetestQueue([]); setCorrectStreak(0); setRetestThreshold(getRandomThreshold()); localStorage.removeItem(LOCAL_STORAGE_KEY); }
      } catch (err) { console.error("Error loading Persamaan:", err); setError(err.message); setDisplayItems([]); }
      finally { setIsLoading(false); }
  }, []);

  useEffect(() => {
    // ... (Initial load from localStorage - same structure as ImbuhanPage, use LOCAL_STORAGE_KEY)
    setIsLoading(true); setError(null);
    try {
        const filteredData = persamaanData.filter(item => item.word && item.synonyms && item.synonyms.length > 0);
        if (filteredData.length === 0) throw new Error("No valid Persamaan data in source.");
        setAllItems(filteredData);
        const savedStateJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (savedStateJSON) {
            const savedState = JSON.parse(savedStateJSON);
            if (savedState && typeof savedState.currentIndex === 'number' && Array.isArray(savedState.displayItemIds) && Array.isArray(savedState.missedItemsMaster) && Array.isArray(savedState.retestQueue) && typeof savedState.correctStreak === 'number') {
                const currentAllItemsMap = new Map(filteredData.map(item => [item.id, item]));
                const validSavedDisplayItems = savedState.displayItemIds.map(id => currentAllItemsMap.get(id)).filter(Boolean);
                if(validSavedDisplayItems.length > 0 && savedState.currentIndex < validSavedDisplayItems.length) {
                    setDisplayItems(validSavedDisplayItems); setCurrentIndex(savedState.currentIndex);
                    setMissedItemsMaster(new Set(savedState.missedItemsMaster)); setIsReviewingMistakes(savedState.isReviewingMistakes || false);
                    setRetestQueue(savedState.retestQueue); setCorrectStreak(savedState.correctStreak);
                    setRetestThreshold(savedState.retestThreshold || getRandomThreshold()); setIsAnswered(false);
                } else { localStorage.removeItem(LOCAL_STORAGE_KEY); loadData(filteredData, false); }
            } else { localStorage.removeItem(LOCAL_STORAGE_KEY); loadData(filteredData, false); }
        } else { loadData(filteredData, false); }
    } catch (err) { console.error("Error init Persamaan:", err); setError(err.message); setAllItems([]); setDisplayItems([]); }
    finally { setIsLoading(false); }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // ... (Save state to localStorage - same structure as ImbuhanPage)
     if (isLoading || error || !displayItems || displayItems.length === 0) return;
    const isCompletedNow = currentIndex >= displayItems.length;
    isCompletedRef.current = isCompletedNow;
     if (isCompletedNow) { localStorage.removeItem(LOCAL_STORAGE_KEY); return; }
    try {
      const stateToSave = { currentIndex: currentIndex, displayItemIds: displayItems.map(item => ({ id: item.id })), missedItemsMaster: Array.from(missedItemsMaster), isReviewingMistakes: isReviewingMistakes, retestQueue: retestQueue, correctStreak: correctStreak, retestThreshold: retestThreshold };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (err) { console.error("Failed to save Persamaan state:", err); }
  }, [currentIndex, displayItems, missedItemsMaster, isReviewingMistakes, retestQueue, correctStreak, retestThreshold, isLoading, error]);

  const generateOptions = useCallback(() => { /* ... (same as before, uses allItems for distractors) ... */ if (!currentItemRef.current || !Array.isArray(currentItemRef.current.synonyms) || currentItemRef.current.synonyms.length === 0 || !Array.isArray(allItems) || allItems.length === 0) { setOptions([]); return; } const correctSynonym = currentItemRef.current.synonyms[Math.floor(Math.random() * currentItemRef.current.synonyms.length)]; const distractors = getDistractors(allItems, currentItemRef.current, 2); const allOptions = shuffleArray([correctSynonym, ...distractors]); setOptions(allOptions); optionButtonRefs.current = allOptions.map((_, i) => optionButtonRefs.current[i] || React.createRef()); }, [allItems]);
  useEffect(() => { if (!isLoading && currentItemFromMemo) { generateOptions(); setSelectedAnswer(null); setFeedback(''); setIsAnswered(false); setIsCorrect(false); setTimeout(() => optionButtonRefs.current[0]?.current?.focus(), 100); } else if (!currentItemFromMemo) { setOptions([]); } }, [currentItemFromMemo, isLoading, generateOptions]);

  const handleReshuffleAll = () => { /* ... (same as ImbuhanPage) ... */ if(allItems.length > 0) loadData(allItems, false); };
  const handleReviewMistakes = () => { /* ... (same as ImbuhanPage) ... */ const mistakeIds = Array.from(missedItemsMaster); if (mistakeIds.length === 0) return; const itemsToReview = allItems.filter(item => mistakeIds.includes(item.id)); if (itemsToReview.length > 0) { loadData(itemsToReview, true); } else { setError("Tidak ada kesalahan untuk di-review."); } };

  const loadNextItem = useCallback(() => {
    // ... (loadNextItem with retestQueue logic, similar to ImbuhanPage) ...
    if (!displayItems || displayItems.length === 0) return;
    if (!isReviewingMistakes && retestQueue.length > 0 && correctStreak >= retestThreshold) {
        const retestItemId = retestQueue[0]; const retestItem = allItems.find(item => item.id === retestItemId);
        if (retestItem) {
            console.log("Persamaan: Retesting item:", retestItem.word);
            const currentActualIndexInDisplay = displayItems.findIndex(item => item.id === currentItemRef.current?.id); let nextDisplayItems = [...displayItems];
            const existingRetestIndex = nextDisplayItems.findIndex(item => item.id === retestItemId);
            if (existingRetestIndex > -1 && existingRetestIndex > currentActualIndexInDisplay) { nextDisplayItems.splice(existingRetestIndex, 1); }
            if (currentActualIndexInDisplay !== -1 && currentActualIndexInDisplay < nextDisplayItems.length -1 ) { nextDisplayItems.splice(currentActualIndexInDisplay + 1, 0, retestItem); } else { nextDisplayItems.push(retestItem); }
            setDisplayItems(nextDisplayItems);
            const newIndexOfRetestItem = nextDisplayItems.findIndex(item => item.id === retestItemId);
            setCurrentIndex(newIndexOfRetestItem !== -1 ? newIndexOfRetestItem : currentIndex + 1);
            setRetestQueue(prev => prev.slice(1)); setCorrectStreak(0); setRetestThreshold(getRandomThreshold());
            return;
        } else { setRetestQueue(prev => prev.slice(1)); }
    }
    if (currentIndex < displayItems.length) { setCurrentIndex(prevIndex => prevIndex + 1); }
  }, [currentIndex, displayItems, allItems, retestQueue, correctStreak, isReviewingMistakes, retestThreshold]);

  useEffect(() => { isAnsweredRef.current = isAnswered; isCorrectRef.current = isCorrect; }, [isAnswered, isCorrect]);

  const checkAnswer = useCallback((selectedOption) => {
    // ... (checkAnswer logic similar to ImbuhanPage, uses currentItemRef.current) ...
    if (!currentItemRef.current || isAnsweredRef.current) return;
    setIsAnswered(true); const correctSynonymsLower = currentItemRef.current.synonyms.map(s => s.toLowerCase()); const correct = correctSynonymsLower.includes(selectedOption.toLowerCase()); setIsCorrect(correct); setSelectedAnswer(selectedOption);
    if (correct) { setFeedback('Tepat! Sinonim Benar. 👍'); setCorrectStreak(prev => prev + 1); setRetestQueue(prevQ => prevQ.filter(id => id !== currentItemRef.current.id)); setTimeout(loadNextItem, 1500); }
    else { setFeedback(`Kurang Tepat. Sinonim: ${currentItemRef.current.synonyms.join(', ')}`); setCorrectStreak(0); setRetestThreshold(getRandomThreshold()); if (!isReviewingMistakes) { setMissedItemsMaster(prev => new Set(prev).add(currentItemRef.current.id)); if (!retestQueue.includes(currentItemRef.current.id)) { setRetestQueue(prevQ => [...prevQ, currentItemRef.current.id]); } } setTimeout(() => nextButtonRef.current?.focus(), 50); }
  }, [isReviewingMistakes, loadNextItem, retestQueue]);

  const isCompleted = currentIndex >= totalItemsInSet && totalItemsInSet > 0 && !isLoading;
  const finalMistakeCountForDisplay = missedItemsMaster.size;

  // ... (Keyboard handlers and render logic similar to ImbuhanPage)
  useEffect(() => { const handlePageKeyDown = (event) => { if (isCompletedRef.current) return; if (!isAnsweredRef.current && ['1', '2', '3'].includes(event.key)) { const optionIndex = parseInt(event.key, 10) - 1; if (options[optionIndex]) { checkAnswer(options[optionIndex]); event.preventDefault(); } } else if (event.key === 'Enter' && isAnsweredRef.current && !isCorrectRef.current) { if (!optionButtonRefs.current.some(ref => ref.current === document.activeElement)) { loadNextItem(); event.preventDefault(); } } }; const pageElement = pageRef.current; if (pageElement) { pageElement.addEventListener('keydown', handlePageKeyDown); } return () => { if (pageElement) pageElement.removeEventListener('keydown', handlePageKeyDown); }; }, [options, checkAnswer, loadNextItem]);
  const handleOptionKeyDown = (event, option) => { if (!isAnsweredRef.current && (event.key === 'Enter' || event.key === ' ')) { checkAnswer(option); event.preventDefault(); } };
  if (isLoading) { return <div className="loading">Memuat sinonim...</div>; }
  if (error) { return <div className="error">{error}</div>; }
  if (isCompleted) { const completionText = isReviewingMistakes ? "✨ Sesi Review Persamaan Selesai! ✨" : "✨ Latihan Persamaan Selesai! ✨"; return ( <div className={styles.container}> <p className="completionMessage">{completionText}</p> {!isReviewingMistakes && finalMistakeCountForDisplay > 0 && ( <p className="completionSubMessage">Anda memiliki {finalMistakeCountForDisplay} item yang salah.</p> )} <div className={styles.completionActions}> {finalMistakeCountForDisplay > 0 && !isReviewingMistakes && ( <button className="secondaryButton" onClick={handleReviewMistakes}>🔁 Ulangi Kesalahan ({finalMistakeCountForDisplay})</button> )} <button className="primaryButton" onClick={handleReshuffleAll}>{isReviewingMistakes ? 'Mulai Lagi Semua' : 'Ulangi Semua'}</button> </div> </div> ); }
  if (!currentItemFromMemo) { return <div className="loading">Memuat kata berikutnya...</div>; }

  return ( <div className={styles.container} ref={pageRef} tabIndex={-1}> <ProgressBar current={currentIndex + 1} total={totalItemsInSet} label={isReviewingMistakes ? "Review Kesalahan" : "Persamaan"} /> <div className={styles.card}> <p className={styles.label}>Carikan persamaan kata (sinonim) untuk:</p> <h2 className={styles.word}>{currentItemFromMemo.word || '[N/A]'}</h2> </div> <div className={styles.optionsContainer} role="radiogroup" aria-labelledby="instruction-persamaan"> <p className={styles.instruction} id="instruction-persamaan">Pilih salah satu persamaannya (Gunakan tombol 1, 2, 3):</p> {options.map((option, index) => { const isCorrectOption = currentItemFromMemo?.synonyms?.map(s => s.toLowerCase()).includes(option.toLowerCase()) ?? false; let buttonClassName = styles.optionButton; if (isAnswered) { if (isCorrectOption) buttonClassName += ` ${styles.correct}`; else if (selectedAnswer === option) buttonClassName += ` ${styles.incorrect}`; else buttonClassName += ` ${styles.disabled}`; } return ( <button key={`${currentItemFromMemo.id}-option-${index}-${option}`} ref={el => optionButtonRefs.current[index] = el} className={buttonClassName} onClick={() => checkAnswer(option)} onKeyDown={(e) => handleOptionKeyDown(e, option)} disabled={isAnswered} role="radio" aria-checked={selectedAnswer === option} tabIndex={isAnswered ? -1 : 0} > <span className={styles.optionNumber}>{index + 1}.</span> <span className={styles.optionText}>{option}</span> </button> ); })} </div> {isAnswered && feedback && (<div className={`${styles.feedback} ${isCorrect ? styles.correctFeedback : styles.incorrectFeedback}`} role="alert">{feedback}</div>)} {isAnswered && !isCorrect && (<button className="nextButton" ref={nextButtonRef} onClick={loadNextItem}>Lanjut <span className="arrowIcon">→</span></button>)} </div> );
};
export default PersamaanPage;
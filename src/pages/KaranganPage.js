// src/pages/KaranganPage.js
// Added Randomized Spaced Repetition Teaser
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { karanganData } from '../data/karangan';
import styles from './KaranganPage.module.css';
import ProgressBar from '../components/ProgressBar';

const shuffleArray = (array) => { /* ... (same shuffleArray) ... */ };
const getDistractors = (allItems, currentItem, count = 2) => { /* ... (same getDistractors for definitions) ... */ };
const LOCAL_STORAGE_KEY = 'kataPultKaranganState_v4'; // Incremented
const getRandomThreshold = () => Math.floor(Math.random() * 4) + 2; // 2-5

const KaranganPage = () => {
  // ... (All state variables and refs similar to PersamaanPage, including retestThreshold)
  const [allItems, setAllItems] = useState([]); const [displayItems, setDisplayItems] = useState([]); const [currentIndex, setCurrentIndex] = useState(0); const [options, setOptions] = useState([]); const [selectedAnswer, setSelectedAnswer] = useState(null); const [feedback, setFeedback] = useState(''); const [isAnswered, setIsAnswered] = useState(false); const [isLoading, setIsLoading] = useState(true); const [error, setError] = useState(null); const [missedItemsMaster, setMissedItemsMaster] = useState(new Set()); const [isReviewingMistakes, setIsReviewingMistakes] = useState(false); const [isCorrect, setIsCorrect] = useState(false);
  const [retestQueue, setRetestQueue] = useState([]); const [correctStreak, setCorrectStreak] = useState(0); const [retestThreshold, setRetestThreshold] = useState(getRandomThreshold());
  const optionButtonRefs = useRef([]); const pageRef = useRef(null); const nextButtonRef = useRef(null); const isAnsweredRef = useRef(isAnswered); const isCorrectRef = useRef(isCorrect); const currentItemRef = useRef(null);

  const { currentItem: currentItemFromMemo, totalItemsInSet } = useMemo(() => { const item = (displayItems && displayItems.length > 0 && currentIndex < displayItems.length) ? displayItems[currentIndex] : null; currentItemRef.current = item; return { currentItem: item, totalItemsInSet: displayItems?.length || 0 }; }, [displayItems, currentIndex]);

  const loadData = useCallback((itemsToLoad, isReviewSession) => {
      // ... (similar to PersamaanPage's loadData, adjusted for Karangan data structure)
      setIsLoading(true); setError(null);
      try {
          const validItems = itemsToLoad.filter(item => item.word && item.definition);
          if (!validItems || validItems.length === 0) throw new Error("Tidak ada data Karangan valid.");
          setDisplayItems(shuffleArray([...validItems])); setCurrentIndex(0); setIsReviewingMistakes(isReviewSession);
          setIsAnswered(false); setFeedback(''); setSelectedAnswer(null); setIsCorrect(false);
          if (!isReviewSession) { setMissedItemsMaster(new Set()); setRetestQueue([]); setCorrectStreak(0); setRetestThreshold(getRandomThreshold()); localStorage.removeItem(LOCAL_STORAGE_KEY); }
      } catch (err) { console.error("Error loading Karangan:", err); setError(err.message); setDisplayItems([]); }
      finally { setIsLoading(false); }
  }, []);

  useEffect(() => {
    // ... (Initial load from localStorage - similar to PersamaanPage, use LOCAL_STORAGE_KEY)
    setIsLoading(true); setError(null);
    try {
        const filteredData = karanganData.filter(item => item.word && item.definition);
        if (filteredData.length === 0) throw new Error("No valid Karangan data in source.");
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
    } catch (err) { console.error("Error init Karangan:", err); setError(err.message); setAllItems([]); setDisplayItems([]); }
    finally { setIsLoading(false); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // ... (Save state to localStorage - similar to PersamaanPage, includes retestThreshold)
     if (isLoading || error || !displayItems || displayItems.length === 0) return;
    const isCompleted = currentIndex >= displayItems.length;
    if (isCompleted) return;
    try {
      const stateToSave = { currentIndex: currentIndex, displayItemIds: displayItems.map(item => item.id), missedItemsMaster: Array.from(missedItemsMaster), isReviewingMistakes: isReviewingMistakes, retestQueue: retestQueue, correctStreak: correctStreak, retestThreshold: retestThreshold };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (err) { console.error("Failed to save Karangan state:", err); }
  }, [currentIndex, displayItems, missedItemsMaster, isReviewingMistakes, retestQueue, correctStreak, retestThreshold, isLoading, error]);

  const generateOptions = useCallback(() => { /* ... (same as before, uses allItems for distractors) ... */ if (!currentItemRef.current || !currentItemRef.current.definition || !Array.isArray(allItems) || allItems.length === 0) { setOptions([]); return; } const correctDefinition = currentItemRef.current.definition; const distractors = getDistractors(allItems, currentItemRef.current, 2); const allOptions = shuffleArray([correctDefinition, ...distractors]); setOptions(allOptions); optionButtonRefs.current = allOptions.map((_, i) => optionButtonRefs.current[i] || React.createRef()); }, [allItems]);
  useEffect(() => { if (!isLoading && currentItemFromMemo) { generateOptions(); setSelectedAnswer(null); setFeedback(''); setIsAnswered(false); setIsCorrect(false); setTimeout(() => optionButtonRefs.current[0]?.current?.focus(), 100); } else if (!currentItemFromMemo) { setOptions([]); } }, [currentItemFromMemo, isLoading, generateOptions]);

  const handleReshuffleAll = () => { /* ... (same as PersamaanPage) ... */ if (allItems.length > 0) loadData(allItems, false); };
  const handleReviewMistakes = () => { /* ... (same as PersamaanPage) ... */ const mistakeIds = Array.from(missedItemsMaster); if (mistakeIds.length === 0) return; const itemsToReview = allItems.filter(item => mistakeIds.includes(item.id)); if (itemsToReview.length > 0) { loadData(itemsToReview, true); } else { setError("Tidak ada kesalahan untuk di-review."); } };

  const loadNextItem = useCallback(() => {
    // ... (loadNextItem with retestQueue logic, similar to PersamaanPage) ...
    if (!displayItems || displayItems.length === 0) return;
    if (!isReviewingMistakes && retestQueue.length > 0 && correctStreak >= retestThreshold) {
        const retestItemId = retestQueue[0]; const retestItem = allItems.find(item => item.id === retestItemId);
        if (retestItem) {
            console.log("Karangan: Retesting item:", retestItem.word);
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
    // ... (checkAnswer logic similar to PersamaanPage, uses currentItemRef.current) ...
    if (!currentItemRef.current || isAnsweredRef.current) return;
    setIsAnswered(true); const correct = selectedOption.toLowerCase() === currentItemRef.current.definition.toLowerCase(); setIsCorrect(correct); setSelectedAnswer(selectedOption);
    if (correct) { setFeedback('Tepat! Definisi Benar. 👍'); setCorrectStreak(prev => prev + 1); setRetestQueue(prevQ => prevQ.filter(id => id !== currentItemRef.current.id)); setTimeout(loadNextItem, 1500); }
    else { setFeedback(`Kurang Tepat. Definisi: ${currentItemRef.current.definition}`); setCorrectStreak(0); setRetestThreshold(getRandomThreshold()); if (!isReviewingMistakes) { setMissedItemsMaster(prev => new Set(prev).add(currentItemRef.current.id)); if (!retestQueue.includes(currentItemRef.current.id)) { setRetestQueue(prevQ => [...prevQ, currentItemRef.current.id]); } } setTimeout(() => nextButtonRef.current?.focus(), 50); }
  }, [isReviewingMistakes, loadNextItem, retestQueue]);

  const isCompleted = currentIndex >= totalItemsInSet && totalItemsInSet > 0 && !isLoading;
  const finalMistakeCountForDisplay = missedItemsMaster.size;

  // ... (Keyboard handlers and render logic similar to PersamaanPage)
  useEffect(() => { const handlePageKeyDown = (event) => { const localIsCompleted = currentIndex >= (displayItems?.length || 0); if (localIsCompleted) return; if (!isAnsweredRef.current && ['1', '2', '3'].includes(event.key)) { const optionIndex = parseInt(event.key, 10) - 1; if (options[optionIndex]) { checkAnswer(options[optionIndex]); event.preventDefault(); } } else if (event.key === 'Enter' && isAnsweredRef.current && !isCorrectRef.current) { if (!optionButtonRefs.current.some(ref => ref.current === document.activeElement)) { loadNextItem(); event.preventDefault(); } } }; const pageElement = pageRef.current; if (pageElement) { pageElement.addEventListener('keydown', handlePageKeyDown); } return () => { if (pageElement) pageElement.removeEventListener('keydown', handlePageKeyDown); }; }, [options, checkAnswer, loadNextItem, currentIndex, displayItems]);
  const handleOptionKeyDown = (event, option) => { if (!isAnsweredRef.current && (event.key === 'Enter' || event.key === ' ')) { checkAnswer(option); event.preventDefault(); } };
  if (isLoading) { return <div className="loading">Memuat kata Karangan...</div>; }
  if (error) { return <div className="error">{error}</div>; }
  if (isCompleted) { const completionText = isReviewingMistakes ? "✨ Sesi Review Karangan Selesai! ✨" : "✨ Latihan Karangan Selesai! ✨"; return ( <div className={styles.container}> <p className="completionMessage">{completionText}</p> {!isReviewingMistakes && finalMistakeCountForDisplay > 0 && ( <p className="completionSubMessage">Anda memiliki {finalMistakeCountForDisplay} item yang salah.</p> )} <div className={styles.completionActions}> {finalMistakeCountForDisplay > 0 && !isReviewingMistakes && ( <button className="secondaryButton" onClick={handleReviewMistakes}>🔁 Ulangi Kesalahan ({finalMistakeCountForDisplay})</button> )} <button className="primaryButton" onClick={handleReshuffleAll}>{isReviewingMistakes ? 'Mulai Lagi Semua' : 'Ulangi Semua'}</button> </div> </div> ); }
  if (!currentItemFromMemo) { return <div className="loading">Memuat kata berikutnya...</div>; }

  return ( <div className={styles.container} ref={pageRef} tabIndex={-1}> <ProgressBar current={currentIndex + 1} total={totalItemsInSet} label={isReviewingMistakes ? "Review Kesalahan" : "Karangan Vocab"} /> <div className={styles.card}> <h2 className={styles.word}>{currentItemFromMemo.word || '[N/A]'}</h2> {currentItemFromMemo.synonyms && currentItemFromMemo.synonyms.length > 0 && ( <div className={styles.synonymSection}> <p className={styles.synonymLabel}>Sinonim (Mungkin Membantu):</p> <p className={styles.synonymText}>{currentItemFromMemo.synonyms.join(', ')}</p> </div> )} </div> <div className={styles.optionsContainer} role="radiogroup" aria-labelledby="instruction-karangan"> <p className={styles.instruction} id="instruction-karangan">Pilih definisi (English meaning) yang paling tepat (Gunakan 1, 2, 3):</p> {options.map((option, index) => { const isCorrectOption = currentItemFromMemo?.definition?.toLowerCase() === option.toLowerCase(); let buttonClassName = styles.optionButton; if (isAnswered) { if (isCorrectOption) buttonClassName += ` ${styles.correct}`; else if (selectedAnswer === option) buttonClassName += ` ${styles.incorrect}`; else buttonClassName += ` ${styles.disabled}`; } return ( <button key={`${currentItemFromMemo.id}-def-${index}`} ref={el => optionButtonRefs.current[index] = el} className={buttonClassName} onClick={() => checkAnswer(option)} onKeyDown={(e) => handleOptionKeyDown(e, option)} disabled={isAnswered} role="radio" aria-checked={selectedAnswer === option} tabIndex={isAnswered ? -1 : 0} > <span className={styles.optionNumber}>{index + 1}.</span> <span className={styles.optionText}>{option}</span> </button> ); })} </div> {isAnswered && feedback && (<div className={`${styles.feedback} ${isCorrect ? styles.correctFeedback : styles.incorrectFeedback}`} role="alert">{feedback}</div>)} {isAnswered && !isCorrect && (<button className="nextButton" ref={nextButtonRef} onClick={loadNextItem}>Lanjut <span className="arrowIcon">→</span></button>)} </div> );
};
export default KaranganPage;
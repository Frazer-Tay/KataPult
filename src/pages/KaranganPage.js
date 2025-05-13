// src/pages/KaranganPage.js
// CORRECTED: Using refs inside keyboard handler useEffect
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { karanganData } from '../data/karangan';
import styles from './KaranganPage.module.css';
import ProgressBar from '../components/ProgressBar';

// ... (shuffleArray and getDistractors functions remain the same)
const shuffleArray = (array) => { if (!Array.isArray(array)) return []; let currentIndex = array.length, randomIndex; while (currentIndex !== 0) { randomIndex = Math.floor(Math.random() * currentIndex); currentIndex--; [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]; } return array; };
const getDistractors = (allItems, currentItem, count = 2) => { const distractors = new Set(); if (!Array.isArray(allItems) || !currentItem || !currentItem.definition) return []; const potentialDistractorItems = allItems.filter(item => item.id !== currentItem.id && item.definition); const shuffledPool = shuffleArray([...potentialDistractorItems]); const correctDefinitionLower = currentItem.definition.toLowerCase(); for (const item of shuffledPool) { if (distractors.size >= count) break; if (item.definition.toLowerCase() !== correctDefinitionLower && !Array.from(distractors).map(d => d.toLowerCase()).includes(item.definition.toLowerCase())) { distractors.add(item.definition); } } let fallbackCounter = 1; while (distractors.size < count) { const fallback = `[Incorrect Definition Option ${String.fromCharCode(65 + distractors.size + fallbackCounter)}]`; if (fallback.toLowerCase() !== correctDefinitionLower && !Array.from(distractors).map(d => d.toLowerCase()).includes(fallback.toLowerCase())) { distractors.add(fallback); } fallbackCounter++; if (fallbackCounter > 10 + count) break; } return Array.from(distractors); };

const LOCAL_STORAGE_KEY = 'kataPultKaranganState_v2';

const KaranganPage = () => {
  // --- State Hooks ---
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

  // --- Refs ---
  const optionButtonRefs = useRef([]);
  const pageRef = useRef(null);
  const nextButtonRef = useRef(null);
  const isAnsweredRef = useRef(isAnswered);
  const isCorrectRef = useRef(isCorrect);
  const currentItemRef = useRef(null);
  const isCompletedRef = useRef(false);

  // --- Memoized Values ---
  const { currentItem: currentItemFromMemo, totalItemsInSet } = useMemo(() => {
      const item = (displayItems && displayItems.length > 0 && currentIndex < displayItems.length)
          ? displayItems[currentIndex]
          : null;
      currentItemRef.current = item;
      return { currentItem: item, totalItemsInSet: displayItems?.length || 0 };
  }, [displayItems, currentIndex]);

  // --- Data Loading ---
   const loadData = useCallback((itemsToLoad, isReviewSession) => {
       // ... (loadData logic remains the same)
      setIsLoading(true); setError(null);
      try {
          if (!itemsToLoad || !Array.isArray(itemsToLoad) || itemsToLoad.length === 0) throw new Error("No valid Karangan data.");
          setDisplayItems(shuffleArray([...itemsToLoad]));
          setCurrentIndex(0); setIsReviewingMistakes(isReviewSession);
          setIsAnswered(false); setFeedback(''); setSelectedAnswer(null); setIsCorrect(false);
          isCompletedRef.current = false;
          if (!isReviewSession) { setMissedItemsMaster(new Set()); localStorage.removeItem(LOCAL_STORAGE_KEY); }
      } catch (err) { console.error("Error loading Karangan:", err); setError(err.message); setDisplayItems([]); }
      finally { setIsLoading(false); }
   }, []); // Removed isReviewing dep

  // Initial Load / Load from localStorage
   useEffect(() => {
    // ... (initial load logic remains the same)
     setIsLoading(true); setError(null); let initialLoadItems = [];
    try {
        const filteredData = karanganData.filter(item => item.word && item.definition);
        if (filteredData.length === 0) throw new Error("No valid Karangan data.");
        setAllItems(filteredData); initialLoadItems = filteredData;
        const savedStateJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (savedStateJSON) {
            const savedState = JSON.parse(savedStateJSON);
            if (savedState && typeof savedState.currentIndex === 'number' && Array.isArray(savedState.displayItemIds) && Array.isArray(savedState.missedItemsMaster)) {
                 const currentAllItemsMap = new Map(filteredData.map(item => [item.id, item]));
                 const validSavedDisplayItems = savedState.displayItemIds.map(id => currentAllItemsMap.get(id)).filter(Boolean);
                 if(validSavedDisplayItems.length > 0 && savedState.currentIndex < validSavedDisplayItems.length) {
                    setDisplayItems(validSavedDisplayItems); setCurrentIndex(savedState.currentIndex);
                    setMissedItemsMaster(new Set(savedState.missedItemsMaster)); setIsReviewingMistakes(savedState.isReviewingMistakes || false);
                    setIsAnswered(false); setIsCorrect(false);
                 } else { localStorage.removeItem(LOCAL_STORAGE_KEY); loadData(initialLoadItems, false); }
            } else { localStorage.removeItem(LOCAL_STORAGE_KEY); loadData(initialLoadItems, false); }
        } else { loadData(initialLoadItems, false); }
    } catch (err) { console.error("Error init Karangan:", err); setError(err.message); setAllItems([]); setDisplayItems([]); }
    finally { setIsLoading(false); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  // Save state to localStorage
  useEffect(() => {
    // ... (save state logic remains the same)
    if (isLoading || error || !displayItems || displayItems.length === 0) return;
    const isCompletedNow = currentIndex >= displayItems.length;
    isCompletedRef.current = isCompletedNow;
     if (isCompletedNow) { localStorage.removeItem(LOCAL_STORAGE_KEY); return; }
    try {
      const stateToSave = { currentIndex: currentIndex, displayItemIds: displayItems.map(item => ({ id: item.id })), missedItemsMaster: Array.from(missedItemsMaster), isReviewingMistakes: isReviewingMistakes, };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (err) { console.error("Failed to save Karangan state:", err); }
  }, [currentIndex, displayItems, missedItemsMaster, isReviewingMistakes, isLoading, error]);


  // Generate Options
  const generateOptions = useCallback(() => {
     // ... (generate options logic remains the same)
      if (!currentItemRef.current || !currentItemRef.current.definition || !Array.isArray(allItems) || allItems.length === 0) { setOptions([]); return; }
      const correctDefinition = currentItemRef.current.definition;
      const distractors = getDistractors(allItems, currentItemRef.current, 2);
      const allOptions = shuffleArray([correctDefinition, ...distractors]);
      setOptions(allOptions);
      optionButtonRefs.current = allOptions.map((_, i) => optionButtonRefs.current[i] || React.createRef());
  }, [allItems]); // Only depends on allItems

  useEffect(() => {
    if (!isLoading && currentItemFromMemo) {
        generateOptions();
        setSelectedAnswer(null);
        setFeedback('');
        setIsAnswered(false);
        setIsCorrect(false);
        setTimeout(() => optionButtonRefs.current[0]?.current?.focus(), 100);
    } else if (!currentItemFromMemo) {
       setOptions([]);
    }
  }, [currentItemFromMemo, isLoading, generateOptions]);


  // --- Action Handlers ---
  const handleReshuffleAll = () => {
    setIsReviewingMistakes(false);
    loadData(allItems, false);
  };

  const handleReviewMistakes = () => {
    const mistakeIds = Array.from(missedItemsMaster);
    if (mistakeIds.length === 0) return;
    const itemsToReview = allItems.filter(item => mistakeIds.includes(item.id));
     if (itemsToReview.length > 0) {
        setIsReviewingMistakes(true);
        loadData(itemsToReview, true);
    } else {
         setError("Tidak dapat memulai review kesalahan Karangan.");
    }
  };

  const loadNextItem = useCallback(() => {
     if (!displayItems || displayItems.length === 0) return;
     if (currentIndex < totalItemsInSet - 1) {
        setCurrentIndex(prevIndex => prevIndex + 1);
    } else {
         setCurrentIndex(totalItemsInSet);
         isCompletedRef.current = true;
    }
  }, [currentIndex, displayItems, totalItemsInSet]);

  const checkAnswer = useCallback((selectedOption) => {
    if (isAnsweredRef.current || !currentItemRef.current || !currentItemRef.current.definition) return;
    setSelectedAnswer(selectedOption);
    setIsAnswered(true);
    const correct = selectedOption.toLowerCase() === currentItemRef.current.definition.toLowerCase();
    setIsCorrect(correct);

    if (correct) {
      setFeedback('Tepat! Definisi Benar. 👍');
      setTimeout(loadNextItem, 1500);
    } else {
      setFeedback(`Kurang Tepat. Definisi: ${currentItemRef.current.definition}`);
      if (!isReviewingMistakes) {
            setMissedItemsMaster(prev => new Set(prev).add(currentItemRef.current.id));
      }
      setTimeout(() => nextButtonRef.current?.focus(), 50);
    }
  }, [isReviewingMistakes, loadNextItem]);


  // --- Update Refs ---
  useEffect(() => {
      isAnsweredRef.current = isAnswered;
      isCorrectRef.current = isCorrect;
  }, [isAnswered, isCorrect]);


   // --- Keyboard Navigation ---
   useEffect(() => {
    const handlePageKeyDown = (event) => {
        if (isCompletedRef.current) return;

        if (!isAnsweredRef.current && ['1', '2', '3'].includes(event.key)) {
            const optionIndex = parseInt(event.key, 10) - 1;
            if (options[optionIndex] && optionButtonRefs.current[optionIndex]?.current) {
                checkAnswer(options[optionIndex]);
                event.preventDefault();
            }
        }
        else if (event.key === 'Enter' && isAnsweredRef.current && !isCorrectRef.current) {
             if (!optionButtonRefs.current.some(ref => ref.current === document.activeElement)) {
                 loadNextItem();
                 event.preventDefault();
            }
        }
    };
    const pageElement = pageRef.current;
    if (pageElement) { pageElement.addEventListener('keydown', handlePageKeyDown); }
    return () => { if (pageElement) pageElement.removeEventListener('keydown', handlePageKeyDown); };
  }, [options, checkAnswer, loadNextItem]);


  const handleOptionKeyDown = (event, option) => {
      if (!isAnsweredRef.current && (event.key === 'Enter' || event.key === ' ')) {
          checkAnswer(option);
          event.preventDefault();
      }
  };

  const isCompleted = currentIndex >= totalItemsInSet && totalItemsInSet > 0 && !isLoading;
  const finalMistakeCountForDisplay = missedItemsMaster.size;

  // --- Render Logic ---
   if (isLoading) { return <div className="loading">Memuat kata Karangan...</div>; }
   if (error) { return <div className="error">{error}</div>; }

  if (isCompleted) {
       // ... (Completion screen logic remains the same)
       const completionText = isReviewingMistakes ? "✨ Sesi Review Karangan Selesai! ✨" : "✨ Latihan Karangan Selesai! ✨";
       const mistakesToShow = finalMistakeCountForDisplay;
     return ( <div className={styles.container}> <p className="completionMessage">{completionText}</p> {!isReviewingMistakes && mistakesToShow > 0 && ( <p className="completionSubMessage">Anda memiliki {mistakesToShow} item yang salah.</p> )} <div className={styles.completionActions}> {finalMistakeCountForDisplay > 0 && !isReviewingMistakes && ( <button className="secondaryButton" onClick={handleReviewMistakes}>🔁 Ulangi Kesalahan ({finalMistakeCountForDisplay})</button> )} <button className="primaryButton" onClick={handleReshuffleAll}>{isReviewingMistakes ? 'Mulai Lagi Semua' : 'Ulangi Semua'}</button> </div> </div> );
   }

   if (!currentItemFromMemo) { return <div className="loading">Memuat kata berikutnya...</div>; }

  return (
    <div className={styles.container} ref={pageRef} tabIndex={-1}>
       <ProgressBar current={currentIndex + 1} total={totalItemsInSet} label={isReviewingMistakes ? "Review Kesalahan" : "Karangan Vocab"} />
        <div className={styles.card}>
            <h2 className={styles.word}>{currentItemFromMemo.word || '[N/A]'}</h2>
            {currentItemFromMemo.synonyms && currentItemFromMemo.synonyms.length > 0 && (
                <div className={styles.synonymSection}>
                    <p className={styles.synonymLabel}>Sinonim (Mungkin Membantu):</p>
                    <p className={styles.synonymText}>{currentItemFromMemo.synonyms.join(', ')}</p>
                </div>
            )}
        </div>
        <div className={styles.optionsContainer} role="radiogroup" aria-labelledby="instruction-karangan">
            <p className={styles.instruction} id="instruction-karangan">Pilih definisi (English meaning) yang paling tepat (Gunakan 1, 2, 3):</p>
            {options.map((option, index) => {
              // Use isCorrect state directly
              const isCorrectOption = currentItemFromMemo?.definition?.toLowerCase() === option.toLowerCase();
              let buttonClassName = styles.optionButton;
              if (isAnswered) {
                if (isCorrectOption) buttonClassName += ` ${styles.correct}`;
                else if (selectedAnswer === option) buttonClassName += ` ${styles.incorrect}`;
                else buttonClassName += ` ${styles.disabled}`;
              }
              return (
                <button
                  key={`${currentItemFromMemo.id}-def-${index}`}
                  ref={el => optionButtonRefs.current[index] = el} // Correct way to assign to array of refs
                  className={buttonClassName}
                  onClick={() => checkAnswer(option)}
                  onKeyDown={(e) => handleOptionKeyDown(e, option)}
                  disabled={isAnswered} // Use state directly
                  role="radio"
                  aria-checked={selectedAnswer === option}
                  tabIndex={isAnswered ? -1 : 0}
                >
                   <span className={styles.optionNumber}>{index + 1}.</span>
                  <span className={styles.optionText}>{option}</span>
                  {/* Icons added via CSS */}
                </button>
              );
            })}
        </div>
         {/* Use isCorrect state directly */}
        {isAnswered && feedback && (
            <div className={`${styles.feedback} ${isCorrect ? styles.correctFeedback : styles.incorrectFeedback}`} role="alert">
                 {feedback}
            </div>
        )}
         {/* Use isCorrect state directly */}
        {isAnswered && !isCorrect && (
            <button className="nextButton" ref={nextButtonRef} onClick={loadNextItem}>
                Lanjut <span className="arrowIcon">→</span>
            </button>
        )}
    </div>
  );
};

export default KaranganPage;
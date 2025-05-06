// src/pages/KaranganPage.js
// CORRECTED: Added missing isCorrect state declaration
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { karanganData } from '../data/karangan';
import styles from './KaranganPage.module.css';
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

const getDistractors = (allItems, currentItem, count = 2) => {
    // ... (getDistractors logic remains the same)
     const distractors = new Set();
     if (!Array.isArray(allItems) || !currentItem || !currentItem.definition) return [];
    const potentialDistractorItems = allItems.filter(item => item.id !== currentItem.id && item.definition);
    const shuffledPool = shuffleArray([...potentialDistractorItems]);
    const correctDefinitionLower = currentItem.definition.toLowerCase();
    for (const item of shuffledPool) {
        if (distractors.size >= count) break;
         if (item.definition.toLowerCase() !== correctDefinitionLower && !Array.from(distractors).map(d => d.toLowerCase()).includes(item.definition.toLowerCase())) {
            distractors.add(item.definition);
        }
    }
    let fallbackCounter = 1;
    while (distractors.size < count) {
        const fallback = `[Incorrect Definition Option ${String.fromCharCode(65 + distractors.size + fallbackCounter)}]`;
        if (fallback.toLowerCase() !== correctDefinitionLower && !Array.from(distractors).map(d => d.toLowerCase()).includes(fallback.toLowerCase())) {
           distractors.add(fallback);
        }
        fallbackCounter++;
        if (fallbackCounter > 10 + count) break;
    }
    return Array.from(distractors);
};

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
  const [missedItems, setMissedItems] = useState(new Set());
  const [isReviewing, setIsReviewing] = useState(false);
  // --- Initialize isCorrect state ---
  const [isCorrect, setIsCorrect] = useState(false); // Track correctness

  // --- Refs ---
  const optionButtonRefs = useRef([]);
  const pageRef = useRef(null);
  const nextButtonRef = useRef(null);

  // --- Memoized Values ---
  const { currentItem, totalItemsInSet } = useMemo(() => {
      const item = (displayItems && displayItems.length > 0 && currentIndex < displayItems.length)
          ? displayItems[currentIndex]
          : null;
      return { currentItem: item, totalItemsInSet: displayItems?.length || 0 };
  }, [displayItems, currentIndex]);

  // --- Data Loading ---
   const loadData = useCallback((itemsToLoad, isReviewSession) => {
      // ... (loadData logic remains the same)
      setIsLoading(true); setError(null);
      try {
          if (!itemsToLoad || !Array.isArray(itemsToLoad) || itemsToLoad.length === 0) throw new Error("No valid Karangan data.");
          setDisplayItems(shuffleArray([...itemsToLoad]));
          setCurrentIndex(0); setIsReviewing(isReviewSession);
          setIsAnswered(false); setFeedback(''); setSelectedAnswer(null); setIsCorrect(false); // Reset isCorrect
          if (!isReviewSession) { setMissedItems(new Set()); localStorage.removeItem(LOCAL_STORAGE_KEY); }
      } catch (err) { console.error("Error loading Karangan:", err); setError(err.message); setDisplayItems([]); }
      finally { setIsLoading(false); }
   }, []); // Removed isReviewing

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
            if (savedState && typeof savedState.currentIndex === 'number' && Array.isArray(savedState.displayItemIds) && Array.isArray(savedState.missedItems)) {
                 const currentAllItemsMap = new Map(filteredData.map(item => [item.id, item]));
                 const validSavedDisplayItems = savedState.displayItemIds.map(id => currentAllItemsMap.get(id)).filter(Boolean);
                 if(validSavedDisplayItems.length > 0 && savedState.currentIndex < validSavedDisplayItems.length) {
                    setDisplayItems(validSavedDisplayItems); setCurrentIndex(savedState.currentIndex);
                    setMissedItems(new Set(savedState.missedItems)); setIsReviewing(savedState.isReviewing || false);
                    setIsAnswered(false); setIsCorrect(false); // Ensure reset
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
    const isCompleted = currentIndex >= displayItems.length;
     if (isCompleted) return;
    try {
      const stateToSave = { currentIndex: currentIndex, displayItemIds: displayItems.map(item => ({ id: item.id })), missedItems: Array.from(missedItems), isReviewing: isReviewing, };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (err) { console.error("Failed to save Karangan state:", err); }
  }, [currentIndex, displayItems, missedItems, isReviewing, isLoading, error]);


  // Generate Options
  const generateOptions = useCallback(() => {
     // ... (generate options logic remains the same)
     if (!currentItem || !currentItem.definition || !Array.isArray(allItems) || allItems.length === 0) { setOptions([]); return; }
    const correctDefinition = currentItem.definition;
    const distractors = getDistractors(allItems, currentItem, 2);
    const allOptions = shuffleArray([correctDefinition, ...distractors]);
    setOptions(allOptions);
    optionButtonRefs.current = allOptions.map((_, i) => optionButtonRefs.current[i] || React.createRef());
  }, [currentItem, allItems]);

  useEffect(() => {
    if (!isLoading && currentItem) {
        generateOptions();
        setSelectedAnswer(null);
        setFeedback('');
        setIsAnswered(false);
        setIsCorrect(false); // Reset correctness
        setTimeout(() => optionButtonRefs.current[0]?.current?.focus(), 100);
    } else if (!currentItem) {
       setOptions([]);
    }
  }, [currentItem, isLoading, generateOptions]);


  // --- Action Handlers ---
  const handleReshuffleAll = () => {
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
         setError("Tidak dapat memulai review kesalahan Karangan.");
    }
  };

  const loadNextItem = useCallback(() => {
     if (!displayItems || displayItems.length === 0) return;
     if (currentIndex < displayItems.length) {
        setCurrentIndex(prevIndex => prevIndex + 1);
    }
  }, [currentIndex, displayItems]);

  const checkAnswer = useCallback((selectedOption) => {
    if (isAnswered || !currentItem || !currentItem.definition) return;
    setSelectedAnswer(selectedOption);
    setIsAnswered(true);
    const correct = selectedOption.toLowerCase() === currentItem.definition.toLowerCase(); // Assign to 'correct'
    setIsCorrect(correct); // Set state

    if (correct) {
      setFeedback('Tepat! Definisi Benar. 👍');
      setTimeout(loadNextItem, 1500);
    } else {
      setFeedback(`Kurang Tepat. Definisi: ${currentItem.definition}`);
      if (!isReviewing) {
            setMissedItems(prev => new Set(prev).add(currentItem.id));
      }
      setTimeout(() => nextButtonRef.current?.focus(), 50);
    }
  }, [isAnswered, currentItem, isReviewing, loadNextItem]); // Added deps


   // --- Keyboard Navigation ---
   useEffect(() => {
    const handlePageKeyDown = (event) => {
        // Use local variable for correctness check based on *current* state
        const currentlyCorrect = isCorrect;
        const currentlyAnswered = isAnswered;

        if (isCompleted) return;

        if (!currentlyAnswered && ['1', '2', '3'].includes(event.key)) {
            const optionIndex = parseInt(event.key, 10) - 1;
            if (options[optionIndex]) {
                checkAnswer(options[optionIndex]);
                event.preventDefault();
            }
        }
        // Check *isAnswered* state directly, use *!isCorrect*
        else if (event.key === 'Enter' && currentlyAnswered && !currentlyCorrect) {
             if (!optionButtonRefs.current.some(ref => ref.current === document.activeElement)) {
                 loadNextItem();
                 event.preventDefault();
            }
        }
    };
    const pageElement = pageRef.current;
    if (pageElement) { pageElement.addEventListener('keydown', handlePageKeyDown); }
    return () => { if (pageElement) pageElement.removeEventListener('keydown', handlePageKeyDown); };
   // Add isCorrect here as well
  }, [isAnswered, isCorrect, loadNextItem, options, checkAnswer, isCompleted]);

  const handleOptionKeyDown = (event, option) => {
      if (!isAnswered && (event.key === 'Enter' || event.key === ' ')) {
          checkAnswer(option);
          event.preventDefault();
      }
  };

  const isCompleted = currentIndex >= totalItemsInSet && totalItemsInSet > 0 && !isLoading;
  const finalMistakeCount = missedItems.size;

  // --- Render Logic ---
   if (isLoading) { return <div className="loading">Memuat kata Karangan...</div>; }
   if (error) { return <div className="error">{error}</div>; }

  // --- Completion Screen ---
  if (isCompleted) {
      // ... (Completion screen logic remains the same)
       const completionText = isReviewing ? "✨ Sesi Review Karangan Selesai! ✨" : "✨ Latihan Karangan Selesai! ✨";
       const mistakesToShow = finalMistakeCount;
     return ( <div className={styles.container}> <p className="completionMessage">{completionText}</p> {!isReviewing && mistakesToShow > 0 && ( <p className="completionSubMessage">Anda membuat {mistakesToShow} kesalahan.</p> )} <div className={styles.completionActions}> {finalMistakeCount > 0 && !isReviewing && ( <button className="secondaryButton" onClick={handleReviewMistakes}>🔁 Ulangi Kesalahan ({finalMistakeCount})</button> )} <button className="primaryButton" onClick={handleReshuffleAll}>{isReviewing ? 'Mulai Lagi Semua' : 'Ulangi Semua'}</button> </div> </div> );
   }

   // --- Active Question Screen ---
   if (!currentItem) { return <div className="loading">Memuat kata berikutnya...</div>; }

  return (
    <div className={styles.container} ref={pageRef} tabIndex={-1}>
       <ProgressBar current={currentIndex + 1} total={totalItemsInSet} label={isReviewing ? "Review Kesalahan" : "Karangan Vocab"} />
        <div className={styles.card}>
            <h2 className={styles.word}>{currentItem.word || '[N/A]'}</h2>
            {currentItem.synonyms && currentItem.synonyms.length > 0 && (
                <div className={styles.synonymSection}>
                    <p className={styles.synonymLabel}>Sinonim (Mungkin Membantu):</p>
                    <p className={styles.synonymText}>{currentItem.synonyms.join(', ')}</p>
                </div>
            )}
        </div>
        <div className={styles.optionsContainer} role="radiogroup" aria-labelledby="instruction-karangan">
             {/* Use the state variable isCorrect here */}
            <p className={styles.instruction} id="instruction-karangan">Pilih definisi (English meaning) yang paling tepat (Gunakan 1, 2, 3):</p>
            {options.map((option, index) => {
              const isCorrectOption = currentItem?.definition?.toLowerCase() === option.toLowerCase();
              let buttonClassName = styles.optionButton;
              if (isAnswered) {
                if (isCorrectOption) buttonClassName += ` ${styles.correct}`;
                else if (selectedAnswer === option) buttonClassName += ` ${styles.incorrect}`;
                else buttonClassName += ` ${styles.disabled}`;
              }
              return (
                <button
                  key={`${currentItem.id}-def-${index}`}
                  ref={optionButtonRefs.current[index]}
                  className={buttonClassName}
                  onClick={() => checkAnswer(option)}
                  onKeyDown={(e) => handleOptionKeyDown(e, option)}
                  disabled={isAnswered}
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
         {/* Use the state variable isCorrect here */}
        {isAnswered && feedback && (
            <div className={`${styles.feedback} ${isCorrect ? styles.correctFeedback : styles.incorrectFeedback}`} role="alert">
                 {feedback}
            </div>
        )}
         {/* Use the state variable isCorrect here */}
        {isAnswered && !isCorrect && (
            <button className="nextButton" ref={nextButtonRef} onClick={loadNextItem}>
                Lanjut <span className="arrowIcon">→</span>
            </button>
        )}
    </div>
  );
};

export default KaranganPage;
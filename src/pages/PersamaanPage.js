// src/pages/PersamaanPage.js
// Added keyboard navigation (numbers, Enter, Space) + focus management
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react'; // Import useRef
import { persamaanData } from '../data/persamaan';
import styles from './PersamaanPage.module.css';
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
    // ... (getDistractors function remains the same as previous version)
     const distractors = new Set();
    if (!Array.isArray(allItems) || !currentItem || !currentItem.synonyms) return [];
    const potentialDistractorItems = allItems.filter(item => item.id !== currentItem.id && item.word && item.synonyms && item.synonyms.length > 0);
    const shuffledPool = shuffleArray([...potentialDistractorItems]);
    const currentSynonymsLower = currentItem.synonyms.map(s => s.toLowerCase());
    for (const item of shuffledPool) {
        if (distractors.size >= count) break;
        if (item.synonyms && item.synonyms.length > 0) {
            const potentialDistractor = item.synonyms.find(syn => syn.toLowerCase() !== item.word.toLowerCase()) || item.synonyms[0];
             if (potentialDistractor) {
                const potentialDistractorLower = potentialDistractor.toLowerCase();
                 if (!currentSynonymsLower.includes(potentialDistractorLower) && !Array.from(distractors).map(d => d.toLowerCase()).includes(potentialDistractorLower)) {
                    distractors.add(potentialDistractor);
                }
            }
        }
    }
    let fallbackCounter = 1;
    while (distractors.size < count) {
        const fallback = `[Opsi Sinonim ${String.fromCharCode(65 + distractors.size + fallbackCounter)}]`;
         if (!currentSynonymsLower.includes(fallback.toLowerCase()) && !Array.from(distractors).map(d => d.toLowerCase()).includes(fallback.toLowerCase())) {
           distractors.add(fallback);
        }
        fallbackCounter++;
        if (fallbackCounter > 10 + count) break;
    }
    return Array.from(distractors);
};

const LOCAL_STORAGE_KEY = 'kataPultPersamaanState_v2';

const PersamaanPage = () => {
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

  // --- Refs ---
  const optionButtonRefs = useRef([]); // Array of refs for option buttons
  const pageRef = useRef(null); // Ref for main container
  const nextButtonRef = useRef(null); // Ref for next button

  // --- Memoized Values ---
  const { currentItem, totalItemsInSet } = useMemo(() => {
      const item = (displayItems && displayItems.length > 0 && currentIndex < displayItems.length)
          ? displayItems[currentIndex]
          : null;
      return { currentItem: item, totalItemsInSet: displayItems?.length || 0 };
  }, [displayItems, currentIndex]);

  // --- Data Loading & Initialization ---
  const loadData = useCallback((itemsToLoad, isReviewSession) => {
      // ... (loadData logic remains the same)
      setIsLoading(true); setError(null);
      try {
          if (!itemsToLoad || !Array.isArray(itemsToLoad) || itemsToLoad.length === 0) throw new Error("No valid Persamaan data.");
          setDisplayItems(shuffleArray([...itemsToLoad]));
          setCurrentIndex(0); setIsReviewing(isReviewSession);
          setIsAnswered(false); setFeedback(''); setSelectedAnswer(null);
          if (!isReviewSession) { setMissedItems(new Set()); localStorage.removeItem(LOCAL_STORAGE_KEY); }
      } catch (err) { console.error("Error loading Persamaan:", err); setError(err.message); setDisplayItems([]); }
      finally { setIsLoading(false); }
  }, []);

  useEffect(() => {
    // ... (Initial load from localStorage logic remains the same)
    setIsLoading(true); setError(null); let initialLoadItems = [];
    try {
        const filteredData = persamaanData.filter(item => item.word && item.synonyms && item.synonyms.length > 0);
        if (filteredData.length === 0) throw new Error("No valid Persamaan data found.");
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
    } catch (err) { console.error("Error init Persamaan:", err); setError(err.message); setAllItems([]); setDisplayItems([]); }
    finally { setIsLoading(false); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Load on mount only


  // --- Save State ---
  useEffect(() => {
    // ... (save state logic remains the same)
     if (isLoading || error || !displayItems || displayItems.length === 0) return;
    const isCompleted = currentIndex >= displayItems.length;
     if (isCompleted) return;
    try {
      const stateToSave = { currentIndex: currentIndex, displayItemIds: displayItems.map(item => item.id), missedItems: Array.from(missedItems), isReviewing: isReviewing, };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (err) { console.error("Failed to save Persamaan state:", err); }
  }, [currentIndex, displayItems, missedItems, isReviewing, isLoading, error]);


  // --- Generate Options ---
  const generateOptions = useCallback(() => {
    if (!currentItem || !Array.isArray(currentItem.synonyms) || currentItem.synonyms.length === 0 || !Array.isArray(allItems) || allItems.length === 0) {
        setOptions([]);
        return;
    }
    const correctSynonym = currentItem.synonyms[Math.floor(Math.random() * currentItem.synonyms.length)];
    const distractors = getDistractors(allItems, currentItem, 2);
    const allOptions = shuffleArray([correctSynonym, ...distractors]);
    setOptions(allOptions);
    optionButtonRefs.current = allOptions.map((_, i) => optionButtonRefs.current[i] || React.createRef()); // Initialize or keep refs

  }, [currentItem, allItems]);

  useEffect(() => {
    if (!isLoading && currentItem) {
        generateOptions();
        setSelectedAnswer(null);
        setFeedback('');
        setIsAnswered(false);
        // Focus the first option button when new question loads
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
         setError("Tidak dapat memulai review kesalahan Persamaan.");
    }
  };

  const loadNextItem = useCallback(() => {
     if (!displayItems || displayItems.length === 0) return;
     if (currentIndex < displayItems.length) {
        setCurrentIndex(prevIndex => prevIndex + 1);
    }
  }, [currentIndex, displayItems]);

  const checkAnswer = useCallback((selectedOption) => {
    if (isAnswered || !currentItem || !currentItem.synonyms) return;

    setSelectedAnswer(selectedOption);
    setIsAnswered(true);

    const correctSynonymsLower = currentItem.synonyms.map(s => s.toLowerCase());
    const isCorrect = correctSynonymsLower.includes(selectedOption.toLowerCase());

    if (isCorrect) {
      setFeedback('Tepat! Sinonim Benar. 👍');
      setTimeout(loadNextItem, 1500);
    } else {
      setFeedback(`Kurang Tepat. Sinonim: ${currentItem.synonyms.join(', ')}`);
      if (!isReviewing) {
            setMissedItems(prev => new Set(prev).add(currentItem.id));
      }
      // Focus the next button after incorrect answer
      setTimeout(() => nextButtonRef.current?.focus(), 0);
    }
  }, [isAnswered, currentItem, isReviewing, loadNextItem]); // Removed redundant state deps


  // --- Keyboard Navigation ---
  useEffect(() => {
    const handlePageKeyDown = (event) => {
      if (isCompleted) return; // Don't process keys on completion screen

      // Handle number keys for MCQ selection (if not answered)
      if (!isAnswered && ['1', '2', '3'].includes(event.key)) {
        const optionIndex = parseInt(event.key, 10) - 1;
        if (options[optionIndex]) {
          checkAnswer(options[optionIndex]);
          // Prevent default number input behavior if needed
          event.preventDefault();
        }
      }
      // Handle Enter key
      else if (event.key === 'Enter') {
          // If incorrect answer shown, Enter triggers Next button
          if (isAnswered && !isCorrect) {
             loadNextItem();
             event.preventDefault(); // Prevent potential form submission if inside one
          }
          // If an option button has focus, Enter should trigger it (handled by handleOptionKeyDown)
      }
    };

    const pageElement = pageRef.current;
    if (pageElement) {
        // Use keydown for better capture of Enter/Numbers
        pageElement.addEventListener('keydown', handlePageKeyDown);
    }
    return () => {
        if (pageElement) {
            pageElement.removeEventListener('keydown', handlePageKeyDown);
        }
    };
  }, [isAnswered, isCorrect, loadNextItem, options, checkAnswer, isCompleted]); // Include dependencies

  // Handle Enter/Space on focused option buttons
  const handleOptionKeyDown = (event, option) => {
      if (!isAnswered && (event.key === 'Enter' || event.key === ' ')) {
          checkAnswer(option);
          event.preventDefault(); // Prevent default button action / scrolling
      }
  };


  const isCompleted = currentIndex >= totalItemsInSet && totalItemsInSet > 0 && !isLoading;
  const finalMistakeCount = missedItems.size;

  // --- Render Logic ---
  if (isLoading) { return <div className="loading">Memuat sinonim...</div>; }
  if (error) { return <div className="error">{error}</div>; }

  if (isCompleted) {
      const completionText = isReviewing ? "✨ Sesi Review Persamaan Selesai! ✨" : "✨ Latihan Persamaan Selesai! ✨";
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

   if (!currentItem) { return <div className="loading">Memuat kata berikutnya...</div>; }

  return (
    // Add ref and tabIndex to container for keyboard listener
    <div className={styles.container} ref={pageRef} tabIndex={-1}>
        <ProgressBar current={currentIndex + 1} total={totalItemsInSet} label={isReviewing ? "Review Kesalahan" : "Persamaan"} />
        <div className={styles.card}>
            <p className={styles.label}>Carikan persamaan kata (sinonim) untuk:</p>
            <h2 className={styles.word}>{currentItem.word || '[N/A]'}</h2>
        </div>
        <div className={styles.optionsContainer} role="radiogroup" aria-labelledby="instruction-persamaan">
            <p className={styles.instruction} id="instruction-persamaan">Pilih salah satu persamaannya (Gunakan tombol 1, 2, 3):</p>
            {options.map((option, index) => {
              const isCorrectOption = currentItem?.synonyms?.map(s => s.toLowerCase()).includes(option.toLowerCase()) ?? false;
              let buttonClassName = styles.optionButton;
              if (isAnswered) {
                if (isCorrectOption) buttonClassName += ` ${styles.correct}`;
                else if (selectedAnswer === option) buttonClassName += ` ${styles.incorrect}`;
                else buttonClassName += ` ${styles.disabled}`;
              }
              return (
                <button
                  key={`${currentItem.id}-option-${index}-${option}`}
                  ref={optionButtonRefs.current[index]} // Assign ref
                  className={buttonClassName}
                  onClick={() => checkAnswer(option)}
                  onKeyDown={(e) => handleOptionKeyDown(e, option)} // Handle Enter/Space on button focus
                  disabled={isAnswered}
                  role="radio" // Semantics for MCQ
                  aria-checked={selectedAnswer === option}
                  tabIndex={isAnswered ? -1 : 0} // Manage focusability
                >
                  <span className={styles.optionNumber}>{index + 1}.</span> {/* Display number */}
                  <span className={styles.optionText}>{option}</span>
                  {/* Icons added via CSS */}
                </button>
              );
            })}
        </div>
        {isAnswered && feedback && (
            <div className={`${styles.feedback} ${feedback.startsWith('Tepat') ? styles.correctFeedback : styles.incorrectFeedback}`} role="alert">
                 {feedback}
            </div>
        )}
        {isAnswered && feedback.startsWith('Kurang Tepat') && (
            // Add ref to next button
            <button className="nextButton" onClick={loadNextItem} ref={nextButtonRef}>
                Lanjut <span className="arrowIcon">→</span>
            </button>
        )}
    </div>
  );
};

export default PersamaanPage;
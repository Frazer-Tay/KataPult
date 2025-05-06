// src/pages/KaranganPage.js
// CORRECTED: Displays Indonesian word (and synonyms), asks to choose English definition via MCQ.
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { karanganData } from '../data/karangan'; // Uses karangan data
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

// Gets distractor DEFINITIONS from other items
const getDistractors = (allItems, currentItem, count = 2) => {
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

const LOCAL_STORAGE_KEY = 'kataPultKaranganState_v2'; // Use new key

const KaranganPage = () => {
  const [allItems, setAllItems] = useState([]);
  const [displayItems, setDisplayItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [options, setOptions] = useState([]); // MCQ options are English definitions
  const [selectedAnswer, setSelectedAnswer] = useState(null); // The chosen English definition
  const [feedback, setFeedback] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [missedItems, setMissedItems] = useState(new Set());
  const [isReviewing, setIsReviewing] = useState(false);

  const { currentItem, totalItemsInSet } = useMemo(() => {
      const item = (displayItems && displayItems.length > 0 && currentIndex < displayItems.length)
          ? displayItems[currentIndex]
          : null;
      return { currentItem: item, totalItemsInSet: displayItems?.length || 0 };
  }, [displayItems, currentIndex]);

  // Load Data helper
  const loadData = useCallback((itemsToLoad, isReviewSession) => {
      setIsLoading(true);
      setError(null);
      try {
          if (!itemsToLoad || !Array.isArray(itemsToLoad) || itemsToLoad.length === 0) {
              throw new Error("Tidak ada data Karangan yang valid untuk dimuat.");
          }
          setDisplayItems(shuffleArray([...itemsToLoad]));
          setCurrentIndex(0);
          setIsReviewing(isReviewSession);
          setIsAnswered(false);
          setFeedback('');
          setSelectedAnswer(null);
          if (!isReviewSession) {
              setMissedItems(new Set());
              localStorage.removeItem(LOCAL_STORAGE_KEY);
               console.log("Starting fresh full Karangan run, cleared saved state.");
          }
      } catch (err) {
          console.error("Error loading Karangan data:", err);
          setError("Gagal memuat data Karangan.");
          setDisplayItems([]);
      } finally {
          setIsLoading(false);
      }
  }, []); // Removed isReviewing

  // Initial Load / Load from localStorage
  useEffect(() => {
    setIsLoading(true);
    setError(null);
    try {
      const filteredData = karanganData.filter(item => item.word && item.definition);
      if (filteredData.length === 0) throw new Error("No valid Karangan data found in source.");
      setAllItems(filteredData);

      const savedStateJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedStateJSON) {
        const savedState = JSON.parse(savedStateJSON);
        if (savedState && typeof savedState.currentIndex === 'number' && Array.isArray(savedState.displayItems) && Array.isArray(savedState.missedItems)) {
            console.log("Resuming Karangan from saved state:", savedState);
            const currentAllItemsMap = new Map(filteredData.map(item => [item.id, item]));
            const validSavedDisplayItems = savedState.displayItems
                .map(savedItem => currentAllItemsMap.get(savedItem.id))
                .filter(Boolean);

             if(validSavedDisplayItems.length > 0 && savedState.currentIndex < validSavedDisplayItems.length) {
                setDisplayItems(validSavedDisplayItems);
                setCurrentIndex(savedState.currentIndex);
                setMissedItems(new Set(savedState.missedItems));
                setIsReviewing(savedState.isReviewing || false);
                setIsAnswered(false);
             } else {
                console.warn("Invalid Karangan saved state (items/index), starting fresh.");
                localStorage.removeItem(LOCAL_STORAGE_KEY);
                loadData(filteredData, false);
            }
        } else {
            console.warn("Invalid Karangan saved state structure, starting fresh.");
            localStorage.removeItem(LOCAL_STORAGE_KEY);
            loadData(filteredData, false);
        }
      } else {
        console.log("No saved Karangan state, starting fresh.");
        loadData(filteredData, false);
      }
    } catch (err) {
      console.error("Error initializing Karangan page:", err);
      setError("Gagal memuat data Karangan.");
      setAllItems([]);
      setDisplayItems([]);
    } finally {
      setIsLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Load on mount


  // Save state to localStorage
  useEffect(() => {
    if (isLoading || error || !displayItems || displayItems.length === 0) return;
    const isCompleted = currentIndex >= displayItems.length;
     if (isCompleted) return; // Don't save completed

    try {
      const stateToSave = {
        currentIndex: currentIndex,
        displayItems: displayItems.map(item => ({ id: item.id })), // Save IDs
        missedItems: Array.from(missedItems),
        isReviewing: isReviewing,
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (err) {
      console.error("Failed to save Karangan state:", err);
    }
  }, [currentIndex, displayItems, missedItems, isReviewing, isLoading, error]);


  // Generate MCQ options (English definitions)
  const generateOptions = useCallback(() => {
    if (!currentItem || !currentItem.definition || !Array.isArray(allItems) || allItems.length === 0) {
        setOptions([]);
        return;
    }
    const correctDefinition = currentItem.definition;
    const distractors = getDistractors(allItems, currentItem, 2); // Get 2 distractor definitions
    const allOptions = shuffleArray([correctDefinition, ...distractors]);
    setOptions(allOptions);
  }, [currentItem, allItems]); // Depend on allItems for distractors

  useEffect(() => {
    if (!isLoading && currentItem) {
        generateOptions();
        setSelectedAnswer(null);
        setFeedback('');
        setIsAnswered(false);
    } else if (!currentItem) {
       setOptions([]);
    }
  }, [currentItem, isLoading, generateOptions]);

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
     if (currentIndex < displayItems.length) { // Use length
        setCurrentIndex(prevIndex => prevIndex + 1);
    }
  }, [currentIndex, displayItems]);

  // Check if selected English definition matches the current item's definition
  const checkAnswer = (selectedOption) => {
    if (isAnswered || !currentItem || !currentItem.definition) return;
    setSelectedAnswer(selectedOption);
    setIsAnswered(true);
    const isCorrect = selectedOption.toLowerCase() === currentItem.definition.toLowerCase();

    if (isCorrect) {
      setFeedback('Tepat! Definisi Benar. 👍');
      setTimeout(loadNextItem, 1500);
    } else {
      setFeedback(`Kurang Tepat. Definisi: ${currentItem.definition}`);
      if (!isReviewing) {
            setMissedItems(prev => new Set(prev).add(currentItem.id));
      }
    }
  };

  const isCompleted = currentIndex >= totalItemsInSet && totalItemsInSet > 0 && !isLoading;
  const finalMistakeCount = missedItems.size;

  // --- Render Logic ---
   if (isLoading) { return <div className="loading">Memuat kata Karangan...</div>; }
   if (error) { return <div className="error">{error}</div>; }

  // --- Completion Screen ---
  if (isCompleted) {
      const completionText = isReviewing ? "✨ Sesi Review Karangan Selesai! ✨" : "✨ Latihan Karangan Selesai! ✨";
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

   // --- Active Question Screen ---
   if (!currentItem) { return <div className="loading">Memuat kata berikutnya...</div>; }

  return (
    <div className={styles.container}>
       <ProgressBar current={currentIndex + 1} total={totalItemsInSet} label={isReviewing ? "Review Kesalahan" : "Karangan Vocab"} />
        <div className={styles.card}>
            <h2 className={styles.word}>{currentItem.word || '[N/A]'}</h2>
            {currentItem.synonyms && currentItem.synonyms.length > 0 && (
                <div className={styles.synonymSection}>
                    <p className={styles.synonymLabel}>Sinonim (Mungkin Membantu):</p> {/* Adjusted label */}
                    <p className={styles.synonymText}>{currentItem.synonyms.join(', ')}</p>
                </div>
            )}
        </div>
        <div className={styles.optionsContainer}>
            <p className={styles.instruction}>Pilih definisi (English meaning) yang paling tepat:</p>
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
                  className={buttonClassName}
                  onClick={() => checkAnswer(option)}
                  disabled={isAnswered}
                  aria-pressed={selectedAnswer === option}
                >
                  <span className={styles.optionText}>{option}</span>
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
            <button className="nextButton" onClick={loadNextItem}>Lanjut <span className="arrowIcon">→</span></button>
        )}
    </div>
  );
};

export default KaranganPage;
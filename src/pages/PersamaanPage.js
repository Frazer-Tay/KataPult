// src/pages/PersamaanPage.js
// CORRECTED: Displays an Indonesian word, asks to choose Indonesian synonym via MCQ.
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { persamaanData } from '../data/persamaan'; // Uses persamaan data
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

// Gets distractor SYNONYMS from other items
const getDistractors = (allItems, currentItem, count = 2) => {
    const distractors = new Set();
    if (!Array.isArray(allItems) || !currentItem || !currentItem.synonyms) return [];
    const potentialDistractorItems = allItems.filter(item => item.id !== currentItem.id && item.word && item.synonyms && item.synonyms.length > 0);
    const shuffledPool = shuffleArray([...potentialDistractorItems]);
    const currentSynonymsLower = currentItem.synonyms.map(s => s.toLowerCase());

    for (const item of shuffledPool) {
        if (distractors.size >= count) break;
        // Try getting a synonym from the distractor item that ISN'T the distractor item's main word itself
        const potentialDistractorSynonym = item.synonyms.find(syn => syn.toLowerCase() !== item.word.toLowerCase()) || item.synonyms[0];

        if (potentialDistractorSynonym) {
            const potentialDistractorLower = potentialDistractorSynonym.toLowerCase();
             // Check against current answers AND already added distractors
            if (!currentSynonymsLower.includes(potentialDistractorLower) && !Array.from(distractors).map(d => d.toLowerCase()).includes(potentialDistractorLower)) {
                distractors.add(potentialDistractorSynonym);
            }
        }
    }
    // Fallback
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

const LOCAL_STORAGE_KEY = 'kataPultPersamaanState_v2'; // Use new key if old state exists

const PersamaanPage = () => {
  const [allItems, setAllItems] = useState([]);
  const [displayItems, setDisplayItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [options, setOptions] = useState([]); // MCQ options are Indonesian words (synonyms/distractors)
  const [selectedAnswer, setSelectedAnswer] = useState(null); // The chosen Indonesian word
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

  // Load data helper
  const loadData = useCallback((itemsToLoad, isReviewSession) => {
      setIsLoading(true);
      setError(null);
      try {
          if (!itemsToLoad || !Array.isArray(itemsToLoad) || itemsToLoad.length === 0) {
              throw new Error("Tidak ada data persamaan yang valid untuk dimuat.");
          }
          setDisplayItems(shuffleArray([...itemsToLoad]));
          setCurrentIndex(0);
          setIsReviewing(isReviewSession);
          setIsAnswered(false);
          setFeedback('');
          setSelectedAnswer(null);
          if (!isReviewSession) {
              setMissedItems(new Set());
              localStorage.removeItem(LOCAL_STORAGE_KEY); // Clear state only on full reset
              console.log("Starting fresh full Persamaan run, cleared saved state.");
          }
      } catch (err) {
          console.error("Error loading Persamaan data:", err);
          setError("Gagal memuat data Persamaan.");
          setDisplayItems([]);
      } finally {
          setIsLoading(false);
      }
  }, []); // Removed isReviewing dependency

  // Initial Load / Load from localStorage
  useEffect(() => {
    setIsLoading(true);
    setError(null);
    try {
      const filteredData = persamaanData.filter(item => item.word && item.synonyms && item.synonyms.length > 0);
      if (filteredData.length === 0) throw new Error("No valid Persamaan data found in source.");
      setAllItems(filteredData);

      const savedStateJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedStateJSON) {
        const savedState = JSON.parse(savedStateJSON);
        if (savedState && typeof savedState.currentIndex === 'number' && Array.isArray(savedState.displayItems) && Array.isArray(savedState.missedItems)) {
            console.log("Resuming Persamaan from saved state:", savedState);
            const currentAllItemsMap = new Map(filteredData.map(item => [item.id, item]));
             const validSavedDisplayItems = savedState.displayItems
                .map(savedItem => currentAllItemsMap.get(savedItem.id))
                .filter(Boolean);

            if(validSavedDisplayItems.length > 0 && savedState.currentIndex < validSavedDisplayItems.length) {
                setDisplayItems(validSavedDisplayItems);
                setCurrentIndex(savedState.currentIndex);
                setMissedItems(new Set(savedState.missedItems));
                setIsReviewing(savedState.isReviewing || false);
                setIsAnswered(false); // Start unanswered
             } else {
                 console.warn("Invalid Persamaan saved state, starting fresh.");
                 localStorage.removeItem(LOCAL_STORAGE_KEY);
                 loadData(filteredData, false);
             }
        } else {
            console.warn("Invalid Persamaan saved state structure, starting fresh.");
            localStorage.removeItem(LOCAL_STORAGE_KEY);
            loadData(filteredData, false);
        }
      } else {
        console.log("No saved Persamaan state, starting fresh.");
        loadData(filteredData, false);
      }
    } catch (err) {
      console.error("Error initializing Persamaan page:", err);
      setError("Gagal memuat data Persamaan.");
      setAllItems([]);
      setDisplayItems([]);
    } finally {
      setIsLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Load on mount only


  // Save state to localStorage
  useEffect(() => {
    if (isLoading || error || !displayItems || displayItems.length === 0) return;
    const isCompleted = currentIndex >= displayItems.length;
     if (isCompleted) return; // Don't save completed state until reset

    try {
      const stateToSave = {
        currentIndex: currentIndex,
        displayItems: displayItems.map(item => ({ id: item.id })), // Save IDs
        missedItems: Array.from(missedItems),
        isReviewing: isReviewing,
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (err) {
      console.error("Failed to save Persamaan state:", err);
    }
  }, [currentIndex, displayItems, missedItems, isReviewing, isLoading, error]);


  // Generate options (Indonesian synonyms/distractors)
  const generateOptions = useCallback(() => {
    if (!currentItem || !Array.isArray(currentItem.synonyms) || currentItem.synonyms.length === 0 || !Array.isArray(allItems) || allItems.length === 0) {
        setOptions([]);
        return;
    }
    const correctSynonym = currentItem.synonyms[Math.floor(Math.random() * currentItem.synonyms.length)];
    const distractors = getDistractors(allItems, currentItem, 2);
    const allOptions = shuffleArray([correctSynonym, ...distractors]);
    setOptions(allOptions);
  }, [currentItem, allItems]);

  // Regenerate options when needed
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
         setError("Tidak dapat memulai review kesalahan Persamaan.");
    }
  };

  const loadNextItem = useCallback(() => {
     if (!displayItems || displayItems.length === 0) return;
     if (currentIndex < displayItems.length) {
        setCurrentIndex(prevIndex => prevIndex + 1);
    }
  }, [currentIndex, displayItems]);

  // Check if the selected Indonesian word is a synonym of the current word
  const checkAnswer = (selectedOption) => {
    if (isAnswered || !currentItem || !currentItem.synonyms) return;
    setSelectedAnswer(selectedOption);
    setIsAnswered(true);
    const correctSynonymsLower = currentItem.synonyms.map(s => s.toLowerCase());
    const isCorrect = correctSynonymsLower.includes(selectedOption.toLowerCase());

    if (isCorrect) {
      setFeedback('Tepat! Sinonim Benar. 👍');
      setTimeout(loadNextItem, 1500);
    } else {
      setFeedback(`Kurang Tepat. Sinonim yang benar: ${currentItem.synonyms.join(', ')}`);
      if (!isReviewing) {
            setMissedItems(prev => new Set(prev).add(currentItem.id));
      }
    }
  };

  const isCompleted = currentIndex >= totalItemsInSet && totalItemsInSet > 0 && !isLoading;
  const finalMistakeCount = missedItems.size;

  // --- Render Logic ---
  if (isLoading) { return <div className="loading">Memuat sinonim...</div>; }
  if (error) { return <div className="error">{error}</div>; }

  if (isCompleted) {
      const completionText = isReviewing ? "✨ Sesi Review Persamaan Selesai! ✨" : "✨ Latihan Persamaan Selesai! ✨";
      const mistakesToShow = finalMistakeCount; // Show count based on persisted set
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
    <div className={styles.container}>
        <ProgressBar current={currentIndex + 1} total={totalItemsInSet} label={isReviewing ? "Review Kesalahan" : "Persamaan"} />
        <div className={styles.card}>
            <p className={styles.label}>Carikan persamaan kata (sinonim) untuk:</p>
            <h2 className={styles.word}>{currentItem.word || '[N/A]'}</h2>
        </div>
        <div className={styles.optionsContainer}>
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

export default PersamaanPage;
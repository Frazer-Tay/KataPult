// src/pages/KaranganPage.js
import React, { useState, useEffect, useCallback, useMemo } from 'react';
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
        const fallback = `[Definisi Pilihan ${String.fromCharCode(65 + distractors.size + fallbackCounter)}]`;
        if (fallback.toLowerCase() !== correctDefinitionLower && !Array.from(distractors).map(d => d.toLowerCase()).includes(fallback.toLowerCase())) {
           distractors.add(fallback);
        }
        fallbackCounter++;
        if (fallbackCounter > 10 + count) break;
    }
    return Array.from(distractors);
};

const LOCAL_STORAGE_KEY = 'kataPultKaranganState';

const KaranganPage = () => {
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

  const { currentItem, totalItemsInSet } = useMemo(() => {
      const item = (displayItems && displayItems.length > 0 && currentIndex < displayItems.length)
          ? displayItems[currentIndex]
          : null;
      return { currentItem: item, totalItemsInSet: displayItems?.length || 0 };
  }, [displayItems, currentIndex]);

  // Load initial state or saved state
   useEffect(() => {
    setIsLoading(true);
    setError(null);
    try {
      const filteredData = karanganData.filter(item => item.word && item.definition);
      if (filteredData.length === 0) throw new Error("No valid Karangan data found.");
      setAllItems(filteredData);

      const savedStateJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedStateJSON) {
        const savedState = JSON.parse(savedStateJSON);
        if (savedState && typeof savedState.currentIndex === 'number' && Array.isArray(savedState.displayItems) && Array.isArray(savedState.missedItems)) {
             console.log("Resuming Karangan from saved state:", savedState);
             setDisplayItems(savedState.displayItems);
             setCurrentIndex(savedState.currentIndex);
             setMissedItems(new Set(savedState.missedItems));
             setIsReviewing(savedState.isReviewing || false);
             setIsAnswered(false);
        } else {
            console.warn("Invalid Karangan saved state, starting fresh.");
            localStorage.removeItem(LOCAL_STORAGE_KEY);
            loadDataSet(filteredData, false);
        }
      } else {
        console.log("No saved Karangan state, starting fresh.");
        loadDataSet(filteredData, false);
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


  const loadDataSet = useCallback((itemsToLoad, isReviewSession) => {
      setDisplayItems(shuffleArray([...itemsToLoad]));
      setCurrentIndex(0);
      setIsReviewing(isReviewSession);
      setIsAnswered(false);
      setFeedback('');
      setSelectedAnswer(null);
      if (!isReviewSession) {
          setMissedItems(new Set());
      }
      if (!isReviewSession) {
         localStorage.removeItem(LOCAL_STORAGE_KEY);
          console.log("Starting fresh full Karangan run, cleared saved state.");
      }
  }, []); // Removed isReviewing


  // Save state to localStorage
  useEffect(() => {
    if (isLoading || error || !displayItems || displayItems.length === 0) return;
    const isCompleted = currentIndex >= displayItems.length;
     if (isCompleted) return; // Don't save completed state until reset

    try {
      const stateToSave = {
        currentIndex: currentIndex,
        displayItems: displayItems,
        missedItems: Array.from(missedItems),
        isReviewing: isReviewing,
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (err) {
      console.error("Failed to save Karangan state:", err);
    }
  }, [currentIndex, displayItems, missedItems, isReviewing, isLoading, error]);


  const generateOptions = useCallback(() => {
    if (!currentItem || !currentItem.definition || !Array.isArray(allItems) || allItems.length === 0) {
        setOptions([]);
        return;
    }
    const correctDefinition = currentItem.definition;
    const distractors = getDistractors(allItems, currentItem, 2);
    const allOptions = shuffleArray([correctDefinition, ...distractors]);
    setOptions(allOptions);
  }, [currentItem, allItems]);

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
    loadDataSet(allItems, false);
  };

  const handleReviewMistakes = () => {
    const mistakeIds = Array.from(missedItems);
    if (mistakeIds.length === 0) return;
    const itemsToReview = allItems.filter(item => mistakeIds.includes(item.id));
     if (itemsToReview.length > 0) {
        setIsReviewing(true);
        loadDataSet(itemsToReview, true);
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
   if (isLoading) {
    return <div className="loading">Memuat kata Karangan...</div>;
  }
  if (error) {
    return <div className="error">{error}</div>;
  }

  // --- Completion Screen ---
  if (isCompleted) {
      const completionText = isReviewing
        ? "✨ Sesi Review Karangan Selesai! ✨"
        : "✨ Latihan Karangan Selesai! ✨";
       // Show mistakes count based on the persisted set before review started
      const mistakesToShow = finalMistakeCount;

    return (
      <div className={styles.container}>
          <p className="completionMessage">{completionText}</p>
          {!isReviewing && mistakesToShow > 0 && (
             <p className="completionSubMessage">
                 Anda membuat {mistakesToShow} kesalahan pada putaran awal.
             </p>
          )}
          <div className={styles.completionActions}>
              {finalMistakeCount > 0 && !isReviewing && (
                   <button className="secondaryButton" onClick={handleReviewMistakes}>
                      🔁 Ulangi Kesalahan ({finalMistakeCount})
                   </button>
              )}
              <button className="primaryButton" onClick={handleReshuffleAll}>
                   {isReviewing ? 'Mulai Lagi Semua' : 'Ulangi Semua'}
              </button>
          </div>
      </div>
    );
  }

   // --- Active Question Screen ---
   if (!currentItem) {
     return <div className="loading">Memuat kata berikutnya...</div>;
   }

  return (
    <div className={styles.container}>
        <ProgressBar
            current={currentIndex + 1}
            total={totalItemsInSet}
            label={isReviewing ? "Review Kesalahan" : "Karangan Vocab"}
        />

        <div className={styles.card}>
            <h2 className={styles.word}>{currentItem.word || '[N/A]'}</h2>
            {currentItem.synonyms && currentItem.synonyms.length > 0 && (
                <div className={styles.synonymSection}>
                    <p className={styles.synonymLabel}>Sinonim:</p>
                    <p className={styles.synonymText}>{currentItem.synonyms.join(', ')}</p>
                </div>
            )}
        </div>

        <div className={styles.optionsContainer}>
            <p className={styles.instruction}>Pilih definisi (arti) yang paling tepat:</p>
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
            <button className="nextButton" onClick={loadNextItem}>
            Lanjut <span className="arrowIcon">→</span>
            </button>
        )}
    </div>
  );
};

export default KaranganPage;
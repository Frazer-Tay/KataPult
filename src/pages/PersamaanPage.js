// src/pages/PersamaanPage.js
import React, { useState, useEffect, useCallback, useMemo } from 'react';
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

// Moved getDistractors outside, ensuring it receives necessary data as arguments
const getDistractors = (allItems, currentItem, count = 2) => {
    const distractors = new Set();
    if (!Array.isArray(allItems) || !currentItem || !currentItem.synonyms) {
        console.error("Invalid input to getDistractors in Persamaan");
        return [];
    }
    const potentialDistractorItems = allItems.filter(item => item.id !== currentItem.id && item.word && item.synonyms && item.synonyms.length > 0);
    const shuffledPool = shuffleArray([...potentialDistractorItems]);
    const currentSynonymsLower = currentItem.synonyms.map(s => s.toLowerCase());

    for (const item of shuffledPool) {
        if (distractors.size >= count) break;
        // Ensure synonyms array exists and has items
        if (item.synonyms && item.synonyms.length > 0) {
            const potentialDistractor = item.synonyms[0]; // Simple strategy
            const potentialDistractorLower = potentialDistractor.toLowerCase();
             // Check against current answers and already added distractors
            if (!currentSynonymsLower.includes(potentialDistractorLower) && !Array.from(distractors).map(d => d.toLowerCase()).includes(potentialDistractorLower)) {
                distractors.add(potentialDistractor);
            }
        }
    }
    // Fallback
    let fallbackCounter = 1;
    while (distractors.size < count) {
        const fallback = `[Opsi ${String.fromCharCode(65 + distractors.size + fallbackCounter)}]`;
         if (!currentSynonymsLower.includes(fallback.toLowerCase()) && !Array.from(distractors).map(d => d.toLowerCase()).includes(fallback.toLowerCase())) {
           distractors.add(fallback);
        }
        fallbackCounter++;
        if (fallbackCounter > 10 + count) break;
    }
    return Array.from(distractors);
};


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
  const [missedItems, setMissedItems] = useState(new Set());
  const [isReviewing, setIsReviewing] = useState(false);
  const [mistakesMadeCountDuringRun, setMistakesMadeCountDuringRun] = useState(0);

  const { currentItem, totalItemsInSet } = useMemo(() => {
      const item = (displayItems && displayItems.length > 0 && currentIndex < displayItems.length)
          ? displayItems[currentIndex]
          : null;
      return { currentItem: item, totalItemsInSet: displayItems?.length || 0 };
  }, [displayItems, currentIndex]);

  const loadData = useCallback((itemsToLoad) => {
      setIsLoading(true);
      setError(null);
      try {
          if (!itemsToLoad || !Array.isArray(itemsToLoad) || itemsToLoad.length === 0) {
              throw new Error("Tidak ada data persamaan yang valid untuk dimuat.");
          }
          setDisplayItems(shuffleArray([...itemsToLoad]));
          setCurrentIndex(0);
          setMissedItems(new Set());
          setMistakesMadeCountDuringRun(0);
          setIsAnswered(false); // Ensure reset on load/reload
      } catch (err) {
          console.error("Error loading Persamaan data:", err);
          setError("Gagal memuat data Persamaan.");
          setDisplayItems([]);
      } finally {
          setIsLoading(false);
      }
  }, []);

  // Initial Load
  useEffect(() => {
    const filteredData = persamaanData.filter(item => item.word && item.synonyms && item.synonyms.length > 0);
    setAllItems(filteredData);
    loadData(filteredData);
  }, [loadData]);


  // Generate options when currentItem or *allItems* change
  const generateOptions = useCallback(() => {
      // Use allItems to get distractors, ensuring it's available
    if (!currentItem || !Array.isArray(currentItem.synonyms) || currentItem.synonyms.length === 0 || !Array.isArray(allItems) || allItems.length === 0) {
        setOptions([]);
        return;
    }
    const correctSynonym = currentItem.synonyms[Math.floor(Math.random() * currentItem.synonyms.length)];
    // Pass allItems here explicitly
    const distractors = getDistractors(allItems, currentItem, 2);
    const allOptions = shuffleArray([correctSynonym, ...distractors]);
    setOptions(allOptions);

  }, [currentItem, allItems]); // Depend on allItems now

  // Regenerate options when dependencies change
  useEffect(() => {
    if (!isLoading && currentItem) {
        generateOptions();
        // Reset answer state for the new question
        setSelectedAnswer(null);
        setFeedback('');
        setIsAnswered(false);
    } else if (!currentItem) {
       setOptions([]);
    }
  }, [currentItem, isLoading, generateOptions]); // generateOptions now depends on allItems too

  const handleReshuffleAll = () => {
    setIsReviewing(false);
    loadData(allItems);
  };

  const handleReviewMistakes = () => {
    const mistakeIds = Array.from(missedItems);
    if (mistakeIds.length === 0) return;
    const itemsToReview = allItems.filter(item => mistakeIds.includes(item.id));
     if (itemsToReview.length > 0) {
        setIsReviewing(true);
        loadData(itemsToReview);
    } else {
         console.warn("Mistake IDs found, but no matching items in allItems for Persamaan review.");
         setError("Tidak dapat memulai review kesalahan Persamaan.");
    }
  };

  const loadNextItem = useCallback(() => {
     if (!displayItems || displayItems.length === 0) return;
     if (currentIndex < displayItems.length - 1) {
        setCurrentIndex(prevIndex => prevIndex + 1);
    } else {
         setCurrentIndex(displayItems.length);
    }
  }, [currentIndex, displayItems]);

  const checkAnswer = (selectedOption) => {
    if (isAnswered || !currentItem || !currentItem.synonyms) return;

    setSelectedAnswer(selectedOption);
    setIsAnswered(true);

    const correctSynonymsLower = currentItem.synonyms.map(s => s.toLowerCase());
    const isCorrect = correctSynonymsLower.includes(selectedOption.toLowerCase());

    if (isCorrect) {
      setFeedback('Tepat! Jawaban Benar.');
      setTimeout(loadNextItem, 1500);
    } else {
      const allAnswers = currentItem.synonyms.join(', ');
      setFeedback(`Kurang Tepat. Sinonim: ${allAnswers}`);
      if (!isReviewing) {
            setMissedItems(prev => new Set(prev).add(currentItem.id));
            setMistakesMadeCountDuringRun(prev => prev + 1);
      }
    }
  };

  const isCompleted = currentIndex >= totalItemsInSet && totalItemsInSet > 0 && !isLoading;
  const finalMistakeCount = missedItems.size; // Use this for completion button logic

  // --- Render Logic ---
  if (isLoading) {
    return <div className={styles.loading}>Memuat sinonim...</div>;
  }
  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  // --- Completion Screen ---
  if (isCompleted) {
      const completionText = isReviewing
        ? "✨ Sesi Review Selesai! ✨"
        : "✨ Latihan Persamaan Selesai! ✨";
      const mistakesToShow = isReviewing ? 0 : mistakesMadeCountDuringRun;
    return (
      <div className={styles.container}>
          <p className={styles.completionMessage}>{completionText}</p>
          {mistakesToShow > 0 && (
             <p className={styles.completionSubMessage}>
                 Anda membuat {mistakesToShow} kesalahan pada putaran ini.
             </p>
          )}
          <div className={styles.completionActions}>
              {/* Use finalMistakeCount (from the Set) to decide if Review button shows */}
              {finalMistakeCount > 0 && (
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
     return <div className={styles.loading}>Memuat kata berikutnya...</div>;
   }

  return (
    <div className={styles.container}>
        <ProgressBar
            current={currentIndex + 1}
            total={totalItemsInSet}
            label={isReviewing ? "Review Kesalahan" : "Progress"}
        />

        <div className={styles.card}>
            <p className={styles.label}>Carikan persamaan kata untuk:</p>
            <h2 className={styles.word}>{currentItem.word || '[N/A]'}</h2>
        </div>

        <div className={styles.optionsContainer}>
            {options.map((option, index) => {
              // Ensure currentItem and synonyms exist before checking
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

export default PersamaanPage;
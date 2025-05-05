// src/pages/KaranganPage.js
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { karanganData } from '../data/karangan';
import styles from './KaranganPage.module.css';
import ProgressBar from '../components/ProgressBar'; // Assuming ProgressBar component exists

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
              throw new Error("Tidak ada data Karangan yang valid untuk dimuat.");
          }
          setDisplayItems(shuffleArray([...itemsToLoad]));
          setCurrentIndex(0);
          setMissedItems(new Set());
          setMistakesMadeCountDuringRun(0);
      } catch (err) {
          console.error("Error loading Karangan data:", err);
          setError("Gagal memuat data Karangan.");
          setDisplayItems([]);
      } finally {
          setIsLoading(false);
      }
  }, []);

  useEffect(() => {
    const filteredData = karanganData.filter(item => item.word && item.definition);
    setAllItems(filteredData);
    loadData(filteredData);
  }, [loadData]);

  const generateOptions = useCallback(() => {
    if (!currentItem || !Array.isArray(currentItem.synonyms) || !currentItem.definition || !Array.isArray(allItems) || allItems.length === 0) {
        setOptions([]);
        return;
    }
    const correctDefinition = currentItem.definition;
    const distractors = getDistractors(allItems, currentItem, 2);
    const allOptions = shuffleArray([correctDefinition, ...distractors]);
    setOptions(allOptions);

  }, [currentItem, allItems]); // Use allItems for distractors

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
    loadData(allItems);
  };

  const handleReviewMistakes = () => {
    if (mistakesMadeCountDuringRun === 0) return;
    const itemsToReview = allItems.filter(item => missedItems.has(item.id));
     if (itemsToReview.length > 0) {
        setIsReviewing(true);
        loadData(itemsToReview);
    } else {
         console.warn("Mistake IDs found, but no matching items in allItems for Karangan review.");
         setError("Tidak dapat memulai review kesalahan Karangan.");
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
    if (isAnswered || !currentItem || !currentItem.definition) return;

    setSelectedAnswer(selectedOption);
    setIsAnswered(true);

    const isCorrect = selectedOption.toLowerCase() === currentItem.definition.toLowerCase();

    if (isCorrect) {
      setFeedback('Tepat! Definisi Benar.');
      setTimeout(loadNextItem, 1500);
    } else {
      setFeedback(`Kurang Tepat. Definisi: ${currentItem.definition}`);
      if (!isReviewing) {
            setMissedItems(prev => new Set(prev).add(currentItem.id));
            setMistakesMadeCountDuringRun(prev => prev + 1);
      }
    }
  };

  const isCompleted = currentIndex >= totalItemsInSet && totalItemsInSet > 0 && !isLoading;

   // --- Render Logic ---
   if (isLoading) {
    return <div className={styles.loading}>Memuat kata Karangan...</div>;
  }
  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  // --- Completion Screen ---
  if (isCompleted) {
      const completionText = isReviewing
        ? "✨ Sesi Review Karangan Selesai! ✨"
        : "✨ Latihan Karangan Selesai! ✨";
    return (
      <div className={styles.container}>
          <p className={styles.completionMessage}>{completionText}</p>
          {!isReviewing && mistakesMadeCountDuringRun > 0 && (
             <p className={styles.completionSubMessage}>
                 Anda membuat {mistakesMadeCountDuringRun} kesalahan pada putaran ini.
             </p>
          )}
          <div className={styles.completionActions}>
              {!isReviewing && mistakesMadeCountDuringRun > 0 && (
                   <button className="secondaryButton" onClick={handleReviewMistakes}>
                      🔁 Ulangi Kesalahan ({mistakesMadeCountDuringRun})
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
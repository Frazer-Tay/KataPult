// src/pages/VocabularyPage.js
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { vocabularyData } from '../data/vocabulary';
import styles from './VocabularyPage.module.css'; // Import the CSS module
import ProgressBar from '../components/ProgressBar'; // Assuming ProgressBar component exists

// Utility function (consider moving to a utils file)
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

const VocabularyPage = () => {
  const [allItems, setAllItems] = useState([]); // Store the original full list
  const [displayItems, setDisplayItems] = useState([]); // Items currently being shown/shuffled
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { currentItem, totalItemsInSet } = useMemo(() => {
      const item = (displayItems && displayItems.length > 0 && currentIndex < displayItems.length)
          ? displayItems[currentIndex]
          : null;
      return { currentItem: item, totalItemsInSet: displayItems?.length || 0 };
  }, [displayItems, currentIndex]);

  // Initial Load
  useEffect(() => {
    setIsLoading(true);
    setError(null);
    try {
      // Ensure data is valid array before proceeding
      if (!vocabularyData || !Array.isArray(vocabularyData) || vocabularyData.length === 0) {
        throw new Error("No valid vocabulary data found.");
      }
      const initialData = shuffleArray([...vocabularyData]);
      setAllItems([...vocabularyData]); // Store original for potential later use
      setDisplayItems(initialData);
      setCurrentIndex(0);
    } catch (err) {
      console.error("Error loading vocabulary data:", err);
      setError("Gagal memuat data Vocabulary.");
    } finally {
      setIsLoading(false);
    }
  }, []); // Run only on mount

  const handleReshuffleAll = () => {
    if (allItems.length === 0) {
         setError("Tidak ada data untuk diulang.");
         return;
    }
    setIsLoading(true);
    setError(null);
    // Reshuffle the *original* full list
    setDisplayItems(shuffleArray([...allItems]));
    setCurrentIndex(0);
    setIsLoading(false);
  };

  const loadNextWord = useCallback(() => {
    if (!displayItems || displayItems.length === 0) return;
    if (currentIndex < displayItems.length - 1) {
      setCurrentIndex(prevIndex => prevIndex + 1);
    } else {
      setCurrentIndex(displayItems.length); // Go beyond bounds for completion
    }
  }, [currentIndex, displayItems]);

  const isCompleted = currentIndex >= totalItemsInSet && totalItemsInSet > 0 && !isLoading;

  // --- Render Logic ---
  if (isLoading) {
    return <div className={styles.loading}>Memuat kata...</div>;
  }
  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      {/* Progress Bar */}
      {!isCompleted && totalItemsInSet > 0 && (
          <ProgressBar current={currentIndex + 1} total={totalItemsInSet} />
      )}

      {isCompleted ? (
        <>
            <p className={styles.completionMessage}>✨ Latihan Vocabulary Selesai! ✨</p>
            <button className={styles.primaryButton} onClick={handleReshuffleAll}>
                Ulangi Semua
            </button>
        </>
      ) : currentItem ? (
        <>
          <div className={styles.card}>
            <h2 className={styles.word}>{currentItem.word}</h2>
            <p className={styles.definition}>{currentItem.definition}</p>

            {currentItem.exampleSentence && (
                <div className={styles.exampleSection}>
                    <p className={styles.exampleLabel}>Contoh Kalimat (Example):</p>
                    <p className={styles.exampleSentence}>{currentItem.exampleSentence}</p>
                    {currentItem.exampleTranslation && (
                        <div className={styles.translationSection}>
                             <p className={styles.translationLabel}>Terjemahan Contoh (English):</p>
                             <p className={styles.translationText}>{currentItem.exampleTranslation}</p>
                        </div>
                    )}
                </div>
            )}
          </div>

          <button className={styles.nextButton} onClick={loadNextWord}>
            Lanjut <span className={styles.arrowIcon}>→</span>
          </button>
        </>
      ) : (
         // This case should ideally not be reached if loading/error/completion are handled
         <p className={styles.loading}>Memuat kata berikutnya atau data tidak ditemukan.</p>
      )}
    </div>
  );
};

export default VocabularyPage;
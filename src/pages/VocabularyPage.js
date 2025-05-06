// src/pages/VocabularyPage.js
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { vocabularyData } from '../data/vocabulary';
import styles from './VocabularyPage.module.css';
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

// Define a unique key for localStorage for this page
const LOCAL_STORAGE_KEY = 'kataPultVocabularyState';

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

  // Helper function to load/shuffle data and reset state
   const loadData = useCallback((itemsToLoad) => {
      try {
          if (!itemsToLoad || !Array.isArray(itemsToLoad) || itemsToLoad.length === 0) {
              throw new Error("No valid vocabulary data found.");
          }
          setDisplayItems(shuffleArray([...itemsToLoad]));
          setCurrentIndex(0);
          // Clear saved state when loading fresh full data
          localStorage.removeItem(LOCAL_STORAGE_KEY);
          console.log("Loaded fresh vocabulary set.");
          setError(null); // Clear any previous error
      } catch (err) {
           console.error("Error processing vocabulary data:", err);
           setError("Gagal memproses data Vocabulary.");
           setDisplayItems([]); // Clear display items on error
           setCurrentIndex(0);
      } finally {
          setIsLoading(false);
      }
  }, []); // No dependencies needed here

  // Load initial state from localStorage or fresh data
  useEffect(() => {
    setIsLoading(true);
    setError(null);
    try {
      // Get full dataset
      const filteredData = vocabularyData.filter(item => item.word && item.definition);
      if (filteredData.length === 0) {
        throw new Error("No valid vocabulary data found in source.");
      }
      setAllItems(filteredData); // Store original list

      // Check localStorage
      const savedStateJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedStateJSON) {
        const savedState = JSON.parse(savedStateJSON);
        // Validate saved state structure (basic check)
        if (savedState && typeof savedState.currentIndex === 'number' && Array.isArray(savedState.displayItems) && savedState.displayItems.length > 0) {
             console.log("Resuming vocabulary from saved state:", savedState);
             // Ensure displayItems are valid objects from the current allItems list
             // This prevents issues if the source data changed
             const currentAllItemsMap = new Map(filteredData.map(item => [item.id, item]));
             const validSavedDisplayItems = savedState.displayItems.map(savedItem => currentAllItemsMap.get(savedItem.id)).filter(Boolean); // Get full item from current data

             if (validSavedDisplayItems.length > 0 && savedState.currentIndex < validSavedDisplayItems.length) {
                 setDisplayItems(validSavedDisplayItems);
                 setCurrentIndex(savedState.currentIndex);
             } else {
                 console.warn("Saved displayItems are invalid or index out of bounds, starting fresh.");
                 localStorage.removeItem(LOCAL_STORAGE_KEY);
                 loadData(filteredData); // Load fresh data
             }
        } else {
            console.warn("Invalid saved state structure found, starting fresh.");
            localStorage.removeItem(LOCAL_STORAGE_KEY); // Clear invalid state
            loadData(filteredData); // Load fresh data
        }
      } else {
        console.log("No saved state found, starting fresh vocabulary.");
        loadData(filteredData); // Load fresh data if nothing saved
      }
    } catch (err) {
      console.error("Error initializing vocabulary page:", err);
      setError("Gagal memuat data Vocabulary.");
      setAllItems([]);
      setDisplayItems([]);
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only on mount


  // Save state to localStorage whenever critical state changes
  useEffect(() => {
    if (isLoading || error || !displayItems || displayItems.length === 0) return;

    const isCompleted = currentIndex >= displayItems.length;
     if (isCompleted) {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        console.log("Vocabulary session completed, cleared saved state.");
        return;
     }

    try {
      const stateToSave = {
        currentIndex: currentIndex,
        // Save only IDs in displayItems to make storage smaller and more resilient
        // We'll map back to full objects when loading
        displayItems: displayItems.map(item => ({ id: item.id })),
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (err) {
      console.error("Failed to save vocabulary state to localStorage:", err);
    }
  }, [currentIndex, displayItems, isLoading, error]);

  // Start over function
  const handleReshuffleAll = () => {
    if (allItems.length === 0) {
         setError("Tidak ada data untuk diulang.");
         return;
    }
    setIsLoading(true); // Show loading indicator briefly
    loadData(allItems); // This calls the helper which also clears localStorage
  };

  // Go to next word
  const loadNextWord = useCallback(() => {
    if (!displayItems || displayItems.length === 0) return;
    if (currentIndex < displayItems.length) {
      setCurrentIndex(prevIndex => prevIndex + 1);
    }
  }, [currentIndex, displayItems]);

  const isCompleted = currentIndex >= totalItemsInSet && totalItemsInSet > 0 && !isLoading;

  // --- Render Logic ---
  if (isLoading) {
      return <div className="loading">Memuat kata...</div>;
  }
  if (error) {
      return <div className="error">{error}</div>;
  }

  return (
    <div className={styles.container}>
      {!isCompleted && totalItemsInSet > 0 && (
          <ProgressBar current={currentIndex + 1} total={totalItemsInSet} label="Vocabulary Progress" />
      )}

      {isCompleted ? (
         <div className={styles.completionContainer}>
            <p className="completionMessage">✨ Selesai Melihat Vocabulary! ✨</p>
            <button className="primaryButton" onClick={handleReshuffleAll}>
                Mulai Lagi Semua
            </button>
        </div>
      ) : currentItem ? (
        <>
           <div className={styles.card}>
                <h2 className={styles.word}>{currentItem.word}</h2>
                <p className={styles.definition}>{currentItem.definition}</p>

                {currentItem.exampleSentence && (
                    <div className={styles.exampleSection}>
                        <h3 className={styles.sectionTitle}>Contoh Penggunaan</h3>
                        <p className={styles.exampleSentence}>"{currentItem.exampleSentence}"</p>
                        {currentItem.exampleTranslation && (
                            <div className={styles.translationSection}>
                                 <p className={styles.translationText}><em>(Translation: {currentItem.exampleTranslation})</em></p>
                            </div>
                        )}
                    </div>
                )}
           </div>

          <button className="nextButton" onClick={loadNextWord}>
            Lanjut <span className="arrowIcon">→</span>
          </button>
        </>
      ) : (
         <p className="loading">Tidak ada data vocabulary untuk ditampilkan.</p>
      )}
    </div>
  );
};

export default VocabularyPage;
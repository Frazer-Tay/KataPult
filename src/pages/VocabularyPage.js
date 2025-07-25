// src/pages/VocabularyPage.js
// CORRECTED: Keyboard navigation dependency for arrow keys
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { vocabularyData } from '../data/vocabulary';
import styles from './VocabularyPage.module.css';
import ProgressBar from '../components/ProgressBar';

const shuffleArray = (array) => { if (!Array.isArray(array)) return []; let currentIndex = array.length, randomIndex; while (currentIndex !== 0) { randomIndex = Math.floor(Math.random() * currentIndex); currentIndex--; [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]; } return array; };
const LOCAL_STORAGE_KEY = 'kataPultVocabularyState_v1';

const VocabularyPage = () => {
  const [allItems, setAllItems] = useState([]);
  const [displayItems, setDisplayItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const pageRef = useRef(null);
  const isCompletedRef = useRef(false); // Ref to track completion status

  const { currentItem, totalItemsInSet } = useMemo(() => {
    const item = (displayItems && displayItems.length > 0 && currentIndex >= 0 && currentIndex < displayItems.length)
        ? displayItems[currentIndex]
        : null;
    isCompletedRef.current = (currentIndex >= (displayItems?.length || 0) && (displayItems?.length || 0) > 0); // Update ref
    return { currentItem: item, totalItemsInSet: displayItems?.length || 0 };
  }, [displayItems, currentIndex]);

  const loadData = useCallback((itemsToLoad) => {
    setIsLoading(true); setError(null);
    try {
      if (!itemsToLoad || !Array.isArray(itemsToLoad) || itemsToLoad.length === 0) {
        throw new Error("No valid vocabulary data found.");
      }
      setDisplayItems(shuffleArray([...itemsToLoad]));
      setCurrentIndex(0);
      isCompletedRef.current = false; // Reset completion ref on new data load
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      setError(null);
    } catch (err) {
      console.error("Error processing vocabulary data:", err);
      setError(err.message || "Gagal memproses data Vocabulary.");
      setDisplayItems([]); setCurrentIndex(0);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    setIsLoading(true); setError(null);
    try {
      const filteredData = vocabularyData.filter(item => item.word && item.definition && item.exampleSentence && item.exampleTranslation);
      if (filteredData.length === 0) throw new Error("No valid vocabulary data with examples/translations.");
      setAllItems(filteredData);

      const savedStateJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedStateJSON) {
        const savedState = JSON.parse(savedStateJSON);
        if (savedState && typeof savedState.currentIndex === 'number' && Array.isArray(savedState.displayItemIds) && savedState.displayItemIds.length > 0) {
          const currentAllItemsMap = new Map(filteredData.map(item => [item.id, item]));
          const validSavedDisplayItems = savedState.displayItemIds.map(id => currentAllItemsMap.get(id)).filter(Boolean);

          if(validSavedDisplayItems.length > 0 && savedState.currentIndex < validSavedDisplayItems.length) {
            setDisplayItems(validSavedDisplayItems);
            setCurrentIndex(savedState.currentIndex);
          } else { loadData(filteredData); }
        } else { loadData(filteredData); }
      } else { loadData(filteredData); }
    } catch (err) {
      console.error("Error initializing vocabulary page:", err);
      setError(err.message || "Gagal memuat data Vocabulary.");
      setAllItems([]); setDisplayItems([]);
    } finally { setIsLoading(false); }
  }, [loadData]);

  useEffect(() => {
    if (isLoading || error || !displayItems || displayItems.length === 0) return;
    const isCompletedNow = currentIndex >= displayItems.length;
    isCompletedRef.current = isCompletedNow;

    if (isCompletedNow) {
      if (localStorage.getItem(LOCAL_STORAGE_KEY)) {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      }
      return;
    }
    try {
      const stateToSave = { currentIndex: currentIndex, displayItemIds: displayItems.map(item => item.id) };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (err) { console.error("Failed to save vocabulary state:", err); }
  }, [currentIndex, displayItems, isLoading, error]);

  const handleReshuffleAll = () => {
    if (allItems.length === 0) return;
    setIsLoading(true);
    loadData(allItems);
    // No need to focus pageRef here as the main focus will be on the next button
  };

  const advanceItem = useCallback((direction) => {
    if (!displayItems || displayItems.length === 0) return;
    let nextIdx = currentIndex;
    if (direction === 'next') {
      nextIdx = Math.min(currentIndex + 1, displayItems.length);
    } else if (direction === 'previous') {
      nextIdx = Math.max(currentIndex - 1, 0);
    }
    setCurrentIndex(nextIdx);
    // Focus logic for next/prev buttons can be handled by their own onFocus if needed
    // or ensure pageRef gets focus if buttons are disabled.
     if (pageRef.current) {
        pageRef.current.focus(); // Refocus container for subsequent key events
    }
  }, [currentIndex, displayItems]);

  useEffect(() => {
    const handleKeyDown = (event) => {
        if (isCompletedRef.current) return; // Use ref for immediate check
        if (event.key === 'ArrowRight' || event.key === 'Enter') {
            advanceItem('next');
            event.preventDefault();
        } else if (event.key === 'ArrowLeft') {
            advanceItem('previous');
            event.preventDefault();
        }
    };
    const pageElement = pageRef.current;
    // Add currentItem and !isLoading to ensure pageRef is focused only when content is ready
    if (pageElement && currentItem && !isLoading) {
        pageElement.addEventListener('keydown', handleKeyDown);
        pageElement.focus(); // Ensure page container has focus for arrow keys
    }
    return () => { if (pageElement) { pageElement.removeEventListener('keydown', handleKeyDown); }};
  // CRITICAL FIX: Added currentIndex, totalItemsInSet to dependency array
  }, [advanceItem, currentItem, isLoading, currentIndex, totalItemsInSet]);

  const isCompleted = currentIndex >= totalItemsInSet && totalItemsInSet > 0 && !isLoading;

  if (isLoading) { return <div className="loading">Memuat kosakata...</div>; }
  if (error) { return <div className="error">{error}</div>; }

  return (
    <div className={styles.container} ref={pageRef} tabIndex={-1}>
      {!isCompleted && totalItemsInSet > 0 && (
        <ProgressBar current={currentIndex + 1} total={totalItemsInSet} label="Kosakata" />
      )}
      {isCompleted ? (
        <div className={styles.completionContainer}>
          <p className="completionMessage">✨ Selesai Melihat Kosakata! ✨</p>
          <button className="primaryButton" onClick={handleReshuffleAll} autoFocus>
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
                    <p className={styles.translationText}><em>(Terjemahan: {currentItem.exampleTranslation})</em></p>
                  </div>
                )}
              </div>
            )}
          </div>
           <div className={styles.buttonRow} style={{ marginTop: '20px', justifyContent: 'space-between', width: '100%', maxWidth: '400px' }}>
              <button
                  className="secondaryButton"
                  onClick={() => advanceItem('previous')}
                  disabled={currentIndex === 0 || isLoading}
                  aria-label="Kata Sebelumnya"
              >
                  <span className="arrowIcon">←</span> Sebelumnya
              </button>
              <button
                  className="nextButton"
                  onClick={() => advanceItem('next')}
                  disabled={isLoading || (currentIndex >= totalItemsInSet -1 && isCompletedRef.current)}
                  aria-label="Kata Berikutnya"
              >
                  {currentIndex >= totalItemsInSet - 1 ? "Lihat Hasil" : "Lanjut"} <span className="arrowIcon">→</span>
              </button>
          </div>
        </>
      ) : (
        <p className="loading">Tidak ada data kosakata untuk ditampilkan. Coba segarkan.</p>
      )}
    </div>
  );
};
export default VocabularyPage;
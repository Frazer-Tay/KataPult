// src/pages/VocabularyPage.js
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react'; // Import useRef
import { vocabularyData } from '../data/vocabulary';
import styles from './VocabularyPage.module.css';
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

const LOCAL_STORAGE_KEY = 'kataPultVocabularyState';

const VocabularyPage = () => {
  const [allItems, setAllItems] = useState([]);
  const [displayItems, setDisplayItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  // Ref for the main container to attach key listener
  const pageRef = useRef(null);
  // Ref for the 'Next' button to focus it
  const nextButtonRef = useRef(null);

  const { currentItem, totalItemsInSet } = useMemo(() => {
      const item = (displayItems && displayItems.length > 0 && currentIndex < displayItems.length)
          ? displayItems[currentIndex]
          : null;
      return { currentItem: item, totalItemsInSet: displayItems?.length || 0 };
  }, [displayItems, currentIndex]);

  const loadData = useCallback((itemsToLoad) => {
      // ... (loadData function remains the same as previous version)
      setIsLoading(true); // Added from prev version
      setError(null);
      try {
          if (!itemsToLoad || !Array.isArray(itemsToLoad) || itemsToLoad.length === 0) {
              throw new Error("No valid vocabulary data found.");
          }
          setDisplayItems(shuffleArray([...itemsToLoad]));
          setCurrentIndex(0);
          localStorage.removeItem(LOCAL_STORAGE_KEY);
          console.log("Loaded fresh vocabulary set.");
          setError(null);
      } catch (err) {
           console.error("Error processing vocabulary data:", err);
           setError("Gagal memproses data Vocabulary.");
           setDisplayItems([]);
           setCurrentIndex(0);
      } finally {
          setIsLoading(false);
      }
  }, []);

  useEffect(() => {
    // ... (initial localStorage loading logic remains the same)
    setIsLoading(true);
    setError(null);
    try {
        const filteredData = vocabularyData.filter(item => item.word && item.definition);
        if (filteredData.length === 0) throw new Error("No valid vocabulary data found in source.");
        setAllItems(filteredData);
        const savedStateJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (savedStateJSON) {
            const savedState = JSON.parse(savedStateJSON);
            if (savedState && typeof savedState.currentIndex === 'number' && Array.isArray(savedState.displayItems) && savedState.displayItems.length > 0) {
                 const currentAllItemsMap = new Map(filteredData.map(item => [item.id, item]));
                 const validSavedDisplayItems = savedState.displayItems.map(savedItem => currentAllItemsMap.get(savedItem.id)).filter(Boolean);
                 if(validSavedDisplayItems.length > 0 && savedState.currentIndex < validSavedDisplayItems.length) {
                    setDisplayItems(validSavedDisplayItems);
                    setCurrentIndex(savedState.currentIndex);
                 } else {
                     localStorage.removeItem(LOCAL_STORAGE_KEY); loadData(filteredData);
                 }
            } else { localStorage.removeItem(LOCAL_STORAGE_KEY); loadData(filteredData); }
        } else { loadData(filteredData); }
    } catch (err) {
        console.error("Error initializing vocabulary page:", err);
        setError("Gagal memuat data Vocabulary."); setAllItems([]); setDisplayItems([]);
    } finally { setIsLoading(false); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Load on mount only

  useEffect(() => {
    // ... (localStorage saving logic remains the same)
    if (isLoading || error || !displayItems || displayItems.length === 0) return;
    const isCompleted = currentIndex >= displayItems.length;
     if (isCompleted) { localStorage.removeItem(LOCAL_STORAGE_KEY); return; }
    try {
        const stateToSave = { currentIndex: currentIndex, displayItems: displayItems.map(item => ({ id: item.id })), };
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (err) { console.error("Failed to save vocabulary state:", err); }
  }, [currentIndex, displayItems, isLoading, error]);

  const handleReshuffleAll = () => {
    if (allItems.length === 0) return;
    loadData(allItems);
    // Focus the main container after reshuffle if needed, or the first element
    pageRef.current?.focus();
  };

  const loadNextWord = useCallback(() => {
    if (!displayItems || displayItems.length === 0) return;
    if (currentIndex < displayItems.length) {
      setCurrentIndex(prevIndex => prevIndex + 1);
    }
  }, [currentIndex, displayItems]);

  // --- Keyboard Navigation ---
  useEffect(() => {
    const handleKeyDown = (event) => {
        // Allow Enter to trigger next if the button is conceptually available
      if (event.key === 'Enter' && currentItem) {
        loadNextWord();
      }
    };

    const pageElement = pageRef.current; // Capture ref value
    if (pageElement) {
        pageElement.addEventListener('keydown', handleKeyDown);
    }

    // Focus the next button when a new item loads (if it exists)
    if (nextButtonRef.current && !isLoading && currentItem) {
        // Small delay sometimes helps ensure element is fully ready
        // setTimeout(() => nextButtonRef.current?.focus(), 0);
        // Or focus the container to allow keydown listener to work immediately
         pageRef.current?.focus();
    }


    return () => {
      if (pageElement) {
          pageElement.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, [loadNextWord, currentItem, isLoading]); // Add dependencies


  const isCompleted = currentIndex >= totalItemsInSet && totalItemsInSet > 0 && !isLoading;

  // --- Render Logic ---
  if (isLoading) { return <div className="loading">Memuat kata...</div>; }
  if (error) { return <div className="error">{error}</div>; }

  return (
    // Add tabIndex={-1} to make the div focusable for the keydown listener
    // Add ref={pageRef}
    <div className={styles.container} ref={pageRef} tabIndex={-1}>
      {!isCompleted && totalItemsInSet > 0 && (
          <ProgressBar current={currentIndex + 1} total={totalItemsInSet} label="Vocabulary Progress" />
      )}

      {isCompleted ? (
         <div className={styles.completionContainer}>
            <p className="completionMessage">✨ Selesai Melihat Vocabulary! ✨</p>
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
                                 <p className={styles.translationText}><em>(Translation: {currentItem.exampleTranslation})</em></p>
                            </div>
                        )}
                    </div>
                )}
           </div>
          {/* Add ref to the button */}
          <button className="nextButton" onClick={loadNextWord} ref={nextButtonRef}>
            Lanjut <span className="arrowIcon">→</span>
          </button>
        </>
      ) : (
         <p className="loading">Tidak ada data vocabulary.</p>
      )}
    </div>
  );
};

export default VocabularyPage;
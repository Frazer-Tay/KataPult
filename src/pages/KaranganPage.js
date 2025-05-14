// src/pages/KaranganPage.js
// CORRECTED: JSX structure, getDistractors for definitions, and other fixes
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { karanganData } from '../data/karangan';
import styles from './KaranganPage.module.css'; // Assuming you have or will create this CSS module
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

// getDistractors for definitions
const getDistractors = (allItems, currentItem, count = 2) => {
  const distractors = new Set();
  if (!Array.isArray(allItems) || !currentItem || !currentItem.definition) {
    console.error("Invalid input to getDistractors in KaranganPage");
    return [];
  }

  const correctDefinitionLower = currentItem.definition.toLowerCase();

  const potentialDistractorItems = allItems.filter(item =>
    item.id !== currentItem.id &&
    item.definition &&
    item.definition.toLowerCase() !== correctDefinitionLower
  );

  const shuffledPool = shuffleArray([...potentialDistractorItems]);

  for (const item of shuffledPool) {
    if (distractors.size >= count) break;
    if (item.definition) {
      const potentialDistractor = item.definition;
      // Ensure distractor itself is not a duplicate if allItems has duplicate definitions
      if (![...distractors].map(d => d.toLowerCase()).includes(potentialDistractor.toLowerCase())) {
        distractors.add(potentialDistractor);
      }
    }
  }

  let fallbackCounter = 1;
  while (distractors.size < count) {
    const fallback = `[Definisi Acak ${fallbackCounter++}]`;
    if (![...distractors].map(d => d.toLowerCase()).includes(fallback.toLowerCase())) {
        distractors.add(fallback);
    }
    if (fallbackCounter > count + 20) break; // Safety break
  }
  return Array.from(distractors);
};


const LOCAL_STORAGE_KEY = 'kataPultKaranganState_v4';
const getRandomThreshold = () => Math.floor(Math.random() * 4) + 2;

const KaranganPage = () => {
  const [allItems, setAllItems] = useState([]);
  const [displayItems, setDisplayItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [options, setOptions] = useState([]); // Will store definition strings
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [missedItemsMaster, setMissedItemsMaster] = useState(new Set());
  const [isReviewingMistakes, setIsReviewingMistakes] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [retestQueue, setRetestQueue] = useState([]);
  const [correctStreak, setCorrectStreak] = useState(0);
  const [retestThreshold, setRetestThreshold] = useState(getRandomThreshold());

  const optionButtonRefs = useRef([]);
  const pageRef = useRef(null);
  const nextButtonRef = useRef(null);
  const currentItemRef = useRef(null);

  const { currentItem: currentItemFromMemo, totalItemsInSet } = useMemo(() => {
    const item = (displayItems && displayItems.length > 0 && currentIndex < displayItems.length)
        ? displayItems[currentIndex]
        : null;
    currentItemRef.current = item;
    return { currentItem: item, totalItemsInSet: displayItems?.length || 0 };
  }, [displayItems, currentIndex]);

  const loadData = useCallback((itemsToLoad, isReviewSession) => {
      setIsLoading(true); setError(null);
      try {
          const validItems = itemsToLoad.filter(item => item.word && item.definition);
          if (!validItems || validItems.length === 0) throw new Error("Tidak ada data Karangan yang valid.");
          setDisplayItems(shuffleArray([...validItems]));
          setCurrentIndex(0);
          setIsReviewingMistakes(isReviewSession);
          setIsAnswered(false); setFeedback(''); setSelectedAnswer(null); setIsCorrect(false);
          if (!isReviewSession) {
              setMissedItemsMaster(new Set());
              setRetestQueue([]);
              setCorrectStreak(0);
              setRetestThreshold(getRandomThreshold());
              localStorage.removeItem(LOCAL_STORAGE_KEY);
          }
      } catch (err) { console.error("Error loading Karangan:", err); setError(err.message); setDisplayItems([]); }
      finally { setIsLoading(false); }
  }, []);

  useEffect(() => {
    setIsLoading(true); setError(null);
    try {
        const filteredData = karanganData.filter(item => item.word && item.definition);
        if (filteredData.length === 0) throw new Error("No valid Karangan data in source.");
        setAllItems(filteredData);
        const savedStateJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (savedStateJSON) {
            const savedState = JSON.parse(savedStateJSON);
            if (savedState && typeof savedState.currentIndex === 'number' && Array.isArray(savedState.displayItemIds) && Array.isArray(savedState.missedItemsMaster) && Array.isArray(savedState.retestQueue) && typeof savedState.correctStreak === 'number') {
                const currentAllItemsMap = new Map(filteredData.map(item => [item.id, item]));
                const validSavedDisplayItems = savedState.displayItemIds.map(id => currentAllItemsMap.get(id)).filter(Boolean);
                if(validSavedDisplayItems.length > 0 && savedState.currentIndex < validSavedDisplayItems.length) {
                    setDisplayItems(validSavedDisplayItems); setCurrentIndex(savedState.currentIndex);
                    setMissedItemsMaster(new Set(savedState.missedItemsMaster)); setIsReviewingMistakes(savedState.isReviewingMistakes || false);
                    setRetestQueue(savedState.retestQueue); setCorrectStreak(savedState.correctStreak);
                    setRetestThreshold(savedState.retestThreshold || getRandomThreshold()); setIsAnswered(false); setIsCorrect(false);
                } else { localStorage.removeItem(LOCAL_STORAGE_KEY); loadData(filteredData, false); }
            } else { localStorage.removeItem(LOCAL_STORAGE_KEY); loadData(filteredData, false); }
        } else { loadData(filteredData, false); }
    } catch (err) { console.error("Error init Karangan:", err); setError(err.message); setAllItems([]); setDisplayItems([]); }
    finally { setIsLoading(false); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
     if (isLoading || error || !displayItems || displayItems.length === 0) return;
    const isCompletedNow = currentIndex >= displayItems.length;
    if (isCompletedNow) { localStorage.removeItem(LOCAL_STORAGE_KEY); return; }
    try {
      const stateToSave = { currentIndex: currentIndex, displayItemIds: displayItems.map(item => item.id), missedItemsMaster: Array.from(missedItemsMaster), isReviewingMistakes: isReviewingMistakes, retestQueue: retestQueue, correctStreak: correctStreak, retestThreshold: retestThreshold };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (err) { console.error("Failed to save Karangan state:", err); }
  }, [currentIndex, displayItems, missedItemsMaster, isReviewingMistakes, retestQueue, correctStreak, retestThreshold, isLoading, error]);

  const generateOptions = useCallback(() => {
    if (!currentItemRef.current || !currentItemRef.current.definition || !Array.isArray(allItems) || allItems.length === 0) {
      setOptions([]); return;
    }
    const correctDefinition = currentItemRef.current.definition;
    const distractors = getDistractors(allItems, currentItemRef.current, 2); // Get 2 definition distractors
    const allOptions = shuffleArray([correctDefinition, ...distractors]);
    setOptions(allOptions);
    optionButtonRefs.current = allOptions.map((_, i) => optionButtonRefs.current[i] || React.createRef());
  }, [allItems]);

  useEffect(() => {
    if (!isLoading && currentItemFromMemo) {
        generateOptions();
        setSelectedAnswer(null); setFeedback(''); setIsAnswered(false); setIsCorrect(false);
        setTimeout(() => optionButtonRefs.current[0]?.current?.focus(), 100);
    } else if (!currentItemFromMemo) {
       setOptions([]);
    }
  }, [currentItemFromMemo, isLoading, generateOptions]);

  const handleReshuffleAll = () => { if (allItems.length > 0) loadData(allItems, false); };
  const handleReviewMistakes = () => {
    const mistakeIds = Array.from(missedItemsMaster);
    if (mistakeIds.length === 0) return;
    const itemsToReview = allItems.filter(item => mistakeIds.includes(item.id));
    if (itemsToReview.length > 0) { loadData(itemsToReview, true); }
    else { setError("Tidak ada kesalahan untuk di-review."); }
  };

  const loadNextItem = useCallback(() => {
    if (!displayItems || displayItems.length === 0) return;
    if (!isReviewingMistakes && retestQueue.length > 0 && correctStreak >= retestThreshold) {
        const retestItemId = retestQueue[0];
        const retestItem = allItems.find(item => item.id === retestItemId);
        if (retestItem) {
            console.log("Karangan: Retesting item:", retestItem.word);
            const currentActualIndexInDisplay = displayItems.findIndex(item => item.id === currentItemRef.current?.id);
            let nextDisplayItems = [...displayItems];
            const existingRetestIndex = nextDisplayItems.findIndex(item => item.id === retestItemId);
            if (existingRetestIndex > -1 && existingRetestIndex > currentActualIndexInDisplay) { nextDisplayItems.splice(existingRetestIndex, 1); }
            if (currentActualIndexInDisplay !== -1 && currentActualIndexInDisplay < nextDisplayItems.length -1 ) {
                 nextDisplayItems.splice(currentActualIndexInDisplay + 1, 0, retestItem);
            } else { nextDisplayItems.push(retestItem); }
            setDisplayItems(nextDisplayItems);
            const newIndexOfRetestItem = nextDisplayItems.findIndex(item => item.id === retestItemId);
            setCurrentIndex(newIndexOfRetestItem !== -1 ? newIndexOfRetestItem : currentIndex + 1);
            setRetestQueue(prev => prev.slice(1)); setCorrectStreak(0); setRetestThreshold(getRandomThreshold());
            return;
        } else { setRetestQueue(prev => prev.slice(1)); }
    }
    if (currentIndex < displayItems.length) { setCurrentIndex(prevIndex => prevIndex + 1); }
  }, [currentIndex, displayItems, allItems, retestQueue, correctStreak, isReviewingMistakes, retestThreshold]);

  const checkAnswer = useCallback((selectedOptionDefinition) => {
    if (!currentItemRef.current || isAnswered) return;
    setIsAnswered(true);
    const correct = selectedOptionDefinition.toLowerCase() === currentItemRef.current.definition.toLowerCase();
    setIsCorrect(correct);
    setSelectedAnswer(selectedOptionDefinition);

    if (correct) {
      setFeedback('Tepat! Definisi Benar. 👍');
      setCorrectStreak(prev => prev + 1);
      setRetestQueue(prevQ => prevQ.filter(id => id !== currentItemRef.current.id));
      setTimeout(loadNextItem, 1500);
    } else {
      setFeedback(`Kurang Tepat. Definisi yang benar untuk "${currentItemRef.current.word}" adalah: "${currentItemRef.current.definition}"`);
      setCorrectStreak(0);
      setRetestThreshold(getRandomThreshold());
      if (!isReviewingMistakes) {
        setMissedItemsMaster(prev => new Set(prev).add(currentItemRef.current.id));
        if (!retestQueue.includes(currentItemRef.current.id)) {
            setRetestQueue(prevQ => [...prevQ, currentItemRef.current.id]);
        }
      }
      setTimeout(() => nextButtonRef.current?.focus(), 50);
    }
  }, [isAnswered, isReviewingMistakes, loadNextItem, retestQueue]);

   useEffect(() => {
    const handlePageKeyDown = (event) => {
        const localIsCompleted = currentIndex >= totalItemsInSet && totalItemsInSet > 0;
        if (localIsCompleted) return;

        if (!isAnswered && ['1', '2', '3'].includes(event.key)) {
            const optionIndex = parseInt(event.key, 10) - 1;
            if (options[optionIndex] && optionButtonRefs.current[optionIndex]?.current) {
                checkAnswer(options[optionIndex]);
                event.preventDefault();
            }
        }
        else if (event.key === 'Enter' && isAnswered && !isCorrect) {
             if (!optionButtonRefs.current.some(ref => ref.current === document.activeElement)) {
                 loadNextItem();
                 event.preventDefault();
            }
        }
    };
    const pageElement = pageRef.current;
    if (pageElement) { pageElement.addEventListener('keydown', handlePageKeyDown); }
    return () => { if (pageElement) pageElement.removeEventListener('keydown', handlePageKeyDown); };
  }, [options, checkAnswer, loadNextItem, currentIndex, totalItemsInSet, isAnswered, isCorrect]);

  const handleOptionKeyDown = (event, option) => {
      if (!isAnswered && (event.key === 'Enter' || event.key === ' ')) {
          checkAnswer(option);
          event.preventDefault();
      }
  };

  const isCompleted = currentIndex >= totalItemsInSet && totalItemsInSet > 0 && !isLoading;
  const finalMistakeCountForDisplay = missedItemsMaster.size;

  if (isLoading) { return <div className="loading">Memuat kata Karangan...</div>; }
  if (error) { return <div className="error">{error}</div>; }
  if (isCompleted) {
    const completionText = isReviewingMistakes ? "✨ Sesi Review Karangan Selesai! ✨" : "✨ Latihan Karangan Selesai! ✨";
    const mistakesToShow = finalMistakeCountForDisplay;
    return (
      <div className={styles.container}>
        <p className="completionMessage">{completionText}</p>
        {!isReviewingMistakes && mistakesToShow > 0 && (
          <p className="completionSubMessage">Anda memiliki {mistakesToShow} item yang salah pada putaran awal.</p>
        )}
        <div className={styles.completionActions}>
          {finalMistakeCountForDisplay > 0 && !isReviewingMistakes && (
            <button className="secondaryButton" onClick={handleReviewMistakes}>
              🔁 Ulangi Kesalahan ({finalMistakeCountForDisplay})
            </button>
          )}
          <button className="primaryButton" onClick={handleReshuffleAll}>
            {isReviewingMistakes ? 'Mulai Lagi Semua' : 'Ulangi Semua'}
          </button>
        </div>
      </div>
    );
  }
  if (!currentItemFromMemo) { return <div className="loading">Memuat kata berikutnya...</div>; }

  return (
    <div className={styles.container} ref={pageRef} tabIndex={-1}>
        <ProgressBar current={currentIndex + 1} total={totalItemsInSet} label={isReviewingMistakes ? "Review Kesalahan Karangan" : "Kosakata Karangan"} />
        <div className={styles.card}>
            <h2 className={styles.word}>{currentItemFromMemo.word || '[N/A]'}</h2>
            {/* Display synonyms if they exist - for Karangan, this part might be less relevant or differently styled */}
            {currentItemFromMemo.synonyms && currentItemFromMemo.synonyms.length > 0 && (
                <div className={styles.synonymSection}>
                    <p className={styles.synonymLabel}>Persamaan Kata:</p>
                    <p className={styles.synonymText}>{currentItemFromMemo.synonyms.join(', ')}</p>
                </div>
            )}
        </div>
        <div className={styles.optionsContainer} role="radiogroup" aria-labelledby="instruction-karangan">
            <p className={styles.instruction} id="instruction-karangan">Pilih definisi yang paling tepat (Gunakan tombol 1, 2, 3):</p>
            {options.map((option, index) => {
              const isCorrectOption = currentItemFromMemo?.definition?.toLowerCase() === option.toLowerCase();
              let buttonClassName = styles.optionButton;
              if (isAnswered) {
                  if (isCorrectOption) buttonClassName += ` ${styles.correct}`;
                  else if (selectedAnswer === option) buttonClassName += ` ${styles.incorrect}`;
                  else buttonClassName += ` ${styles.disabled}`;
              }
              return (
                <button
                  key={`${currentItemFromMemo.id}-option-${index}-${option.substring(0, 10)}`} // Key from option string
                  ref={el => optionButtonRefs.current[index] = el}
                  className={buttonClassName}
                  onClick={() => checkAnswer(option)}
                  onKeyDown={(e) => handleOptionKeyDown(e, option)}
                  disabled={isAnswered}
                  role="radio"
                  aria-checked={selectedAnswer === option}
                  tabIndex={isAnswered ? -1 : 0}
                >
                  <span className={styles.optionNumber}>{index + 1}.</span>
                  <span className={styles.optionText}>{option}</span>
                </button>
              );
            })}
        </div>
        {isAnswered && feedback && (
            <div
                className={`${styles.feedback} ${isCorrect ? styles.correctFeedback : styles.incorrectFeedback}`}
                role="alert"
            >
              {feedback}
            </div>
        )}
        {isAnswered && !isCorrect && (
            <button className="nextButton" ref={nextButtonRef} onClick={loadNextItem}>
                Lanjut <span className="arrowIcon">→</span>
            </button>
        )}
    </div>
  );
};
export default KaranganPage;
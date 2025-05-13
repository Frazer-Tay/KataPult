// src/pages/PersamaanPage.js
// CORRECTED: Removed syntax errors, focusing on core features (MCQ, persistence, review, keyboard nav)
// Spaced Repetition Teaser logic (in-session re-test) is temporarily removed for stability.
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
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

const getDistractors = (allItems, currentItem, count = 2) => {
    const distractors = new Set();
    if (!Array.isArray(allItems) || !currentItem || !currentItem.synonyms) {
        console.error("Invalid input to getDistractors in Persamaan");
        return [];
    }
    const potentialDistractorItems = allItems.filter(item =>
        item.id !== currentItem.id &&
        item.word &&
        !currentItem.synonyms.map(s => s.toLowerCase()).includes(item.word.toLowerCase())
    );
    const shuffledPool = shuffleArray([...potentialDistractorItems]);
    const currentSynonymsLower = currentItem.synonyms.map(s => s.toLowerCase());

    for (const item of shuffledPool) {
        if (distractors.size >= count) break;
        const potentialDistractorWord = item.word;
        if (potentialDistractorWord) {
            const potentialDistractorLower = potentialDistractorWord.toLowerCase();
            if (!currentSynonymsLower.includes(potentialDistractorLower) && ![...distractors].map(d => d.toLowerCase()).includes(potentialDistractorLower)) {
                 distractors.add(potentialDistractorWord);
            }
        }
    }
    let fallbackCounter = 1;
    const allWordsForFallback = allItems.map(i => i.word).filter(Boolean);
    while (distractors.size < count && fallbackCounter <= allItems.length) {
        const randomFallbackWord = allWordsForFallback[Math.floor(Math.random() * allWordsForFallback.length)];
        if (randomFallbackWord){
            const fallbackLower = randomFallbackWord.toLowerCase();
             if (!currentSynonymsLower.includes(fallbackLower) && ![...distractors].map(d => d.toLowerCase()).includes(fallbackLower)) {
                 distractors.add(randomFallbackWord);
            }
        }
        fallbackCounter++;
        if (fallbackCounter > allItems.length + 5 + count) break;
    }
     while (distractors.size < count) {
         distractors.add(`[Opsi Acak ${distractors.size + 1}]`);
     }
    return Array.from(distractors);
};

const LOCAL_STORAGE_KEY = 'kataPultPersamaanState_v2'; // Kept v2 as SRT teaser not included here

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
  const [missedItemsMaster, setMissedItemsMaster] = useState(new Set());
  const [isReviewingMistakes, setIsReviewingMistakes] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const optionButtonRefs = useRef([]);
  const pageRef = useRef(null);
  const nextButtonRef = useRef(null);
  const isAnsweredRef = useRef(isAnswered);
  const isCorrectRef = useRef(isCorrect);
  const currentItemRef = useRef(null);
  const isCompletedRef = useRef(false);

  const { currentItem: currentItemFromMemo, totalItemsInSet } = useMemo(() => {
      const item = (displayItems && displayItems.length > 0 && currentIndex < displayItems.length)
          ? displayItems[currentIndex]
          : null;
      currentItemRef.current = item; // Keep this ref updated
      return { currentItem: item, totalItemsInSet: displayItems?.length || 0 };
  }, [displayItems, currentIndex]);

  const loadData = useCallback((itemsToLoad, isReviewSession) => {
      setIsLoading(true); setError(null);
      try {
          const validItems = itemsToLoad.filter(item => item.word && item.synonyms && item.synonyms.length > 0);
          if (!validItems || validItems.length === 0) {
               throw new Error("Tidak ada data persamaan yang valid untuk dimuat.");
          }
          setDisplayItems(shuffleArray([...validItems]));
          setCurrentIndex(0); setIsReviewingMistakes(isReviewSession);
          setIsAnswered(false); setFeedback(''); setSelectedAnswer(null); setIsCorrect(false);
          isCompletedRef.current = false;
          if (!isReviewSession) {
              setMissedItemsMaster(new Set());
              localStorage.removeItem(LOCAL_STORAGE_KEY);
              console.log("Starting fresh full Persamaan run, cleared saved state.");
          }
      } catch (err) {
          console.error("Error loading Persamaan data:", err);
          setError(err.message); setDisplayItems([]);
      } finally {
          setIsLoading(false);
      }
  }, []); // No isReviewing dep here, passed as arg

  useEffect(() => {
     setIsLoading(true); setError(null);
    try {
        const filteredData = persamaanData.filter(item => item.word && item.synonyms && item.synonyms.length > 0);
        if (filteredData.length === 0) throw new Error("No valid Persamaan data in source.");
        setAllItems(filteredData);
        const savedStateJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (savedStateJSON) {
            const savedState = JSON.parse(savedStateJSON);
            if (savedState && typeof savedState.currentIndex === 'number' && Array.isArray(savedState.displayItemIds) && Array.isArray(savedState.missedItemsMaster)) {
                 const currentAllItemsMap = new Map(filteredData.map(item => [item.id, item]));
                 const validSavedDisplayItems = savedState.displayItemIds.map(id => currentAllItemsMap.get(id)).filter(Boolean);
                 if(validSavedDisplayItems.length > 0 && savedState.currentIndex < validSavedDisplayItems.length) {
                    setDisplayItems(validSavedDisplayItems); setCurrentIndex(savedState.currentIndex);
                    setMissedItemsMaster(new Set(savedState.missedItemsMaster));
                    setIsReviewingMistakes(savedState.isReviewingMistakes || false);
                    setIsAnswered(false); setIsCorrect(false);
                 } else { localStorage.removeItem(LOCAL_STORAGE_KEY); loadData(filteredData, false); }
            } else { localStorage.removeItem(LOCAL_STORAGE_KEY); loadData(filteredData, false); }
        } else { loadData(filteredData, false); }
    } catch (err) { console.error("Error init Persamaan:", err); setError(err.message); setAllItems([]); setDisplayItems([]); }
    finally { setIsLoading(false); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // loadData is memoized


  useEffect(() => {
      if (isLoading || error || !displayItems || displayItems.length === 0) return;
      const isCompletedNow = currentIndex >= displayItems.length;
      isCompletedRef.current = isCompletedNow;
      if (isCompletedNow) { localStorage.removeItem(LOCAL_STORAGE_KEY); return; }
      try {
          const stateToSave = {
            currentIndex: currentIndex,
            displayItemIds: displayItems.map(item => item.id), // Save IDs
            missedItemsMaster: Array.from(missedItemsMaster),
            isReviewingMistakes: isReviewingMistakes,
          };
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stateToSave));
      } catch (err) { console.error("Failed to save Persamaan state:", err); }
  }, [currentIndex, displayItems, missedItemsMaster, isReviewingMistakes, isLoading, error]);


  const generateOptions = useCallback(() => {
     if (!currentItemRef.current || !Array.isArray(currentItemRef.current.synonyms) || currentItemRef.current.synonyms.length === 0 || !Array.isArray(allItems) || allItems.length === 0) { setOptions([]); return; }
     const correctSynonym = currentItemRef.current.synonyms[Math.floor(Math.random() * currentItemRef.current.synonyms.length)];
     const distractors = getDistractors(allItems, currentItemRef.current, 2);
     const allOptions = shuffleArray([correctSynonym, ...distractors]);
     setOptions(allOptions);
     optionButtonRefs.current = allOptions.map((_, i) => optionButtonRefs.current[i] || React.createRef());
  }, [allItems]); // Only allItems

  useEffect(() => {
    if (!isLoading && currentItemFromMemo) { // Use currentItemFromMemo from useMemo
        generateOptions();
        setSelectedAnswer(null);
        setFeedback('');
        setIsAnswered(false);
        setIsCorrect(false);
        setTimeout(() => {
             // Focus first option button if available, otherwise the page container
            if (optionButtonRefs.current[0]?.current) {
                optionButtonRefs.current[0].current.focus();
            } else {
                pageRef.current?.focus();
            }
        }, 100);
    } else if (!currentItemFromMemo) {
       setOptions([]);
    }
  }, [currentItemFromMemo, isLoading, generateOptions]);


  const handleReshuffleAll = () => {
    setIsReviewingMistakes(false);
    loadData(allItems, false);
  };

  const handleReviewMistakes = () => {
    const mistakeIds = Array.from(missedItemsMaster);
    if (mistakeIds.length === 0) return;
    const itemsToReview = allItems.filter(item => mistakeIds.includes(item.id));
     if (itemsToReview.length > 0) {
        setIsReviewingMistakes(true);
        loadData(itemsToReview, true);
    } else {
         setError("Tidak ada kesalahan untuk di-review.");
    }
  };

  const loadNextItem = useCallback(() => {
     if (!displayItems || displayItems.length === 0) return;
     if (currentIndex < totalItemsInSet -1) { // Use totalItemsInSet from useMemo
        setCurrentIndex(prevIndex => prevIndex + 1);
    } else {
         setCurrentIndex(totalItemsInSet); // Trigger completion
         isCompletedRef.current = true;
    }
  }, [currentIndex, displayItems, totalItemsInSet]);


  const checkAnswer = useCallback((selectedOption) => {
    if (isAnsweredRef.current || !currentItemRef.current || !currentItemRef.current.synonyms) return;
    setSelectedAnswer(selectedOption);
    setIsAnswered(true);
    const correctSynonymsLower = currentItemRef.current.synonyms.map(s => s.toLowerCase());
    const correct = correctSynonymsLower.includes(selectedOption.toLowerCase());
    setIsCorrect(correct);

    if (correct) {
      setFeedback('Tepat! Sinonim Benar. 👍');
      setTimeout(loadNextItem, 1500);
    } else {
      setFeedback(`Kurang Tepat. Sinonim: ${currentItemRef.current.synonyms.join(', ')}`);
      if (!isReviewingMistakes) {
            setMissedItemsMaster(prev => new Set(prev).add(currentItemRef.current.id));
      }
      setTimeout(() => nextButtonRef.current?.focus(), 50);
    }
  }, [isReviewingMistakes, loadNextItem]); // Removed isAnsweredRef, currentItemRef, uses values from closure


  useEffect(() => {
      isAnsweredRef.current = isAnswered;
      isCorrectRef.current = isCorrect;
  }, [isAnswered, isCorrect]);


   useEffect(() => {
    const handlePageKeyDown = (event) => {
        if (isCompletedRef.current) return; // Use ref for completion

        if (!isAnsweredRef.current && ['1', '2', '3'].includes(event.key)) {
            const optionIndex = parseInt(event.key, 10) - 1;
            if (options[optionIndex] && optionButtonRefs.current[optionIndex]?.current) { // Check if option exists
                checkAnswer(options[optionIndex]);
                event.preventDefault();
            }
        }
        else if (event.key === 'Enter' && isAnsweredRef.current && !isCorrectRef.current) {
             if (!optionButtonRefs.current.some(ref => ref.current === document.activeElement)) {
                 loadNextItem();
                 event.preventDefault();
            }
        }
    };
    const pageElement = pageRef.current;
    if (pageElement) { pageElement.addEventListener('keydown', handlePageKeyDown); }
    return () => { if (pageElement) pageElement.removeEventListener('keydown', handlePageKeyDown); };
  }, [options, checkAnswer, loadNextItem]); // Simplified deps

  const handleOptionKeyDown = (event, option) => {
      if (!isAnsweredRef.current && (event.key === 'Enter' || event.key === ' ')) {
          checkAnswer(option);
          event.preventDefault();
      }
  };

  const isCompleted = currentIndex >= totalItemsInSet && totalItemsInSet > 0 && !isLoading;
  const finalMistakeCountForDisplay = missedItemsMaster.size;

  // --- Render Logic ---
  if (isLoading) { return <div className="loading">Memuat sinonim...</div>; }
  if (error) { return <div className="error">{error}</div>; }

  if (isCompleted) {
      const completionText = isReviewingMistakes ? "✨ Sesi Review Persamaan Selesai! ✨" : "✨ Latihan Persamaan Selesai! ✨";
      const mistakesToShow = finalMistakeCountForDisplay;
    return (
      <div className={styles.container}>
          <p className="completionMessage">{completionText}</p>
          {!isReviewingMistakes && mistakesToShow > 0 && (
             <p className="completionSubMessage">Anda memiliki {mistakesToShow} item yang salah pada putaran awal.</p>
          )}
          <div className={styles.completionActions}>
              {finalMistakeCountForDisplay > 0 && !isReviewingMistakes && (
                   <button className="secondaryButton" onClick={handleReviewMistakes}>🔁 Ulangi Kesalahan ({finalMistakeCountForDisplay})</button>
              )}
              <button className="primaryButton" onClick={handleReshuffleAll}>{isReviewingMistakes ? 'Mulai Lagi Semua' : 'Ulangi Semua'}</button>
          </div>
      </div>
    );
   }

   if (!currentItemFromMemo) { return <div className="loading">Memuat kata berikutnya...</div>; }

  return (
    <div className={styles.container} ref={pageRef} tabIndex={-1}>
        <ProgressBar current={currentIndex + 1} total={totalItemsInSet} label={isReviewingMistakes ? "Review Kesalahan" : "Persamaan"} />
        <div className={styles.card}>
            <p className={styles.label}>Carikan persamaan kata (sinonim) untuk:</p>
            <h2 className={styles.word}>{currentItemFromMemo.word || '[N/A]'}</h2>
        </div>
        <div className={styles.optionsContainer} role="radiogroup" aria-labelledby="instruction-persamaan">
            <p className={styles.instruction} id="instruction-persamaan">Pilih salah satu persamaannya (Gunakan tombol 1, 2, 3):</p>
            {options.map((option, index) => {
              const isCorrectOption = currentItemFromMemo?.synonyms?.map(s => s.toLowerCase()).includes(option.toLowerCase()) ?? false;
              let buttonClassName = styles.optionButton;
              if (isAnswered) {
                if (isCorrectOption) buttonClassName += ` ${styles.correct}`;
                else if (selectedAnswer === option) buttonClassName += ` ${styles.incorrect}`;
                else buttonClassName += ` ${styles.disabled}`;
              }
              return (
                <button
                  key={`${currentItemFromMemo.id}-option-${index}-${option}`}
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
            <div className={`${styles.feedback} ${isCorrect ? styles.correctFeedback : styles.incorrectFeedback}`} role="alert">
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

export default PersamaanPage;
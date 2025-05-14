// src/pages/PersamaanPage.js
// CORRECTED: Example sentence integration, feedback enhancement
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { persamaanData } from '../data/persamaan';
import styles from './PersamaanPage.module.css';
import ProgressBar from '../components/ProgressBar';

const shuffleArray = (array) => { if (!Array.isArray(array)) return []; let currentIndex = array.length, randomIndex; while (currentIndex !== 0) { randomIndex = Math.floor(Math.random() * currentIndex); currentIndex--; [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]; } return array; };

// Adjusted getDistractors to pick words that are not the target or its synonyms
const getDistractors = (allItems, currentItem, count = 2) => {
  const distractors = new Set();
  if (!Array.isArray(allItems) || !currentItem || !currentItem.word || !Array.isArray(currentItem.synonyms)) {
    console.error("Invalid input to getDistractors in PersamaanPage (Revised)");
    return [];
  }

  const currentWordLower = currentItem.word.toLowerCase();
  const correctSynonymStringsLower = currentItem.synonyms.map(sObj => sObj.synonym.toLowerCase());

  const potentialDistractorWords = allItems
    .map(item => item.word) // Get all words from the dataset
    .filter(Boolean)
    .filter(word => {
      const wordLower = word.toLowerCase();
      return wordLower !== currentWordLower && !correctSynonymStringsLower.includes(wordLower);
    });

  const shuffledPool = shuffleArray([...new Set(potentialDistractorWords)]); // Ensure unique distractors

  for (const word of shuffledPool) {
    if (distractors.size >= count) break;
    distractors.add(word);
  }

  let fallbackCounter = 1;
  while (distractors.size < count) {
    const fallback = `[Opsi Salah ${fallbackCounter++}]`;
    if (![...distractors].includes(fallback)) { // Ensure fallback is unique too
        distractors.add(fallback);
    }
    if (fallbackCounter > count + 10) break; // Safety break for fallback
  }
  return Array.from(distractors);
};


const LOCAL_STORAGE_KEY = 'kataPultPersamaanState_v4'; // Keep or increment if structure changes significantly
const getRandomThreshold = () => Math.floor(Math.random() * 4) + 2;

const PersamaanPage = () => {
  const [allItems, setAllItems] = useState([]);
  const [displayItems, setDisplayItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [options, setOptions] = useState([]); // Will store synonym strings for display
  const [correctSynonymObject, setCorrectSynonymObject] = useState(null); // Stores the chosen correct synonym object
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
          const validItems = itemsToLoad.filter(item => item.word && item.synonyms && item.synonyms.length > 0 && item.example_sentence_target && item.synonyms.every(s => s.synonym && s.example_sentence_synonym));
          if (!validItems || validItems.length === 0) throw new Error("Tidak ada data Persamaan yang valid dengan contoh kalimat.");
          setDisplayItems(shuffleArray([...validItems]));
          setCurrentIndex(0); setIsReviewingMistakes(isReviewSession);
          setIsAnswered(false); setFeedback(''); setSelectedAnswer(null); setIsCorrect(false); setCorrectSynonymObject(null);
          if (!isReviewSession) {
              setMissedItemsMaster(new Set()); setRetestQueue([]); setCorrectStreak(0);
              setRetestThreshold(getRandomThreshold());
              localStorage.removeItem(LOCAL_STORAGE_KEY);
          }
      } catch (err) { console.error("Error loading Persamaan:", err); setError(err.message); setDisplayItems([]); }
      finally { setIsLoading(false); }
  }, []);

  useEffect(() => {
    setIsLoading(true); setError(null);
    try {
        const filteredData = persamaanData.filter(item => item.word && item.synonyms && item.synonyms.length > 0 && item.example_sentence_target && item.synonyms.every(s => s.synonym && s.example_sentence_synonym));
        if (filteredData.length === 0) throw new Error("No valid Persamaan data with examples in source.");
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
                    setRetestThreshold(savedState.retestThreshold || getRandomThreshold()); setIsAnswered(false); setIsCorrect(false); setCorrectSynonymObject(null);
                } else { localStorage.removeItem(LOCAL_STORAGE_KEY); loadData(filteredData, false); }
            } else { localStorage.removeItem(LOCAL_STORAGE_KEY); loadData(filteredData, false); }
        } else { loadData(filteredData, false); }
    } catch (err) { console.error("Error init Persamaan:", err); setError(err.message); setAllItems([]); setDisplayItems([]); }
    finally { setIsLoading(false); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
      if (isLoading || error || !displayItems || displayItems.length === 0) return;
      const isCompletedNow = currentIndex >= displayItems.length;
      if (isCompletedNow) { localStorage.removeItem(LOCAL_STORAGE_KEY); return; }
      try {
          const stateToSave = { currentIndex: currentIndex, displayItemIds: displayItems.map(item => item.id ), missedItemsMaster: Array.from(missedItemsMaster), isReviewingMistakes: isReviewingMistakes, retestQueue: retestQueue, correctStreak: correctStreak, retestThreshold: retestThreshold };
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stateToSave));
      } catch (err) { console.error("Failed to save Persamaan state:", err); }
  }, [currentIndex, displayItems, missedItemsMaster, isReviewingMistakes, retestQueue, correctStreak, retestThreshold, isLoading, error]);

  const generateOptions = useCallback(() => {
     if (!currentItemRef.current || !Array.isArray(currentItemRef.current.synonyms) || currentItemRef.current.synonyms.length === 0 || !Array.isArray(allItems) || allItems.length === 0) {
        setOptions([]); setCorrectSynonymObject(null); return;
     }
     const chosenCorrectSynonymObj = currentItemRef.current.synonyms[Math.floor(Math.random() * currentItemRef.current.synonyms.length)];
     setCorrectSynonymObject(chosenCorrectSynonymObj);

     const distractors = getDistractors(allItems, currentItemRef.current, 2); // Get 2 distractor words
     const allOptionStrings = shuffleArray([chosenCorrectSynonymObj.synonym, ...distractors]);
     setOptions(allOptionStrings);
     optionButtonRefs.current = allOptionStrings.map((_, i) => optionButtonRefs.current[i] || React.createRef());
  }, [allItems]);

  useEffect(() => {
    if (!isLoading && currentItemFromMemo) {
        generateOptions();
        setSelectedAnswer(null); setFeedback(''); setIsAnswered(false); setIsCorrect(false);
        setTimeout(() => optionButtonRefs.current[0]?.current?.focus(), 100);
    } else if (!currentItemFromMemo) {
       setOptions([]); setCorrectSynonymObject(null);
    }
  }, [currentItemFromMemo, isLoading, generateOptions]);

  const handleReshuffleAll = () => { if(allItems.length > 0) loadData(allItems, false); };
  const handleReviewMistakes = () => { const mistakeIds = Array.from(missedItemsMaster); if (mistakeIds.length === 0) return; const itemsToReview = allItems.filter(item => mistakeIds.includes(item.id)); if (itemsToReview.length > 0) { loadData(itemsToReview, true); } else { setError("Tidak ada kesalahan untuk di-review."); } };

  const loadNextItem = useCallback(() => {
    if (!displayItems || displayItems.length === 0) return;
    const isLastItemInCurrentSet = currentIndex >= displayItems.length - 1;

    if (!isReviewingMistakes && retestQueue.length > 0 && correctStreak >= retestThreshold && !isLastItemInCurrentSet) {
        const retestItemId = retestQueue[0];
        const retestItem = allItems.find(item => item.id === retestItemId);
        if (retestItem) {
            let nextDisplayItems = [...displayItems];
            nextDisplayItems = nextDisplayItems.filter(item => item.id !== retestItemId);
            const currentActualIndexInDisplay = nextDisplayItems.findIndex(item => item.id === currentItemRef.current?.id);
            if (currentActualIndexInDisplay !== -1 && currentActualIndexInDisplay < nextDisplayItems.length) {
                 nextDisplayItems.splice(currentActualIndexInDisplay + 1, 0, retestItem);
            } else { nextDisplayItems.push(retestItem); }
            setDisplayItems(nextDisplayItems);
            const newIndexOfRetestItem = nextDisplayItems.findIndex(item => item.id === retestItemId);
            setCurrentIndex(newIndexOfRetestItem !== -1 ? newIndexOfRetestItem : currentIndex + 1);
            setRetestQueue(prev => prev.slice(1)); setCorrectStreak(0); setRetestThreshold(getRandomThreshold());
            return;
        } else { setRetestQueue(prev => prev.slice(1)); }
    }
    setCurrentIndex(prevIndex => prevIndex + 1);
  }, [currentIndex, displayItems, allItems, retestQueue, correctStreak, isReviewingMistakes, retestThreshold]);

  const checkAnswer = useCallback((selectedOptionString) => {
    if (isAnswered || !currentItemRef.current || !correctSynonymObject) return;
    setIsAnswered(true);
    const correct = selectedOptionString.toLowerCase() === correctSynonymObject.synonym.toLowerCase();
    setIsCorrect(correct);
    setSelectedAnswer(selectedOptionString);

    if (correct) {
      setFeedback(`Tepat! "${selectedOptionString}" adalah sinonim yang benar. 👍`);
      setCorrectStreak(prev => prev + 1);
      setRetestQueue(prevQ => prevQ.filter(id => id !== currentItemRef.current.id));
      setTimeout(loadNextItem, 2000); // Longer time to read example if correct
    } else {
      // Build feedback with all correct synonyms and their examples
      let incorrectFeedback = `Kurang Tepat. Sinonim yang benar untuk "${currentItemRef.current.word}" antara lain:`;
      currentItemRef.current.synonyms.forEach(synObj => {
        incorrectFeedback += `\n- **${synObj.synonym}**: "${synObj.example_sentence_synonym}"`;
      });
      setFeedback(incorrectFeedback);
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
  }, [isAnswered, correctSynonymObject, isReviewingMistakes, loadNextItem, retestQueue]);

   useEffect(() => {
    const handlePageKeyDown = (event) => {
        const localIsCompleted = currentIndex >= totalItemsInSet && totalItemsInSet > 0;
        if (localIsCompleted) return;

        if (!isAnswered && ['1', '2', '3', '4'].includes(event.key)) { // Assuming max 4 options
            const optionIndex = parseInt(event.key, 10) - 1;
            if (options[optionIndex] && optionButtonRefs.current[optionIndex]?.current) {
                checkAnswer(options[optionIndex]); // Pass the string
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

  const handleOptionKeyDown = (event, optionString) => {
      if (!isAnswered && (event.key === 'Enter' || event.key === ' ')) {
          checkAnswer(optionString);
          event.preventDefault();
      }
  };

  const isCompleted = currentIndex >= totalItemsInSet && totalItemsInSet > 0 && !isLoading;
  const finalMistakeCountForDisplay = missedItemsMaster.size;

  if (isLoading) { return <div className="loading">Memuat sinonim...</div>; }
  if (error) { return <div className="error">{error}</div>; }
  if (isCompleted) { const completionText = isReviewingMistakes ? "✨ Sesi Review Persamaan Selesai! ✨" : "✨ Latihan Persamaan Selesai! ✨"; const mistakesToShow = finalMistakeCountForDisplay; return ( <div className={styles.container}> <p className="completionMessage">{completionText}</p> {!isReviewingMistakes && mistakesToShow > 0 && ( <p className="completionSubMessage">Anda memiliki {mistakesToShow} item yang salah pada putaran awal.</p> )} <div className={styles.completionActions}> {finalMistakeCountForDisplay > 0 && !isReviewingMistakes && ( <button className="secondaryButton" onClick={handleReviewMistakes}>🔁 Ulangi Kesalahan ({finalMistakeCountForDisplay})</button> )} <button className="primaryButton" onClick={handleReshuffleAll}>{isReviewingMistakes ? 'Mulai Lagi Semua' : 'Ulangi Semua'}</button> </div> </div> ); }
  if (!currentItemFromMemo || !correctSynonymObject) { return <div className="loading">Memuat kata berikutnya...</div>; }

  return (
    <div className={styles.container} ref={pageRef} tabIndex={-1}>
        <ProgressBar current={currentIndex + 1} total={totalItemsInSet} label={isReviewingMistakes ? "Review Kesalahan Persamaan" : "Persamaan Kata"} />
        <div className={styles.card}>
            <p className={styles.label}>Carikan persamaan kata (sinonim) untuk:</p>
            <h2 className={styles.word}>{currentItemFromMemo.word || '[N/A]'}</h2>
            {currentItemFromMemo.example_sentence_target && (
                <p className={styles.exampleSentenceTarget}>"{currentItemFromMemo.example_sentence_target}"</p>
            )}
        </div>
        <div className={styles.optionsContainer} role="radiogroup" aria-labelledby="instruction-persamaan">
            <p className={styles.instruction} id="instruction-persamaan">Pilih salah satu persamaannya (Gunakan tombol 1, 2, 3, dst.):</p>
            {options.map((optionString, index) => {
              const isTheCorrectAnswer = optionString.toLowerCase() === correctSynonymObject.synonym.toLowerCase();
              let buttonClassName = styles.optionButton;
              if (isAnswered) {
                  if (isTheCorrectAnswer) buttonClassName += ` ${styles.correct}`;
                  else if (selectedAnswer === optionString) buttonClassName += ` ${styles.incorrect}`;
                  else buttonClassName += ` ${styles.disabled}`;
              }
              return (
                <button
                  key={`${currentItemFromMemo.id}-option-${index}-${optionString}`}
                  ref={el => optionButtonRefs.current[index] = el}
                  className={buttonClassName}
                  onClick={() => checkAnswer(optionString)}
                  onKeyDown={(e) => handleOptionKeyDown(e, optionString)}
                  disabled={isAnswered}
                  role="radio"
                  aria-checked={selectedAnswer === optionString}
                  tabIndex={isAnswered ? -1 : 0}
                >
                  <span className={styles.optionNumber}>{index + 1}.</span>
                  <span className={styles.optionText}>{optionString}</span>
                </button>
              );
            })}
        </div>
        {isAnswered && feedback && (
            <div
                className={`${styles.feedback} ${isCorrect ? styles.correctFeedback : styles.incorrectFeedback}`}
                role="alert"
            >
                {feedback.split('\n').map((line, i) => (
                    <span key={i} style={{ display: 'block', whiteSpace: 'pre-line' }}>
                        {line.startsWith('- **') ? (
                            <>
                                <span dangerouslySetInnerHTML={{ __html: line.substring(0, line.indexOf(':') + 1).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                                {line.substring(line.indexOf(':') + 1)}
                            </>
                        ) : (
                            line
                        )}
                    </span>
                ))}
                 {isCorrect && correctSynonymObject && correctSynonymObject.example_sentence_synonym && (
                    <p className={styles.feedbackExample}>
                        Contoh penggunaan: "<em>{correctSynonymObject.example_sentence_synonym}</em>"
                    </p>
                )}
            </div>
        )}
        {isAnswered && !isCorrect && (<button className="nextButton" ref={nextButtonRef} onClick={loadNextItem}>Lanjut <span className="arrowIcon">→</span></button>)}
    </div>
  );
};
export default PersamaanPage;
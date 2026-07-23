// src/pages/PersamaanPage.js
// CORRECTED: Keyboard navigation dependency for arrow keys
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { persamaanData } from '../data/persamaan';
import useTimeTracker from '../hooks/useTimeTracker';
import { recordLearnerActivity } from '../utils/activityTracker';
import { useAuth } from '../contexts/AuthContext';
import { saveStateToCloud, loadStateFromCloud } from '../utils/cloudSync';
import { useSettings } from '../contexts/SettingsContext';
import styles from './PersamaanPage.module.css';
import ProgressBar from '../components/ProgressBar';

const shuffleArray = (array) => { if (!Array.isArray(array)) return []; let currentIndex = array.length, randomIndex; while (currentIndex !== 0) { randomIndex = Math.floor(Math.random() * currentIndex); currentIndex--; [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]; } return array; };

const getDistractors = (allItems, currentItem, count = 2) => {
  const distractors = new Set();
  if (!Array.isArray(allItems) || !currentItem || !currentItem.word || !Array.isArray(currentItem.synonyms)) {
    console.error("Invalid input to getDistractors in PersamaanPage (Nav update)");
    return [];
  }
  const currentWordLower = currentItem.word.toLowerCase();
  const correctSynonymStringsLower = currentItem.synonyms.map(sObj => sObj.synonym.toLowerCase());
  const potentialDistractorWords = allItems
    .map(item => item.word)
    .filter(Boolean)
    .filter(word => {
      const wordLower = word.toLowerCase();
      return wordLower !== currentWordLower && !correctSynonymStringsLower.includes(wordLower);
    });
  const shuffledPool = shuffleArray([...new Set(potentialDistractorWords)]);
  for (const word of shuffledPool) {
    if (distractors.size >= count) break;
    distractors.add(word);
  }
  let fallbackCounter = 1;
  while (distractors.size < count) {
    const fallback = `[Opsi Salah ${fallbackCounter++}]`;
    if (![...distractors].includes(fallback)) { distractors.add(fallback); }
    if (fallbackCounter > count + 10) break;
  }
  return Array.from(distractors);
};

const BASE_LOCAL_STORAGE_KEY = 'kataPultPersamaanState_v4';
const getRandomThreshold = () => Math.floor(Math.random() * 4) + 2;

const PersamaanPracticeSession = ({ practiceSet, onBack, sessionTitle }) => {
  const { englishAssist } = useSettings();
  const storageKey = BASE_LOCAL_STORAGE_KEY + (sessionTitle ? '_' + sessionTitle.replace(/\s+/g, '') : '');
  useTimeTracker('Persamaan');
  const { currentUser } = useAuth();
  const isInitializedRef = useRef(false);
  const [allItems, setAllItems] = useState([]);
  const [displayItems, setDisplayItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [correctSynonymObject, setCorrectSynonymObject] = useState(null);
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
  const isCompletedRef = useRef(false);
  const currentItemRef = useRef(null);

  const { currentItem: currentItemFromMemo, totalItemsInSet } = useMemo(() => {
    const item = (displayItems && displayItems.length > 0 && currentIndex >= 0 && currentIndex < displayItems.length)
        ? displayItems[currentIndex]
        : null;
    currentItemRef.current = item;
    isCompletedRef.current = (currentIndex >= (displayItems?.length || 0) && (displayItems?.length || 0) > 0); // Update isCompletedRef here
    return { currentItem: item, totalItemsInSet: displayItems?.length || 0 };
  }, [displayItems, currentIndex]);

  const resetItemState = useCallback(() => {
    setSelectedAnswer(null);
    setFeedback('');
    setIsCorrect(false);
    setIsAnswered(false);
    if (options.length > 0 && optionButtonRefs.current && optionButtonRefs.current[0] && optionButtonRefs.current[0].current) {
        setTimeout(() => {
            if (optionButtonRefs.current[0]?.current) {
                 optionButtonRefs.current[0].current.focus();
            }
        }, 50);
    }
  }, [options.length]);


  const generateOptions = useCallback(() => {
     if (!currentItemRef.current || !Array.isArray(currentItemRef.current.synonyms) || currentItemRef.current.synonyms.length === 0 || !Array.isArray(allItems) || allItems.length === 0) {
       setOptions([]);
       setCorrectSynonymObject(null);
       return;
     }
     const chosenCorrectSynonymObj = currentItemRef.current.synonyms[Math.floor(Math.random() * currentItemRef.current.synonyms.length)];
     setCorrectSynonymObject(chosenCorrectSynonymObj);
     const distractors = getDistractors(allItems, currentItemRef.current, 2);
     const allOptionStrings = shuffleArray([chosenCorrectSynonymObj.synonym, ...distractors]);
     setOptions(allOptionStrings);
     optionButtonRefs.current = allOptionStrings.map((_, i) => optionButtonRefs.current[i] || React.createRef());
  }, [allItems]);

  useEffect(() => {
    if (!isLoading && currentItemFromMemo) {
      generateOptions();
      resetItemState();
    } else if (!isLoading && !currentItemFromMemo && totalItemsInSet > 0 && currentIndex >= totalItemsInSet) {
      isCompletedRef.current = true;
    } else if (!isLoading && !currentItemFromMemo) {
      setOptions([]);
      setCorrectSynonymObject(null);
    }
  }, [currentItemFromMemo, isLoading, generateOptions, resetItemState, totalItemsInSet, currentIndex]);


  const loadData = useCallback((itemsToLoad, isReviewSession) => {
      setIsLoading(true); setError(null);
      try {
          const validItems = itemsToLoad.filter(item => item.word && item.synonyms && item.synonyms.length > 0 && item.example_sentence_target && item.synonyms.every(s => s.synonym && s.example_sentence_synonym));
          if (!validItems || validItems.length === 0) throw new Error("Tidak ada data Persamaan yang valid dengan contoh kalimat.");
          setDisplayItems(shuffleArray([...validItems]));
          setCurrentIndex(0);
          setIsReviewingMistakes(isReviewSession);
          isCompletedRef.current = false;
          if (!isReviewSession) {
              setMissedItemsMaster(new Set()); setRetestQueue([]); setCorrectStreak(0);
              setRetestThreshold(getRandomThreshold());
              localStorage.removeItem(storageKey);
          }
      } catch (err) { console.error("Error loading Persamaan:", err); setError(err.message); setDisplayItems([]); }
      finally { setIsLoading(false); }
  }, []);

  useEffect(() => {
    const initPage = async () => {
      setIsLoading(true); setError(null);
      try {
          const filteredData = practiceSet || persamaanData.filter(item => item.word && item.synonyms && item.synonyms.length > 0 && item.example_sentence_target && item.synonyms.every(s => s.synonym && s.example_sentence_synonym));
          if (filteredData.length === 0) throw new Error("No valid Persamaan data with examples in source.");
          setAllItems(filteredData);

          let savedStateJSON = null;
          let source = 'none';

          if (currentUser && !isInitializedRef.current) {
             const cloudState = await loadStateFromCloud(currentUser.uid, storageKey);
             if (cloudState) {
                 savedStateJSON = JSON.stringify(cloudState);
                 source = 'cloud';
             }
          }

          if (!savedStateJSON) {
             savedStateJSON = localStorage.getItem(storageKey);
             if (savedStateJSON) source = 'local';
          }

          if (savedStateJSON) {
              const savedState = JSON.parse(savedStateJSON);
              if (savedState && typeof savedState.currentIndex === 'number' && Array.isArray(savedState.displayItemIds) && Array.isArray(savedState.missedItemsMaster) && Array.isArray(savedState.retestQueue) && typeof savedState.correctStreak === 'number') {
                  const currentAllItemsMap = new Map(filteredData.map(item => [item.id, item]));
                  const validSavedDisplayItems = savedState.displayItemIds.map(id => currentAllItemsMap.get(id)).filter(Boolean);
                  if(validSavedDisplayItems.length > 0 && savedState.currentIndex < validSavedDisplayItems.length) {
                      setDisplayItems(validSavedDisplayItems); setCurrentIndex(savedState.currentIndex);
                      setMissedItemsMaster(new Set(savedState.missedItemsMaster)); setIsReviewingMistakes(savedState.isReviewingMistakes || false);
                      setRetestQueue(savedState.retestQueue); setCorrectStreak(savedState.correctStreak);
                      setRetestThreshold(savedState.retestThreshold || getRandomThreshold());

                      if (source === 'cloud') {
                         localStorage.setItem(storageKey, savedStateJSON);
                      } else if (source === 'local' && currentUser) {
                         saveStateToCloud(currentUser.uid, storageKey, savedState);
                      }
                  } else { loadData(filteredData, false); }
              } else { loadData(filteredData, false); }
          } else { loadData(filteredData, false); }
          isInitializedRef.current = true;
      } catch (err) { console.error("Error init Persamaan:", err); setError(err.message); setAllItems([]); setDisplayItems([]); }
      finally { setIsLoading(false); }
    };
    initPage();
  }, [loadData, currentUser]);

  useEffect(() => {
      if (isLoading || error || !displayItems || displayItems.length === 0) return;
      const isCompletedNow = currentIndex >= displayItems.length;
      isCompletedRef.current = isCompletedNow; // Ensure ref is updated
      if (isCompletedNow) { if (localStorage.getItem(storageKey)) { localStorage.removeItem(storageKey); } return; }
      try {
          const stateToSave = { currentIndex: currentIndex, displayItemIds: displayItems.map(item => item.id ), missedItemsMaster: Array.from(missedItemsMaster), isReviewingMistakes: isReviewingMistakes, retestQueue: retestQueue, correctStreak: correctStreak, retestThreshold: retestThreshold };
          localStorage.setItem(storageKey, JSON.stringify(stateToSave));
          if (currentUser) {
             saveStateToCloud(currentUser.uid, storageKey, stateToSave);
          }
      } catch (err) { console.error("Failed to save Persamaan state:", err); }
  }, [currentIndex, displayItems, missedItemsMaster, isReviewingMistakes, retestQueue, correctStreak, retestThreshold, isLoading, error, currentUser]);


  const handleReshuffleAll = () => { if(allItems.length > 0) loadData(allItems, false); };
  const handleReviewMistakes = () => { const mistakeIds = Array.from(missedItemsMaster); if (mistakeIds.length === 0) {setFeedback("Tidak ada kesalahan untuk di-review."); return;} const itemsToReview = allItems.filter(item => mistakeIds.includes(item.id)); if (itemsToReview.length > 0) { loadData(itemsToReview, true); } else { setError("Tidak ada kesalahan untuk di-review, atau data item salah tidak ditemukan."); } };

  const advanceItem = useCallback((direction) => {
    if (!displayItems || displayItems.length === 0) return;
    let nextIndex = currentIndex;
    if (direction === 'next') {
        if (!isReviewingMistakes && retestQueue.length > 0 && correctStreak >= retestThreshold && currentIndex < displayItems.length -1) {
            const retestItemId = retestQueue[0];
            const retestItem = allItems.find(item => item.id === retestItemId);
            if (retestItem) {
                let nextDisplayItems = displayItems.filter(item => item.id !== retestItemId);
                const currentActualIndexInDisplay = nextDisplayItems.findIndex(item => item.id === currentItemRef.current?.id);
                if (currentActualIndexInDisplay !== -1 && currentActualIndexInDisplay < nextDisplayItems.length -1) {
                    nextDisplayItems.splice(currentActualIndexInDisplay + 1, 0, retestItem);
                } else { nextDisplayItems.push(retestItem); }
                setDisplayItems(nextDisplayItems);
                nextIndex = nextDisplayItems.findIndex(item => item.id === retestItemId);
                if(nextIndex === -1) nextIndex = currentIndex + 1;
                setRetestQueue(prev => prev.slice(1)); setCorrectStreak(0); setRetestThreshold(getRandomThreshold());
            } else { setRetestQueue(prev => prev.slice(1)); nextIndex = Math.min(currentIndex + 1, displayItems.length); }
        } else { nextIndex = Math.min(currentIndex + 1, displayItems.length); }
    } else if (direction === 'previous') {
        nextIndex = Math.max(currentIndex - 1, 0);
    }
    setCurrentIndex(nextIndex);
  }, [currentIndex, displayItems, allItems, retestQueue, correctStreak, isReviewingMistakes, retestThreshold]);

  const checkAnswer = useCallback((selectedOptionString) => {
    if (isAnswered || !currentItemRef.current || !correctSynonymObject) return;
    setIsAnswered(true);
    const correct = selectedOptionString.toLowerCase() === correctSynonymObject.synonym.toLowerCase();
    setIsCorrect(correct);
    setSelectedAnswer(selectedOptionString);
    recordLearnerActivity({
      eventType: 'answer_attempt',
      section: 'Persamaan MCQ',
      route: '/persamaan',
      itemType: 'synonym_mcq',
      correct
    }).catch((error) => console.warn('Failed to record answer attempt:', error));

    if (correct) {
      setFeedback(`Tepat! "${selectedOptionString}" adalah sinonim yang benar. 👍`);
      setCorrectStreak(prev => prev + 1);
      setRetestQueue(prevQ => prevQ.filter(id => id !== currentItemRef.current.id));
    } else {
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
    }
  }, [isAnswered, correctSynonymObject, isReviewingMistakes, retestQueue]);

   useEffect(() => {
    const handlePageKeyDown = (event) => {
        // Use the ref for completion status as it's updated more immediately
        if (isCompletedRef.current) return;

        if (!isAnswered && ['1', '2', '3', '4'].includes(event.key)) {
            const optionIndex = parseInt(event.key, 10) - 1;
            if (options[optionIndex] && optionButtonRefs.current[optionIndex]?.current) {
                checkAnswer(options[optionIndex]);
                event.preventDefault();
            }
        } else if (event.key === 'ArrowRight') {
            advanceItem('next');
            event.preventDefault();
        } else if (event.key === 'ArrowLeft') {
            advanceItem('previous');
            event.preventDefault();
        } else if (event.key === 'Enter' && isAnswered) {
             if (!optionButtonRefs.current.some(ref => ref.current === document.activeElement) &&
                  document.activeElement?.tagName !== 'BUTTON') {
                 advanceItem('next');
                 event.preventDefault();
            }
        }
    };
    const pageElement = pageRef.current;
    if (pageElement) { pageElement.addEventListener('keydown', handlePageKeyDown); }
    return () => { if (pageElement) pageElement.removeEventListener('keydown', handlePageKeyDown); };
  // CRITICAL FIX: Add currentIndex and totalItemsInSet (or isCompletedRef directly if preferred) to ensure isCompletedRef is fresh.
  // Adding `isAnswered` is also important for the Enter key logic.
  }, [options, checkAnswer, advanceItem, isAnswered, isCorrect, currentIndex, totalItemsInSet]);

  const handleOptionKeyDown = (event, optionString) => {
      if (!isAnswered && (event.key === 'Enter' || event.key === ' ')) {
          checkAnswer(optionString);
          event.preventDefault();
      }
  };

  const isCompleted = currentIndex >= totalItemsInSet && totalItemsInSet > 0 && !isLoading;
  const finalMistakeCountForDisplay = missedItemsMaster.size;

  if (isLoading) { return <div className="loading">{englishAssist ? "Loading synonyms..." : "Memuat sinonim..."}</div>; }
  if (error) { return <div className="error">{error}</div>; }
  if (isCompleted) {
      const completionText = isReviewingMistakes ? (englishAssist ? "✨ Persamaan Review Complete! ✨" : "✨ Sesi Review Persamaan Selesai! ✨") : (englishAssist ? "✨ Persamaan Practice Complete! ✨" : "✨ Latihan Persamaan Selesai! ✨");
      const mistakesToShow = finalMistakeCountForDisplay;
      return (
          <div className={styles.container}>
              <p className="completionMessage">{completionText}</p>
              {!isReviewingMistakes && mistakesToShow > 0 && (
                  <p className="completionSubMessage">{englishAssist ? `You had ${mistakesToShow} incorrect items initially.` : `Anda memiliki ${mistakesToShow} item yang salah pada putaran awal.`}</p>
              )}
              <div className={styles.completionActions}>
                  {finalMistakeCountForDisplay > 0 && !isReviewingMistakes && (
                      <button className="secondaryButton" onClick={handleReviewMistakes}>🔁 {englishAssist ? `Review Mistakes (${finalMistakeCountForDisplay})` : `Ulangi Kesalahan (${finalMistakeCountForDisplay})`}</button>
                  )}
                  <button className="primaryButton" onClick={handleReshuffleAll}>{isReviewingMistakes ? (englishAssist ? 'Restart All' : 'Mulai Lagi Semua') : (englishAssist ? 'Restart All' : 'Ulangi Semua')}</button>
                  {onBack && (
                      <button className="secondaryButton" onClick={onBack} style={{marginTop: '10px'}}>{englishAssist ? 'Back to Hub' : 'Kembali ke Hub'}</button>
                  )}
              </div>
          </div>
      );
  }

  if (!currentItemFromMemo || (options.length > 0 && !correctSynonymObject) ) {
    return <div className="loading" style={{textAlign: 'center', padding: '50px', fontSize: '1.2rem'}}>{englishAssist ? "Loading next word..." : "Memuat kata berikutnya..."}</div>;
  }


  return (
    <div className={styles.container} ref={pageRef} tabIndex={-1}>
        <ProgressBar current={currentIndex + 1} total={totalItemsInSet} label={sessionTitle ? sessionTitle : (isReviewingMistakes ? "Review Kesalahan Persamaan" : "Persamaan Kata")} />
        {onBack && (
          <button onClick={onBack} className={styles.backButton} style={{alignSelf: 'flex-start', marginBottom: '10px', background: 'none', border: 'none', color: '#3b82f6', cursor: 'pointer', fontWeight: 'bold'}}>
            ← {englishAssist ? 'Back' : 'Kembali'}
          </button>
        )}
        <div className={styles.card}>
            <p className={styles.label}>{englishAssist ? 'Find the synonym for:' : 'Carikan persamaan kata (sinonim) untuk:'}</p>
            <h2 className={styles.word}>{currentItemFromMemo.word || '[N/A]'}</h2>
            {currentItemFromMemo.example_sentence_target && (
                <p className={styles.exampleSentenceTarget}>"{currentItemFromMemo.example_sentence_target}"</p>
            )}
        </div>
        <div className={styles.optionsContainer} role="radiogroup" aria-labelledby="instruction-persamaan">
            <p className={styles.instruction} id="instruction-persamaan">{englishAssist ? 'Select one synonym (Use keys 1, 2, 3, etc.):' : 'Pilih salah satu persamaannya (Gunakan tombol 1, 2, 3, dst.):'}</p>
            {options.map((optionString, index) => {
              const isTheCorrectAnswer = correctSynonymObject && optionString.toLowerCase() === correctSynonymObject.synonym.toLowerCase();
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
        <div className="action-buttons-container">
            <button
                className="secondaryButton"
                onClick={() => advanceItem('previous')}
                disabled={currentIndex === 0 || isLoading}
                aria-label="Pertanyaan Sebelumnya"
            >
                <span className="arrowIcon">←</span> {englishAssist ? 'Previous' : 'Sebelumnya'}
            </button>
            <button
                className="nextButton"
                onClick={() => advanceItem('next')}
                disabled={isLoading || (currentIndex >= totalItemsInSet -1 && isCompletedRef.current)}
                aria-label="Pertanyaan Berikutnya"
            >
                {currentIndex >= totalItemsInSet - 1 ? (englishAssist ? "See Results" : "Lihat Hasil") : (englishAssist ? "Next" : "Lanjut")} <span className="arrowIcon">→</span>
            </button>
        </div>
    </div>
  );
};
export default PersamaanPracticeSession;

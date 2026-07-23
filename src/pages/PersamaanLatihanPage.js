// src/pages/PersamaanLatihanPage.js
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { persamaanData } from '../data/persamaan';
import { recordLearnerActivity } from '../utils/activityTracker';
import { useAuth } from '../contexts/AuthContext';
import { saveStateToCloud, loadStateFromCloud } from '../utils/cloudSync';
import { useSettings } from '../contexts/SettingsContext';
import styles from './PersamaanLatihanPage.module.css';
import ProgressBar from '../components/ProgressBar';
import { LoadingState, PracticeActions } from '../components/SharedUI';

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

const LOCAL_STORAGE_KEY = 'kataPultPersamaanLatihanState_v1';
const NUM_INPUT_FIELDS = 3;

const PersamaanLatihanPage = () => {
  const { currentUser } = useAuth();
  const { englishAssist } = useSettings();
  const isInitializedRef = useRef(false);
  const [allItems, setAllItems] = useState([]);
  const [displayItems, setDisplayItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const initialUserInputs = useMemo(() => Array(NUM_INPUT_FIELDS).fill(''), []);
  const [userInputs, setUserInputs] = useState(initialUserInputs);
  const [feedbackForEachInput, setFeedbackForEachInput] = useState(Array(NUM_INPUT_FIELDS).fill(null));

  const [isAnswered, setIsAnswered] = useState(false);
  const [sessionScore, setSessionScore] = useState(0);
  const [revealedSynonyms, setRevealedSynonyms] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const inputRefs = useRef([]);
  const pageRef = useRef(null);
  const isCompletedRef = useRef(false);
  const currentItemRef = useRef(null);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, NUM_INPUT_FIELDS);
    for (let i = 0; i < NUM_INPUT_FIELDS; i++) {
      if (!inputRefs.current[i]) {
        inputRefs.current[i] = React.createRef();
      }
    }
  }, []);


  const { currentItem, totalItemsInSet } = useMemo(() => {
    const item = (displayItems && displayItems.length > 0 && currentIndex >= 0 && currentIndex < displayItems.length)
      ? displayItems[currentIndex]
      : null;
    currentItemRef.current = item;
    isCompletedRef.current = (currentIndex >= (displayItems?.length || 0) && (displayItems?.length || 0) > 0);
    return { currentItem: item, totalItemsInSet: displayItems?.length || 0 };
  }, [displayItems, currentIndex]);

  const resetItemState = useCallback(() => {
    setUserInputs(initialUserInputs);
    setFeedbackForEachInput(Array(NUM_INPUT_FIELDS).fill(null));
    setIsAnswered(false);
    setRevealedSynonyms([]);
    if (inputRefs.current[0] && inputRefs.current[0].current) {
      setTimeout(() => {
        if (inputRefs.current[0] && inputRefs.current[0].current) {
            inputRefs.current[0].current.focus();
        }
      }, 50);
    }
  }, [initialUserInputs]);

  const loadData = useCallback((itemsToLoad) => {
    setIsLoading(true); setError(null);
    try {
      const validItems = itemsToLoad.filter(item => item.word && Array.isArray(item.synonyms) && item.synonyms.length > 0 && item.example_sentence_target);
      if (!validItems || validItems.length === 0) {
        throw new Error("Tidak ada data Persamaan yang valid dengan contoh kalimat dan sinonim untuk latihan ini.");
      }
      const shuffled = shuffleArray([...validItems]);
      setDisplayItems(shuffled);
      setCurrentIndex(0);
      setSessionScore(0);
      isCompletedRef.current = false;
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      setError(null);
    } catch (err) {
      console.error("Error processing Persamaan Latihan data:", err);
      setError(err.message || "Gagal memproses data Persamaan.");
      setDisplayItems([]); setCurrentIndex(0);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const initPage = async () => {
      setIsLoading(true); setError(null);
      try {
        const filteredData = persamaanData.filter(item => item.word && Array.isArray(item.synonyms) && item.synonyms.length > 0 && item.example_sentence_target);
        if (filteredData.length === 0) throw new Error("No valid Persamaan data for Latihan mode. Check data source.");
        setAllItems(filteredData);

        let savedStateJSON = null;
        let source = 'none';

        if (currentUser && !isInitializedRef.current) {
           const cloudState = await loadStateFromCloud(currentUser.uid, LOCAL_STORAGE_KEY);
           if (cloudState) {
               savedStateJSON = JSON.stringify(cloudState);
               source = 'cloud';
           }
        }

        if (!savedStateJSON) {
           savedStateJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
           if (savedStateJSON) source = 'local';
        }

        if (savedStateJSON) {
          const savedState = JSON.parse(savedStateJSON);
          if (savedState && typeof savedState.currentIndex === 'number' && Array.isArray(savedState.displayItemIds) && typeof savedState.score === 'number') {
            const currentAllItemsMap = new Map(filteredData.map(item => [item.id, item]));
            const validSavedDisplayItems = savedState.displayItemIds.map(id => currentAllItemsMap.get(id)).filter(Boolean);

            if(validSavedDisplayItems.length > 0 && savedState.currentIndex < validSavedDisplayItems.length) {
              setDisplayItems(validSavedDisplayItems);
              setCurrentIndex(savedState.currentIndex);
              setSessionScore(savedState.score);

              if (source === 'cloud') {
                 localStorage.setItem(LOCAL_STORAGE_KEY, savedStateJSON);
              } else if (source === 'local' && currentUser) {
                 saveStateToCloud(currentUser.uid, LOCAL_STORAGE_KEY, savedState);
              }
            } else { loadData(filteredData); }
          } else { loadData(filteredData); }
        } else { loadData(filteredData); }
        isInitializedRef.current = true;
      } catch (err) {
        console.error("Error initializing Persamaan Latihan page:", err);
        setError(err.message || "Gagal memuat data Persamaan Latihan.");
        setAllItems([]); setDisplayItems([]);
      } finally { setIsLoading(false); }
    };
    initPage();
  }, [loadData, currentUser]);

  useEffect(() => {
    if (!isLoading && currentItem) {
      resetItemState();
    }
     isCompletedRef.current = (currentIndex >= totalItemsInSet && totalItemsInSet > 0 && !isLoading);

  }, [currentItem, isLoading, resetItemState, currentIndex, totalItemsInSet]);


  useEffect(() => {
    if (isLoading || error || !displayItems || displayItems.length === 0) return;

    if (isCompletedRef.current) {
      if (localStorage.getItem(LOCAL_STORAGE_KEY)) {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      }
      return;
    }
    try {
      const stateToSave = {
        currentIndex: currentIndex,
        displayItemIds: displayItems.map(item => item.id),
        score: sessionScore
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stateToSave));
      if (currentUser) {
         saveStateToCloud(currentUser.uid, LOCAL_STORAGE_KEY, stateToSave);
      }
    } catch (err) { console.error("Failed to save Persamaan Latihan state:", err); }
  }, [currentIndex, displayItems, sessionScore, isLoading, error, currentUser]);


  const handleInputChange = (index, value) => {
    const newInputs = [...userInputs];
    newInputs[index] = value;
    setUserInputs(newInputs);
  };

  const checkAnswer = useCallback(() => {
    if (!currentItemRef.current || isAnswered) return;
    setIsAnswered(true);

    let scoreIncrement = 0;
    const newFeedbacks = Array(NUM_INPUT_FIELDS).fill(null);
    const correctSynonymsForCurrentItem = currentItemRef.current.synonyms.map(s => s.synonym.toLowerCase().trim());
    const alreadyGuessedCorrectly = new Set();

    userInputs.forEach((input, index) => {
      const trimmedInput = input.trim().toLowerCase();
      if (trimmedInput === '') {
        newFeedbacks[index] = null;
        return;
      }
      if (correctSynonymsForCurrentItem.includes(trimmedInput) && !alreadyGuessedCorrectly.has(trimmedInput)) {
        newFeedbacks[index] = 'correct';
        scoreIncrement++;
        alreadyGuessedCorrectly.add(trimmedInput);
      } else {
        newFeedbacks[index] = 'incorrect';
      }
    });

    setSessionScore(prev => prev + scoreIncrement);
    setFeedbackForEachInput(newFeedbacks);
    setRevealedSynonyms(currentItemRef.current.synonyms.map(s => s.synonym));
    recordLearnerActivity({
      eventType: 'answer_attempt',
      section: 'Persamaan Latihan',
      route: '/persamaan-latihan',
      itemType: 'synonym_recall',
      correct: scoreIncrement > 0
    }).catch((error) => console.warn('Failed to record answer attempt:', error));
  }, [userInputs, isAnswered]);

  const advanceItem = useCallback((direction) => {
    if (!displayItems || displayItems.length === 0) return;
    let nextIdx = currentIndex;
    if (direction === 'next') {
      nextIdx = Math.min(currentIndex + 1, displayItems.length);
    } else if (direction === 'previous') {
      nextIdx = Math.max(currentIndex - 1, 0);
    }
    setCurrentIndex(nextIdx);
  }, [currentIndex, displayItems]);

  useEffect(() => {
    const handlePageKeyDown = (event) => {
      if (isCompletedRef.current) return;
      if (inputRefs.current.some(ref => ref.current === document.activeElement)) {
        if (event.key === 'Enter' && !isAnswered && userInputs.some(input => input.trim() !== '')) {
            checkAnswer();
            event.preventDefault();
        }
        return;
      }

      if (event.key === 'Enter') {
        if (!isAnswered && userInputs.some(input => input.trim() !== '')) {
          checkAnswer();
          event.preventDefault();
        } else if (isAnswered) {
           if (document.activeElement?.tagName !== 'BUTTON') {
              advanceItem('next');
              event.preventDefault();
           }
        }
      } else if (event.key === 'ArrowRight' && isAnswered) {
        advanceItem('next');
        event.preventDefault();
      } else if (event.key === 'ArrowLeft' && currentIndex > 0) {
        advanceItem('previous');
        event.preventDefault();
      }
    };
    const pageElement = pageRef.current;
    if (pageElement && !isLoading) {
      pageElement.addEventListener('keydown', handlePageKeyDown);
    }
    return () => { if (pageElement) pageElement.removeEventListener('keydown', handlePageKeyDown); };
  }, [isAnswered, userInputs, checkAnswer, advanceItem, currentIndex, isLoading]);

  const handleReshuffleAll = () => {
    if (allItems.length > 0) loadData(allItems);
  };

  const isCompleted = currentIndex >= totalItemsInSet && totalItemsInSet > 0 && !isLoading;

  if (isLoading) { return <LoadingState label={englishAssist ? "Loading Persamaan Practice..." : "Memuat Latihan Persamaan Kata..."} />; }
  if (error) { return <div className="error" style={{whiteSpace: 'pre-wrap'}}>{error}</div>; }

  if (isCompleted) {
    return (
      <div className={styles.container} ref={pageRef} tabIndex={-1}>
        <p className="completionMessage">{englishAssist ? "✨ Persamaan Practice Complete! ✨" : "✨ Latihan Persamaan Kata Selesai! ✨"}</p>
        <p className="completionSubMessage">{englishAssist ? "Your Score:" : "Skor Anda:"} {sessionScore} {englishAssist ? "points" : "poin"}</p>
        <div className="completionActions">
          <button className="primaryButton" onClick={handleReshuffleAll} autoFocus>
            {englishAssist ? "Restart All" : "Ulangi Semua"}
          </button>
        </div>
      </div>
    );
  }

  if (!currentItem) { return <div className="loading">{englishAssist ? "Loading next word..." : "Memuat kata berikutnya..."}</div>; }

  return (
    <div className={styles.container} ref={pageRef} tabIndex={-1}>
      <ProgressBar current={currentIndex + 1} total={totalItemsInSet} label={englishAssist ? "Persamaan Practice" : "Latihan Persamaan Kata"} />

      <div className={styles.questionCard}>
        {/* MODIFIED INSTRUCTION HERE */}
        <p className={styles.instruction}>{englishAssist ? `Write synonyms for the following word (you can enter up to ${NUM_INPUT_FIELDS}):` : `Tuliskan sinonim untuk kata berikut (Anda bisa memasukkan hingga ${NUM_INPUT_FIELDS}):`}</p>
        <h2 className={styles.targetWord}>{currentItem.word}</h2>
        {currentItem.example_sentence_target && (
            <p className={styles.exampleSentence}>"{currentItem.example_sentence_target}"</p>
        )}
      </div>

      <div className={styles.inputsContainer}>
        {userInputs.map((input, index) => (
          <div key={index} className={styles.inputGroup}>
            <input
              ref={inputRefs.current[index]}
              type="text"
              value={input}
              onChange={(e) => handleInputChange(index, e.target.value)}
              placeholder={englishAssist ? `Synonym ${index + 1}` : `Sinonim ${index + 1}`}
              className={`${styles.synonymInput} ${
                isAnswered && feedbackForEachInput[index] === 'correct' ? styles.correctInput : ''
              } ${
                isAnswered && feedbackForEachInput[index] === 'incorrect' ? styles.incorrectInput : ''
              }`}
              disabled={isAnswered}
              aria-label={`Input untuk sinonim ke-${index + 1}`}
              autoCapitalize="none"
            />
            {isAnswered && feedbackForEachInput[index] && (
              <span className={`${styles.inputFeedback} ${
                feedbackForEachInput[index] === 'correct' ? styles.correctFeedbackText : styles.incorrectFeedbackText
              }`}>
                {feedbackForEachInput[index] === 'correct' ? (englishAssist ? '✓ Correct' : '✓ Tepat') : (englishAssist ? '✗ Incorrect' : '✗ Kurang Tepat')}
              </span>
            )}
          </div>
        ))}
      </div>

      {!isAnswered && (
        <button
            className="primaryButton"
            onClick={checkAnswer}
            disabled={userInputs.every(input => input.trim() === '')}
            style={{marginTop: '20px'}}
        >
          {englishAssist ? 'Check Answer' : 'Periksa Jawaban'}
        </button>
      )}

      {isAnswered && revealedSynonyms.length > 0 && (
        <div className={styles.revealedAnswersCard}>
          <h3 className={styles.revealedTitle}>{englishAssist ? 'Correct Synonym Options:' : 'Pilihan Sinonim yang Benar:'}</h3>
          <ul className={styles.synonymList}>
            {revealedSynonyms.map((syn, idx) => (
              <li key={idx} className={styles.synonymListItem}>{syn}</li>
            ))}
          </ul>
        </div>
      )}

      <PracticeActions>
        <button
          className="secondaryButton"
          onClick={() => advanceItem('previous')}
          disabled={currentIndex === 0 || isLoading}
          aria-label="Kata Sebelumnya"
        >
          <span className="arrowIcon">←</span> {englishAssist ? 'Previous' : 'Sebelumnya'}
        </button>
        <button
          className="nextButton"
          onClick={() => advanceItem('next')}
          disabled={isLoading || (currentIndex >= totalItemsInSet - 1 && isCompletedRef.current) || !isAnswered}
          aria-label="Kata Berikutnya"
        >
          {currentIndex >= totalItemsInSet - 1 ? (englishAssist ? 'See Results' : 'Lihat Hasil') : (englishAssist ? 'Next' : 'Lanjut')} <span className="arrowIcon">→</span>
        </button>
      </PracticeActions>
    </div>
  );
};

export default PersamaanLatihanPage;

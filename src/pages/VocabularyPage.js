// src/pages/VocabularyPage.js
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { vocabularyData } from '../data/vocabulary';
import styles from './VocabularyPage.module.css'; // Ensure CSS Module import

const shuffleArray = (array) => {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
};

const VocabularyPage = () => {
  const [shuffledWords, setShuffledWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentWord = useMemo(() => {
      if (shuffledWords.length > 0 && currentIndex < shuffledWords.length) {
          return shuffledWords[currentIndex];
      }
      return null;
  }, [shuffledWords, currentIndex]);

  useEffect(() => {
    setShuffledWords(shuffleArray([...vocabularyData]));
    setCurrentIndex(0);
  }, []);

  const handleReshuffle = () => {
    setShuffledWords(shuffleArray([...vocabularyData]));
    setCurrentIndex(0);
  };

  const loadNextWord = useCallback(() => {
    if (currentIndex < shuffledWords.length - 1) {
      setCurrentIndex(prevIndex => prevIndex + 1);
    } else {
       setCurrentIndex(prevIndex => prevIndex + 1);
    }
  }, [currentIndex, shuffledWords.length]);

  const isCompleted = currentIndex >= shuffledWords.length && shuffledWords.length > 0;

  return (
    <div className={styles.container}>
      {isCompleted ? (
         <>
            <p className={styles.completionMessage}>Latihan Vocabulary Selesai!</p>
            <button className={styles.button} onClick={handleReshuffle}>
                Ulangi Latihan
            </button>
        </>
      ) : currentWord ? (
        <>
          <div className={styles.card}>
            <h2 className={styles.word}>{currentWord.word}</h2>
            <p className={styles.definition}>{currentWord.definition}</p>

            {/* Example Sentence Section */}
            {currentWord.exampleSentence && (
                <div className={styles.exampleSection}>
                    <p className={styles.exampleLabel}>Contoh Kalimat:</p>
                    <p className={styles.exampleSentence}>{currentWord.exampleSentence}</p>
                    {/* Translation Section - NEW */}
                    {currentWord.exampleTranslation && (
                        <div className={styles.translationSection}>
                             <p className={styles.translationLabel}>Terjemahan Contoh:</p>
                             <p className={styles.translationText}>{currentWord.exampleTranslation}</p>
                        </div>
                    )}
                </div>
            )}
          </div>

          <button className={styles.button} onClick={loadNextWord}>
            Lanjut (Next)
          </button>
        </>
      ) : (
        <p className={styles.loading}>Memuat kata...</p>
      )}
    </div>
  );
};

export default VocabularyPage;

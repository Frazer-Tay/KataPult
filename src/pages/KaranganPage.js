/ src/pages/KaranganPage.js
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { karanganData } from '../data/karangan';
import styles from './KaranganPage.module.css'; // Ensure CSS Module import

const shuffleArray = (array) => {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
};

const KaranganPage = () => {
  const [shuffledItems, setShuffledItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [options, setOptions] = useState([]); // Stores MCQ definition options
  const [selectedAnswer, setSelectedAnswer] = useState(null); // Clicked definition
  const [feedback, setFeedback] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);

  const currentItem = useMemo(() => {
      if (shuffledItems.length > 0 && currentIndex < shuffledItems.length) {
          return shuffledItems[currentIndex];
      }
      return null;
  }, [shuffledItems, currentIndex]);

  useEffect(() => {
    // Filter items that actually have definitions to test against
    const validItems = karanganData.filter(item => item.definition && item.definition.trim() !== '');
    setShuffledItems(shuffleArray([...validItems]));
    setCurrentIndex(0);
  }, []);

  // Generate MCQ options (using DEFINITIONS)
  const generateOptions = useCallback(() => {
    if (!currentItem || shuffledItems.length < 3) return;

    const correctDefinition = currentItem.definition;
    const distractors = [];
    const potentialDistractorItems = shuffledItems.filter(item => item.id !== currentItem.id);
    const shuffledDistractorPool = shuffleArray([...potentialDistractorItems]);

    for (let i = 0; distractors.length < 2 && i < shuffledDistractorPool.length; i++) {
      const distractorItem = shuffledDistractorPool[i];
      if (distractorItem.definition &&
          distractorItem.definition.toLowerCase() !== correctDefinition.toLowerCase() &&
          !distractors.includes(distractorItem.definition))
      {
          distractors.push(distractorItem.definition);
      }
    }
     while (distractors.length < 2) {
        distractors.push(`Definisi distraktor ${distractors.length + 1}`);
    }

    const allOptions = shuffleArray([correctDefinition, ...distractors]);
    setOptions(allOptions);

  }, [currentItem, shuffledItems]);

  useEffect(() => {
    generateOptions();
    setSelectedAnswer(null);
    setFeedback('');
    setIsAnswered(false);
  }, [currentItem, generateOptions]);

  const handleReshuffle = () => {
    const validItems = karanganData.filter(item => item.definition && item.definition.trim() !== '');
    setShuffledItems(shuffleArray([...validItems]));
    setCurrentIndex(0);
  };

  const loadNextItem = useCallback(() => {
    if (currentIndex < shuffledItems.length - 1) {
        setCurrentIndex(prevIndex => prevIndex + 1);
    } else {
         setCurrentIndex(prevIndex => prevIndex + 1);
    }
  }, [currentIndex, shuffledItems.length]);

  const checkAnswer = (selectedOption) => {
    if (isAnswered || !currentItem) return;

    setSelectedAnswer(selectedOption);
    setIsAnswered(true);

    if (selectedOption.toLowerCase() === currentItem.definition.toLowerCase()) {
      setFeedback('Benar!');
      setTimeout(loadNextItem, 1500);
    } else {
      setFeedback(`Salah. Arti yang benar: ${currentItem.definition}`);
    }
  };

  const isCompleted = currentIndex >= shuffledItems.length && shuffledItems.length > 0;

  return (
    <div className={styles.container}>
      {isCompleted ? (
        <>
            <p className={styles.completionMessage}>Latihan Karangan Selesai!</p>
            <button className={styles.button} onClick={handleReshuffle}>
                Ulangi Latihan
            </button>
        </>
      ) : currentItem ? (
        <>
          <div className={styles.card}>
            <h2 className={styles.word}>{currentItem.word}</h2>
            {/* Display Synonyms if available */}
            {currentItem.synonyms && currentItem.synonyms.length > 0 && (
                <div className={styles.synonymSection}>
                    <p className={styles.synonymLabel}>Sinonim:</p>
                    <p className={styles.synonymText}>{currentItem.synonyms.join(', ')}</p>
                </div>
            )}
          </div>

          <div className={styles.optionsContainer}>
            <p className={styles.instruction}>Pilih definisi (arti) yang paling tepat:</p>
            {options.map((option, index) => {
              let buttonStyle = styles.optionButton;
              if (isAnswered) {
                if (option.toLowerCase() === currentItem.definition.toLowerCase()) {
                    buttonStyle = `${styles.optionButton} ${styles.correct}`;
                } else if (selectedAnswer === option) {
                    buttonStyle = `${styles.optionButton} ${styles.incorrect}`;
                } else {
                    buttonStyle = `${styles.optionButton} ${styles.disabled}`;
                }
              }
              return (
                <button
                  key={index}
                  className={buttonStyle}
                  onClick={() => checkAnswer(option)}
                  disabled={isAnswered}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {isAnswered && feedback && (
            <p className={`${styles.feedback} ${feedback === 'Benar!' ? styles.correctFeedback : styles.incorrectFeedback}`} role="alert">
              {feedback}
            </p>
          )}

           {isAnswered && feedback.startsWith('Salah') && (
            <button className={styles.nextButton} onClick={loadNextItem}>
              Lanjut (Next)
            </button>
          )}
        </>
      ) : (
        <p className={styles.loading}>Memuat kata Karangan...</p>
      )}
    </div>
  );
};

export default KaranganPage;
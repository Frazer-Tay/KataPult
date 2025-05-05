// src/pages/PersamaanPage.js
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { persamaanData } from '../data/persamaan';
import styles from './PersamaanPage.module.css'; // Ensure CSS Module import

const shuffleArray = (array) => {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
};

const PersamaanPage = () => {
  const [validItems, setValidItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [options, setOptions] = useState([]); // Stores MCQ options [string]
  const [selectedAnswer, setSelectedAnswer] = useState(null); // Stores the user's clicked answer (string)
  const [feedback, setFeedback] = useState(''); // Correct/Incorrect message
  const [isAnswered, setIsAnswered] = useState(false); // Flag to lock buttons after answer

  // Memoize current item
  const currentItem = useMemo(() => {
      if (validItems.length > 0 && currentIndex < validItems.length) {
          return validItems[currentIndex];
      }
      return null;
  }, [validItems, currentIndex]);

  // Filter valid data and shuffle on mount
  useEffect(() => {
    const filteredData = persamaanData.filter(item => item.synonyms && item.synonyms.length > 0);
    setValidItems(shuffleArray([...filteredData]));
    setCurrentIndex(0);
  }, []);

  // Function to generate MCQ options
  const generateOptions = useCallback(() => {
    if (!currentItem || validItems.length < 3) return; // Need at least 3 items for distractors

    // 1. Get the correct answer (pick one synonym)
    const correctSynonym = currentItem.synonyms[Math.floor(Math.random() * currentItem.synonyms.length)];

    // 2. Get distractors
    const distractors = [];
    const potentialDistractorItems = validItems.filter(item => item.id !== currentItem.id); // Exclude current item
    const shuffledDistractors = shuffleArray([...potentialDistractorItems]);

    for (let i = 0; distractors.length < 2 && i < shuffledDistractors.length; i++) {
      const distractorItem = shuffledDistractors[i];
      if (distractorItem.synonyms && distractorItem.synonyms.length > 0) {
          const potentialDistractor = distractorItem.synonyms[0]; // Take the first synonym as distractor
          // Ensure distractor is not the same as the correct answer or another synonym of the current item
          if (potentialDistractor.toLowerCase() !== correctSynonym.toLowerCase() &&
              !currentItem.synonyms.map(s => s.toLowerCase()).includes(potentialDistractor.toLowerCase()) &&
              !distractors.includes(potentialDistractor))
          {
            distractors.push(potentialDistractor);
          }
      }
    }
     // Fallback if not enough unique distractors found (rare)
     while (distractors.length < 2) {
        distractors.push(`Distraktor ${distractors.length + 1}`); // Placeholder
    }


    // 3. Combine and shuffle
    const allOptions = shuffleArray([correctSynonym, ...distractors]);
    setOptions(allOptions);

  }, [currentItem, validItems]);

  // Generate options when currentItem changes
  useEffect(() => {
    generateOptions();
    // Reset state for the new question
    setSelectedAnswer(null);
    setFeedback('');
    setIsAnswered(false);
  }, [currentItem, generateOptions]); // Rerun when currentItem or the generator changes

  const handleReshuffle = () => {
    const filteredData = persamaanData.filter(item => item.synonyms && item.synonyms.length > 0);
    setValidItems(shuffleArray([...filteredData]));
    setCurrentIndex(0);
  };

  const loadNextItem = useCallback(() => {
    if (currentIndex < validItems.length - 1) {
        setCurrentIndex(prevIndex => prevIndex + 1);
    } else {
         setCurrentIndex(prevIndex => prevIndex + 1); // Go beyond bounds to trigger completion
    }
  }, [currentIndex, validItems.length]);

  const checkAnswer = (selectedOption) => {
    if (isAnswered || !currentItem) return; // Prevent re-answering

    setSelectedAnswer(selectedOption); // Store selected option for styling
    setIsAnswered(true); // Lock buttons

    const correctSynonymsLower = currentItem.synonyms.map(s => s.toLowerCase());

    if (correctSynonymsLower.includes(selectedOption.toLowerCase())) {
      setFeedback('Benar!');
      setTimeout(loadNextItem, 1500); // Auto-advance after delay
    } else {
      const allAnswers = currentItem.synonyms.join(', ');
      setFeedback(`Salah. Jawaban yang benar: ${allAnswers}`);
      // No auto-advance on incorrect, wait for user
    }
  };

  const isCompleted = currentIndex >= validItems.length && validItems.length > 0;

  return (
    <div className={styles.container}>
       {isCompleted ? (
         // Completion State
         <>
            <p className={styles.completionMessage}>Latihan Persamaan Selesai!</p>
            <button className={styles.button} onClick={handleReshuffle}>
                Ulangi Latihan
            </button>
        </>
      ) : currentItem ? (
        // Active Learning State
        <>
          <div className={styles.card}>
            <p className={styles.label}>Kata:</p>
            <h2 className={styles.word}>{currentItem.word}</h2>
          </div>

          <div className={styles.optionsContainer}>
            <p className={styles.instruction}>Pilih salah satu persamaannya (sinonim):</p>
            {options.map((option, index) => {
              // Determine button style based on answer state
              let buttonStyle = styles.optionButton; // Default
              if (isAnswered) {
                const correctSynonymsLower = currentItem.synonyms.map(s => s.toLowerCase());
                if (correctSynonymsLower.includes(option.toLowerCase())) {
                    buttonStyle = `${styles.optionButton} ${styles.correct}`; // Correct answer style
                } else if (selectedAnswer === option) {
                    buttonStyle = `${styles.optionButton} ${styles.incorrect}`; // Incorrectly selected answer style
                } else {
                    buttonStyle = `${styles.optionButton} ${styles.disabled}`; // Other incorrect options disabled
                }
              } else if (selectedAnswer === option) {
                 // Temporarily highlight selected before checking (optional)
                 // buttonStyle = `${styles.optionButton} ${styles.selected}`;
              }

              return (
                <button
                  key={index}
                  className={buttonStyle}
                  onClick={() => checkAnswer(option)}
                  disabled={isAnswered} // Disable all after answering
                >
                  {option}
                </button>
              );
            })}
          </div>

          {isAnswered && feedback && ( // Show feedback only after answering
            <p className={`${styles.feedback} ${feedback === 'Benar!' ? styles.correctFeedback : styles.incorrectFeedback}`} role="alert">
              {feedback}
            </p>
          )}

          {/* Optional: Explicit Next Button for incorrect answers */}
          {isAnswered && feedback.startsWith('Salah') && (
            <button className={styles.nextButton} onClick={loadNextItem}>
              Lanjut (Next)
            </button>
          )}
        </>
      ) : (
        // Loading State
        <p className={styles.loading}>Memuat sinonim...</p>
      )}
    </div>
  );
};

export default PersamaanPage;
// src/pages/PersamaanPage.js
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { persamaanData } from '../data/persamaan';
import styles from './PersamaanPage.module.css'; // Import the CSS module

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

const PersamaanPage = () => {
  const [validItems, setValidItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Memoize current item and total count
  const { currentItem, totalItems } = useMemo(() => {
      const item = (validItems && validItems.length > 0 && currentIndex < validItems.length)
          ? validItems[currentIndex]
          : null;
      return { currentItem: item, totalItems: validItems?.length || 0 };
  }, [validItems, currentIndex]);

  // Filter valid data and shuffle on mount
  useEffect(() => {
    setIsLoading(true);
    setError(null);
    try {
      const filteredData = persamaanData.filter(item => item.synonyms && item.synonyms.length > 0);
       if (filteredData.length === 0) {
           throw new Error("No valid synonym data found.");
       }
      setValidItems(shuffleArray([...filteredData]));
      setCurrentIndex(0);
    } catch (err) {
        console.error("Error loading/filtering Persamaan data:", err);
        setError("Gagal memuat data Persamaan.");
    } finally {
        setIsLoading(false);
    }
  }, []);

  // Function to generate MCQ options
  const generateOptions = useCallback(() => {
    if (!currentItem || validItems.length === 0) {
        setOptions([]); // Clear options if no item or no valid items
        return;
    }
     // Ensure we have enough items for distractors, otherwise handle gracefully
    const potentialDistractorItems = validItems.filter(item => item.id !== currentItem.id);
    if (potentialDistractorItems.length < 2 && validItems.length >= 3) {
        // This case is tricky, might reuse distractors or show fewer options
        console.warn("Not enough unique items for 2 distractors. Options might repeat.");
    }


    // Get the correct answer
    const correctSynonym = currentItem.synonyms[Math.floor(Math.random() * currentItem.synonyms.length)];

    // Get distractors
    const distractors = [];
    const shuffledDistractors = shuffleArray([...potentialDistractorItems]);

    for (let i = 0; distractors.length < 2 && i < shuffledDistractors.length; i++) {
      const distractorItem = shuffledDistractors[i];
      if (distractorItem.synonyms && distractorItem.synonyms.length > 0) {
          const potentialDistractor = distractorItem.synonyms[0];
          if (potentialDistractor.toLowerCase() !== correctSynonym.toLowerCase() &&
              !currentItem.synonyms.map(s => s.toLowerCase()).includes(potentialDistractor.toLowerCase()) &&
              !distractors.includes(potentialDistractor))
          {
            distractors.push(potentialDistractor);
          }
      }
    }
     // Fallback if still not enough unique distractors
     let fallbackCounter = 1;
     while (distractors.length < 2) {
        const fallbackDistractor = `Opsi ${fallbackCounter++}`; // Simple placeholder
        if (fallbackDistractor.toLowerCase() !== correctSynonym.toLowerCase()) {
             distractors.push(fallbackDistractor);
        } else {
             // Avoid adding the correct answer as a fallback distractor
             fallbackCounter++;
             distractors.push(`Opsi ${fallbackCounter++}`);
        }
    }


    const allOptions = shuffleArray([correctSynonym, ...distractors]);
    setOptions(allOptions);

  }, [currentItem, validItems]); // Add validItems dependency

  // Generate options when currentItem changes
  useEffect(() => {
    if (!isLoading && currentItem) {
        generateOptions();
        setSelectedAnswer(null);
        setFeedback('');
        setIsAnswered(false);
    }
  }, [currentItem, isLoading, generateOptions]);

  const handleReshuffle = () => {
     setIsLoading(true);
     setError(null);
     try {
        const filteredData = persamaanData.filter(item => item.synonyms && item.synonyms.length > 0);
        if (filteredData.length === 0) {
           throw new Error("No valid synonym data found for reshuffle.");
        }
        setValidItems(shuffleArray([...filteredData]));
        setCurrentIndex(0);
     } catch(err) {
        console.error("Error reshuffling Persamaan data:", err);
        setError("Gagal memulai ulang latihan.");
     } finally {
        setIsLoading(false);
     }
  };

  const loadNextItem = useCallback(() => {
     // Ensure validItems exists and has items before proceeding
     if (!validItems || validItems.length === 0) return;
     if (currentIndex < validItems.length - 1) {
        setCurrentIndex(prevIndex => prevIndex + 1);
    } else {
         setCurrentIndex(validItems.length); // Go beyond bounds for completion
    }
  }, [currentIndex, validItems]);

  const checkAnswer = (selectedOption) => {
    if (isAnswered || !currentItem) return;

    setSelectedAnswer(selectedOption);
    setIsAnswered(true);

    const correctSynonymsLower = currentItem.synonyms.map(s => s.toLowerCase());
    const isCorrect = correctSynonymsLower.includes(selectedOption.toLowerCase());

    if (isCorrect) {
      setFeedback('Benar!');
      // Optionally add a class or state for animation
      setTimeout(loadNextItem, 1500); // Auto-advance after delay
    } else {
      const allAnswers = currentItem.synonyms.join(', ');
      setFeedback(`Salah. Jawaban: ${allAnswers}`);
      // No auto-advance on incorrect
    }
  };

  const isCompleted = currentIndex >= totalItems && totalItems > 0 && !isLoading;

  // --- Render Logic ---

  if (isLoading) {
    return <div className={styles.loading}>Memuat sinonim...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (isCompleted) {
    return (
      <div className={styles.container}>
          <p className={styles.completionMessage}>Latihan Persamaan Selesai!</p>
          <button className={styles.primaryButton} onClick={handleReshuffle}>
              Ulangi Latihan
          </button>
      </div>
    );
  }

  if (!currentItem) {
     return <div className={styles.loading}>Tidak ada data persamaan yang valid.</div>;
  }

  return (
    <div className={styles.container}>
        {/* Progress Indicator */}
        <p className={styles.progressIndicator}>
            Kata {currentIndex + 1} / {totalItems}
        </p>

        <div className={styles.card}>
            <p className={styles.label}>Kata:</p>
            <h2 className={styles.word}>{currentItem.word}</h2>
        </div>

        <div className={styles.optionsContainer}>
            <p className={styles.instruction}>Pilih salah satu persamaannya (sinonim):</p>
            {options.map((option, index) => {
            let buttonClassName = styles.optionButton; // Default
            const isCorrectOption = currentItem.synonyms.map(s => s.toLowerCase()).includes(option.toLowerCase());

            if (isAnswered) {
                if (isCorrectOption) {
                    buttonClassName += ` ${styles.correct}`; // Correct answer style
                } else if (selectedAnswer === option) {
                    buttonClassName += ` ${styles.incorrect}`; // Incorrectly selected answer style
                } else {
                    buttonClassName += ` ${styles.disabled}`; // Other incorrect options disabled
                }
            }

            return (
                <button
                key={`${currentItem.id}-${index}-${option}`} // More unique key
                className={buttonClassName}
                onClick={() => checkAnswer(option)}
                disabled={isAnswered}
                >
                <span className={styles.optionText}>{option}</span>
                {/* Icons will be added via CSS pseudo-elements */}
                </button>
            );
            })}
        </div>

        {/* Feedback Area */}
        {isAnswered && feedback && (
            <p className={`${styles.feedback} ${feedback === 'Benar!' ? styles.correctFeedback : styles.incorrectFeedback}`} role="alert">
            {feedback}
            </p>
        )}

        {/* Explicit Next Button for incorrect answers */}
        {isAnswered && feedback.startsWith('Salah') && (
            <button className={styles.nextButton} onClick={loadNextItem}>
            Lanjut
            <span className={styles.arrowIcon}>→</span> {/* Right arrow */}
            </button>
        )}
    </div>
  );
};

export default PersamaanPage;
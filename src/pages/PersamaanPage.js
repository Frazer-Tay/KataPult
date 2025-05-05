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

// Function to get N unique distractors from other items
const getDistractors = (allItems, currentItem, count = 2) => {
    const distractors = new Set(); // Use a Set to ensure uniqueness
    const potentialDistractorItems = allItems.filter(item => item.id !== currentItem.id);
    const shuffledPool = shuffleArray([...potentialDistractorItems]);

    for (const item of shuffledPool) {
        if (distractors.size >= count) break;
        if (item.synonyms && item.synonyms.length > 0) {
            const potentialDistractor = item.synonyms[0]; // Simple strategy: take the first synonym
            // Ensure it's not one of the actual answers for the current item
            if (!currentItem.synonyms.map(s => s.toLowerCase()).includes(potentialDistractor.toLowerCase())) {
                distractors.add(potentialDistractor);
            }
        }
    }

    // Fallback if not enough unique distractors found
    let fallbackCounter = 1;
    while (distractors.size < count) {
        const fallback = `[Opsi ${String.fromCharCode(65 + distractors.size + fallbackCounter)}]`; // Placeholder like [Opsi B]
        if (!currentItem.synonyms.map(s => s.toLowerCase()).includes(fallback.toLowerCase())) {
            distractors.add(fallback);
        }
        fallbackCounter++;
        if (fallbackCounter > 10) break; // Safety break
    }

    return Array.from(distractors);
};


const PersamaanPage = () => {
  const [validItems, setValidItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null); // The string value of the selected option
  const [feedback, setFeedback] = useState('');
  const [isAnswered, setIsAnswered] = useState(false); // Flag to lock buttons and show feedback
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
      const filteredData = persamaanData.filter(item => item.synonyms && item.synonyms.length > 0 && item.word);
       if (filteredData.length === 0) {
           throw new Error("Tidak ada data persamaan yang valid ditemukan.");
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
    if (!currentItem || !validItems || validItems.length < 1) {
        setOptions([]);
        return;
    }

    // Pick one correct synonym randomly
    const correctSynonym = currentItem.synonyms[Math.floor(Math.random() * currentItem.synonyms.length)];

    // Get distractors
    const distractors = getDistractors(validItems, currentItem, 2); // Get 2 distractors

    // Combine and shuffle
    const allOptions = shuffleArray([correctSynonym, ...distractors]);
    setOptions(allOptions);

  }, [currentItem, validItems]);

  // Generate options when currentItem changes
  useEffect(() => {
    if (!isLoading && currentItem) {
        generateOptions();
        // Reset state for the new question
        setSelectedAnswer(null);
        setFeedback('');
        setIsAnswered(false);
    }
  }, [currentItem, isLoading, generateOptions]);

  const handleReshuffle = () => {
     setIsLoading(true);
     setError(null);
     try {
        const filteredData = persamaanData.filter(item => item.synonyms && item.synonyms.length > 0 && item.word);
        if (filteredData.length === 0) {
           throw new Error("Tidak ada data persamaan yang valid untuk diulang.");
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
      setFeedback('Tepat! Jawaban Benar.'); // More engaging feedback
      setTimeout(loadNextItem, 1500);
    } else {
      const allAnswers = currentItem.synonyms.join(', ');
      setFeedback(`Kurang Tepat. Sinonim yang benar: ${allAnswers}`); // Clearer incorrect feedback
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
          <p className={styles.completionMessage}>✨ Latihan Persamaan Selesai! ✨</p>
          <button className={styles.primaryButton} onClick={handleReshuffle}>
              Ulangi Latihan
          </button>
      </div>
    );
  }

  if (!currentItem) {
     // This might happen if filtering results in empty array initially
     return <div className={styles.loading}>Tidak ada data persamaan untuk ditampilkan.</div>;
  }

  return (
    <div className={styles.container}>
        <p className={styles.progressIndicator}>
            Kata {currentIndex + 1} / {totalItems}
        </p>

        <div className={styles.card}>
            <p className={styles.label}>Carikan persamaan kata untuk:</p>
            <h2 className={styles.word}>{currentItem.word}</h2>
        </div>

        <div className={styles.optionsContainer}>
            {options.map((option, index) => {
              const isCorrectOption = currentItem.synonyms.map(s => s.toLowerCase()).includes(option.toLowerCase());
              let buttonClassName = styles.optionButton;

              if (isAnswered) {
                if (isCorrectOption) {
                    // Always highlight correct answer green
                    buttonClassName += ` ${styles.correct}`;
                } else if (selectedAnswer === option) {
                    // Highlight the user's wrong choice red
                    buttonClassName += ` ${styles.incorrect}`;
                } else {
                    // Fade out other incorrect options
                    buttonClassName += ` ${styles.disabled}`;
                }
              }

              return (
                <button
                  // Use a more robust key combining item id and option
                  key={`${currentItem.id}-option-${index}`}
                  className={buttonClassName}
                  onClick={() => checkAnswer(option)}
                  disabled={isAnswered} // Disable all after one is chosen
                  aria-pressed={selectedAnswer === option} // Accessibility hint
                >
                  <span className={styles.optionText}>{option}</span>
                  {/* Icons are added via CSS :before pseudo-elements */}
                </button>
              );
            })}
        </div>

        {/* Feedback Area - only show after answer */}
        {isAnswered && feedback && (
            <div className={`${styles.feedback} ${feedback.startsWith('Tepat') ? styles.correctFeedback : styles.incorrectFeedback}`} role="alert">
                 {/* Optionally add icon here too if not using pseudo-elements */}
                 {feedback}
            </div>
        )}

        {/* Explicit Next Button ONLY for incorrect answers */}
        {isAnswered && feedback.startsWith('Kurang Tepat') && (
            <button className={styles.nextButton} onClick={loadNextItem}>
            Lanjut
            <span className={styles.arrowIcon}>→</span>
            </button>
        )}
    </div>
  );
};

export default PersamaanPage;
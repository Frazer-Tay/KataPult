// src/pages/FlashcardsPage.js
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { flashcardsData } from '../data/flashcardsData'; // Adjust path
// In src/pages/FlashcardsPage.js
import styles from './FlashcardsPages.module.css'; // <--- Ensure this matches the CSS filename
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

const FlashcardsPage = () => {
  const [allSets, setAllSets] = useState([]);
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false); // Only for 'topic-card' type
  const [isLoading, setIsLoading] = useState(true);
  const pageRef = useRef(null);

  useEffect(() => {
    if (flashcardsData && flashcardsData.length > 0) {
      setAllSets(shuffleArray([...flashcardsData])); // Shuffle the order of sets
      setCurrentSetIndex(0);
      setIsFlipped(false);
    }
    setIsLoading(false);
  }, []);

  const currentSet = useMemo(() => {
    return allSets && allSets.length > 0 ? allSets[currentSetIndex] : null;
  }, [allSets, currentSetIndex]);

  const handleFlip = useCallback(() => {
    if (currentSet && currentSet.type === 'topic-card') {
      setIsFlipped(!isFlipped);
    }
  }, [currentSet, isFlipped]);

  const advanceSet = useCallback((direction) => {
    if (!allSets || allSets.length === 0) return;
    let nextIdx = currentSetIndex;
    if (direction === 'next') {
      nextIdx = (currentSetIndex + 1) % allSets.length; // Loop
    } else if (direction === 'previous') {
      nextIdx = (currentSetIndex - 1 + allSets.length) % allSets.length; // Loop
    }
    setCurrentSetIndex(nextIdx);
    setIsFlipped(false); // Reset flip state for the new set
  }, [currentSetIndex, allSets]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!currentSet) return;
      if (currentSet.type === 'topic-card' && event.key === ' ') {
        handleFlip();
        event.preventDefault();
      } else if (event.key === 'ArrowRight') {
        advanceSet('next');
        event.preventDefault();
      } else if (event.key === 'ArrowLeft') {
        advanceSet('previous');
        event.preventDefault();
      }
    };
    const pageElement = pageRef.current;
    if (pageElement) {
      pageElement.addEventListener('keydown', handleKeyDown);
      pageElement.focus();
    }
    return () => { if (pageElement) pageElement.removeEventListener('keydown', handleKeyDown); };
  }, [advanceSet, currentSet, handleFlip]);

  if (isLoading) {
    return <div className="loading">Memuat Flashcards...</div>;
  }

  if (!currentSet) {
    return <div className={styles.flashcardsContainer}>Tidak ada data flashcard untuk ditampilkan.</div>;
  }

  const renderPhraseList = (set) => (
    <div className={styles.phraseSet}>
      <h2 className={styles.setTitle}>{set.title}</h2>
      <ul className={styles.phraseList}>
        {set.phrases.map((phrase, index) => (
          <li key={index} className={styles.phraseItem}>
            <p className={styles.phraseEnglish}>{phrase.english}</p>
            <p className={styles.phraseMalay}><em>({phrase.malay})</em></p>
          </li>
        ))}
      </ul>
    </div>
  );

  const renderTopicCard = (set) => (
    <div className={`${styles.flashcard} ${isFlipped ? styles.flipped : ''}`} onClick={handleFlip}>
      <div className={styles.flashcardInner}>
        <div className={styles.flashcardFront}>
          <h2 className={styles.cardTitle}>{set.title}</h2>
          <p className={styles.flipInstruction}>(Klik untuk melihat detail / Tekan Spasi)</p>
        </div>
        <div className={styles.flashcardBack}>
          <h3 className={styles.cardTitleBack}>{set.title}</h3>
          {set.main_points.map((point, pIdx) => (
            <div key={pIdx} className={styles.mainPoint}>
              <h4>{pIdx + 1}. {point.title_english} <em>({point.title_malay})</em></h4>
              <ul>
                {point.examples.map((ex, eIdx) => (
                  <li key={eIdx}>
                    {ex.english} <br/><em>({ex.malay})</em>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {set.key_phrases && set.key_phrases.length > 0 && (
            <div className={styles.keyPhrasesSection}>
              <h4>Frasa Kunci:</h4>
              <ul>
                {set.key_phrases.map((phrase, kIdx) => (
                  <li key={kIdx}>{phrase.english} <em>({phrase.malay})</em></li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.flashcardsContainer} ref={pageRef} tabIndex={-1}>
      <ProgressBar current={currentSetIndex + 1} total={allSets.length} label="Set Flashcard" />
      
      {currentSet.type === 'phrase-list' && renderPhraseList(currentSet)}
      {currentSet.type === 'topic-card' && renderTopicCard(currentSet)}

      <div className={styles.navigationButtons}>
        <button className="secondaryButton" onClick={() => advanceSet('previous')} disabled={allSets.length <= 1}>
          <span className="arrowIcon">←</span> Set Sebelumnya
        </button>
        {currentSet.type === 'topic-card' && (
          <button className="primaryButton" onClick={handleFlip}>
            {isFlipped ? 'Lihat Judul' : 'Lihat Detail'}
          </button>
        )}
        <button className="nextButton" onClick={() => advanceSet('next')} disabled={allSets.length <= 1}>
          Set Berikutnya <span className="arrowIcon">→</span>
        </button>
      </div>
    </div>
  );
};

export default FlashcardsPage;
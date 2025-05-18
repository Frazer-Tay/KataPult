// src/pages/FlashcardsPage.js
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { flashcardsData } from '../data/flashcardsData';
import styles from './FlashcardsPages.module.css'; // Ensure this filename matches yours
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
  const [currentSetIndex, setCurrentSetIndex] = useState(0); // DEFINED HERE
  const [isDetailsRevealed, setIsDetailsRevealed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const pageRef = useRef(null);

  useEffect(() => {
    try {
      if (flashcardsData && flashcardsData.length > 0) {
        const shuffledSets = shuffleArray([...flashcardsData]);
        setAllSets(shuffledSets);
        setCurrentSetIndex(0); // CORRECTLY SETTING THE INDEX
        setIsDetailsRevealed(false);
        setError(null); 
      } else {
        console.warn("No flashcards data found or data is empty.");
        setError("Tidak ada data flashcard untuk ditampilkan saat ini.");
        setAllSets([]);
        setCurrentSetIndex(0); 
      }
    } catch (e) {
      console.error("Error processing flashcards data:", e);
      setError("Terjadi kesalahan saat memuat data flashcard.");
      setAllSets([]);
      setCurrentSetIndex(0); 
    } finally {
      setIsLoading(false);
    }
  }, []); 

  const currentSet = useMemo(() => {
    if (!isLoading && allSets && allSets.length > 0 && currentSetIndex < allSets.length) {
        return allSets[currentSetIndex];
    }
    return null;
  }, [allSets, currentSetIndex, isLoading]);

  const toggleDetails = useCallback(() => {
    if (currentSet && currentSet.type === 'topic-essay-points') {
      setIsDetailsRevealed(prev => !prev);
    }
  }, [currentSet]);

  const advanceSet = useCallback((direction) => {
    if (!allSets || allSets.length === 0) return;
    let nextIdx = currentSetIndex;
    if (direction === 'next') {
      nextIdx = (currentSetIndex + 1) % allSets.length;
    } else if (direction === 'previous') {
      nextIdx = (currentSetIndex - 1 + allSets.length) % allSets.length;
    }
    setCurrentIndex(nextIdx);
    setIsDetailsRevealed(false);
  }, [currentSetIndex, allSets]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!currentSet || isLoading) return;
      if (currentSet.type === 'topic-essay-points' && (event.key === ' ' || event.key === 'Enter')) {
        if(document.activeElement?.tagName !== 'BUTTON'){
            toggleDetails();
            event.preventDefault();
        }
      } else if (event.key === 'ArrowRight') {
        advanceSet('next');
        event.preventDefault();
      } else if (event.key === 'ArrowLeft') {
        advanceSet('previous');
        event.preventDefault();
      }
    };
    const pageElement = pageRef.current;
    if (pageElement && !isLoading) { 
      pageElement.addEventListener('keydown', handleKeyDown);
      pageElement.focus();
    }
    return () => { if (pageElement) pageElement.removeEventListener('keydown', handleKeyDown); };
  }, [advanceSet, currentSet, toggleDetails, isLoading]);

  if (isLoading) {
    return <div className="loading" style={{textAlign: 'center', padding: '50px', fontSize: '1.2rem'}}>Memuat Flashcards...</div>;
  }

  if (error) {
    return <div className="error" style={{textAlign: 'center', padding: '50px', fontSize: '1.2rem'}}>{error}</div>;
  }

  if (!currentSet) {
    return <div className={styles.flashcardsContainer} style={{textAlign: 'center', padding: '50px', fontSize: '1.2rem'}}>Tidak ada data flashcard untuk ditampilkan.</div>;
  }

  const renderPhraseList = (set) => (
    <div className={styles.phraseSet}>
      <h2 className={styles.setTitle}>{set.title}</h2>
      <ul className={styles.phraseList}>
        {set.phrases.map((phrase, index) => (
          <li key={`${set.id}-phrase-${index}`} className={styles.phraseItem}>
            <p className={styles.phraseEnglish}>{phrase.english}</p>
            <p className={styles.phraseMalay}><em>({phrase.malay})</em></p>
          </li>
        ))}
      </ul>
    </div>
  );

  const renderTopicEssayPoints = (set) => (
    <div className={styles.topicEssayCardContainer}>
        <div className={styles.topicHeader}>
            <h2 className={styles.cardTitle}>{set.title_english}</h2>
            {set.title_malay && <p className={styles.cardTitleMalay}><em>({set.title_malay})</em></p>}
        </div>

        {set.introduction_prompt_english && (
            <div className={styles.essayPromptSection}>
                <h3 className={styles.promptTitle}>Arahan Pendahuluan:</h3>
                <p className={styles.promptTextEng}>{set.introduction_prompt_english}</p>
                <p className={styles.promptTextMalay}><em>({set.introduction_prompt_malay})</em></p>
            </div>
        )}

        {isDetailsRevealed ? (
            <div className={styles.topicDetails}>
                {set.main_points.map((point, pIdx) => (
                    <div key={`${set.id}-point-${pIdx}`} className={styles.mainPoint}>
                    <h4 className={styles.pointTitle}>{pIdx + 1}. {point.point_title_english} <em className={styles.pointTitleMalay}>({point.point_title_malay})</em></h4>
                    <p className={styles.elaboration}><strong>Elaborasi:</strong> {point.elaboration_english} <em className={styles.elaborationMalay}>({point.elaboration_malay})</em></p>
                    <p className={styles.example}><strong>Contoh:</strong> {point.example_english} <em className={styles.exampleMalay}>({point.example_malay})</em></p>
                    </div>
                ))}

                {set.key_vocabulary && set.key_vocabulary.length > 0 && (
                    <div className={styles.keyVocabularySection}>
                    <h3 className={styles.sectionSubTitle}>Kosakata Kunci:</h3>
                    <ul className={styles.vocabularyList}>
                        {set.key_vocabulary.map((vocab, vIdx) => (
                        <li key={`${set.id}-vocab-${vIdx}`}>
                            <strong>{vocab.english}:</strong> {vocab.malay}
                        </li>
                        ))}
                    </ul>
                    </div>
                )}

                {set.linking_phrases_english && set.linking_phrases_english.length > 0 && (
                    <div className={styles.linkingPhrasesSection}>
                    <h3 className={styles.sectionSubTitle}>Frasa Penghubung Berguna:</h3>
                    <div className={styles.linkingPair}>
                        <div>
                        <strong>English:</strong>
                        <ul>{set.linking_phrases_english.map((lp, lIdx) => <li key={`lp-en-${lIdx}`}>{lp}</li>)}</ul>
                        </div>
                        <div>
                        <strong>Malay:</strong>
                        <ul>{set.linking_phrases_malay.map((lp, lIdx) => <li key={`lp-ms-${lIdx}`}>{lp}</li>)}</ul>
                        </div>
                    </div>
                    </div>
                )}
                
                {set.conclusion_prompt_english && (
                    <div className={styles.essayPromptSection} style={{marginTop: '20px'}}>
                        <h3 className={styles.promptTitle}>Arahan Kesimpulan:</h3>
                        <p className={styles.promptTextEng}>{set.conclusion_prompt_english}</p>
                        <p className={styles.promptTextMalay}><em>({set.conclusion_prompt_malay})</em></p>
                    </div>
                )}
            </div>
        ) : (
            <div className={styles.clickToReveal}>
                <p>(Klik "Lihat Detail" atau tekan Spasi/Enter untuk membuka poin-poin esai)</p>
            </div>
        )}
    </div>
  );

  return (
    <div className={styles.flashcardsContainer} ref={pageRef} tabIndex={-1}>
      <ProgressBar current={currentSetIndex + 1} total={allSets.length} label="Set Flashcard" />
      
      {currentSet && currentSet.type === 'phrase-list' && renderPhraseList(currentSet)}
      {currentSet && currentSet.type === 'topic-essay-points' && renderTopicEssayPoints(currentSet)}

      <div className={styles.navigationButtons}>
        <button className="secondaryButton" onClick={() => advanceSet('previous')} disabled={allSets.length <= 1 || isLoading}>
          <span className="arrowIcon">←</span> Set Sebelumnya
        </button>
        {currentSet && currentSet.type === 'topic-essay-points' && (
          <button className="primaryButton" onClick={toggleDetails} disabled={isLoading}>
            {isDetailsRevealed ? 'Sembunyikan Detail' : 'Lihat Detail'}
          </button>
        )}
        <button className="nextButton" onClick={() => advanceSet('next')} disabled={allSets.length <= 1 || isLoading}>
          Set Berikutnya <span className="arrowIcon">→</span>
        </button>
      </div>
    </div>
  );
};

export default FlashcardsPage;
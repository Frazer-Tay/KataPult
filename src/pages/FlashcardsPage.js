// src/pages/FlashcardsPage.js
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { flashcardsData } from '../data/flashcardsData'; // Adjust path if needed
import styles from './FlashcardsPages.module.css'; // Ensure this filename matches your CSS module
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
  const [currentSetIndex, setCurrentIndex] = useState(0);
  const [isDetailsRevealed, setIsDetailsRevealed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const pageRef = useRef(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    try {
      if (flashcardsData && flashcardsData.length > 0) {
        const shuffledSets = shuffleArray([...flashcardsData]);
        setAllSets(shuffledSets);
        setCurrentIndex(0);
        setIsDetailsRevealed(false);
        setError(null);
      } else {
        console.warn("No flashcards data found or data is empty.");
        setError("Tidak ada data flashcard untuk ditampilkan saat ini.");
        setAllSets([]);
        setCurrentIndex(0);
      }
    } catch (e) {
      console.error("Error processing flashcards data:", e);
      setError("Terjadi kesalahan saat memuat data flashcard.");
      setAllSets([]);
      setCurrentIndex(0);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const currentSet = useMemo(() => {
    // console.log("Current allSets in useMemo:", allSets); // For debugging
    if (!isLoading && allSets && allSets.length > 0 && currentSetIndex >= 0 && currentSetIndex < allSets.length) {
        // console.log("Current Set Data:", JSON.stringify(allSets[currentSetIndex], null, 2)); // For debugging
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

  if (!currentSet && !isLoading) {
    return <div className={styles.flashcardsContainer} style={{textAlign: 'center', padding: '50px', fontSize: '1.2rem'}}>Tidak ada data flashcard untuk ditampilkan. Periksa `src/data/flashcardsData.js`.</div>;
  }
  if (!currentSet) {
    return <div className="loading" style={{textAlign: 'center', padding: '50px', fontSize: '1.2rem'}}>Memuat set berikutnya...</div>;
  }

  const renderPhraseList = (set) => (
    <div className={styles.phraseSet}>
      <h2 className={styles.setTitle}>{set.title}</h2> {/* Assuming title is a single string as per your data */}
      <ul className={styles.phraseList}>
        {set.phrases.map((phrase, index) => (
          <li key={`${set.id}-phrase-${index}`} className={styles.phraseItem}>
            {/* Indonesian first */}
            <p className={styles.phraseMalay}>{phrase.malay}</p>
            {/* English translation in italics and parentheses */}
            {phrase.english && <p className={styles.phraseEnglish}><em>({phrase.english})</em></p>}
          </li>
        ))}
      </ul>
    </div>
  );

  const renderTopicEssayPoints = (set) => (
    <div className={styles.topicEssayCardContainer}>
        <div className={styles.topicHeader}>
            {/* Indonesian title first */}
            <h2 className={styles.cardTitle}>{set.title_malay}</h2>
            {/* English translation in italics and parentheses */}
            {set.title_english && <p className={styles.cardTitleEnglish}><em>({set.title_english})</em></p>}
        </div>

        {/* Assuming prompts also have _malay and _english versions if you want that order */}
        {set.introduction_prompt_malay && ( // Check for malay prompt first
            <div className={styles.essayPromptSection}>
                <h3 className={styles.promptTitle}>Arahan Pendahuluan:</h3>
                <p className={styles.promptTextMalay}>{set.introduction_prompt_malay}</p>
                {set.introduction_prompt_english && <p className={styles.promptTextEnglish}><em>({set.introduction_prompt_english})</em></p>}
            </div>
        )}

        {isDetailsRevealed ? (
            <div className={styles.topicDetails}>
                {set.main_points.map((point, pIdx) => (
                    <div key={`${set.id}-point-${pIdx}`} className={styles.mainPoint}>
                        {/* Indonesian point title first */}
                        <h4 className={styles.pointTitle}>
                            {pIdx + 1}. {point.title_malay} 
                            {point.title_english && <em className={styles.pointTitleEnglish}>({point.title_english})</em>}
                        </h4>
                    
                        {/* Examples: Indonesian first */}
                        {point.examples && point.examples.length > 0 && (
                            <div className={styles.examplesList}>
                                <ul>
                                    {point.examples.map((ex, exIdx) => (
                                        <li key={exIdx}>
                                            {ex.malay} 
                                            {ex.english && <em className={styles.exampleEnglish}>({ex.english})</em>}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Rendering challenge_rebuttal: Indonesian first */}
                        {point.challenge_rebuttal && (
                            <div className={styles.challengeRebuttalSection}>
                                <h5 className={styles.challengeTitle}>Tantangan/Kritik:</h5>
                                <p className={styles.challengeTextMalay}>{point.challenge_rebuttal.challenge_malay}</p>
                                {point.challenge_rebuttal.challenge_english && <p className={styles.challengeTextEnglish}><em>({point.challenge_rebuttal.challenge_english})</em></p>}
                                
                                <h5 className={styles.rebuttalTitle}>Jawaban/Solusi:</h5>
                                <p className={styles.rebuttalTextMalay}>{point.challenge_rebuttal.rebuttal_malay}</p>
                                {point.challenge_rebuttal.rebuttal_english && <p className={styles.rebuttalTextEnglish}><em>({point.challenge_rebuttal.rebuttal_english})</em></p>}
                            </div>
                        )}
                    </div>
                ))}

                {/* Key Phrases: Indonesian first (assuming 'malay' is the Indonesian text) */}
                {set.key_phrases && set.key_phrases.length > 0 && (
                    <div className={styles.keyVocabularySection}>
                        <h3 className={styles.sectionSubTitle}>Frasa Kunci:</h3>
                        <ul className={styles.vocabularyList}>
                            {set.key_phrases.map((phrase, kIdx) => (
                            <li key={`${set.id}-keyphrase-${kIdx}`}>
                                <strong>{phrase.malay}:</strong> {phrase.english && <em>({phrase.english})</em>}
                            </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Linking Phrases: Indonesian first */}
                {set.linking_phrases_malay && set.linking_phrases_malay.length > 0 && ( // Check for malay version
                    <div className={styles.linkingPhrasesSection}>
                        <h3 className={styles.sectionSubTitle}>Frasa Penghubung Berguna:</h3>
                        <div className={styles.linkingPair}>
                            <div>
                                <strong>Bahasa Indonesia:</strong>
                                <ul>{set.linking_phrases_malay.map((lp, lIdx) => <li key={`lp-ms-${lIdx}`}>{lp}</li>)}</ul>
                            </div>
                            {set.linking_phrases_english && set.linking_phrases_english.length > 0 && (
                                <div>
                                    <strong>English:</strong>
                                    <ul>{set.linking_phrases_english.map((lp, lIdx) => <li key={`lp-en-${lIdx}`}>{lp}</li>)}</ul>
                                </div>
                            )}
                        </div>
                    </div>
                )}
                
                {/* Conclusion Prompt: Indonesian first */}
                {set.conclusion_prompt_malay && ( // Check for malay prompt first
                    <div className={styles.essayPromptSection} style={{marginTop: '20px'}}>
                        <h3 className={styles.promptTitle}>Arahan Kesimpulan:</h3>
                        <p className={styles.promptTextMalay}>{set.conclusion_prompt_malay}</p>
                        {set.conclusion_prompt_english && <p className={styles.promptTextEnglish}><em>({set.conclusion_prompt_english})</em></p>}
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
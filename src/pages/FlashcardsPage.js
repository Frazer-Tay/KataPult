// src/pages/FlashcardsPage.js
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { flashcardsData } from '../data/flashcardsData';
import useTimeTracker from '../hooks/useTimeTracker';
import { useSettings } from '../contexts/SettingsContext';
import styles from './FlashcardsPages.module.css';
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
  useTimeTracker('Essay Bank');
  const { englishAssist } = useSettings();
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
        const specialSetIds = ['essay-openings-closings', 'general-phrases'];
        const specialSets = [];
        const essayOpeningsClosingsSet = flashcardsData.find(set => set.id === 'essay-openings-closings');
        const generalPhrasesSet = flashcardsData.find(set => set.id === 'general-phrases');

        if (essayOpeningsClosingsSet) specialSets.push(essayOpeningsClosingsSet);
        if (generalPhrasesSet) specialSets.push(generalPhrasesSet);

        const topicSets = flashcardsData.filter(set => !specialSetIds.includes(set.id));

        const finalSetOrder = [...specialSets, ...shuffleArray(topicSets)];

        setAllSets(finalSetOrder);
        setCurrentIndex(0);
        setIsDetailsRevealed(false);
        setError(null);
      } else {
        console.warn("No essay bank data found or data is empty.");
        setError(englishAssist ? "No Essay Bank content to display at the moment." : "Tidak ada konten Essay Bank untuk ditampilkan saat ini.");
        setAllSets([]);
        setCurrentIndex(0);
      }
    } catch (e) {
      console.error("Error processing essay bank data:", e);
      setError(englishAssist ? "An error occurred while loading Essay Bank content." : "Terjadi kesalahan saat memuat konten Essay Bank.");
      setAllSets([]);
      setCurrentIndex(0);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const currentSet = useMemo(() => {
    if (!isLoading && allSets && allSets.length > 0 && currentSetIndex >= 0 && currentSetIndex < allSets.length) {
        return allSets[currentSetIndex];
    }
    return null;
  }, [allSets, currentSetIndex, isLoading]);

  const jumpToSetById = (setId) => {
    const index = allSets.findIndex(s => s.id === setId);
    if (index !== -1) {
      setCurrentIndex(index);
      setIsDetailsRevealed(false);
    } else {
      console.warn(`Set with ID "${setId}" not found.`);
    }
  };

  const handleDropdownChange = (event) => {
    const selectedSetId = event.target.value;
    if (selectedSetId) {
        jumpToSetById(selectedSetId);
    }
  };

  const toggleDetails = useCallback(() => {
    if (currentSet && currentSet.type === 'topic-essay-points') {
      setIsDetailsRevealed(prev => !prev);
    }
  }, [currentSet]);

  const advanceSet = useCallback((direction) => {
    if (!allSets || allSets.length === 0) return;
    let nextIdx = currentSetIndex;
    if (direction === 'next') {
      nextIdx = (currentSetIndex + 1);
      if (nextIdx >= allSets.length) nextIdx = 0;
    } else if (direction === 'previous') {
      nextIdx = (currentSetIndex - 1);
      if (nextIdx < 0) nextIdx = allSets.length - 1;
    }
    setCurrentIndex(nextIdx);
    setIsDetailsRevealed(false);
  }, [currentSetIndex, allSets]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!currentSet || isLoading) return;
      if (currentSet.type === 'topic-essay-points' && (event.key === ' ' || event.key === 'Enter')) {
        if(document.activeElement?.tagName !== 'BUTTON' && document.activeElement?.tagName !== 'SELECT'){
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
      if (!pageElement.contains(document.activeElement) || document.activeElement === pageElement) {
         pageElement.focus();
      }
    }
    return () => { if (pageElement) pageElement.removeEventListener('keydown', handleKeyDown); };
  }, [advanceSet, currentSet, toggleDetails, isLoading]);

  if (isLoading) {
    return <div className="loading" style={{textAlign: 'center', padding: '50px', fontSize: '1.2rem'}}>{englishAssist ? 'Loading Essay Bank...' : 'Memuat Essay Bank...'}</div>;
  }

  if (error) {
    return <div className="error" style={{textAlign: 'center', padding: '50px', fontSize: '1.2rem'}}>{error}</div>;
  }

  if (!currentSet && !isLoading) {
    return <div className={styles.flashcardsContainer} style={{textAlign: 'center', padding: '50px', fontSize: '1.2rem'}}>{englishAssist ? 'No Essay Bank content to display. Check `src/data/flashcardsData.js`.' : 'Tidak ada konten Essay Bank untuk ditampilkan. Periksa `src/data/flashcardsData.js`.'}</div>;
  }
  if (!currentSet) {
    return <div className="loading" style={{textAlign: 'center', padding: '50px', fontSize: '1.2rem'}}>{englishAssist ? 'Loading next set...' : 'Memuat set berikutnya...'}</div>;
  }

  const renderPhraseList = (set) => (
    <div className={styles.phraseSet}>
      <h2 className={styles.setTitle}>{set.title}</h2>
      <ul className={styles.phraseList}>
        {set.phrases.map((phrase, index) => (
          <li key={`${set.id}-phrase-${index}`} className={styles.phraseItem}>
            <p className={styles.phraseMalay}>{phrase.malay}</p>
            {phrase.english && <p className={styles.phraseEnglish}><em>({phrase.english})</em></p>}
          </li>
        ))}
      </ul>
    </div>
  );

  const renderEssayModelParagraphs = (set) => (
    <div className={styles.essayModelSet}>
        <h2 className={styles.setTitle}>{set.title}</h2>
        {set.sections.map((section, secIdx) => (
            <div key={`${set.id}-modelsection-${secIdx}`} className={styles.modelSection}>
                <h3 className={styles.modelSectionTitle}>{section.title_malay}</h3>
                {section.title_english && <h4 className={styles.modelSectionTitleEnglish}><em>({section.title_english})</em></h4>}

                {section.models && section.models.length > 0 && (
                    <div className={styles.modelParagraphsContainer}>
                        {section.models.map((model, modelIdx) => (
                            <div key={`${set.id}-model-${secIdx}-${modelIdx}`} className={styles.modelParagraphItem}>
                                {model.malay_title && <h5 className={styles.modelItemTitle}>{model.malay_title}</h5>}
                                <p className={styles.modelParagraphMalay} dangerouslySetInnerHTML={{ __html: model.malay.replace(/\[(.*?)\]/g, '<strong>[$1]</strong>') }} />

                                {model.english_title && <h5 className={`${styles.modelItemTitle} ${styles.englishTranslationBlock}`}><em>({model.english_title})</em></h5>}
                                {model.english && <p className={`${styles.modelParagraphEnglish} ${styles.englishTranslationBlock}`} dangerouslySetInnerHTML={{ __html: `<em>${model.english.replace(/\[(.*?)\]/g, '[$1]')}</em>` }} />}
                            </div>
                        ))}
                    </div>
                )}
                 {section.phrases && section.phrases.length > 0 && (
                    <ul className={styles.phraseList} style={{marginTop: '20px'}}>
                        {section.phrases.map((phrase, phraseIdx) => (
                            <li key={`${set.id}-secphrase-${secIdx}-${phraseIdx}`} className={styles.phraseItem}>
                                <p className={styles.phraseMalay}>{phrase.malay}</p>
                                {phrase.english && <p className={styles.phraseEnglish}><em>({phrase.english})</em></p>}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        ))}
    </div>
  );

  const renderTopicEssayPoints = (set) => (
    <div className={styles.topicEssayCardContainer}>
        <div className={styles.topicHeader}>
            <h2 className={styles.cardTitle}>{set.title_malay}</h2>
            {set.title_english && <p className={styles.cardTitleEnglish}><em>({set.title_english})</em></p>}
        </div>

        {set.introduction_prompt_malay && (
            <div className={styles.essayPromptSection}>
                <h3 className={styles.promptTitle}>{englishAssist ? 'Introduction Prompt:' : 'Arahan Pendahuluan:'}</h3>
                <p className={styles.promptTextMalay}>{set.introduction_prompt_malay}</p>
                {set.introduction_prompt_english && <p className={styles.promptTextEnglish}><em>({set.introduction_prompt_english})</em></p>}
            </div>
        )}

        {isDetailsRevealed ? (
            <div className={styles.topicDetails}>
                {set.main_points.map((point, pIdx) => (
                    <div key={`${set.id}-point-${pIdx}`} className={styles.mainPoint}>
                        <h4 className={styles.pointTitle}>
                            {pIdx + 1}. {point.title_malay}
                            {point.title_english && <em className={styles.pointTitleEnglish}> ({point.title_english})</em>}
                        </h4>

                        {point.examples && point.examples.length > 0 && (
                            <div className={styles.examplesList}>
                                <ul>
                                    {point.examples.map((ex, exIdx) => (
                                        <li key={`${set.id}-point-${pIdx}-ex-${exIdx}`}>
                                            {ex.malay}
                                            {ex.english && <em className={styles.exampleEnglish}> ({ex.english})</em>}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {point.challenge_rebuttal && (
                            <div className={styles.challengeRebuttalSection}>
                                <h5 className={styles.challengeTitle}>{englishAssist ? 'Challenge/Constraint:' : 'Namun/Kendala:'}</h5>
                                <p className={styles.challengeTextMalay}>{point.challenge_rebuttal.challenge_malay}</p>
                                {point.challenge_rebuttal.challenge_english && <p className={styles.challengeTextEnglish}><em>({point.challenge_rebuttal.challenge_english})</em></p>}

                                <h5 className={styles.rebuttalTitle}>{englishAssist ? 'Solution/Rebuttal:' : 'Solusi/Penguatan:'}</h5>
                                <p className={styles.rebuttalTextMalay}>{point.challenge_rebuttal.rebuttal_malay}</p>
                                {point.challenge_rebuttal.rebuttal_english && <p className={styles.rebuttalTextEnglish}><em>({point.challenge_rebuttal.rebuttal_english})</em></p>}
                            </div>
                        )}
                    </div>
                ))}

                {set.key_phrases && set.key_phrases.length > 0 && (
                    <div className={styles.keyVocabularySection}>
                        <h3 className={styles.sectionSubTitle}>{englishAssist ? 'Key Phrases:' : 'Frasa Kunci:'}</h3>
                        <ul className={styles.vocabularyList}>
                            {set.key_phrases.map((phrase, kIdx) => (
                            <li key={`${set.id}-keyphrase-${kIdx}`}>
                                <strong>{phrase.malay}:</strong> {phrase.english && <em>({phrase.english})</em>}
                            </li>
                            ))}
                        </ul>
                    </div>
                )}

                {set.linking_phrases_malay && set.linking_phrases_malay.length > 0 && (
                    <div className={styles.linkingPhrasesSection}>
                        <h3 className={styles.sectionSubTitle}>{englishAssist ? 'Useful Linking Phrases:' : 'Frasa Penghubung Berguna:'}</h3>
                        <div className={styles.linkingPair}>
                            <div>
                                <strong>Bahasa Indonesia:</strong>
                                <ul>{set.linking_phrases_malay.map((lp, lIdx) => <li key={`lp-ms-${set.id}-${lIdx}`}>{lp}</li>)}</ul>
                            </div>
                            {set.linking_phrases_english && set.linking_phrases_english.length > 0 && (
                                <div>
                                    <strong>English:</strong>
                                    <ul>{set.linking_phrases_english.map((lp, lIdx) => <li key={`lp-en-${set.id}-${lIdx}`}>{lp}</li>)}</ul>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {set.conclusion_prompt_malay && (
                    <div className={styles.essayPromptSection} style={{marginTop: '20px'}}>
                        <h3 className={styles.promptTitle}>{englishAssist ? 'Conclusion Prompt:' : 'Arahan Kesimpulan:'}</h3>
                        <p className={styles.promptTextMalay}>{set.conclusion_prompt_malay}</p>
                        {set.conclusion_prompt_english && <p className={styles.promptTextEnglish}><em>({set.conclusion_prompt_english})</em></p>}
                    </div>
                )}
            </div>
        ) : (
            currentSet.type === 'topic-essay-points' &&
            <div className={styles.clickToReveal}>
                <p>{englishAssist ? '(Click "View Details" or press Space/Enter to reveal essay points)' : '(Klik "Lihat Detail" atau tekan Spasi/Enter untuk membuka poin-poin esai)'}</p>
            </div>
        )}
    </div>
  );

  return (
    <div className={styles.flashcardsContainer} ref={pageRef} tabIndex={-1}>
      <header className={styles.pageHeader}>
        <p className={styles.eyebrow}>Level 2 Writing Support</p>
        <h1 className={styles.pageTitle}>Essay Bank</h1>
        <p className={styles.pageIntro}>{englishAssist ? 'Topical ideas, useful phrases, introductions, conclusions, and model paragraphs for karangan practice.' : 'Ide topik, frasa berguna, pendahuluan, kesimpulan, dan contoh paragraf untuk latihan karangan.'}</p>
      </header>
      <div className={styles.quickNavContainer}>
        <div className={styles.specialSetsNavigation}>
            <h4 className={styles.specialSetsTitle}>{englishAssist ? 'Quick Essay Guides:' : 'Panduan Cepat Esai:'}</h4>
            <div className={styles.specialSetsButtonsContainer}>
                <button
                    onClick={() => jumpToSetById('essay-openings-closings')}
                    className={`button ${styles.specialSetButton} ${currentSet && currentSet.id === 'essay-openings-closings' ? styles.activeSpecialSetButton : ''}`}
                >
                    {englishAssist ? 'Intro & Conclusion' : 'Pendahuluan & Kesimpulan'}
                </button>
                <button
                    onClick={() => jumpToSetById('general-phrases')}
                    className={`button ${styles.specialSetButton} ${currentSet && currentSet.id === 'general-phrases' ? styles.activeSpecialSetButton : ''}`}
                >
                    {englishAssist ? 'General Essay Phrases' : 'Frasa Umum Esai'}
                </button>
            </div>
        </div>

        {allSets && allSets.length > 0 && (
          <div className={styles.topicDropdownNavigation}>
            <label htmlFor="topicSelect" className={styles.dropdownLabel}>{englishAssist ? 'Jump to essay topic or guide:' : 'Pilih topik atau panduan esai:'}</label>
            <select
                id="topicSelect"
                value={currentSet ? currentSet.id : ''}
                onChange={handleDropdownChange}
                className={styles.topicSelectDropdown}
            >
                <option value="" disabled>{englishAssist ? 'Select essay topic or guide...' : 'Pilih topik atau panduan esai...'}</option>
                {allSets.map((set, index) => (
                    <option key={set.id} value={set.id}>
                        {index + 1}. {set.title_malay || set.title || (englishAssist ? "Unknown Title" : "Judul Tidak Diketahui")}
                    </option>
                ))}
            </select>
          </div>
        )}
      </div>
      <hr className={styles.sectionSeparator} />

      <ProgressBar
        current={currentSetIndex + 1}
        total={allSets.length}
        label={currentSet ? (currentSet.id === 'general-phrases' || currentSet.id === 'essay-openings-closings' ? (englishAssist ? "Writing Guide" : "Panduan Menulis") : (englishAssist ? "Essay Topic" : "Topik Esai")) : "Essay Bank"}
      />

      {currentSet && currentSet.type === 'phrase-list' && renderPhraseList(currentSet)}
      {currentSet && currentSet.type === 'topic-essay-points' && renderTopicEssayPoints(currentSet)}
      {currentSet && currentSet.type === 'essay-model-paragraphs' && renderEssayModelParagraphs(currentSet)}


      <div className="action-buttons-container">
        <button className="secondaryButton" onClick={() => advanceSet('previous')} disabled={allSets.length <= 1 || isLoading}>
          <span className="arrowIcon">←</span> {englishAssist ? 'Previous Set' : 'Set Sebelumnya'}
        </button>

        {currentSet && currentSet.type === 'topic-essay-points' && (
          <button className="primaryButton" onClick={toggleDetails} disabled={isLoading}>
            {isDetailsRevealed ? (englishAssist ? 'Hide Details' : 'Sembunyikan Detail') : (englishAssist ? 'View Details' : 'Lihat Detail')}
          </button>
        )}

        <button className="nextButton" onClick={() => advanceSet('next')} disabled={allSets.length <= 1 || isLoading}>
          {englishAssist ? 'Next Set' : 'Set Berikutnya'} <span className="arrowIcon">→</span>
        </button>
      </div>
    </div>
  );
};

export default FlashcardsPage;

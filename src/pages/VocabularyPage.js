// src/pages/VocabularyPage.js
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { vocabularyData } from '../data/vocabulary';
import { getDueWords, updateWordSRS } from '../utils/srsLogic';
import { useProgress } from '../contexts/ProgressContext';
import useTimeTracker from '../hooks/useTimeTracker';
import { recordLearnerActivity } from '../utils/activityTracker';
import AudioButton from '../components/AudioButton';
import useKeyboardShortcuts from '../hooks/useKeyboardShortcuts';
import useRandomizedResumableQueue from '../hooks/useRandomizedResumableQueue';
import { useSettings } from '../contexts/SettingsContext';
import styles from './VocabularyPage.module.css';
import ProgressBar from '../components/ProgressBar';
import UiIcon from '../components/UiIcon';
import { CompletionCard, LoadingState } from '../components/SharedUI';

const shuffleArray = (array) => { if (!Array.isArray(array)) return []; let currentIndex = array.length, randomIndex; while (currentIndex !== 0) { randomIndex = Math.floor(Math.random() * currentIndex); currentIndex--; [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]; } return array; };
const VocabularyPage = ({ level = 2 }) => {
  useTimeTracker('Vocabulary');
  const [allItems, setAllItems] = useState([]);
  const [displayItems, setDisplayItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const pageRef = useRef(null);
  const isCompletedRef = useRef(false);
  const { englishAssist } = useSettings();

  // SRS States
  const { addXP } = useProgress();
  const [viewMode, setViewMode] = useState('menu'); // 'menu', 'normal', 'srs'
  const [srsDueCount, setSrsDueCount] = useState(0);
  const [srsRevealed, setSrsRevealed] = useState(false);

  const { currentIndex: normalIndex, advanceToNext: normalAdvance, queueLength: normalRemaining } = useRandomizedResumableQueue(`vocab_normal_v2_lvl${level}`, allItems);

  const { currentItem, totalItemsInSet } = useMemo(() => {
    if (viewMode === 'normal') {
      const item = allItems && allItems.length > 0 ? allItems[normalIndex] || allItems[0] : null;
      return { currentItem: item, totalItemsInSet: allItems.length };
    }

    const item = (displayItems && displayItems.length > 0 && currentIndex >= 0 && currentIndex < displayItems.length)
        ? displayItems[currentIndex]
        : null;
    isCompletedRef.current = (currentIndex >= (displayItems?.length || 0) && (displayItems?.length || 0) > 0);
    return { currentItem: item, totalItemsInSet: displayItems?.length || 0 };
  }, [displayItems, currentIndex, viewMode, allItems, normalIndex]);

  useEffect(() => {
    setIsLoading(true); setError(null);
    try {
      const filteredData = vocabularyData.filter(item => item.word && item.definition && item.level === level);
      if (filteredData.length === 0) throw new Error(`No valid vocabulary data for level ${level}.`);
      setAllItems(filteredData);

      const { dueWords } = getDueWords(filteredData);
      setSrsDueCount(dueWords.length);

      setIsLoading(false);
    } catch (err) {
      console.error("Error initializing vocabulary page:", err);
      setError(err.message || "Gagal memuat data Vocabulary.");
      setAllItems([]); setDisplayItems([]); setIsLoading(false);
    }
  }, [level]);

  const startNormalMode = () => {
    setViewMode('normal');
    isCompletedRef.current = false;
  };

  const startSRSMode = () => {
    setViewMode('srs');
    const { dueWords, newWords } = getDueWords(allItems);

    // If no due words, give them 5 new words
    let sessionWords = [];
    if (dueWords.length > 0) {
      sessionWords = dueWords.slice(0, 15); // Max 15 per session to not overwhelm
    } else {
      sessionWords = shuffleArray([...newWords]).slice(0, 5);
    }

    setDisplayItems(sessionWords);
    setCurrentIndex(0);
    setSrsRevealed(false);
    isCompletedRef.current = false;
  };

  const advanceNormalItem = useCallback((direction) => {
    if (direction === 'next') {
      normalAdvance();
    }
    if (pageRef.current) pageRef.current.focus();
  }, [normalAdvance]);

  const handleSRSRating = useCallback((quality) => {
    if (!currentItem) return;
    updateWordSRS(currentItem.word, quality); // use word as ID

    if (quality >= 1) {
      addXP(5); // 5 XP for getting it right/easy
    }
    recordLearnerActivity({
      eventType: 'answer_attempt',
      section: level === 1 ? 'L1 Vocabulary' : 'Vocabulary',
      route: level === 1 ? '/level1/vocabulary' : '/vocabulary',
      itemType: 'srs_vocab',
      correct: quality >= 1
    }).catch((error) => console.warn('Failed to record SRS rating:', error));

    // Move to next word
    setSrsRevealed(false);
    setCurrentIndex(prev => prev + 1);
  }, [currentItem, addXP, level]);

  useKeyboardShortcuts({
    'ArrowRight': (e) => {
      if (isCompletedRef.current) return;
      if (viewMode === 'normal') advanceNormalItem('next');
    },
    'ArrowLeft': (e) => {
      if (isCompletedRef.current) return;
      if (viewMode === 'normal') advanceNormalItem('previous');
    },
    'Enter': (e) => {
      if (isCompletedRef.current) return;
      if (viewMode === 'normal') advanceNormalItem('next');
      if (viewMode === 'srs' && !srsRevealed) setSrsRevealed(true);
    },
    ' ': (e) => {
      if (isCompletedRef.current) return;
      if (viewMode === 'srs' && !srsRevealed) setSrsRevealed(true);
    },
    '1': (e) => {
      if (!isCompletedRef.current && viewMode === 'srs' && srsRevealed) handleSRSRating(0);
    },
    '2': (e) => {
      if (!isCompletedRef.current && viewMode === 'srs' && srsRevealed) handleSRSRating(1);
    },
    '3': (e) => {
      if (!isCompletedRef.current && viewMode === 'srs' && srsRevealed) handleSRSRating(2);
    }
  });

  const isCompleted = viewMode === 'srs'
    ? (currentIndex >= totalItemsInSet && totalItemsInSet > 0 && !isLoading)
    : false; // Normal mode never completes, it just loops

  const normalProgressCount = allItems.length - normalRemaining + 1;

  if (isLoading) { return <LoadingState label={englishAssist ? 'Loading vocabulary...' : 'Memuat kosakata...'} />; }
  if (error) { return <div className="error">{error}</div>; }

  // --- MENU VIEW ---
  if (viewMode === 'menu') {
    return (
      <div className={styles.container}>
        <div className={styles.menuContainer} style={{textAlign: 'center', marginTop: '50px'}}>
          <h1 style={{color: 'var(--primary-dark)'}}>{englishAssist ? 'Choose Study Mode' : 'Pilih Mode Belajar'}</h1>
          <p style={{color: 'var(--text-medium)', marginBottom: '40px'}}>{englishAssist ? 'Which method would you like to use today?' : 'Metode apa yang ingin kamu gunakan hari ini?'}</p>

          <div style={{display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap'}}>
            <div className={styles.card} style={{cursor: 'pointer', border: '2px solid var(--secondary-color)'}} onClick={startSRSMode}>
              <h2><UiIcon name="brain" size={24} /> {englishAssist ? 'Smart Review (SRS)' : 'Review Pintar (SRS)'}</h2>
              <p>{englishAssist ? 'Spaced repetition system. The app will test words you are about to forget.' : 'Sistem pengulangan berkala. Aplikasi akan menguji kata-kata yang hampir kamu lupakan.'}</p>
              {srsDueCount > 0 ? (
                <div style={{marginTop: '15px', color: '#d84315', fontWeight: 'bold'}}>{srsDueCount} {englishAssist ? 'words waiting!' : 'kata menunggu!'}</div>
              ) : (
                <div style={{marginTop: '15px', color: 'var(--success-color)', fontWeight: 'bold'}}>{englishAssist ? 'All words reviewed. Start to learn new words!' : 'Semua kata sudah direview. Mulai untuk belajar kata baru!'}</div>
              )}
            </div>

            <div className={styles.card} style={{cursor: 'pointer'}} onClick={startNormalMode}>
              <h2><UiIcon name="book" size={24} /> {englishAssist ? 'Read All' : 'Baca Semua'}</h2>
              <p>{englishAssist ? `View all ${allItems.length} vocabulary words in order. Good for reference.` : `Lihat semua ${allItems.length} kosakata secara berurutan. Cocok untuk referensi.`}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- NORMAL VIEW & SRS VIEW ---
  return (
    <div className={styles.container} ref={pageRef} tabIndex={-1}>
      {!isCompleted && totalItemsInSet > 0 && (
        <ProgressBar
          current={viewMode === 'normal' ? normalProgressCount : currentIndex + 1}
          total={totalItemsInSet}
          label={viewMode === 'srs' ? (englishAssist ? 'Review Session' : 'Sesi Review') : (englishAssist ? 'Vocabulary (Cycle)' : 'Kosakata (Siklus)')}
        />
      )}

      {isCompleted ? (
        <CompletionCard
          title={englishAssist ? 'Review session complete' : 'Sesi ulasan selesai'}
          description={englishAssist ? 'You finished every word in this set. Come back tomorrow to strengthen your recall.' : 'Anda telah menyelesaikan setiap kata dalam set ini. Kembali besok untuk memperkuat ingatan.'}
          actions={<button className="primaryButton" onClick={() => setViewMode('menu')} autoFocus>{englishAssist ? 'Back to study modes' : 'Kembali ke mode belajar'}</button>}
        />
      ) : currentItem ? (
        <>
          <div className={styles.card}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
              <h2 className={styles.word} style={{ margin: 0 }}>{currentItem.word}</h2>
              <AudioButton text={currentItem.word} style={{ marginTop: '5px' }} />
            </div>

            {/* IN SRS MODE: Hide details until revealed */}
            {viewMode === 'srs' && !srsRevealed ? (
               <div style={{padding: '40px 0', textAlign: 'center'}}>
                 <button className="primaryButton" onClick={() => setSrsRevealed(true)}>{englishAssist ? 'Show Answer' : 'Tampilkan Jawaban'}</button>
                 <p style={{marginTop: '10px', fontSize: '0.85rem', color: 'var(--text-light)'}}>{englishAssist ? 'Press Space / Enter' : 'Tekan Spasi / Enter'}</p>
               </div>
            ) : (
              <div style={{animation: 'fadeIn 0.3s ease-out'}}>
                <p className={styles.definition}>{currentItem.definition}</p>
                {currentItem.exampleSentence && (
                  <div className={styles.exampleSection}>
                    <h3 className={styles.sectionTitle}>{englishAssist ? 'Usage Example' : 'Contoh Penggunaan'}</h3>
                    <p className={styles.exampleSentence}>"{currentItem.exampleSentence}"</p>
                    {currentItem.exampleTranslation && (
                      <div className={styles.translationSection}>
                        <p className={styles.translationText}><em>({englishAssist ? 'Translation:' : 'Terjemahan:'} {currentItem.exampleTranslation})</em></p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* NAVIGATION / ACTION BUTTONS */}
          <div className="action-buttons-container">
              {viewMode === 'normal' && (
                <>
                  <button className="nextButton" onClick={() => advanceNormalItem('next')} style={{ width: '100%', maxWidth: '300px' }}>
                      {englishAssist ? 'Next (Random)' : 'Selanjutnya (Acak)'} <UiIcon name="arrowRight" size={18} />
                  </button>
                </>
              )}

              {viewMode === 'srs' && srsRevealed && (
                <div style={{display: 'flex', gap: '10px', width: '100%'}}>
                  <button onClick={() => handleSRSRating(0)} style={{flex: 1, backgroundColor: '#ffebee', color: '#c62828', border: '1px solid #ef9a9a', padding: '12px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer'}}>
                    {englishAssist ? 'Forgot (1)' : 'Lupa (1)'}
                  </button>
                  <button onClick={() => handleSRSRating(1)} style={{flex: 1, backgroundColor: '#fff8e1', color: '#f57f17', border: '1px solid #ffe082', padding: '12px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer'}}>
                    {englishAssist ? 'Remember (2)' : 'Ingat (2)'}
                  </button>
                  <button onClick={() => handleSRSRating(2)} style={{flex: 1, backgroundColor: '#e8f5e9', color: '#2e7d32', border: '1px solid #a5d6a7', padding: '12px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer'}}>
                    {englishAssist ? 'Easy (3)' : 'Mudah (3)'}
                  </button>
                </div>
              )}
          </div>

          <div style={{marginTop: '30px'}}>
            <button onClick={() => setViewMode('menu')} style={{background: 'none', border: 'none', color: 'var(--text-light)', cursor: 'pointer', textDecoration: 'underline'}}>{englishAssist ? 'Back to Menu' : 'Kembali ke Menu'}</button>
          </div>
        </>
      ) : (
        <p className="loading">Tidak ada data kosakata.</p>
      )}
    </div>
  );
};
export default VocabularyPage;

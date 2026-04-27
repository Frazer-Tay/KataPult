// src/pages/VocabularyPage.js
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { vocabularyData } from '../data/vocabulary';
import { getDueWords, updateWordSRS } from '../utils/srsLogic';
import { useProgress } from '../contexts/ProgressContext';
import styles from './VocabularyPage.module.css';
import ProgressBar from '../components/ProgressBar';

const shuffleArray = (array) => { if (!Array.isArray(array)) return []; let currentIndex = array.length, randomIndex; while (currentIndex !== 0) { randomIndex = Math.floor(Math.random() * currentIndex); currentIndex--; [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]; } return array; };
const VocabularyPage = () => {
  const [allItems, setAllItems] = useState([]);
  const [displayItems, setDisplayItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const pageRef = useRef(null);
  const isCompletedRef = useRef(false);
  
  // SRS States
  const { addXP } = useProgress();
  const [viewMode, setViewMode] = useState('menu'); // 'menu', 'normal', 'srs'
  const [srsDueCount, setSrsDueCount] = useState(0);
  const [srsRevealed, setSrsRevealed] = useState(false);

  const { currentItem, totalItemsInSet } = useMemo(() => {
    const item = (displayItems && displayItems.length > 0 && currentIndex >= 0 && currentIndex < displayItems.length)
        ? displayItems[currentIndex]
        : null;
    isCompletedRef.current = (currentIndex >= (displayItems?.length || 0) && (displayItems?.length || 0) > 0);
    return { currentItem: item, totalItemsInSet: displayItems?.length || 0 };
  }, [displayItems, currentIndex]);

  useEffect(() => {
    setIsLoading(true); setError(null);
    try {
      const filteredData = vocabularyData.filter(item => item.word && item.definition && item.exampleSentence && item.exampleTranslation);
      if (filteredData.length === 0) throw new Error("No valid vocabulary data with examples/translations.");
      setAllItems(filteredData);

      const { dueWords } = getDueWords(filteredData);
      setSrsDueCount(dueWords.length);
      
      setIsLoading(false);
    } catch (err) {
      console.error("Error initializing vocabulary page:", err);
      setError(err.message || "Gagal memuat data Vocabulary.");
      setAllItems([]); setDisplayItems([]); setIsLoading(false);
    }
  }, []);

  const startNormalMode = () => {
    setViewMode('normal');
    setDisplayItems(shuffleArray([...allItems]));
    setCurrentIndex(0);
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
    if (!displayItems || displayItems.length === 0) return;
    let nextIdx = currentIndex;
    if (direction === 'next') {
      nextIdx = Math.min(currentIndex + 1, displayItems.length);
    } else if (direction === 'previous') {
      nextIdx = Math.max(currentIndex - 1, 0);
    }
    setCurrentIndex(nextIdx);
     if (pageRef.current) pageRef.current.focus();
  }, [currentIndex, displayItems]);

  const handleSRSRating = useCallback((quality) => {
    if (!currentItem) return;
    updateWordSRS(currentItem.word, quality); // use word as ID
    
    if (quality >= 1) {
      addXP(5); // 5 XP for getting it right/easy
    }

    // Move to next word
    setSrsRevealed(false);
    setCurrentIndex(prev => prev + 1);
  }, [currentItem, addXP]);

  useEffect(() => {
    const handleKeyDown = (event) => {
        if (isCompletedRef.current) return;
        
        if (viewMode === 'normal') {
          if (event.key === 'ArrowRight' || event.key === 'Enter') {
              advanceNormalItem('next');
              event.preventDefault();
          } else if (event.key === 'ArrowLeft') {
              advanceNormalItem('previous');
              event.preventDefault();
          }
        } else if (viewMode === 'srs') {
          if (event.key === ' ' || event.key === 'Enter') {
            if (!srsRevealed) {
              setSrsRevealed(true);
              event.preventDefault();
            }
          }
          if (srsRevealed) {
            if (event.key === '1') handleSRSRating(0); // Hard
            if (event.key === '2') handleSRSRating(1); // Good
            if (event.key === '3') handleSRSRating(2); // Easy
          }
        }
    };
    const pageElement = pageRef.current;
    if (pageElement && currentItem && !isLoading && viewMode !== 'menu') {
        pageElement.addEventListener('keydown', handleKeyDown);
        pageElement.focus();
    }
    return () => { if (pageElement) { pageElement.removeEventListener('keydown', handleKeyDown); }};
  }, [advanceNormalItem, currentItem, isLoading, viewMode, srsRevealed, handleSRSRating]);

  const isCompleted = currentIndex >= totalItemsInSet && totalItemsInSet > 0 && !isLoading;

  if (isLoading) { return <div className="loading">Memuat kosakata...</div>; }
  if (error) { return <div className="error">{error}</div>; }

  // --- MENU VIEW ---
  if (viewMode === 'menu') {
    return (
      <div className={styles.container}>
        <div className={styles.menuContainer} style={{textAlign: 'center', marginTop: '50px'}}>
          <h1 style={{color: 'var(--primary-dark)'}}>Pilih Mode Belajar</h1>
          <p style={{color: 'var(--text-medium)', marginBottom: '40px'}}>Metode apa yang ingin kamu gunakan hari ini?</p>
          
          <div style={{display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap'}}>
            <div className={styles.card} style={{cursor: 'pointer', border: '2px solid var(--secondary-color)'}} onClick={startSRSMode}>
              <h2>🧠 Review Pintar (SRS)</h2>
              <p>Sistem pengulangan berkala. Aplikasi akan menguji kata-kata yang hampir kamu lupakan.</p>
              {srsDueCount > 0 ? (
                <div style={{marginTop: '15px', color: '#d84315', fontWeight: 'bold'}}>🎯 {srsDueCount} kata menunggu!</div>
              ) : (
                <div style={{marginTop: '15px', color: 'var(--success-color)', fontWeight: 'bold'}}>Semua kata sudah direview. Mulai untuk belajar kata baru!</div>
              )}
            </div>

            <div className={styles.card} style={{cursor: 'pointer'}} onClick={startNormalMode}>
              <h2>📚 Baca Semua</h2>
              <p>Lihat semua {allItems.length} kosakata secara berurutan. Cocok untuk referensi.</p>
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
        <ProgressBar current={currentIndex + 1} total={totalItemsInSet} label={viewMode === 'srs' ? "Sesi Review" : "Kosakata"} />
      )}
      
      {isCompleted ? (
        <div className={styles.completionContainer}>
          <p className="completionMessage">✨ Selesai Sesi Ini! ✨</p>
          <button className="primaryButton" onClick={() => setViewMode('menu')} autoFocus>
            Kembali ke Menu
          </button>
        </div>
      ) : currentItem ? (
        <>
          <div className={styles.card}>
            <h2 className={styles.word}>{currentItem.word}</h2>
            
            {/* IN SRS MODE: Hide details until revealed */}
            {viewMode === 'srs' && !srsRevealed ? (
               <div style={{padding: '40px 0', textAlign: 'center'}}>
                 <button className="primaryButton" onClick={() => setSrsRevealed(true)}>Tampilkan Jawaban</button>
                 <p style={{marginTop: '10px', fontSize: '0.85rem', color: 'var(--text-light)'}}>Tekan Spasi / Enter</p>
               </div>
            ) : (
              <div style={{animation: 'fadeIn 0.3s ease-out'}}>
                <p className={styles.definition}>{currentItem.definition}</p>
                {currentItem.exampleSentence && (
                  <div className={styles.exampleSection}>
                    <h3 className={styles.sectionTitle}>Contoh Penggunaan</h3>
                    <p className={styles.exampleSentence}>"{currentItem.exampleSentence}"</p>
                    {currentItem.exampleTranslation && (
                      <div className={styles.translationSection}>
                        <p className={styles.translationText}><em>(Terjemahan: {currentItem.exampleTranslation})</em></p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* NAVIGATION / ACTION BUTTONS */}
          <div className={styles.buttonRow} style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'center', width: '100%', maxWidth: '500px' }}>
              {viewMode === 'normal' && (
                <>
                  <button className="secondaryButton" onClick={() => advanceNormalItem('previous')} disabled={currentIndex === 0}>
                      <span className="arrowIcon">←</span> Sebelumnya
                  </button>
                  <button className="nextButton" onClick={() => advanceNormalItem('next')}>
                      Lanjut <span className="arrowIcon">→</span>
                  </button>
                </>
              )}

              {viewMode === 'srs' && srsRevealed && (
                <div style={{display: 'flex', gap: '10px', width: '100%'}}>
                  <button onClick={() => handleSRSRating(0)} style={{flex: 1, backgroundColor: '#ffebee', color: '#c62828', border: '1px solid #ef9a9a', padding: '12px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer'}}>
                    Lupa (1)
                  </button>
                  <button onClick={() => handleSRSRating(1)} style={{flex: 1, backgroundColor: '#fff8e1', color: '#f57f17', border: '1px solid #ffe082', padding: '12px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer'}}>
                    Ingat (2)
                  </button>
                  <button onClick={() => handleSRSRating(2)} style={{flex: 1, backgroundColor: '#e8f5e9', color: '#2e7d32', border: '1px solid #a5d6a7', padding: '12px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer'}}>
                    Mudah (3)
                  </button>
                </div>
              )}
          </div>
          
          <div style={{marginTop: '30px'}}>
            <button onClick={() => setViewMode('menu')} style={{background: 'none', border: 'none', color: 'var(--text-light)', cursor: 'pointer', textDecoration: 'underline'}}>Kembali ke Menu</button>
          </div>
        </>
      ) : (
        <p className="loading">Tidak ada data kosakata.</p>
      )}
    </div>
  );
};
export default VocabularyPage;
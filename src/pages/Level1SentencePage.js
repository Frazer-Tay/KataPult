import React, { useState } from 'react';
import { sentenceConstructionData } from '../data/level1Practice';
import { recordLearnerActivity } from '../utils/activityTracker';
import styles from './Level1Practice.module.css';

const Level1SentencePage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userSentence, setUserSentence] = useState('');
  const [isRevealed, setIsRevealed] = useState(false);

  const currentItem = sentenceConstructionData[currentIndex];
  const isLast = currentIndex === sentenceConstructionData.length - 1;

  const handleNext = () => {
    if (!isLast) {
      setCurrentIndex(prev => prev + 1);
      setUserSentence('');
      setIsRevealed(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setUserSentence('');
      setIsRevealed(false);
    }
  };

  const toggleModel = () => {
    if (!isRevealed) {
      recordLearnerActivity({
        eventType: 'answer_attempt',
        section: 'L1 Sentence',
        route: '/level1/sentence',
        itemType: 'l1_sentence_model',
        correct: Boolean(userSentence.trim())
      }).catch((error) => console.warn('Failed to record sentence check:', error));
    }

    setIsRevealed(!isRevealed);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Bagian II: Konstruksi Kalimat (Sentence Construction)</h1>
        <p>Buatlah kalimat yang benar menggunakan kata-kata di bawah ini.</p>
      </header>

      <div className={styles.centeredCard}>
        <h2 className={styles.targetWord}>{currentItem.word}</h2>
        
        <textarea
          className={styles.writingArea}
          style={{ minHeight: '150px' }}
          placeholder={`Ketik kalimat menggunakan kata "${currentItem.word}" di sini...`}
          value={userSentence}
          onChange={(e) => setUserSentence(e.target.value)}
        />

        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <button 
            className={styles.revealButton} 
            onClick={toggleModel}
            style={{ padding: '10px 20px', fontSize: '1.1rem' }}
          >
            {isRevealed ? 'Sembunyikan Model' : 'Periksa Model Kalimat'}
          </button>
        </div>

        {isRevealed && (
          <div className={styles.modelAnswer}>
            <strong>Model Kalimat:</strong>
            <p style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{currentItem.modelSentence}</p>
            <p style={{ fontStyle: 'italic', color: '#64748b' }}>{currentItem.englishTranslation}</p>
          </div>
        )}

        <div className="action-buttons-container">
          <button className={styles.navButton} onClick={handlePrev} disabled={currentIndex === 0}>
            ← Sebelumnya
          </button>
          <div className={styles.progressIndicator}>
            {currentIndex + 1} / {sentenceConstructionData.length}
          </div>
          <button className={styles.navButton} onClick={handleNext} disabled={isLast}>
            Selanjutnya →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Level1SentencePage;

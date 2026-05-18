import React, { useState } from 'react';
import { imbuhanPracticeData } from '../data/level1Practice';
import styles from './Level1Practice.module.css';

const Level1ImbuhanPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [status, setStatus] = useState('typing'); // 'typing', 'correct', 'incorrect'

  const currentItem = imbuhanPracticeData[currentIndex];
  const isLast = currentIndex === imbuhanPracticeData.length - 1;

  const handleNext = () => {
    if (!isLast) {
      setCurrentIndex(prev => prev + 1);
      setUserInput('');
      setStatus('typing');
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setUserInput('');
      setStatus('typing');
    }
  };

  const handleCheck = () => {
    if (userInput.trim().toLowerCase() === currentItem.answer.toLowerCase()) {
      setStatus('correct');
    } else {
      setStatus('incorrect');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && userInput.trim() !== '') {
      handleCheck();
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Bagian III: Imbuhan (Affixes)</h1>
        <p>Berikan imbuhan yang tepat pada kata dasar di dalam kurung.</p>
      </header>

      <div className={styles.centeredCard}>
        <div className={styles.imbuhanSentence}>
          {currentItem.sentencePre}
          <input
            type="text"
            className={`${styles.blankInput} ${
              status === 'correct' ? styles.correctInput : 
              status === 'incorrect' ? styles.incorrectInput : ''
            }`}
            placeholder={`(${currentItem.root})`}
            value={userInput}
            onChange={(e) => {
              setUserInput(e.target.value);
              setStatus('typing');
            }}
            onKeyDown={handleKeyDown}
            disabled={status === 'correct'}
          />
          {currentItem.sentencePost}
        </div>

        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <button 
            className={styles.revealButton} 
            onClick={handleCheck}
            disabled={userInput.trim() === '' || status === 'correct'}
          >
            Periksa Jawaban
          </button>
        </div>

        {(status === 'correct' || status === 'incorrect') && (
          <div className={styles.explanationBox}>
            <p><strong>{status === 'correct' ? '✅ Benar!' : '❌ Salah.'}</strong> Jawaban: <strong>{currentItem.answer}</strong></p>
            <p>{currentItem.explanation}</p>
          </div>
        )}

        <div className="action-buttons-container">
          <button className={styles.navButton} onClick={handlePrev} disabled={currentIndex === 0}>
            ← Sebelumnya
          </button>
          <div className={styles.progressIndicator}>
            {currentIndex + 1} / {imbuhanPracticeData.length}
          </div>
          <button className={styles.navButton} onClick={handleNext} disabled={isLast}>
            Selanjutnya →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Level1ImbuhanPage;

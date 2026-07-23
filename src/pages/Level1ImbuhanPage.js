import React, { useState } from 'react';
import { imbuhanPracticeData } from '../data/level1Practice';
import { recordLearnerActivity } from '../utils/activityTracker';
import { useProgress } from '../contexts/ProgressContext';
import { useSettings } from '../contexts/SettingsContext';
import AudioButton from '../components/AudioButton';
import useKeyboardShortcuts from '../hooks/useKeyboardShortcuts';
import useRandomizedResumableQueue from '../hooks/useRandomizedResumableQueue';
import styles from './Level1Practice.module.css';

const Level1ImbuhanPage = () => {
  const { currentIndex, advanceToNext, queueLength } = useRandomizedResumableQueue('l1_imbuhan_queue', imbuhanPracticeData);
  const [userInput, setUserInput] = useState('');
  const [status, setStatus] = useState('typing'); // 'typing', 'correct', 'incorrect'
  const { addXP } = useProgress();
  const { englishAssist } = useSettings();

  const currentItem = imbuhanPracticeData[currentIndex] || imbuhanPracticeData[0];
  const progressCount = imbuhanPracticeData.length - queueLength + 1;

  const handleNext = () => {
    advanceToNext();
    setUserInput('');
    setStatus('typing');
  };

  const handleCheck = () => {
    if (!currentItem) return;
    const correct = userInput.trim().toLowerCase() === currentItem.answer.toLowerCase();
    recordLearnerActivity({
      eventType: 'answer_attempt',
      section: 'L1 Imbuhan',
      route: '/level1/imbuhan-practice',
      itemType: 'l1_imbuhan',
      correct
    }).catch((error) => console.warn('Failed to record answer attempt:', error));

    if (correct) {
      addXP(5);
      setStatus('correct');
    } else {
      setStatus('incorrect');
    }
  };

  useKeyboardShortcuts({
    'ArrowRight': handleNext
  });

  if (!imbuhanPracticeData || imbuhanPracticeData.length === 0) return null;

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && userInput.trim() !== '') {
      handleCheck();
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>{englishAssist ? 'Part III: Affixes (Imbuhan)' : 'Bagian III: Imbuhan (Affixes)'}</h1>
        <p>{englishAssist ? 'Provide the correct affix for the root word in parentheses.' : 'Berikan imbuhan yang tepat pada kata dasar di dalam kurung.'}</p>
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
            {englishAssist ? 'Check Answer' : 'Periksa Jawaban'}
          </button>
        </div>

        {(status === 'correct' || status === 'incorrect') && (
          <div className={styles.explanationBox}>
            <p><strong>{status === 'correct' ? (englishAssist ? '✅ Correct!' : '✅ Benar!') : (englishAssist ? '❌ Incorrect.' : '❌ Salah.')}</strong> {englishAssist ? 'Answer:' : 'Jawaban:'} <strong>{currentItem.answer}</strong></p>
            <p>{currentItem.explanation}</p>
            {status === 'correct' && (
              <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '0.95rem', color: '#64748b' }}>{englishAssist ? 'Listen to full sentence:' : 'Dengarkan kalimat lengkap:'}</span>
                <AudioButton text={`${currentItem.sentencePre} ${currentItem.answer} ${currentItem.sentencePost}`} />
              </div>
            )}
          </div>
        )}

        <div className="action-buttons-container">
          <div className={styles.progressIndicator}>
            {englishAssist ? 'Cycle:' : 'Siklus:'} {progressCount} / {imbuhanPracticeData.length}
          </div>
          <button className={styles.navButton} onClick={handleNext}>
            {englishAssist ? 'Next (Random) →' : 'Selanjutnya (Acak) →'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Level1ImbuhanPage;

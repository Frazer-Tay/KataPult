import React, { useState } from 'react';
import { sentenceConstructionData } from '../data/level1Practice';
import { recordLearnerActivity } from '../utils/activityTracker';
import { useProgress } from '../contexts/ProgressContext';
import { useSettings } from '../contexts/SettingsContext';
import AudioButton from '../components/AudioButton';
import useKeyboardShortcuts from '../hooks/useKeyboardShortcuts';
import useRandomizedResumableQueue from '../hooks/useRandomizedResumableQueue';
import ProgressBar from '../components/ProgressBar';
import { PracticeActions } from '../components/SharedUI';
import styles from './Level1Practice.module.css';

const Level1SentencePage = () => {
  const { currentIndex, advanceToNext, queueLength } = useRandomizedResumableQueue('l1_sentence_queue', sentenceConstructionData);
  const [userSentence, setUserSentence] = useState('');
  const [isRevealed, setIsRevealed] = useState(false);
  const { addXP } = useProgress();
  const { englishAssist } = useSettings();

  const handleNext = () => {
    advanceToNext();
    setUserSentence('');
    setIsRevealed(false);
  };

  const toggleModel = () => {
    if (!isRevealed) {
      const isAttempted = Boolean(userSentence.trim());
      recordLearnerActivity({
        eventType: 'answer_attempt',
        section: 'L1 Sentence',
        route: '/level1/sentence',
        itemType: 'l1_sentence_model',
        correct: isAttempted
      }).catch((error) => console.warn('Failed to record sentence check:', error));

      if (isAttempted) {
        addXP(5);
      }
    }
    setIsRevealed(!isRevealed);
  };

  useKeyboardShortcuts({
    'Enter': toggleModel,
    ' ': toggleModel,
    'ArrowRight': handleNext
  });

  if (!sentenceConstructionData || sentenceConstructionData.length === 0) return null;
  const currentItem = sentenceConstructionData[currentIndex] || sentenceConstructionData[0];
  const progressCount = sentenceConstructionData.length - queueLength + 1;

  const highlightWord = (sentence, wordStr) => {
    if (!wordStr || !sentence) return sentence;
    // Split by '/' to handle multiple options like "Umumnya / Lazimnya"
    const words = wordStr.split('/').map(w => w.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).filter(Boolean);
    if (words.length === 0) return sentence;

    const regex = new RegExp(`(${words.join('|')})`, 'gi');
    const parts = sentence.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? <strong key={index} style={{ color: '#2c3e50', backgroundColor: '#e2e8f0', padding: '0 4px', borderRadius: '4px' }}>{part}</strong> : part
    );
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>{englishAssist ? 'Part II: Sentence Construction' : 'Bagian II: Konstruksi Kalimat (Sentence Construction)'}</h1>
        <p>{englishAssist ? 'Create a correct sentence using the word below.' : 'Buatlah kalimat yang benar menggunakan kata-kata di bawah ini.'}</p>
      </header>

      <div className={styles.centeredCard}>
        <h2 className={styles.targetWord}>{currentItem.word}</h2>

        <textarea
          className={styles.writingArea}
          style={{ minHeight: '150px' }}
          placeholder={englishAssist ? `Type a sentence using "${currentItem.word.split('/')[0].trim()}" here...` : `Ketik kalimat menggunakan kata "${currentItem.word.split('/')[0].trim()}" di sini...`}
          value={userSentence}
          onChange={(e) => setUserSentence(e.target.value)}
        />

        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <button
            className={styles.revealButton}
            onClick={toggleModel}
            style={{ padding: '10px 20px', fontSize: '1.1rem' }}
          >
            {isRevealed ? (englishAssist ? 'Hide Model' : 'Sembunyikan Model') : (englishAssist ? 'Check Model Sentence' : 'Periksa Model Kalimat')}
          </button>
        </div>

        {isRevealed && (
          <div className={styles.modelAnswer}>
            <strong>{englishAssist ? 'Model Sentence:' : 'Model Kalimat:'}</strong>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '0.5rem 0' }}>
              <p style={{ fontSize: '1.2rem', margin: 0 }}>{highlightWord(currentItem.modelSentence, currentItem.word)}</p>
              <AudioButton text={currentItem.modelSentence} />
            </div>
            <p style={{ fontStyle: 'italic', color: '#64748b' }}>{currentItem.englishTranslation}</p>
          </div>
        )}

        <ProgressBar current={progressCount} total={sentenceConstructionData.length} label={englishAssist ? 'Practice cycle' : 'Siklus latihan'} />
        <PracticeActions>
          <button className={styles.navButton} onClick={handleNext}>
            {englishAssist ? 'Next (Random) →' : 'Selanjutnya (Acak) →'}
          </button>
        </PracticeActions>
      </div>
    </div>
  );
};

export default Level1SentencePage;

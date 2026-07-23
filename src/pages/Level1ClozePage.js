import React, { useState, useEffect } from 'react';
import { clozePassagesData } from '../data/level1Practice';
import { recordLearnerActivity } from '../utils/activityTracker';
import { useRandomizedResumableQueue } from '../hooks/useRandomizedResumableQueue';
import { useSettings } from '../contexts/SettingsContext';
import ProgressBar from '../components/ProgressBar';
import { PracticeActions } from '../components/SharedUI';
import styles from './Level1Practice.module.css';

const Level1ClozePage = () => {
  const { englishAssist } = useSettings();
  const { currentIndex, advanceToNext } = useRandomizedResumableQueue('l1_cloze_queue', clozePassagesData);
  const currentItem = clozePassagesData[currentIndex] || clozePassagesData[0];

  const [userAnswers, setUserAnswers] = useState({});
  const [isChecked, setIsChecked] = useState(false);
  const [activeWord, setActiveWord] = useState(null);

  useEffect(() => {
    setUserAnswers({});
    setIsChecked(false);
    setActiveWord(null);
  }, [currentIndex]);

  const handleDrop = (e, index) => {
    e.preventDefault();
    const word = e.dataTransfer.getData("word");
    setUserAnswers(prev => ({ ...prev, [index]: word }));
    setIsChecked(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragStart = (e, word) => {
    e.dataTransfer.setData("word", word);
  };

  const handleWordClick = (word) => {
    // If word is already used, do nothing
    if (Object.values(userAnswers).includes(word)) return;

    // Toggle active word
    setActiveWord(prev => prev === word ? null : word);
  };

  const handleBlankClick = (index) => {
    // If we have an active word, fill this blank
    if (activeWord) {
      setUserAnswers(prev => ({ ...prev, [index]: activeWord }));
      setActiveWord(null);
      setIsChecked(false);
    } else {
      // If no active word but blank has a word, remove it
      if (userAnswers[index]) {
        handleRemove(index);
      }
    }
  };

  const handleRemove = (index) => {
    setUserAnswers(prev => {
      const newAnswers = { ...prev };
      delete newAnswers[index];
      return newAnswers;
    });
    setIsChecked(false);
  };

  const handleCheck = () => {
    const totalAnswers = Object.keys(currentItem.answers).length;
    const correctAnswers = Object.keys(currentItem.answers).filter(
      key => userAnswers[key] === currentItem.answers[key]
    ).length;

    recordLearnerActivity({
      eventType: 'answer_attempt',
      section: 'L1 Cloze',
      route: '/level1/cloze',
      itemType: 'l1_cloze',
      correct: correctAnswers === totalAnswers
    }).catch((error) => console.warn('Failed to record cloze attempt:', error));
    setIsChecked(true);
  };

  // Determine which words from the bank have been used
  const usedWords = Object.values(userAnswers);

  const renderText = () => {
    return currentItem.text.map((part, i) => {
      // If it's a blank marker like "[1]"
      const blankMatch = part.match(/^\[(\d+)\]$/);
      if (blankMatch) {
        const index = parseInt(blankMatch[1]);
        const currentAnswer = userAnswers[index];

        let statusClass = '';
        if (isChecked && currentAnswer) {
          statusClass = currentAnswer === currentItem.answers[index]
            ? styles.correct
            : styles.incorrect;
        }

        return (
          <span
            key={i}
            className={`${styles.clozeBlank} ${currentAnswer ? styles.filled : ''} ${statusClass} ${activeWord && !currentAnswer ? styles.readyToFill : ''}`}
            onDrop={(e) => handleDrop(e, index)}
            onDragOver={handleDragOver}
            onClick={() => handleBlankClick(index)}
            title={currentAnswer ? (englishAssist ? "Click to remove" : "Klik untuk menghapus") : activeWord ? (englishAssist ? "Click to fill word" : "Klik untuk memasukkan kata") : (englishAssist ? "Drag word here or click a word then click here" : "Seret kata ke sini atau pilih kata lalu klik")}
          >
            {currentAnswer || index}
          </span>
        );
      }

      // If it's text, render normal text (split by newlines for paragraphs)
      return part.split('\n').map((line, lineIndex) => (
        <React.Fragment key={`${i}-${lineIndex}`}>
          {line}
          {lineIndex < part.split('\n').length - 1 && <br />}
        </React.Fragment>
      ));
    });
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>{englishAssist ? 'Part IV: Cloze Passage' : 'Bagian IV: Isian Rumpang (Cloze Passage)'}</h1>
        <p>{englishAssist ? 'Complete the passage below. You can ' : 'Lengkapi bacaan di bawah ini. Anda dapat '}<strong>{englishAssist ? 'Drag & Drop' : 'menyeret kata (Drag & Drop)'}</strong>{englishAssist ? ' or ' : ' atau '}<strong>{englishAssist ? 'Tap to Fill' : 'mengetuk kata lalu mengetuk garis kosong (Tap to Fill)'}</strong>.</p>
      </header>
      <ProgressBar current={currentIndex + 1} total={clozePassagesData.length} label={englishAssist ? 'Cloze passages' : 'Bacaan rumpang'} />

      <div className={styles.centeredCard} style={{ maxWidth: '900px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1rem', color: '#1e3a8a' }}>{currentItem.title}</h2>
        <div className={styles.wordBank}>
          {currentItem.wordBank.map((word, index) => {
            const isUsed = usedWords.includes(word);
            return (
              <div
                key={index}
                className={`${styles.wordBadge} ${isUsed ? styles.used : ''} ${activeWord === word ? styles.activeWordBadge : ''}`}
                draggable={!isUsed}
                onDragStart={(e) => handleDragStart(e, word)}
                onClick={() => handleWordClick(word)}
              >
                {word}
              </div>
            );
          })}
        </div>

        <div className={styles.clozeParagraph}>
          {renderText()}
        </div>

        <PracticeActions>
          <button
            className={styles.navButton}
            onClick={isChecked ? advanceToNext : handleCheck}
            disabled={Object.keys(userAnswers).length === 0 && !isChecked}
          >
            {isChecked ? (englishAssist ? 'Next' : 'Lanjut') : (englishAssist ? 'Check Answers' : 'Periksa Jawaban')}
          </button>
        </PracticeActions>

        {isChecked && (
          <div className={styles.explanationBox}>
            <p><strong>{englishAssist ? 'Result:' : 'Hasil:'}</strong> {englishAssist ? 'You answered ' : 'Anda telah menjawab '}{Object.keys(userAnswers).filter(key => userAnswers[key] === currentItem.answers[key]).length} {englishAssist ? 'out of ' : 'dari '}{Object.keys(currentItem.answers).length} {englishAssist ? 'correctly.' : 'dengan benar.'}</p>
            <p>{englishAssist ? 'Incorrect answers are crossed out in red. Please click the answer to remove it and try again.' : 'Jawaban yang salah dicoret merah. Silakan klik jawaban tersebut untuk menghapusnya dan mencoba lagi.'}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Level1ClozePage;

import React, { useState } from 'react';
import { clozePassageData } from '../data/level1Practice';
import styles from './Level1Practice.module.css';

const Level1ClozePage = () => {
  const [userAnswers, setUserAnswers] = useState({});
  const [isChecked, setIsChecked] = useState(false);
  const [activeWord, setActiveWord] = useState(null);
  
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
    setIsChecked(true);
  };

  // Determine which words from the bank have been used
  const usedWords = Object.values(userAnswers);

  const renderText = () => {
    return clozePassageData.text.map((part, i) => {
      // If it's a blank marker like "[1]"
      const blankMatch = part.match(/^\[(\d+)\]$/);
      if (blankMatch) {
        const index = parseInt(blankMatch[1]);
        const currentAnswer = userAnswers[index];
        
        let statusClass = '';
        if (isChecked && currentAnswer) {
          statusClass = currentAnswer === clozePassageData.answers[index] 
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
            title={currentAnswer ? "Klik untuk menghapus" : activeWord ? "Klik untuk memasukkan kata" : "Seret kata ke sini atau pilih kata lalu klik"}
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
        <h1>Bagian IV: Isian Rumpang (Cloze Passage)</h1>
        <p>Lengkapi bacaan di bawah ini. Anda dapat <strong>menyeret kata (Drag & Drop)</strong> atau <strong>mengetuk kata lalu mengetuk garis kosong (Tap to Fill)</strong>.</p>
      </header>

      <div className={styles.centeredCard} style={{ maxWidth: '900px' }}>
        <div className={styles.wordBank}>
          {clozePassageData.wordBank.map((word, index) => {
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

        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <button 
            className={styles.navButton} 
            onClick={handleCheck}
          >
            Periksa Jawaban
          </button>
        </div>

        {isChecked && (
          <div className={styles.explanationBox}>
            <p><strong>Hasil:</strong> Anda telah menjawab {Object.keys(userAnswers).filter(key => userAnswers[key] === clozePassageData.answers[key]).length} dari {Object.keys(clozePassageData.answers).length} dengan benar.</p>
            <p>Jawaban yang salah dicoret merah. Silakan klik jawaban tersebut untuk menghapusnya dan mencoba lagi.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Level1ClozePage;

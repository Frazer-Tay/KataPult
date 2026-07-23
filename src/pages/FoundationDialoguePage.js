import React, { useState } from 'react';
import { dialogueData } from '../data/foundationPractice';
import { useSettings } from '../contexts/SettingsContext';
import styles from './Foundation.module.css';

const FoundationDialoguePage = () => {
  const { englishAssist } = useSettings();
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentItem = dialogueData[currentIndex] || dialogueData[0];

  const [userAnswers, setUserAnswers] = useState({});
  const [isChecked, setIsChecked] = useState(false);

  const handleAnswerChange = (questionId, value) => {
    setUserAnswers(prev => ({ ...prev, [questionId]: value }));
    setIsChecked(false);
  };

  const handleCheck = () => {
    setIsChecked(true);
  };

  const advanceToNext = () => {
    setUserAnswers({});
    setIsChecked(false);
    setCurrentIndex((prev) => (prev + 1) % dialogueData.length);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 style={{ color: '#1e3a8a', marginBottom: '0.5rem' }}>{englishAssist ? 'Dialogue' : 'Dialog'}</h1>
        <div style={{ color: '#64748b', fontSize: '0.9em', fontStyle: 'italic', marginBottom: '0.5rem' }}>{englishAssist ? 'Dialog' : 'Dialogue'}</div>
        <p style={{ color: '#64748b', fontSize: '1.1rem' }}>{englishAssist ? 'Understand the following conversation and answer the questions!' : 'Pahami percakapan berikut dan jawab pertanyaannya!'}</p>
        <div style={{ color: '#64748b', fontSize: '0.9em', fontStyle: 'italic' }}>{englishAssist ? 'Pahami percakapan berikut dan jawab pertanyaannya!' : 'Understand the following conversation and answer the questions!'}</div>
      </header>

      <div className={styles.centeredCard} style={{ maxWidth: '800px' }}>
        <h2 style={{ textAlign: 'center', color: '#ff6b6b', marginBottom: '1.5rem', fontSize: '2rem' }}>
          {currentItem.title}
        </h2>

        <div className={styles.imagePlaceholder} style={{ background: 'none', border: 'none' }}>
          {currentItem.image && <img src={`/images/foundation/${currentItem.image}`} alt="Ilustrasi dialog" style={{ maxWidth: '100%', maxHeight: '250px', borderRadius: '15px', objectFit: 'contain' }} />}
        </div>

        <div style={{ marginBottom: '3rem' }}>
          {currentItem.dialogue.map((line, index) => (
            <div key={index} className={styles.dialogueBubble}>
              <div className={styles.speaker}>{line.speaker}</div>
              <div className={styles.textContainer}>
                <div>{line.text}</div>
                {line.englishText && <div className={styles.englishText}>{line.englishText}</div>}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.questionsList}>
          <h3 style={{ marginBottom: '1rem', color: '#2f3542' }}>{englishAssist ? 'Questions:' : 'Pertanyaan:'}</h3>
          {currentItem.questions.map((q) => {
            const currentAnswer = userAnswers[q.id];
            let statusClass = '';
            if (isChecked && currentAnswer) {
              statusClass = currentAnswer === q.answer ? styles.correct : styles.incorrect;
            }

            return (
              <div key={q.id} className={styles.questionCard}>
                <div className={styles.questionText}>
                  {q.id}. {q.question}
                  {q.englishQuestion && <div className={styles.englishText} style={{ marginTop: '2px', fontWeight: 'normal' }}>{q.englishQuestion}</div>}
                </div>

                <select
                  className={styles.dropdownSelect}
                  value={currentAnswer || ""}
                  onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                >
                  <option value="" disabled>{englishAssist ? '-- Choose Answer --' : '-- Pilih Jawaban --'}</option>
                  {q.options.map((opt, i) => (
                    <option key={i} value={opt}>
                      {opt} {isChecked && q.englishOptions ? `(${q.englishOptions[i]})` : ''}
                    </option>
                  ))}
                </select>

                {isChecked && currentAnswer && (
                  <div className={`${styles.feedbackBox} ${statusClass}`}>
                    {currentAnswer === q.answer
                      ? (englishAssist ? "✨ Correct!" : "✨ Benar!")
                      : (englishAssist ? `Correct answer: ${q.answer}` : `Jawaban yang benar: ${q.answer}`)}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button
            className={styles.checkButton}
            onClick={isChecked ? advanceToNext : handleCheck}
            style={{ padding: '0.8rem 2rem', fontSize: '1.1rem' }}
            disabled={Object.keys(userAnswers).length < currentItem.questions.length && !isChecked}
          >
            {isChecked ? (englishAssist ? 'Next Dialogue' : 'Dialog Selanjutnya') : (englishAssist ? 'Check Answers' : 'Periksa Jawaban')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoundationDialoguePage;

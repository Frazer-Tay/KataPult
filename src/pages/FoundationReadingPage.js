import React, { useState } from 'react';
import { storyReadingData } from '../data/foundationPractice';
import { useSettings } from '../contexts/SettingsContext';
import styles from './Foundation.module.css';

const FoundationReadingPage = () => {
  const { englishAssist } = useSettings();
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentStory = storyReadingData[currentIndex] || storyReadingData[0];

  const [userAnswers, setUserAnswers] = useState({});
  const [revealedAnswers, setRevealedAnswers] = useState({});

  const handleAnswerChange = (questionId, value) => {
    setUserAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const toggleReveal = (questionId) => {
    setRevealedAnswers(prev => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  const advanceToNext = () => {
    setUserAnswers({});
    setRevealedAnswers({});
    setCurrentIndex((prev) => (prev + 1) % storyReadingData.length);
  };

  return (
      <div className={styles.container}>
        <h1 style={{ color: '#1e3a8a', marginBottom: '0.5rem' }}>{englishAssist ? 'Reading a Story' : 'Membaca Cerita'}</h1>
        <div style={{ color: '#64748b', fontSize: '0.9em', fontStyle: 'italic', marginBottom: '0.5rem' }}>{englishAssist ? 'Membaca Cerita' : 'Reading a Story'}</div>
        <p style={{ color: '#64748b', fontSize: '1.1rem' }}>{englishAssist ? 'Read the story below and complete the sentences!' : 'Bacalah cerita di bawah ini dan lengkapi kalimatnya!'}</p>
        <div style={{ color: '#64748b', fontSize: '0.9em', fontStyle: 'italic' }}>{englishAssist ? 'Bacalah cerita di bawah ini dan lengkapi kalimatnya!' : 'Read the story below and complete the sentences!'}</div>

      <div className={styles.centeredCard} style={{ maxWidth: '800px' }}>
        <h2 style={{ textAlign: 'center', color: '#ff6b6b', marginBottom: '1.5rem', fontSize: '2rem' }}>
          {currentStory.title}
        </h2>

        {/* Placeholder for image generation later */}
        <div className={styles.imagePlaceholder} style={{ background: 'none', border: 'none' }}>
          {currentStory.image && <img src={`/images/foundation/${currentStory.image}`} alt="Ilustrasi cerita" style={{ maxWidth: '100%', maxHeight: '250px', borderRadius: '15px', objectFit: 'contain' }} />}
        </div>

        <div className={styles.storyContent}>
          <div>{currentStory.content}</div>
          {currentStory.englishContent && <div className={styles.englishText}>{currentStory.englishContent}</div>}
        </div>

        <div className={styles.questionsList}>
          <h3 style={{ marginBottom: '1rem', color: '#2f3542' }}>{englishAssist ? 'Questions:' : 'Pertanyaan:'}</h3>
          {currentStory.questions.map((q) => (
            <div key={q.id} className={styles.questionCard}>
              <div className={styles.questionText}>
                {q.id}. {q.question}
                {q.englishQuestion && <div className={styles.englishText} style={{ marginTop: '2px', fontWeight: 'normal' }}>{q.englishQuestion}</div>}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '1.1rem' }}>{q.prefix || ""}</span>
                  {q.englishPrefix && <span className={styles.englishText}>{q.englishPrefix}</span>}
                </div>
                  <input
                  type="text"
                  className={styles.answerInput}
                  style={{ width: 'auto', flex: 1, minWidth: '150px', margin: 0, padding: '0.5rem 1rem' }}
                  placeholder={englishAssist ? "Type answer..." : "Ketik jawaban..."}
                  value={userAnswers[q.id] || ''}
                  onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                />
              </div>

              <div style={{ marginTop: '1rem' }}>
                <button
                  className={styles.checkButton}
                  style={{ padding: '0.5rem 1rem', fontSize: '1rem', marginTop: 0 }}
                  onClick={() => toggleReveal(q.id)}
                >
                  {revealedAnswers[q.id] ? (englishAssist ? 'Hide' : 'Sembunyikan') : (englishAssist ? 'Check' : 'Periksa')}
                </button>

                {revealedAnswers[q.id] && (
                  <div className={`${styles.feedbackBox} ${
                    userAnswers[q.id]?.trim().toLowerCase() === q.answer.toLowerCase()
                      ? styles.correct
                      : styles.incorrect
                  }`}>
                    <div>{englishAssist ? 'Model Answer:' : 'Model Jawaban:'} <strong>{q.answer}</strong></div>
                    {q.englishAnswer && <div className={styles.englishText} style={{ marginTop: '4px' }}>{englishAssist ? 'Jawaban:' : 'Answer:'} {q.englishAnswer}</div>}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button className={styles.checkButton} onClick={advanceToNext}>
            {englishAssist ? 'Next Story' : 'Cerita Selanjutnya'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoundationReadingPage;

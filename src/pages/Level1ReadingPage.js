import React, { useState } from 'react';
import { readingData } from '../data/level1Practice';
import { recordLearnerActivity } from '../utils/activityTracker';
import styles from './Level1Practice.module.css';

const Level1ReadingPage = () => {
  const [userAnswers, setUserAnswers] = useState({});
  const [revealedAnswers, setRevealedAnswers] = useState({});

  const handleAnswerChange = (questionId, value) => {
    setUserAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const toggleReveal = (questionId) => {
    if (!revealedAnswers[questionId]) {
      recordLearnerActivity({
        eventType: 'answer_attempt',
        section: 'L1 Reading',
        route: '/level1/reading',
        itemType: 'l1_reading_model_answer',
        correct: Boolean(userAnswers[questionId]?.trim())
      }).catch((error) => console.warn('Failed to record reading check:', error));
    }
    setRevealedAnswers(prev => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Bagian I: Pemahaman Bacaan (Reading Comprehension)</h1>
        <p>Bacalah artikel di sebelah kiri dan jawablah pertanyaan di sebelah kanan.</p>
      </header>

      <div className={styles.splitScreen}>
        {/* Left Side: Article */}
        <div className={styles.articlePane}>
          <h2 className={styles.articleTitle}>{readingData.title}</h2>
          <div className={styles.articleContent}>
            {readingData.paragraphs.map((para, index) => (
              <p key={index} className={styles.paragraph}>{para}</p>
            ))}
            <p className={styles.source}><em>{readingData.source}</em></p>
          </div>
        </div>

        {/* Right Side: Questions */}
        <div className={styles.questionsPane}>
          <h2 className={styles.questionsTitle}>Pertanyaan (20%)</h2>
          <div className={styles.questionsList}>
            {readingData.questions.map((q) => (
              <div key={q.id} className={styles.questionCard}>
                <p className={styles.questionText}><strong>{q.id}.</strong> {q.question}</p>
                <textarea
                  className={styles.answerInput}
                  placeholder="Ketik jawaban Anda di sini..."
                  value={userAnswers[q.id] || ''}
                  onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                  rows={4}
                />
                
                <div className={styles.feedbackSection}>
                  <button 
                    className={styles.revealButton} 
                    onClick={() => toggleReveal(q.id)}
                  >
                    {revealedAnswers[q.id] ? 'Sembunyikan Model Jawaban' : 'Lihat Model Jawaban'}
                  </button>
                  
                  {revealedAnswers[q.id] && (
                    <div className={styles.modelAnswer}>
                      <strong>Model Jawaban:</strong>
                      <p>{q.modelAnswer}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Level1ReadingPage;

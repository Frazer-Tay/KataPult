import React, { useState, useEffect } from 'react';
import { writingData } from '../data/level1Practice';
import { recordLearnerActivity } from '../utils/activityTracker';
import styles from './Level1Practice.module.css';

const Level1WritingPage = () => {
  const [selectedTask, setSelectedTask] = useState('letter'); // 'letter', 'essay1', 'essay2', 'essay3'
  const [text, setText] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [isReviewing, setIsReviewing] = useState(false);
  const [checklist, setChecklist] = useState({});

  const currentPrompt = selectedTask === 'letter' 
    ? writingData.letter 
    : writingData.essays.find(e => `essay${e.id}` === selectedTask);

  useEffect(() => {
    // Reset state when task changes
    setText('');
    setWordCount(0);
    setIsReviewing(false);
    setChecklist({});
  }, [selectedTask]);

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    
    // Count words (split by whitespace, filter empty strings)
    const words = newText.trim().split(/\s+/).filter(w => w.length > 0);
    setWordCount(words.length);
  };

  const toggleChecklist = (index) => {
    setChecklist(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const toggleReview = () => {
    const nextReviewState = !isReviewing;

    if (nextReviewState) {
      recordLearnerActivity({
        eventType: 'answer_attempt',
        section: 'L1 Writing',
        route: '/level1/writing',
        itemType: selectedTask === 'letter' ? 'l1_letter' : 'l1_essay',
        correct: wordCount >= 150
      }).catch((error) => console.warn('Failed to record writing review:', error));
    }

    setIsReviewing(nextReviewState);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Bagian V & VI: Menulis (Writing Simulator)</h1>
        <p>Pilih tugas menulis dari daftar di bawah, lalu ketik esai atau surat Anda.</p>
      </header>

      <div className={styles.centeredCard} style={{ maxWidth: '900px' }}>
        
        <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button 
            className={styles.navButton} 
            style={{ opacity: selectedTask === 'letter' ? 1 : 0.6 }}
            onClick={() => setSelectedTask('letter')}
          >
            {writingData.letter.title}
          </button>
          {writingData.essays.map(essay => (
            <button 
              key={essay.id}
              className={styles.navButton} 
              style={{ opacity: selectedTask === `essay${essay.id}` ? 1 : 0.6, backgroundColor: '#2c3e50' }}
              onClick={() => setSelectedTask(`essay${essay.id}`)}
            >
              {essay.title}
            </button>
          ))}
        </div>

        <div className={styles.explanationBox} style={{ marginBottom: '1.5rem', backgroundColor: '#fff', border: '1px solid #e2e8f0' }}>
          <h3 style={{ marginBottom: '0.5rem' }}>Instruksi:</h3>
          <p style={{ fontSize: '1.1rem' }}>{currentPrompt.prompt}</p>
        </div>

        <div className={styles.writingToolbar}>
          <span className={styles.progressIndicator}>
            Target: ~200 Kata
          </span>
          <span className={`${styles.wordCounter} ${wordCount >= 180 ? styles.targetReached : ''}`}>
            {wordCount} Kata
          </span>
        </div>

        <textarea
          className={styles.writingArea}
          placeholder="Mulai mengetik di sini..."
          value={text}
          onChange={handleTextChange}
          disabled={isReviewing}
        />

        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <button 
            className={styles.navButton} 
            onClick={toggleReview}
            style={{ backgroundColor: isReviewing ? '#95a5a6' : '#2ecc71' }}
          >
            {isReviewing ? 'Kembali Menulis' : 'Selesai & Evaluasi Mandiri'}
          </button>
        </div>

        {isReviewing && (
          <div className={styles.checklist}>
            <h3>Daftar Periksa (Checklist) Evaluasi Mandiri:</h3>
            <p style={{ marginBottom: '1rem', color: '#64748b' }}>Centang kriteria di bawah ini secara jujur untuk mengevaluasi tulisan Anda.</p>
            
            {currentPrompt.requirements.map((req, index) => (
              <div 
                key={index} 
                className={`${styles.checklistItem} ${checklist[index] ? styles.checked : ''}`}
                onClick={() => toggleChecklist(index)}
              >
                <input 
                  type="checkbox" 
                  checked={!!checklist[index]} 
                  readOnly 
                />
                <label>{req}</label>
              </div>
            ))}
            
            <div className={styles.checklistItem} onClick={() => toggleChecklist('wordcount')}>
              <input type="checkbox" checked={!!checklist['wordcount']} readOnly />
              <label>Jumlah kata sudah mencapai 150-200 kata. (Saat ini: {wordCount})</label>
            </div>
            <div className={styles.checklistItem} onClick={() => toggleChecklist('grammar')}>
              <input type="checkbox" checked={!!checklist['grammar']} readOnly />
              <label>Tata bahasa dan ejaan sudah diperiksa ulang.</label>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Level1WritingPage;

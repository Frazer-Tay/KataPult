import React, { useState, useEffect } from 'react';
import { writingData } from '../data/level1Practice';
import { recordLearnerActivity } from '../utils/activityTracker';
import { useSettings } from '../contexts/SettingsContext';
import styles from './Level1Practice.module.css';

const Level1WritingPage = () => {
  const { englishAssist } = useSettings();
  const [selectedTask, setSelectedTask] = useState('essay1');
  const [text, setText] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [isReviewing, setIsReviewing] = useState(false);
  const [checklist, setChecklist] = useState({});

  const currentPrompt = writingData.essays.find(e => `essay${e.id}` === selectedTask) || writingData.essays[0];

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
        itemType: 'l1_essay',
        correct: wordCount >= 150
      }).catch((error) => console.warn('Failed to record writing review:', error));
    }

    setIsReviewing(nextReviewState);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>{englishAssist ? 'Part V & VI: Writing Simulator' : 'Bagian V & VI: Menulis (Writing Simulator)'}</h1>
        <p>{englishAssist ? 'Choose a writing task from the list below, then type your essay or letter.' : 'Pilih tugas menulis dari daftar di bawah, lalu ketik esai atau surat Anda.'}</p>
      </header>

      <div className={styles.centeredCard} style={{ maxWidth: '900px' }}>

        <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {writingData.essays.map(essay => (
            <button
              key={essay.id}
              className={styles.navButton}
              style={{
                opacity: selectedTask === `essay${essay.id}` ? 1 : 0.6,
                backgroundColor: essay.modelEssay ? '#34495e' : '#2c3e50',
                border: essay.modelEssay ? '2px solid #f39c12' : 'none'
              }}
              onClick={() => setSelectedTask(`essay${essay.id}`)}
              title={essay.modelEssay ? (englishAssist ? "Model Answer Available" : "Model Jawaban Tersedia") : ""}
            >
              {essay.title} {essay.modelEssay && "⭐"}
            </button>
          ))}
        </div>

        <div className={styles.explanationBox} style={{ marginBottom: '1.5rem', backgroundColor: '#fff', border: '1px solid #e2e8f0' }}>
          <h3 style={{ marginBottom: '0.5rem' }}>{englishAssist ? 'Instructions:' : 'Instruksi:'}</h3>
          <p style={{ fontSize: '1.1rem' }}>{currentPrompt.prompt}</p>
        </div>

        <div className={styles.writingToolbar}>
          <span className={styles.progressIndicator}>
            {englishAssist ? 'Target: ~200 Words' : 'Target: ~200 Kata'}
          </span>
          <span className={`${styles.wordCounter} ${wordCount >= 180 ? styles.targetReached : ''}`}>
            {wordCount} {englishAssist ? 'Words' : 'Kata'}
          </span>
        </div>

        <textarea
          className={styles.writingArea}
          placeholder={englishAssist ? "Start typing here..." : "Mulai mengetik di sini..."}
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
            {isReviewing ? (englishAssist ? 'Back to Writing' : 'Kembali Menulis') : (englishAssist ? 'Finish & Self-Evaluate' : 'Selesai & Evaluasi Mandiri')}
          </button>
        </div>

        {isReviewing && (
          <div className={styles.checklist}>
            <h3>{englishAssist ? 'Self-Evaluation Checklist:' : 'Daftar Periksa (Checklist) Evaluasi Mandiri:'}</h3>
            <p style={{ marginBottom: '1rem', color: '#64748b' }}>{englishAssist ? 'Honestly check the criteria below to evaluate your writing.' : 'Centang kriteria di bawah ini secara jujur untuk mengevaluasi tulisan Anda.'}</p>

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
              <label>{englishAssist ? `Word count has reached 150-200 words. (Current: ${wordCount})` : `Jumlah kata sudah mencapai 150-200 kata. (Saat ini: ${wordCount})`}</label>
            </div>
            <div className={styles.checklistItem} onClick={() => toggleChecklist('grammar')}>
              <input type="checkbox" checked={!!checklist['grammar']} readOnly />
              <label>{englishAssist ? 'Grammar and spelling have been double-checked.' : 'Tata bahasa dan ejaan sudah diperiksa ulang.'}</label>
            </div>

            {currentPrompt.modelEssay && (
              <div className={styles.explanationBox} style={{ marginTop: '2rem', backgroundColor: '#f8fafc', border: '1px solid #cbd5e1', textAlign: 'left' }}>
                <h3 style={{ marginBottom: '1rem', color: '#0f172a' }}>{englishAssist ? 'Model Essay Example:' : 'Contoh Model Karangan:'}</h3>
                {currentPrompt.modelEssay.map((para, idx) => (
                  <p key={idx} style={{ marginBottom: '1rem', lineHeight: '1.6' }}>{para}</p>
                ))}
                {currentPrompt.keyPhrases && (
                  <>
                    <h4 style={{ marginTop: '1.5rem', marginBottom: '0.5rem', color: '#334155' }}>{englishAssist ? 'Key Phrases:' : 'Frasa Kunci:'}</h4>
                    <ul style={{ paddingLeft: '1.5rem', color: '#475569' }}>
                      {currentPrompt.keyPhrases.map((phrase, idx) => (
                        <li key={idx} style={{ marginBottom: '0.25rem' }}>{phrase}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default Level1WritingPage;

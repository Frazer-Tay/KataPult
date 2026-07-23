// src/pages/TestSetupPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSettings } from '../contexts/SettingsContext';
import UiIcon from '../components/UiIcon';
import { PageHeader, StatusBadge } from '../components/SharedUI';
import styles from './TestSetupPage.module.css';

const TestSetupPage = () => {
  const [module, setModule] = useState('imbuhan');
  const [numQuestions, setNumQuestions] = useState(10);
  const navigate = useNavigate();
  const { englishAssist } = useSettings();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!module || numQuestions < 5) {
      alert(englishAssist ? "Please select a module and at least 5 questions." : "Silakan pilih modul dan minimal 5 pertanyaan.");
      return;
    }
    navigate(`/test/${module}`, { state: { numQuestions: parseInt(numQuestions, 10) } });
  };

  return (
    <div className={styles.container}>
      <PageHeader
        eyebrow={englishAssist ? 'Focused assessment' : 'Penilaian terfokus'}
        title={englishAssist ? 'Build your practice test' : 'Buat tes latihan Anda'}
        description={englishAssist ? 'Choose a skill and a comfortable test length. Your answers, score, and pace are tracked during the session.' : 'Pilih keterampilan dan panjang tes yang nyaman. Jawaban, skor, dan kecepatan Anda dilacak selama sesi.'}
      />
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="moduleSelect" className={styles.label}>{englishAssist ? 'Select Test Module:' : 'Pilih Modul Tes:'}</label>
          <select
            id="moduleSelect"
            value={module}
            onChange={(e) => setModule(e.target.value)}
            className={styles.selectInput}
          >
            <option value="imbuhan">Imbuhan (Affixes)</option>
            <option value="persamaan">Persamaan (Synonyms)</option> {/* <-- ENABLED */}
            <option value="karangan" disabled>{englishAssist ? 'Karangan Vocab - Coming Soon' : 'Karangan Vocab - Segera Hadir'}</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="numQuestions" className={styles.label}>{englishAssist ? 'Number of Questions:' : 'Jumlah Pertanyaan:'}</label>
          <input
            type="number"
            id="numQuestions"
            value={numQuestions}
            onChange={(e) => setNumQuestions(e.target.value)}
            min="5"
            max="50"
            step="5"
            className={styles.numberInput}
          />
        </div>
        <p className={styles.inputNote}>{englishAssist ? '(Min: 5, Max: 50, Multiples of 5)' : '(Min: 5, Max: 50, Kelipatan: 5)'}</p>

        <div className={styles.quickLengths} aria-label={englishAssist ? 'Quick test lengths' : 'Pilihan cepat panjang tes'}>
          {[5, 10, 20, 30].map((length) => (
            <button
              key={length}
              type="button"
              className={`${styles.lengthButton} ${Number(numQuestions) === length ? styles.activeLength : ''}`}
              onClick={() => setNumQuestions(length)}
              aria-pressed={Number(numQuestions) === length}
            >
              {length}
            </button>
          ))}
        </div>

        <div className={styles.testSummary}>
          <span className={styles.summaryIcon}><UiIcon name={module === 'imbuhan' ? 'link' : 'matching'} size={24} /></span>
          <span>
            <strong>{module === 'imbuhan' ? 'Imbuhan' : 'Persamaan'}</strong>
            <small>{numQuestions} {englishAssist ? 'questions' : 'pertanyaan'}</small>
          </span>
          <StatusBadge tone="info">{englishAssist ? 'Ready' : 'Siap'}</StatusBadge>
        </div>

        <button type="submit" className={`primaryButton ${styles.submitButton}`}>
          {englishAssist ? 'Start test' : 'Mulai tes'} <UiIcon name="arrowRight" size={18} />
        </button>
      </form>
    </div>
  );
};

export default TestSetupPage;

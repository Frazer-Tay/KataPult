// src/pages/TestSetupPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './TestSetupPage.module.css';

const TestSetupPage = () => {
  const [module, setModule] = useState('imbuhan');
  const [numQuestions, setNumQuestions] = useState(10);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!module || numQuestions < 5) {
      alert("Silakan pilih modul dan minimal 5 pertanyaan.");
      return;
    }
    navigate(`/test/${module}`, { state: { numQuestions: parseInt(numQuestions, 10) } });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Pengaturan Tes Kustom</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="moduleSelect" className={styles.label}>Pilih Modul Tes:</label>
          <select
            id="moduleSelect"
            value={module}
            onChange={(e) => setModule(e.target.value)}
            className={styles.selectInput}
          >
            <option value="imbuhan">Imbuhan (Affixes)</option>
            <option value="persamaan">Persamaan (Synonyms)</option> {/* <-- ENABLED */}
            <option value="karangan" disabled>Karangan Vocab - Segera Hadir</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="numQuestions" className={styles.label}>Jumlah Pertanyaan:</label>
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
        <p className={styles.inputNote}>(Min: 5, Max: 50, Kelipatan: 5)</p>

        <button type="submit" className={`primaryButton ${styles.submitButton}`}>
          Mulai Tes
        </button>
      </form>
    </div>
  );
};

export default TestSetupPage;
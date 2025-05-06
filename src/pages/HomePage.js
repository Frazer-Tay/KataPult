// src/pages/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';

const HomePage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Selamat Datang di KataPult!</h1>
      <p className={styles.subtitle}>Pilih mode latihan untuk mengasah Bahasa Indonesia Anda.</p>
      {/* Use a nav element for semantic structure */}
      <nav className={styles.buttonGrid} aria-label="Mode Latihan">
        <Link to="/vocabulary" className={`${styles.buttonCard} ${styles.vocabButton}`} role="button">
          <span className={styles.buttonIcon}>📚</span>
          <span className={styles.buttonText}>Vocabulary (Contoh Kalimat)</span>
        </Link>
        <Link to="/imbuhan" className={`${styles.buttonCard} ${styles.imbuhanButton}`} role="button">
          <span className={styles.buttonIcon}>🔗</span>
          <span className={styles.buttonText}>Imbuhan (Affixes)</span>
        </Link>
        <Link to="/persamaan" className={`${styles.buttonCard} ${styles.persamaanButton}`} role="button">
          <span className={styles.buttonIcon}>🔄</span>
          <span className={styles.buttonText}>Persamaan (Synonyms - MCQ)</span>
        </Link>
        <Link to="/karangan" className={`${styles.buttonCard} ${styles.karanganButton}`} role="button">
          <span className={styles.buttonIcon}>📝</span>
          <span className={styles.buttonText}>Karangan Vocab (MCQ)</span>
        </Link>
      </nav>
    </div>
  );
};

export default HomePage;
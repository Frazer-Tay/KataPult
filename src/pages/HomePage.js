// src/pages/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';

const HomePage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Selamat Datang di KataPult!</h1>
      <p className={styles.subtitle}>Pilih mode latihan atau uji kemampuan Anda.</p>
      <nav className={styles.buttonGrid} aria-label="Mode Aplikasi">
        <div className={styles.sectionTitle}>Mode Latihan & Referensi</div>
        <Link to="/vocabulary" className={`${styles.buttonCard} ${styles.vocabButton}`} role="button">
          <span className={styles.buttonIcon}>📚</span>
          <span className={styles.buttonText}>Vocabulary (Contoh Kalimat)</span>
        </Link>
        <Link to="/imbuhan" className={`${styles.buttonCard} ${styles.imbuhanButton}`} role="button">
          <span className={styles.buttonIcon}>🔗</span>
          {/* CORRECTED className assignment below */}
          <span className={styles.buttonText}>Imbuhan (Affixes)</span>
        </Link>
        <Link to="/persamaan" className={`${styles.buttonCard} ${styles.persamaanButton}`} role="button">
          <span className={styles.buttonIcon}>🔄</span>
          {/* CORRECTED className assignment below */}
          <span className={styles.buttonText}>Persamaan (Synonyms - MCQ)</span>
        </Link>
        <Link to="/karangan" className={`${styles.buttonCard} ${styles.karanganButton}`} role="button">
          <span className={styles.buttonIcon}>📝</span>
          {/* CORRECTED className assignment below */}
          <span className={styles.buttonText}>Karangan Vocab (MCQ)</span>
        </Link>
        <Link to="/flashcards" className={`${styles.buttonCard} ${styles.flashcardsButton}`} role="button"> {/* Assumes a new style or reuse one */}
          <span className={styles.buttonIcon}>🗂️</span>
          {/* CORRECTED className assignment below */}
          <span className={styles.buttonText}>Flashcards (Frasa & Topik)</span>
        </Link>

        <div className={`${styles.sectionTitle} ${styles.testModeTitle}`}>Mode Tes</div>
        <Link to="/test-setup" className={`${styles.buttonCard} ${styles.testButton}`} role="button">
          <span className={styles.buttonIcon}>⏱️</span>
          {/* CORRECTED className assignment below */}
          <span className={styles.buttonText}>Mulai Tes Kustom</span>
        </Link>
      </nav>
    </div>
  );
};

export default HomePage;
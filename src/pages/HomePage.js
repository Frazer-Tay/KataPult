// src/pages/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';

const HomePage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Selamat Datang di KataPult!</h1>
      <p className={styles.subtitle}>Pilih mode latihan untuk mengasah Bahasa Indonesia Anda.</p>
      <div className={styles.buttonGrid}>
        <Link to="/vocabulary" className={`${styles.buttonCard} ${styles.vocabButton}`}>
          <span className={styles.buttonIcon}>📚</span>
          <span className={styles.buttonText}>Vocabulary (Contoh Kalimat)</span>
        </Link>
        <Link to="/imbuhan" className={`${styles.buttonCard} ${styles.imbuhanButton}`}>
          <span className={styles.buttonIcon}>🔗</span>
          <span className={styles.buttonText}>Imbuhan (Affixes)</span>
        </Link>
        <Link to="/persamaan" className={`${styles.buttonCard} ${styles.persamaanButton}`}>
          <span className={styles.buttonIcon}>🔄</span>
          <span className={styles.buttonText}>Persamaan (Synonyms - MCQ)</span>
        </Link>
        <Link to="/karangan" className={`${styles.buttonCard} ${styles.karanganButton}`}>
          <span className={styles.buttonIcon}>📝</span>
          <span className={styles.buttonText}>Karangan Vocab (MCQ)</span>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
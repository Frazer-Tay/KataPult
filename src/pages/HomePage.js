// src/pages/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';

const HomePage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Pilih Mode Latihan Anda</h1>
      <div className={styles.buttonContainer}>
        <Link to="/vocabulary" className={`${styles.button} ${styles.vocabButton}`}>
          📚 Vocabulary (Kalimat)
        </Link>
      </div>
      <div className={styles.buttonContainer}>
        <Link to="/imbuhan" className={`${styles.button} ${styles.imbuhanButton}`}>
          🔗 Imbuhan (Affixes)
        </Link>
      </div>
      <div className={styles.buttonContainer}>
        <Link to="/persamaan" className={`${styles.button} ${styles.persamaanButton}`}>
          🔄 Persamaan (Synonyms)
        </Link>
      </div>
      <div className={styles.buttonContainer}>
        <Link to="/karangan" className={`${styles.button} ${styles.karanganButton}`}>
          📝 Karangan Vocabulary
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
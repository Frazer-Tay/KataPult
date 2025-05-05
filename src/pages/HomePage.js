// src/pages/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';

const HomePage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Pilih Mode Latihan:</h1>
      <div className={styles.buttonContainer}>
        <Link to="/vocabulary" className={styles.button}>
          1. Vocabulary (Kalimat)
        </Link>
      </div>
      <div className={styles.buttonContainer}>
        <Link to="/imbuhan" className={styles.button}>
          2. Imbuhan (Affixes)
        </Link>
      </div>
      <div className={styles.buttonContainer}>
        <Link to="/persamaan" className={styles.button}>
          3. Persamaan (Synonyms)
        </Link>
      </div>
      <div className={styles.buttonContainer}>
        <Link to="/karangan" className={styles.button}>
          4. Karangan Vocabulary
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
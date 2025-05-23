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
          <div className={styles.buttonTextContainer}>
            <span className={styles.buttonText}>Vocabulary (Contoh Kalimat)</span>
            <span className={styles.buttonSubtext}>Pelajari kosakata baru dengan contoh kalimat.</span>
          </div>
        </Link>

        <Link to="/imbuhan" className={`${styles.buttonCard} ${styles.imbuhanButton}`} role="button">
          <span className={styles.buttonIcon}>🔗</span>
           <div className={styles.buttonTextContainer}>
            <span className={styles.buttonText}>Imbuhan (Affixes)</span>
            <span className={styles.buttonSubtext}>Pahami & latih pembentukan kata dengan afiks.</span>
          </div>
        </Link>
        
        <Link to="/persamaan" className={`${styles.buttonCard} ${styles.persamaanButton}`} role="button">
          <span className={styles.buttonIcon}>🔄</span>
          <div className={styles.buttonTextContainer}>
           <span className={styles.buttonText}>Persamaan (Sinonim - MCQ)</span>
            <span className={styles.buttonSubtext}>Uji & tingkatkan pemahaman sinonim Anda.</span>
          </div>
        </Link>

        <Link to="/persamaan-latihan" className={`${styles.buttonCard} ${styles.persamaanLatihanButton}`} role="button">
         <span className={styles.buttonIcon}>✍️</span>
         <div className={styles.buttonTextContainer}>
           <span className={styles.buttonText}>Persamaan (Latihan Tulis Sinonim)</span>
           <span className={styles.buttonSubtext}>Latih kemampuan mengingat & menulis sinonim.</span>
         </div>
       </Link>

        <Link to="/karangan" className={`${styles.buttonCard} ${styles.karanganButton}`} role="button">
          <span className={styles.buttonIcon}>📝</span>
          <div className={styles.buttonTextContainer}>
            <span className={styles.buttonText}>Karangan Vocab (MCQ)</span>
            <span className={styles.buttonSubtext}>Perkaya kosakata untuk penulisan esai.</span>
          </div>
        </Link>

        <Link to="/flashcards" className={`${styles.buttonCard} ${styles.flashcardsButton}`} role="button">
          <span className={styles.buttonIcon}>🗂️</span>
          <div className={styles.buttonTextContainer}>
            <span className={styles.buttonText}>Flashcards (Frasa & Topik)</span>
            <span className={styles.buttonSubtext}>Review frasa & poin esai penting.</span>
          </div>
        </Link>

        <Link to="/surat-resmi" className={`${styles.buttonCard} ${styles.suratButton}`} role="button">
          <span className={styles.buttonIcon}>✉️</span>
          <div className={styles.buttonTextContainer}>
            <span className={styles.buttonText}>Surat Resmi (Formal Letters)</span>
            <span className={styles.buttonSubtext}>Pelajari struktur & panduan menulis surat resmi.</span>
          </div>
        </Link>

        <div className={`${styles.sectionTitle} ${styles.testModeTitle}`}>Mode Tes</div>
        <Link to="/test-setup" className={`${styles.buttonCard} ${styles.testButton}`} role="button">
          <span className={styles.buttonIcon}>⏱️</span>
          <div className={styles.buttonTextContainer}>
            <span className={styles.buttonText}>Mulai Tes Kustom</span>
            <span className={styles.buttonSubtext}>Uji kemampuan dengan tes yang disesuaikan.</span>
          </div>
        </Link>
      </nav>
    </div>
  );
};

export default HomePage;
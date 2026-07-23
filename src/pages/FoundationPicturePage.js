import React, { useState } from 'react';
import { pictureMCQData, comparisonData } from '../data/foundationPractice';
import { useSettings } from '../contexts/SettingsContext';
import styles from './Foundation.module.css';

const FoundationPicturePage = () => {
  const { englishAssist } = useSettings();
  const [activeTab, setActiveTab] = useState('picture'); // 'picture' or 'comparison'
  const currentData = activeTab === 'picture' ? pictureMCQData : comparisonData;

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentItem = currentData[currentIndex] || currentData[0];

  const [selectedOption, setSelectedOption] = useState(null);
  const [isChecked, setIsChecked] = useState(false);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsChecked(false);
  };

  const handleOptionSelect = (option) => {
    if (isChecked) return;
    setSelectedOption(option);
  };

  const handleCheck = () => {
    setIsChecked(true);
  };

  const advanceToNext = () => {
    setSelectedOption(null);
    setIsChecked(false);
    setCurrentIndex((prev) => (prev + 1) % currentData.length);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 style={{ color: '#1e3a8a', marginBottom: '0.5rem' }}>{englishAssist ? 'Picture & Sentence' : 'Gambar & Kalimat'}</h1>
        <div style={{ color: '#64748b', fontSize: '0.9em', fontStyle: 'italic', marginBottom: '0.5rem' }}>{englishAssist ? 'Gambar & Kalimat' : 'Picture & Sentence'}</div>
        <p style={{ color: '#64748b', fontSize: '1.1rem' }}>{englishAssist ? 'Choose the sentence that matches the picture below.' : 'Pilih kalimat yang sesuai dengan gambar di bawah.'}</p>
        <div style={{ color: '#64748b', fontSize: '0.9em', fontStyle: 'italic' }}>{englishAssist ? 'Pilih kalimat yang sesuai dengan gambar di bawah.' : 'Choose the sentence that matches the picture below.'}</div>
      </header>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <button
          onClick={() => handleTabChange('picture')}
          className={styles.checkButton}
          style={{ background: activeTab === 'picture' ? '#ff6b6b' : '#f1f2f6', color: activeTab === 'picture' ? 'white' : '#2f3542', boxShadow: activeTab === 'picture' ? '0 4px 0 #ee5253' : '0 4px 0 #dfe4ea' }}
        >
          {englishAssist ? 'Picture Story' : 'Cerita Gambar'}
        </button>
        <button
          onClick={() => handleTabChange('comparison')}
          className={styles.checkButton}
          style={{ background: activeTab === 'comparison' ? '#ff6b6b' : '#f1f2f6', color: activeTab === 'comparison' ? 'white' : '#2f3542', boxShadow: activeTab === 'comparison' ? '0 4px 0 #ee5253' : '0 4px 0 #dfe4ea' }}
        >
          {englishAssist ? 'Weight Comparison' : 'Perbandingan Berat'}
        </button>
      </div>

      <div className={styles.centeredCard} style={{ maxWidth: '700px' }}>
        <div className={styles.imagePlaceholder} style={{ height: '300px', background: 'none', border: 'none' }}>
          {currentItem.image && <img src={`/images/foundation/${currentItem.image}`} alt="Soal gambar" style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '15px', objectFit: 'contain' }} />}
        </div>

        <h2 style={{ textAlign: 'center', color: '#2f3542', marginBottom: '2rem', fontSize: '1.5rem' }}>
          <div>{currentItem.question}</div>
          {currentItem.englishQuestion && <div className={styles.englishText} style={{ marginTop: '8px', fontSize: '1rem', fontWeight: 'normal' }}>{currentItem.englishQuestion}</div>}
        </h2>

        <div className={styles.optionsGrid}>
          {activeTab === 'picture' ? (
            currentItem.options.map((opt, i) => {
              let statusClass = '';
              if (isChecked) {
                if (opt.isCorrect) statusClass = styles.correct;
                else if (selectedOption === opt.text) statusClass = styles.incorrect;
              } else if (selectedOption === opt.text) {
                statusClass = styles.selected;
              }

              return (
                <button
                  key={i}
                  className={`${styles.optionButton} ${statusClass}`}
                  onClick={() => handleOptionSelect(opt.text)}
                  disabled={isChecked}
                >
                  <span style={{ fontWeight: 'bold', marginRight: '8px' }}>{String.fromCharCode(65 + i)}.</span>
                  <div>
                    {opt.text}
                    {isChecked && opt.englishText && <div className={styles.englishText}>{opt.englishText}</div>}
                  </div>
                </button>
              );
            })
          ) : (
            currentItem.options.map((opt, i) => {
              let statusClass = '';
              if (isChecked) {
                if (opt === currentItem.answer) statusClass = styles.correct;
                else if (selectedOption === opt) statusClass = styles.incorrect;
              } else if (selectedOption === opt) {
                statusClass = styles.selected;
              }

              return (
                <button
                  key={i}
                  className={`${styles.optionButton} ${statusClass}`}
                  onClick={() => handleOptionSelect(opt)}
                  disabled={isChecked}
                  style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                >
                  <div>{opt}</div>
                  {isChecked && currentItem.englishOptions && (
                    <div className={styles.englishText} style={{ fontSize: '1rem', marginTop: '4px', fontWeight: 'normal' }}>
                      {currentItem.englishOptions[i]}
                    </div>
                  )}
                </button>
              );
            })
          )}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <button
            className={styles.checkButton}
            onClick={isChecked ? advanceToNext : handleCheck}
            style={{ padding: '0.8rem 2rem', fontSize: '1.1rem' }}
            disabled={!selectedOption && !isChecked}
          >
            {isChecked ? (englishAssist ? 'Next' : 'Lanjut') : (englishAssist ? 'Check Answer' : 'Periksa Jawaban')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoundationPicturePage;

import React, { useState, useEffect } from 'react';
import { matchingData } from '../data/foundationPractice';
import { useSettings } from '../contexts/SettingsContext';
import styles from './Foundation.module.css';

const FoundationMatchingPage = () => {
  const { englishAssist } = useSettings();
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentItem = matchingData[currentIndex] || matchingData[0];

  const [leftItems, setLeftItems] = useState([]);
  const [rightItems, setRightItems] = useState([]);
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [connections, setConnections] = useState({});
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    // Shuffle the right items so they don't match index-for-index
    const shuffledRight = [...currentItem.pairs].sort(() => Math.random() - 0.5);
    setLeftItems(currentItem.pairs);
    setRightItems(shuffledRight);
    setConnections({});
    setSelectedLeft(null);
    setIsChecked(false);
  }, [currentIndex, currentItem]);

  const handleLeftClick = (index) => {
    if (isChecked) return;
    setSelectedLeft(index);
  };

  const handleRightClick = (rightItem) => {
    if (isChecked || selectedLeft === null) return;

    // Connect the selected left item to this right item text
    setConnections(prev => ({
      ...prev,
      [selectedLeft]: rightItem.text
    }));

    setSelectedLeft(null);
  };

  const handleCheck = () => {
    setIsChecked(true);
  };

  const advanceToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % matchingData.length);
  };

  const allConnected = Object.keys(connections).length === leftItems.length;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 style={{ color: '#1e3a8a', marginBottom: '0.5rem' }}>{englishAssist ? 'Matching' : 'Mencocokkan'}</h1>
        <div style={{ color: '#64748b', fontSize: '0.9em', fontStyle: 'italic', marginBottom: '0.5rem' }}>{englishAssist ? 'Mencocokkan' : 'Matching'}</div>
        <p style={{ color: '#64748b', fontSize: '1.1rem' }}>{englishAssist ? 'Match the picture with the correct sentence!' : 'Pasangkan gambar dengan kalimat yang tepat!'}</p>
        <div style={{ color: '#64748b', fontSize: '0.9em', fontStyle: 'italic' }}>{englishAssist ? 'Pasangkan gambar dengan kalimat yang tepat!' : 'Match the picture with the correct sentence!'}</div>
      </header>

      <div className={styles.centeredCard} style={{ maxWidth: '900px' }}>
        <h2 style={{ textAlign: 'center', color: '#ff6b6b', marginBottom: '2rem', fontSize: '2rem' }}>
          {currentItem.title}
        </h2>

        <div className={styles.matchingGrid} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '2rem' }}>
          {/* Left Column - Images */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
            {leftItems.map((item, index) => (
              <div
                key={index}
                className={styles.optionButton}
                style={{
                  width: '180px',
                  height: '180px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: selectedLeft === index ? '#e6f3ff' : 'white',
                  borderColor: selectedLeft === index ? '#1e90ff' : '#dfe4ea',
                  boxShadow: selectedLeft === index ? '0 0 0 6px rgba(30, 144, 255, 0.3)' : 'none',
                  position: 'relative'
                }}
                onClick={() => handleLeftClick(index)}
              >
                {item.image ? <img src={`/images/foundation/${item.image}`} alt="Pilihan gambar" style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '12px', objectFit: 'contain' }} /> : '[Gambar tidak tersedia]'}
                {connections[index] && (
                  <div style={{
                    position: 'absolute',
                    right: '-20px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: '#2ecc71',
                    color: 'white',
                    width: '45px',
                    height: '45px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    fontSize: '1.5rem',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                    zIndex: 10
                  }}>✓</div>
                )}
              </div>
            ))}
          </div>

          {/* Right Column - Text */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', flex: 1 }}>
            {rightItems.map((item, index) => {
              // Find which left item connects to this text
              const connectedLeftIndex = Object.keys(connections).find(key => connections[key] === item.text);
              const isConnected = connectedLeftIndex !== undefined;

              let statusClass = '';
              if (isChecked && isConnected) {
                // Check if the connection is correct
                const isCorrect = leftItems[connectedLeftIndex].text === item.text;
                statusClass = isCorrect ? styles.correct : styles.incorrect;
              }

              return (
                <div
                  key={index}
                  className={`${styles.optionButton} ${statusClass}`}
                  style={{
                    minHeight: '180px',
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: isConnected && !isChecked ? '#f1f2f6' : '',
                    opacity: isConnected && !isChecked ? 0.6 : 1,
                    borderWidth: isConnected ? '3px' : '2px',
                    padding: '1rem',
                    fontSize: '1.1rem'
                  }}
                  onClick={() => handleRightClick(item)}
                >
                  <div style={{ fontWeight: '500', marginBottom: '8px' }}>{item.text}</div>
                  {isChecked && item.englishText && <div className={styles.englishText} style={{ margin: 0 }}>{item.englishText}</div>}
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <button
            className={styles.checkButton}
            onClick={isChecked ? advanceToNext : handleCheck}
            style={{ padding: '0.8rem 2rem', fontSize: '1.1rem' }}
            disabled={!allConnected && !isChecked}
          >
            {isChecked ? (englishAssist ? 'Retry / Next' : 'Ulang / Lanjut') : (englishAssist ? 'Check Answers' : 'Periksa Jawaban')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoundationMatchingPage;

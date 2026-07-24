import React, { useState, useEffect } from 'react';
import { sequencingData } from '../data/foundationPractice';
import { useSettings } from '../contexts/SettingsContext';
import styles from './Foundation.module.css';

const FoundationSequencingPage = () => {
  const { englishAssist } = useSettings();
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentItem = sequencingData[currentIndex] || sequencingData[0];

  const [items, setItems] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [draggedItemIndex, setDraggedItemIndex] = useState(null);

  useEffect(() => {
    // Shuffle the items for the initial view
    const shuffled = [...currentItem.steps].map((stepObj, i) => ({
      id: i,
      text: stepObj.text,
      englishText: stepObj.englishText,
      originalIndex: currentItem.steps.indexOf(stepObj)
    })).sort(() => Math.random() - 0.5);

    setItems(shuffled);
    setIsChecked(false);
  }, [currentIndex, currentItem]);

  const handleDragStart = (e, index) => {
    if (isChecked) return;
    setDraggedItemIndex(index);
    e.dataTransfer.effectAllowed = "move";
    // For Firefox compatibility
    e.dataTransfer.setData("text/html", e.target.parentNode);
    e.target.style.opacity = '0.5';
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = '1';
    setDraggedItemIndex(null);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedItemIndex === null || draggedItemIndex === index) return;

    const newItems = [...items];
    const draggedItem = newItems[draggedItemIndex];

    // Remove dragged item from old position and insert at new position
    newItems.splice(draggedItemIndex, 1);
    newItems.splice(index, 0, draggedItem);

    setItems(newItems);
    setDraggedItemIndex(index); // Update index to follow the item as it moves
  };

  const handleCheck = () => {
    setIsChecked(true);
  };

  const advanceToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % sequencingData.length);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 style={{ color: '#1e3a8a', marginBottom: '0.5rem' }}>{englishAssist ? 'Sequencing' : 'Mengurutkan'}</h1>
        <div style={{ color: '#64748b', fontSize: '0.9em', fontStyle: 'italic', marginBottom: '0.5rem' }}>{englishAssist ? 'Mengurutkan' : 'Sequencing'}</div>
        <p style={{ color: '#64748b', fontSize: '1.1rem' }}>{englishAssist ? 'Arrange the sentences below so they become a correct story!' : 'Susunlah kalimat di bawah ini agar menjadi cerita yang benar!'}</p>
        <div style={{ color: '#64748b', fontSize: '0.9em', fontStyle: 'italic' }}>{englishAssist ? 'Susunlah kalimat di bawah ini agar menjadi cerita yang benar!' : 'Arrange the sentences below so they become a correct story!'}</div>
      </header>

      <div className={styles.centeredCard} style={{ maxWidth: '800px' }}>
        <h2 style={{ textAlign: 'center', color: '#ff6b6b', marginBottom: '1.5rem', fontSize: '2rem' }}>
          {currentItem.title}
        </h2>

        <div className={styles.imagePlaceholder} style={{ height: '200px', background: 'none', border: 'none' }}>
          {currentItem.image && <img src={`/images/foundation/${currentItem.image}`} alt="Ilustrasi langkah" style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '15px', objectFit: 'contain' }} />}
        </div>

        <div style={{ marginTop: '2rem' }}>
          {items.map((item, index) => {
            let statusClass = '';
            if (isChecked) {
              const isCorrect = item.originalIndex === index;
              statusClass = isCorrect ? styles.correct : styles.incorrect;
            }

            return (
              <div
                key={item.id}
                className={`${styles.stepItem} ${statusClass}`}
                draggable={!isChecked}
                onDragStart={(e) => handleDragStart(e, index)}
                onDragEnd={handleDragEnd}
                onDragOver={(e) => handleDragOver(e, index)}
                style={{
                  background: isChecked && item.originalIndex === index ? '#e3fbed' :
                              isChecked ? '#ffefef' : 'white',
                  borderColor: isChecked && item.originalIndex === index ? '#2ecc71' :
                               isChecked ? '#e74c3c' : '#dfe4ea',
                }}
              >
                <div className={styles.dragHandle}>
                  {isChecked ? (item.originalIndex === index ? '✅' : '❌') : '↕️'}
                </div>
                <div style={{ fontWeight: 'bold', marginRight: '1rem', color: '#747d8c' }}>
                  {index + 1}.
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ fontWeight: '500' }}>{item.text}</div>
                  {isChecked && item.englishText && <div className={styles.englishText}>{item.englishText}</div>}
                </div>
                {isChecked && item.originalIndex !== index && (
                  <div style={{ color: '#e74c3c', fontSize: '0.9rem', fontWeight: 'bold' }}>
                    ({englishAssist ? 'Should be #' : 'Seharusnya #'}{item.originalIndex + 1})
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <button
            className={styles.checkButton}
            onClick={isChecked ? advanceToNext : handleCheck}
            style={{ padding: '0.8rem 2rem', fontSize: '1.1rem' }}
          >
            {isChecked ? (englishAssist ? 'Next' : 'Lanjut') : (englishAssist ? 'Check Answers' : 'Periksa Jawaban')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoundationSequencingPage;

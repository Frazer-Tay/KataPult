import React, { useState } from 'react';
import { imbuhanData } from '../data/imbuhan';
import ImbuhanPracticeSession from './ImbuhanPracticeSession';
import { useSettings } from '../contexts/SettingsContext';
import UiIcon from '../components/UiIcon';
import { PageHeader, StatusBadge } from '../components/SharedUI';
import styles from './ImbuhanPage.module.css';

const ImbuhanPage = () => {
  const { englishAssist } = useSettings();
  const [viewMode, setViewMode] = useState('hub');
  const [selectedSet, setSelectedSet] = useState(null);
  const [sessionTitle, setSessionTitle] = useState('');
  const validData = imbuhanData.filter((item) => item.root && item.targetWord && item.sentence && item.hint);
  const chunkSize = 10;
  const numSets = Math.ceil(validData.length / chunkSize);

  const handleStartPractice = (index) => {
    const start = index * chunkSize;
    setSelectedSet(validData.slice(start, start + chunkSize));
    setSessionTitle(`Set ${index + 1}`);
    setViewMode('practice');
  };

  if (viewMode === 'practice') {
    return <ImbuhanPracticeSession practiceSet={selectedSet} onBack={() => setViewMode('hub')} sessionTitle={sessionTitle} />;
  }

  if (viewMode === 'study') {
    return (
      <div className={styles.container}>
        <button onClick={() => setViewMode('hub')} className={`secondaryButton ${styles.hubBackButton}`}>
          <UiIcon name="arrowLeft" size={18} /> {englishAssist ? 'Back to hub' : 'Kembali ke pusat'}
        </button>
        <PageHeader
          eyebrow={englishAssist ? 'Reference library' : 'Perpustakaan referensi'}
          title={englishAssist ? 'Study Imbuhan' : 'Pelajari Imbuhan'}
          description={englishAssist ? 'Review each root, derived word, and meaning before starting a focused set.' : 'Tinjau setiap kata dasar, kata berimbuhan, dan artinya sebelum memulai set latihan.'}
        />
        <div className={styles.studyTableWrap}>
          <table className={styles.studyTable}>
            <thead><tr><th>{englishAssist ? 'Root word' : 'Kata dasar'}</th><th>{englishAssist ? 'Derived word' : 'Kata berimbuhan'}</th><th>{englishAssist ? 'Meaning' : 'Arti'}</th></tr></thead>
            <tbody>
              {validData.map((item, index) => (
                <tr key={item.id || index}><td className={styles.keyTerm}>{item.root}</td><td><strong>{item.targetWord}</strong></td><td>{item.hint}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <PageHeader
        eyebrow={englishAssist ? 'Level 2 word formation' : 'Pembentukan kata Level 2'}
        title={englishAssist ? 'Imbuhan learning hub' : 'Pusat pembelajaran Imbuhan'}
        description={englishAssist ? 'Build the pattern first, then practise it in short ten-word sets.' : 'Pelajari polanya terlebih dahulu, lalu berlatih dalam set singkat berisi sepuluh kata.'}
      />
      <button type="button" onClick={() => setViewMode('study')} className={styles.hubFeatureCard}>
        <span className={styles.hubIcon}><UiIcon name="book" size={28} /></span>
        <span className={styles.hubFeatureCopy}><strong>{englishAssist ? 'Study all words' : 'Pelajari semua kata'}</strong><small>{englishAssist ? 'Browse roots, derived forms, and meanings' : 'Jelajahi kata dasar, bentuk imbuhan, dan arti'}</small></span>
        <StatusBadge icon="layers">{validData.length} {englishAssist ? 'words' : 'kata'}</StatusBadge>
        <UiIcon name="arrowRight" size={20} />
      </button>
      <section className={styles.setSection}>
        <div className={styles.hubSectionHeading}>
          <div><span>{englishAssist ? 'Focused practice' : 'Latihan terfokus'}</span><h2>{englishAssist ? 'Choose a set' : 'Pilih set'}</h2></div>
          <StatusBadge icon="link" tone="success">{numSets} {englishAssist ? 'sets' : 'set'}</StatusBadge>
        </div>
        <div className={styles.setGrid}>
          {Array.from({ length: numSets }).map((_, index) => {
            const itemCount = Math.min(chunkSize, validData.length - (index * chunkSize));
            return (
              <button key={index} type="button" onClick={() => handleStartPractice(index)} className={styles.setCard}>
                <span className={styles.setNumber}>{String(index + 1).padStart(2, '0')}</span>
                <span><strong>{englishAssist ? `Practice set ${index + 1}` : `Latihan set ${index + 1}`}</strong><small>{itemCount} {englishAssist ? 'questions' : 'pertanyaan'}</small></span>
                <UiIcon name="arrowRight" size={18} />
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default ImbuhanPage;

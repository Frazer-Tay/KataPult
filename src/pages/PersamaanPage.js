import React, { useState } from 'react';
import { persamaanData } from '../data/persamaan';
import PersamaanPracticeSession from './PersamaanPracticeSession';
import { useSettings } from '../contexts/SettingsContext';
import UiIcon from '../components/UiIcon';
import { PageHeader, StatusBadge } from '../components/SharedUI';
import styles from './PersamaanPage.module.css';

const PersamaanPage = () => {
  const { englishAssist } = useSettings();
  const [viewMode, setViewMode] = useState('hub');
  const [selectedSet, setSelectedSet] = useState(null);
  const [sessionTitle, setSessionTitle] = useState('');
  const validData = persamaanData.filter((item) => item.word && Array.isArray(item.synonyms) && item.synonyms.length > 0);
  const chunkSize = 10;
  const numSets = Math.ceil(validData.length / chunkSize);

  const handleStartPractice = (index) => {
    const start = index * chunkSize;
    setSelectedSet(validData.slice(start, start + chunkSize));
    setSessionTitle(`Set ${index + 1}`);
    setViewMode('practice');
  };

  if (viewMode === 'practice') {
    return <PersamaanPracticeSession practiceSet={selectedSet} onBack={() => setViewMode('hub')} sessionTitle={sessionTitle} />;
  }

  if (viewMode === 'study') {
    return (
      <div className={styles.container}>
        <button onClick={() => setViewMode('hub')} className={`secondaryButton ${styles.hubBackButton}`}>
          <UiIcon name="arrowLeft" size={18} /> {englishAssist ? 'Back to hub' : 'Kembali ke pusat'}
        </button>
        <PageHeader
          eyebrow={englishAssist ? 'Reference library' : 'Perpustakaan referensi'}
          title={englishAssist ? 'Study synonyms' : 'Pelajari Persamaan Kata'}
          description={englishAssist ? 'Compare each target word with useful synonyms and examples in context.' : 'Bandingkan setiap kata target dengan sinonim dan contoh yang berguna dalam konteks.'}
        />
        <div className={styles.studyTableWrap}>
          <table className={styles.studyTable}>
            <thead><tr><th>{englishAssist ? 'Target word' : 'Kata target'}</th><th>{englishAssist ? 'Synonyms in context' : 'Sinonim dalam konteks'}</th></tr></thead>
            <tbody>
              {validData.map((item, index) => (
                <tr key={item.id || index}>
                  <td className={styles.keyTerm}>{item.word}</td>
                  <td>
                    <ul className={styles.synonymList}>
                      {item.synonyms.map((synonym, synonymIndex) => (
                        <li key={`${synonym.synonym}-${synonymIndex}`}><strong>{synonym.synonym}</strong><span>{synonym.example_sentence_synonym}</span></li>
                      ))}
                    </ul>
                  </td>
                </tr>
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
        eyebrow={englishAssist ? 'Level 2 vocabulary range' : 'Cakupan kosakata Level 2'}
        title={englishAssist ? 'Synonym learning hub' : 'Pusat pembelajaran Persamaan'}
        description={englishAssist ? 'Review synonyms in context, then build fast recognition in short practice sets.' : 'Tinjau sinonim dalam konteks, lalu bangun pengenalan cepat melalui set latihan singkat.'}
      />
      <button type="button" onClick={() => setViewMode('study')} className={styles.hubFeatureCard}>
        <span className={styles.hubIcon}><UiIcon name="book" size={28} /></span>
        <span className={styles.hubFeatureCopy}><strong>{englishAssist ? 'Study all synonyms' : 'Pelajari semua sinonim'}</strong><small>{englishAssist ? 'Browse words, alternatives, and example sentences' : 'Jelajahi kata, alternatif, dan contoh kalimat'}</small></span>
        <StatusBadge icon="layers">{validData.length} {englishAssist ? 'words' : 'kata'}</StatusBadge>
        <UiIcon name="arrowRight" size={20} />
      </button>
      <section className={styles.setSection}>
        <div className={styles.hubSectionHeading}>
          <div><span>{englishAssist ? 'Recognition practice' : 'Latihan pengenalan'}</span><h2>{englishAssist ? 'Choose a set' : 'Pilih set'}</h2></div>
          <StatusBadge icon="matching" tone="info">{numSets} {englishAssist ? 'sets' : 'set'}</StatusBadge>
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

export default PersamaanPage;

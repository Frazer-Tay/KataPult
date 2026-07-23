import React, { useState } from 'react';
import { imbuhanData } from '../data/imbuhan';
import ImbuhanPracticeSession from './ImbuhanPracticeSession';
import { useSettings } from '../contexts/SettingsContext';
import styles from './ImbuhanPage.module.css';

const ImbuhanPage = () => {
  const { englishAssist } = useSettings();
  const [viewMode, setViewMode] = useState('hub'); // 'hub', 'study', 'practice'
  const [selectedSet, setSelectedSet] = useState(null);
  const [sessionTitle, setSessionTitle] = useState('');

  const validData = imbuhanData.filter(item => item.root && item.targetWord && item.sentence && item.hint);
  const chunkSize = 10;
  const numSets = Math.ceil(validData.length / chunkSize);

  const handleStartPractice = (index) => {
    const start = index * chunkSize;
    const end = start + chunkSize;
    setSelectedSet(validData.slice(start, end));
    setSessionTitle(`Set ${index + 1}`);
    setViewMode('practice');
  };

  if (viewMode === 'practice') {
    return <ImbuhanPracticeSession practiceSet={selectedSet} onBack={() => setViewMode('hub')} sessionTitle={sessionTitle} />;
  }

  if (viewMode === 'study') {
    return (
      <div className={styles.container}>
         <button onClick={() => setViewMode('hub')} className="secondaryButton" style={{marginBottom: '20px'}}>
            ← {englishAssist ? 'Back to Hub' : 'Kembali ke Hub'}
         </button>
         <h2 style={{color: '#1e293b', marginBottom: '20px'}}>
            {englishAssist ? 'Study Mode: Imbuhan' : 'Mode Belajar: Imbuhan'}
         </h2>
         <div style={{overflowX: 'auto'}}>
           <table style={{width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}}>
             <thead>
               <tr style={{backgroundColor: '#f1f5f9', borderBottom: '2px solid #e2e8f0', textAlign: 'left'}}>
                 <th style={{padding: '12px 16px', color: '#475569'}}>{englishAssist ? 'Root Word' : 'Kata Dasar'}</th>
                 <th style={{padding: '12px 16px', color: '#475569'}}>{englishAssist ? 'Target Word' : 'Kata Berimbuhan'}</th>
                 <th style={{padding: '12px 16px', color: '#475569'}}>{englishAssist ? 'Meaning (Hint)' : 'Arti (Hint)'}</th>
               </tr>
             </thead>
             <tbody>
               {validData.map((item, i) => (
                 <tr key={item.id || i} style={{borderBottom: '1px solid #e2e8f0'}}>
                   <td style={{padding: '12px 16px', fontWeight: 'bold', color: '#3b82f6'}}>{item.root}</td>
                   <td style={{padding: '12px 16px', fontWeight: 'bold'}}>{item.targetWord}</td>
                   <td style={{padding: '12px 16px', color: '#64748b'}}>{item.hint}</td>
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
      <h1 style={{color: '#1e293b', textAlign: 'center', marginBottom: '10px'}}>
         {englishAssist ? 'Imbuhan Learning Hub' : 'Pusat Pembelajaran Imbuhan'}
      </h1>
      <p style={{color: '#64748b', textAlign: 'center', marginBottom: '30px'}}>
         {englishAssist ? 'Choose your learning mode.' : 'Pilih mode pembelajaran Anda.'}
      </p>

      <div style={{display: 'flex', gap: '20px', justifyContent: 'center', marginBottom: '40px', flexWrap: 'wrap'}}>
         <div
           onClick={() => setViewMode('study')}
           style={{cursor: 'pointer', backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', flex: '1', minWidth: '250px', maxWidth: '350px', textAlign: 'center', border: '2px solid transparent', transition: 'all 0.2s'}}
           onMouseOver={e => e.currentTarget.style.border = '2px solid #3b82f6'}
           onMouseOut={e => e.currentTarget.style.border = '2px solid transparent'}
         >
            <div style={{fontSize: '3rem', marginBottom: '15px'}}>📖</div>
            <h2 style={{color: '#1e293b', marginBottom: '10px'}}>{englishAssist ? 'Study Mode' : 'Mode Belajar'}</h2>
            <p style={{color: '#64748b', fontSize: '0.9rem'}}>
              {englishAssist ? 'Review all words, their roots, and meanings at your own pace.' : 'Pelajari semua kata, akar kata, dan artinya sesuai kemampuan Anda.'}
            </p>
         </div>
      </div>

      <h2 style={{color: '#1e293b', marginBottom: '20px', borderBottom: '2px solid #e2e8f0', paddingBottom: '10px'}}>
         ✍️ {englishAssist ? 'Practice Sets' : 'Set Latihan'}
      </h2>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px'}}>
        {Array.from({ length: numSets }).map((_, index) => {
          const itemsInThisSet = Math.min(chunkSize, validData.length - (index * chunkSize));
          return (
          <button
            key={index}
            onClick={() => handleStartPractice(index)}
            style={{padding: '20px', backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer', textAlign: 'center', fontSize: '1.1rem', fontWeight: 'bold', color: '#3b82f6', transition: 'all 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.1)'}}
            onMouseOver={e => e.currentTarget.style.backgroundColor = '#f1f5f9'}
            onMouseOut={e => e.currentTarget.style.backgroundColor = 'white'}
          >
            {englishAssist ? `Practice Set ${index + 1}` : `Latihan Set ${index + 1}`}
            <div style={{fontSize: '0.8rem', color: '#64748b', fontWeight: 'normal', marginTop: '5px'}}>
              ({itemsInThisSet} {englishAssist ? 'words' : 'kata'})
            </div>
          </button>
        )})}
      </div>
    </div>
  );
};

export default ImbuhanPage;

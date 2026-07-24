import React from 'react';
import { useProgress } from '../contexts/ProgressContext';
import { useSettings } from '../contexts/SettingsContext';
import { ModuleCard, PageHeader, StatusBadge } from '../components/SharedUI';
import styles from './Dashboard.module.css';

const Level1Dashboard = () => {
  const { xp, streak, level } = useProgress();
  const { englishAssist } = useSettings();

  return (
    <div className={styles.dashboard}>
      <section className={styles.hero}>
        <div className={styles.heroStats}>
          <StatusBadge icon="flame" tone="warning">{streak} {englishAssist ? `day${streak === 1 ? '' : 's'}` : 'hari'}</StatusBadge>
          <StatusBadge icon="star" tone="info">{xp} XP · Level {level}</StatusBadge>
        </div>
        <PageHeader eyebrow="Indonesia Level 1" title={englishAssist ? 'Strengthen the foundations that make every sentence work.' : 'Perkuat dasar-dasar yang membuat setiap kalimat berfungsi.'} description={englishAssist ? 'Follow the exam path or choose a focused warm-up before you begin.' : 'Ikuti jalur ujian atau pilih pemanasan terfokus sebelum memulai.'} />
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeading}><h2>{englishAssist ? 'Your learning path' : 'Jalur belajar Anda'}</h2></div>
        <div className={styles.path}>
          <div className={styles.pathStep}><span className={styles.pathNumber}>1</span><span><strong>{englishAssist ? 'Build vocabulary' : 'Bangun kosakata'}</strong><small>{englishAssist ? 'Learn the core words' : 'Pelajari kata-kata inti'}</small></span></div>
          <span className={styles.pathLine} />
          <div className={styles.pathStep}><span className={styles.pathNumber}>2</span><span><strong>{englishAssist ? 'Apply grammar' : 'Terapkan tata bahasa'}</strong><small>{englishAssist ? 'Form accurate sentences' : 'Bentuk kalimat yang tepat'}</small></span></div>
          <span className={styles.pathLine} />
          <div className={styles.pathStep}><span className={styles.pathNumber}>3</span><span><strong>{englishAssist ? 'Practise the exam' : 'Latihan ujian'}</strong><small>{englishAssist ? 'Read, complete, and write' : 'Membaca, melengkapi, menulis'}</small></span></div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeading}><h2>{englishAssist ? 'Exam modules' : 'Modul ujian'}</h2><p>{englishAssist ? 'Choose a focused practice area' : 'Pilih area latihan terfokus'}</p></div>
        <div className={styles.moduleGrid}>
          <ModuleCard to="/level1/reading" icon="book" tone="green" title={englishAssist ? 'Part I: Reading' : 'Bagian I: Membaca'} subtitle={englishAssist ? 'Reading comprehension and short responses' : 'Pemahaman bacaan dan jawaban singkat'} />
          <ModuleCard to="/level1/sentence" icon="sentence" tone="violet" title={englishAssist ? 'Part II: Sentences' : 'Bagian II: Kalimat'} subtitle={englishAssist ? 'Build clear and accurate sentences' : 'Susun kalimat yang jelas dan tepat'} />
          <ModuleCard to="/level1/imbuhan-practice" icon="link" tone="orange" title={englishAssist ? 'Part III: Affixes' : 'Bagian III: Imbuhan'} subtitle={englishAssist ? 'Complete words with the correct affixes' : 'Lengkapi kata dengan imbuhan yang tepat'} />
          <ModuleCard to="/level1/cloze" icon="puzzle" tone="blue" title={englishAssist ? 'Part IV: Cloze' : 'Bagian IV: Rumpang'} subtitle={englishAssist ? 'Use context to complete a passage' : 'Gunakan konteks untuk melengkapi bacaan'} />
          <ModuleCard to="/level1/writing" icon="pen" tone="red" title={englishAssist ? 'Part V & VI: Writing' : 'Bagian V & VI: Menulis'} subtitle={englishAssist ? 'Formal letters and longer essays' : 'Surat resmi dan karangan panjang'} />
          <ModuleCard to="/level1/vocabulary" icon="brain" tone="cyan" title={englishAssist ? 'Core vocabulary' : 'Kosakata inti'} subtitle={englishAssist ? 'A quick warm-up before exam practice' : 'Pemanasan cepat sebelum latihan ujian'} badge="Warm-up" />
        </div>
      </section>

      <p className={styles.footerNote}>{englishAssist ? 'A strong foundation makes fluency possible.' : 'Dasar yang kuat membuka jalan menuju kefasihan.'}</p>
    </div>
  );
};

export default Level1Dashboard;

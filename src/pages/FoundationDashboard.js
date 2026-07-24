import React from 'react';
import { useSettings } from '../contexts/SettingsContext';
import { ModuleCard, PageHeader, StatusBadge } from '../components/SharedUI';
import styles from './Dashboard.module.css';

const FoundationDashboard = () => {
  const { englishAssist } = useSettings();
  return (
    <div className={styles.dashboard}>
      <section className={styles.hero}>
        <div className={styles.heroStats}>
          <StatusBadge icon="sprout" tone="success">{englishAssist ? 'Beginner friendly' : 'Ramah pemula'}</StatusBadge>
          <StatusBadge icon="globe" tone="info">{englishAssist ? 'Bilingual guidance' : 'Panduan dwibahasa'}</StatusBadge>
        </div>
        <PageHeader
          eyebrow="BI Foundation"
          title={englishAssist ? 'Your first confident steps in Indonesian.' : 'Langkah pertama Anda dengan percaya diri dalam bahasa Indonesia.'}
          description={englishAssist ? 'Learn through short stories, everyday conversations, pictures, and simple sequencing activities.' : 'Belajar melalui cerita pendek, percakapan sehari-hari, gambar, dan aktivitas mengurutkan sederhana.'}
          assistiveText={englishAssist ? 'Langkah pertama belajar Bahasa Indonesia yang menyenangkan.' : 'A friendly first step into learning Indonesian.'}
        />
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <h2>{englishAssist ? 'Choose an activity' : 'Pilih aktivitas'}</h2>
          <p>{englishAssist ? 'Start anywhere and learn at your pace' : 'Mulai dari mana saja dan belajar sesuai kemampuan Anda'}</p>
        </div>
        <div className={styles.moduleGrid}>
          <ModuleCard to="/foundation/reading" icon="book" tone="blue" title={englishAssist ? 'Reading stories' : 'Membaca cerita'} subtitle={englishAssist ? 'Read a short story and answer guided questions' : 'Baca cerita pendek dan jawab pertanyaan terpandu'} meta={englishAssist ? 'Membaca cerita' : 'Reading stories'} />
          <ModuleCard to="/foundation/dialogue" icon="chat" tone="green" title={englishAssist ? 'Everyday dialogue' : 'Dialog sehari-hari'} subtitle={englishAssist ? 'Understand useful daily conversations' : 'Pahami percakapan harian yang bermanfaat'} meta={englishAssist ? 'Dialog sehari-hari' : 'Everyday dialogue'} />
          <ModuleCard to="/foundation/picture" icon="image" tone="orange" title={englishAssist ? 'Picture and sentence' : 'Gambar dan kalimat'} subtitle={englishAssist ? 'Choose the sentence that matches a picture' : 'Pilih kalimat yang sesuai dengan gambar'} meta={englishAssist ? 'Gambar dan kalimat' : 'Picture and sentence'} />
          <ModuleCard to="/foundation/matching" icon="matching" tone="violet" title={englishAssist ? 'Matching' : 'Mencocokkan'} subtitle={englishAssist ? 'Connect pictures with the right text' : 'Pasangkan gambar dengan teks yang tepat'} meta={englishAssist ? 'Mencocokkan' : 'Matching'} />
          <ModuleCard to="/foundation/sequencing" icon="sequencing" tone="cyan" title={englishAssist ? 'Sequencing' : 'Mengurutkan'} subtitle={englishAssist ? 'Arrange simple ideas in the correct order' : 'Susun gagasan sederhana dalam urutan yang benar'} meta={englishAssist ? 'Mengurutkan' : 'Sequencing'} />
        </div>
      </section>

      <p className={styles.footerNote}>{englishAssist ? 'Take your time. Every small step counts.' : 'Belajar dengan santai. Setiap langkah kecil berarti.'}</p>
    </div>
  );
};

export default FoundationDashboard;

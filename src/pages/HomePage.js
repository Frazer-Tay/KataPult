import React, { useMemo } from 'react';
import { useProgress } from '../contexts/ProgressContext';
import { useAuth } from '../contexts/AuthContext';
import { useSettings } from '../contexts/SettingsContext';
import { getDueWords } from '../utils/srsLogic';
import { vocabularyData } from '../data/vocabulary';
import useLearningProgress from '../hooks/useLearningProgress';
import { ModuleCard, PageHeader, StatusBadge } from '../components/SharedUI';
import styles from './Dashboard.module.css';

const HomePage = () => {
  const { currentUser, userData } = useAuth();
  const { xp, streak, level, dailyChallengeStatus } = useProgress();
  const { englishAssist } = useSettings();

  const displayName = userData?.displayName || 'User';
  const { continueEntry, entries } = useLearningProgress(currentUser?.uid);

  const dueCount = useMemo(() => {
    try {
      const filteredData = vocabularyData.filter(item => item.word && item.definition && item.level === 2);
      return getDueWords(filteredData).dueWords.length;
    } catch {
      return 0;
    }
  }, []);

  const progressFor = (route) => entries.find((entry) => entry.route === route)?.percentage;
  const continueMeta = continueEntry?.percentage
    ? `${continueEntry.percentage}% ${englishAssist ? 'complete' : 'selesai'}`
    : (englishAssist ? 'Recently opened' : 'Baru dibuka');

  return (
    <div className={styles.dashboard}>
      <section className={styles.hero}>
        <div className={styles.heroStats}>
          <StatusBadge icon="flame" tone="warning">{streak} {englishAssist ? `day${streak === 1 ? '' : 's'}` : 'hari'}</StatusBadge>
          <StatusBadge icon="star" tone="info">{xp} XP · Level {level}</StatusBadge>
          {dueCount > 0 && <StatusBadge icon="brain" tone="success">{dueCount} {englishAssist ? 'reviews due' : 'ulasan tersedia'}</StatusBadge>}
        </div>
        <PageHeader
          eyebrow={englishAssist ? `Welcome back, ${displayName}` : `Selamat datang, ${displayName}`}
          title={englishAssist ? 'Build confident Indonesian, one focused drill at a time.' : 'Bangun kepercayaan diri berbahasa, satu latihan setiap saat.'}
          description={englishAssist ? 'Continue with a recommended review or choose the skill you want to strengthen today.' : 'Lanjutkan ulasan yang disarankan atau pilih keterampilan yang ingin Anda perkuat hari ini.'}
        />
      </section>

      {continueEntry && (
        <section className={`${styles.section} ${styles.continueSection}`}>
          <div className={styles.sectionHeading}>
            <h2>{englishAssist ? 'Continue learning' : 'Lanjutkan belajar'}</h2>
            <p>{englishAssist ? 'Pick up exactly where you stopped' : 'Lanjutkan tepat dari tempat terakhir'}</p>
          </div>
          <div className={styles.continueCard}>
            <ModuleCard
              to={continueEntry.route}
              icon={continueEntry.icon}
              tone={continueEntry.tone}
              title={continueEntry.title}
              subtitle={continueEntry.label || (englishAssist ? 'Your most recent learning activity' : 'Aktivitas belajar terbaru Anda')}
              meta={continueMeta}
              badge={englishAssist ? 'Resume' : 'Lanjut'}
              progress={continueEntry.percentage}
            />
          </div>
        </section>
      )}

      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <h2>{englishAssist ? 'Recommended next' : 'Rekomendasi berikutnya'}</h2>
          <p>{englishAssist ? 'Based on useful daily practice' : 'Berdasarkan latihan harian yang bermanfaat'}</p>
        </div>
        <div className={styles.featuredGrid}>
          <ModuleCard to="/vocabulary" icon="brain" tone="violet" title={englishAssist ? 'Smart vocabulary review' : 'Ulasan kosakata pintar'} subtitle={dueCount > 0 ? `${dueCount} ${englishAssist ? 'words are ready to review' : 'kata siap ditinjau'}` : (englishAssist ? 'Start a new spaced-repetition set' : 'Mulai set pengulangan baru')} badge={dueCount > 0 ? 'Due' : 'SRS'} progress={progressFor('/vocabulary')} />
          <ModuleCard to="/daily-challenge" icon="trophy" tone="orange" title={englishAssist ? 'Daily challenge' : 'Tantangan harian'} subtitle={dailyChallengeStatus === 'completed' ? (englishAssist ? 'Completed today—practice again anytime' : 'Selesai hari ini—latihan lagi kapan saja') : (englishAssist ? 'A short mixed-skills session' : 'Sesi singkat dengan berbagai keterampilan')} badge={dailyChallengeStatus === 'completed' ? 'Done' : 'Daily'} />
          <ModuleCard to="/test-setup" icon="clipboard" tone="red" title={englishAssist ? 'Custom test' : 'Tes khusus'} subtitle={englishAssist ? 'Set the topics, length, and pace' : 'Atur topik, panjang, dan kecepatan'} />
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <h2>{englishAssist ? 'Practice by skill' : 'Latihan berdasarkan keterampilan'}</h2>
          <p>{englishAssist ? 'Level 2 learning modules' : 'Modul pembelajaran Level 2'}</p>
        </div>
        <div className={styles.moduleGrid}>
          <ModuleCard to="/vocabulary" icon="book" tone="violet" title="Vocabulary" subtitle={englishAssist ? 'Learn and retain essential words' : 'Pelajari dan ingat kosakata penting'} progress={progressFor('/vocabulary')} />
          <ModuleCard to="/imbuhan" icon="link" tone="green" title={englishAssist ? 'Affixes' : 'Imbuhan'} subtitle={englishAssist ? 'Understand Indonesian word formation' : 'Pahami pembentukan kata bahasa Indonesia'} progress={progressFor('/imbuhan')} />
          <ModuleCard to="/persamaan" icon="matching" tone="cyan" title={englishAssist ? 'Synonym MCQ' : 'Persamaan MCQ'} subtitle={englishAssist ? 'Recognize equivalent words quickly' : 'Kenali kata-kata yang setara dengan cepat'} progress={progressFor('/persamaan')} />
          <ModuleCard to="/persamaan-latihan" icon="pen" tone="blue" title={englishAssist ? 'Synonym practice' : 'Persamaan latihan'} subtitle={englishAssist ? 'Recall synonyms without answer choices' : 'Ingat sinonim tanpa pilihan jawaban'} progress={progressFor('/persamaan-latihan')} />
          <ModuleCard to="/karangan" icon="sentence" tone="orange" title="Essay Vocab" subtitle={englishAssist ? 'Build formal writing vocabulary' : 'Bangun kosakata penulisan formal'} progress={progressFor('/karangan')} />
          <ModuleCard to="/flashcards" icon="layers" tone="pink" title="Essay Bank" subtitle={englishAssist ? 'Study themes, phrases, and examples' : 'Pelajari tema, frasa, dan contoh'} progress={progressFor('/flashcards')} />
          <ModuleCard to="/surat" icon="pen" tone="violet" title={englishAssist ? 'Formal letters' : 'Surat resmi'} subtitle={englishAssist ? 'Learn structure and appropriate language' : 'Pelajari struktur dan bahasa yang tepat'} progress={progressFor('/surat')} />
          <ModuleCard to="/test-setup" icon="clipboard" tone="red" title={englishAssist ? 'Test simulator' : 'Simulasi tes'} subtitle={englishAssist ? 'Practise under focused conditions' : 'Berlatih dalam kondisi yang terfokus'} />
        </div>
      </section>

      <p className={styles.footerNote}>{englishAssist ? 'Short daily practice beats last-minute cramming.' : 'Latihan harian singkat lebih baik daripada belajar mendadak.'}</p>
    </div>
  );
};

export default HomePage;

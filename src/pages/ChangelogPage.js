import React from 'react';
import { PageHeader, StatusBadge } from '../components/SharedUI';
import UiIcon from '../components/UiIcon';
import styles from './ChangelogPage.module.css';

const releases = [
  {
    version: 'v0.8.0',
    date: '24 Juli 2026',
    current: true,
    changes: [
      ['Conversion-focused landing page', 'Mengganti halaman awal dengan proposisi nilai yang lebih jelas, satu CTA utama, navigasi merek, dan hierarki visual yang lebih profesional.'],
      ['Interactive product proof', 'Menambahkan contoh latihan Persamaan yang dapat dijawab sebelum login, lengkap dengan progress, feedback langsung, dan penjelasan manfaat penyimpanan progres.'],
      ['Personalized learning entry', 'Menampilkan aksi Continue Learning untuk pengguna yang kembali dan menyederhanakan pemilihan Foundation, Level 1, dan Level 2 untuk pengguna baru.'],
      ['KataPult learning companion', 'Menambahkan maskot Komodo ringan dengan identitas Indonesia sebagai elemen pendukung merek tanpa menggantikan tampilan produk nyata.'],
      ['Reliable mobile navigation', 'Menghapus dropdown bertingkat Lainnya pada menu mobile dan menampilkan tautan sekundernya secara langsung agar seluruh modul selalu dapat diakses.'],
      ['Authentication preserved', 'Tidak mengubah AuthContext, Firebase configuration, Login, Onboarding, atau alur Google Sign-In.']
    ]
  },
  {
    version: 'v0.7.0',
    date: '23 Juli 2026',
    changes: [
      ['Continue Learning', 'Menambahkan kartu lanjut belajar pada dasbor yang mengingat modul terakhir, posisi soal, persentase progres, dan aktivitas terbaru secara lokal untuk setiap akun.'],
      ['Unified practice experience', 'Memperbarui Vocabulary, Imbuhan, Persamaan, Karangan, Essay Bank, latihan Level 1, Daily Challenge, dan simulator tes dengan action bar, loading state, progress, dan pola interaksi bersama.'],
      ['Mobile-first practice shell', 'Menambahkan action bar yang tetap mudah dijangkau, dukungan safe-area, target sentuh lebih besar, input yang aman dari zoom iOS, scroll feedback otomatis, dan tata letak latihan yang lebih ringkas di layar kecil.'],
      ['Learning hubs and test setup', 'Mendesain ulang pusat Imbuhan dan Persamaan, mode Vocabulary, tabel referensi, pemilih set, serta pengaturan tes agar hierarki dan tindakan utama lebih jelas.'],
      ['Authentication preserved', 'Tidak mengubah AuthContext, konfigurasi Firebase, ProtectedRoute, Login, atau Onboarding sehingga perbaikan Google Sign-In tetap utuh.']
    ]
  },
  {
    version: 'v0.6.1',
    date: '23 Juli 2026',
    changes: [
      ['Admin-only changelog', 'Membatasi halaman dan tautan Changelog hanya untuk administrator. Pengguna biasa tidak lagi melihat tautan tersebut dan akses langsung dilindungi oleh pemeriksaan peran admin.']
    ]
  },
  {
    version: 'v0.6.0',
    date: '23 Juli 2026',
    changes: [
      ['Unified visual system', 'Menambahkan komponen bersama untuk tajuk halaman, kartu modul, badge status, feedback, loading, dan completion agar seluruh aplikasi terasa lebih konsisten.'],
      ['Focused navigation', 'Menyederhanakan header berdasarkan level aktif, menambahkan menu sekunder, progress capsule, profile menu, English Assist switch, serta navigasi mobile yang lebih jelas.'],
      ['Learning-state polish', 'Menyeragamkan progress bar, status jawaban, loading skeleton, completion card, focus state, dan reduced-motion support untuk pengalaman belajar yang lebih mudah dipahami.'],
      ['Reliable icons', 'Mengganti emoji dekoratif utama dengan ikon SVG agar tampilannya konsisten di Windows, Android, iOS, dan in-app browser.'],
      ['Authentication safety', 'Perubahan UI dibuat tanpa mengubah AuthContext, Firebase configuration, ProtectedRoute, Login, atau Onboarding. Perbaikan Google Sign-In berbasis popup/redirect dan persistence tetap dipertahankan.']
    ]
  },
  {
    version: 'v0.5.0',
    date: '13 Juni 2026',
    changes: [
      ['Global English Assist', 'Menambahkan toggle English Assist yang menerjemahkan instruksi, teks UI, dan penjelasan di seluruh modul Foundation dan Level 1. Pilihan disimpan menggunakan Local Storage.'],
      ['Level 1 integration', 'Modul Membaca, Menyusun Kalimat, Cloze Passage, dan Menulis mendukung terjemahan dwibahasa untuk pelajar L2.'],
      ['Level 2 readiness', 'Vocabulary, Karangan, Flashcards, Surat Resmi, dan Tantangan Harian mendukung sistem terjemahan UI dinamis.']
    ]
  },
  {
    version: 'v0.4.0',
    date: '7 Juni 2026',
    changes: [
      ['Bahasa Foundation', 'Menambahkan lima modul pemula: Membaca, Dialog, Gambar, Mencocokkan, dan Mengurutkan.'],
      ['Landing and login redesign', 'Memperbarui halaman utama dan login dengan tampilan bersih, responsif, dan lebih mudah diakses.'],
      ['Immersion-first translations', 'Terjemahan Foundation dapat ditampilkan setelah pengguna memeriksa jawaban agar fokus belajar tetap terjaga.'],
      ['WIP banner', 'Menambahkan pemberitahuan work-in-progress yang dinamis pada Foundation dan Level 1.']
    ]
  },
  {
    version: 'v0.3.0',
    date: '27 Mei 2026',
    changes: [
      ['Randomized resumable queues', 'Mengacak soal Sentence Construction dan Imbuhan Level 1 tanpa kehilangan posisi belajar.'],
      ['Baca Semua', 'Menambahkan mode membaca kosakata lengkap dalam urutan acak.'],
      ['Progress saving', 'Menyimpan progres secara lokal agar sesi dapat dilanjutkan.'],
      ['Question variety', 'Mencegah pengulangan soal dalam satu siklus latihan.']
    ]
  },
  {
    version: 'v0.2.0',
    date: '26 Mei 2026',
    changes: [
      ['Gamification', 'Menambahkan XP dan daily streak untuk mendukung kebiasaan belajar.'],
      ['Text-to-speech', 'Menambahkan pelafalan bahasa Indonesia pada Vocabulary, Sentence Construction, dan Imbuhan.'],
      ['Keyboard shortcuts', 'Mendukung tombol panah, Enter, dan Spasi untuk navigasi cepat.'],
      ['Google login fix', 'Memperbaiki auth/popup-closed-by-user pada in-app browser dengan fallback Redirect.']
    ]
  },
  {
    version: 'v0.1.0',
    date: 'Rilis awal',
    changes: [
      ['Core practice', 'Meluncurkan Vocabulary, Imbuhan, Persamaan, dan Karangan.'],
      ['Smart Review', 'Menambahkan spaced repetition untuk hafalan kosakata.'],
      ['Test simulation', 'Menambahkan konfigurasi tes dan mode latihan Level 1.']
    ]
  }
];

const ChangelogPage = () => (
  <div className={styles.container}>
    <PageHeader
      eyebrow="What’s new"
      title="Changelog & Updates"
      description="Catatan pembaruan fitur, pengalaman belajar, dan perbaikan penting di KataPult."
    />

    <div className={styles.timeline}>
      {releases.map((release) => (
        <article className={`${styles.release} ${release.current ? styles.current : ''}`} key={release.version}>
          <div className={styles.releaseMarker}><UiIcon name={release.current ? 'rocket' : 'check'} size={17} /></div>
          <div className={styles.releaseCard}>
            <header className={styles.releaseHeader}>
              <div>
                <h2>{release.version}</h2>
                <time>{release.date}</time>
              </div>
              {release.current && <StatusBadge icon="star" tone="success">Latest</StatusBadge>}
            </header>
            <ul className={styles.changeList}>
              {release.changes.map(([title, description]) => (
                <li key={title}>
                  <UiIcon name="check" size={17} />
                  <span><strong>{title}</strong><span>{description}</span></span>
                </li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </div>
  </div>
);

export default ChangelogPage;

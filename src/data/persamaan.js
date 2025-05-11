// src/data/persamaan.js
// REVISED for more apt synonyms

export const persamaanData = [
  { id: 1, word: 'adat', synonyms: ['budaya', 'norma', 'tradisi'] },
  { id: 2, word: 'ahli', synonyms: ['pakar', 'spesialis'] }, // REVIEWED: Added spesialis
  { id: 3, word: 'akhir pekan', synonyms: ['akhir minggu'] },
  { id: 4, word: 'akibat', synonyms: ['dampak', 'konsekuensi'] }, // REVIEWED: 'karena', 'gara-gara' are conjunctions/causes, not direct noun synonyms for 'result/consequence'
  { id: 5, word: 'aksi', synonyms: ['tindakan', 'gerakan'] }, // REVIEWED: Added gerakan
  { id: 6, word: 'aktivitas', synonyms: ['kegiatan'] },
  { id: 7, word: 'akurat', synonyms: ['tepat', 'presisi'] }, // REVIEWED: Added presisi
  { id: 8, word: 'angkutan', synonyms: ['transportasi'] },
  { id: 9, word: 'anjuran', synonyms: ['saran', 'usul', 'nasihat'] }, // REVIEWED: Combined & refined. 'anjuran, saran' as word is clunky.
  // { id: 10, word: 'anjuran, usul', synonyms: ['saran'] }, // REVIEWED: Redundant, covered by ID 9
  { id: 11, word: 'angka', synonyms: ['nomor', 'bilangan', 'digit'] }, // REVIEWED: Added digit
  { id: 12, word: 'anggapan', synonyms: ['asumsi', 'dugaan', 'presumsi'] }, // REVIEWED: Added dugaan, presums
  { id: 13, word: 'angkuh', synonyms: ['sombong', 'congkak', 'tinggi hati'] }, // REVIEWED: Added more
  { id: 14, word: 'aneh', synonyms: ['ganjil', 'janggal', 'asing'] }, // REVIEWED: Added ganjil, asing
  { id: 15, word: 'area', synonyms: ['daerah', 'kawasan', 'wilayah', 'zona', 'lingkungan'] }, // REVIEWED: Added lingkungan
  { id: 16, word: 'arti', synonyms: ['makna', 'maksud'] }, // REVIEWED: Added maksud
  { id: 17, word: 'artifisial', synonyms: ['buatan', 'tiruan'] }, // REVIEWED: 'tidak alami' is a description, not a direct synonym
  { id: 18, word: 'artis', synonyms: ['seniman', 'pelaku seni'] }, // REVIEWED: Pelaku seni is more specific
  { id: 19, word: 'artistik', synonyms: ['berseni', 'estetis'] }, // REVIEWED: Added estetis
  { id: 20, word: 'asa', synonyms: ['harapan', 'cita-cita'] }, // REVIEWED: Added cita-cita
  { id: 21, word: 'asli', synonyms: ['orisinil', 'autentik', 'tulén'] }, // REVIEWED: Added autentik, tulen
  { id: 22, word: 'atlet', synonyms: ['olahragawan'] },
  { id: 23, word: 'aviasi', synonyms: ['penerbangan', 'kedirgantaraan'] }, // REVIEWED: Added kedirgantaraan
  { id: 24, word: 'awam', synonyms: ['biasa', 'umum', 'non-ahli'] }, // REVIEWED: Added non-ahli
  { id: 25, word: 'awalnya', synonyms: ['mula-mula', 'semula', 'pada mulanya'] }, // REVIEWED: Broke down the multi-word "word"
  { id: 26, word: 'mula-mula', synonyms: ['awalnya', 'semula', 'pada mulanya'] }, // REVIEWED: New entry
  { id: 27, word: 'waspada', synonyms: ['hati-hati', 'awas', 'siaga'] }, // REVIEWED: Broke down, added siaga
  { id: 28, word: 'bahan', synonyms: ['materi', 'unsur', 'komponen'] }, // REVIEWED: Added
  { id: 29, word: 'bakat', synonyms: ['talenta', 'potensi'] }, // REVIEWED: Added potensi
  { id: 30, word: 'bantuan', synonyms: ['pertolongan', 'sokongan', 'dukungan'] }, // REVIEWED: Added
  { id: 31, word: 'barang', synonyms: ['benda', 'produk', 'komoditas'] }, // REVIEWED: Added
  { id: 32, word: 'bebas', synonyms: ['merdeka', 'lepas', 'leluasa'] }, // REVIEWED: Added
  { id: 33, word: 'benda', synonyms: ['barang', 'objek', 'materi'] }, // REVIEWED: Added
  { id: 34, word: 'beraneka', synonyms: ['beragam', 'berbagai', 'bermacam-macam'] },
  { id: 35, word: 'heterogen', synonyms: ['beraneka ragam', 'majemuk', 'bervariasi'] }, // REVIEWED: 'beraneka, bermacam-macam...' is too long for a "word"
  { id: 36, word: 'berdampak', synonyms: ['berakibat', 'berpengaruh', 'berefek'] }, // REVIEWED: Flipped word/synonym for clarity
  { id: 37, word: 'berhasil', synonyms: ['sukses', 'berjaya'] }, // REVIEWED: Added berjaya
  { id: 38, word: 'berbahagia', synonyms: ['senang', 'gembira', 'suka cita'] },
  { id: 39, word: 'mengobrol', synonyms: ['berbicara', 'berbincang', 'bercakap-cakap', 'berbual'] }, // REVIEWED: Flipped, added berbual
  { id: 40, word: 'bercakap-cakap', synonyms: ['berbicara', 'berbincang', 'mengobrol'] }, // REVIEWED: Made 'bercakap-cakap' the primary
  { id: 41, word: 'berbohong', synonyms: ['berdusta', 'membohongi (transitive)', 'berdalih (to make false excuses)'] },  { id: 42, word: 'berinvestasi', synonyms: ['menanam modal', 'bermodal'] }, // REVIEWED: Added bermodal
  { id: 43, word: 'berkaitan', synonyms: ['berhubungan', 'bersangkutan', 'relevan'] }, // REVIEWED: Added relevan
  { id: 44, word: 'bilang', synonyms: ['berkata', 'mengatakan', 'berucap'] }, // REVIEWED: Flipped
  { id: 45, word: 'berisik', synonyms: ['bising', 'gaduh', 'riuh'] }, // REVIEWED: Added riuh
  { id: 46, word: 'berita', synonyms: ['warta', 'kabar', 'informasi'] }, // REVIEWED: Added
  { id: 47, word: 'bermacam-macam', synonyms: ['berbagai', 'beragam', 'berjenis-jenis'] },
  { id: 48, word: 'bermanfaat', synonyms: ['berguna', 'berfaedah'] }, // REVIEWED: Added berfaedah
  { id: 49, word: 'bermaksud', synonyms: ['berniat', 'bertujuan'] }, // REVIEWED: Added bertujuan
  { id: 50, word: 'berminat', synonyms: ['tertarik', 'antusias'] }, // REVIEWED: Added antusias
  { id: 51, word: 'beruntung', synonyms: ['mujur', ' bernasib baik'] },
  { id: 52, word: 'berusaha', synonyms: ['mencoba', 'berupaya', 'berikhtiar'] }, // REVIEWED: Added
  { id: 53, word: 'keesokan harinya', synonyms: ['besoknya', 'esoknya', 'hari berikutnya'] }, // REVIEWED: Flipped
  { id: 54, word: 'biaya', synonyms: ['dana', 'ongkos', 'tarif'] }, // REVIEWED: Added
  { id: 55, word: 'fauna', synonyms: ['binatang', 'hewan', 'margasatwa'] }, // REVIEWED: Flipped, added
  { id: 56, word: 'boros', synonyms: ['konsumtif', 'royal', 'menghamburkan'] }, // REVIEWED: Added
  { id: 57, word: 'bosan', synonyms: ['jenuh', 'jemu'] }, // REVIEWED: Added jemu
  { id: 58, word: 'untuk', synonyms: ['bagi', 'buat', 'guna', 'demi'] }, // REVIEWED: Flipped, added demi
  { id: 59, word: 'bunga', synonyms: ['kembang', 'puspa'] }, // REVIEWED: Added puspa
  { id: 60, word: 'bunyi', synonyms: ['suara', 'nada'] }, // REVIEWED: Added nada
  { id: 61, word: 'buru-buru', synonyms: ['lekas', 'tergesa-gesa', 'terburu-buru'] },
  { id: 62, word: 'buruk', synonyms: ['jelek', 'tidak baik', 'negatif'] }, // REVIEWED: Added
  { id: 63, word: 'tahap', synonyms: ['cara', 'langkah', 'fase', 'jenjang'] }, // REVIEWED: Flipped, added
  { id: 64, word: 'cedera', synonyms: ['luka', 'cacat'] }, // REVIEWED: terluka is verb form
  { id: 65, word: 'cemas', synonyms: ['khawatir', 'waswas', 'gelisah', 'risau'] }, // REVIEWED: Broke down, added
  { id: 66, word: 'ceria', synonyms: ['gembira', 'riang', 'bahagia'] }, // REVIEWED: Added
  { id: 67, word: 'cermat', synonyms: ['saksama', 'teliti', 'akurat'] },
  { id: 68, word: 'ciri', synonyms: ['karakteristik', 'tanda', 'sifat khas'] }, // REVIEWED: Added
  { id: 69, word: 'cocok', synonyms: ['sesuai', 'pas', 'serasi'] }, // REVIEWED: Added
  { id: 70, word: 'misalnya', synonyms: ['contohnya', 'seperti', 'umpamanya'] }, // REVIEWED: Flipped, added
  { id: 71, word: 'cukup', synonyms: ['memadai', 'lumayan', 'sedang'] }, // REVIEWED: Added
  { id: 72, word: 'gratis', synonyms: ['cuma-cuma', 'bebas biaya'] },
  { id: 73, word: 'dana', synonyms: ['biaya', 'anggaran', 'modal'] }, // REVIEWED: Added
  { id: 74, word: 'dapat', synonyms: ['bisa', 'mampu', 'sanggup'] }, // REVIEWED: Added
  { id: 75, word: 'dasawarsa', synonyms: ['dekade', 'sepuluh tahun'] },
  { id: 76, word: 'kabar burung', synonyms: ['desas-desus', 'isu', 'gosip'] }, // REVIEWED: kabar angin -> gosip
  { id: 77, word: 'deskripsi', synonyms: ['penggambaran', 'uraian', 'lukisan'] }, // REVIEWED: Added
  { id: 78, word: 'dialog', synonyms: ['percakapan', 'diskusi', 'obrolan'] }, // REVIEWED: Added
  { id: 79, word: 'diadakan', synonyms: ['diselenggarakan', 'digelar', 'dilaksanakan'] },
  { id: 80, word: 'dianjurkan', synonyms: ['disarankan', 'direkomendasikan'] },
  // { id: 81, word: 'dianjurkan, dihimbau', synonyms: ['disarankan'] }, // REVIEWED: Redundant
  // { id: 82, word: 'dianjurkan, disarankan', synonyms: ['dihimbau'] }, // REVIEWED: Redundant
  { id: 81, word: 'dihimbau', synonyms: ['disarankan', 'dianjurkan', 'diminta'] }, // REVIEWED: New ID, consolidated
  { id: 83, word: 'diberhentikan', synonyms: ['dipecat', 'diskors', 'dinonaktifkan'] }, // REVIEWED: Added
  { id: 84, word: 'diperolehnya', synonyms: ['didapatnya', 'diraihnya'] },
  { id: 85, word: 'dini', synonyms: ['awal', 'pagi', 'prematur'] }, // REVIEWED: Added
  { id: 86, word: 'dispensasi', synonyms: ['pengecualian', 'kelonggaran', 'izin khusus'] }, // REVIEWED: Added
  { id: 87, word: 'dominasi', synonyms: ['penguasaan', 'hegemoni', 'kontrol'] }, // REVIEWED: Added
  { id: 88, word: 'donasi', synonyms: ['sumbangan', 'bantuan', 'derma'] }, // REVIEWED: Added
  { id: 89, word: 'dorongan', synonyms: ['dukungan', 'motivasi', 'semangat', 'anjuran'] },
  { id: 90, word: 'dosis', synonyms: ['takaran', 'ukuran'] }, // REVIEWED: Added
  { id: 91, word: 'dukungan', synonyms: ['dorongan', 'sokongan', 'bantuan', 'restu'] }, // REVIEWED: Added
  { id: 92, word: 'dusta', synonyms: ['bohong', 'kebohongan'] },
  { id: 93, word: 'edukasi', synonyms: ['pendidikan', 'pengajaran', 'pembelajaran'] }, // REVIEWED: Added
  { id: 94, word: 'ekonomis', synonyms: ['hemat', 'efisien', 'irit'] }, // REVIEWED: Added
  { id: 95, word: 'eksperimen', synonyms: ['percobaan', 'uji coba', 'riset'] }, // REVIEWED: Added
  { id: 96, word: 'ekspansi', synonyms: ['perluasan', 'pengembangan', 'ekstensifikasi'] }, // REVIEWED: Added
  { id: 97, word: 'ekstensi', synonyms: ['perpanjangan', 'perluasan', 'tambahan'] }, // REVIEWED: Added
  { id: 98, word: 'embargo', synonyms: ['larangan', 'boikot', 'sanksi'] }, // REVIEWED: Added
  { id: 99, word: 'embarkasi', synonyms: ['keberangkatan', 'pemberangkatan'] },
  { id: 100, word: 'enggan', synonyms: ['segan', 'malas', 'tidak mau'] }, // REVIEWED: Added
  { id: 101, word: 'estetika', synonyms: ['keindahan', 'seni'] },
  { id: 102, word: 'evakuasi', synonyms: ['pengungsian', 'pemindahan'] }, // REVIEWED: Added
  { id: 103, word: 'evaluasi', synonyms: ['penilaian', 'asesmen', 'tinjauan'] }, // REVIEWED: Added
  { id: 104, word: 'fasilitas pendukung', synonyms: ['fasilitas penunjang', 'sarana pendukung'] }, // REVIEWED: Kept as phrase, added sarana
  { id: 105, word: 'flora', synonyms: ['tanaman', 'tumbuh-tumbuhan', 'vegetasi'] }, // REVIEWED: Added
  { id: 106, word: 'fundamental', synonyms: ['mendasar', 'pokok', 'dasar', 'prinsipil'] }, // REVIEWED: Added
  { id: 107, word: 'fusi', synonyms: ['gabungan', 'peleburan', 'merger'] }, // REVIEWED: Added
  { id: 108, word: 'gagasan', synonyms: ['ide', 'konsep', 'pemikiran'] }, // REVIEWED: Added
  { id: 109, word: 'upah', synonyms: ['gaji', 'pendapatan', 'penghasilan', 'imbalan'] }, // REVIEWED: Flipped
  { id: 110, word: 'pendapatan', synonyms: ['gaji', 'penghasilan', 'pemasukan', 'income'] }, // REVIEWED: Flipped
  { id: 111, word: 'gampang', synonyms: ['mudah', 'ringan', 'sederhana'] }, // REVIEWED: Added
  { id: 112, word: 'karena', synonyms: ['akibat', 'sebab', 'lantaran', 'gara-gara'] }, // REVIEWED: Flipped
  { id: 113, word: 'gembira', synonyms: ['ceria', 'bahagia', 'senang', 'riang'] },
  { id: 114, word: 'generik', synonyms: ['umum', 'biasa', 'standar'] }, // REVIEWED: Added
  { id: 115, word: 'gratis', synonyms: ['cuma-cuma', 'bebas biaya', 'tanpa bayar'] },
  { id: 116, word: 'meninggal', synonyms: ['gugur', 'mati', 'tewas', 'wafat', 'berpulang'] }, // REVIEWED: Flipped, added
  // { id: 117, word: 'guna, buat, bagi', synonyms: ['untuk'] }, // REVIEWED: Covered by ID 58
  { id: 118, word: 'guru', synonyms: ['pengajar', 'pendidik', 'dosen'] }, // REVIEWED: Added
  { id: 119, word: 'selesai', synonyms: ['habis', 'beres', 'tuntas', 'rampung'] }, // REVIEWED: Flipped, added
  { id: 120, word: 'harian', synonyms: ['koran', 'surat kabar', 'setiap hari'] },
  { id: 121, word: 'harmonis', synonyms: ['selaras', 'serasi', 'seimbang', 'rukun'] }, // REVIEWED: Added
  { id: 122, word: 'harapan', synonyms: ['asa', 'keinginan', 'ekspektasi'] }, // REVIEWED: Added
  { id: 123, word: 'harus', synonyms: ['wajib', 'mesti', 'perlu'] }, // REVIEWED: Added
  { id: 124, word: 'hati-hati', synonyms: ['awas', 'waspada', 'cermat', 'teliti'] },
  { id: 125, word: 'hemat', synonyms: ['ekonomis', 'irit', 'cermat'] },
  { id: 126, word: 'heterogen', synonyms: ['beraneka ragam', 'majemuk', 'bervariasi', 'plural'] }, // REVIEWED: Added plural
  { id: 127, word: 'higienis', synonyms: ['bersih', 'sehat', 'steril'] }, // REVIEWED: Added
  { id: 128, word: 'hobi', synonyms: ['kegemaran', 'kesenangan', 'minat'] }, // REVIEWED: Added minat
  { id: 129, word: 'homogen', synonyms: ['sejenis', 'seragam', 'serupa'] }, // REVIEWED: Added
  { id: 130, word: 'ide', synonyms: ['gagasan', 'pemikiran', 'konsep', 'rancangan'] },
  { id: 131, word: 'kejadian', synonyms: ['insiden', 'peristiwa', 'kasus'] }, // REVIEWED: Flipped, added
  { id: 132, word: 'inspeksi', synonyms: ['pemeriksaan', 'peninjauan', 'pengawasan'] }, // REVIEWED: Added
  { id: 133, word: 'instruktur', synonyms: ['pelatih', 'pembimbing', 'pengajar'] },
  { id: 134, word: 'infiltrasi', synonyms: ['penyusupan', 'penetrasi', 'peresapan'] }, // REVIEWED: Added
  { id: 135, word: 'inovasi', synonyms: ['penemuan baru', 'terobosan', 'pembaharuan'] }, // REVIEWED: penemuan -> penemuan baru
  { id: 136, word: 'investigasi', synonyms: ['penyelidikan', 'pemeriksaan', 'pengusutan'] }, // REVIEWED: Added
  { id: 137, word: 'spesial', synonyms: ['khusus', 'istimewa', 'luar biasa'] }, // REVIEWED: Flipped
  { id: 138, word: 'jabatan', synonyms: ['pangkat', 'posisi', 'kedudukan', 'peran'] }, // REVIEWED: Added
  { id: 139, word: 'jenuh', synonyms: ['bosan', 'jemu', 'lelah (mental)'] }, // REVIEWED: Added
  { id: 140, word: 'kalau', synonyms: ['jika', 'apabila', 'seandainya'] }, // REVIEWED: jikalau -> seandainya
  { id: 141, word: 'kabar burung', synonyms: ['desas-desus', 'isu', 'gosip', 'rumor'] }, // REVIEWED: Added rumor
  { id: 142, word: 'kagum', synonyms: ['takjub', 'terpesona', 'heran'] },
  { id: 143, word: 'ketika', synonyms: ['kala', 'semasa', 'sewaktu', 'saat'] }, // REVIEWED: Flipped
  // { id: 144, word: 'kalau', synonyms: ['jika', 'jikalau', 'apabila'] }, // REVIEWED: Duplicate of 140
  { id: 145, word: 'teman', synonyms: ['kawan', 'sahabat', 'rekan', 'sobat'] }, // REVIEWED: Flipped, added
  { id: 146, word: 'menikah', synonyms: ['kawin', 'berumah tangga'] }, // REVIEWED: Flipped
  { id: 147, word: 'kegiatan', synonyms: ['aktivitas', 'pekerjaan', 'acara'] }, // REVIEWED: Added
  { id: 148, word: 'kegunaan', synonyms: ['manfaat', 'faedah', 'fungsi'] }, // REVIEWED: Added
  { id: 149, word: 'keinginan', synonyms: ['kehendak', 'kemauan', 'hasrat', 'cita-cita'] }, // REVIEWED: Broke down & added
  // { id: 150, word: 'kehendak, kemauan', synonyms: ['keinginan'] }, // REVIEWED: Covered by 149
  // { id: 151, word: 'keinginan, kemauan', synonyms: ['kehendak'] }, // REVIEWED: Covered by 149
  { id: 152, word: 'kembang', synonyms: ['bunga', 'puspa'] },  { id: 153, word: 'kegaduhan', synonyms: ['kekacauan', 'keributan', 'kericuhan', 'kerusuhan', 'hiruk-pikuk'] }, // REVIEWED: Flipped, added
  { id: 154, word: 'kekurangan', synonyms: ['kelemahan', 'defisit', 'cacat', 'minus'] }, // REVIEWED: Added
  { id: 155, word: 'keliru', synonyms: ['salah', 'khilaf', 'tidak tepat'] }, // REVIEWED: Added
  { id: 156, word: 'kemakmuran', synonyms: ['kesejahteraan', 'kejayaan', 'kemajuan'] }, // REVIEWED: Added
  // { id: 157, word: 'kemauan, keinginan', synonyms: ['kehendak'] }, // REVIEWED: Covered by 149
  { id: 158, word: 'kendala', synonyms: ['hambatan', 'rintangan', 'halangan', 'masalah'] }, // REVIEWED: Added
  { id: 159, word: 'meskipun', synonyms: ['kendati', 'walaupun', 'biarpun'] }, // REVIEWED: Flipped
  { id: 160, word: 'kengerian', synonyms: ['ketakutan', 'horor', 'kegentaran'] }, // REVIEWED: Added
  { id: 161, word: 'kenaikan', synonyms: ['peningkatan', 'pertambahan', 'lonjakan'] }, // REVIEWED: Added
  { id: 162, word: 'kerap', synonyms: ['sering', 'acap kali', 'rutin'] }, // REVIEWED: acap -> acap kali, added rutin
  { id: 163, word: 'kerja sama', synonyms: ['kolaborasi', 'kooperasi', 'sinergi'] }, // REVIEWED: Added
  { id: 164, word: 'kesenangan', synonyms: ['kebahagiaan', 'kegembiraan', 'kenikmatan', 'hiburan'] }, // REVIEWED: Added
  { id: 165, word: 'konsensus', synonyms: ['kesepakatan', 'pemufakatan', 'persetujuan bulat'] }, // REVIEWED: Flipped
  { id: 166, word: 'persetujuan', synonyms: ['kesepakatan', 'perjanjian', 'izin', 'restu'] }, // REVIEWED: Flipped, added
  { id: 167, word: 'kesejahteraan', synonyms: ['kemakmuran', 'kebahagiaan (sosial)'] },
  { id: 168, word: 'kesimpulan', synonyms: ['konklusi', 'intisari', 'simpulan'] }, // REVIEWED: Added
  { id: 169, word: 'kesuksesan', synonyms: ['keberhasilan', 'kejayaan', 'prestasi'] }, // REVIEWED: Added
  { id: 170, word: 'saat', synonyms: ['ketika', 'sewaktu', 'waktu', 'momen'] }, // REVIEWED: Flipped, added
  { id: 171, word: 'khawatir', synonyms: ['cemas', 'waswas', 'gelisah', 'kuatir'] }, // REVIEWED: Added kuatir (common variant)
  { id: 172, word: 'kian', synonyms: ['semakin', 'makin'] },
  { id: 173, word: 'kira-kira', synonyms: ['sekitar', 'kurang lebih', 'perkiraan'] },
  { id: 174, word: 'klarifikasi', synonyms: ['penjelasan', 'penjernihan', 'konfirmasi'] }, // REVIEWED: Added
  { id: 175, word: 'kolega', synonyms: ['rekan', 'teman sejawat', 'mitra kerja'] }, // REVIEWED: Added
  { id: 176, word: 'kolaborasi', synonyms: ['kerja sama', 'kooperasi'] },
  { id: 177, word: 'kompetisi', synonyms: ['persaingan', 'perlombaan', 'pertandingan'] }, // REVIEWED: Added perlombaan
  { id: 178, word: 'keadaan', synonyms: ['kondisi', 'situasi', 'hal'] }, // REVIEWED: Flipped, added
  { id: 179, word: 'kondusif', synonyms: ['mendukung', 'aman', 'nyaman', 'produktif'] }, // REVIEWED: Added
  { id: 180, word: 'konfrontasi', synonyms: ['pertentangan', 'perselisihan', 'adu muka'] }, // REVIEWED: Added
  { id: 181, word: 'konklusi', synonyms: ['kesimpulan', 'simpulan'] },
  { id: 182, word: 'konkret', synonyms: ['nyata', 'jelas', 'berwujud', 'pasti'] }, // REVIEWED: Added
  { id: 183, word: 'konsensus', synonyms: ['kesepakatan', 'mufakat', 'persetujuan bersama'] }, // REVIEWED: pemufakatan -> mufakat
  { id: 184, word: 'konservasi', synonyms: ['pemeliharaan', 'perlindungan', 'pelestarian'] }, // REVIEWED: Added pelestarian
  { id: 185, word: 'konsumtif', synonyms: ['boros', 'berlebihan (konsumsi)'] },
  { id: 186, word: 'harian', synonyms: ['koran', 'surat kabar', 'rutin'] }, // REVIEWED: Added rutin to capture a different sense
  { id: 187, word: 'kuat', synonyms: ['tangguh', 'kokoh', 'perkasa', 'teguh'] }, // REVIEWED: Added
  { id: 188, word: 'laba', synonyms: ['keuntungan', 'profit', 'untung'] }, // REVIEWED: Added profit
  { id: 189, word: 'lalai', synonyms: ['lengah', 'abai', 'teledor', 'alpa'] }, // REVIEWED: Added
  { id: 190, word: 'biasanya', synonyms: ['lazimnya', 'umumnya', 'kebanyakan'] }, // REVIEWED: Flipped
  { id: 191, word: 'buru-buru', synonyms: ['lekas', 'tergesa-gesa', 'cepat-cepat', 'terburu-buru'] }, // REVIEWED: Added
  { id: 192, word: 'lompat', synonyms: ['loncat', 'meloncat'] },
  { id: 193, word: 'bencana', synonyms: ['malapetaka', 'musibah', 'bala'] }, // REVIEWED: Flipped, added
  { id: 194, word: 'malu', synonyms: ['tersipu', 'segan', 'canggung'] }, // REVIEWED: Added
  { id: 195, word: 'mampir', synonyms: ['singgah', 'berkunjung sebentar'] },
  { id: 196, word: 'mampu', synonyms: ['sanggup', 'bisa', 'cakap'] }, // REVIEWED: Added
  { id: 197, word: 'marah', synonyms: ['murka', 'gusar', 'geram', 'berang'] }, // REVIEWED: Added
  { id: 198, word: 'makna', synonyms: ['arti', 'maksud', 'pengertian'] }, // REVIEWED: Added
  { id: 199, word: 'materi', synonyms: ['bahan', 'substansi', 'isi'] }, // REVIEWED: Added
  { id: 200, word: 'memadai', synonyms: ['cukup', 'layak', 'mencukupi'] }, // REVIEWED: Added
  { id: 201, word: 'memahami', synonyms: ['mengerti', 'mengetahui', 'menghayati'] }, // REVIEWED: Added
  { id: 202, word: 'memangkas', synonyms: ['memotong', 'mengurangi', 'merampingkan'] }, // REVIEWED: Added
  { id: 203, word: 'mematuhi', synonyms: ['menaati', 'mengikuti', 'menurut'] }, // REVIEWED: Added
  { id: 204, word: 'memakai', synonyms: ['mengenakan', 'menggunakan', 'memanfaatkan'] },
  { id: 205, word: 'mendiskusikan', synonyms: ['membahas', 'membicarakan', 'merundingkan'] }, // REVIEWED: Flipped, added
  { id: 206, word: 'mengasuh', synonyms: ['membesarkan', 'merawat', 'mendidik'] }, // REVIEWED: Flipped, added
  { id: 207, word: 'membiayai', synonyms: ['menghidupi', 'mendanai', 'menanggung'] }, // REVIEWED: Added
  { id: 208, word: 'berbohong', synonyms: ['berdusta', 'tidak jujur'] }, // 'tidak jujur' (not honest) is a good general one.  { id: 209, word: 'membutuhkan', synonyms: ['memerlukan', 'menghendaki'] },
  { id: 210, word: 'menyelesaikan', synonyms: ['memecahkan (masalah)', 'menuntaskan', 'merampungkan'] }, // REVIEWED: Clarified '(masalah)'
  { id: 211, word: 'memperbolehkan', synonyms: ['mengizinkan', 'menyetujui'] },
  { id: 212, word: 'memperoleh', synonyms: ['mendapat(kan)', 'meraih', 'mendulang'] }, // REVIEWED: Added mendulang
  { id: 213, word: 'memerlukan', synonyms: ['membutuhkan', 'perlu akan'] },
  { id: 214, word: 'menaati', synonyms: ['mematuhi', 'tunduk pada'] },
  { id: 215, word: 'menafsirkan', synonyms: ['mengartikan', 'menerjemahkan', 'menginterpretasikan'] }, // REVIEWED: Added menginterpretasikan
  { id: 216, word: 'menanam modal', synonyms: ['berinvestasi', 'memodali'] },
  { id: 217, word: 'menangani', synonyms: ['mengatasi', 'mengurus', 'menanggulangi'] }, // REVIEWED: Added
  { id: 218, word: 'mencapai', synonyms: ['mendapatkan', 'memperoleh', 'meraih', 'menggapai'] }, // REVIEWED: Added
  { id: 219, word: 'menerima', synonyms: ['mendapat(kan)', 'memperoleh', 'menyambut'] }, // REVIEWED: Added
  { id: 220, word: 'mendadak', synonyms: ['tiba-tiba', 'sekonyong-konyong', 'spontan'] }, // REVIEWED: Added
  { id: 221, word: 'mendiskusikan', synonyms: ['membahas', 'membicarakan', 'memperbincangkan'] },
  { id: 222, word: 'mendukung', synonyms: ['menyokong', 'membantu', 'mendorong'] }, // REVIEWED: 'kondusif' is more about environment
  { id: 223, word: 'menebak', synonyms: ['menduga', 'menerka', 'mengira-ngira', 'memprediksi'] }, // REVIEWED: Added
  { id: 224, word: 'menderita', synonyms: ['sengsara', 'merasakan (sakit)', 'mengalami (kesulitan)'] },
  { id: 225, word: 'menegaskan', synonyms: ['memastikan', 'mengkonfirmasi', 'meyakinkan'] },
  { id: 226, word: 'menerangkan', synonyms: ['menjelaskan', 'menguraikan', 'memaparkan'] }, // REVIEWED: Added
  { id: 227, word: 'menerbitkan', synonyms: ['mengeluarkan', 'mempublikasikan', 'merilis'] }, // REVIEWED: Added
  { id: 228, word: 'mengenai', synonyms: ['tentang', 'perihal', 'berkenaan dengan'] },
  { id: 229, word: 'mengenakan', synonyms: ['memakai', 'memasang'] },
  { id: 230, word: 'mengerti', synonyms: ['memahami', 'paham', 'menangkap (maksud)'] },
  { id: 231, word: 'menggelar', synonyms: ['mengadakan', 'menyelenggarakan', 'melaksanakan'] },
  { id: 232, word: 'menghancurkan', synonyms: ['merusak', 'membinasakan', 'meluluhlantakkan'] }, // REVIEWED: Added
  { id: 233, word: 'mengharuskan', synonyms: ['mewajibkan', 'menuntut'] },
  { id: 234, word: 'menghidupi', synonyms: ['membiayai', 'menafkahi', 'memelihara'] }, // REVIEWED: Added
  { id: 235, word: 'mengira-ngira', synonyms: ['menduga', 'menerka', 'menebak', 'memperkirakan'] },
  { id: 236, word: 'mengizinkan', synonyms: ['memperbolehkan', 'merestui', 'memberi izin'] },
  { id: 237, word: 'mengkhawatirkan', synonyms: ['mencemaskan', 'merisaukan', 'menggelisahkan'] },
  { id: 238, word: 'mengobrol', synonyms: ['berbicara', 'berbincang', 'bercakap-cakap', 'ngobrol'] },
  { id: 239, word: 'mengontrol', synonyms: ['mengendalikan', 'mengawasi', 'memantau'] }, // REVIEWED: Added
  { id: 240, word: 'mengurangi', synonyms: ['menurunkan', 'memotong', 'memangkas', 'mengikis'] }, // REVIEWED: Added
  { id: 241, word: 'mengurus', synonyms: ['merawat', 'mengelola', 'menangani'] },
  { id: 242, word: 'menikah', synonyms: ['kawin', 'berumah tangga', 'bersuami/beristri'] },
  { id: 243, word: 'meningkat', synonyms: ['bertambah', 'naik', 'membesar', 'menanjak'] }, // REVIEWED: Added
  { id: 244, word: 'menjelaskan', synonyms: ['menerangkan', 'menguraikan', 'memaparkan'] },
  { id: 245, word: 'mendalami', synonyms: ['menyelami', 'mengkaji', 'menghayati'] }, // 'mengkaji' (to study in depth)  { id: 246, word: 'menyelesaikan', synonyms: ['menuntaskan', 'merampungkan', 'memecahkan (masalah)'] }, // REVIEWED: Added, clarified
  { id: 247, word: 'menyelenggarakan', synonyms: ['mengadakan', 'menggelar', 'melaksanakan'] }, // REVIEWED: Flipped
  { id: 248, word: 'menyerah', synonyms: ['putus asa', 'kalah', 'takluk'] }, // REVIEWED: Added
  { id: 249, word: 'menyaksikan', synonyms: ['melihat', 'menonton', 'mengamati'] }, // REVIEWED: Added
  { id: 250, word: 'merawat', synonyms: ['mengurus', 'memelihara', 'menjaga'] },
  { id: 251, word: 'meresmikan', synonyms: ['mengesahkan', 'melantik', 'mengukuhkan'] }, // REVIEWED: Added
  { id: 252, word: 'meskipun', synonyms: ['walaupun', 'kendati', 'biarpun', 'sungguhpun'] }, // REVIEWED: Flipped, added
  { id: 253, word: 'trendi', synonyms: ['modern', 'mutakhir', 'terbaru', 'terkini', 'populer'] }, // REVIEWED: Flipped, added
  { id: 254, word: 'motivasi', synonyms: ['dorongan', 'semangat', 'inspirasi', 'stimulus'] }, // REVIEWED: Added
  { id: 255, word: 'mudah', synonyms: ['gampang', 'enteng', 'sederhana'] },
  { id: 256, word: 'rentan', synonyms: ['rawan', 'peka', 'sensitif', 'rapuh (fragile)'] },  { id: 257, word: 'mudah-mudahan', synonyms: ['semoga', 'moga-moga'] },
  { id: 258, word: 'mujur', synonyms: ['beruntung', 'bernasib baik'] },
  { id: 259, word: 'mula-mula', synonyms: ['awalnya', 'semula', 'pertama-tama'] },
  { id: 260, word: 'awalnya', synonyms: ['mula-mula', 'semula', 'pada permulaan'] }, // REVIEWED: Flipped from mulanya
  { id: 261, word: 'murid', synonyms: ['pelajar', 'siswa', 'anak didik'] },
  { id: 262, word: 'bencana', synonyms: ['musibah', 'malapetaka', 'petaka'] }, // REVIEWED: Flipped
  { id: 263, word: 'musuh', synonyms: ['lawan', 'seteru', 'oposisi'] }, // REVIEWED: Added
  { id: 264, word: 'mutlak', synonyms: ['absolut', 'penuh', 'total'] }, // REVIEWED: Added
  { id: 265, word: 'mutakhir', synonyms: ['terbaru', 'modern', 'terkini', 'kontemporer'] }, // REVIEWED: Flipped, added
  { id: 266, word: 'naik', synonyms: ['meningkat', 'bertambah', 'menanjak'] }, // REVIEWED: Flipped 'meningkat' to be a synonym
  { id: 267, word: 'niscaya', synonyms: ['pasti', 'tentu', 'sudah barang tentu'] },
  { id: 268, word: 'angka', synonyms: ['nomor', 'bilangan', 'digit', 'nilai'] }, // REVIEWED: Flipped, added
  { id: 269, word: 'tradisi', synonyms: ['adat', 'budaya', 'norma', 'kebiasaan'] }, // REVIEWED: Flipped
  { id: 270, word: 'nyaris', synonyms: ['hampir', 'mendekati'] },
  { id: 271, word: 'nyata', synonyms: ['konkret', 'jelas', 'riil', 'faktual'] }, // REVIEWED: Added
  { id: 272, word: 'olahragawan', synonyms: ['atlet', 'atlit (common variant)'] },  { id: 273, word: 'opini', synonyms: ['pendapat', 'pandangan', 'gagasan'] },
  { id: 274, word: 'orisinil', synonyms: ['asli', 'autentik', 'murni'] },
  { id: 275, word: 'otomatis', synonyms: ['spontan', 'dengan sendirinya', 'langsung'] },
  { id: 276, word: 'pakar', synonyms: ['ahli', 'spesialis', 'ekspert'] },
  { id: 277, word: 'pandemi', synonyms: ['wabah', 'epidemi (luas)'] },
  { id: 278, word: 'paham', synonyms: ['mengerti', 'memahami', 'sadar'] },
  { id: 279, word: 'jabatan', synonyms: ['pangkat', 'posisi', 'kedudukan'] }, // REVIEWED: Flipped
  { id: 280, word: 'patuh', synonyms: ['taat', 'menurut', 'disiplin'] }, // REVIEWED: Added
  { id: 281, word: 'pelajar', synonyms: ['murid', 'siswa', 'mahasiswa (umum)'] }, // REVIEWED: Added
  { id: 282, word: 'pemasukan', synonyms: ['pendapatan', 'penghasilan', 'income'] }, // REVIEWED: Removed perolehan as it's broader
  { id: 283, word: 'gaji', synonyms: ['upah', 'pendapatan (dari kerja)', 'honorarium'] }, // REVIEWED: Flipped
  { id: 284, word: 'konservasi', synonyms: ['pemeliharaan', 'perlindungan', 'pelestarian'] }, // REVIEWED: Flipped
  { id: 285, word: 'penemuan', synonyms: ['inovasi', 'temuan', 'discovery'] }, // REVIEWED: Flipped
  { id: 286, word: 'penerbangan', synonyms: ['aviasi', 'penerjunan (udara)'] },
  { id: 287, word: 'penelitian', synonyms: ['riset', 'studi', 'kajian'] }, // REVIEWED: Added
  { id: 288, word: 'penyelenggaraan', synonyms: ['pengadaan', 'pelaksanaan', 'organisasi'] }, // REVIEWED: Flipped
  { id: 289, word: 'pengajar', synonyms: ['guru', 'dosen', 'pendidik', 'instruktur'] },
  { id: 290, word: 'pengalaman', synonyms: ['eksperiens', 'pengetahuan (praktis)'] },
  { id: 291, word: 'penghasilan', synonyms: ['pendapatan', 'pemasukan', 'gaji', 'income'] }, // REVIEWED: Flipped
  { id: 292, word: 'peningkatan', synonyms: ['kenaikan', 'pertambahan', 'eskalasi'] }, // REVIEWED: Added
  { id: 293, word: 'penting', synonyms: ['vital', 'krusial', 'esensial', 'signifikan'] }, // REVIEWED: Added
  { id: 294, word: 'penjelasan', synonyms: ['klarifikasi', 'uraian', 'keterangan'] },
  { id: 295, word: 'perayaan', synonyms: ['festival', 'pesta', 'peringatan'] },
  { id: 296, word: 'peraturan', synonyms: ['tata tertib', 'ketentuan', 'undang-undang (umum)'] },
  { id: 297, word: 'percobaan', synonyms: ['eksperimen', 'uji coba', 'tes'] },
  { id: 298, word: 'pertemuan', synonyms: ['perjumpaan', 'rapat', 'sidang'] }, // REVIEWED: Flipped
  { id: 299, word: 'pernikahan', synonyms: ['perkawinan', 'akad nikah'] },
  { id: 300, word: 'perluasan', synonyms: ['ekspansi', 'pengembangan', 'pelebaran'] }, // REVIEWED: Added
  // { id: 301, word: 'pertemuan', synonyms: ['rapat'] }, // REVIEWED: Duplicate of 298
  { id: 302, word: 'utama', synonyms: ['primer', 'pokok', 'penting', 'kunci'] }, // REVIEWED: Flipped
  { id: 303, word: 'pustaka', synonyms: ['buku', 'literatur', 'referensi'] }, // REVIEWED: Added
  { id: 304, word: 'putus asa', synonyms: ['menyerah', 'patah semangat', 'frustrasi'] }, // REVIEWED: Added
  { id: 305, word: 'rapat', synonyms: ['pertemuan', 'musyawarah', 'sidang', 'konferensi'] },
  { id: 306, word: 'referensi', synonyms: ['acuan', 'rujukan', 'sumber'] }, // REVIEWED: Added
  { id: 307, word: 'rekan', synonyms: ['kolega', 'teman kerja', 'mitra'] },
  { id: 308, word: 'rentan', synonyms: ['rawan', 'peka', 'mudah (sakit/terpengaruh)'] }, // REVIEWED: Flipped, clarified
  { id: 309, word: 'riset', synonyms: ['penelitian', 'studi', 'kajian'] },
  { id: 310, word: 'rintangan', synonyms: ['halangan', 'hambatan', 'kendala', 'aral'] }, // REVIEWED: Added
  { id: 311, word: 'rujukan', synonyms: ['acuan', 'referensi', 'sumber'] },
  { id: 312, word: 'saat', synonyms: ['ketika', 'sewaktu', 'waktu', 'momen', 'kala'] }, // REVIEWED: Added kala
  { id: 313, word: 'sahabat', synonyms: ['teman', 'kawan', 'sobat karib'] }, // REVIEWED: Flipped
  { id: 314, word: 'absah', synonyms: ['sah', 'resmi', 'valid', 'legal'] }, // REVIEWED: Flipped
  { id: 315, word: 'sakit', synonyms: ['nyeri', 'pedih', 'tidak sehat'] },
  { id: 316, word: 'sama', synonyms: ['serupa', 'identik', 'setara'] },
  { id: 317, word: 'tiba', synonyms: ['sampai', 'datang', 'mencapai'] }, // REVIEWED: Flipped
  { id: 318, word: 'samping', synonyms: ['sebelah', 'sisi'] },
  { id: 319, word: 'sanggup', synonyms: ['mampu', 'bisa', 'berdaya'] },
  { id: 320, word: 'santun', synonyms: ['sopan', 'beradab', 'halus (budi)'] },
  { id: 321, word: 'saran', synonyms: ['anjuran', 'usul', 'nasihat', 'rekomendasi'] },
  { id: 322, word: 'seleksi', synonyms: ['saringan', 'pemilihan', 'penyaringan'] }, // REVIEWED: Flipped
  { id: 323, word: 'sasaran', synonyms: ['target', 'tujuan', 'objek'] },
  { id: 324, word: 'seakan-akan', synonyms: ['seolah-olah', 'seperti', 'bagai'] },
  { id: 325, word: 'sebaya', synonyms: ['seumur', 'seusia', 'sepantaran'] },
  { id: 326, word: 'sebelah', synonyms: ['samping', 'sisi'] },
  { id: 327, word: 'sebenarnya', synonyms: ['sebetulnya', 'sesungguhnya', 'hakikatnya'] },
  { id: 328, word: 'sebentar', synonyms: ['sejenak', 'sesaat', 'singkat'] },
  { id: 329, word: 'sebetulnya', synonyms: ['sebenarnya', 'sesungguhnya'] },
  { id: 330, word: 'setidaknya', synonyms: ['sedikitnya', 'paling tidak', 'minimal'] },
  { id: 331, word: 'segan', synonyms: ['enggan', 'malu', 'ragu-ragu'] },
  { id: 332, word: 'sesudah', synonyms: ['sehabis', 'setelah', 'usai'] }, // REVIEWED: Flipped
  { id: 333, word: 'sejalan', synonyms: ['seiring', 'selaras', 'sesuai'] }, // REVIEWED: Flipped
  { id: 334, word: 'sejenis', synonyms: ['homogen', 'serupa', 'sama macam'] },
  { id: 335, word: 'sejenak', synonyms: ['sebentar', 'sesaat'] },
  { id: 336, word: 'sekitar', synonyms: ['kira-kira', 'kurang lebih', 'lingkungan'] },
  { id: 337, word: 'saksama', synonyms: ['teliti', 'cermat', 'akurat'] }, // REVIEWED: Flipped
  { id: 338, word: 'selaras', synonyms: ['harmonis', 'serasi', 'seimbang'] }, // REVIEWED: Flipped
  { id: 339, word: 'selesai', synonyms: ['habis', 'beres', 'tuntas', 'usai', 'rampung'] },
  { id: 340, word: 'sepenuhnya', synonyms: ['seluruhnya', 'seutuhnya', 'total'] },
  { id: 341, word: 'semakin', synonyms: ['kian', 'makin', 'bertambah'] },
  { id: 342, word: 'semasa', synonyms: ['ketika', 'kala', 'sewaktu', 'pada masa'] },
  { id: 343, word: 'semestinya', synonyms: ['seharusnya', 'seyogianya', 'sepantasnya'] },
  { id: 344, word: 'semoga', synonyms: ['mudah-mudahan', 'moga-moga', 'diharapkan'] },
  { id: 345, word: 'semula', synonyms: ['awalnya', 'mula-mula', 'dahulu'] },
  { id: 346, word: 'senantiasa', synonyms: ['selalu', 'terus-menerus', 'setiap saat'] },
  { id: 347, word: 'sengsara', synonyms: ['menderita', 'merana', 'nelangsa'] },
  { id: 348, word: 'seniman', synonyms: ['artis', 'pelaku seni', 'pekerja seni'] },  { id: 349, word: 'seolah-olah', synonyms: ['seakan-akan', 'seperti', 'seumpama'] },
  { id: 350, word: 'sependapat', synonyms: ['setuju', 'sepaham', 'sejalan'] },
  { id: 351, word: 'sepenuhnya', synonyms: ['seluruhnya', 'seutuhnya', 'total', 'komplet'] },  { id: 352, word: 'serasi', synonyms: ['harmonis', 'selaras', 'cocok', 'padan'] }, // REVIEWED: Added
  { id: 353, word: 'sering', synonyms: ['kerap', 'acap kali', 'selalu (implies high frequency)'] },  { id: 354, word: 'serta', synonyms: ['dan', 'juga', 'beserta', 'turut'] },
  { id: 355, word: 'serupa', synonyms: ['mirip', 'sama', 'seiras', 'identik'] },
  { id: 356, word: 'sesuai', synonyms: ['cocok', 'pas', 'selaras', 'serasi'] },
  { id: 357, word: 'sesudah', synonyms: ['setelah', 'sehabis', 'selepas', 'usai'] },
  { id: 358, word: 'setelah', synonyms: ['sesudah', 'sehabis', 'pasca'] },
  { id: 359, word: 'setidaknya', synonyms: ['sekurang-kurangnya', 'paling tidak', 'minimal'] },
  { id: 360, word: 'setuju', synonyms: ['sependapat', 'sepakat', 'akur'] },
  { id: 361, word: 'seumur', synonyms: ['sebaya', 'seusia', 'sepantaran'] }, // REVIEWED: Flipped
  { id: 362, word: 'sewaktu', synonyms: ['ketika', 'saat', 'kala', 'tatkala'] },
  { id: 363, word: 'singgah', synonyms: ['mampir', 'berhenti sebentar'] },
  { id: 364, word: 'situasi', synonyms: ['keadaan', 'kondisi', 'posisi'] }, // REVIEWED: Added
  { id: 365, word: 'siswa', synonyms: ['murid', 'pelajar', 'anak didik'] }, // REVIEWED: Flipped
  { id: 366, word: 'sombong', synonyms: ['angkuh', 'congkak', 'takabur', 'tinggi hati'] },
  { id: 367, word: 'sopan', synonyms: ['santun', 'beradab', 'tata krama'] },
  { id: 368, word: 'spesial', synonyms: ['khusus', 'istimewa', 'luar biasa', 'eksklusif'] },
  { id: 369, word: 'sukses', synonyms: ['berhasil', 'berjaya', 'sukses besar'] },
  { id: 370, word: 'sulit', synonyms: ['sukar', 'susah', 'rumit', 'pelik'] }, // REVIEWED: Added
  { id: 371, word: 'sumbangan', synonyms: ['donasi', 'bantuan', 'kontribusi', 'derma'] },
  { id: 372, word: 'supaya', synonyms: ['agar', 'agar supaya', 'untuk'] },
  { id: 373, word: 'surat kabar', synonyms: ['koran', 'harian', 'media cetak'] }, // REVIEWED: Flipped
  { id: 374, word: 'susah', synonyms: ['sulit', 'sukar', 'payah'] },
  { id: 375, word: 'taat', synonyms: ['patuh', 'setia', 'disiplin'] },
  { id: 376, word: 'takaran', synonyms: ['dosis', 'ukuran', 'sukatan'] },
  { id: 377, word: 'talenta', synonyms: ['bakat', 'kemampuan alami', 'potensi'] },
  { id: 378, word: 'tamu', synonyms: ['pengunjung', 'undangan'] },
  { id: 379, word: 'kelihatan', synonyms: ['tampak', 'terlihat', 'nampak'] }, // REVIEWED: Flipped
  { id: 380, word: 'tangguh', synonyms: ['kuat', 'kokoh', 'ulet', 'tahan banting'] },
  { id: 381, word: 'target', synonyms: ['sasaran', 'tujuan', 'objektif'] },
  { id: 382, word: 'tata tertib', synonyms: ['peraturan', 'disiplin', 'aturan main'] },
  { id: 383, word: 'teliti', synonyms: ['cermat', 'saksama', 'akurat', 'detail'] }, // REVIEWED: Flipped
  { id: 384, word: 'teman', synonyms: ['kawan', 'sahabat', 'rekan', 'handai tolan'] },
  { id: 385, word: 'tentang', synonyms: ['mengenai', 'perihal', 'soal'] },
  { id: 386, word: 'tepat', synonyms: ['akurat', 'pas', 'benar', 'sesuai'] },
  { id: 387, word: 'tergesa-gesa', synonyms: ['buru-buru', 'lekas', 'cepat-cepat'] }, // REVIEWED: Flipped
  { id: 388, word: 'utama', synonyms: ['primer', 'pokok', 'terpenting', 'esensial'] }, // REVIEWED: Flipped
  { id: 389, word: 'andal', synonyms: ['terpercaya', 'dapat diandalkan', 'reliabel'] }, // REVIEWED: Flipped
  { id: 390, word: 'terluka', synonyms: ['cedera', 'luka', 'sakit'] },
  { id: 391, word: 'tes', synonyms: ['uji', 'ujian', 'percobaan', 'evaluasi'] },
  { id: 392, word: 'meninggal', synonyms: ['tewas', 'gugur', 'mati', 'wafat', 'mangkat'] }, // REVIEWED: Flipped
  { id: 393, word: 'tiba', synonyms: ['sampai', 'datang', 'hadir'] },
  { id: 394, word: 'tiba-tiba', synonyms: ['mendadak', 'sekonyong-konyong', 'langsung'] },
  { id: 395, word: 'tindakan', synonyms: ['aksi', 'perbuatan', 'langkah'] },
  { id: 396, word: 'tradisi', synonyms: ['adat', 'budaya', 'norma', 'kebiasaan turun-temurun'] },
  { id: 397, word: 'transportasi', synonyms: ['angkutan', 'perhubungan', 'alat angkut'] },
  { id: 398, word: 'trendi', synonyms: ['modern', 'mutakhir', 'terbaru', 'terkini', 'populer', 'modis'] },
  { id: 399, word: 'ujian', synonyms: ['tes', 'uji', 'evaluasi', 'cobaan'] }, // REVIEWED: Flipped
  { id: 400, word: 'umum', synonyms: ['generik', 'lazim', 'publik', 'awam'] },
  { id: 401, word: 'biasanya', synonyms: ['umumnya', 'lazimnya', 'pada umumnya', 'kebanyakan'] }, // REVIEWED: Flipped
  { id: 402, word: 'umur', synonyms: ['usia', 'masa hidup'] },
  { id: 403, word: 'unik', synonyms: ['khas', 'istimewa', 'langka', 'lain dari yang lain'] },  { id: 404, word: 'untuk', synonyms: ['bagi', 'buat', 'guna', 'demi', 'kepada'] },
  { id: 405, word: 'upah', synonyms: ['gaji', 'pendapatan', 'honorarium', 'imbalan'] },
  { id: 406, word: 'usia', synonyms: ['umur', 'masa hidup', 'zaman'] },
  { id: 407, word: 'usul', synonyms: ['anjuran', 'saran', 'proposal', 'rekomendasi'] },
  { id: 408, word: 'utama', synonyms: ['primer', 'pokok', 'terpenting', 'esensial', 'fundamental'] },
  { id: 409, word: 'wabah', synonyms: ['pandemi', 'epidemi', 'penyakit menular'] },
  { id: 410, word: 'wajib', synonyms: ['harus', 'mesti', 'keharusan'] },
  { id: 411, word: 'wafat', synonyms: ['meninggal', 'tewas', 'gugur', 'mati', 'berpulang'] }, // REVIEWED: Flipped
  { id: 412, word: 'meskipun', synonyms: ['walaupun', 'kendati', 'biarpun', 'sekalipun'] }, // REVIEWED: Flipped
  { id: 413, word: 'warta', synonyms: ['berita', 'kabar', 'informasi'] },
  { id: 414, word: 'waspada', synonyms: ['hati-hati', 'awas', 'siaga', 'berjaga-jaga'] }, // REVIEWED: Flipped
  { id: 415, word: 'waswas', synonyms: ['cemas', 'khawatir', 'gelisah', 'ragu'] }
];
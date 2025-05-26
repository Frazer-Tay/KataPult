// src/data/suratResmiContent.js

export const suratResmiGuide = {
  mainTitle: "Panduan Lengkap Menulis Surat Resmi Bahasa Indonesia (Kontekstual Singapura)",
  introduction: "Surat resmi dalam Bahasa Indonesia memiliki struktur dan gaya bahasa yang baku. Memahaminya akan sangat membantu dalam ujian. Berikut adalah panduan lengkap:",
  
  tableOfContents: [
    { id: "struktur-penting", title: "I. Struktur dan Format Penting" },
    { id: "kerangka-induk", title: 'II. "Kerangka Induk" Surat Resmi (Format Mudah Diproses)' },
    { id: "bank-frasa", title: "III. Bank Frasa (Diurutkan berdasarkan Kegunaan Umum)" },
    { id: "mengubah-poin", title: "IV. Mengubah Poin Menjadi Paragraf" },
    { id: "contoh-surat-dengan-prompt", title: "V. Contoh Surat Kontekstual dengan Skenario Ujian" },
    { id: "meretas-ujian", title: 'VI. "Meretas" Ujian – Strategi Utama' },
    { id: "tip-tambahan", title: "VII. Tip Tambahan dan Adaptasi Ujian" },
    { id: "peribahasa", title: "VIII. Penggunaan Peribahasa yang Sesuai" },
  ],

  sections: [
    // SECTION I (Remains as is)
    {
      id: "struktur-penting",
      title: "I. Struktur dan Format Penting (Wajib Ada!)",
      elements: [
        { type: "paragraph", content: "Komponen-komponen ini harus ada dalam surat resmi Anda. Kehilangan salah satunya bisa mengurangi nilai." },
        
        { type: "subheading", level: 3, content: "Tempat dan Tanggal Surat (Place and Date of Writing):" },
        { type: "example", content: "Contoh (Example): Singapura, 28 Oktober 2024" },
        { type: "paragraph", content: "Penempatan (Placement): Kiri atas (Top left) atau kanan atas (top right). Konsisten. (Be consistent)." },

        { type: "subheading", level: 3, content: "Perihal (Subject):" },
        { type: "example", content: "Contoh (Example): Perihal: Permohonan Penggunaan Aula Sekolah untuk Kegiatan Ekstrakurikuler" },
        { type: "paragraph", content: "Format: Perihal: [Pokok Utama Surat Anda] (Subject: [Your Main Letter Topic])" },
        { type: "paragraph", content: "Harus singkat dan jelas. (Must be concise and clear)." },

        { type: "subheading", level: 3, content: "Alamat Tujuan (Recipient's Address):" },
        { type: "paragraph", content: "Format Umum (General Format):" },
        { type: "preformatted", content: `Kepada Yth.\nBapak/Ibu [Jabatan Penerima, e.g., Manajer Dewan Kota, Kepala Sekolah]\n[Nama Institusi/Organisasi, e.g., Dewan Kota Nee Soon, SMA Raffles]\n[Alamat Jalan Institusi]\n[Singapura Kode Pos]` },
        { type: "paragraph", content: "Yth. adalah singkatan dari Yang terhormat (The Honorable)." },
        { type: "paragraph", content: "Jika tidak tahu nama spesifik: Bapak/Ibu Pimpinan [Nama Organisasi] (Mr/Ms Head of [Organization Name])." },
        { type: "paragraph", content: "Untuk konteks Singapura, contoh penerima:" },
        {
          type: "list",
          items: [
            "Manajer Dewan Kota (Town Council Manager)",
            "Kepala Sekolah (School Principal)",
            "Manajer Pusat Komunitas (Community Club Manager)",
            "Direktur Badan Pemerintah (Director of a Government Agency, e.g., Badan Lingkungan Hidup Nasional (NEA), Otoritas Transportasi Darat (LTA))."
          ]
        },

        { type: "subheading", level: 3, content: "Salam Pembuka (Opening Salutation):" },
        { type: "example", content: "Contoh (Example): Dengan hormat," },
        { type: "paragraph", content: "Selalu gunakan ini, diikuti koma. (Always use this, followed by a comma)." },
        
        { type: "subheading", level: 3, content: "Isi Surat (Body of the Letter):" },
        { type: "paragraph", content: "Terdiri dari beberapa paragraf: Pembuka, Isi Utama (Masalah/Usulan), Penutup." },
        { type: "important", content: "PENTING: Tulis dalam bentuk paragraf yang mengalir, BUKAN poin-poin bernomor atau bertanda (IMPORTANT: Write in flowing paragraphs, NOT numbered or bulleted points)." },

        { type: "subheading", level: 3, content: "Salam Penutup (Closing Salutation):" },
        { type: "example", content: "Contoh (Example): Hormat saya," },
        { type: "paragraph", content: "Jika menulis atas nama kelompok: Hormat kami, (Our respects/Yours faithfully,)" },
        { type: "paragraph", content: "Selalu diikuti koma. (Always followed by a comma)." },

        { type: "subheading", level: 3, content: "Nama Jelas Pengirim (Sender's Full Name):" },
        { type: "paragraph", content: "Tulis nama lengkap Anda di bawah tanda tangan. (Write your full name below the signature)." },
        { type: "paragraph", content: "Jika relevan, tambahkan jabatan/afiliasi (e.g., Ketua Klub Bahasa Indonesia, Penghuni Blok 123). (If relevant, add your position/affiliation)." },
      ]
    },

    // SECTION II (Kerangka Induk - Remains as previously corrected)
    {
      id: "kerangka-induk",
      title: 'II. "Kerangka Induk" Surat Resmi (Format Mudah Diproses)',
      elements: [
        { type: "paragraph", content: "Gunakan kerangka ini sebagai panduan dasar. Ganti bagian dalam kurung siku [...] dengan informasi yang sesuai dengan soal ujian atau situasi Anda." },
        { type: "paragraph", content: "--- AWAL SURAT (Sender's Address & Date) ---" },
        { type: "preformatted", content: 
`[Alamat Pengirim Lengkap Anda, jika individu atau tidak menggunakan kop surat resmi institusi]
[Singapura Kode Pos Anda]
(Lewati baris ini jika menggunakan kop surat institusi)

[Tempat Anda Menulis, e.g., Singapura], [Tanggal Bulan Tahun, e.g., 28 Oktober 2024]`
        },
        { type: "paragraph", content: "--- PERIHAL (Subject) ---" },
        { type: "preformatted", content:
`Perihal: [Pokok Utama Surat Anda Secara Ringkas dan Jelas, contoh: Keluhan Fasilitas Rusak di Blok 123, Permohonan Izin Penggunaan Aula untuk Acara Klub Sains, Usulan Peningkatan Layanan Kebersihan Lingkungan, Lamaran Pekerjaan Posisi Staf Administrasi]`
        },
        { type: "paragraph", content: "--- ALAMAT TUJUAN (Recipient's Address) ---" },
        { type: "preformatted", content:
`Kepada Yth.
Bapak/Ibu [Jabatan Penerima yang Tepat, e.g., Manajer, Kepala Sekolah, Direktur Personalia, Pimpinan Redaksi]
[Nama Institusi/Organisasi Penerima, e.g., Dewan Kota Wilayah Sentosa, SMA Tunas Bangsa, Perusahaan Teknologi Cemerlang, Harian Nasional]
[Alamat Lengkap Institusi Penerima, e.g., #05-01 Gedung Merah Putih, 123 Jalan Kemerdekaan]
[Singapura Kode Pos, e.g., Singapura 123456]`
        },
        { type: "paragraph", content: "--- SALAM PEMBUKA (Opening Salutation) ---" },
        { type: "preformatted", content:
`Dengan hormat,`
        },
        
        { type: "subheading", level: 4, content: "Paragraf 1: Pengenalan Diri dan Tujuan Utama Surat" },
        { type: "paragraph", content: "<em>(Introduction of Self and Main Purpose of the Letter)</em>"},
        { type: "list", items: [
            " Perkenalkan diri Anda (nama, status/peran yang relevan dengan isi surat – e.g., siswa, penghuni, ketua klub, orang tua murid).",
            "Sebutkan dengan jelas dan lugas apa tujuan utama Anda menulis surat ini (e.g., menyampaikan keluhan, memohon izin, mengusulkan sesuatu, melamar pekerjaan, memberikan masukan).",
            "<em>(Opsional, jika relevan)</em> Berikan apresiasi singkat atau referensi terhadap komunikasi/kejadian sebelumnya jika ada."
        ]},
        { type: "paragraph", isQuote: true, content: `Saya/Kami, [Nama Lengkap Anda/Nama Kelompok], adalah seorang/selaku [Identitas Anda, e.g., siswa SMA [Nama Sekolah] kelas [Kelas Anda], penghuni Blok [Nomor Blok] [Nama Kawasan] sejak tahun [Tahun], sekretaris Klub Lingkungan Hidup Sekolah [Nama Sekolah], orang tua dari Ananda [Nama Anak] kelas [Kelas Anak]]. Melalui surat ini, saya/kami bermaksud untuk [Tujuan Utama Surat Secara Jelas, e.g., menyampaikan keluhan mengenai fasilitas [Nama Fasilitas] yang rusak di [Lokasi Spesifik], yaitu [Detail Kerusakan Singkat]; atau memohon izin dari Bapak/Ibu untuk dapat menyelenggarakan kegiatan [Nama Kegiatan] atas nama [Nama Klub/Organisasi] yang direncanakan pada [Tanggal dan Waktu Usulan]; atau menawarkan beberapa usulan konstruktif guna mengatasi permasalahan [Masalah Spesifik] di lingkungan [Lokasi Spesifik]; atau menanggapi pengumuman lowongan pekerjaan untuk posisi [Nama Posisi] yang dimuat di [Sumber Informasi Lowongan] pada tanggal [Tanggal Lowongan]]. <em>(Opsional)</em> Saya/Kami sangat menghargai berbagai upaya yang telah dilakukan oleh pihak [Nama Institusi Penerima] dalam [Bidang Terkait, e.g., menjaga kebersihan lingkungan, mendukung kegiatan kesiswaan, memajukan kualitas pendidikan di sekolah ini].` },

        { type: "subheading", level: 4, content: "Paragraf 2: Penjelasan Detail Mengenai Pokok Surat (Masalah / Latar Belakang Usulan / Kualifikasi Lamaran / Rincian Permohonan)" },
        { type: "paragraph", content: "<em>(Detailed Explanation of the Letter's Subject Matter - Problem / Background of Proposal / Application Qualifications / Details of Request)</em>"},
        { type: "list", items: [
            "Jelaskan situasi, masalah, atau latar belakang secara rinci, faktual, dan objektif.",
            "Berikan konteks yang relevan: Kapan masalah mulai terjadi? Di mana lokasinya? Siapa saja yang terdampak? Mengapa hal ini penting untuk segera ditangani atau dipertimbangkan?",
            "Jika mengajukan usulan atau permohonan, berikan latar belakang yang kuat mengapa hal tersebut diperlukan atau bermanfaat.",
            "Jika melamar pekerjaan, uraikan kualifikasi, pengalaman, dan keterampilan yang relevan dengan posisi yang dilamar.",
            "Gunakan bahasa formal dan susun menjadi kalimat-kalimat yang padu. Hindari poin bernomor atau bertanda dalam paragraf."
        ]},
        { type: "paragraph", content: "<em>Contoh untuk Keluhan:</em>" },
        { type: "paragraph", isQuote: true, content: `"Belakangan ini, kami sebagai penghuni [Nama Kawasan/Blok] sering kali menghadapi masalah terkait [Masalah Spesifik dengan Detail, e.g., lift di Blok kami, khususnya Lift A yang melayani lantai ganjil, yang sering mengalami kerusakan dan tidak berfungsi dengan baik. Kejadian ini telah berulang setidaknya tiga kali dalam sebulan terakhir, terutama pada jam-jam sibuk pagi antara pukul 07.00-09.00 dan sore hari antara pukul 17.00-19.00]. Selain itu, kondisi kebersihan di area [Lokasi Spesifik, e.g., lobi utama dan koridor menuju tempat sampah] juga sangat memprihatinkan akibat [Penyebab Spesifik, e.g., penumpukan sampah di luar tempat yang disediakan dan kurangnya frekuensi pengangkutan]. Keadaan ini tentu saja menimbulkan [Dampak Negatif Spesifik, e.g., kesulitan mobilitas bagi warga lanjut usia dan penyandang disabilitas, ketidaknyamanan signifikan bagi seluruh penghuni, serta potensi risiko penyebaran penyakit akibat bau tidak sedap dan kemungkinan munculnya hama]."` },
        
        { type: "subheading", level: 4, content: "Paragraf 3 (dan seterusnya jika perlu): Usulan Solusi / Permintaan Spesifik / Argumen Pendukung / Detail Tambahan" },
        { type: "paragraph", content: "<em>(Detailed Proposals / Specific Requests / Supporting Arguments / Additional Details)</em>"},
        { type: "list", items: [
            "Sampaikan usulan solusi yang konkret dan realistis, permintaan yang spesifik, atau argumen pendukung secara logis dan terstruktur.",
            "Jika ada beberapa poin, hubungkan menjadi kalimat-kalimat yang mengalir menggunakan kata penghubung yang tepat (lihat Bank Frasa).",
            "Jelaskan mengapa usulan/permintaan Anda penting, apa manfaat yang diharapkan, atau bagaimana argumen Anda mendukung tujuan surat.",
            "Untuk lamaran kerja, tonjolkan bagaimana Anda bisa berkontribusi pada perusahaan.",
            "Sebutkan lampiran jika ada (e.g., proposal detail, daftar riwayat hidup, portofolio, rincian anggaran)."
        ]},
        { type: "paragraph", content: "<em>Contoh untuk Usulan Solusi dari Keluhan:</em>" },
        { type: "paragraph", isQuote: true, content: `"Sehubungan dengan permasalahan tersebut, kami ingin mengajukan beberapa usulan konstruktif. Pertama, kami memohon agar pihak [Nama Institusi Penerima] dapat [Usulan Pertama yang Jelas dan Dapat Diukur, e.g., melakukan inspeksi menyeluruh terhadap kondisi Lift A di Blok kami dan mengganti komponen yang aus, serta menetapkan jadwal pemeliharaan preventif yang lebih frekuen, misalnya setiap dua minggu sekali]. Kedua, kami mengusulkan penambahan [Usulan Kedua yang Jelas, e.g., minimal dua unit tempat sampah tertutup berukuran besar di area lobi utama dan peningkatan frekuensi pengangkutan sampah menjadi dua kali sehari, terutama pada akhir pekan]. Kami percaya, dengan tindakan nyata ini, kenyamanan dan kesehatan lingkungan di blok kami dapat ditingkatkan secara signifikan."` },
        
        { type: "subheading", level: 4, content: "Paragraf Penutup: Penegasan Kembali Harapan, Kesediaan untuk Diskusi Lebih Lanjut, dan Ucapan Terima Kasih" },
        { type: "paragraph", content: "<em>(Closing Statement, Reiteration of Hope, Willingness to Discuss Further, and Expression of Thanks)</em>"},
        { type: "list", items: [
            "Ringkas kembali harapan utama Anda atau hasil yang diinginkan.",
            "Nyatakan kesediaan Anda untuk berdiskusi lebih lanjut atau memberikan informasi tambahan jika diperlukan.",
            "Tutup surat dengan ucapan terima kasih yang tulus atas perhatian dan kerja sama penerima surat."
        ]},
        { type: "paragraph", isQuote: true, content: `Demikianlah [Jenis Surat: keluhan/usulan/permohonan/lamaran/masukan] ini saya/kami sampaikan dengan harapan dapat menjadi bahan pertimbangan yang positif bagi Bapak/Ibu. Besar harapan saya/kami agar Bapak/Ibu sudi [Tindakan yang Diharapkan Secara Spesifik dan Sopan – e.g., mengambil tindakan perbaikan yang diperlukan secepatnya atas keluhan yang kami ajukan, menyetujui permohonan izin kegiatan kami, mempertimbangkan dengan saksama usulan/masukan yang telah kami kemukakan, memberikan kesempatan wawancara kepada saya]. Kami sangat terbuka dan bersedia untuk bertemu guna mendiskusikan hal ini lebih lanjut pada waktu yang paling sesuai bagi Bapak/Ibu. Atas segala perhatian, kerja sama, dan kebijaksanaan Bapak/Ibu, saya/kami haturkan terima kasih yang sebesar-besarnya.`},

        { type: "paragraph", content: "--- BAGIAN PENUTUP (Closing Part) ---" },
        { type: "preformatted", content: 
`Hormat saya, 
(atau Hormat kami, jika menulis atas nama kelompok)

(Area kosong sekitar 3-4 baris untuk Tanda Tangan Anda)

[Nama Lengkap Anda Ditik atau Ditulis Jelas]
[Jabatan/Afiliasi Anda, jika relevan, e.g., Siswa Kelas X Unggulan, Ketua Klub Daur Ulang, Penghuni Unit #XX-XXX, Orang Tua Murid Ananda [Nama Anak] Kelas [Kelas]]` 
        }
      ]
    },

    // SECTION III (Bank Frasa - Remains as previously enhanced)
    {
      id: "bank-frasa",
      title: "III. Bank Frasa (Diurutkan berdasarkan Kegunaan Umum)",
      elements: [
        { type: "paragraph", content: "(Termasuk terjemahan bahasa Inggris untuk pemahaman. Frasa di bagian atas setiap kategori umumnya lebih sering digunakan/lebih serbaguna.)" },
        
        { type: "subheading", level: 3, content: "A. Pembukaan & Menyatakan Tujuan (Openings & Stating Purpose):" },
        { type: "paragraph", content: "<em>Frasa paling umum dan serbaguna untuk memulai:</em>"},
        {
          type: "list",
          items: [
            "Melalui surat ini, saya/kami bermaksud untuk... (Through this letter, I/we intend to...)",
            "Tujuan utama saya/kami menulis surat ini adalah untuk... (My/Our main purpose in writing this letter is to...)",
            "Dengan segala kerendahan hati, saya/kami menulis surat ini untuk... (With all due respect/humility, I am/we are writing this letter to...)"
          ]
        },
        { type: "paragraph", content: "<em>Frasa yang lebih spesifik berdasarkan tujuan:</em>"},
        {
          type: "list",
          items: [
            "...menyampaikan keluhan dan keprihatinan mendalam mengenai... (...lodge a complaint and deep concern regarding...)",
            "...mengajukan permohonan resmi terkait... (...submit a formal request regarding...)",
            "...mengusulkan beberapa langkah konkret agar... (...propose several concrete steps so that...)",
            "Perkenankan saya/kami, [Nama Anda/Nama Kelompok], selaku [posisi/status Anda], untuk menyampaikan... (Allow me/us, [Your Name/Group Name], as [your position/status], to convey...)",
            "...menawarkan kerja sama strategis dalam hal... (...offer strategic cooperation regarding...)",
            "Saya/Kami ingin menyatakan apresiasi yang setinggi-tingginya atas... (I/We would like to express the highest appreciation for...)",
            "Surat ini kami tujukan sehubungan dengan... (We address this letter in relation to...)",
            "Menindaklanjuti pembicaraan/surat kami sebelumnya tanggal [tanggal], ... (Following up on our previous conversation/letter dated [date], ...)",
            "Sehubungan dengan surat edaran/pengumuman Bapak/Ibu tertanggal [Tanggal], perihal [Topik Edaran], kami ingin... (Responding to your circular/announcement dated [Date], regarding [Topic of Circular], we would like to...)"
          ]
        },

        { type: "subheading", level: 3, content: "B. Menjelaskan Masalah/Latar Belakang (Describing Problems/Background):" },
        { type: "paragraph", content: "<em>Frasa umum untuk memulai penjelasan:</em>"},
        {
          type: "list",
          items: [
            "Berdasarkan pengamatan kami selama beberapa waktu terakhir,... (Based on our observations over the past period,...)",
            "Saat ini, kami sedang menghadapi situasi di mana... (Currently, we are facing a situation where...)",
            "Sebagaimana yang mungkin telah menjadi perhatian Bapak/Ibu,... (As it may have come to your attention,...)"
          ]
        },
        { type: "paragraph", content: "<em>Frasa untuk merinci masalah/latar belakang:</em>"},
        {
          type: "list",
          items: [
            "Isu krusial yang ingin kami sampaikan adalah terkait... (The crucial issue we wish to raise is related to...)",
            "Hal ini disebabkan oleh... (This matter stems from... / is caused by...)",
            "Dampak dari situasi ini adalah... (The impact of this situation is...)",
            "Permasalahan ini telah berlangsung selama [periode waktu] dan telah [jelaskan dampak yang sudah terjadi]. (This problem has been ongoing for [period of time] and has [explain impacts that have occurred].)",
            "Kekurangan [sesuatu, e.g., fasilitas, koordinasi, informasi] telah mengakibatkan [akibat spesifik]. (The lack of [something, e.g., facilities, coordination, information] has resulted in [specific consequence].)",
            "Situasi ini diperparah oleh... (This situation is exacerbated by...)",
            "Hal ini berpotensi menimbulkan dampak negatif terhadap... (This has the potential to cause a negative impact on...)",
            "Kami memahami bahwa [pihak penerima] mungkin memiliki banyak prioritas, namun isu ini mendesak untuk ditangani karena... (We understand that [recipient] may have many priorities, but this issue is urgent to address because...)",
            "Kami menyambut baik inisiatif [pihak] untuk [rencana/tindakan]. (We welcome [party]'s initiative to [plan/action].)"
          ]
        },

        { type: "subheading", level: 3, content: "C. Mengemukakan Usulan/Permintaan/Masukan (Making Suggestions/Requests/Providing Feedback):" },
        { type: "paragraph", content: "<em>Gunakan kata penghubung untuk alur yang baik. Mulai dengan usulan paling penting:</em>"},
        {
          type: "list",
          items: [
            "Oleh karena itu, kami dengan hormat memohon agar Bapak/Ibu sudi [permintaan spesifik]. (Therefore, we respectfully request that you be willing to [specific request].)",
            "Sebagai langkah awal yang konstruktif, kami mengusulkan agar... (As a constructive initial step, we propose that...)",
            "Menurut hemat kami, beberapa program/langkah yang mungkin sesuai dan bermanfaat antara lain... (In our humble opinion, some suitable and beneficial programs/steps include...)",
            "Kami menyarankan agar pengenalan [topik] dilakukan secara bertahap, dimulai dengan... (We suggest that the introduction of [topic] be done gradually, starting with...)",
            "Selain itu, kami juga berpendapat bahwa implementasi [usulan lain] akan sangat bermanfaat. (Furthermore, we are also of the opinion that the implementation of [another proposal] would be very beneficial.)",
            "Selanjutnya, kami melihat adanya kebutuhan mendesak untuk... (Subsequently, we see an urgent need to...)",
            "Di samping itu, kami meyakini bahwa tindakan untuk [ide lain] juga patut dipertimbangkan sebagai solusi alternatif yang efektif. (Additionally, we believe that action for [another idea] should also be considered as an effective alternative solution.)",
            "Kami berharap pihak Bapak/Ibu dapat mempertimbangkan untuk [tindakan yang diminta]. (We hope your party can consider to [requested action].)",
            "Akan sangat kami hargai apabila [permintaan/harapan]. (We would greatly appreciate it if [request/hope].)",
            "Untuk mendukung usulan ini, kami melampirkan [dokumen pendukung, misal: proposal detail, rincian anggaran, daftar nama]. (To support this proposal, we attach [supporting documents, e.g., detailed proposal, budget details, list of names].)"
          ]
        },

        { type: "subheading", level: 3, content: "D. Menyatakan Apresiasi/Penghargaan (Expressing Appreciation):" },
        { type: "paragraph", content: "<em>Frasa umum untuk menyatakan terima kasih/apresiasi:</em>"},
        {
          type: "list",
          items: [
            "Kami ingin menyampaikan penghargaan yang tulus atas... (We wish to convey our sincere appreciation for...)",
            "Kami sangat berterima kasih atas kemurahan hati dan kedermawanan Bapak/Ibu dalam... (We are very grateful for your generosity and magnanimity in...)",
            "Dukungan yang Bapak/Ibu berikan sangat berarti bagi kami dan kesuksesan [nama acara/proyek]. (The support you have provided means a lot to us and the success of [event/project name].)",
            "Kontribusi Bapak/Ibu telah memberikan dampak positif yang signifikan terhadap [pihak/hal yang terdampak]. (Your contribution has made a significant positive impact on [affected party/matter].)"
          ]
        },

        { type: "subheading", level: 3, content: "E. Menyatakan Ketidaksetujuan/Keluhan dengan Sopan (Expressing Disagreement/Complaints Politely):" },
        { type: "paragraph", content: "<em>Pilih frasa yang sesuai dengan tingkat keseriusan keluhan:</em>"},
        {
          type: "list",
          items: [
            "Kami merasa perlu untuk menyuarakan keprihatinan kami terkait [isu spesifik] yang telah [dampak isu tersebut]. (We feel it necessary to voice our concerns regarding [specific issue] which has [impact of the issue].)",
            "Dengan berat hati, kami harus menyampaikan beberapa hal yang kurang berkenan mengenai [isu spesifik]. (With a heavy heart, we must convey some matters that are less than satisfactory regarding [specific issue].)",
            "Meskipun kami menghargai upaya yang telah dilakukan, ada beberapa aspek terkait [isu spesifik] yang menurut hemat kami perlu perbaikan segera. (Although we appreciate the efforts made, there are several aspects related to [specific issue] that, in our humble opinion, need immediate improvement.)",
            "Kami berharap dapat menemukan solusi yang adil dan memuaskan bersama atas permasalahan ini. (We hope to find a fair and satisfactory mutual solution to this problem.)"
          ]
        },

        { type: "subheading", level: 3, content: "F. Menawarkan Solusi/Bantuan (Offering Solutions/Help):" },
        { type: "paragraph", content: "<em>Frasa untuk menunjukkan inisiatif:</em>"},
        {
          type: "list",
          items: [
            "Kami siap berkontribusi aktif dalam mencari jalan keluar terbaik untuk [masalah spesifik]. (We are ready to contribute actively in finding the best way out for [specific problem].)",
            "Sekiranya diperlukan, kami bersedia untuk [tawaran bantuan spesifik, misal: menyediakan data tambahan, membantu sosialisasi, berpartisipasi dalam diskusi lanjutan]. (If needed, we are willing to [specific offer of help, e.g., provide additional data, assist in socialization, participate in further discussions].)",
            "Kami percaya bahwa dengan kerja sama dan dialog yang konstruktif, masalah ini dapat diatasi secara efektif. (We believe that with cooperation and constructive dialogue, this problem can be effectively overcome.)"
          ]
        },

        { type: "subheading", level: 3, content: "G. Meminta Tindakan/Respon (Requesting Action/Response):" },
        { type: "paragraph", content: "<em>Gunakan untuk mendorong tindakan dari penerima:</em>"},
        {
          type: "list",
          items: [
            "Kami sangat mengharapkan tindak lanjut yang konkret dan sesegera mungkin dari pihak Bapak/Ibu. (We greatly expect concrete and prompt follow-up action from your side.)",
            "Kami siap untuk bertemu dan berdiskusi lebih lanjut mengenai hal ini pada waktu yang paling sesuai bagi Bapak/Ibu. (We are ready to meet and discuss this matter further at a time most convenient for you.)",
            "Mohon kiranya Bapak/Ibu dapat memberikan respons atas surat ini sebelum tanggal [tanggal spesifik, jika ada], agar kami dapat [alasan urgensi, jika ada]. (We kindly request that you provide a response to this letter before [specific date, if any], so that we may [reason for urgency, if any].)"
            
          ]
        },

        { type: "subheading", level: 3, content: "H. Penutup & Menyatakan Harapan (Closing & Expressing Hope):" },
        { type: "paragraph", content: "<em>Frasa standar dan sopan untuk mengakhiri surat:</em>"},
        {
          type: "list",
          items: [
            "Demikianlah surat ini saya/kami sampaikan dengan harapan dapat menjadi bahan pertimbangan yang berharga. (Thus, I/we submit this letter with the hope that it can be valuable consideration.)",
            "Besar harapan saya/kami agar Bapak/Ibu dapat mempertimbangkan usulan/permohonan/masukan ini dengan arif dan bijaksana. (It is my/our great hope that you will consider this proposal/request/feedback wisely and judiciously.)",
            "Atas segala perhatian, kerja sama, dan waktu yang Bapak/Ibu luangkan, saya/kami haturkan terima kasih yang sebesar-besarnya. (For all the attention, cooperation, and time you have devoted, I/we express our deepest gratitude.)",
            "Kami sangat menantikan kabar baik dan tanggapan positif dari pihak Bapak/Ibu. (We eagerly await good news and a positive response from you.)",
            "Semoga Bapak/Ibu dapat memberikan perhatian yang semestinya dan solusi yang terbaik terhadap permasalahan/rencana ini. (Hopefully, you can give due attention and the best solution to this problem/plan.)"
          ]
        },

        { type: "subheading", level: 3, content: "I. Menulis Surat Lamaran Pekerjaan (Writing a Job Application Letter):" },
        { type: "paragraph", content: "<em>Frasa kunci untuk surat lamaran:</em>"},
        {
          type: "list",
          items: [
            "Berdasarkan informasi lowongan pekerjaan yang saya peroleh dari [sumber informasi, e.g., situs web perusahaan, surat kabar Harian Kompas tanggal ...], dengan ini saya bermaksud mengajukan lamaran untuk posisi [Nama Posisi].",
            "Saya adalah seorang lulusan [Gelar, e.g., Sarjana Ekonomi] dari [Nama Universitas/Institusi] dengan Indeks Prestasi Kumulatif (IPK) [nilai IPK Anda] dan spesialisasi di bidang [Bidang Studi].",
            "Saya memiliki kualifikasi dan pengalaman yang relevan dengan posisi yang ditawarkan, khususnya dalam [sebutkan 1-2 kualifikasi/pengalaman kunci, e.g., manajemen proyek dan analisis data].",
            "Selama [masa studi/pengalaman kerja sebelumnya di PT ABC], saya berhasil [sebutkan pencapaian konkret atau keterampilan yang dikembangkan, e.g., memimpin tim dalam proyek X dan meningkatkan efisiensi sebesar Y%].",
            "Saya sangat antusias untuk dapat berkontribusi pada [Nama Perusahaan] dan percaya bahwa keahlian saya di bidang [bidang keahlian] serta semangat belajar yang tinggi akan menjadi aset berharga bagi tim Bapak/Ibu.",
            "Terlampir bersama surat ini adalah daftar riwayat hidup (CV) saya, ijazah, transkrip nilai, serta dokumen pendukung lainnya untuk menjadi bahan pertimbangan Bapak/Ibu.",
            "Besar harapan saya untuk dapat diberikan kesempatan mengikuti tahap seleksi selanjutnya, termasuk wawancara, untuk menjelaskan lebih lanjut mengenai kompetensi dan motivasi saya."
          ]
        },

        { type: "subheading", level: 3, content: "J. Menulis Surat Permohonan Maaf (Writing a Letter of Apology):" },
        { type: "paragraph", content: "<em>Frasa penting untuk menyampaikan penyesalan dan tanggung jawab:</em>"},
        {
          type: "list",
          items: [
            "Dengan penuh penyesalan, kami menulis surat ini untuk menyampaikan permohonan maaf yang sebesar-besarnya atas [kejadian/kesalahan spesifik dan dampaknya].",
            "Kami menyadari sepenuhnya kekeliruan/kelalaian yang telah terjadi pada [tanggal/saat kejadian] yang mengakibatkan [dampak negatif secara jelas].",
            "Kami bertanggung jawab penuh atas insiden tersebut dan memahami sepenuhnya ketidaknyamanan/kerugian yang mungkin ditimbulkan kepada pihak Bapak/Ibu.",
            "Sebagai bentuk itikad baik dan tanggung jawab kami, kami bersedia untuk [tindakan perbaikan/kompensasi yang ditawarkan secara konkret, e.g., segera memperbaiki kerusakan yang terjadi, memberikan kompensasi yang layak sesuai kesepakatan].",
            "Kami telah mengambil langkah-langkah korektif internal untuk memastikan kejadian serupa tidak terulang kembali di masa mendatang, termasuk [sebutkan langkah spesifik jika relevan, e.g., meninjau ulang prosedur operasional kami, memberikan pelatihan tambahan kepada staf terkait].",
            "Kami berharap Bapak/Ibu berkenan menerima permohonan maaf kami yang tulus ini dan memberikan kami kesempatan untuk memperbaiki keadaan serta memulihkan kepercayaan yang mungkin telah terganggu."
          ]
        },
        
        { type: "subheading", level: 3, content: "K. Menulis Surat Izin (Writing a Letter of Permission/Absence):" },
        { type: "paragraph", content: "<em>Frasa standar untuk surat izin (misalnya, izin tidak masuk sekolah):</em>"},
        {
          type: "list",
          items: [
            "Dengan hormat, yang bertanda tangan di bawah ini, saya [Nama Anda], orang tua/wali dari siswa bernama [Nama Siswa], kelas [Kelas], dengan ini memberitahukan bahwa anak kami tidak dapat mengikuti kegiatan belajar di sekolah pada...",
            "...hari [Nama Hari], tanggal [Tanggal Lengkap], dikarenakan [alasan singkat dan jelas, e.g., sakit (demam dan batuk sehingga memerlukan istirahat di rumah), ada urusan keluarga yang sangat mendesak dan tidak dapat ditunda, yaitu [sebutkan secara singkat jika memungkinkan]].",
            "Sehubungan dengan hal tersebut, kami dengan hormat memohon izin kepada Bapak/Ibu Kepala Sekolah (atau Bapak/Ibu Guru Wali Kelas) agar anak kami dapat diberikan dispensasi untuk tidak hadir pada tanggal tersebut.",
            "Sebagai bukti/informasi pendukung, terlampir [jika ada, e.g., surat keterangan dokter dari Klinik Sehat Selalu nomor [Nomor Surat Dokter]].",
            "Kami akan memastikan anak kami dapat mengejar ketertinggalan materi pelajaran sesegera mungkin setelah ia kembali bersekolah/kondisinya membaik. Kami juga siap berkoordinasi dengan pihak sekolah terkait hal ini."
          ]
        }
      ]
    },

    // SECTION IV (Remains as is)
    {
      id: "mengubah-poin",
      title: "IV. Mengubah Poin Menjadi Paragraf (Converting Points to Paragraphs)",
      elements: [
        { type: "paragraph", content: "Ini adalah kunci! Jangan gunakan daftar bernomor atau bertanda dalam isi surat." },
        { type: "example", content: "Salah (Incorrect):" },
        { type: "preformatted", content: `Kami mengusulkan:\n  1. Perbaikan lampu jalan.\n  2. Penambahan tempat sampah.\n  3. Jadwal pembersihan rutin.` },
        { type: "example", content: "Benar (Correct - woven into a paragraph):" },
        { type: "paragraph", isQuote: true, content: `"Oleh karena itu, kami ingin mengusulkan beberapa langkah perbaikan. Pertama, kami berharap agar lampu-lampu jalan yang rusak dapat segera diperbaiki untuk menjamin keselamatan penghuni pada waktu malam. Selain itu, penambahan beberapa unit tempat sampah di lokasi-lokasi strategis juga sangat diperlukan untuk mengatasi masalah sampah yang berserakan. Selanjutnya, kami mengusulkan agar jadwal pembersihan rutin dapat dilaksanakan dengan lebih konsisten untuk menjaga kebersihan lingkungan perumahan kita secara keseluruhan."` }
      ]
    },

    // SECTION V (Contoh Surat Kontekstual - Added Example 10)
    {
      id: "contoh-surat-dengan-prompt",
      title: "V. Contoh Surat Kontekstual dengan Skenario Ujian",
      elements: [
        { 
          type: "subheading", level: 3, 
          content: "Contoh 1: Surat Keluhan kepada Dewan Kota (Complaint to Town Council)" 
        },
        { 
          type: "paragraph", 
          content: "<strong>Skenario Ujian:</strong> Anda adalah seorang penghuni sebuah blok HDB. Akhir-akhir ini, Anda dan penghuni lain merasa terganggu dengan masalah kebisingan dari beberapa unit dan kebersihan area umum yang kurang terjaga. Tulislah surat kepada Manajer Dewan Kota untuk menyampaikan keluhan ini dan mengusulkan beberapa tindakan perbaikan." 
        },
        {
          type: "exampleLetter",
          title: "", 
          content: `[Alamat Pengirim Lengkap Anda]\n[Singapura Kode Pos Anda]\n\nSingapura, 28 Oktober 2024\n\nPerihal: Keluhan Mengenai Masalah Kebisingan dan Kebersihan di Blok 555, Yishun Ring Road\n\nKepada Yth.\nBapak/Ibu Manajer\nDewan Kota Nee Soon\nBlok 290, Yishun Street 22\nSingapura 760290\n\nDengan hormat,\n\nSaya, Ahmad bin Ibrahim, adalah seorang penghuni Blok 555, Yishun Ring Road, Singapura 760555, Unit #05-123. Melalui surat ini, saya ingin menyampaikan keluhan dan keprihatinan mendalam mengenai beberapa isu yang telah mengganggu ketenteraman dan kebersihan di area blok kami selama beberapa waktu terakhir. Saya memahami dan mengapresiasi berbagai upaya yang telah dilakukan Dewan Kota dalam menjaga lingkungan Nee Soon selama ini.\n\nSejak kurang lebih tiga bulan terakhir, kami para penghuni sering kali terganggu dengan masalah kebisingan yang berlebihan, khususnya yang berasal dari beberapa unit hunian pada larut malam, terutama antara pukul 23.00 hingga 02.00, dan juga pada akhir pekan. Suara musik yang keras dan percakapan dengan volume tinggi ini sangat mengganggu waktu istirahat kami, termasuk anak-anak dan warga lanjut usia. Selain itu, kami juga mendapati kondisi kebersihan di area umum seperti koridor dan lift sering kali kurang terjaga. Sampah rumah tangga terkadang tidak dibuang dengan benar ke dalam tong sampah yang disediakan dan puntung rokok sering ditemukan berserakan di tangga darurat. Keadaan ini bukan saja menciptakan lingkungan yang tidak menyenangkan secara visual, tetapi juga berpotensi menarik hama dan menimbulkan risiko kesehatan.\n\nOleh karena itu, kami dengan sangat memohon bantuan dan tindakan dari pihak Dewan Kota untuk mengatasi permasalahan ini. Sebagai langkah awal, kami mengusulkan agar pemberitahuan resmi atau edaran mengenai batas toleransi tingkat kebisingan pada jam-jam tertentu dapat dikeluarkan dan disosialisasikan kepada semua penghuni. Di samping itu, kami juga berharap agar frekuensi patroli oleh petugas kebersihan dan keamanan Dewan Kota dapat ditingkatkan, terutama pada malam hari dan akhir pekan, untuk memantau tingkat kebersihan serta mengambil tindakan edukatif atau peringatan kepada unit yang melanggar. Kami percaya bahwa tindakan proaktif dan konsisten dari pihak Dewan Kota akan sangat efektif dalam memulihkan suasana yang harmonis dan lingkungan yang bersih di blok kami.\n\nDemikianlah keluhan ini saya sampaikan. Besar harapan saya agar pihak Bapak/Ibu dapat memberikan perhatian serius terhadap masalah ini dan mengambil tindakan perbaikan yang diperlukan sesegera mungkin. Atas kerja sama dan kebijaksanaan Bapak/Ibu, saya ucapkan terima kasih yang sebesar-besarnya.\n\nHormat saya,\n\n(Tanda Tangan)\n\nAhmad bin Ibrahim\nPenghuni Blok 555, Yishun Ring Road, Unit #05-123`
        },
        { 
          type: "subheading", level: 3, 
          content: "Contoh 2: Surat Permohonan kepada Kepala Sekolah (Request to School Principal)" 
        },
        { 
          type: "paragraph", 
          content: "<strong>Skenario Ujian:</strong> Anda adalah Ketua sebuah Klub Ekstrakurikuler di sekolah Anda. Klub Anda berencana mengadakan sebuah lokakarya untuk meningkatkan keterampilan anggotanya dan ingin mengundang seorang profesional sebagai pembicara. Tulislah surat kepada Kepala Sekolah untuk memohon izin penggunaan fasilitas sekolah dan menyampaikan rencana kegiatan tersebut." 
        },
        {
          type: "exampleLetter",
          title: "",
          content: `[Nama Klub Anda]\n[Nama Sekolah Anda]\n[Alamat Sekolah Anda]\n[Singapura Kode Pos Sekolah]\n\nSingapura, 28 Oktober 2024\n\nPerihal: Permohonan Izin Penyelenggaraan Lokakarya Fotografi dan Penggunaan Fasilitas Sekolah\n\nKepada Yth.\nBapak Tan Ah Meng\nKepala Sekolah SMA Ang Mo Kio\n6 Ang Mo Kio Street 54\nSingapura 569185\n\nDengan hormat,\n\nSaya, Siti Nurhaliza binti Rahman, selaku Ketua Klub Fotografi SMA Ang Mo Kio, menulis surat ini atas nama seluruh anggota pengurus klub. Tujuan kami adalah untuk secara resmi memohon izin dari Bapak Kepala Sekolah guna menyelenggarakan sebuah lokakarya fotografi yang kami yakini akan sangat bermanfaat bagi para anggota klub kami. Kami juga ingin menyampaikan apresiasi atas dukungan Bapak yang berkelanjutan terhadap berbagai kegiatan ekstrakurikuler di sekolah kita tercinta ini.\n\nLokakarya bertajuk "Mengasah Lensa Kreatif" ini dirancang khusus untuk meningkatkan keterampilan teknis dan wawasan artistik anggota klub dalam bidang fotografi. Kami berencana mengadakan lokakarya ini pada hari Sabtu, 23 November 2024, mulai pukul 09.00 pagi hingga pukul 16.00 sore, dan kami berharap dapat menggunakan fasilitas Ruang Audiovisual (AVA) sekolah yang representatif. Lebih lanjut, kami juga bermaksud mengundang Bapak [Nama Fotografer Profesional, jika diketahui, atau 'seorang fotografer profesional ternama'] sebagai pembicara tamu dan fasilitator lokakarya. Untuk memberikan gambaran yang lebih komprehensif, proposal kegiatan yang memuat rincian anggaran biaya dan susunan acara sementara telah kami lampirkan bersama surat permohonan ini untuk menjadi rujukan Bapak.\n\nKami sangat berharap agar Bapak Kepala Sekolah dapat mempertimbangkan permohonan kami ini dengan positif dan memberikan persetujuan. Kami percaya lokakarya ini tidak hanya akan memberikan manfaat praktis, tetapi juga akan semakin memotivasi para anggota klub kami dalam mengembangkan minat dan bakat mereka di bidang fotografi. Kami siap dan terbuka untuk berdiskusi lebih lanjut mengenai detail perencanaan lokakarya ini pada waktu yang Bapak tentukan.\n\nDemikianlah permohonan ini kami sampaikan. Atas pertimbangan, dukungan, dan izin yang mungkin Bapak berikan, kami haturkan penghargaan dan terima kasih yang sebesar-besarnya.\n\nHormat kami,\n\n(Tanda Tangan)\n\nSiti Nurhaliza binti Rahman\nKetua Klub Fotografi\nSMA Ang Mo Kio`
        },
        { 
          type: "subheading", level: 3, 
          content: "Contoh 3: Surat Permohonan Dana untuk Kegiatan Komunitas" 
        },
        { 
          type: "paragraph", 
          content: "<strong>Skenario Ujian:</strong> Anda adalah ketua panitia sebuah program komunitas yang bertujuan untuk melakukan penghijauan di lingkungan Anda. Tulislah surat kepada Manajer CSR (Corporate Social Responsibility) sebuah perusahaan untuk memohon dukungan dana bagi program tersebut. Jelaskan tujuan program, rencana kegiatan, dan manfaatnya." 
        },
        { 
          type: "exampleLetter",
          title: "",
          content: `[Nama Panitia/Organisasi Komunitas Anda]\n[Alamat Pusat Komunitas/Organisasi Anda]\n[Singapura Kode Pos Anda]\n\nSingapura, 1 November 2024\n\nPerihal: Permohonan Dukungan Dana untuk Program Penghijauan Komunitas "Lingkungan Asri Kita"\n\nKepada Yth.\nBapak/Ibu Manajer Corporate Social Responsibility (CSR)\nGreenViron Pte Ltd\n123 Orchard Road\nSingapura 238888\n\nDengan hormat,\n\nKami, selaku panitia program "Lingkungan Asri Kita" dari Pusat Komunitas Tampines East, dengan ini mengajukan permohonan dukungan dana kepada GreenViron Pte Ltd untuk pelaksanaan kegiatan penghijauan yang akan kami selenggarakan di lingkungan kami. Kami mengetahui bahwa GreenViron Pte Ltd memiliki rekam jejak dan komitmen yang tinggi terhadap berbagai inisiatif lingkungan dan program keberlanjutan di Singapura.\n\nProgram "Lingkungan Asri Kita" ini memiliki tujuan utama untuk meningkatkan kesadaran masyarakat, khususnya warga Tampines East, akan vitalnya peran ruang hijau di kawasan perkotaan. Secara konkret, kami berencana untuk menanam setidaknya 100 bibit pohon peneduh dan tanaman hias di sekitar area Pusat Komunitas dan beberapa taman lingkungan yang telah ditentukan, yang akan dilaksanakan pada hari Sabtu, 7 Desember 2024. Kegiatan ini akan melibatkan partisipasi aktif sukarelawan dari berbagai lapisan masyarakat, termasuk pelajar dari sekolah-sekolah sekitar dan para warga senior. Kami sangat percaya bahwa program ini tidak hanya akan memperindah lingkungan secara estetika, tetapi juga berkontribusi pada peningkatan kualitas udara dan, yang tidak kalah penting, mempererat ikatan sosial antarwarga.\n\nUntuk merealisasikan program yang bermanfaat ini, kami memperkirakan kebutuhan dana sebesar S$1.500. Dana tersebut akan dialokasikan untuk pengadaan bibit pohon berkualitas, pembelian peralatan berkebun esensial, penyediaan konsumsi bagi para sukarelawan, serta pembuatan materi edukasi mengenai pentingnya penghijauan. Rincian anggaran yang lebih detail telah kami lampirkan bersama proposal kegiatan ini. Kami akan merasa sangat terhormat dan menghargai apabila GreenViron Pte Ltd berkenan menjadi salah satu sponsor utama dalam program komunitas ini. Sebagai bentuk apresiasi atas dukungan yang diberikan, kami dengan senang hati akan mencantumkan logo perusahaan Bapak/Ibu pada seluruh materi promosi dan publikasi kegiatan, serta memberikan pengakuan khusus pada saat acara berlangsung.\n\nBesar harapan kami agar permohonan dukungan dana ini dapat dipertimbangkan dengan saksama. Kami sangat terbuka untuk mempresentasikan proposal ini secara lebih detail dan menjawab pertanyaan lebih lanjut pada waktu yang Bapak/Ibu tentukan. Atas perhatian, pertimbangan, dan dukungan yang mungkin diberikan, kami mengucapkan terima kasih yang tulus.\n\nHormat kami,\n\n(Tanda Tangan)\n\n[Nama Anda/Ketua Panitia]\nKetua Panitia Program "Lingkungan Asri Kita"\nPusat Komunitas Tampines East`
        },
        { 
          type: "subheading", level: 3, 
          content: "Contoh 4: Surat Undangan sebagai Pembicara" 
        },
        { 
          type: "paragraph", 
          content: "<strong>Skenario Ujian:</strong> Klub Sastra di sekolah Anda akan mengadakan acara \"Bulan Bahasa dan Sastra\" dan ingin mengundang seorang penulis terkenal sebagai pembicara utama. Sebagai Ketua Klub Sastra, tulislah surat undangan resmi kepada penulis tersebut. Jelaskan tujuan acara dan mengapa kehadirannya penting." 
        },
        { 
          type: "exampleLetter",
          title: "",
          content: `[Nama Klub Sastra Anda]\n[Nama Sekolah Anda]\n[Alamat Sekolah Anda]\n[Singapura Kode Pos Sekolah]\n\nSingapura, 5 November 2024\n\nPerihal: Undangan sebagai Pembicara Utama dalam Acara "Semarak Bulan Bahasa dan Sastra 2024"\n\nKepada Yth.\nIbu Andrea Hirata\n[Alamat Penulis atau melalui Agen/Penerbit – Jika tidak tahu, bisa dikosongkan atau ditulis 'di tempat']\n\nDengan hormat,\n\nSaya, [Nama Anda], dalam kapasitas saya sebagai Ketua Klub Sastra SMA Nasional Singapura, dengan penuh rasa bangga dan hormat, mengundang Ibu untuk berkenan menjadi pembicara utama dalam acara tahunan kami, "Semarak Bulan Bahasa dan Sastra 2024". Acara ini merupakan salah satu program unggulan kami yang bertujuan untuk menumbuhkan minat baca, apresiasi terhadap karya sastra, serta menginspirasi kreativitas menulis di kalangan siswa-siswi kami.\n\nKami sangat mengagumi karya-karya monumental Ibu yang tidak hanya memperkaya khazanah sastra Indonesia tetapi juga telah menyentuh hati jutaan pembaca, baik di dalam maupun di luar negeri. Kehadiran dan paparan Ibu, misalnya mengenai proses kreatif di balik lahirnya novel-novel inspiratif Ibu, atau pandangan Ibu mengenai pentingnya literasi dan imajinasi bagi pembentukan karakter generasi muda, kami yakini akan menjadi sebuah motivasi dan pencerahan yang tak ternilai harganya bagi seluruh peserta, khususnya para siswa kami. Adapun acara tersebut kami rencanakan akan diselenggarakan pada hari Sabtu, 14 Desember 2024, mulai pukul 10.00 hingga 12.00 Waktu Setempat, dan akan bertempat di Aula Serbaguna SMA Nasional Singapura.\n\nKami sepenuhnya memahami jadwal Ibu yang padat. Namun, besar harapan kami Ibu dapat meluangkan waktu untuk berbagi ilmu, pengalaman, dan inspirasi dengan siswa-siswi kami yang sangat antusias menantikan kehadiran Ibu. Tentu saja, kami siap untuk berdiskusi lebih lanjut mengenai aspek teknis acara, topik paparan yang lebih spesifik sesuai dengan kenyamanan Ibu, serta fasilitas dan honorarium yang dapat kami sediakan sebagai bentuk apresiasi kami.\n\nMohon kiranya Ibu dapat memberikan konfirmasi kesediaan sebelum tanggal 20 November 2024, agar kami dapat segera melakukan persiapan teknis lebih lanjut. Atas perhatian, pertimbangan, dan kesediaan Ibu yang sangat kami harapkan, kami haturkan terima kasih yang sebesar-besarnya.\n\nHormat kami,\n\n(Tanda Tangan)\n\n[Nama Anda]\nKetua Klub Sastra\nSMA Nasional Singapura`
        },
        { 
          type: "subheading", level: 3, 
          content: "Contoh 5: Surat Ucapan Terima Kasih kepada Sponsor" 
        },
        { 
          type: "paragraph", 
          content: "<strong>Skenario Ujian:</strong> Acara \"Pentas Seni Pelajar\" yang Anda ketuai telah berjalan sukses berkat dukungan dari berbagai pihak, termasuk sebuah perusahaan sebagai sponsor utama. Tulislah surat ucapan terima kasih resmi kepada Direktur Pemasaran perusahaan tersebut." 
        },
        { 
          type: "exampleLetter",
          title: "",
          content: `[Nama Panitia Acara Anda]\n[Alamat Sekretariat Panitia]\n[Singapura Kode Pos Anda]\n\nSingapura, 10 Desember 2024\n\nPerihal: Ucapan Terima Kasih atas Dukungan Sponsorship Acara "Pentas Seni Pelajar 2024"\n\nKepada Yth.\nBapak David Lim\nDirektur Pemasaran\nSingapura Maju Pte Ltd\n789 Business Park Avenue\nSingapura 654321\n\nDengan hormat,\n\nMelalui surat ini, kami, atas nama seluruh panitia penyelenggara dan para peserta acara "Pentas Seni Pelajar 2024" yang telah sukses diselenggarakan oleh gabungan OSIS sekolah-sekolah di wilayah Barat Singapura, ingin menyampaikan ucapan terima kasih yang paling tulus dan penghargaan setinggi-tingginya kepada Singapura Maju Pte Ltd. Kami sangat berterima kasih atas kemurahan hati dan kepercayaan yang telah diberikan oleh perusahaan Bapak dengan menjadi sponsor utama dalam kegiatan kami tersebut.\n\nAcara "Pentas Seni Pelajar 2024", yang berlangsung pada tanggal 30 November 2024 di Teater Kallang, telah berjalan dengan sangat sukses dan meriah. Acara ini berhasil menarik partisipasi lebih dari 500 siswa yang menampilkan beragam bakat terbaik mereka di bidang seni, serta dihadiri oleh ratusan penonton yang antusias, termasuk para orang tua dan perwakilan sekolah. Dukungan finansial dan produk yang telah Bapak berikan sangatlah berarti dan krusial bagi kelancaran seluruh rangkaian acara kami, mulai dari tahap persiapan panggung dan teknis, penyediaan konsumsi bagi seluruh peserta dan panitia, hingga pengadaan hadiah yang menarik bagi para pemenang kompetisi.\n\nKami sungguh percaya bahwa kontribusi signifikan dari Singapura Maju Pte Ltd tidak hanya membantu mewujudkan kesuksesan acara ini, tetapi juga telah memberikan dampak positif yang nyata bagi pengembangan kreativitas, rasa percaya diri, dan semangat berprestasi para pelajar di wilayah kami. Sebagai bentuk apresiasi dan pertanggungjawaban, kami telah memastikan logo perusahaan Bapak tercantum dengan jelas pada seluruh materi publikasi acara, termasuk spanduk, poster, dan media sosial, serta menyebutkan nama perusahaan Bapak dengan penuh hormat dalam sambutan pembukaan dan penutupan acara. Terlampir bersama surat ini, kami sertakan pula dokumentasi kegiatan sebagai laporan singkat bagi Bapak.\n\nSekali lagi, kami mengucapkan banyak terima kasih atas kepercayaan dan dukungan sponsorship yang telah diberikan. Kami sangat berharap jalinan kerja sama yang baik ini dapat terus terpelihara dan bahkan ditingkatkan di masa-masa mendatang untuk mendukung kegiatan-kegiatan positif lainnya bagi generasi muda.\n\nHormat kami,\n\n(Tanda Tangan)\n\n[Nama Ketua Panitia Gabungan]\nKetua Panitia "Pentas Seni Pelajar 2024"`
        },
        { 
          type: "subheading", level: 3, 
          content: "Contoh 6: Surat Masukan kepada Sekolah mengenai Kurikulum AI" 
        },
        { 
          type: "paragraph", 
          content: "<strong>Skenario Ujian:</strong> Saat ini, banyak siswa aktif memanfaatkan internet untuk bermain, mencari informasi, menggunakan media sosial dan banyak hal lain. Sekolah anak Anda (sebuah SMP) ingin memperkenalkan teknologi kecerdasan buatan kepada para siswa sebagai bagian dari kurikulum di sekolah dan meminta masukan dari para orang tua. Tulislah sepucuk surat kepada Kepala Sekolah anak Anda, sarankan suatu program yang bisa diperkenalkan di sekolah untuk melindungi dan meningkatkan kesadaran para siswa tentang bahaya yang perlu diperhatikan saat menggunakan internet, serta bagaimana AI bisa diintegrasikan secara positif." 
        },
        {
          type: "exampleLetter",
          title: "",
          content: `[Alamat Rumah Anda]\n[Singapura Kode Pos Anda]\n[Nomor Telepon Anda]\n[Alamat Email Anda]\n\nSingapura, 20 November 2024\n\nPerihal: Masukan dan Saran Program Kesadaran Bahaya Internet serta Integrasi Positif AI dalam Kurikulum SMP [Nama Sekolah Anak Anda]\n\nKepada Yth.\nBapak/Ibu Kepala Sekolah\nSMP [Nama Fiktif Sekolah Anak Anda, e.g., Cendekia Bangsa]\n[Alamat Fiktif Sekolah]\n[Singapura Kode Pos Fiktif]\n\nDengan hormat,\n\nSaya, [Nama Lengkap Anda], orang tua dari ananda [Nama Lengkap Anak Anda], siswa kelas [Kelas Anak Anda, e.g., VIII B] di SMP [Nama Fiktif Sekolah Anak Anda]. Sehubungan dengan maraknya penggunaan internet oleh para siswa untuk berbagai keperluan, mulai dari bermain, mencari informasi, hingga berinteraksi di media sosial, serta menanggapi inisiatif sekolah untuk memperkenalkan teknologi kecerdasan buatan (AI) dalam kurikulum, saya ingin menyampaikan apresiasi dan sekaligus memberikan beberapa masukan konstruktif.\n\nSaya sangat setuju bahwa pemahaman akan teknologi AI sangat penting bagi masa depan anak-anak kita. Namun, seiring dengan manfaatnya, kita juga perlu membekali mereka dengan kesadaran akan potensi bahaya di dunia maya. Oleh karena itu, saya mengusulkan agar sekolah dapat mengembangkan program komprehensif bertajuk, misalnya, "Jelajah Digital Cerdas dan Aman". Program ini dapat mencakup beberapa aspek. Pertama, lokakarya interaktif mengenai keamanan siber dasar, seperti pentingnya kata sandi yang kuat, mengenali upaya phishing, menjaga privasi data pribadi, serta risiko perundungan siber (cyberbullying) dan cara mengatasinya. Kedua, sesi diskusi terpandu mengenai dampak penggunaan media sosial yang berlebihan dan cara membangun jejak digital yang positif.\n\nSelanjutnya, terkait integrasi AI dalam kurikulum, saya menyarankan pendekatan yang tidak hanya teoritis tetapi juga praktis dan relevan. Misalnya, pengenalan konsep dasar AI dapat dimulai dengan contoh-contoh sederhana yang sudah akrab dengan siswa, seperti cara kerja mesin pencari atau sistem rekomendasi. Kemudian, siswa dapat diajak untuk terlibat dalam proyek-proyek kecil yang memanfaatkan alat AI sederhana yang aman dan edukatif, misalnya, membuat presentasi interaktif dengan bantuan AI, atau bahkan mencoba dasar-dasar pemrograman visual untuk memahami logika di balik AI. Penting juga untuk menekankan aspek etika dalam pengembangan dan penggunaan AI, agar siswa memahami tanggung jawab yang menyertainya. Untuk mendukung program ini, sekolah bisa mempertimbangkan untuk mengundang pakar keamanan siber atau praktisi AI sebagai narasumber tamu, serta melibatkan peran aktif orang tua melalui seminar atau materi informasi.\n\nSaya percaya bahwa kombinasi antara peningkatan kesadaran akan bahaya internet dan pengenalan AI yang positif dan bertanggung jawab akan sangat bermanfaat bagi perkembangan siswa di era digital ini. Besar harapan saya agar masukan ini dapat menjadi bahan pertimbangan yang berguna bagi pihak sekolah. Saya siap untuk berdiskusi lebih lanjut apabila diperlukan.\n\nAtas perhatian dan kebijaksanaan Bapak/Ibu, saya mengucapkan terima kasih.\n\nHormat saya,\n\n(Tanda Tangan)\n\n[Nama Lengkap Anda]\nOrang Tua dari Ananda [Nama Lengkap Anak Anda], Kelas [Kelas Anak Anda]`
        },
        { 
          type: "subheading", level: 3, 
          content: "Contoh 7: Surat Lamaran Pekerjaan (Job Application)" 
        },
        { 
          type: "paragraph", 
          content: "<strong>Skenario Ujian:</strong> Anda baru saja lulus dari universitas dan menemukan iklan lowongan pekerjaan untuk posisi Asisten Pemasaran Digital di sebuah perusahaan teknologi. Tulislah surat lamaran pekerjaan kepada Manajer Sumber Daya Manusia perusahaan tersebut. Jelaskan kualifikasi dan minat Anda." 
        },
        {
          type: "exampleLetter",
          title: "",
          content: `[Nama Lengkap Anda]\n[Alamat Lengkap Anda]\n[Nomor Telepon Anda]\n[Alamat Email Anda]\n\nSingapura, 15 November 2024\n\nPerihal: Lamaran Pekerjaan untuk Posisi Asisten Pemasaran Digital\n\nKepada Yth.\nBapak/Ibu Manajer Sumber Daya Manusia\nPerusahaan Maju Teknologi Pte Ltd\n#10-01, Tech Tower One\nSingapura 123456\n\nDengan hormat,\n\nBerdasarkan informasi lowongan pekerjaan yang saya peroleh dari situs web LinkedIn pada tanggal 12 November 2024, dengan ini saya, Budi Santoso, bermaksud mengajukan lamaran untuk mengisi posisi Asisten Pemasaran Digital di perusahaan yang Bapak/Ibu pimpin. Saya sangat antusias dengan kesempatan ini karena reputasi Perusahaan Maju Teknologi Pte Ltd sebagai pemimpin inovasi di industri teknologi.\n\nSaya adalah seorang lulusan baru dari Universitas Nasional Singapura dengan gelar Sarjana Komunikasi, dengan spesialisasi di bidang Pemasaran Digital dan Media Baru. Selama masa perkuliahan, saya secara aktif terlibat dalam berbagai proyek kampanye digital, di mana saya berhasil mengembangkan pemahaman yang kuat mengenai optimasi mesin pencari (SEO), pemasaran mesin pencari (SEM), manajemen media sosial, serta analisis data untuk strategi pemasaran. Selain itu, saya juga telah menyelesaikan program magang selama tiga bulan di Agensi Kreatif Dinamika sebagai Asisten Media Sosial. Dalam peran tersebut, saya bertanggung jawab atas pengelolaan kalender konten, pembuatan materi visual, dan peningkatan interaksi daring dengan audiens target.\n\nSaya sangat tertarik dengan visi Perusahaan Maju Teknologi Pte Ltd dalam mengembangkan solusi teknologi yang inovatif dan berdaya guna. Saya percaya bahwa kombinasi latar belakang akademis, pengalaman praktis, serta antusiasme saya yang besar terhadap dunia pemasaran digital sejalan dengan kualifikasi yang dibutuhkan untuk posisi ini. Saya dikenal sebagai individu yang proaktif, memiliki kemampuan belajar yang cepat, serta mampu bekerja sama secara efektif dalam tim untuk mencapai tujuan bersama.\n\nTerlampir bersama surat lamaran ini adalah daftar riwayat hidup (CV) saya yang memuat rincian kualifikasi dan pengalaman saya, beserta portofolio singkat hasil karya saya selama magang. Besar harapan saya untuk dapat diberikan kesempatan mengikuti tahap seleksi selanjutnya, termasuk wawancara, agar saya dapat menjelaskan lebih lanjut mengenai potensi dan kontribusi yang dapat saya berikan kepada perusahaan Bapak/Ibu.\n\nAtas perhatian dan kesempatan yang mungkin Bapak/Ibu berikan, saya mengucapkan terima kasih yang sebesar-besarnya.\n\nHormat saya,\n\n(Tanda Tangan)\n\nBudi Santoso`
        },
        { 
          type: "subheading", level: 3, 
          content: "Contoh 8: Surat Permohonan Maaf Resmi (Formal Apology)" 
        },
        { 
          type: "paragraph", 
          content: "<strong>Skenario Ujian:</strong> Klub Anda meminjam peralatan dari laboratorium sekolah dan terlambat mengembalikannya. Sebagai ketua klub, tulislah surat permohonan maaf resmi kepada Kepala Laboratorium. Akui kesalahan, jelaskan penyebabnya (jika perlu dan relevan), dan sampaikan langkah perbaikan." 
        },
        {
          type: "exampleLetter",
          title: "",
          content: `[Nama Klub Anda]\n[Nama Sekolah/Institusi Anda]\n[Alamat Sekolah/Institusi Anda]\n[Singapura Kode Pos Sekolah/Institusi]\n\nSingapura, 18 November 2024\n\nPerihal: Permohonan Maaf atas Keterlambatan Pengembalian Peralatan Gelas Laboratorium Kimia\n\nKepada Yth.\nBapak Dr. Lim Swee Hock\nKepala Laboratorium Kimia\nPoliteknik Singapura\n500 Dover Road\nSingapura 139651\n\nDengan hormat,\n\nKami, atas nama seluruh pengurus dan anggota Klub Sains Politeknik Singapura, dengan penuh penyesalan dan kerendahan hati menulis surat ini untuk menyampaikan permohonan maaf yang tulus dan sebesar-besarnya atas keterlambatan pengembalian beberapa unit peralatan gelas laboratorium kimia. Peralatan tersebut kami pinjam untuk mendukung kelancaran kegiatan eksperimen sains yang telah kami selenggarakan pada hari Jumat, 15 November 2024 lalu.\n\nKami menyadari sepenuhnya bahwa sesuai dengan prosedur standar peminjaman peralatan laboratorium yang berlaku, seluruh peralatan tersebut seharusnya telah kami kembalikan paling lambat pada hari Sabtu, 16 November 2024 pukul 12.00 siang. Keterlambatan ini, yang baru dapat kami penuhi hari ini, disebabkan oleh adanya miskomunikasi internal di antara anggota panitia kami yang bertanggung jawab atas logistik dan pengembalian peralatan. Kami mengakui sepenuhnya kelalaian ini dan sangat menyesali segala ketidaknyamanan atau gangguan yang mungkin ditimbulkan, terutama jika hal ini sampai menghambat jadwal penggunaan laboratorium oleh pihak atau kelompok lain.\n\nSebagai bentuk pertanggungjawaban kami dan komitmen untuk memperbaiki kesalahan ini, kami telah memastikan bahwa semua peralatan gelas yang dipinjam telah kami kembalikan pada hari ini, Senin, 18 November 2024, dalam kondisi yang baik, bersih, dan lengkap seperti semula. Lebih lanjut, kami juga telah melakukan evaluasi internal dan meninjau ulang prosedur operasional standar (SOP) klub kami terkait peminjaman dan pengembalian fasilitas untuk memastikan kejadian serupa tidak akan terulang kembali di masa mendatang. Kami akan lebih berhati-hati, meningkatkan koordinasi internal, dan menetapkan penanggung jawab yang lebih jelas untuk setiap peminjaman fasilitas laboratorium.\n\nBesar harapan kami Bapak berkenan menerima permohonan maaf kami yang tulus ini. Kami sangat menghargai pemahaman, bimbingan, dan kerja sama yang telah diberikan oleh pihak laboratorium selama ini dalam mendukung kegiatan-kegiatan ilmiah klub kami.\n\nAtas perhatian, pengertian, dan kemurahan hati Bapak, kami ucapkan terima kasih yang sebesar-besarnya.\n\nHormat kami,\n\n(Tanda Tangan)\n\n[Nama Ketua Klub]\nKetua Klub Sains\nPoliteknik Singapura`
        },
        { 
          type: "subheading", level: 3, 
          content: "Contoh 9: Surat Izin Tidak Masuk Sekolah dari Orang Tua/Wali" 
        },
        { 
          type: "paragraph", 
          content: "<strong>Skenario Ujian:</strong> Anak Anda sakit dan tidak bisa masuk sekolah hari ini. Tulislah surat izin kepada guru wali kelasnya." 
        },
        {
          type: "exampleLetter",
          title: "",
          content: `[Alamat Rumah Anda]\n[Singapura Kode Pos Anda]\n[Nomor Telepon Anda]\n\nSingapura, 19 November 2024\n\nPerihal: Permohonan Izin Tidak Masuk Sekolah atas Nama [Nama Lengkap Anak]\n\nKepada Yth.\nIbu [Nama Guru Wali Kelas]\nGuru Wali Kelas [Nama Kelas, e.g., Primary 3A]\nSekolah Dasar [Nama Sekolah Dasar, e.g., Clementi Primary School]\n[Alamat Lengkap Sekolah]\nSingapura [Kode Pos Sekolah]\n\nDengan hormat,\n\nYang bertanda tangan di bawah ini:\nNama Orang Tua/Wali : [Nama Lengkap Orang Tua/Wali Anda]\n\nAdalah orang tua/wali dari siswa:\nNama Siswa : [Nama Lengkap Anak Anda]\nKelas : [Kelas Anak Anda, e.g., Primary 3A]\nNomor Induk Siswa : [Nomor Induk Siswa Anak, jika ada/relevan]\n\nDengan ini memberitahukan bahwa anak kami tersebut di atas, [Nama Lengkap Anak Anda], tidak dapat mengikuti kegiatan belajar mengajar di sekolah pada hari ini, Selasa, 19 November 2024, dikarenakan sedang sakit (mengalami demam dan batuk sejak semalam).\n\nSehubungan dengan kondisi kesehatannya tersebut, kami dengan hormat memohon kepada Ibu Guru Wali Kelas untuk dapat memberikan izin tidak masuk sekolah bagi anak kami pada hari ini. Kami akan memastikan anak kami mendapatkan istirahat yang cukup di rumah dan akan berusaha agar ia dapat mengejar materi pelajaran yang tertinggal sesegera mungkin setelah kondisinya pulih. Sebagai informasi tambahan, kami juga telah membawa anak kami berkonsultasi dengan dokter pagi ini, dan surat keterangan dokter akan kami lampirkan atau susulkan apabila diperlukan oleh pihak sekolah.\n\nAtas segala perhatian dan izin yang Ibu berikan, kami mengucapkan terima kasih yang sebesar-besarnya.\n\nHormat saya,\n\n(Tanda Tangan Orang Tua/Wali)\n\n[Nama Lengkap Orang Tua/Wali Anda]`
        },
        { // NEW EXAMPLE 10 - River Pollution & Flood
          type: "subheading", level: 3, 
          content: "Contoh 10: Surat Keluhan dan Usulan mengenai Kondisi Sungai kepada Dinas Terkait" 
        },
        { 
          type: "paragraph", 
          content: "<strong>Skenario Ujian:</strong> Sungai di daerah tempat tinggal Anda kotor dan menyebabkan banjir saat hujan turun. Tulislah surat kepada dinas terkait (misalnya Dinas Lingkungan Hidup atau Dinas Pekerjaan Umum), jelaskan kondisi sungai dan masalah yang sering terjadi, serta berikan saran-saran yang sesuai." 
        },
        {
          type: "exampleLetter",
          title: "",
          content: `[Alamat Lengkap Anda]\n[Singapura Kode Pos Anda]\n\nSingapura, 22 November 2024\n\nPerihal: Keluhan mengenai Kondisi Sungai [Nama Sungai Fiktif, e.g., Ciliwung Kecil] dan Usulan Penanganan Banjir di Wilayah [Nama Wilayah Anda]\n\nKepada Yth.\nBapak/Ibu Kepala Dinas\n[Nama Dinas Terkait, e.g., Dinas Lingkungan Hidup dan Kebersihan / Dinas Pekerjaan Umum dan Penataan Ruang]\nKota Administratif [Nama Kota/Wilayah Administrasi Anda, e.g., Singapura Pusat]\n[Alamat Lengkap Dinas Terkait]\nSingapura [Kode Pos Dinas Terkait]\n\nDengan hormat,\n\nSaya/Kami, [Nama Lengkap Anda atau 'Perwakilan Warga Perumahan XYZ'], yang bertempat tinggal di [Alamat Lengkap Anda/Nama Perumahan], Kelurahan [Nama Kelurahan], Kecamatan [Nama Kecamatan], melalui surat ini ingin menyampaikan keluhan dan keprihatinan yang mendalam mengenai kondisi Sungai [Nama Sungai Fiktif] yang melintasi wilayah kami. Kondisi sungai yang semakin memburuk ini telah berulang kali menyebabkan masalah banjir, khususnya saat musim penghujan tiba.\n\nSelama beberapa tahun terakhir, kami selaku warga telah mengamati dengan prihatin penurunan kualitas Sungai [Nama Sungai Fiktif]. Sungai tersebut kini terlihat semakin dangkal akibat adanya penumpukan sedimen dan dipenuhi oleh berbagai jenis sampah, baik sampah rumah tangga maupun material lain yang diduga berasal dari aktivitas di area hulu. Akibatnya, setiap kali hujan dengan intensitas sedang hingga tinggi turun selama lebih dari dua jam, air sungai tidak mampu lagi menampung debit air sehingga meluap dan menyebabkan banjir di permukiman kami, terutama di area [Sebutkan Area Spesifik yang Terdampak Banjir, e.g., RT 01 dan RT 02 RW 05]. Banjir ini tidak hanya merusak properti dan infrastruktur jalan lingkungan, tetapi juga secara signifikan mengganggu aktivitas sehari-hari warga, menghambat akses transportasi, serta menimbulkan potensi risiko penyebaran penyakit.\n\nOleh karena itu, kami dengan sangat memohon agar pihak Dinas [Nama Dinas Terkait] dapat segera mengambil tindakan nyata dan komprehensif untuk mengatasi permasalahan ini. Sebagai langkah awal, kami mengusulkan agar dilakukan program pengerukan sedimen dan normalisasi alur Sungai [Nama Sungai Fiktif] secara berkala dan terjadwal. Kedua, kami berharap adanya pemasangan jaring atau perangkap sampah di beberapa titik strategis sepanjang aliran sungai, khususnya sebelum memasuki area permukiman kami, serta peningkatan frekuensi pengangkutan sampah dari tempat-tempat pembuangan sementara di sekitar sungai. Ketiga, kami juga menyarankan agar dilakukan sosialisasi yang lebih intensif kepada masyarakat mengenai pentingnya menjaga kebersihan sungai dan penegakan aturan yang lebih tegas terhadap pelaku pembuangan sampah atau limbah sembarangan ke sungai. Kami, sebagai warga, juga siap untuk berpartisipasi aktif dalam kegiatan gotong royong pembersihan sungai apabila difasilitasi dan dikoordinasikan oleh pihak Dinas.\n\nBesar harapan kami agar keluhan dan usulan ini mendapatkan perhatian serius dan tindak lanjut yang konkret dari Bapak/Ibu. Kami percaya bahwa dengan kerja sama yang baik antara pemerintah dan masyarakat, masalah ini dapat diatasi demi terciptanya lingkungan yang lebih bersih, sehat, aman, dan bebas dari ancaman banjir. Kami juga bersedia untuk bertemu dan berdiskusi lebih lanjut untuk memberikan informasi tambahan yang mungkin diperlukan.\n\nAtas perhatian, kerja sama, dan kebijaksanaan Bapak/Ibu, kami mengucapkan terima kasih yang sebesar-besarnya.\n\nHormat kami,\n\n(Tanda Tangan)\n\n[Nama Lengkap Anda]\n(Mewakili Warga [Nama Perumahan/Wilayah Anda])`
        }
      ]
    },
    
    // SECTION VI ("Meretas Ujian" - Enhanced)
    {
      id: "meretas-ujian",
      title: 'VI. "Meretas" Ujian – Strategi Utama',
      elements: [
        { type: "subheading", level: 3, content: "Analisis Soal Ujian (Exam Question Analysis - P.A.T. + Konteks):" },
        {
          type: "list",
          items: [
            "<strong>P</strong>urpose (Tujuan): Identifikasi dengan jelas APA tujuan utama surat Anda. Apakah untuk mengeluh, mengusulkan, memohon izin, melamar pekerjaan, mengundang, berterima kasih, meminta maaf, atau tujuan lainnya? Tujuan akan sangat memengaruhi pilihan kata dan struktur utama surat.",
            "<strong>A</strong>udience (Penerima): Kepada SIAPA Anda menulis? Kenali jabatan (e.g., Kepala Sekolah, Manajer Dewan Kota, Direktur Perusahaan, Tokoh Masyarakat) dan institusinya. Ini krusial untuk menentukan tingkat formalitas, sapaan yang tepat, dan argumen yang relevan bagi mereka.",
            "<strong>T</strong>one (Nada): Bagaimana nada surat Anda seharusnya? (e.g., formal dan tegas namun sopan untuk keluhan; hormat, suportif, dan konstruktif untuk masukan; hormat dan persuasif untuk permohonan atau undangan; tulus untuk ucapan terima kasih; penuh penyesalan dan bertanggung jawab untuk permohonan maaf).",
            "<strong>Konteks & Poin Kunci:</strong> Informasi apa saja yang diberikan dalam soal ujian yang WAJIB Anda masukkan? (e.g., masalah spesifik yang harus dikeluhkan, detail acara yang diusulkan, kualifikasi yang harus ditonjolkan, insiden yang perlu dimaafkan). Garis bawahi poin-poin ini.",
            "<strong>Adaptasi, Bukan Menghafal:</strong> Gunakan \"Kerangka Induk\" (Bagian II) dan \"Bank Frasa\" (Bagian III) sebagai dasar. Jangan menghafal contoh surat secara keseluruhan, tetapi pahami polanya dan adaptasikan dengan kreatif sesuai kebutuhan soal."
          ]
        },
        { type: "paragraph", content: "<strong>Struktur adalah Fondasi:</strong> Ikuti format surat resmi dengan teliti. Setiap komponen (kop surat jika ada, tanggal, perihal, alamat tujuan, salam, isi, penutup, tanda tangan) memiliki fungsinya dan harus ditempatkan dengan benar." },
        { type: "paragraph", content: "<strong>Paragraf yang Kohesif:</strong> Susun semua ide dan informasi menjadi paragraf yang logis dan mengalir. Setiap paragraf idealnya membahas satu gagasan utama. Gunakan kata penghubung (konjungsi) antar kalimat dan antar paragraf untuk kelancaran." },
        { type: "paragraph", content: "<strong>Bahasa Baku, Formal, dan Efektif:</strong> Hindari bahasa sehari-hari, singkatan tidak resmi (kecuali yang sangat umum seperti Yth.), atau bahasa gaul. Gunakan sapaan hormat (Bapak/Ibu). Pilih kosakata yang tepat, jelas, dan tidak bertele-tele." },
        { type: "paragraph", content: "<strong>Spesifik dan Konkret (Sesuai Soal):</strong> Jika soal memberikan detail (nama fiktif, tempat, tanggal, situasi), gunakan itu untuk membuat surat Anda relevan dan meyakinkan. Jika tidak, gunakan placeholder yang logis atau istilah umum seperti yang disarankan di Bagian VII." },
        { type: "paragraph", content: "<strong>Manajemen Waktu:</strong> Alokasikan waktu ujian Anda dengan bijak: sekitar 5-10 menit untuk merancang kerangka dan poin-poin penting, 25-35 menit untuk menulis draf surat, dan 5-10 menit terakhir untuk memeriksa ulang (proofread) tata bahasa, ejaan, tanda baca, dan kelengkapan semua komponen surat." }
      ]
    },

    // SECTION VII (Tip Tambahan - Enhanced)
    {
      id: "tip-tambahan",
      title: "VII. Tip Tambahan dan Adaptasi Ujian",
      elements: [
        { type: "subheading", level: 3, content: "Contoh Penerima Surat Umum di Konteks Urban/Lokal (Singapura):" },
        {
          type: "list",
          items: [
            "Manajer Dewan Kota (Town Council Manager) - untuk isu perumahan umum, fasilitas publik.",
            "Badan Perumahan dan Pembangunan (HDB) - untuk isu terkait unit perumahan/apartemen.",
            "Otoritas Transportasi Darat (LTA) - untuk isu transportasi umum, jalan raya.",
            "Badan Lingkungan Hidup Nasional (NEA) - untuk isu kebersihan, demam berdarah, pedagang kaki lima.",
            "Kepala Sekolah (School Principals) - untuk urusan sekolah.",
            "Manajer Pusat Komunitas (Community Club/Centre Managers) - untuk kegiatan komunitas.",
            "Anggota Parlemen (MP) - untuk isu tingkat daerah pemilihan yang lebih luas."
          ]
        },
        { type: "subheading", level: 3, content: "Contoh Topik Surat yang Relevan (Umum dan Kontekstual):" },
        {
          type: "list",
          items: [
            "Fasilitas umum (lift rusak, kebersihan koridor, kurangnya tempat parkir sepeda).",
            "Masalah lingkungan (daur ulang, sampah berserakan, polusi suara, kondisi sungai).",
            "Kegiatan sekolah/komunitas (permohonan izin, pengajuan dana, undangan).",
            "Usulan untuk meningkatkan layanan publik atau program komunitas.",
            "Masukan/saran terhadap rencana atau kebijakan baru suatu institusi (e.g., kurikulum sekolah).",
            "Keluhan mengenai layanan atau kondisi tertentu.",
            "Ucapan terima kasih atas bantuan atau dukungan.",
            "Lamaran pekerjaan (jika skenario memungkinkan).",
            "Permohonan maaf atas suatu insiden."
          ]
        },
        { 
          type: "subheading",
          level: 3,
          content: "Mengadaptasi Contoh dan Kerangka untuk Ujian (Adapting Examples and Skeleton for Exams):"
        },
        {
          type: "important",
          content: "<strong>SANGAT PENTING UNTUK UJIAN:</strong> Jika soal ujian TIDAK memberikan nama spesifik orang, organisasi, atau perusahaan, JANGAN mengarang nama yang terlalu detail (misalnya, nama perusahaan dengan 'Pte Ltd' atau 'PT'). Gunakan istilah umum yang logis atau placeholder."
        },
        {
          type: "list",
          items: [
            "<strong>Untuk nama perusahaan/organisasi:</strong> Jika tidak diberikan, gunakan istilah umum seperti: \"Pimpinan Perusahaan Maju Jaya\", \"Manajer Departemen Pelayanan Pelanggan\", \"Direktur Yayasan Kasih Bunda\", \"Kepala Bagian Personalia Perusahaan Sejahtera\", \"Kepala Dinas Lingkungan Hidup Kota Sejahtera\". Jika merujuk pada sekolah anak Anda seperti pada Contoh 6 atau 9, gunakan \"Kepala Sekolah [Nama Sekolah Anak Anda jika diketahui dari soal, jika tidak cukup 'Sekolah Menengah Pertama tempat anak saya belajar']\" atau \"Guru Wali Kelas [Kelas anak Anda] SMP [Nama Sekolah jika ada]\".",
            "<strong>Untuk nama orang (penerima):</strong> Jika tidak ada nama, gunakan jabatan generik seperti \"Yth. Bapak Manajer Pemasaran\", \"Yth. Ibu Kepala Sekolah\", atau \"Yth. Bapak/Ibu Pimpinan [Nama Institusi Umum dari Soal, misal: Dewan Kota Wilayah Timur, Dinas Kebersihan Kota]\".",
            "<strong>Untuk nama Anda (pengirim):</strong> Jika soal meminta Anda berperan sebagai seseorang dengan nama fiktif, gunakan nama itu. Jika tidak, Anda bisa menggunakan nama samaran yang umum (misal: Budi Pekerti, Siti Aminah) atau mengikuti instruksi spesifik pengawas ujian mengenai identitas pada lembar jawaban.",
            "<strong>Kunci Utama:</strong> Fokus pada pemahaman **struktur baku, format surat resmi, dan penggunaan frasa-frasa formal** yang ada di \"Bank Frasa\". Contoh surat adalah ilustrasi penerapan, bukan untuk dihafal kata per kata. Adaptasikan detail (masalah, usulan, tanggal acara, poin masukan) sesuai skenario soal ujian."
          ]
        },
        { type: "paragraph", content: "<strong>Hindari Bahasa Gaul atau Non-Formal:</strong> Pertahankan tingkat formalitas yang tinggi." },
        { type: "paragraph", content: "<strong>Kejelasan Lebih Penting Daripada Kerumitan:</strong> Kalimat yang ringkas, jelas, dan benar secara tata bahasa lebih baik daripada kalimat yang panjang dan kompleks tetapi berpotensi salah." },
        { type: "paragraph", content: "<strong>Periksa Kembali (Proofread):</strong> Selalu alokasikan waktu untuk memeriksa tata bahasa, ejaan, tanda baca, dan kelengkapan komponen surat sebelum waktu ujian berakhir." },
        { type: "paragraph", content: "<strong>Latihan, Latihan, Latihan!</strong> Tulis ulang contoh-contoh surat ini dengan skenario berbeda, atau buat surat berdasarkan topik-topik umum menggunakan kerangka yang disediakan." }
      ]
    },
    // SECTION VIII (Penggunaan Peribahasa - Remains as is)
    {
      id: "peribahasa",
      title: "VIII. Penggunaan Peribahasa yang Sesuai (Appropriate Use of Proverbs)",
      elements: [
        { type: "paragraph", content: "Menggunakan peribahasa yang tepat dapat memperkaya dan memperindah bahasa surat resmi Anda, serta menunjukkan kedalaman pemahaman budaya. Namun, penggunaannya harus relevan dengan konteks dan tidak dipaksakan. Berikut beberapa contoh peribahasa yang sering digunakan dan bisa diadaptasi:" },
        {
          type: "subheading",
          level: 4,
          content: "1. Berat sama dipikul, ringan sama dijinjing."
        },
        { type: "paragraph", content: "<strong>Arti (Meaning):</strong> Kesulitan dan kesenangan ditanggung bersama; menekankan pentingnya solidaritas, kerja sama, dan gotong royong dalam menghadapi suka maupun duka. (Hardships and joys are borne together; emphasizes the importance of solidarity, cooperation, and mutual help in facing both good and bad times.)" },
        { type: "paragraph", content: "<strong>Konteks Penggunaan (Contextual Use):</strong> Sangat cocok untuk surat yang mengusulkan kerja sama komunitas, menggambarkan semangat kolaborasi dalam sebuah proyek, atau mengajak partisipasi untuk mengatasi masalah bersama." },
        { type: "example", content: `Contoh Kalimat (Example Sentence): "Kami percaya, dengan berpegang pada prinsip <strong>berat sama dipikul, ringan sama dijinjing</strong>, permasalahan sampah di lingkungan kita ini pasti dapat kita atasi secara efektif."` },
        {
          type: "subheading",
          level: 4,
          content: "2. Di mana ada kemauan, di situ ada jalan."
        },
        { type: "paragraph", content: "<strong>Arti (Meaning):</strong> Jika ada niat, tekad, dan usaha yang kuat, pasti akan ditemukan cara atau solusi untuk mencapai tujuan atau mengatasi masalah, meskipun terlihat sulit. (If there is a strong will, determination, and effort, a way or solution will surely be found to achieve a goal or overcome a problem, even if it seems difficult.)" },
        { type: "paragraph", content: "<strong>Konteks Penggunaan (Contextual Use):</strong> Dapat digunakan untuk memperkuat sebuah usulan, menunjukkan optimisme dalam menghadapi tantangan, atau meyakinkan penerima surat bahwa suatu tujuan dapat dicapai." },
        { type: "example", content: `Contoh Kalimat (Example Sentence): "Meskipun sumber daya yang kami miliki saat ini terbatas, kami yakin bahwa dengan semangat <strong>di mana ada kemauan, di situ ada jalan</strong>, program pemberdayaan pemuda di wilayah kita ini dapat berjalan sukses."` },
        {
          type: "subheading",
          level: 4,
          content: "3. Bagai aur dengan tebing."
        },
        { type: "paragraph", content: "<strong>Arti (Meaning):</strong> Menggambarkan hubungan yang sangat erat, saling membutuhkan, dan saling mendukung antara dua pihak atau lebih. Keduanya tidak dapat dipisahkan dan saling menguatkan. (Describes a very close, mutually dependent, and supportive relationship between two or more parties. They are inseparable and strengthen each other.)" },
        { type: "paragraph", content: "<strong>Konteks Penggunaan (Contextual Use):</strong> Bisa digunakan untuk menggambarkan pentingnya sinergi atau kemitraan (misalnya, antara sekolah dengan orang tua murid, pemerintah dengan masyarakat, atau antar lembaga)." },
        { type: "example", content: `Contoh Kalimat (Example Sentence): "Kerja sama yang erat antara pihak sekolah dan komite orang tua murid, yang <strong>bagai aur dengan tebing</strong>, sangatlah esensial demi tercapainya kemajuan pendidikan anak-anak kita."` },
        {
          type: "subheading",
          level: 4,
          content: "4. Pucuk dicinta ulam pun tiba."
        },
        { type: "paragraph", content: "<strong>Arti (Meaning):</strong> Mendapatkan sesuatu yang lebih baik atau lebih banyak dari yang diharapkan atau dicita-citakan; suatu kebetulan yang sangat menguntungkan dan menyenangkan. (Getting something better or more than what was hoped for or desired; a very fortunate and pleasant coincidence.)" },
        { type: "paragraph", content: "<strong>Konteks Penggunaan (Contextual Use):</strong> Cocok untuk surat ucapan terima kasih di mana bantuan atau respons yang diterima melebihi ekspektasi, atau ketika sebuah usulan yang diajukan diterima dengan sangat baik dan bahkan mendapat dukungan tambahan." },
        { type: "example", content: `Contoh Kalimat (Example Sentence): "Dukungan tambahan berupa fasilitas dan pendanaan yang Bapak berikan di luar permohonan awal kami sungguh <strong>bagai pucuk dicinta ulam pun tiba</strong>, dan ini sangat membantu kelancaran pelaksanaan kegiatan kami."` },
        {
          type: "subheading",
          level: 4,
          content: "5. Bulat air karena pembuluh, bulat kata karena mufakat."
        },
        { type: "paragraph", content: "<strong>Arti (Meaning):</strong> Kesepakatan atau keputusan bersama dicapai melalui proses musyawarah (diskusi) untuk mencapai persetujuan semua pihak yang terlibat. Menekankan pentingnya konsensus. (Agreement or joint decisions are reached through deliberation (discussion) to achieve the consent of all involved parties. Emphasizes the importance of consensus.)" },
        { type: "paragraph", content: "<strong>Konteks Penggunaan (Contextual Use):</strong> Sesuai untuk surat yang menekankan hasil dari sebuah diskusi, rapat, atau pertemuan yang telah berhasil mencapai konsensus atau kesepakatan bersama." },
        { type: "example", content: `Contoh Kalimat (Example Sentence): "Setelah melalui diskusi yang cukup panjang dan mempertimbangkan berbagai masukan, akhirnya kami berhasil mencapai keputusan ini bersama-sama, karena kami meyakini bahwa <strong>bulat air karena pembuluh, bulat kata karena mufakat</strong>, akan menghasilkan solusi terbaik bagi semua pihak."` },
        { type: "important", content: "Catatan Penting tentang Peribahasa (Important Note on Proverbs): Gunakan secara selektif dan pastikan peribahasa tersebut benar-benar sesuai dengan konteks dan tujuan surat Anda. Penggunaan yang tidak tepat atau berlebihan justru dapat mengurangi kualitas dan formalitas surat resmi Anda. (Use selectively and ensure the proverb truly fits the context and purpose of your letter. Inappropriate or excessive use can actually detract from the quality and formality of your formal letter.)" }
      ]
    }
  ]
};
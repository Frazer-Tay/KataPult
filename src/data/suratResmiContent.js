// src/data/suratResmiContent.js

export const suratResmiGuide = {
  mainTitle: "Panduan Lengkap Menulis Surat Resmi Bahasa Indonesia (Kontekstual Singapura)",
  introduction: "Surat resmi dalam Bahasa Indonesia memiliki struktur dan gaya bahasa yang baku. Memahaminya akan sangat membantu dalam ujian. Berikut adalah panduan lengkap:",
  
  tableOfContents: [
    { id: "struktur-penting", title: "I. Struktur dan Format Penting" },
    { id: "kerangka-induk", title: 'II. "Kerangka Induk" Surat Resmi (Format Mudah Diproses)' },
    { id: "bank-frasa", title: "III. Bank Frasa (Diurutkan berdasarkan Kegunaan Umum)" }, // Updated title
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
        { type: "paragraph", content: "--- AWAL SURAT ---" },
        { type: "preformatted", content: 
`[Tempat Anda Menulis, e.g., Singapura], [Tanggal Bulan Tahun, e.g., 28 Oktober 2024]

Perihal: [Pokok Utama Surat Anda Secara Ringkas dan Jelas, contoh: Keluhan Fasilitas Rusak, Permohonan Izin Acara, Usulan Peningkatan Layanan]

Kepada Yth.
Bapak/Ibu [Jabatan Penerima yang Tepat, e.g., Manajer, Kepala Sekolah, Direktur]
[Nama Institusi/Organisasi Penerima, e.g., Dewan Kota Wilayah Sentosa, SMA Tunas Bangsa, Perusahaan Teknologi Cemerlang]
[Alamat Lengkap Institusi Penerima, e.g., #05-01 Gedung Merah Putih, 123 Jalan Kemerdekaan]
[Singapura Kode Pos, e.g., Singapura 123456]

Dengan hormat,`
        },
        
        { type: "subheading", level: 4, content: "Paragraf 1: Pengenalan Diri dan Tujuan Utama" },
        { type: "paragraph", content: "<em>(Introduction of Self and Main Purpose)</em>"},
        { type: "list", items: [
            "Siapa Anda? (e.g., siswa, penghuni, ketua klub).",
            "Apa tujuan utama Anda menulis surat ini? Sampaikan dengan jelas (e.g., mengeluh, memohon izin, mengusulkan sesuatu)." ,
            "<em>(Optional)</em> Berikan apresiasi singkat jika relevan."
        ]},
        { type: "paragraph", isQuote: true, content: `Saya/Kami, [Nama Lengkap Anda/Nama Kelompok], adalah seorang/selaku [Identitas Anda, e.g., siswa SMA [Nama Sekolah] kelas [Kelas Anda], penghuni Blok [Nomor Blok] [Nama Kawasan], sekretaris Klub Lingkungan Sekolah [Nama Sekolah]]. Melalui surat ini, saya/kami bermaksud untuk [Tujuan Utama Surat Secara Jelas, e.g., menyampaikan keluhan mengenai fasilitas [Nama Fasilitas] yang rusak di [Lokasi Spesifik], yaitu [Detail Kerusakan]; atau memohon izin dari Bapak/Ibu untuk dapat mengadakan kegiatan [Nama Kegiatan] atas nama [Nama Klub/Organisasi] pada [Tanggal dan Waktu Usulan]; atau menawarkan beberapa usulan konstruktif untuk mengatasi masalah [Masalah Spesifik] di lingkungan [Lokasi Spesifik]]. <em>(Opsional)</em> Saya/Kami sangat menghargai berbagai upaya yang telah dilakukan oleh pihak [Nama Institusi Penerima] dalam [Bidang Terkait, e.g., menjaga kebersihan lingkungan, mendukung kegiatan kesiswaan].` },

        { type: "subheading", level: 4, content: "Paragraf 2: Penjelasan Detail Masalah / Latar Belakang Usulan / Rincian Permohonan" },
        { type: "paragraph", content: "<em>(Detailed Problem Statement / Background of Proposal / Details of Request)</em>"},
        { type: "list", items: [
            "Jelaskan situasi, masalah, atau latar belakang secara rinci.",
            "Berikan konteks: Kapan? Di mana? Siapa yang terdampak? Mengapa ini penting?",
            "Gunakan bahasa formal dan hindari poin bernomor."
        ]},
        { type: "paragraph", content: "<em>Contoh untuk Keluhan:</em>" },
        { type: "paragraph", isQuote: true, content: `"Belakangan ini, kami sebagai penghuni [Nama Kawasan/Blok] sering kali menghadapi masalah [Masalah Spesifik dengan Detail, e.g., lift di Blok kami, khususnya Lift A, yang sering tidak berfungsi dengan baik, terutama pada jam-jam sibuk pagi antara pukul 07.00-09.00 dan sore hari antara pukul 17.00-19.00 / penumpukan sampah di sekitar tempat pembuangan sementara yang terletak di dekat Blok [Nomor Blok], yang menimbulkan bau tidak sedap dan berpotensi menarik hama seperti tikus dan kecoa]. Keadaan ini tentu saja menimbulkan [Dampak Negatif Spesifik, e.g., kesulitan mobilitas bagi warga lanjut usia dan penyandang disabilitas, ketidaknyamanan signifikan bagi seluruh penghuni, serta potensi risiko penyebaran penyakit] bagi para penghuni."` },
        { type: "paragraph", content: "<em>Contoh untuk Usulan/Permohonan:</em>" },
        { type: "paragraph", isQuote: true, content: `"Melihat tingginya antusiasme siswa terhadap [Bidang Minat, e.g., pelestarian lingkungan hidup dan pentingnya daur ulang], serta adanya kebutuhan nyata untuk [Tujuan Spesifik, e.g., meningkatkan kesadaran akan praktik 3R (Reduce, Reuse, Recycle) di lingkungan sekolah], Klub [Nama Klub Anda] merasa terpanggil dan bertanggung jawab untuk mengadakan sebuah [Jenis Kegiatan, e.g., lokakarya interaktif dan kampanye kesadaran] yang kami beri nama '[Nama Kegiatan yang Menarik]'."` },

        { type: "subheading", level: 4, content: "Paragraf 3 (dan seterusnya jika perlu): Usulan Solusi / Permintaan Spesifik / Argumen Pendukung" },
        { type: "paragraph", content: "<em>(Detailed Proposals / Specific Requests / Supporting Arguments)</em>"},
        { type: "list", items: [
            "Sampaikan usulan solusi, permintaan, atau argumen secara logis dan terstruktur.",
            "Jika ada beberapa poin, hubungkan menjadi kalimat yang mengalir (gunakan kata penghubung dari Bank Frasa).",
            "Jelaskan mengapa usulan/permintaan Anda penting atau bermanfaat.",
            "Jika ada, sebutkan lampiran (e.g., proposal, anggaran)."
        ]},
        { type: "paragraph", content: "<em>Contoh untuk Usulan Solusi:</em>" },
        { type: "paragraph", isQuote: true, content: `"Sebagai langkah konkret untuk menangani isu tersebut, kami ingin mengusulkan agar pihak [Nama Institusi Penerima] dapat [Usulan Pertama yang Jelas, e.g., melakukan pemeriksaan menyeluruh dan jadwal pemeliharaan preventif yang lebih rutin untuk Lift A di Blok kami, misalnya setiap dua minggu sekali]. Selain itu, kami juga berpendapat bahwa penambahan [Usulan Kedua yang Jelas, e.g., dua unit tempat sampah daur ulang yang terpilah (kertas, plastik, kaca) di setiap lobi lantai dasar blok hunian] akan sangat membantu dalam mendorong partisipasi aktif penghuni dalam praktik daur ulang. Upaya-upaya ini kami yakini tidak hanya akan meningkatkan kenyamanan dan kualitas hidup penghuni, tetapi juga menumbuhkan rasa tanggung jawab kolektif terhadap kebersihan dan kelestarian lingkungan kita bersama."` },
        { type: "paragraph", content: "<em>Contoh untuk Permintaan:</em>" },
        { type: "paragraph", isQuote: true, content: `"Sehubungan dengan rencana kegiatan lokakarya tersebut, kami dengan ini secara resmi memohon izin dari Bapak/Ibu Kepala Sekolah untuk [Permintaan Spesifik dan Detail, e.g., menggunakan fasilitas Aula Serbaguna sekolah beserta sistem tata suaranya pada hari Sabtu, tanggal [Tanggal Pelaksanaan], dari pukul [Waktu Mulai] hingga [Waktu Selesai]]. Kami juga berharap mendapatkan dukungan berupa [Dukungan Lain Jika Ada, e.g., peminjaman satu unit proyektor LCD dan layar, serta dispensasi bagi anggota panitia untuk melakukan persiapan satu jam sebelum acara dimulai]. Untuk rincian lebih lanjut mengenai anggaran dan susunan acara, telah kami lampirkan proposal kegiatan bersama surat ini."` },
        
        { type: "subheading", level: 4, content: "Paragraf Penutup: Penegasan Harapan, Kesediaan untuk Diskusi, dan Ucapan Terima Kasih" },
        { type: "paragraph", content: "<em>(Closing Statement, Willingness to Discuss, and Expression of Thanks)</em>"},
        { type: "list", items: [
            "Sampaikan kembali harapan Anda secara ringkas.",
            "Nyatakan kesediaan untuk berdiskusi lebih lanjut.",
            "Ucapkan terima kasih atas perhatian dan kerja sama."
        ]},
        { type: "paragraph", isQuote: true, content: `Demikianlah [Jenis Surat: keluhan/usulan/permohonan/undangan] ini saya/kami sampaikan dengan harapan dapat menjadi bahan pertimbangan yang positif bagi Bapak/Ibu. Besar harapan saya/kami agar Bapak/Ibu sudi [Tindakan yang Diharapkan Secara Spesifik dan Sopan – e.g., mengambil tindakan perbaikan yang diperlukan secepatnya, menyetujui permohonan izin kegiatan kami, mempertimbangkan dengan saksama usulan yang telah kami kemukakan, atau berkenan menerima undangan kami]. Kami sangat terbuka dan bersedia untuk bertemu guna mendiskusikan hal ini lebih lanjut pada waktu yang Bapak/Ibu tentukan. Atas segala perhatian, kerja sama, dan kebijaksanaan Bapak/Ibu, saya/kami haturkan terima kasih yang sebesar-besarnya.`},

        { type: "paragraph", content: "--- AKHIR SURAT ---" },
        { type: "preformatted", content: `Hormat saya,\n(atau Hormat kami, jika mewakili kelompok)\n\n(Area untuk Tanda Tangan Anda)\n\n[Nama Lengkap Anda]\n[Jabatan/Afiliasi Anda, jika relevan, e.g., Siswa Kelas X Unggulan, Ketua Klub Daur Ulang, Penghuni Unit #XX-XXX]` }
      ]
    },

    // SECTION III (Bank Frasa - REORGANIZED for exam-smart learning)
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
            "Menindaklanjuti pembicaraan/surat kami sebelumnya tanggal [tanggal], ... (Following up on our previous conversation/letter dated [date], ...)"
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
            "Kami memahami bahwa [pihak penerima] mungkin memiliki banyak prioritas, namun isu ini mendesak untuk ditangani karena... (We understand that [recipient] may have many priorities, but this issue is urgent to address because...)"
          ]
        },

        { type: "subheading", level: 3, content: "C. Mengemukakan Usulan/Permintaan (Making Suggestions/Requests):" },
        { type: "paragraph", content: "<em>Gunakan kata penghubung untuk alur yang baik. Mulai dengan usulan paling penting:</em>"},
        {
          type: "list",
          items: [
            "Oleh karena itu, kami dengan hormat memohon agar Bapak/Ibu sudi [permintaan spesifik]. (Therefore, we respectfully request that you be willing to [specific request].)",
            "Sebagai langkah awal yang konstruktif, kami mengusulkan agar... (As a constructive initial step, we propose that...)",
            "Selain itu, kami juga berpendapat bahwa implementasi [usulan lain] akan sangat bermanfaat. (Furthermore, we are also of the opinion that the implementation of [another proposal] would be very beneficial.)",
            "Selanjutnya, kami melihat adanya kebutuhan mendesak untuk... (Subsequently, we see an urgent need to...)",
            "Di samping itu, kami meyakini bahwa tindakan untuk [ide lain] juga patut dipertimbangkan sebagai solusi alternatif yang efektif. (Additionally, we believe that action for [another idea] should also be considered as an effective alternative solution.)",
            "Kami berharap pihak Bapak/Ibu dapat mempertimbangkan untuk [tindakan yang diminta]. (We hope your party can consider to [requested action].)",
            "Akan sangat kami hargai apabila [permintaan/harapan]. (We would greatly appreciate it if [request/hope].)",
            "Untuk mendukung usulan ini, kami melampirkan [dokumen pendukung, misal: proposal, rincian anggaran]. (To support this proposal, we attach [supporting documents, e.g., proposal, budget details].)"
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
            "Sekiranya diperlukan, kami bersedia untuk [tawaran bantuan spesifik, misal: menyediakan data tambahan, membantu sosialisasi]. (If needed, we are willing to [specific offer of help, e.g., provide additional data, assist in socialization].)",
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
            "Mohon kiranya Bapak/Ibu dapat memberikan respons atas surat ini sebelum tanggal [tanggal spesifik, jika ada]. (We kindly request that you provide a response to this letter before [specific date, if any].)"
            
          ]
        },

        { type: "subheading", level: 3, content: "H. Penutup & Menyatakan Harapan (Closing & Expressing Hope):" },
        { type: "paragraph", content: "<em>Frasa standar dan sopan untuk mengakhiri surat:</em>"},
        {
          type: "list",
          items: [
            "Demikianlah surat ini saya/kami sampaikan dengan harapan dapat menjadi bahan pertimbangan yang berharga. (Thus, I/we submit this letter with the hope that it can be valuable consideration.)",
            "Besar harapan saya/kami agar Bapak/Ibu dapat mempertimbangkan usulan/permohonan ini dengan arif dan bijaksana. (It is my/our great hope that you will consider this proposal/request wisely and judiciously.)",
            "Atas segala perhatian, kerja sama, dan waktu yang Bapak/Ibu luangkan, saya/kami haturkan terima kasih yang sebesar-besarnya. (For all the attention, cooperation, and time you have devoted, I/we express our deepest gratitude.)",
            "Kami sangat menantikan kabar baik dan tanggapan positif dari pihak Bapak/Ibu. (We eagerly await good news and a positive response from you.)",
            "Semoga Bapak/Ibu dapat memberikan perhatian yang semestinya dan solusi yang terbaik terhadap permasalahan ini. (Hopefully, you can give due attention and the best solution to this problem.)"
          ]
        },

        { type: "subheading", level: 3, content: "I. Menulis Surat Lamaran Pekerjaan (Writing a Job Application Letter):" },
        { type: "paragraph", content: "<em>Frasa kunci untuk surat lamaran:</em>"},
        {
          type: "list",
          items: [
            "Berdasarkan informasi lowongan pekerjaan yang saya peroleh dari [sumber informasi, e.g., situs web perusahaan, surat kabar Harian Kompas tanggal ...], saya bermaksud mengajukan lamaran untuk posisi [Nama Posisi].",
            "Saya adalah seorang lulusan [Gelar, e.g., Sarjana Ekonomi] dari [Nama Universitas/Institusi] dengan spesialisasi di bidang [Bidang Studi].",
            "Saya memiliki kualifikasi dan pengalaman yang relevan dengan posisi yang ditawarkan, khususnya dalam [sebutkan 1-2 kualifikasi/pengalaman kunci].",
            "Selama [masa studi/pengalaman kerja sebelumnya di PT ABC], saya berhasil [sebutkan pencapaian konkret atau keterampilan yang dikembangkan].",
            "Saya sangat antusias untuk dapat berkontribusi pada [Nama Perusahaan] dan percaya bahwa keahlian saya di bidang [bidang keahlian] akan menjadi aset berharga bagi tim Bapak/Ibu.",
            "Terlampir bersama surat ini adalah daftar riwayat hidup (CV) saya dan dokumen pendukung lainnya untuk menjadi bahan pertimbangan Bapak/Ibu.",
            "Besar harapan saya untuk dapat diberikan kesempatan mengikuti tahap seleksi selanjutnya, termasuk wawancara, untuk menjelaskan lebih lanjut mengenai kompetensi saya."
          ]
        },

        { type: "subheading", level: 3, content: "J. Menulis Surat Permohonan Maaf (Writing a Letter of Apology):" },
        { type: "paragraph", content: "<em>Frasa penting untuk menyampaikan penyesalan dan tanggung jawab:</em>"},
        {
          type: "list",
          items: [
            "Dengan penuh penyesalan, kami menulis surat ini untuk menyampaikan permohonan maaf yang sebesar-besarnya atas [kejadian/kesalahan spesifik].",
            "Kami menyadari sepenuhnya kekeliruan/kelalaian yang telah terjadi pada [tanggal/saat kejadian] yang mengakibatkan [dampak negatif].",
            "Kami bertanggung jawab penuh atas insiden tersebut dan memahami sepenuhnya ketidaknyamanan/kerugian yang mungkin ditimbulkan.",
            "Sebagai bentuk itikad baik dan tanggung jawab kami, kami bersedia untuk [tindakan perbaikan/kompensasi yang ditawarkan, e.g., memperbaiki kerusakan, memberikan kompensasi yang layak].",
            "Kami telah mengambil langkah-langkah korektif internal untuk memastikan kejadian serupa tidak terulang kembali di masa mendatang, termasuk [sebutkan langkah spesifik jika relevan].",
            "Kami berharap Bapak/Ibu berkenan menerima permohonan maaf kami yang tulus ini dan memberikan kami kesempatan untuk memperbaiki keadaan serta memulihkan kepercayaan."
          ]
        },
        
        { type: "subheading", level: 3, content: "K. Menulis Surat Izin (Writing a Letter of Permission/Absence):" },
        { type: "paragraph", content: "<em>Frasa standar untuk surat izin (misalnya, izin tidak masuk sekolah):</em>"},
        {
          type: "list",
          items: [
            "Dengan hormat, yang bertanda tangan di bawah ini, saya [Nama Anda], orang tua/wali dari siswa bernama [Nama Siswa], kelas [Kelas], dengan ini memberitahukan bahwa anak kami tidak dapat mengikuti kegiatan belajar di sekolah pada...",
            "...hari [Nama Hari], tanggal [Tanggal Lengkap], dikarenakan [alasan singkat dan jelas, e.g., sakit (demam dan batuk), ada urusan keluarga yang sangat mendesak dan tidak dapat ditunda].",
            "Sehubungan dengan hal tersebut, kami dengan hormat memohon izin kepada Bapak/Ibu Kepala Sekolah (atau Bapak/Ibu Guru Wali Kelas) agar anak kami dapat diberikan dispensasi untuk tidak hadir.",
            "Sebagai bukti/informasi pendukung, terlampir [jika ada, e.g., surat keterangan dokter dari Klinik Sehat Selalu].",
            "Kami akan memastikan anak kami dapat mengejar ketertinggalan materi pelajaran sesegera mungkin setelah ia kembali bersekolah/kondisinya membaik."
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

    // SECTION V (Remains as is with the exam prompts and varied examples)
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
          content: "Contoh 6: Surat Lamaran Pekerjaan (Job Application)" 
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
          content: "Contoh 7: Surat Permohonan Maaf Resmi (Formal Apology)" 
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
          content: "Contoh 8: Surat Izin Tidak Masuk Sekolah dari Orang Tua/Wali" 
        },
        { 
          type: "paragraph", 
          content: "<strong>Skenario Ujian:</strong> Anak Anda sakit dan tidak bisa masuk sekolah hari ini. Tulislah surat izin kepada guru wali kelasnya." 
        },
        {
          type: "exampleLetter",
          title: "",
          content: `[Alamat Rumah Anda]\n[Singapura Kode Pos Anda]\n[Nomor Telepon Anda]\n\nSingapura, 19 November 2024\n\nPerihal: Permohonan Izin Tidak Masuk Sekolah atas Nama [Nama Lengkap Anak]\n\nKepada Yth.\nIbu [Nama Guru Wali Kelas]\nGuru Wali Kelas [Nama Kelas, e.g., Primary 3A]\nSekolah Dasar [Nama Sekolah Dasar, e.g., Clementi Primary School]\n[Alamat Lengkap Sekolah]\nSingapura [Kode Pos Sekolah]\n\nDengan hormat,\n\nYang bertanda tangan di bawah ini:\nNama Orang Tua/Wali : [Nama Lengkap Orang Tua/Wali Anda]\n\nAdalah orang tua/wali dari siswa:\nNama Siswa : [Nama Lengkap Anak Anda]\nKelas : [Kelas Anak Anda, e.g., Primary 3A]\nNomor Induk Siswa : [Nomor Induk Siswa Anak, jika ada/relevan]\n\nDengan ini memberitahukan bahwa anak kami tersebut di atas, [Nama Lengkap Anak Anda], tidak dapat mengikuti kegiatan belajar mengajar di sekolah pada hari ini, Selasa, 19 November 2024, dikarenakan sedang sakit (mengalami demam dan batuk sejak semalam).\n\nSehubungan dengan kondisi kesehatannya tersebut, kami dengan hormat memohon kepada Ibu Guru Wali Kelas untuk dapat memberikan izin tidak masuk sekolah bagi anak kami pada hari ini. Kami akan memastikan anak kami mendapatkan istirahat yang cukup di rumah dan akan berusaha agar ia dapat mengejar materi pelajaran yang tertinggal sesegera mungkin setelah kondisinya pulih. Sebagai informasi tambahan, kami juga telah membawa anak kami berkonsultasi dengan dokter pagi ini, dan surat keterangan dokter akan kami lampirkan atau susulkan apabila diperlukan oleh pihak sekolah.\n\nAtas segala perhatian dan izin yang Ibu berikan, kami mengucapkan terima kasih yang sebesar-besarnya.\n\nHormat saya,\n\n(Tanda Tangan Orang Tua/Wali)\n\n[Nama Lengkap Orang Tua/Wali Anda]`
        }
      ]
    },
    
    // SECTION VI ("Meretas Ujian" - Remains as previously enhanced)
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
            "<strong>T</strong>one (Nada): Bagaimana nada surat Anda seharusnya? (e.g., formal dan tegas namun sopan untuk keluhan; hormat, jelas, dan persuasif untuk permohonan atau usulan; antusias dan profesional untuk lamaran kerja; hangat dan tulus untuk ucapan terima kasih; penuh penyesalan dan bertanggung jawab untuk permohonan maaf).",
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

    // SECTION VII (Tip Tambahan - Remains as previously enhanced)
    {
      id: "tip-tambahan",
      title: "VII. Tip Tambahan dan Adaptasi Ujian",
      elements: [
        { type: "subheading", level: 3, content: "Contoh Penerima Surat Umum di Konteks Urban/Lokal (Singapura):" },
        {
          type: "list",
          items: [
            "Manajer Dewan Kota (Town Councils) - untuk isu perumahan umum, fasilitas publik.",
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
            "Masalah lingkungan (daur ulang, sampah berserakan, polusi suara).",
            "Kegiatan sekolah/komunitas (permohonan izin, pengajuan dana, undangan).",
            "Usulan untuk meningkatkan layanan publik atau program komunitas.",
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
            "<strong>Untuk nama perusahaan/organisasi:</strong> Jika tidak diberikan, gunakan istilah umum seperti: \"Pimpinan Perusahaan Maju Jaya\", \"Manajer Departemen Pelayanan Pelanggan\", \"Direktur Yayasan Kasih Bunda\", \"Kepala Bagian Personalia Perusahaan Sejahtera\". Hindari menciptakan nama seperti \"GigaTech Solutions Pte Ltd\" kecuali diminta.",
            "<strong>Untuk nama orang (penerima):</strong> Jika tidak ada nama, gunakan jabatan: \"Yth. Bapak Manajer\", \"Yth. Ibu Kepala Sekolah\", \"Yth. Bapak/Ibu Pimpinan [Nama Institusi Umum dari Soal, misal: Dewan Kota Wilayah Timur]\".",
            "<strong>Untuk nama Anda (pengirim):</strong> Jika soal meminta Anda berperan sebagai seseorang dengan nama fiktif, gunakan nama itu. Jika tidak, Anda bisa menggunakan nama samaran yang umum (misal: Budi Pekerti, Siti Aminah) atau mengikuti instruksi spesifik pengawas ujian mengenai identitas pada lembar jawaban.",
            "<strong>Kunci Utama:</strong> Fokus pada pemahaman **struktur baku, format surat resmi, dan penggunaan frasa-frasa formal** yang ada di \"Bank Frasa\". Contoh surat adalah ilustrasi penerapan, bukan untuk dihafal kata per kata. Adaptasikan detail (masalah, usulan, tanggal acara) sesuai skenario soal ujian."
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
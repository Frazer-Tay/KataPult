// src/data/suratResmiContent.js

export const suratResmiGuide = {
  mainTitle: "Panduan Lengkap Menulis Surat Resmi Bahasa Indonesia (Kontekstual Singapura)",
  introduction: "Surat resmi dalam Bahasa Indonesia memiliki struktur dan gaya bahasa yang baku. Memahaminya akan sangat membantu dalam ujian. Berikut adalah panduan lengkap:",
  
  tableOfContents: [
    { id: "struktur-penting", title: "I. Struktur dan Format Penting" },
    { id: "kerangka-induk", title: 'II. "Kerangka Induk" Surat Resmi' },
    { id: "bank-frasa", title: "III. Bank Frasa yang Sangat Berguna" },
    { id: "mengubah-poin", title: "IV. Mengubah Poin Menjadi Paragraf" },
    { id: "contoh-surat", title: "V. Contoh Surat Kontekstual" }, // Modified title for generality
    { id: "meretas-ujian", title: 'VI. "Meretas" Ujian – Peringatan Utama' },
    { id: "tip-tambahan", title: "VII. Tip Kontekstual Tambahan" }, // Modified title
  ],

  sections: [
    // SECTION I
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

    // SECTION II
    {
      id: "kerangka-induk",
      title: 'II. "Kerangka Induk" Surat Resmi (Reusable Master Skeleton)',
      elements: [
        { type: "preformatted", content: `[Tempat Anda Menulis, Singapura], [Tanggal Bulan Tahun]\n\nPerihal: [Isi dengan topik utama surat Anda secara ringkas]\n\nKepada Yth.\nBapak/Ibu [Jabatan Penerima Surat yang Sesuai]\n[Nama Institusi/Organisasi Penerima]\n[Alamat Jalan Institusi]\n[Singapura Kode Pos]\n\nDengan hormat,\n\n(Paragraf 1: Pengenalan Diri dan Tujuan Utama - Introduction of Self and Main Purpose)\nSaya, [Nama Lengkap Anda], adalah seorang [identitas Anda – e.g., siswa SMA [Nama Sekolah], penghuni Blok [Nomor Blok] [Nama Kawasan], sekretaris Klub Lingkungan]. Melalui surat ini, saya/kami bermaksud untuk [menyatakan tujuan utama surat – e.g., menyampaikan keluhan mengenai fasilitas umum yang rusak, memohon izin untuk mengadakan acara klub, menawarkan usulan untuk mengatasi masalah sampah di lingkungan tempat tinggal kita]. [Kalimat opsional: Saya/Kami sangat menghargai upaya yang telah dilakukan oleh pihak [Nama Institusi] dalam [bidang terkait]. - Optional sentence: I/We highly appreciate the efforts made by [Institution's Name] in [related field]].\n\n(Paragraf 2: Pernyataan Masalah / Latar Belakang Usulan - Problem Statement / Background of Proposal)\n[Jelaskan situasi, masalah, atau latar belakang yang mendorong Anda menulis surat ini secara terperinci. Gunakan bahasa formal dan jelas. Hindari poin-poin.]\nContoh (Example): "Belakangan ini, kami sebagai penghuni [Nama Kawasan/Blok] sering menghadapi masalah [masalah spesifik, e.g., lift yang sering rusak di Blok kami / kekurangan tempat sampah daur ulang di area perumahan kami]. Keadaan ini tentu saja menimbulkan kesulitan dan ketidaknyamanan bagi para penghuni, terutama warga lanjut usia dan keluarga yang memiliki anak kecil."\n\n(Paragraf 3 & seterusnya: Usulan Terperinci / Permintaan / Argumen – Converting Points to Paragraphs - Detailed Proposals/Requests/Arguments)\n[Sampaikan usulan solusi, permintaan spesifik, atau argumen Anda. Jika ada beberapa poin, hubungkan menjadi kalimat-kalimat yang mengalir dalam satu atau beberapa paragraf menggunakan kata penghubung.]\nContoh (Example): "Sebagai langkah untuk menangani isu ini, kami ingin mengusulkan agar pihak Dewan Kota dapat [usulan pertama, e.g., melakukan pemeriksaan dan pemeliharaan lift secara lebih rutin dan menyeluruh]. Selain itu, kami juga berpendapat bahwa penambahan [usulan kedua, e.g., beberapa unit tempat sampah daur ulang di setiap lantai blok] akan sangat membantu dalam mendorong praktik daur ulang di kalangan penghuni. Upaya ini kami yakini akan meningkatkan kualitas hidup di lingkungan kita."\n\n(Paragraf Penutup: Harapan dan Ucapan Terima Kasih - Closing, Hope, and Thanks)\nDemikianlah [keluhan/usulan/permohonan] ini saya/kami sampaikan untuk menjadi perhatian dan pertimbangan Bapak/Ibu. Besar harapan saya/kami agar Bapak/Ibu sudi [tindakan yang diharapkan – e.g., mengambil tindakan segera terhadap keluhan ini, menyetujui permohonan kami, mempertimbangkan usulan yang dikemukakan]. Atas segala perhatian, kerja sama, dan kebijaksanaan Bapak/Ibu, saya/kami mengucapkan banyak terima kasih.\n\nHormat saya,\n(atau Hormat kami,)\n\n(Tanda Tangan)\n\n[Nama Lengkap Anda]\n[Jabatan/Afiliasi Anda, jika relevan, e.g., Siswa Kelas X Unggulan, Ketua Klub Daur Ulang]` }
      ]
    },

    // SECTION III
    {
      id: "bank-frasa",
      title: "III. Bank Frasa yang Sangat Berguna (Highly Reusable Phrase Bank)",
      elements: [
        { type: "paragraph", content: "(Includes English translations for understanding)" },
        { type: "subheading", level: 3, content: "A. Pembukaan & Menyatakan Tujuan (Openings & Stating Purpose):" },
        {
          type: "list",
          items: [
            "Perkenankan saya, [Nama Anda], selaku [posisi/status Anda], untuk menyampaikan... (Allow me, [Your Name], as [your position/status], to convey...)",
            "Dengan segala kerendahan hati, saya menulis surat ini untuk... (With all due respect/humility, I am writing this letter to...)",
            "Tujuan utama saya/kami menulis surat ini adalah untuk... (My/Our main purpose in writing this letter is to...)",
            "...mengajukan permohonan untuk... (...submit a request for...)",
            "...menyampaikan keluhan mengenai... (...lodge a complaint regarding...)",
            "...mengusulkan agar... (...propose that...)",
            "...menawarkan kerja sama dalam hal... (...offer cooperation regarding...)",
            "Saya/Kami ingin menyatakan penghargaan atas... (I/We would like to express appreciation for...)"
          ]
        },
        { type: "subheading", level: 3, content: "B. Menjelaskan Masalah/Latar Belakang (Describing Problems/Background):" },
        {
          type: "list",
          items: [
            "Sebagaimana yang mungkin Bapak/Ibu ketahui,... (As you may already know,...)",
            "Saat ini, kami sedang menghadapi situasi di mana... (Currently, we are facing a situation where...)",
            "Isu utama yang ingin kami sampaikan adalah... (The main issue we wish to raise is...)",
            "Hal ini disebabkan oleh... (This matter stems from... / is caused by...)",
            "Dampak dari situasi ini adalah... (The impact of this situation is...)",
            "Kekurangan [sesuatu, e.g., fasilitas, koordinasi] telah mengakibatkan [akibat]. (The lack of [something, e.g., facilities, coordination] has resulted in [consequence].)"
          ]
        },
        { type: "subheading", level: 3, content: "C. Mengemukakan Usulan/Permintaan (Making Suggestions/Requests - in paragraph form):" },
        { type: "paragraph", content: "Gunakan kata penghubung (Use transition words):" },
        {
          type: "list",
          items: [
            "Sebagai langkah awal, kami mengusulkan agar... (As an initial step, we propose that...)",
            "Selain itu, kami juga berpendapat bahwa... (Furthermore, we are also of the opinion that...)",
            "Selanjutnya, kami melihat kebutuhan untuk... (Subsequently, we see the need to...)",
            "Di samping itu, tindakan untuk [ide lain] juga dapat dipertimbangkan sebagai solusi efektif. (Additionally, action for [another idea] can also be considered as an effective solution.)",
            "Terakhir, namun tidak kalah pentingnya, kami berharap agar... (Lastly, but no less importantly, we hope that...)"
          ]
        },
        { type: "subheading", level: 3, content: "D. Penutup & Menyatakan Harapan (Closing & Expressing Hope):" },
        {
          type: "list",
          items: [
            "Demikianlah surat ini saya/kami sampaikan. (Thus, I/we submit this letter.)",
            "Besar harapan saya/kami agar Bapak/Ibu dapat mempertimbangkan usulan/permohonan ini dengan sebaik-baiknya. (It is my/our great hope that you will consider this proposal/request favorably.)",
            "Kami sangat menantikan tanggapan positif dari pihak Bapak/Ibu. (We eagerly await a positive response from you.)",
            "Semoga Bapak/Ibu dapat memberikan perhatian yang semestinya terhadap hal ini. (Hopefully, you can give due attention to this matter.)",
            "Atas segala perhatian, kerja sama, dan waktu yang Bapak/Ibu luangkan, saya/kami mengucapkan banyak terima kasih. (For all the attention, cooperation, and time you have devoted, I/we say many thanks.)"
          ]
        }
      ]
    },

    // SECTION IV
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

    // SECTION V
    {
      id: "contoh-surat",
      title: "V. Contoh Surat Kontekstual", // Title generalized
      elements: [
        {
          type: "exampleLetter",
          title: "Contoh 1: Surat Keluhan kepada Dewan Kota (Complaint to Town Council)",
          content: `Singapura, 28 Oktober 2024\n\nPerihal: Keluhan Mengenai Masalah Kebisingan dan Kebersihan di Blok 555, Yishun Ring Road\n\nKepada Yth.\nBapak/Ibu Manajer\nDewan Kota Nee Soon\nBlok 290, Yishun Street 22\nSingapura 760290\n\nDengan hormat,\n\nSaya, Ahmad bin Ibrahim, adalah seorang penghuni Blok 555, Yishun Ring Road, Singapura 760555. Melalui surat ini, saya ingin menyampaikan keluhan dan keprihatinan mengenai beberapa isu yang mengganggu ketenteraman dan kebersihan di area blok kami. Saya sangat menghargai upaya Dewan Kota dalam menjaga lingkungan Nee Soon selama ini.\n\nSejak beberapa bulan terakhir ini, kami para penghuni sering terganggu dengan masalah kebisingan yang berlebihan dari beberapa unit hunian terutama pada larut malam dan akhir pekan. Suara bising ini mengganggu waktu istirahat kami. Selain itu, kami juga mendapati area umum seperti koridor dan lift sering kali kotor dengan sampah yang tidak dibuang dengan benar, serta puntung rokok yang ditinggalkan begitu saja. Keadaan ini bukan saja tidak menyenangkan, tetapi juga dapat menarik hama.\n\nOleh karena itu, kami memohon bantuan pihak Dewan Kota untuk mengambil tindakan yang semestinya. Kami mengusulkan agar pemberitahuan peringatan mengenai tingkat kebisingan yang diizinkan dapat dikeluarkan kepada semua penghuni. Di samping itu, kami juga berharap agar patroli oleh petugas Dewan Kota dapat ditingkatkan untuk memantau tingkat kebersihan dan mengambil tindakan terhadap mereka yang tidak bertanggung jawab. Kami percaya tindakan proaktif dari pihak Dewan Kota akan dapat memulihkan suasana yang harmonis dan bersih di blok kami.\n\nDemikianlah keluhan ini saya sampaikan. Besar harapan saya agar pihak Bapak/Ibu dapat memberikan perhatian serius terhadap masalah ini dan mengambil tindakan segera. Atas kerja sama dan perhatian Bapak/Ibu, saya ucapkan terima kasih.\n\nHormat saya,\n\n(Tanda Tangan)\n\nAhmad bin Ibrahim\nPenghuni Blok 555, Yishun Ring Road\nUnit #05-123`
        },
        {
          type: "exampleLetter",
          title: "Contoh 2: Surat Permohonan kepada Kepala Sekolah (Request to School Principal)",
          content: `Singapura, 28 Oktober 2024\n\nPerihal: Permohonan Izin Mengadakan Lokakarya Fotografi untuk Anggota Klub Ekstrakurikuler\n\nKepada Yth.\nBapak Tan Ah Meng\nKepala Sekolah SMA Ang Mo Kio\n6 Ang Mo Kio Street 54\nSingapura 569185\n\nDengan hormat,\n\nSaya, Siti Nurhaliza binti Rahman, selaku Ketua Klub Fotografi SMA Ang Mo Kio, menulis surat ini atas nama anggota pengurus klub. Tujuan kami menulis surat ini adalah untuk memohon izin dari Bapak Kepala Sekolah untuk mengadakan sebuah lokakarya fotografi bagi para anggota klub kami. Kami sangat berterima kasih atas dukungan Bapak yang berkelanjutan terhadap kegiatan ekstrakurikuler di sekolah kita.\n\nLokakarya ini dirancang untuk meningkatkan keterampilan teknis dan kreativitas anggota klub dalam bidang fotografi. Kami berencana mengadakan lokakarya ini pada hari Sabtu, 23 November 2024, dari pukul 09.00 hingga 16.00, bertempat di Ruang AVA sekolah. Kami juga bermaksud mengundang seorang fotografer profesional sebagai pembicara dan fasilitator lokakarya. Anggaran biaya dan susunan acara sementara lokakarya telah kami lampirkan bersama surat ini untuk rujukan Bapak.\n\nKami sangat berharap agar Bapak Kepala Sekolah dapat mempertimbangkan permohonan kami ini dan memberikan persetujuan. Kami percaya lokakarya ini akan memberi manfaat yang besar kepada para anggota klub kami dalam mengembangkan minat dan bakat mereka. Kami bersedia untuk berdiskusi lebih lanjut mengenai perencanaan lokakarya ini sekiranya diperlukan.\n\nDemikianlah permohonan ini kami sampaikan. Atas pertimbangan dan izin yang Bapak berikan, kami haturkan penghargaan dan terima kasih yang sebesar-besarnya.\n\nHormat kami,\n\n(Tanda Tangan)\n\nSiti Nurhaliza binti Rahman\nKetua Klub Fotografi\nSMA Ang Mo Kio`
        },
        { // NEW EXAMPLE 1
          type: "exampleLetter",
          title: "Contoh 3: Surat Permohonan Dana untuk Kegiatan Komunitas",
          content: `Singapura, 1 November 2024\n\nPerihal: Permohonan Dukungan Dana untuk Program "Hijaukan Lingkungan Kita"\n\nKepada Yth.\nBapak/Ibu Manajer CSR\nPT Hijau Lestari\n123 Orchard Road\nSingapura 238888\n\nDengan hormat,\n\nKami, panitia program "Hijaukan Lingkungan Kita" dari Pusat Komunitas Tampines East, menulis surat ini untuk mengajukan permohonan dukungan dana bagi pelaksanaan kegiatan penghijauan di lingkungan kami. Kami mengetahui bahwa PT Hijau Lestari memiliki komitmen tinggi terhadap isu-isu lingkungan dan keberlanjutan.\n\nProgram "Hijaukan Lingkungan Kita" bertujuan untuk meningkatkan kesadaran masyarakat akan pentingnya ruang hijau di perkotaan serta menanam 100 bibit pohon peneduh di sekitar area Pusat Komunitas dan taman lingkungan pada tanggal 7 Desember 2024. Kegiatan ini akan melibatkan sukarelawan dari berbagai lapisan masyarakat, termasuk pelajar dan warga senior. Kami percaya program ini tidak hanya akan memperindah lingkungan tetapi juga meningkatkan kualitas udara dan ikatan sosial antarwarga.\n\nUntuk merealisasikan program ini, kami membutuhkan dana sebesar S$1.500 untuk pengadaan bibit pohon berkualitas, peralatan berkebun, konsumsi sukarelawan, dan materi edukasi. Rincian anggaran terlampir bersama proposal kegiatan ini. Kami akan sangat menghargai apabila PT Hijau Lestari berkenan menjadi salah satu sponsor utama program kami. Sebagai bentuk apresiasi, kami akan mencantumkan logo perusahaan Bapak/Ibu pada seluruh materi promosi dan publikasi kegiatan.\n\nBesar harapan kami agar permohonan ini dapat dipertimbangkan. Kami bersedia untuk mempresentasikan proposal ini secara lebih detail pada waktu yang Bapak/Ibu tentukan. Atas perhatian dan dukungan yang mungkin diberikan, kami mengucapkan banyak terima kasih.\n\nHormat kami,\n\n(Tanda Tangan)\n\n[Nama Anda/Ketua Panitia]\nKetua Panitia Program "Hijaukan Lingkungan Kita"\nPusat Komunitas Tampines East`
        },
        { // NEW EXAMPLE 2
          type: "exampleLetter",
          title: "Contoh 4: Surat Undangan sebagai Pembicara",
          content: `Singapura, 5 November 2024\n\nPerihal: Undangan sebagai Pembicara dalam Acara "Bulan Bahasa dan Sastra"\n\nKepada Yth.\nIbu Andrea Hirata\n(Alamat Penulis atau melalui Agen/Penerbit)\n\nDengan hormat,\n\nSaya, [Nama Anda], selaku Ketua Klub Sastra SMA Nasional Singapura, dengan penuh rasa hormat mengundang Ibu untuk menjadi pembicara utama dalam acara "Bulan Bahasa dan Sastra" yang akan kami selenggarakan. Acara ini bertujuan untuk menumbuhkan minat baca dan apresiasi sastra di kalangan siswa kami.\n\nKami sangat mengagumi karya-karya Ibu yang inspiratif dan telah menyentuh hati banyak pembaca di Indonesia maupun internasional. Kehadiran dan paparan Ibu mengenai proses kreatif dalam menulis atau pentingnya literasi bagi generasi muda akan menjadi motivasi yang tak ternilai bagi para siswa kami. Acara ini direncanakan akan diadakan pada:\nHari/Tanggal: Sabtu, 14 Desember 2024\nWaktu: Pukul 10.00 - 12.00\nTempat: Aula SMA Nasional Singapura\n\nKami memahami kesibukan Ibu, namun besar harapan kami Ibu berkenan meluangkan waktu untuk berbagi ilmu dan pengalaman dengan siswa-siswi kami. Kami siap untuk mendiskusikan lebih lanjut mengenai teknis acara, topik paparan yang diharapkan, serta fasilitas dan honorarium yang dapat kami sediakan.\n\nMohon konfirmasi kesediaan Ibu sebelum tanggal 20 November 2024. Atas perhatian dan kesediaan Ibu, kami haturkan terima kasih yang sebesar-besarnya.\n\nHormat kami,\n\n(Tanda Tangan)\n\n[Nama Anda]\nKetua Klub Sastra\nSMA Nasional Singapura`
        },
        { // NEW EXAMPLE 3
          type: "exampleLetter",
          title: "Contoh 5: Surat Ucapan Terima Kasih kepada Sponsor",
          content: `Singapura, 10 Desember 2024\n\nPerihal: Ucapan Terima Kasih atas Dukungan Sponsorship Acara "Pentas Seni Pelajar 2024"\n\nKepada Yth.\nBapak David Lim\nDirektur Pemasaran\nSingapura maju Pte Ltd\n789 Business Park Avenue\nSingapura 654321\n\nDengan hormat,\n\nMelalui surat ini, kami atas nama seluruh panitia dan peserta acara "Pentas Seni Pelajar 2024" yang diselenggarakan oleh gabungan OSIS sekolah-sekolah di wilayah Barat Singapura, ingin menyampaikan ucapan terima kasih yang tulus dan penghargaan setinggi-tingginya kepada Singapura maju Pte Ltd atas kemurahan hati menjadi sponsor utama kegiatan kami.\n\nAcara "Pentas Seni Pelajar 2024" yang berlangsung pada tanggal 30 November 2024 di Teater Kallang telah berjalan dengan sukses dan meriah. Lebih dari 500 siswa berpartisipasi dan menampilkan bakat terbaik mereka, serta dihadiri oleh ratusan penonton. Dukungan finansial dan produk yang Bapak berikan sangat berarti bagi kelancaran seluruh rangkaian acara, mulai dari persiapan panggung, penyediaan konsumsi, hingga hadiah bagi para pemenang.\n\nKami percaya bahwa kontribusi Singapura maju Pte Ltd tidak hanya membantu kesuksesan acara ini, tetapi juga telah memberikan dampak positif bagi pengembangan kreativitas dan rasa percaya diri para pelajar. Kami telah mencantumkan logo perusahaan Bapak pada seluruh materi publikasi acara dan menyebutkan nama perusahaan Bapak dalam sambutan pembukaan dan penutupan. Dokumentasi kegiatan terlampir bersama surat ini.\n\nSekali lagi, kami mengucapkan banyak terima kasih atas kepercayaan dan dukungan yang telah diberikan. Kami berharap kerja sama yang baik ini dapat terus terjalin di masa mendatang.\n\nHormat kami,\n\n(Tanda Tangan)\n\n[Nama Ketua Panitia Gabungan]\nKetua Panitia "Pentas Seni Pelajar 2024"`
        }
      ]
    },
    
    // SECTION VI
    {
      id: "meretas-ujian",
      title: 'VI. "Meretas" Ujian (Exam "Hacking") – Peringatan Utama',
      elements: [
        { type: "subheading", level: 3, content: "Identifikasi Elemen Inti:" },
        {
          type: "list",
          items: [
            "SIAPA Anda? (Siswa, penghuni, perwakilan klub)",
            "Kepada SIAPA Anda menulis? (Kepala Sekolah, Manajer Dewan Kota, Direktur Badan)",
            "APA tujuan utama? (Keluhan, usulan, permohonan, tawaran)",
            "APA hasil yang diinginkan? (Tindakan, persetujuan, dana, pertemuan)"
          ]
        },
        { type: "paragraph", content: "<strong>Struktur adalah Kunci:</strong> Ikuti format surat resmi dengan teliti." },
        { type: "paragraph", content: "<strong>Paragraf, Bukan Poin:</strong> Susun ide menjadi paragraf yang kohesif." },
        { type: "paragraph", content: "<strong>Bahasa Sopan dan Formal:</strong> Hindari bahasa sehari-hari atau non-standar. Gunakan sapaan hormat." },
        { type: "paragraph", content: "<strong>Spesifik (Buat detail jika perlu):</strong> Berikan detail yang masuk akal (nama, tanggal, lokasi spesifik) agar surat terasa nyata." },
        { type: "paragraph", content: "<strong>Manajemen Waktu:</strong> Rancang, tulis, dan periksa." },
        { type: "paragraph", content: "<strong>Pahami Jenis Surat:</strong> Apakah ini surat keluhan, permohonan, usulan, penghargaan, atau undangan? Setiap jenis mungkin memerlukan penekanan yang sedikit berbeda." }
      ]
    },

    // SECTION VII
    {
      id: "tip-tambahan",
      title: "VII. Tip Kontekstual Tambahan", // Title generalized
      elements: [
        { type: "subheading", level: 3, content: "Contoh Penerima Surat Umum di Konteks Urban/Lokal:" },
        {
          type: "list",
          items: [
            "Dewan Kota (Town Councils) - untuk isu perumahan umum, fasilitas publik.",
            "Badan Perumahan dan Pembangunan (HDB) - untuk isu terkait unit perumahan/apartemen.",
            "Otoritas Transportasi Darat (LTA) - untuk isu transportasi umum, jalan raya.",
            "Badan Lingkungan Hidup Nasional (NEA) - untuk isu kebersihan, demam berdarah, pedagang kaki lima.",
            "Kepala Sekolah (School Principals) - untuk urusan sekolah.",
            "Manajer Pusat Komunitas (Community Club/Centre Managers) - untuk kegiatan komunitas.",
            "Anggota Parlemen (MP) - untuk isu tingkat daerah pemilihan yang lebih luas."
          ]
        },
        { type: "subheading", level: 3, content: "Contoh Topik Surat yang Relevan:" },
        {
          type: "list",
          items: [
            "Fasilitas umum (lift rusak, kebersihan koridor, tempat parkir sepeda).",
            "Daur ulang dan kelestarian lingkungan.",
            "Kegiatan ekstrakurikuler sekolah, permohonan dana atau izin.",
            "Usulan untuk meningkatkan layanan publik.",
            "Masalah kebisingan atau perselisihan antar tetangga (disampaikan secara formal dan konstruktif)."
          ]
        },
        { type: "paragraph", content: "<strong>Hindari Bahasa Gaul atau Non-Formal:</strong> Pertahankan tingkat formalitas yang tinggi. (Avoid Slang or Informal Language: Maintain a high level of formality.)" },
        { type: "paragraph", content: "<strong>Kejelasan Lebih Penting Daripada Kerumitan:</strong> Kalimat yang ringkas dan benar lebih baik daripada kalimat yang kompleks tetapi salah. (Clarity is More Important Than Complexity: Simple, correct sentences are better than complex but incorrect ones.)" },
        { type: "paragraph", content: "<strong>Periksa Kembali (Proofread):</strong> Periksa tata bahasa, ejaan, dan kelengkapan komponen surat sebelum mengirim (atau sebelum waktu ujian berakhir). (Proofread: Check grammar, spelling, and completeness of letter components before submitting (or before exam time ends).)" },
        { type: "paragraph", content: "<strong>Latihan, Latihan, Latihan!</strong> (Practice, Practice, Practice!): Tulis surat mengenai berbagai topik menggunakan kerangka ini." }
      ]
    },
  ]
};
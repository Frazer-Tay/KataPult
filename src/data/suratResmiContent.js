// src/data/suratResmiContent.js

export const suratResmiGuide = {
  mainTitle: "Panduan Lengkap Menulis Surat Resmi Bahasa Indonesia (Kontekstual Singapura)",
  introduction: "Surat resmi dalam Bahasa Indonesia memiliki struktur dan gaya bahasa yang baku. Memahaminya akan sangat membantu dalam ujian. Berikut adalah panduan lengkap:",
  
  tableOfContents: [
    { id: "struktur-penting", title: "I. Struktur dan Format Penting" },
    { id: "kerangka-induk", title: 'II. "Kerangka Induk" Surat Resmi' },
    { id: "bank-frasa", title: "III. Bank Frasa yang Sangat Berguna" },
    { id: "mengubah-poin", title: "IV. Mengubah Poin Menjadi Paragraf" },
    { id: "contoh-surat", title: "V. Contoh Surat Kontekstual" },
    { id: "meretas-ujian", title: 'VI. "Meretas" Ujian – Peringatan Utama' },
    { id: "tip-tambahan", title: "VII. Tip Tambahan dan Adaptasi Ujian" },
    { id: "peribahasa", title: "VIII. Penggunaan Peribahasa yang Sesuai" }, // New section
  ],

  sections: [
    // SECTION I (No changes from original)
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

    // SECTION II (Kerangka Induk - Enhanced with more specific prompts)
    {
      id: "kerangka-induk",
      title: 'II. "Kerangka Induk" Surat Resmi (Reusable Master Skeleton)',
      elements: [
        { type: "preformatted", content: `[Tempat Anda Menulis, Singapura], [Tanggal Bulan Tahun]\n\nPerihal: [Isi dengan topik utama surat Anda secara ringkas dan jelas]\n\nKepada Yth.\nBapak/Ibu [Jabatan Penerima Surat yang Sesuai, e.g., Manajer, Kepala Sekolah, Direktur]\n[Nama Institusi/Organisasi Penerima, e.g., Dewan Kota, Nama Sekolah, Nama Perusahaan]\n[Alamat Jalan Institusi Lengkap]\n[Singapura Kode Pos]\n\nDengan hormat,\n\n(Paragraf 1: Pengenalan Diri dan Tujuan Utama - Introduction of Self and Main Purpose)\nSaya, [Nama Lengkap Anda], adalah seorang [identitas Anda – e.g., siswa SMA [Nama Sekolah], penghuni Blok [Nomor Blok] [Nama Kawasan], sekretaris Klub Lingkungan Hidup Sekolah [Nama Sekolah]]. Melalui surat ini, saya/kami bermaksud untuk [menyatakan tujuan utama surat dengan jelas – e.g., menyampaikan keluhan mengenai fasilitas umum yang rusak di [lokasi spesifik], memohon izin untuk mengadakan kegiatan [nama kegiatan] atas nama [nama klub/organisasi], menawarkan usulan untuk mengatasi masalah [masalah spesifik] di lingkungan [lokasi spesifik]]. [Kalimat opsional untuk menunjukkan apresiasi awal jika relevan: Saya/Kami sangat menghargai upaya yang telah dilakukan oleh pihak [Nama Institusi Penerima] dalam [bidang terkait, e.g., menjaga kebersihan lingkungan, mendukung kegiatan siswa].]\n\n(Paragraf 2: Pernyataan Masalah / Latar Belakang Usulan - Problem Statement / Background of Proposal)\n[Jelaskan situasi, masalah, atau latar belakang yang mendorong Anda menulis surat ini secara terperinci. Berikan konteks yang cukup agar penerima memahami urgensi atau relevansi surat Anda. Gunakan bahasa formal dan jelas. Hindari poin-poin.]\nContoh Keluhan (Complaint Example): "Belakangan ini, kami sebagai penghuni [Nama Kawasan/Blok] sering menghadapi masalah [masalah spesifik secara detail, e.g., lift di Blok kami yang sering kali tidak berfungsi dengan baik, khususnya pada jam-jam sibuk pagi dan sore hari / penumpukan sampah di sekitar tempat pembuangan sementara yang menimbulkan bau tidak sedap dan menarik hama]. Keadaan ini tentu saja menimbulkan [sebutkan dampak negatif yang dirasakan, e.g., kesulitan mobilitas bagi warga lanjut usia, ketidaknyamanan, dan potensi risiko kesehatan] bagi para penghuni."\nContoh Latar Belakang Usulan (Proposal Background Example): "Melihat tingginya minat siswa terhadap [bidang tertentu, e.g., pelestarian lingkungan], serta adanya kebutuhan untuk [tujuan tertentu, e.g., meningkatkan kesadaran akan pentingnya daur ulang], Klub [Nama Klub] merasa terpanggil untuk mengadakan sebuah [jenis kegiatan, e.g., lokakarya, kampanye] yang bertajuk '[Nama Kegiatan]'."\n\n(Paragraf 3 & seterusnya: Usulan Terperinci / Permintaan / Argumen – Converting Points to Paragraphs - Detailed Proposals/Requests/Arguments)\n[Sampaikan usulan solusi, permintaan spesifik, atau argumen Anda secara logis dan terstruktur. Jika ada beberapa poin, hubungkan menjadi kalimat-kalimat yang mengalir dalam satu atau beberapa paragraf menggunakan kata penghubung yang tepat. Berikan justifikasi atau alasan mengapa usulan/permintaan Anda penting atau bermanfaat.]\nContoh Usulan Solusi (Solution Proposal Example): "Sebagai langkah untuk menangani isu ini, kami ingin mengusulkan agar pihak [Nama Institusi Penerima] dapat [usulan pertama, e.g., melakukan pemeriksaan dan pemeliharaan lift secara lebih rutin dan menyeluruh, minimal seminggu sekali]. Selain itu, kami juga berpendapat bahwa penambahan [usulan kedua, e.g., dua unit tempat sampah daur ulang tambahan di setiap lantai blok] akan sangat membantu dalam mendorong praktik daur ulang di kalangan penghuni. [Uraikan manfaat yang diharapkan dari usulan Anda, e.g.: Upaya ini kami yakini tidak hanya akan meningkatkan kenyamanan tetapi juga menumbuhkan rasa tanggung jawab bersama terhadap kebersihan lingkungan kita.]"\nContoh Permintaan (Request Example): "Sehubungan dengan rencana kegiatan tersebut, kami dengan hormat memohon izin dari Bapak/Ibu untuk [permintaan spesifik, e.g., menggunakan Aula Serbaguna sekolah pada hari Sabtu, tanggal [Tanggal Pelaksanaan], dari pukul [Waktu Mulai] hingga [Waktu Selesai]]. Kami juga berharap mendapatkan dukungan berupa [dukungan lain jika ada, e.g., peminjaman peralatan audiovisual]."\n\n(Paragraf Penutup: Harapan dan Ucapan Terima Kasih - Closing, Hope, and Thanks)\nDemikianlah [keluhan/usulan/permohonan/undangan] ini saya/kami sampaikan untuk menjadi perhatian dan pertimbangan Bapak/Ibu. Besar harapan saya/kami agar Bapak/Ibu sudi [tindakan yang diharapkan secara spesifik – e.g., mengambil tindakan segera terhadap keluhan yang kami ajukan, menyetujui permohonan izin kami, mempertimbangkan usulan yang telah kami kemukakan, atau berkenan hadir dalam acara kami]. Atas segala perhatian, kerja sama, dan kebijaksanaan Bapak/Ibu, saya/kami mengucapkan banyak terima kasih.\n\nHormat saya,\n(atau Hormat kami, jika mewakili kelompok)\n\n(Tanda Tangan Anda)\n\n[Nama Lengkap Anda]\n[Jabatan/Afiliasi Anda, jika relevan, e.g., Siswa Kelas X Unggulan, Ketua Klub Daur Ulang, Penghuni Unit #XX-XXX]` }
      ]
    },

    // SECTION III (Bank Frasa - Enhanced)
    {
      id: "bank-frasa",
      title: "III. Bank Frasa yang Sangat Berguna (Highly Reusable Phrase Bank)",
      elements: [
        { type: "paragraph", content: "(Termasuk terjemahan bahasa Inggris untuk pemahaman)" },
        { type: "subheading", level: 3, content: "A. Pembukaan & Menyatakan Tujuan (Openings & Stating Purpose):" },
        {
          type: "list",
          items: [
            "Perkenankan saya/kami, [Nama Anda/Nama Kelompok], selaku [posisi/status Anda], untuk menyampaikan... (Allow me/us, [Your Name/Group Name], as [your position/status], to convey...)",
            "Dengan segala kerendahan hati, saya/kami menulis surat ini untuk... (With all due respect/humility, I am/we are writing this letter to...)",
            "Tujuan utama saya/kami menulis surat ini adalah untuk... (My/Our main purpose in writing this letter is to...)",
            "Melalui surat ini, saya/kami bermaksud untuk... (Through this letter, I/we intend to...)",
            "...mengajukan permohonan resmi terkait... (...submit a formal request regarding...)",
            "...menyampaikan keluhan dan keprihatinan mendalam mengenai... (...lodge a complaint and deep concern regarding...)",
            "...mengusulkan beberapa langkah konkret agar... (...propose several concrete steps so that...)",
            "...menawarkan kerja sama strategis dalam hal... (...offer strategic cooperation regarding...)",
            "Saya/Kami ingin menyatakan apresiasi yang setinggi-tingginya atas... (I/We would like to express the highest appreciation for...)",
            "Surat ini kami tujukan sehubungan dengan... (We address this letter in relation to...)"
          ]
        },
        { type: "subheading", level: 3, content: "B. Menjelaskan Masalah/Latar Belakang (Describing Problems/Background):" },
        {
          type: "list",
          items: [
            "Sebagaimana yang mungkin telah menjadi perhatian Bapak/Ibu,... (As it may have come to your attention,...)",
            "Berdasarkan pengamatan kami selama beberapa waktu terakhir,... (Based on our observations over the past period,...)",
            "Kami menghadapi situasi yang kurang menyenangkan/kondusif, di mana... (We are facing an unpleasant/unconducive situation, where...)",
            "Isu krusial yang ingin kami sampaikan adalah terkait... (The crucial issue we wish to raise is related to...)",
            "Situasi ini diperparah oleh... (This situation is exacerbated by...)",
            "Hal ini berpotensi menimbulkan dampak negatif terhadap... (This has the potential to cause a negative impact on...)",
            "Kekurangan [sesuatu, e.g., fasilitas, koordinasi, informasi] telah mengakibatkan [akibat spesifik]. (The lack of [something, e.g., facilities, coordination, information] has resulted in [specific consequence].)",
            "Kami memahami bahwa [pihak penerima] mungkin memiliki banyak prioritas, namun isu ini mendesak untuk ditangani. (We understand that [recipient] may have many priorities, but this issue is urgent to address.)"
          ]
        },
        { type: "subheading", level: 3, content: "C. Mengemukakan Usulan/Permintaan (Making Suggestions/Requests):" },
        { type: "paragraph", content: "Gunakan kata penghubung untuk alur yang baik (Use transition words for good flow):" },
        {
          type: "list",
          items: [
            "Sebagai langkah awal yang konstruktif, kami mengusulkan agar... (As a constructive initial step, we propose that...)",
            "Selain itu, kami juga berpendapat bahwa implementasi [usulan lain] akan sangat bermanfaat. (Furthermore, we are also of the opinion that the implementation of [another proposal] would be very beneficial.)",
            "Selanjutnya, kami melihat adanya kebutuhan mendesak untuk... (Subsequently, we see an urgent need to...)",
            "Di samping itu, kami meyakini bahwa tindakan untuk [ide lain] juga patut dipertimbangkan sebagai solusi alternatif yang efektif. (Additionally, we believe that action for [another idea] should also be considered as an effective alternative solution.)",
            "Oleh karena itu, kami dengan hormat memohon agar Bapak/Ibu sudi [permintaan spesifik]. (Therefore, we respectfully request that you be willing to [specific request].)",
            "Kami berharap pihak Bapak/Ibu dapat mempertimbangkan untuk [tindakan yang diminta]. (We hope your party can consider to [requested action].)",
            "Akan sangat kami hargai apabila [permintaan/harapan]. (We would greatly appreciate it if [request/hope].)"
          ]
        },
        { type: "subheading", level: 3, content: "D. Menyatakan Apresiasi/Penghargaan (Expressing Appreciation):" },
        {
          type: "list",
          items: [
            "Kami ingin menyampaikan penghargaan yang tulus atas... (We wish to convey our sincere appreciation for...)",
            "Dukungan yang Bapak/Ibu berikan sangat berarti bagi kami. (The support you have provided means a lot to us.)",
            "Kami sangat berterima kasih atas kemurahan hati Bapak/Ibu dalam... (We are very grateful for your generosity in...)",
            "Kontribusi Bapak/Ibu telah memberikan dampak positif yang signifikan. (Your contribution has made a significant positive impact.)"
          ]
        },
        { type: "subheading", level: 3, content: "E. Menyatakan Ketidaksetujuan/Keluhan dengan Sopan (Expressing Disagreement/Complaints Politely):" },
        {
          type: "list",
          items: [
            "Dengan berat hati, kami harus menyampaikan beberapa hal yang kurang berkenan. (With a heavy heart, we must convey some matters that are less than satisfactory.)",
            "Kami merasa perlu untuk menyuarakan keprihatinan kami terkait... (We feel it necessary to voice our concerns regarding...)",
            "Meskipun kami menghargai upaya yang telah dilakukan, ada beberapa aspek yang menurut hemat kami perlu perbaikan. (Although we appreciate the efforts made, there are several aspects that, in our humble opinion, need improvement.)",
            "Kami berharap dapat menemukan solusi bersama atas permasalahan ini. (We hope to find a mutual solution to this problem.)"
          ]
        },
        { type: "subheading", level: 3, content: "F. Menawarkan Solusi/Bantuan (Offering Solutions/Help):" },
        {
          type: "list",
          items: [
            "Kami siap berkontribusi aktif dalam mencari jalan keluar terbaik. (We are ready to contribute actively in finding the best way out.)",
            "Sekiranya diperlukan, kami bersedia untuk [tawaran bantuan spesifik]. (If needed, we are willing to [specific offer of help].)",
            "Kami percaya bahwa dengan kerja sama, masalah ini dapat diatasi. (We believe that with cooperation, this problem can be overcome.)"
          ]
        },
        { type: "subheading", level: 3, content: "G. Meminta Tindakan/Respon (Requesting Action/Response):" },
        {
          type: "list",
          items: [
            "Kami sangat mengharapkan tindak lanjut yang konkret dari pihak Bapak/Ibu. (We greatly expect concrete follow-up action from your side.)",
            "Mohon kiranya Bapak/Ibu dapat memberikan respons atas surat ini dalam waktu yang tidak terlalu lama. (We kindly request that you provide a response to this letter in a timely manner.)",
            "Kami siap untuk bertemu dan berdiskusi lebih lanjut mengenai hal ini. (We are ready to meet and discuss this matter further.)"
          ]
        },
        { type: "subheading", level: 3, content: "H. Penutup & Menyatakan Harapan (Closing & Expressing Hope):" },
        {
          type: "list",
          items: [
            "Demikianlah surat ini saya/kami sampaikan dengan harapan dapat menjadi bahan pertimbangan yang berharga. (Thus, I/we submit this letter with the hope that it can be valuable consideration.)",
            "Besar harapan saya/kami agar Bapak/Ibu dapat mempertimbangkan usulan/permohonan ini dengan arif dan bijaksana. (It is my/our great hope that you will consider this proposal/request wisely and judiciously.)",
            "Kami sangat menantikan kabar baik dan tanggapan positif dari pihak Bapak/Ibu. (We eagerly await good news and a positive response from you.)",
            "Semoga Bapak/Ibu dapat memberikan perhatian yang semestinya dan solusi yang terbaik terhadap permasalahan ini. (Hopefully, you can give due attention and the best solution to this problem.)",
            "Atas segala perhatian, kerja sama, dan waktu yang Bapak/Ibu luangkan, saya/kami haturkan terima kasih yang sebesar-besarnya. (For all the attention, cooperation, and time you have devoted, I/we express our deepest gratitude.)"
          ]
        }
      ]
    },

    // SECTION IV (No changes from original)
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

    // SECTION V (Example 4 event details in paragraph form)
    {
      id: "contoh-surat",
      title: "V. Contoh Surat Kontekstual",
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
        { 
          type: "exampleLetter",
          title: "Contoh 3: Surat Permohonan Dana untuk Kegiatan Komunitas",
          content: `Singapura, 1 November 2024\n\nPerihal: Permohonan Dukungan Dana untuk Program "Hijaukan Lingkungan Kita"\n\nKepada Yth.\nBapak/Ibu Manajer CSR\nGreenViron Pte Ltd\n123 Orchard Road\nSingapura 238888\n\nDengan hormat,\n\nKami, panitia program "Hijaukan Lingkungan Kita" dari Pusat Komunitas Tampines East, menulis surat ini untuk mengajukan permohonan dukungan dana bagi pelaksanaan kegiatan penghijauan di lingkungan kami. Kami mengetahui bahwa GreenViron Pte Ltd memiliki komitmen tinggi terhadap isu-isu lingkungan dan keberlanjutan.\n\nProgram "Hijaukan Lingkungan Kita" bertujuan untuk meningkatkan kesadaran masyarakat akan pentingnya ruang hijau di perkotaan serta menanam 100 bibit pohon peneduh di sekitar area Pusat Komunitas dan taman lingkungan pada tanggal 7 Desember 2024. Kegiatan ini akan melibatkan sukarelawan dari berbagai lapisan masyarakat, termasuk pelajar dan warga senior. Kami percaya program ini tidak hanya akan memperindah lingkungan tetapi juga meningkatkan kualitas udara dan ikatan sosial antarwarga.\n\nUntuk merealisasikan program ini, kami membutuhkan dana sebesar S$1.500 untuk pengadaan bibit pohon berkualitas, peralatan berkebun, konsumsi sukarelawan, dan materi edukasi. Rincian anggaran terlampir bersama proposal kegiatan ini. Kami akan sangat menghargai apabila GreenViron Pte Ltd berkenan menjadi salah satu sponsor utama program kami. Sebagai bentuk apresiasi, kami akan mencantumkan logo perusahaan Bapak/Ibu pada seluruh materi promosi dan publikasi kegiatan.\n\nBesar harapan kami agar permohonan ini dapat dipertimbangkan. Kami bersedia untuk mempresentasikan proposal ini secara lebih detail pada waktu yang Bapak/Ibu tentukan. Atas perhatian dan dukungan yang mungkin diberikan, kami mengucapkan banyak terima kasih.\n\nHormat kami,\n\n(Tanda Tangan)\n\n[Nama Anda/Ketua Panitia]\nKetua Panitia Program "Hijaukan Lingkungan Kita"\nPusat Komunitas Tampines East`
        },
        { 
          type: "exampleLetter",
          title: "Contoh 4: Surat Undangan sebagai Pembicara (Detail Acara dalam Paragraf)", // Updated title to reflect change
          content: `Singapura, 5 November 2024\n\nPerihal: Undangan sebagai Pembicara dalam Acara "Bulan Bahasa dan Sastra"\n\nKepada Yth.\nIbu Andrea Hirata\n(Alamat Penulis atau melalui Agen/Penerbit)\n\nDengan hormat,\n\nSaya, [Nama Anda], selaku Ketua Klub Sastra SMA Nasional Singapura, dengan penuh rasa hormat mengundang Ibu untuk menjadi pembicara utama dalam acara "Bulan Bahasa dan Sastra" yang akan kami selenggarakan. Acara ini bertujuan untuk menumbuhkan minat baca dan apresiasi sastra di kalangan siswa kami.\n\nKami sangat mengagumi karya-karya Ibu yang inspiratif dan telah menyentuh hati banyak pembaca di Indonesia maupun internasional. Kehadiran dan paparan Ibu mengenai proses kreatif dalam menulis atau pentingnya literasi bagi generasi muda akan menjadi motivasi yang tak ternilai bagi para siswa kami. Adapun acara tersebut kami rencanakan akan diselenggarakan pada hari Sabtu, 14 Desember 2024, mulai pukul 10.00 hingga 12.00 Waktu Indonesia Bagian Barat (WIB), dan akan bertempat di Aula SMA Nasional Singapura.\n\nKami memahami kesibukan Ibu, namun besar harapan kami Ibu berkenan meluangkan waktu untuk berbagi ilmu dan pengalaman dengan siswa-siswi kami. Kami siap untuk mendiskusikan lebih lanjut mengenai teknis acara, topik paparan yang diharapkan, serta fasilitas dan honorarium yang dapat kami sediakan.\n\nMohon konfirmasi kesediaan Ibu sebelum tanggal 20 November 2024 agar kami dapat melakukan persiapan lebih lanjut. Atas perhatian dan kesediaan Ibu, kami haturkan terima kasih yang sebesar-besarnya.\n\nHormat kami,\n\n(Tanda Tangan)\n\n[Nama Anda]\nKetua Klub Sastra\nSMA Nasional Singapura`
        },
        { 
          type: "exampleLetter",
          title: "Contoh 5: Surat Ucapan Terima Kasih kepada Sponsor",
          content: `Singapura, 10 Desember 2024\n\nPerihal: Ucapan Terima Kasih atas Dukungan Sponsorship Acara "Pentas Seni Pelajar 2024"\n\nKepada Yth.\nBapak David Lim\nDirektur Pemasaran\nSingapura Maju Pte Ltd\n789 Business Park Avenue\nSingapura 654321\n\nDengan hormat,\n\nMelalui surat ini, kami atas nama seluruh panitia dan peserta acara "Pentas Seni Pelajar 2024" yang diselenggarakan oleh gabungan OSIS sekolah-sekolah di wilayah Barat Singapura, ingin menyampaikan ucapan terima kasih yang tulus dan penghargaan setinggi-tingginya kepada Singapura Maju Pte Ltd atas kemurahan hati menjadi sponsor utama kegiatan kami.\n\nAcara "Pentas Seni Pelajar 2024" yang berlangsung pada tanggal 30 November 2024 di Teater Kallang telah berjalan dengan sukses dan meriah. Lebih dari 500 siswa berpartisipasi dan menampilkan bakat terbaik mereka, serta dihadiri oleh ratusan penonton. Dukungan finansial dan produk yang Bapak berikan sangat berarti bagi kelancaran seluruh rangkaian acara, mulai dari persiapan panggung, penyediaan konsumsi, hingga hadiah bagi para pemenang.\n\nKami percaya bahwa kontribusi Singapura Maju Pte Ltd tidak hanya membantu kesuksesan acara ini, tetapi juga telah memberikan dampak positif bagi pengembangan kreativitas dan rasa percaya diri para pelajar. Kami telah mencantumkan logo perusahaan Bapak pada seluruh materi publikasi acara dan menyebutkan nama perusahaan Bapak dalam sambutan pembukaan dan penutupan. Dokumentasi kegiatan terlampir bersama surat ini.\n\nSekali lagi, kami mengucapkan banyak terima kasih atas kepercayaan dan dukungan yang telah diberikan. Kami berharap kerja sama yang baik ini dapat terus terjalin di masa mendatang.\n\nHormat kami,\n\n(Tanda Tangan)\n\n[Nama Ketua Panitia Gabungan]\nKetua Panitia "Pentas Seni Pelajar 2024"`
        }
      ]
    },
    
    // SECTION VI ("Meretas Ujian" - Enhanced)
    {
      id: "meretas-ujian",
      title: 'VI. "Meretas" Ujian (Exam "Hacking") – Peringatan Utama',
      elements: [
        { type: "subheading", level: 3, content: "Analisis Soal Ujian (Exam Question Analysis - P.A.T.):" },
        {
          type: "list",
          items: [
            "<strong>P</strong>urpose (Tujuan): Apa tujuan utama Anda menulis surat ini? (e.g., mengeluh, mengusulkan, memohon, mengundang, berterima kasih). Tujuan akan menentukan pilihan kata dan struktur utama.",
            "<strong>A</strong>udience (Penerima): Kepada SIAPA Anda menulis? (e.g., Kepala Sekolah, Manajer Dewan Kota, Direktur Perusahaan, Tokoh Masyarakat). Kenali jabatan dan institusinya untuk menentukan tingkat formalitas dan sapaan yang tepat.",
            "<strong>T</strong>one (Nada): Bagaimana nada surat Anda seharusnya? (e.g., formal dan tegas untuk keluhan, hormat dan persuasif untuk permohonan/undangan, tulus untuk ucapan terima kasih).",
            "Identifikasi Poin Kunci: Apa informasi inti yang harus ada dalam surat berdasarkan soal? (e.g., masalah spesifik, detail usulan, tanggal acara)."
          ]
        },
        { type: "paragraph", content: "<strong>Struktur adalah Kunci:</strong> Ikuti format surat resmi dengan teliti. Setiap komponen memiliki fungsinya." },
        { type: "paragraph", content: "<strong>Paragraf, Bukan Poin:</strong> Susun semua ide dan informasi menjadi paragraf yang kohesif dan mengalir. Gunakan kata penghubung antar kalimat dan antar paragraf." },
        { type: "paragraph", content: "<strong>Bahasa Baku dan Formal:</strong> Hindari bahasa sehari-hari, singkatan tidak resmi, atau bahasa gaul. Gunakan sapaan hormat dan kosakata yang sesuai." },
        { type: "paragraph", content: "<strong>Spesifik dan Konkret (Adaptasi dari Soal):</strong> Jika soal memberikan detail (nama, tempat, tanggal), gunakan itu. Jika tidak, gunakan placeholder yang logis atau istilah umum (lihat Bagian VII)." },
        { type: "paragraph", content: "<strong>Manajemen Waktu:</strong> Alokasikan waktu untuk merancang kerangka, menulis draf, dan memeriksa ulang (proofread)." },
        { type: "paragraph", content: "<strong>Pahami Jenis Surat:</strong> Keluhan, permohonan, usulan, penghargaan, atau undangan memiliki penekanan yang sedikit berbeda. Gunakan Bank Frasa (Bagian III) secara selektif." }
      ]
    },

    // SECTION VII (Tip Tambahan - Enhanced with specific exam adaptation advice)
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
            "Ucapan terima kasih atas bantuan atau dukungan."
          ]
        },
        { 
          type: "subheading",
          level: 3,
          content: "Mengadaptasi Contoh dan Kerangka untuk Ujian (Adapting Examples and Skeleton for Exams):"
        },
        {
          type: "paragraph",
          content: "Contoh-contoh surat dan Kerangka Induk dalam panduan ini sering menggunakan nama orang, tempat, dan organisasi yang spesifik untuk ilustrasi. <strong>Dalam ujian, jika soal TIDAK memberikan nama spesifik, Anda HARUS menggunakan istilah yang lebih umum atau placeholder yang logis. JANGAN mengarang nama perusahaan spesifik dengan \"Pte Ltd\" atau \"PT\" kecuali diminta secara eksplisit oleh soal atau konteksnya sangat jelas.</strong>"
        },
        {
          type: "list",
          items: [
            "<strong>Untuk nama perusahaan/organisasi:</strong> Jika tidak diberikan, gunakan \"Pimpinan Perusahaan XYZ\", \"Manajer Organisasi ABC\", atau sebutkan jenisnya secara umum seperti \"Kepala Departemen Sumber Daya Manusia\", \"Direktur Lembaga Penelitian Lingkungan\", atau \"Manajer Cabang Bank Sentosa\".",
            "<strong>Untuk nama orang (penerima):</strong> Jika tidak ada nama, gunakan jabatan seperti \"Yth. Bapak Manajer Pemasaran\", \"Yth. Ibu Kepala Sekolah\", atau \"Yth. Bapak/Ibu Pimpinan [Nama Institusi Umum dari Soal]\".",
            "<strong>Untuk nama Anda (pengirim):</strong> Gunakan nama samaran yang umum jika tidak ingin menggunakan nama asli, atau ikuti instruksi soal. Identitas Anda (sebagai siswa, ketua klub, penghuni) harus sesuai dengan skenario soal.",
            "Fokus utama adalah pada **struktur, format, dan frasa-frasa formal** yang dapat diterapkan secara universal. Kemudian, sesuaikan detail spesifik (seperti masalah, usulan, tanggal acara) dengan skenario yang diberikan dalam soal ujian."
          ]
        },
        { type: "paragraph", content: "<strong>Hindari Bahasa Gaul atau Non-Formal:</strong> Pertahankan tingkat formalitas yang tinggi." },
        { type: "paragraph", content: "<strong>Kejelasan Lebih Penting Daripada Kerumitan:</strong> Kalimat yang ringkas, jelas, dan benar secara tata bahasa lebih baik daripada kalimat yang panjang dan kompleks tetapi berpotensi salah." },
        { type: "paragraph", content: "<strong>Periksa Kembali (Proofread):</strong> Selalu alokasikan waktu untuk memeriksa tata bahasa, ejaan, tanda baca, dan kelengkapan komponen surat sebelum waktu ujian berakhir." },
        { type: "paragraph", content: "<strong>Latihan, Latihan, Latihan!</strong> Tulis ulang contoh-contoh surat ini dengan skenario berbeda, atau buat surat berdasarkan topik-topik umum menggunakan kerangka yang disediakan." }
      ]
    },
    // SECTION VIII (NEW - Peribahasa)
    {
      id: "peribahasa",
      title: "VIII. Penggunaan Peribahasa yang Sesuai (Appropriate Use of Proverbs)",
      elements: [
        { type: "paragraph", content: "Menggunakan peribahasa yang tepat dapat memperkaya bahasa surat Anda, namun gunakan dengan hati-hati dan pastikan relevan dengan konteks. Jangan memaksakan penggunaan jika tidak wajar. Berikut beberapa contoh yang mungkin bisa diadaptasi:" },
        {
          type: "subheading",
          level: 4,
          content: "1. Berat sama dipikul, ringan sama dijinjing."
        },
        { type: "paragraph", content: "<strong>Arti (Meaning):</strong> Susah senang ditanggung bersama; menekankan pentingnya kerja sama dan gotong royong. (Hardships and joys are borne together; emphasizes the importance of cooperation and mutual help.)" },
        { type: "paragraph", content: "<strong>Konteks Penggunaan (Contextual Use):</strong> Cocok untuk surat yang mengusulkan kerja sama komunitas, atau menggambarkan semangat kolaborasi dalam suatu proyek." },
        { type: "example", content: `Contoh Kalimat (Example Sentence): "Kami percaya, dengan semangat <strong>berat sama dipikul, ringan sama dijinjing</strong>, masalah kebersihan di lingkungan kita ini dapat kita atasi bersama."` },
        {
          type: "subheading",
          level: 4,
          content: "2. Di mana ada kemauan, di situ ada jalan."
        },
        { type: "paragraph", content: "<strong>Arti (Meaning):</strong> Jika ada niat dan usaha yang kuat, pasti akan ditemukan cara untuk mencapai tujuan atau mengatasi masalah. (If there is a strong will and effort, a way will surely be found to achieve a goal or overcome a problem.)" },
        { type: "paragraph", content: "<strong>Konteks Penggunaan (Contextual Use):</strong> Dapat digunakan untuk memperkuat usulan atau menunjukkan optimisme dalam menghadapi tantangan." },
        { type: "example", content: `Contoh Kalimat (Example Sentence): "Meskipun sumber daya kami terbatas, kami yakin bahwa <strong>di mana ada kemauan, di situ ada jalan</strong>, untuk merealisasikan program pemberdayaan pemuda ini."` },
        {
          type: "subheading",
          level: 4,
          content: "3. Bagai aur dengan tebing."
        },
        { type: "paragraph", content: "<strong>Arti (Meaning):</strong> Hubungan yang sangat erat dan saling membantu/membutuhkan. (A very close relationship of mutual help/need.)" },
        { type: "paragraph", content: "<strong>Konteks Penggunaan (Contextual Use):</strong> Bisa digunakan untuk menggambarkan pentingnya sinergi antara dua pihak atau lebih (misalnya, sekolah dengan orang tua murid, pemerintah dengan masyarakat)." },
        { type: "example", content: `Contoh Kalimat (Example Sentence): "Kerja sama antara pihak sekolah dan komite orang tua murid diharapkan dapat terjalin erat <strong>bagai aur dengan tebing</strong> demi kemajuan pendidikan anak-anak kita."` },
        {
          type: "subheading",
          level: 4,
          content: "4. Pucuk dicinta ulam pun tiba."
        },
        { type: "paragraph", content: "<strong>Arti (Meaning):</strong> Mendapatkan sesuatu yang lebih baik atau lebih banyak dari yang diharapkan; suatu kebetulan yang sangat menguntungkan. (Getting something better or more than expected; a very fortunate coincidence.)" },
        { type: "paragraph", content: "<strong>Konteks Penggunaan (Contextual Use):</strong> Cocok untuk surat ucapan terima kasih di mana bantuan yang diterima melebihi ekspektasi, atau ketika sebuah usulan diterima dengan sangat baik." },
        { type: "example", content: `Contoh Kalimat (Example Sentence): "Dukungan tambahan yang Bapak berikan di luar permohonan awal kami sungguh <strong>bagai pucuk dicinta ulam pun tiba</strong>, dan sangat membantu kelancaran acara kami."` },
        {
          type: "subheading",
          level: 4,
          content: "5. Bulat air karena pembuluh, bulat kata karena mufakat."
        },
        { type: "paragraph", content: "<strong>Arti (Meaning):</strong> Kesepakatan atau keputusan bersama dicapai melalui musyawarah dan persetujuan semua pihak. (Agreement or joint decisions are reached through deliberation and the consent of all parties.)" },
        { type: "paragraph", content: "<strong>Konteks Penggunaan (Contextual Use):</strong> Sesuai untuk surat yang menekankan hasil dari sebuah diskusi atau pertemuan yang mencapai konsensus." },
        { type: "example", content: `Contoh Kalimat (Example Sentence): "Setelah melalui diskusi yang mendalam, akhirnya kami mencapai keputusan ini bersama-sama, karena kami percaya bahwa <strong>bulat air karena pembuluh, bulat kata karena mufakat</strong>."` },
        { type: "important", content: "Catatan Penting tentang Peribahasa (Important Note on Proverbs): Gunakan secara selektif dan pastikan benar-benar sesuai dengan konteks. Penggunaan yang tidak tepat atau berlebihan justru dapat mengurangi kualitas surat resmi Anda. (Use selectively and ensure it truly fits the context. Inappropriate or excessive use can actually detract from the quality of your formal letter.)" }
      ]
    },
  ]
};
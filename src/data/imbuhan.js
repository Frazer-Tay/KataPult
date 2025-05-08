// src/data/imbuhan.js
// BATCH 1 of Imbuhan Data with Explanations

export const imbuhanData = [
  {
    id: 4,
    root: 'alam',
    targetWord: 'alami',
    sentence: 'Produk ini menggunakan pewarna ___ dari tumbuh-tumbuhan.',
    hint: 'natural',
    explanation: "The root word 'alam' (nature) takes the suffix '-i' to form the adjective 'alami' (natural). This adjective describes the 'pewarna' (coloring) in the sentence. Heuristic: Noun + '-i' often forms an adjective meaning 'related to/possessing the quality of the noun'."
  },
  {
    id: 6,
    root: 'ancam',
    targetWord: 'ancaman',
    sentence: 'Perubahan iklim merupakan ___ serius bagi masa depan planet ini.',
    hint: 'threat',
    explanation: "The root verb 'ancam' (to threaten) uses the suffix '-an' to form the noun 'ancaman' (threat). The sentence requires a noun as the object of 'merupakan' (constitutes/is a). Heuristic: Verb + '-an' often forms a noun representing the result or object of the verb."
  },
  {
    id: 7,
    root: 'anggap',
    targetWord: 'anggapan',
    sentence: '___ bahwa semua politisi korup tidak sepenuhnya benar.',
    hint: 'assumption, presumption',
    explanation: "The root verb 'anggap' (to assume/consider) takes the suffix '-an' to form the noun 'anggapan' (assumption/presumption). In this sentence, 'anggapan' acts as the subject. Heuristic: Verb + '-an' can create a noun for the act or result of the verb."
  },
  {
    id: 9,
    root: 'atur',
    targetWord: 'aturan',
    sentence: 'Setiap perusahaan memiliki ___ internal yang harus dipatuhi karyawan.',
    hint: 'rule',
    explanation: "The root verb 'atur' (to arrange/regulate) uses the suffix '-an' to form the noun 'aturan' (rule). The sentence structure 'memiliki ___' (has a ___) requires a noun. Heuristic: Verb + '-an' often forms a noun meaning 'the thing that is [verb-ed]' or 'the result of [verb-ing]'."
  },
  {
    id: 12,
    root: 'baca',
    targetWord: 'bacaan',
    sentence: 'Novel detektif itu menjadi ___ favoritnya akhir-akhir ini.',
    hint: 'reading passage, reading material',
    explanation: "The root verb 'baca' (to read) takes the suffix '-an' to form the noun 'bacaan' (reading material). It serves as a noun complement to 'menjadi' (became). Heuristic: Verb + '-an' can mean 'something that is [verb-ed]'."
  },
  {
    id: 13,
    root: 'balas',
    targetWord: 'balasan',
    sentence: 'Dia mengirim ___ cepat terhadap email dari kliennya.',
    hint: 'reply, response',
    explanation: "The root verb 'balas' (to reply) uses the suffix '-an' to form the noun 'balasan' (a reply/response). This noun is the direct object of the verb 'mengirim' (to send)."
  },
  {
    id: 18,
    root: 'ada',
    targetWord: 'berada',
    sentence: 'Saat kejadian itu, saya sedang ___ di luar kota.',
    hint: 'to be (located), to exist',
    explanation: "The root word 'ada' (to exist/be) takes the prefix 'ber-' to form the intransitive verb 'berada' (to be located/situated). 'Ber-' often forms verbs indicating a state or an action done by the subject without a direct object. Here it denotes location."
  },
  {
    id: 19,
    root: 'racun',
    targetWord: 'beracun',
    sentence: 'Beberapa jenis jamur liar sangat ___ jika dikonsumsi.',
    hint: 'poisonous, toxic',
    explanation: "The root noun 'racun' (poison) uses the prefix 'ber-' to form the adjective 'beracun' (poisonous/toxic), describing the 'jamur liar' (wild mushrooms). Heuristic: 'Ber-' + Noun can mean 'having [Noun]' or 'characterized by [Noun]'."
  },
  {
    id: 20,
    root: 'akibat',
    targetWord: 'berakibat',
    sentence: 'Keputusan yang terburu-buru seringkali ___ buruk.',
    hint: 'to have a consequence',
    explanation: "The root noun 'akibat' (consequence) takes the prefix 'ber-' to form the verb 'berakibat' (to result in/have a consequence). 'Ber-' here indicates 'to produce' or 'to have' the root noun as an outcome."
  },
  {
    id: 21,
    root: 'awal',
    targetWord: 'berawal',
    sentence: 'Persahabatan mereka ___ dari pertemuan di sebuah seminar.',
    hint: 'has a beginning',
    explanation: "The root noun 'awal' (beginning) uses the prefix 'ber-' to form the verb 'berawal' (to originate from/start from), indicating the starting point. Heuristic: 'Ber-' + Noun (time/origin) can mean 'to have [Noun] as its start'."
  },
  {
    id: 22,
    root: 'batas',
    targetWord: 'berbatas',
    sentence: 'Lahan itu ___ dengan sungai.',
    hint: 'to have a border, to have a limit',
    explanation: "The root noun 'batas' (border/limit) takes the prefix 'ber-' to form 'berbatas' (to have a border/to be bordered by). 'Ber-' indicates possession or characteristic of having a 'batas'."
  },
  {
    id: 23,
    root: 'batas',
    targetWord: 'berbatasan',
    sentence: 'Indonesia ___ darat dengan Malaysia.',
    hint: 'to border (with), be adjacent (with)',
    explanation: "The root noun 'batas' (border) with the circumfix 'ber-...-an' becomes 'berbatasan', meaning 'to share a border with'. This affix often indicates a reciprocal or mutual relationship/state."
  },
  {
    id: 24,
    root: 'batas',
    targetWord: 'berbataskan',
    sentence: 'Wilayah kami ___ pegunungan di sebelah utara.',
    hint: 'to border with',
    explanation: "The root 'batas' (border) with the circumfix 'ber-...-kan' becomes 'berbataskan', meaning 'to have as its border' or 'to use something as a border'. The mountains are the border."
  },
  {
    id: 25,
    root: 'belanja',
    targetWord: 'berbelanja',
    sentence: 'Ibu suka ___ di pasar tradisional.',
    hint: 'to shop, to go shopping',
    explanation: "The root 'belanja' (shopping/to shop) takes 'ber-' to form 'berbelanja' (to go shopping), an active verb indicating an activity. 'Ber-' often makes a noun into an activity verb."
  },
  {
    id: 26,
    root: 'beda',
    targetWord: 'berbeda',
    sentence: 'Pendapat mereka ___ tentang masalah itu.',
    hint: 'different',
    explanation: "The root 'beda' (difference/different) uses 'ber-' to form 'berbeda' (to be different/to differ), indicating a state or characteristic. Heuristic: 'Ber-' + Adjective/Noun can mean 'to be [Adjective]' or 'to have the quality of [Noun]'."
  },
  {
    id: 27,
    root: 'bentuk',
    targetWord: 'berbentuk',
    sentence: 'Awan itu ___ seperti kapal layar.',
    hint: 'to have a shape',
    explanation: "The root noun 'bentuk' (shape/form) with 'ber-' becomes 'berbentuk' (to have the shape of/to be shaped like), describing the cloud's appearance."
  },
  {
    id: 28,
    root: 'bicara',
    targetWord: 'berbicara',
    sentence: 'Dia pandai ___ di depan banyak orang.',
    hint: 'to talk, to speak',
    explanation: "The root 'bicara' (to speak/talk) often appears with 'ber-' to form 'berbicara' (to talk/speak), an active intransitive verb emphasizing the act of speaking."
  },
  {
    id: 29,
    root: 'budaya',
    targetWord: 'berbudaya',
    sentence: 'Masyarakat ___ selalu menghargai perbedaan.',
    hint: 'to have culture, cultured',
    explanation: "The root noun 'budaya' (culture) takes 'ber-' to form the adjective 'berbudaya' (cultured/having culture), describing the society as possessing culture."
  },
  {
    id: 30,
    root: 'dagang',
    targetWord: 'berdagang',
    sentence: 'Keluarganya ___ rempah-rempah sejak lama.',
    hint: 'to trade, to earn a living by buying & selling, to deal in such-&-such a commodity',
    explanation: "The root noun 'dagang' (trade) uses 'ber-' to form 'berdagang' (to trade/to do business), an active verb describing the family's occupation or activity."
  },
  {
    id: 31,
    root: 'dalih',
    targetWord: 'berdalih',
    sentence: 'Dia selalu ___ jika terlambat masuk kerja.',
    hint: 'to quibble',
    explanation: "The root noun 'dalih' (excuse/pretext) takes 'ber-' to form 'berdalih' (to make excuses/to quibble), an active verb describing his action of using an excuse."
  },
  {
    id: 32,
    root: 'dampak',
    targetWord: 'berdampak',
    sentence: 'Kebijakan itu ___ positif bagi ekonomi.',
    hint: 'has an impact',
    explanation: "The root noun 'dampak' (impact) uses 'ber-' to form 'berdampak' (to have an impact), indicating the policy produces or results in an impact."
  },
  {
    id: 33,
    root: 'edar',
    targetWord: 'beredar',
    sentence: 'Uang palsu ___ di pasar malam itu.',
    hint: 'to circulate (intransitive verb)',
    explanation: "The root 'edar' (circulate) takes 'ber-' to form 'beredar' (to be in circulation/to circulate intransitively). It describes the state of the counterfeit money moving around."
  },
  {
    id: 34,
    root: 'fungsi',
    targetWord: 'berfungsi',
    sentence: 'Mesin ini tidak ___ sebagaimana mestinya.',
    hint: 'to have a function; functional, working',
    explanation: "The root noun 'fungsi' (function) uses 'ber-' to form 'berfungsi' (to function/to work), indicating the operational state of the machine; whether it performs its function."
  },
  {
    id: 35,
    root: 'gaul',
    targetWord: 'bergaul',
    sentence: 'Penting untuk ___ dengan orang-orang dari berbagai latar belakang.',
    hint: 'to socialise',
    explanation: "The root 'gaul' (socialize/mix) takes 'ber-' to form 'bergaul' (to socialize/interact), an active verb indicating the act of socializing."
  },
  {
    id: 36,
    root: 'gabung',
    targetWord: 'bergabung',
    sentence: 'Dia memutuskan untuk ___ dengan klub pecinta alam.',
    hint: 'to join together, to merge (intransitive verb)',
    explanation: "The root 'gabung' (join/merge) uses 'ber-' to form 'bergabung' (to join/to become a member), an active intransitive verb describing his decision to unite with the club."
  },
  {
    id: 37,
    root: 'geser',
    targetWord: 'bergeser',
    sentence: 'Makna kata itu telah ___ seiring waktu.',
    hint: 'to shift (intransitive verb); shifted, move',
    explanation: "The root 'geser' (shift/move) takes 'ber-' to form 'bergeser' (to shift/move intransitively). It describes the change or movement of the word's meaning."
  },
  {
    id: 38,
    root: 'guna',
    targetWord: 'berguna',
    sentence: 'Informasi ini sangat ___ untuk penelitian saya.',
    hint: 'useful',
    explanation: "The root noun 'guna' (use/benefit) uses 'ber-' to form the adjective 'berguna' (useful), describing the information as having use or benefit."
  },
  {
    id: 39,
    root: 'hasil',
    targetWord: 'berhasil',
    sentence: 'Tim kami ___ memenangkan pertandingan final.',
    hint: 'successful',
    explanation: "The root noun 'hasil' (result/outcome) takes 'ber-' to form 'berhasil' (to be successful/to succeed). Here, it indicates the team achieved a successful outcome in winning."
  },
  {
    id: 40,
    root: 'hadap',
    targetWord: 'berhadapan',
    sentence: 'Rumahnya ___ langsung dengan pantai.',
    hint: 'to face each other',
    explanation: "The root 'hadap' (face) with the circumfix 'ber-...-an' becomes 'berhadapan' (to be facing/to face each other or something). It describes the orientation of the house relative to the beach."
  },
  {
    id: 41,
    root: 'halang',
    targetWord: 'berhalangan',
    sentence: 'Maaf, saya ___ hadir karena sakit.',
    hint: 'to have a hindrance/obstacle, unable to',
    explanation: "The root 'halang' (obstruct) with the circumfix 'ber-...-an' forms 'berhalangan' (to be hindered/to have an obstacle). It explains the reason for being unable to attend."
  },
  {
    id: 42,
    root: 'harga',
    targetWord: 'berharga',
    sentence: 'Pengalaman adalah pelajaran yang ___.',
    hint: 'valuable, precious; to have a price',
    explanation: "The root noun 'harga' (price/value) takes 'ber-' to form the adjective 'berharga' (valuable/precious), describing 'pelajaran' (lesson) as having great value."
  },
  {
    id: 43,
    root: 'harap',
    targetWord: 'berharap',
    sentence: 'Kami ___ Anda dapat bergabung dengan tim kami.',
    hint: 'to have hope',
    explanation: "The root noun 'harap' (hope) uses 'ber-' to form 'berharap' (to hope), an active verb expressing the speaker's wish or expectation."
  },
  {
    id: 44,
    root: 'hubung',
    targetWord: 'berhubungan',
    sentence: 'Apakah masalah ini ___ dengan proyek sebelumnya?',
    hint: 'to have relations, related',
    explanation: "The root 'hubung' (connect) with the circumfix 'ber-...-an' forms 'berhubungan' (to be related/connected with). It questions the existence of a connection."
  },
  {
    id: 45,
    root: 'interaksi',
    targetWord: 'berinteraksi',
    sentence: 'Dia mudah ___ dengan orang baru.',
    hint: 'to interact',
    explanation: "The root noun 'interaksi' (interaction), often a loanword, takes 'ber-' to form 'berinteraksi' (to interact), an active verb indicating the act of engaging with others."
  },
  {
    id: 46,
    root: 'jual',
    targetWord: 'berjualan',
    sentence: 'Ibu itu ___ kue tradisional di pasar pagi.',
    hint: 'to sell/trade for a living',
    explanation: "The root verb 'jual' (to sell) with the circumfix 'ber-...-an' forms 'berjualan' (to be selling/to trade for a living). It describes the mother's regular activity of selling."
  },
  {
    id: 47,
    root: 'jalan',
    targetWord: 'berjalan',
    sentence: 'Kami ___ menyusuri tepi sungai.',
    hint: 'to walk',
    explanation: "The root noun 'jalan' (road/way) takes 'ber-' to form 'berjalan' (to walk/to go), an active verb describing their movement on foot."
  },
  {
    id: 48,
    root: 'kait',
    targetWord: 'berkaitan',
    sentence: 'Semua topik ini ___ satu sama lain.',
    hint: 'to have a link',
    explanation: "The root 'kait' (hook/link) with the circumfix 'ber-...-an' forms 'berkaitan' (to be related/linked). It describes the mutual relationship between the topics."
  },
  {
    id: 49,
    root: 'kesan',
    targetWord: 'berkesan',
    sentence: 'Liburan ke pulau itu sangat ___ baginya.',
    hint: 'memorable',
    explanation: "The root noun 'kesan' (impression) takes 'ber-' to form the adjective 'berkesan' (memorable/impressive), describing the holiday as leaving a strong impression."
  },
  {
    id: 50,
    root: 'kobar',
    targetWord: 'berkobar',
    sentence: 'Semangat juangnya ___ saat melihat bendera negaranya.',
    hint: 'to flare up, to blaze',
    explanation: "The root 'kobar' (flare/blaze) uses 'ber-' to form 'berkobar' (to flare up/blaze). It describes the intense emergence or burning of his fighting spirit."
  },
  {
    id: 51,
    root: 'korban',
    targetWord: 'berkorban',
    sentence: 'Pahlawan rela ___ nyawa demi negara.',
    hint: 'to make a sacrifice',
    explanation: "The root noun 'korban' (victim/sacrifice) takes 'ber-' to form 'berkorban' (to make a sacrifice), an active verb describing the hero's willingness to give up something valuable."
  },
  {
    id: 52,
    root: 'kumpul',
    targetWord: 'berkumpul',
    sentence: 'Setiap sore, anak-anak ___ di lapangan untuk bermain.',
    hint: 'to get together, to gather',
    explanation: "The root 'kumpul' (gather) uses 'ber-' to form 'berkumpul' (to gather/assemble), an intransitive verb describing the children's action of coming together."
  },
  {
    id: 53,
    root: 'kurang',
    targetWord: 'berkurang',
    sentence: 'Stok barang di gudang mulai ___.',
    hint: 'reduced, decrease',
    explanation: "The root 'kurang' (less/lack) takes 'ber-' to form 'berkurang' (to decrease/become less). It describes the stock quantity diminishing."
  },
  {
    id: 54,
    root: 'kembang',
    targetWord: 'berkembang',
    sentence: 'Bisnis rintisannya ___ pesat dalam setahun.',
    hint: 'is developing, is growing (intransitive)',
    explanation: "The root 'kembang' (flower/develop) uses 'ber-' to form 'berkembang' (to develop/grow/flourish). It describes the progress and expansion of his startup business."
  },
  {
    id: 55,
    root: 'kunjung',
    targetWord: 'berkunjung',
    sentence: 'Kami akan ___ ke rumah nenek akhir pekan ini.',
    hint: 'to visit (intransitive form)',
    explanation: "The root 'kunjung' (visit) takes 'ber-' to form 'berkunjung' (to visit), an intransitive verb indicating the action of going to visit someone or a place."
  },
  {
    id: 56,
    root: 'langganan',
    targetWord: 'berlangganan',
    sentence: 'Dia ___ majalah sains populer itu.',
    hint: 'to subscribe',
    explanation: "The root noun 'langganan' (subscription/customer) takes 'ber-' to form 'berlangganan' (to subscribe), indicating an ongoing action or state of being a subscriber."
  },
  {
    id: 57,
    root: 'langsung',
    targetWord: 'berlangsung',
    sentence: 'Upacara pernikahan ___ dengan khidmat.',
    hint: 'in progress, ongoing',
    explanation: "The root 'langsung' (direct/immediately) uses 'ber-' to form 'berlangsung' (to take place/to be in progress), describing the wedding ceremony as currently happening."
  },
  {
    id: 58,
    root: 'latih',
    targetWord: 'berlatih',
    sentence: 'Atlet itu ___ keras setiap hari.',
    hint: 'to practice',
    explanation: "The root 'latih' (train) takes 'ber-' to form 'berlatih' (to practice/train oneself), an active intransitive verb describing the athlete's regular activity."
  },
  {
    id: 59,
    root: 'manfaat',
    targetWord: 'bermanfaat',
    sentence: 'Semoga ilmu yang didapat ___ bagi masyarakat.',
    hint: 'beneficial, useful, helpful',
    explanation: "The root noun 'manfaat' (benefit/use) uses 'ber-' to form the adjective 'bermanfaat' (beneficial/useful), describing the knowledge as having benefit for society."
  },
  {
    id: 60,
    root: 'mimpi',
    targetWord: 'bermimpi',
    sentence: 'Semalam saya ___ tentang liburan ke pantai.',
    hint: 'to have a dream',
    explanation: "The root noun 'mimpi' (dream) takes 'ber-' to form 'bermimpi' (to dream), an active verb indicating the action of having a dream."
  },
  {
    id: 61,
    root: 'minat',
    targetWord: 'berminat',
    sentence: 'Apakah Anda ___ untuk mengikuti kursus ini?',
    hint: 'to have interest',
    explanation: "The root noun 'minat' (interest) uses 'ber-' to form 'berminat' (to be interested/to have interest). It queries if 'Anda' (you) possess interest."
  },
  {
    id: 62,
    root: 'pamer',
    targetWord: 'berpameran',
    sentence: 'Para seniman muda ___ karya mereka di galeri itu.',
    hint: 'to do exhibition',
    explanation: "The root 'pamer' (show off/exhibit) with 'ber-' and '-an' forms 'berpameran' (to hold an exhibition). 'Ber-...-an' often indicates participation in an activity. The artists are participating in an exhibition."
  },
  {
    id: 63,
    root: 'pengaruh',
    targetWord: 'berpengaruh',
    sentence: 'Tokoh masyarakat itu sangat ___ di lingkungannya.',
    hint: 'influential',
    explanation: "The root noun 'pengaruh' (influence) uses 'ber-' to form the adjective 'berpengaruh' (influential), meaning 'having influence'."
  },
  {
    id: 64,
    root: 'peran',
    targetWord: 'berperan',
    sentence: 'Setiap anggota tim harus ___ aktif.',
    hint: 'to have the role',
    explanation: "The root noun 'peran' (role) takes 'ber-' to form 'berperan' (to play a role/have a role). It indicates the function each team member must fulfill."
  },
  {
    id: 65,
    root: 'penduduk',
    targetWord: 'berpenduduk',
    sentence: 'Kota Jakarta ___ sangat padat.',
    hint: 'to have a population',
    explanation: "The root noun 'penduduk' (population/resident) uses 'ber-' to form 'berpenduduk' (to have a population of). It describes Jakarta in terms of its population."
  },
  {
    id: 66,
    root: 'pisah',
    targetWord: 'berpisah',
    sentence: 'Mereka ___ di persimpangan jalan.',
    hint: 'to separate, to split up, to part ways',
    explanation: "The root 'pisah' (separate) takes 'ber-' to form 'berpisah' (to separate/part ways). It's an intransitive verb describing their action."
  },
  {
    id: 67,
    root: 'potensi',
    targetWord: 'berpotensi',
    sentence: 'Daerah ini ___ menjadi pusat agrowisata.',
    hint: 'to have potential',
    explanation: "The root noun 'potensi' (potential) uses 'ber-' to form 'berpotensi' (to have potential). It indicates the area possesses potential."
  },
  {
    id: 68,
    root: 'rencana',
    targetWord: 'berencana',
    sentence: 'Kami ___ pindah rumah tahun depan.',
    hint: 'to have a plan',
    explanation: "The root noun 'rencana' (plan) takes 'ber-' to form 'berencana' (to plan/to have a plan). It describes their intention to make and follow a plan."
  },
  {
    id: 69,
    root: 'saing',
    targetWord: 'bersaing',
    sentence: 'Produk lokal harus mampu ___ dengan produk impor.',
    hint: 'to compete',
    explanation: "The root 'saing' (compete) uses 'ber-' to form 'bersaing' (to compete). It's an active verb indicating the act of competition."
  },
  {
    id: 70,
    root: 'salah',
    targetWord: 'bersalah',
    sentence: 'Dia merasa ___ setelah melanggar janji.',
    hint: 'guilty',
    explanation: "The root 'salah' (wrong/mistake) takes 'ber-' to form 'bersalah' (to be guilty/at fault). It describes his state of being wrong or blameworthy."
  },
  {
    id: 71,
    root: 'sedia',
    targetWord: 'bersedia',
    sentence: 'Apakah Anda ___ membantu kami?',
    hint: 'willing to',
    explanation: "The root 'sedia' (ready/willing) uses 'ber-' to form 'bersedia' (to be willing). It asks about the person's state of willingness."
  },
  {
    id: 72,
    root: 'sepakat',
    targetWord: 'bersepakat',
    sentence: 'Kedua belah pihak akhirnya ___ untuk berdamai.',
    hint: 'to be in an agreement',
    explanation: "The root 'sepakat' (agree/agreement) takes 'ber-' to form 'bersepakat' (to agree/to come to an agreement). It describes the action of reaching a mutual agreement."
  },
  {
    id: 73,
    root: 'temu',
    targetWord: 'bertemu',
    sentence: 'Saya tidak sengaja ___ dengannya kemarin.',
    hint: 'to meet',
    explanation: "The root 'temu' (meet) uses 'ber-' to form 'bertemu' (to meet). It's an active verb, here describing an unintentional encounter."
  },
  {
    id: 76,
    root: 'untung',
    targetWord: 'beruntung',
    sentence: 'Dia ___ memenangkan undian itu.',
    hint: 'lucky, fortunate; to profit',
    explanation: "The root 'untung' (profit/luck) takes 'ber-' to form 'beruntung' (to be lucky/fortunate). It describes his state of having good fortune in winning the lottery."
  },
  {
    id: 77,
    root: 'ukur',
    targetWord: 'berukuran',
    sentence: 'Kamar tidurnya ___ sedang, tidak terlalu besar.',
    hint: 'has a size',
    explanation: "The root 'ukur' (measure/size) with the circumfix 'ber-...-an' becomes 'berukuran' (to have a size of/to be of a certain size). It describes the bedroom's dimension."
  },
  {
    id: 78,
    root: 'upaya',
    targetWord: 'berupaya',
    sentence: 'Polisi ___ keras menangkap pelaku kejahatan.',
    hint: 'to make an effort',
    explanation: "The root noun 'upaya' (effort) takes 'ber-' to form 'berupaya' (to make an effort/to strive). It describes the police's action of exerting effort."
  },
  {
    id: 79,
    root: 'wujud',
    targetWord: 'berwujud',
    sentence: 'Konsep abstrak itu sulit ___ nyata.',
    hint: 'to have a form, to manifest',
    explanation: "The root noun 'wujud' (form/manifestation) uses 'ber-' to form 'berwujud' (to have a form/to manifest). It describes the difficulty for the abstract concept to take a real, tangible form."
  },
  {
    id: 88,
    root: 'dagang',
    targetWord: 'dagangan',
    sentence: '___ di toko itu sangat lengkap.',
    hint: 'merchandise',
    explanation: "The root 'dagang' (trade) takes the suffix '-an' to form the noun 'dagangan' (merchandise/goods for sale). 'Dagangan' is the subject of the sentence, referring to the items sold."
  },
  {
    id: 90,
    root: 'dalih',
    targetWord: 'dalih',
    sentence: 'Dia menggunakan sakit sebagai ___ untuk tidak masuk kerja.',
    hint: 'excuse, pretext',
    explanation: "This is a root word used as a noun. 'Dalih' (excuse/pretext) directly fits the sentence as the thing used as an excuse. No affix is applied or needed to change 'dalih' here for this meaning."
  },
  {
    id: 94,
    root: 'daya saing',
    targetWord: 'daya saing',
    sentence: 'Peningkatan kualitas produk penting untuk ___ global.',
    hint: 'competitiveness',
    explanation: "'Daya saing' (competitiveness) is a compound noun phrase. 'Daya' means power/ability and 'saing' means compete. Together, they form the concept of 'competitiveness'. No single affix creates this; it's a fixed lexical item required by the sentence."
  },
  {
    id: 96,
    root: 'abai',
    targetWord: 'diabaikan',
    sentence: 'Nasihat orang tua sebaiknya tidak ___.',
    hint: 'to be ignored, to be neglected, to be disregarded',
    explanation: "The root 'abai' (neglect) uses the prefix 'di-' and suffix '-kan' to form the passive verb 'diabaikan' (to be ignored/neglected). The advice (subject) is the recipient of the action of being ignored. Heuristic: 'di-...-kan' often forms passive verbs where the subject is acted upon."
  },
  {
    id: 97,
    root: 'adil',
    targetWord: 'diadili',
    sentence: 'Kasus pelanggaran HAM itu akan ___ secara terbuka.',
    hint: 'to be judged, to be put on trial',
    explanation: "The root 'adil' (just, to judge) takes the prefix 'di-' and suffix '-i' to form the passive verb 'diadili' (to be tried/judged). The 'kasus' (case) is the recipient of the action of judgment. Heuristic: 'di-...-i' often forms passive verbs indicating an action done towards or upon the subject."
  },
  {
    id: 98,
    root: 'ada',
    targetWord: 'diadakan',
    sentence: 'Pameran buku akan ___ bulan depan.',
    hint: 'to be held (e.g., an event, a meeting)',
    explanation: "The root 'ada' (exist, be) with prefix 'di-' and suffix '-kan' forms the passive verb 'diadakan' (to be held/organized). The 'pameran buku' (book fair) is the event that will be brought into existence or made to happen."
  },
  {
    id: 99,
    root: 'anggap',
    targetWord: 'dianggap',
    sentence: 'Dia ___ sebagai pahlawan oleh warga desanya.',
    hint: 'to be considered/regarded',
    explanation: "The root 'anggap' (to consider/regard) uses the prefix 'di-' to form the passive verb 'dianggap' (to be considered/regarded). 'Dia' (He/She) is the one being subjected to the act of consideration."
  },
  {
    id: 100,
    root: 'akibat',
    targetWord: 'diakibatkan',
    sentence: 'Kerugian besar ___ oleh bencana alam tersebut.',
    hint: 'to be caused',
    explanation: "The root 'akibat' (consequence) with prefix 'di-' and suffix '-kan' forms the passive verb 'diakibatkan' (to be caused by). The 'kerugian besar' (big loss) is the result that is caused by the natural disaster."
  },
  {
    id: 101,
    root: 'aku',
    targetWord: 'diakui',
    sentence: 'Keahliannya dalam bidang IT sudah ___ secara internasional.',
    hint: 'to be acknowledged',
    explanation: "The root 'aku' (I, to admit) with prefix 'di-' and suffix '-i' forms the passive verb 'diakui' (to be acknowledged/recognized). His expertise (subject) receives the action of acknowledgment."
  },
  {
    id: 102,
    root: 'alam',
    targetWord: 'dialami',
    sentence: 'Kesulitan sering ___ saat memulai usaha baru.',
    hint: 'to be experienced',
    explanation: "The root 'alam' (nature, experience) with prefix 'di-' and suffix '-i' forms the passive verb 'dialami' (to be experienced). Difficulties (subject) are what is experienced."
  },
  {
    id: 103,
    root: 'angkat',
    targetWord: 'diangkat',
    sentence: 'Beban berat itu ___ bersama-sama.',
    hint: 'to be lifted up',
    explanation: "The root 'angkat' (lift) with prefix 'di-' forms the passive verb 'diangkat' (to be lifted). The heavy load (subject) is the recipient of the lifting action. Heuristic: 'di-' prefix marks the passive voice."
  },
  {
    id: 104,
    root: 'ancam',
    targetWord: 'diancam',
    sentence: 'Saksi kunci itu ___ agar tidak memberikan keterangan.',
    hint: 'to be threatened',
    explanation: "The root 'ancam' (threaten) takes the prefix 'di-' to form the passive verb 'diancam' (to be threatened). The key witness (subject) is the recipient of the threat."
  },
  {
    id: 105,
    root: 'atasi',
    targetWord: 'diatasi',
    sentence: 'Semua masalah pasti bisa ___ jika dihadapi bersama.',
    hint: 'to be overcome',
    explanation: "The root 'atasi' (to overcome) uses the prefix 'di-' to form the passive verb 'diatasi' (to be overcome). The problems (subject) are the things that can be overcome."
  },
  {
    id: 106,
    root: 'atur',
    targetWord: 'diatur',
    sentence: 'Semua barang ___ rapi di dalam lemari.',
    hint: 'to be arranged, to be organised, to be regulated',
    explanation: "The root 'atur' (arrange/regulate) takes the prefix 'di-' to form the passive verb 'diatur' (to be arranged/organized). The items (subject) receive the action of being arranged."
  },
  {
    id: 107,
    root: 'awal',
    targetWord: 'diawali',
    sentence: 'Acara ___ dengan sambutan dari ketua panitia.',
    hint: 'to be preceded',
    explanation: "The root 'awal' (beginning) with prefix 'di-' and suffix '-i' forms the passive verb 'diawali' (to be preceded/started by). The event (subject) is started by the welcoming speech."
  },
  {
    id: 108,
    root: 'awas',
    targetWord: 'diawasi',
    sentence: 'Ujian berlangsung tenang karena ___ dengan ketat.',
    hint: 'to be watched, to be supervised',
    explanation: "The root 'awas' (watch out/supervise) takes prefix 'di-' and suffix '-i' to form the passive verb 'diawasi' (to be watched/supervised). The exam (implied subject of 'karena ...') is being supervised."
  },
  {
    id: 109,
    root: 'baca',
    targetWord: 'dibaca',
    sentence: 'Pengumuman penting itu harap ___ dengan saksama.',
    hint: 'to be read',
    explanation: "The root 'baca' (read) takes the prefix 'di-' to form the passive verb 'dibaca' (to be read). The important announcement (subject) should receive the action of reading."
  },
  {
    id: 110,
    root: 'balas',
    targetWord: 'dibalas',
    sentence: 'Kebaikan pasti akan ___ dengan kebaikan pula.',
    hint: 'to be replied; to be retaliated',
    explanation: "The root 'balas' (reply/retaliate) takes the prefix 'di-' to form the passive verb 'dibalas' (to be replied to/retaliated). Kindness (subject) will receive the action of being replied to with kindness."
  },
  {
    id: 111,
    root: 'bangun',
    targetWord: 'dibangun',
    sentence: 'Rumah impian mereka sedang ___.',
    hint: 'to be built',
    explanation: "The root 'bangun' (build/wake up) takes the prefix 'di-' to form the passive verb 'dibangun' (to be built). Their dream house (subject) is receiving the action of being built."
  },
  {
    id: 112,
    root: 'bakar',
    targetWord: 'dibakar',
    sentence: 'Sate ayam itu ___ di atas arang panas.',
    hint: 'to be burned',
    explanation: "The root 'bakar' (burn) uses the prefix 'di-' to form the passive verb 'dibakar' (to be burned/grilled). The chicken satay (subject) receives the action of burning/grilling."
  },
  {
    id: 113,
    root: 'bangga',
    targetWord: 'dibanggakan',
    sentence: 'Prestasi itu patut ___ oleh kita semua.',
    hint: 'to be prided',
    explanation: "The root 'bangga' (proud) uses prefix 'di-' and suffix '-kan' to form the passive verb 'dibanggakan' (to be proud of / something to be proud of). The achievement (subject) is something that should receive the feeling of pride from us."
  },
  {
    id: 114,
    root: 'batas',
    targetWord: 'dibatasi',
    sentence: 'Kecepatan kendaraan di area sekolah ___.',
    hint: 'to be limited, to be restricted',
    explanation: "The root 'batas' (limit/border) takes prefix 'di-' and suffix '-i' to form the passive verb 'dibatasi' (to be limited/restricted). Vehicle speed (subject) is subjected to limitation."
  },
  {
    id: 115,
    root: 'beda',
    targetWord: 'dibedakan',
    sentence: 'Anak kembar itu sulit ___ satu sama lain.',
    hint: 'to be distinguished, to be differentiated',
    explanation: "The root 'beda' (different) uses prefix 'di-' and suffix '-kan' to form the passive verb 'dibedakan' (to be differentiated/distinguished). The twins (subject) are difficult to be the object of differentiation."
  },
  {
    id: 116,
    root: 'bentuk',
    targetWord: 'dibentuk',
    sentence: 'Panitia khusus ___ untuk menangani masalah ini.',
    hint: 'to be formed, to be shaped',
    explanation: "The root 'bentuk' (form/shape) takes the prefix 'di-' to form the passive verb 'dibentuk' (to be formed/shaped). The special committee (subject) receives the action of being formed."
  },
  {
    id: 117,
    root: 'laku',
    targetWord: 'diberlakukan',
    sentence: 'Tarif parkir baru ___ mulai hari ini.',
    hint: 'to be imposed, to be put into effect, to be implemented',
    explanation: "The root 'laku' (valid/apply) uses the circumfix 'di-ber-...-kan' (a combination of passive 'di-' and active 'memberlakukan') to form 'diberlakukan' (to be put into effect/implemented). The new parking tariff (subject) is the thing being implemented."
  },
  {
    id: 118,
    root: 'biasa',
    targetWord: 'dibiasakan',
    sentence: 'Hidup hemat perlu ___ sejak dini.',
    hint: 'to be made into a usual/ordinary/normal thing',
    explanation: "The root 'biasa' (usual/ordinary) takes prefix 'di-' and suffix '-kan' to form the passive verb 'dibiasakan' (to be made a habit/accustomed). Frugal living (subject) needs to be made into a habit."
  },
  {
    id: 119,
    root: 'buang',
    targetWord: 'dibuang',
    sentence: 'Sampah harus ___ pada tempatnya.',
    hint: 'to be thrown away, to be discarded',
    explanation: "The root 'buang' (throw away) uses the prefix 'di-' to form the passive verb 'dibuang' (to be thrown away). Trash (subject) must receive the action of being thrown away."
  },
  {
    id: 120,
    root: 'budaya',
    targetWord: 'dibudayakan',
    sentence: 'Gotong royong perlu terus ___ di masyarakat.',
    hint: 'to be cultivated',
    explanation: "The root 'budaya' (culture) takes prefix 'di-' and suffix '-kan' to form the passive verb 'dibudayakan' (to be cultivated as a culture/habit). Mutual help (subject) needs to be cultivated."
  },
  {
    id: 121,
    root: 'bukti',
    targetWord: 'dibuktikan',
    sentence: 'Semua tuduhan harus ___ di pengadilan.',
    hint: 'to be proven',
    explanation: "The root 'bukti' (proof) uses prefix 'di-' and suffix '-kan' to form the passive verb 'dibuktikan' (to be proven). All accusations (subject) must receive the action of being proven."
  },
  {
    id: 122,
    root: 'cegah',
    targetWord: 'dicegah',
    sentence: 'Pencurian dapat ___ dengan meningkatkan keamanan.',
    hint: 'to be prevented',
    explanation: "The root 'cegah' (prevent) takes the prefix 'di-' to form the passive verb 'dicegah' (to be prevented). Theft (subject) can be subjected to prevention."
  },
  {
    id: 123,
    root: 'cemar',
    targetWord: 'dicemari',
    sentence: 'Udara kota besar sering ___ oleh polusi kendaraan.',
    hint: 'to be polluted, to be contaminated',
    explanation: "The root 'cemar' (pollute/defile) uses prefix 'di-' and suffix '-i' to form the passive verb 'dicemari' (to be polluted/contaminated by). The city air (subject) receives the action of pollution."
  },
  {
    id: 124,
    root: 'cipta',
    targetWord: 'diciptakan',
    sentence: 'Karya seni yang indah itu ___ oleh seniman lokal.',
    hint: 'to be created',
    explanation: "The root 'cipta' (create) takes prefix 'di-' and suffix '-kan' to form the passive verb 'diciptakan' (to be created). The beautiful artwork (subject) receives the action of creation."
  },
  {
    id: 126,
    root: 'daftar',
    targetWord: 'didaftarkan',
    sentence: 'Anak yang baru lahir segera ___ untuk akta kelahiran.',
    hint: 'to be registered',
    explanation: "The root 'daftar' (list/register) uses prefix 'di-' and suffix '-kan' to form the passive verb 'didaftarkan' (to be registered). The newborn child (subject) needs to be registered."
  },
  {
    id: 127,
    root: 'dagang',
    targetWord: 'diperdagangkan',
    sentence: 'Produk kerajinan lokal ___ hingga ke luar negeri.',
    hint: 'to be traded',
    explanation: "The root 'dagang' (trade) uses the circumfix 'di-per-...-kan' (passive form of 'memperdagangkan') to mean 'to be traded'. Local handicraft products (subject) are the items being traded."
  },
  {
    id: 128,
    root: 'dapat',
    targetWord: 'didapatkan',
    sentence: 'Tiket konser itu sulit ___ karena cepat habis.',
    hint: 'to be obtained',
    explanation: "The root 'dapat' (can/get) uses prefix 'di-' and suffix '-kan' to form the passive verb 'didapatkan' (to be obtained/gotten). The concert tickets (subject) are difficult to be obtained."
  },
  {
    id: 129,
    root: 'dasar',
    targetWord: 'didasari',
    sentence: 'Tindakan menolong sesama harus ___ oleh keikhlasan.',
    hint: 'to be based on',
    explanation: "The root 'dasar' (base/foundation) takes prefix 'di-' and suffix '-i' to form the passive verb 'didasari' (to be based on/underlain by). The act of helping (subject) must be based on sincerity."
  },
  {
    id: 130,
    root: 'dorong',
    targetWord: 'didorong',
    sentence: 'Siswa ___ untuk aktif bertanya di dalam kelas.',
    hint: 'to be pushed, to be encouraged',
    explanation: "The root 'dorong' (push) takes the prefix 'di-' to form the passive verb 'didorong' (to be pushed/encouraged). Students (subject) are encouraged to ask questions."
  },
  {
    id: 131,
    root: 'duduk',
    targetWord: 'diduduki',
    sentence: 'Jabatan penting itu ___ oleh orang yang berpengalaman.',
    hint: 'to be occupied',
    explanation: "The root 'duduk' (sit) uses prefix 'di-' and suffix '-i' to form the passive verb 'diduduki' (to be occupied/sat upon). The important position (subject) is occupied by someone."
  },
  {
    id: 132,
    root: 'duga',
    targetWord: 'diduga',
    sentence: 'Dia ___ terlibat dalam kasus penipuan itu.',
    hint: 'to be suspected',
    explanation: "The root 'duga' (suspect/guess) takes the prefix 'di-' to form the passive verb 'diduga' (to be suspected). 'Dia' (He/She) is the one being suspected."
  },
  {
    id: 133,
    root: 'dukung',
    targetWord: 'didukung',
    sentence: 'Program beasiswa itu ___ oleh banyak perusahaan.',
    hint: 'to be supported',
    explanation: "The root 'dukung' (support) uses the prefix 'di-' to form the passive verb 'didukung' (to be supported). The scholarship program (subject) receives support from companies."
  },
  {
    id: 134,
    root: 'edar',
    targetWord: 'diedarkan',
    sentence: 'Obat ___ harus memiliki izin dari BPOM.',
    hint: 'to be circulated',
    explanation: "The root 'edar' (circulate) uses prefix 'di-' and suffix '-kan' to form the passive verb 'diedarkan' (to be circulated/distributed). Medicine (subject) that is circulated must have permission."
  },
  {
    id: 135,
    root: 'gabung',
    targetWord: 'digabungkan',
    sentence: 'File laporan dari setiap divisi akan ___.',
    hint: 'to be merged',
    explanation: "The root 'gabung' (join/merge) takes prefix 'di-' and suffix '-kan' to form the passive verb 'digabungkan' (to be merged/combined). The report files (subject) will receive the action of being combined."
  },
  {
    id: 136,
    root: 'geser',
    targetWord: 'digeser',
    sentence: 'Posisi meja itu perlu ___ sedikit ke kiri.',
    hint: 'to be shifted',
    explanation: "The root 'geser' (shift/move) takes the prefix 'di-' to form the passive verb 'digeser' (to be shifted/moved). The table's position (subject) needs to receive the action of being shifted."
  },
  {
    id: 137,
    root: 'guna',
    targetWord: 'digunakan',
    sentence: 'Komputer ___ untuk mempermudah pekerjaan kantor.',
    hint: 'to be used',
    explanation: "The root 'guna' (use) uses prefix 'di-' and suffix '-kan' to form the passive verb 'digunakan' (to be used). The computer (subject) is used to facilitate office work."
  },
  {
    id: 138,
    root: 'hadap',
    targetWord: 'dihadapi',
    sentence: 'Setiap tantangan harus ___ dengan berani.',
    hint: 'to be faced, to be encountered',
    explanation: "The root 'hadap' (face) takes prefix 'di-' and suffix '-i' to form the passive verb 'dihadapi' (to be faced/encountered). Every challenge (subject) must be faced bravely."
  },
  {
    id: 139,
    root: 'hadir',
    targetWord: 'dihadiri',
    sentence: 'Rapat penting itu ___ oleh seluruh jajaran direksi.',
    hint: 'to be attended',
    explanation: "The root 'hadir' (present/attend) uses prefix 'di-' and suffix '-i' to form the passive verb 'dihadiri' (to be attended by). The important meeting (subject) receives the action of being attended."
  },
  {
    id: 140,
    root: 'habis',
    targetWord: 'dihabiskan',
    sentence: 'Kue ulang tahun itu ___ dalam sekejap.',
    hint: 'to be spent (until all is used up)',
    explanation: "The root 'habis' (finished/used up) takes prefix 'di-' and suffix '-kan' to form the passive verb 'dihabiskan' (to be finished/consumed completely). The birthday cake (subject) was completely consumed."
  },
  {
    id: 141,
    root: 'halang',
    targetWord: 'dihalangi',
    sentence: 'Akses masuk ke gedung itu ___ oleh petugas keamanan.',
    hint: 'to be blocked, to be hampered',
    explanation: "The root 'halang' (block/obstruct) uses prefix 'di-' and suffix '-i' to form the passive verb 'dihalangi' (to be blocked/obstructed by). The entrance access (subject) is blocked by security officers."
  },
  {
    id: 142,
    root: 'harap',
    targetWord: 'diharapkan',
    sentence: 'Semua peserta ___ datang tepat waktu.',
    hint: 'to be expected; to be hoped for',
    explanation: "The root 'harap' (hope) takes prefix 'di-' and suffix '-kan' to form the passive verb 'diharapkan' (to be hoped for/expected). All participants (subject) are expected to arrive on time."
  },
  {
    id: 143,
    root: 'harga',
    targetWord: 'dihargai',
    sentence: 'Karya seni yang unik akan ___ tinggi oleh kolektor.',
    hint: 'to be appreciated, to be valued; to be given a price',
    explanation: "The root 'harga' (price/value) uses prefix 'di-' and suffix '-i' to form the passive verb 'dihargai' (to be valued/appreciated). Unique artworks (subject) will be valued highly by collectors."
  },
  {
    id: 144,
    root: 'hasil',
    targetWord: 'dihasilkan',
    sentence: 'Energi listrik ___ dari berbagai sumber.',
    hint: 'to be produced',
    explanation: "The root 'hasil' (result/produce) takes prefix 'di-' and suffix '-kan' to form the passive verb 'dihasilkan' (to be produced). Electrical energy (subject) is produced from various sources."
  },
  {
    id: 145,
    root: 'hilang',
    targetWord: 'dihilangkan',
    sentence: 'Trauma masa lalu sulit ___ sepenuhnya.',
    hint: 'to be removed',
    explanation: "The root 'hilang' (lost/disappear) uses prefix 'di-' and suffix '-kan' to form the passive verb 'dihilangkan' (to be made to disappear/removed). Past trauma (subject) is difficult to be removed completely."
  },
  {
    id: 146,
    root: 'himbau',
    targetWord: 'dihimbau',
    sentence: 'Masyarakat ___ untuk menjaga kebersihan lingkungan.',
    hint: 'to be advised, to be invited / encouraged (i.e.: from a higher authority such as the government)',
    explanation: "The root 'himbau' (appeal/urge) takes the prefix 'di-' to form the passive verb 'dihimbau' (to be urged/advised). The public (subject) is urged to maintain environmental cleanliness."
  },
  {
    id: 147,
    root: 'hindar',
    targetWord: 'dihindari',
    sentence: 'Perdebatan yang tidak perlu sebaiknya ___.',
    hint: 'to be avoided/evaded',
    explanation: "The root 'hindar' (avoid) uses prefix 'di-' and suffix '-i' to form the passive verb 'dihindari' (to be avoided). Unnecessary debates (subject) should be avoided."
  },
  {
    id: 148,
    root: 'hindar',
    targetWord: 'dihindarkan',
    sentence: 'Anak-anak perlu ___ dari konten negatif di internet.',
    hint: 'to be avoided/prevented',
    explanation: "The root 'hindar' (avoid) takes prefix 'di-' and suffix '-kan' to form the passive verb 'dihindarkan' (to be kept away from/prevented from encountering). Children (subject) need to be kept away from negative content."
  },
  {
    id: 149,
    root: 'hubung',
    targetWord: 'dihubungi',
    sentence: 'Pemenang kuis akan ___ melalui telepon.',
    hint: 'to be contacted',
    explanation: "The root 'hubung' (connect) uses prefix 'di-' and suffix '-i' to form the passive verb 'dihubungi' (to be contacted). The quiz winner (subject) will be contacted via phone."
  },
  {
    id: 150,
    root: 'hubung',
    targetWord: 'dihubungkan',
    sentence: 'Kedua desa itu ___ oleh sebuah jembatan kayu.',
    hint: 'to be connected',
    explanation: "The root 'hubung' (connect) takes prefix 'di-' and suffix '-kan' to form the passive verb 'dihubungkan' (to be connected). The two villages (subject) are connected by a wooden bridge."
  },
  {
    id: 151,
    root: 'ingat',
    targetWord: 'diingat',
    sentence: 'Tanggal bersejarah itu akan selalu ___ oleh bangsa.',
    hint: 'to be remembered',
    explanation: "The root 'ingat' (remember) takes the prefix 'di-' to form the passive verb 'diingat' (to be remembered). The historical date (subject) will always be remembered by the nation."
  },
  {
    id: 152,
    root: 'ingat',
    targetWord: 'diingatkan',
    sentence: 'Siswa ___ untuk mengumpulkan tugas tepat waktu.',
    hint: 'to be reminded',
    explanation: "The root 'ingat' (remember) uses prefix 'di-' and suffix '-kan' to form the passive verb 'diingatkan' (to be reminded). Students (subject) are reminded to submit assignments on time."
  },
  {
    id: 153,
    root: 'ikut',
    targetWord: 'diikuti',
    sentence: 'Peraturan baru itu harus ___ oleh semua karyawan.',
    hint: 'to be followed; to be attended (i.e.: seminar, etc)',
    explanation: "The root 'ikut' (follow/join) uses prefix 'di-' and suffix '-i' to form the passive verb 'diikuti' (to be followed/participated in). The new regulation (subject) must be followed by all employees."
  },
  {
    id: 154,
    root: 'isi',
    targetWord: 'diisi',
    sentence: 'Botol minum itu ___ dengan air putih.',
    hint: 'to be filled',
    explanation: "The root 'isi' (content/fill) takes prefix 'di-' and suffix '-i' to form the passive verb 'diisi' (to be filled). The drinking bottle (subject) is filled with water."
  },
  {
    id: 155,
    root: 'jual',
    targetWord: 'dijual',
    sentence: 'Barang antik itu ___ dengan harga tinggi.',
    hint: 'to be sold',
    explanation: "The root 'jual' (sell) takes the prefix 'di-' to form the passive verb 'dijual' (to be sold). The antique item (subject) is sold at a high price."
  },
  {
    id: 156,
    root: 'jadwal',
    targetWord: 'dijadwalkan',
    sentence: 'Penerbangan ___ berangkat pukul 7 pagi.',
    hint: 'to be scheduled',
    explanation: "The root 'jadwal' (schedule) uses prefix 'di-' and suffix '-kan' to form the passive verb 'dijadwalkan' (to be scheduled). The flight (subject) is scheduled to depart at 7 AM."
  },
  {
    id: 157,
    root: 'jamin',
    targetWord: 'dijamin',
    sentence: 'Kualitas produk ini ___ memuaskan.',
    hint: 'to be guaranteed',
    explanation: "The root 'jamin' (guarantee) takes the prefix 'di-' to form the passive verb 'dijamin' (to be guaranteed). The quality of this product (subject) is guaranteed to satisfy."
  },
  {
    id: 158,
    root: 'jadi',
    targetWord: 'dijadikan',
    sentence: 'Lahan kosong itu ___ taman bermain anak.',
    hint: 'to be made into',
    explanation: "The root 'jadi' (become/so) uses prefix 'di-' and suffix '-kan' to form the passive verb 'dijadikan' (to be made into). The empty land (subject) is made into a children's playground."
  },
  {
    id: 159,
    root: 'kait',
    targetWord: 'dikaitkan',
    sentence: 'Penyakit jantung sering ___ dengan gaya hidup tidak sehat.',
    hint: 'to be linked',
    explanation: "The root 'kait' (hook/link) takes prefix 'di-' and suffix '-kan' to form the passive verb 'dikaitkan' (to be linked). Heart disease (subject) is often linked with an unhealthy lifestyle."
  },
  {
    id: 160,
    root: 'tahu',
    targetWord: 'diketahui',
    sentence: 'Identitas pelaku pencurian akhirnya ___.',
    hint: 'to be known about',
    explanation: "The root 'tahu' (know) uses prefix 'di-' and suffix '-i' to form the passive verb 'diketahui' (to be known). The identity of the thief (subject) finally became known."
  },
  {
    id: 161,
    root: 'kelola',
    targetWord: 'dikelola',
    sentence: 'Dana desa ___ secara transparan oleh pemerintah desa.',
    hint: 'to be managed',
    explanation: "The root 'kelola' (manage) takes the prefix 'di-' to form the passive verb 'dikelola' (to be managed). The village funds (subject) are managed transparently."
  },
  {
    id: 162,
    root: 'kembang',
    targetWord: 'dikembangkan',
    sentence: 'Vaksin baru sedang ___ untuk melawan virus tersebut.',
    hint: 'to be developed',
    explanation: "The root 'kembang' (develop/flower) uses prefix 'di-' and suffix '-kan' to form the passive verb 'dikembangkan' (to be developed). A new vaccine (subject) is being developed."
  },
  {
    id: 163,
    root: 'kendali',
    targetWord: 'dikendalikan',
    sentence: 'Penyebaran wabah berhasil ___ oleh tim medis.',
    hint: 'to be controlled',
    explanation: "The root 'kendali' (control) takes prefix 'di-' and suffix '-kan' to form the passive verb 'dikendalikan' (to be controlled). The spread of the epidemic (subject) was successfully controlled."
  },
  {
    id: 164,
    root: 'kenal',
    targetWord: 'dikenal',
    sentence: 'Dia ___ sebagai orang yang ramah dan suka menolong.',
    hint: 'to be known',
    explanation: "The root 'kenal' (know someone/recognize) takes the prefix 'di-' to form the passive verb 'dikenal' (to be known). 'Dia' (He/She) is known as a friendly person."
  },
  {
    id: 165,
    root: 'kemuka',
    targetWord: 'dikemukakan',
    sentence: 'Berbagai argumen ___ dalam debat calon presiden.',
    hint: 'to be put forward, to be expressed',
    explanation: "The root 'kemuka' (forward) takes prefix 'di-' and suffix '-kan' to form the passive verb 'dikemukakan' (to be put forward/expressed). Various arguments (subject) were put forward in the debate."
  },
  {
    id: 166,
    root: 'korban',
    targetWord: 'dikorbankan',
    sentence: 'Seekor kambing ___ pada hari raya Idul Adha.',
    hint: 'to be sacrificed',
    explanation: "The root 'korban' (victim/sacrifice) uses prefix 'di-' and suffix '-kan' to form the passive verb 'dikorbankan' (to be sacrificed). A goat (subject) is sacrificed on Eid al-Adha."
  },
  {
    id: 167,
    root: 'kurang',
    targetWord: 'dikurangi',
    sentence: 'Porsi makan malam sebaiknya ___ untuk menjaga berat badan.',
    hint: 'to be reduced, to be decreased',
    explanation: "The root 'kurang' (less) uses prefix 'di-' and suffix '-i' to form the passive verb 'dikurangi' (to be reduced). The dinner portion (subject) should be reduced."
  },
  {
    id: 168,
    root: 'kunjung',
    targetWord: 'dikunjungi',
    sentence: 'Tempat wisata itu ramai ___ saat musim liburan.',
    hint: 'to be visited',
    explanation: "The root 'kunjung' (visit) uses prefix 'di-' and suffix '-i' to form the passive verb 'dikunjungi' (to be visited). The tourist spot (subject) is visited by many during the holidays."
  },
  {
    id: 169,
    root: 'kumpul',
    targetWord: 'dikumpulkan',
    sentence: 'Tugas sekolah harus ___ sebelum batas waktu.',
    hint: 'to be collected, to be gathered; to be submitted (i.e.: homework)',
    explanation: "The root 'kumpul' (gather) takes prefix 'di-' and suffix '-kan' to form the passive verb 'dikumpulkan' (to be collected/submitted). School assignments (subject) must be submitted."
  },
  {
    id: 170,
    root: 'larang',
    targetWord: 'dilarang',
    sentence: 'Berburu hewan langka ___ oleh undang-undang.',
    hint: 'to be forbidden, to be prohibited',
    explanation: "The root 'larang' (forbid) takes the prefix 'di-' to form the passive verb 'dilarang' (to be forbidden). Hunting rare animals (subject) is forbidden by law."
  },
  {
    id: 171,
    root: 'latih',
    targetWord: 'dilatih',
    sentence: 'Para atlet ___ secara intensif menjelang kompetisi.',
    hint: 'to be trained',
    explanation: "The root 'latih' (train) takes the prefix 'di-' to form the passive verb 'dilatih' (to be trained). The athletes (subject) are trained intensively."
  },
  {
    id: 172,
    root: 'laksana',
    targetWord: 'dilaksanakan',
    sentence: 'Rapat tahunan akan ___ sesuai jadwal.',
    hint: 'to be carried out, to be done',
    explanation: "The root 'laksana' (like, carry out) uses prefix 'di-' and suffix '-kan' to form the passive verb 'dilaksanakan' (to be carried out/implemented). The annual meeting (subject) will be carried out."
  },
  {
    id: 173,
    root: 'lengkap',
    targetWord: 'dilengkapi',
    sentence: 'Laporan itu perlu ___ dengan data pendukung.',
    hint: 'to be completed',
    explanation: "The root 'lengkap' (complete) uses prefix 'di-' and suffix '-i' to form the passive verb 'dilengkapi' (to be completed/equipped with). The report (subject) needs to be completed with supporting data."
  },
  {
    id: 174,
    root: 'libat',
    targetWord: 'dilibatkan',
    sentence: 'Ahli lingkungan ___ dalam studi amdal proyek.',
    hint: 'to be involved',
    explanation: "The root 'libat' (involve) takes prefix 'di-' and suffix '-kan' to form the passive verb 'dilibatkan' (to be involved). Environmental experts (subject) are involved in the project's impact study."
  },
  {
    id: 175,
    root: 'milik',
    targetWord: 'dimiliki',
    sentence: 'Karya seni itu ___ oleh seorang kolektor ternama.',
    hint: 'to be owned',
    explanation: "The root 'milik' (belonging/own) uses prefix 'di-' and suffix '-i' to form the passive verb 'dimiliki' (to be owned by). The artwork (subject) is owned by a famous collector."
  },
  {
    id: 176,
    root: 'minta',
    targetWord: 'diminta',
    sentence: 'Saksi ___ hadir di pengadilan untuk memberikan keterangan.',
    hint: 'to be requested',
    explanation: "The root 'minta' (ask for/request) takes the prefix 'di-' to form the passive verb 'diminta' (to be asked/requested). The witness (subject) is requested to attend court."
  },
  {
    id: 177,
    root: 'muat',
    targetWord: 'dimuat',
    sentence: 'Berita tentang kejadian itu ___ di halaman depan koran.',
    hint: 'to be loaded (e.g., into a vehicle); to be published (e.g., in a newspaper)',
    explanation: "The root 'muat' (load/contain/fit) takes the prefix 'di-' to form the passive verb 'dimuat' (to be loaded/published). The news (subject) is published in the newspaper."
  },
  {
    id: 178,
    root: 'mungkin',
    targetWord: 'dimungkinkan',
    sentence: 'Perubahan jadwal ___ jika ada kondisi darurat.',
    hint: 'to be made possible',
    explanation: "The root 'mungkin' (possible/maybe) uses prefix 'di-' and suffix '-kan' to form the passive verb 'dimungkinkan' (to be made possible). A schedule change (subject) is made possible under emergency conditions."
  },
  {
    id: 179,
    root: 'menang',
    targetWord: 'dimenangkan',
    sentence: 'Tender proyek besar itu ___ oleh perusahaan asing.',
    hint: 'to be won',
    explanation: "The root 'menang' (win) uses prefix 'di-' and suffix '-kan' to form the passive verb 'dimenangkan' (to be won by). The large project tender (subject) was won by a foreign company."
  },
  {
    id: 180,
    root: 'manfaat',
    targetWord: 'dimanfaatkan',
    sentence: 'Potensi energi terbarukan perlu ___ secara optimal.',
    hint: 'to be utilized, to be made use of',
    explanation: "The root 'manfaat' (benefit/use) uses prefix 'di-' and suffix '-kan' to form the passive verb 'dimanfaatkan' (to be utilized/used). Renewable energy potential (subject) needs to be utilized optimally."
  },
  {
    id: 183,
    root: 'obat',
    targetWord: 'diobati',
    sentence: 'Penyakit itu dapat ___ jika terdeteksi sejak dini.',
    hint: 'to be treated medically',
    explanation: "The root 'obat' (medicine) takes prefix 'di-' and suffix '-i' to form the passive verb 'diobati' (to be treated with medicine). The disease (subject) can be treated if detected early."
  },
  {
    id: 184,
    root: 'pamer',
    targetWord: 'dipamerkan',
    sentence: 'Koleksi mobil antik ___ dalam acara tersebut.',
    hint: 'to be showed off, to be on display',
    explanation: "The root 'pamer' (show off/exhibit) uses prefix 'di-' and suffix '-kan' to form the passive verb 'dipamerkan' (to be exhibited/displayed). The antique car collection (subject) is displayed at the event."
  },
  {
    id: 185,
    root: 'pandang',
    targetWord: 'dipandang',
    sentence: 'Korupsi ___ sebagai kejahatan luar biasa.',
    hint: 'to be viewed; to be considered/regarded',
    explanation: "The root 'pandang' (view/look) takes the prefix 'di-' to form the passive verb 'dipandang' (to be viewed/regarded). Corruption (subject) is viewed as an extraordinary crime."
  },
  {
    id: 186,
    root: 'pasang',
    targetWord: 'dipasang',
    sentence: 'Alarm kebakaran ___ di setiap lantai gedung.',
    hint: 'is installed',
    explanation: "The root 'pasang' (install/pair) takes the prefix 'di-' to form the passive verb 'dipasang' (to be installed). Fire alarms (subject) are installed on every floor."
  },
  {
    id: 187,
    root: 'pengaruh',
    targetWord: 'dipengaruhi',
    sentence: 'Suasana hati seseorang dapat ___ oleh cuaca.',
    hint: 'to be influenced',
    explanation: "The root 'pengaruh' (influence) uses prefix 'di-' and suffix '-i' to form the passive verb 'dipengaruhi' (to be influenced by). Someone's mood (subject) can be influenced by the weather."
  },
  {
    id: 188,
    root: 'pasti',
    targetWord: 'dipastikan',
    sentence: 'Keberangkatan kereta api ___ tepat waktu.',
    hint: 'to be ascertained, to be ensured, to be confirmed',
    explanation: "The root 'pasti' (sure/certain) uses prefix 'di-' and suffix '-kan' to form the passive verb 'dipastikan' (to be ensured/confirmed). The train departure (subject) is ensured to be on time."
  },
  {
    id: 189,
    root: 'picu',
    targetWord: 'dipicu',
    sentence: 'Kenaikan harga BBM ___ oleh gejolak harga minyak dunia.',
    hint: 'to be triggered',
    explanation: "The root 'picu' (trigger) takes the prefix 'di-' to form the passive verb 'dipicu' (to be triggered). The fuel price increase (subject) is triggered by global oil price fluctuations."
  },
  {
    id: 190,
    root: 'pimpin',
    targetWord: 'dipimpin',
    sentence: 'Delegasi Indonesia ___ oleh Menteri Luar Negeri.',
    hint: 'to be led',
    explanation: "The root 'pimpin' (lead) takes the prefix 'di-' to form the passive verb 'dipimpin' (to be led). The Indonesian delegation (subject) is led by the Foreign Minister."
  },
  {
    id: 191,
    root: 'peran',
    targetWord: 'diperankan',
    sentence: 'Karakter pahlawan super itu ___ dengan baik oleh aktor tersebut.',
    hint: 'to be played/acted',
    explanation: "The root 'peran' (role) uses the circumfix 'di-per-...-kan' (passive form of 'memerankan') to mean 'to be played/acted'. The superhero character (subject) is played well by the actor."
  },
  {
    id: 192,
    root: 'hati',
    targetWord: 'diperhatikan',
    sentence: 'Setiap detail kecil perlu ___ dalam desain produk.',
    hint: 'to be paid attention to',
    explanation: "The root 'hati' (heart/attention) uses the circumfix 'di-per-...-kan' (passive form of 'memperhatikan') to mean 'to be paid attention to'. Every small detail (subject) needs to be paid attention to."
  },
  {
    id: 193,
    root: 'baik',
    targetWord: 'diperbaiki',
    sentence: 'Kesalahan dalam laporan itu harus segera ___.' ,
    hint: 'to be fixed, to be repaired, to be improved',
    explanation: "The root 'baik' (good) uses the circumfix 'di-per-...-i' (passive form of 'memperbaiki') to mean 'to be fixed/repaired/improved'. The error in the report (subject) must be fixed."
  },
  {
    id: 194,
    root: 'cepat',
    targetWord: 'dipercepat',
    sentence: 'Proses evakuasi korban ___ oleh tim gabungan.',
    hint: 'to be accelerated',
    explanation: "The root 'cepat' (fast) uses the circumfix 'di-per-...' (passive form of 'mempercepat') to mean 'to be accelerated/sped up'. The victim evacuation process (subject) is accelerated by the joint team."
  },
  {
    id: 195,
    root: 'ingat',
    targetWord: 'diperingati',
    sentence: 'Hari Pendidikan Nasional ___ setiap tanggal 2 Mei.',
    hint: 'to be commemorated',
    explanation: "The root 'ingat' (remember) uses the circumfix 'di-per-...-i' (passive form of 'memperingati') to mean 'to be commemorated'. National Education Day (subject) is commemorated every May 2nd."
  },
  {
    id: 196,
    root: 'ingat',
    targetWord: 'diperingatkan',
    sentence: 'Warga ___ akan bahaya banjir saat musim hujan.',
    hint: 'to be warned',
    explanation: "The root 'ingat' (remember) uses the circumfix 'di-per-...-kan' (passive form of 'memperingatkan') to mean 'to be warned'. Residents (subject) are warned about flood dangers."
  },
  {
    id: 197,
    root: 'lengkap',
    targetWord: 'diperlengkapi',
    sentence: 'Pasukan khusus ___ dengan senjata modern.',
    hint: 'to be equipped',
    explanation: "The root 'lengkap' (complete) uses the circumfix 'di-per-...-i' (passive form of 'memperlengkapi') to mean 'to be equipped with'. The special forces (subject) are equipped with modern weapons."
  },
  {
    id: 198,
    root: 'luas',
    targetWord: 'diperluas',
    sentence: 'Area parkir bandara akan ___ untuk menampung lebih banyak kendaraan.',
    hint: 'to be expanded',
    explanation: "The root 'luas' (wide/spacious) uses the circumfix 'di-per-...' (passive form of 'memperluas') to mean 'to be expanded/widened'. The airport parking area (subject) will be expanded."
  },
  {
    id: 199,
    root: 'timbang',
    targetWord: 'dipertimbangkan',
    sentence: 'Usulan Anda akan ___ dalam rapat manajemen.',
    hint: 'to be considered',
    explanation: "The root 'timbang' (weigh/consider) uses the circumfix 'di-per-...-kan' (passive form of 'mempertimbangkan') to mean 'to be considered'. Your proposal (subject) will be considered in the meeting."
  },
  {
    id: 200,
    root: 'pisah',
    targetWord: 'dipisahkan',
    sentence: 'Pasangan suami istri itu memutuskan untuk ___ secara baik-baik.',
    hint: 'to be separated',
    explanation: "The root 'pisah' (separate) takes prefix 'di-' and suffix '-kan' to form the passive verb 'dipisahkan' (to be separated). The married couple (subject) decided to be separated amicably."
  },
  {
    id: 201,
    root: 'raya',
    targetWord: 'dirayakan',
    sentence: 'Kemenangan timnas ___ dengan pawai di jalanan.',
    hint: 'to be celebrated',
    explanation: "The root 'raya' (great/celebrate) uses prefix 'di-' and suffix '-kan' to form the passive verb 'dirayakan' (to be celebrated). The national team's victory (subject) is celebrated with a parade."
  },
  {
    id: 202,
    root: 'rawat',
    targetWord: 'dirawat',
    sentence: 'Tanaman hias itu ___ dengan baik sehingga tumbuh subur.',
    hint: 'to be taken care of; to be treated',
    explanation: "The root 'rawat' (care for/treat) takes the prefix 'di-' to form the passive verb 'dirawat' (to be cared for/treated). The ornamental plant (subject) is cared for well."
  },
  {
    id: 203,
    root: 'rencana',
    targetWord: 'direncanakan',
    sentence: 'Liburan akhir tahun sudah ___ sejak jauh-jauh hari.',
    hint: 'to be planned',
    explanation: "The root 'rencana' (plan) uses prefix 'di-' and suffix '-kan' to form the passive verb 'direncanakan' (to be planned). The year-end holiday (subject) has been planned long in advance."
  },
  {
    id: 204,
    root: 'rintis',
    targetWord: 'dirintis',
    sentence: 'Jalur pendakian baru ___ oleh komunitas pecinta alam.',
    hint: 'to be pioneered',
    explanation: "The root 'rintis' (pioneer/clear path) takes the prefix 'di-' to form the passive verb 'dirintis' (to be pioneered). The new hiking trail (subject) was pioneered by the nature lovers community."
  },
  {
    id: 205,
    root: 'rusak',
    targetWord: 'dirusak',
    sentence: 'Nama baiknya ___ oleh fitnah yang tidak benar.',
    hint: 'to be damaged, to be broken',
    explanation: "The root 'rusak' (damaged/broken) takes the prefix 'di-' to form the passive verb 'dirusak' (to be damaged/ruined). His good name (subject) was damaged by false slander."
  },
  {
    id: 206,
    root: 'saing',
    targetWord: 'disaingi',
    sentence: 'Popularitasnya mulai ___ oleh artis pendatang baru.',
    hint: 'to be rivaled',
    explanation: "The root 'saing' (compete) uses prefix 'di-' and suffix '-i' to form the passive verb 'disaingi' (to be rivaled by). His popularity (subject) is starting to be rivaled by new artists."
  },
  {
    id: 207,
    root: 'saji',
    targetWord: 'disajikan',
    sentence: 'Kopi panas ___ bersama beberapa potong kue.',
    hint: 'to be served (i.e.: food & drink); to be presented (i.e.: a presentation)',
    explanation: "The root 'saji' (serve/present) uses prefix 'di-' and suffix '-kan' to form the passive verb 'disajikan' (to be served/presented). Hot coffee (subject) is served with cake."
  },
  {
    id: 208,
    root: 'salah',
    targetWord: 'disalahkan',
    sentence: 'Kegagalan proyek itu tidak bisa ___ pada satu orang saja.',
    hint: 'to be blamed',
    explanation: "The root 'salah' (wrong/blame) takes prefix 'di-' and suffix '-kan' to form the passive verb 'disalahkan' (to be blamed). The project failure (subject) cannot be blamed on just one person."
  },
  {
    id: 209,
    root: 'sambut',
    targetWord: 'disambut',
    sentence: 'Usulan kenaikan gaji ___ baik oleh para karyawan.',
    hint: 'to be welcomed, to be greeted',
    explanation: "The root 'sambut' (welcome/greet) takes the prefix 'di-' to form the passive verb 'disambut' (to be welcomed/greeted). The salary increase proposal (subject) was welcomed well by employees."
  },
  {
    id: 210,
    root: 'sebar',
    targetWord: 'disebarkan',
    sentence: 'Pamflet acara ___ di beberapa titik strategis.',
    hint: 'to be spread, to be disseminated',
    explanation: "The root 'sebar' (spread) uses prefix 'di-' and suffix '-kan' to form the passive verb 'disebarkan' (to be spread/disseminated). Event pamphlets (subject) were distributed at strategic points."
  },
  {
    id: 212,
    root: 'selamat',
    targetWord: 'diselamatkan',
    sentence: 'Dokumen penting berhasil ___ dari kebakaran.',
    hint: 'to be saved, to be rescued',
    explanation: "The root 'selamat' (safe/save) uses prefix 'di-' and suffix '-kan' to form the passive verb 'diselamatkan' (to be saved/rescued). Important documents (subject) were successfully saved from the fire."
  },
  {
    id: 213,
    root: 'selenggara',
    targetWord: 'diselenggarakan',
    sentence: 'Olimpiade Musim Panas ___ setiap empat tahun sekali.',
    hint: 'to be organized, to be held',
    explanation: "The root 'selenggara' (organize) uses prefix 'di-' and suffix '-kan' to form the passive verb 'diselenggarakan' (to be organized/held). The Summer Olympics (subject) are held every four years."
  },
  {
    id: 215,
    root: 'serah',
    targetWord: 'diserahkan',
    sentence: 'Tugas dan tanggung jawab ___ kepada pejabat baru.',
    hint: 'to be handed in/over, to be given',
    explanation: "The root 'serah' (hand over/surrender) takes prefix 'di-' and suffix '-kan' to form the passive verb 'diserahkan' (to be handed over). Duties and responsibilities (subject) are handed over to the new official."
  },
  {
    id: 216,
    root: 'sedia',
    targetWord: 'disediakan',
    sentence: 'Beasiswa ___ bagi mahasiswa berprestasi yang kurang mampu.',
    hint: 'to be provided',
    explanation: "The root 'sedia' (ready/provide) uses prefix 'di-' and suffix '-kan' to form the passive verb 'disediakan' (to be provided). Scholarships (subject) are provided for high-achieving, less affluent students."
  },
  {
    id: 217,
    root: 'sesuai',
    targetWord: 'disesuaikan',
    sentence: 'Kurikulum sekolah ___ dengan perkembangan zaman.',
    hint: 'to be adjusted, to be adapted',
    explanation: "The root 'sesuai' (suitable/match) uses prefix 'di-' and suffix '-kan' to form the passive verb 'disesuaikan' (to be adjusted/adapted). The school curriculum (subject) is adjusted to the development of the era."
  },
  {
    id: 218,
    root: 'simpul',
    targetWord: 'disimpulkan',
    sentence: 'Dapat ___ bahwa merokok berbahaya bagi kesehatan.',
    hint: 'to be concluded',
    explanation: "The root 'simpul' (knot/conclude) takes prefix 'di-' and suffix '-kan' to form the passive verb 'disimpulkan' (to be concluded). It (implied subject) can be concluded that smoking is harmful."
  },
  {
    id: 219,
    root: 'sumbang',
    targetWord: 'disumbangkan',
    sentence: 'Bantuan dana ___ oleh masyarakat untuk korban bencana.',
    hint: 'to be donated',
    explanation: "The root 'sumbang' (contribute/donate) uses prefix 'di-' and suffix '-kan' to form the passive verb 'disumbangkan' (to be donated). Financial aid (subject) was donated by the community."
  },
  {
    id: 220,
    root: 'tanam',
    targetWord: 'ditanam',
    sentence: 'Pohon ___ untuk menghijaukan kembali area bekas tambang.',
    hint: 'to be planted',
    explanation: "The root 'tanam' (plant) takes the prefix 'di-' to form the passive verb 'ditanam' (to be planted). Trees (subject) are planted to re-green the former mining area."
  },
  {
    id: 221,
    root: 'tangan',
    targetWord: 'ditangani',
    sentence: 'Pasien gawat darurat harus ___ secepat mungkin.',
    hint: 'to be handled',
    explanation: "The root 'tangan' (hand) uses prefix 'di-' and suffix '-i' to form the passive verb 'ditangani' (to be handled). Emergency patients (subject) must be handled as quickly as possible."
  },
  {
    id: 223,
    root: 'tantang',
    targetWord: 'ditantang',
    sentence: 'Dia ___ oleh lawannya untuk bertanding ulang.',
    hint: 'to be challenged',
    explanation: "The root 'tantang' (challenge) takes the prefix 'di-' to form the passive verb 'ditantang' (to be challenged). 'Dia' (He/She) is challenged by his opponent."
  },
  {
    id: 224,
    root: 'tekan',
    targetWord: 'ditekan',
    sentence: 'Tombol \'Enter\' ___ untuk melanjutkan proses.',
    hint: 'to be pressed',
    explanation: "The root 'tekan' (press) takes the prefix 'di-' to form the passive verb 'ditekan' (to be pressed). The 'Enter' button (subject) is pressed to continue."
  },
  {
    id: 225,
    root: 'tekan',
    targetWord: 'ditekankan',
    sentence: 'Pentingnya disiplin selalu ___ oleh pelatih.',
    hint: 'to be emphasized',
    explanation: "The root 'tekan' (press) uses prefix 'di-' and suffix '-kan' to form the passive verb 'ditekankan' (to be emphasized). The importance of discipline (subject) is always emphasized by the coach."
  },
  {
    id: 226,
    root: 'tempat',
    targetWord: 'ditempati',
    sentence: 'Posisi puncak klasemen sementara ___ oleh tim tersebut.',
    hint: 'to be occupied',
    explanation: "The root 'tempat' (place) uses prefix 'di-' and suffix '-i' to form the passive verb 'ditempati' (to be occupied). The top position in the standings (subject) is occupied by that team."
  },
  {
    id: 227,
    root: 'temu',
    targetWord: 'ditemui',
    sentence: 'Kesulitan sering ___ saat belajar bahasa baru.',
    hint: 'to be met',
    explanation: "The root 'temu' (meet) uses prefix 'di-' and suffix '-i' to form the passive verb 'ditemui' (to be met/encountered). Difficulties (subject) are often encountered when learning a new language."
  },
  {
    id: 228,
    root: 'temu',
    targetWord: 'ditemukan',
    sentence: 'Dompet yang hilang kemarin akhirnya ___.' ,
    hint: 'to be found; to be discovered; to be invented',
    explanation: "The root 'temu' (meet) uses prefix 'di-' and suffix '-kan' to form the passive verb 'ditemukan' (to be found/discovered). The lost wallet (subject) was finally found."
  },
  {
    id: 229,
    root: 'tentu',
    targetWord: 'ditentukan',
    sentence: 'Jadwal ujian ___ oleh pihak universitas.',
    hint: 'to be determined',
    explanation: "The root 'tentu' (certain/sure) uses prefix 'di-' and suffix '-kan' to form the passive verb 'ditentukan' (to be determined/decided). The exam schedule (subject) is determined by the university."
  },
  {
    id: 230,
    root: 'tenggelam',
    targetWord: 'ditenggelamkan',
    sentence: 'Kapal asing ilegal itu ___ oleh petugas.',
    hint: 'to be drowned',
    explanation: "The root 'tenggelam' (sink/drown) uses prefix 'di-' and suffix '-kan' to form the passive causative verb 'ditenggelamkan' (to be sunk/caused to drown). The illegal foreign ship (subject) was sunk by the officers."
  },
  {
    id: 231,
    root: 'terap',
    targetWord: 'diterapkan',
    sentence: 'Hukuman disiplin ___ kepada siswa yang melanggar aturan.',
    hint: 'to be applied, to be implemented',
    explanation: "The root 'terap' (apply) uses prefix 'di-' and suffix '-kan' to form the passive verb 'diterapkan' (to be applied/implemented). Disciplinary punishment (subject) is applied to students who break rules."
  },
  {
    id: 232,
    root: 'teliti',
    targetWord: 'diteliti',
    sentence: 'Penyebab penyakit langka itu sedang ___.',
    hint: 'to be researched; to be examined carefully',
    explanation: "The root 'teliti' (careful/research) takes the prefix 'di-' to form the passive verb 'diteliti' (to be researched/examined carefully). The cause of the rare disease (subject) is being researched."
  },
  {
    id: 233,
    root: 'timbang',
    targetWord: 'ditimbang',
    sentence: 'Setiap argumen pro dan kontra perlu ___ secara objektif.',
    hint: 'to be weighed',
    explanation: "The root 'timbang' (weigh/consider) takes the prefix 'di-' to form the passive verb 'ditimbang' (to be weighed/considered). Every pro and con argument (subject) needs to be weighed objectively."
  },
  {
    id: 234,
    root: 'tindak',
    targetWord: 'ditindak',
    sentence: 'Pelanggaran lalu lintas akan ___ tegas oleh polisi.',
    hint: 'to be taken action, to be persecuted',
    explanation: "The root 'tindak' (action/step) takes the prefix 'di-' to form the passive verb 'ditindak' (to be acted upon/prosecuted). Traffic violations (subject) will be firmly acted upon by the police."
  },
  {
    id: 235,
    root: 'tingkat',
    targetWord: 'ditingkatkan',
    sentence: 'Pelayanan publik perlu terus ___ kualitasnya.',
    hint: 'to be increased',
    explanation: "The root 'tingkat' (level/increase) uses prefix 'di-' and suffix '-kan' to form the passive verb 'ditingkatkan' (to be increased/improved). Public service quality (subject) needs to be continuously improved."
  },
  {
    id: 236,
    root: 'timbul',
    targetWord: 'ditimbulkan',
    sentence: 'Kerusakan lingkungan ___ oleh aktivitas manusia.',
    hint: 'to be caused',
    explanation: "The root 'timbul' (emerge/arise) uses prefix 'di-' and suffix '-kan' to form the passive causative verb 'ditimbulkan' (to be caused/brought about). Environmental damage (subject) is caused by human activities."
  },
  {
    id: 238,
    root: 'tumbuh',
    targetWord: 'ditumbuhkan',
    sentence: 'Minat baca perlu ___ sejak usia dini.',
    hint: 'to be made grown',
    explanation: "The root 'tumbuh' (grow) uses prefix 'di-' and suffix '-kan' to form the passive causative verb 'ditumbuhkan' (to be cultivated/made to grow). Reading interest (subject) needs to be cultivated from an early age."
  },
  {
    id: 239,
    root: 'tunjuk',
    targetWord: 'ditunjuk',
    sentence: 'Siapa yang ___ sebagai perwakilan kelas?',
    hint: 'to be pointed; to be appointed',
    explanation: "The root 'tunjuk' (point/appoint) takes the prefix 'di-' to form the passive verb 'ditunjuk' (to be pointed at/appointed). Who (subject) was appointed as class representative?"
  },
  {
    id: 240,
    root: 'ukur',
    targetWord: 'diukur',
    sentence: 'Kinerja karyawan ___ berdasarkan pencapaian target.',
    hint: 'to be measured',
    explanation: "The root 'ukur' (measure) takes the prefix 'di-' to form the passive verb 'diukur' (to be measured). Employee performance (subject) is measured based on target achievement."
  },
  {
    id: 241,
    root: 'umum',
    targetWord: 'diumumkan',
    sentence: 'Pemenang lomba akan ___ minggu depan.',
    hint: 'to be announced, to be made public',
    explanation: "The root 'umum' (public/general) uses prefix 'di-' and suffix '-kan' to form the passive verb 'diumumkan' (to be announced). The contest winners (subject) will be announced next week."
  },
  {
    id: 243,
    root: 'unggul',
    targetWord: 'diunggulkan',
    sentence: 'Atlet tuan rumah ___ meraih medali emas.',
    hint: 'to be favored',
    explanation: "The root 'unggul' (superior) uses prefix 'di-' and suffix '-kan' to form the passive verb 'diunggulkan' (to be favored). The host athlete (subject) is favored to win the gold medal."
  },
  {
    id: 244,
    root: 'untung',
    targetWord: 'diuntungkan',
    sentence: 'Masyarakat ___ oleh program bantuan pemerintah.',
    hint: 'to be benefited',
    explanation: "The root 'untung' (profit/luck) uses prefix 'di-' and suffix '-kan' to form the passive verb 'diuntungkan' (to be benefited). The community (subject) is benefited by the government aid program."
  },
  {
    id: 245,
    root: 'usaha',
    targetWord: 'diusahakan',
    sentence: 'Tiket kereta api tambahan sedang ___ oleh pihak KAI.',
    hint: 'to be made into working',
    explanation: "The root 'usaha' (effort/business) uses prefix 'di-' and suffix '-kan' to form the passive verb 'diusahakan' (to be worked on/strived for). Additional train tickets (subject) are being worked on by KAI."
  },
  {
    id: 246,
    root: 'utama',
    targetWord: 'diutamakan',
    sentence: 'Penumpang lanjut usia ___ saat naik bus.',
    hint: 'to be prioritized',
    explanation: "The root 'utama' (main/primary) uses prefix 'di-' and suffix '-kan' to form the passive verb 'diutamakan' (to be prioritized). Elderly passengers (subject) are prioritized when boarding the bus."
  },
  {
    id: 247,
    root: 'wakil',
    targetWord: 'diwakili',
    sentence: 'Setiap provinsi ___ oleh beberapa anggota DPR.',
    hint: 'to be represented',
    explanation: "The root 'wakil' (representative) uses prefix 'di-' and suffix '-i' to form the passive verb 'diwakili' (to be represented by). Each province (subject) is represented by several DPR members."
  },
  {
    id: 248,
    root: 'wujud',
    targetWord: 'diwujudkan',
    sentence: 'Rencana pembangunan taman kota akhirnya ___.' ,
    hint: 'to be actualized',
    explanation: "The root 'wujud' (form/manifestation) uses prefix 'di-' and suffix '-kan' to form the passive verb 'diwujudkan' (to be actualized/realized). The city park development plan (subject) was finally actualized."
  },
  {
    id: 249,
    root: 'dorong',
    targetWord: 'dorongan',
    sentence: 'Dia membutuhkan ___ semangat dari teman-temannya.',
    hint: 'an encouragement, a push',
    explanation: "The root 'dorong' (push/encourage) takes the suffix '-an' to form the noun 'dorongan' (a push/encouragement). The sentence requires a noun that he needs."
  },
  {
    id: 250,
    root: 'duga',
    targetWord: 'dugaan',
    sentence: 'Polisi masih menyelidiki ___ penyebab kebakaran.',
    hint: 'guess',
    explanation: "The root 'duga' (suspect/guess) uses the suffix '-an' to form the noun 'dugaan' (a guess/suspicion). Police are investigating the suspicion regarding the cause."
  },
  {
    id: 251,
    root: 'dukung',
    targetWord: 'dukungan',
    sentence: '___ penuh diberikan kepada tim nasional.',
    hint: 'support',
    explanation: "The root 'dukung' (support) takes the suffix '-an' to form the noun 'dukungan' (support). Full support (subject) is given to the national team."
  },
  {
    id: 253,
    root: 'edar',
    targetWord: 'edaran',
    sentence: 'Surat ___ berisi informasi penting untuk seluruh staf.',
    hint: 'circular',
    explanation: "The root 'edar' (circulate) uses the suffix '-an' to form the noun 'edaran' (circular/something circulated). 'Surat edaran' means circular letter."
  },
  {
    id: 256,
    root: 'guna',
    targetWord: 'kegunaan',
    sentence: 'Ponsel pintar memiliki banyak ___ saat ini.',
    hint: 'the use, the function, the benefit',
    explanation: "The root 'guna' (use/benefit) takes the circumfix 'ke-an' to form the abstract noun 'kegunaan' (usefulness/function). Smartphones have many uses/functions."
  },
  {
    id: 258,
    root: 'hadap',
    targetWord: 'hadapan',
    sentence: 'Dia berdiri di ___ cermin, merapikan penampilannya.',
    hint: 'face, front, presence',
    explanation: "The root 'hadap' (face) takes the suffix '-an' to form the noun 'hadapan' (front/presence). 'Di hadapan' means 'in front of'."
  },
  {
    id: 260,
    root: 'halang',
    targetWord: 'halangan',
    sentence: 'Semoga tidak ada ___ dalam perjalanan Anda.',
    hint: 'hindrance, obstacle',
    explanation: "The root 'halang' (obstruct) takes the suffix '-an' to form the noun 'halangan' (obstacle/hindrance). The sentence hopes for no obstacles."
  },
  {
    id: 261,
    root: 'harap',
    targetWord: 'harapan',
    sentence: '___ terakhirnya adalah melihat anaknya sukses.',
    hint: 'hope',
    explanation: "The root 'harap' (hope) takes the suffix '-an' to form the noun 'harapan' (hope). His last hope (subject) is to see his child succeed."
  },
  {
    id: 263,
    root: 'hasil',
    targetWord: 'hasil',
    sentence: '___ ujian akan diumumkan minggu depan.',
    hint: 'the result',
    explanation: "This is a root word used as a noun. 'Hasil' (result/outcome) fits directly as the subject of the sentence. No affix is needed for this meaning."
  },
  {
    id: 265,
    root: 'himbau',
    targetWord: 'himbauan',
    sentence: '___ untuk tetap di rumah diabaikan oleh sebagian orang.',
    hint: 'advice, encouragement (i.e.: from a higher authority such as the government)',
    explanation: "The root 'himbau' (appeal/urge) takes the suffix '-an' to form the noun 'himbauan' (an appeal/advice/encouragement). The appeal (subject) was ignored."
  },
  {
    id: 266,
    root: 'hubung',
    targetWord: 'hubungan',
    sentence: 'Mereka menjaga ___ persahabatan meski terpisah jarak.',
    hint: 'relationship, connection',
    explanation: "The root 'hubung' (connect) takes the suffix '-an' to form the noun 'hubungan' (relationship/connection). They maintain their friendship relationship."
  },
  {
    id: 272,
    root: 'ingat',
    targetWord: 'ingatan',
    sentence: 'Dia memiliki ___ yang sangat kuat tentang masa lalunya.',
    hint: 'memory, recollection',
    explanation: "The root 'ingat' (remember) takes the suffix '-an' to form the noun 'ingatan' (memory/recollection). He has a strong memory."
  },
  {
    id: 274,
    root: 'isi',
    targetWord: 'isi',
    sentence: 'Tolong periksa ___ tas Anda sebelum meninggalkan ruangan.',
    hint: 'contents',
    explanation: "This is the root word used as a noun. 'Isi' (contents) fits directly. Check the contents of your bag. No affix needed here."
  },
  {
    id: 276,
    root: 'jalan',
    targetWord: 'jalanan',
    sentence: 'Anak ___ seringkali hidup dalam kondisi memprihatinkan.',
    hint: 'street, road',
    explanation: "The root 'jalan' (road/way) takes the suffix '-an' to form the noun 'jalanan' (street/roadway, often implying 'of the streets'). 'Anak jalanan' means street children."
  },
  {
    id: 277,
    root: 'jamin',
    targetWord: 'jaminan',
    sentence: 'Sertifikat tanah dapat digunakan sebagai ___ pinjaman bank.',
    hint: 'guarantee',
    explanation: "The root 'jamin' (guarantee) takes the suffix '-an' to form the noun 'jaminan' (a guarantee/collateral). The land certificate serves as collateral."
  },
  {
    id: 278,
    root: 'jadi',
    targetWord: 'kejadian',
    sentence: 'Polisi sedang menyelidiki ___ perampokan semalam.',
    hint: 'incident, occurrence',
    explanation: "The root 'jadi' (happen/become) takes the circumfix 'ke-an' to form the noun 'kejadian' (incident/occurrence). Police are investigating the robbery incident."
  },
  {
    id: 279,
    root: 'adil',
    targetWord: 'keadilan',
    sentence: 'Mencari ___ adalah hak setiap warga negara.',
    hint: 'justice, fairness',
    explanation: "The root adjective 'adil' (just/fair) uses the circumfix 'ke-an' to form the abstract noun 'keadilan' (justice/fairness). Seeking justice is a right."
  },
  {
    id: 280,
    root: 'ada',
    targetWord: 'keadaan',
    sentence: '___ pasien mulai membaik setelah dirawat.',
    hint: 'state, condition',
    explanation: "The root 'ada' (be/exist) takes the circumfix 'ke-an' to form the noun 'keadaan' (state/condition). The patient's condition is improving."
  },
  {
    id: 282,
    root: 'bangga',
    targetWord: 'kebanggaan',
    sentence: 'Meraih medali emas olimpiade adalah ___ nasional.',
    hint: 'pride',
    explanation: "The root adjective 'bangga' (proud) uses the circumfix 'ke-an' to form the abstract noun 'kebanggaan' (pride). Winning the medal is a national pride."
  },
  {
    id: 283,
    root: 'baik',
    targetWord: 'kebaikan',
    sentence: '___ hati seseorang terpancar dari perbuatannya.',
    hint: 'goodness; kindness',
    explanation: "The root adjective 'baik' (good) takes the circumfix 'ke-an' to form the abstract noun 'kebaikan' (goodness/kindness). Someone's kindness shines through their actions."
  },
  {
    id: 284,
    root: 'biasa',
    targetWord: 'kebiasaan',
    sentence: 'Sarapan pagi adalah ___ sehat yang baik.',
    hint: 'habit',
    explanation: "The root adjective 'biasa' (usual/ordinary) uses the circumfix 'ke-an' to form the noun 'kebiasaan' (habit/custom). Eating breakfast is a good habit."
  },
  {
    id: 285,
    root: 'ada',
    targetWord: 'keberadaan',
    sentence: '___ ponsel pintar mengubah cara kita berkomunikasi.',
    hint: 'existence',
    explanation: "The root 'ada' (be/exist) with the circumfix 'ke-ber-...-an' (derived from 'berada') forms the noun 'keberadaan' (existence/presence). The existence of smartphones changed communication."
  },
  {
    id: 286,
    root: 'hasil',
    targetWord: 'keberhasilan',
    sentence: '___ tim adalah hasil kerja keras semua anggota.',
    hint: 'success',
    explanation: "The root 'hasil' (result) with the circumfix 'ke-ber-...-an' (derived from 'berhasil') forms the noun 'keberhasilan' (success). The team's success is the result of hard work."
  },
  {
    id: 287,
    root: 'untung',
    targetWord: 'keberuntungan',
    sentence: 'Dia mendapatkan pekerjaan itu karena faktor ___.' ,
    hint: 'luck',
    explanation: "The root 'untung' (profit/luck) with the circumfix 'ke-ber-...-an' (derived from 'beruntung') forms the noun 'keberuntungan' (luck/good fortune). He got the job due to the factor of luck."
  },
  {
    id: 288,
    root: 'bakar',
    targetWord: 'kebakaran',
    sentence: 'Penyebab ___ itu diduga akibat hubungan pendek listrik.',
    hint: 'a fire (the event of a fire)',
    explanation: "The root 'bakar' (burn) takes the circumfix 'ke-an' to form the noun 'kebakaran' (a fire incident). The cause of the fire is suspected to be a short circuit."
  },
  {
    id: 289,
    root: 'banyak',
    targetWord: 'kebanyakan',
    sentence: '___ siswa memilih melanjutkan studi ke perguruan tinggi.',
    hint: 'most of, the majority of',
    explanation: "The root 'banyak' (many/much) takes the circumfix 'ke-an' to form 'kebanyakan' (most of/the majority of). Most students choose to continue their studies."
  },
  {
    id: 290,
    root: 'budaya',
    targetWord: 'kebudayaan',
    sentence: 'Pentas seni itu menampilkan keragaman ___ Indonesia.',
    hint: 'culture, civilization',
    explanation: "The root 'budaya' (culture) uses the circumfix 'ke-an' to form the broader noun 'kebudayaan' (culture/civilization). The performance shows the diversity of Indonesian culture."
  },
  {
    id: 291,
    root: 'cepat',
    targetWord: 'kecepatan',
    sentence: 'Pengemudi harap memperhatikan batas ___ di jalan ini.',
    hint: 'speed',
    explanation: "The root adjective 'cepat' (fast) takes the circumfix 'ke-an' to form the noun 'kecepatan' (speed). Drivers should observe the speed limit."
  },
  {
    id: 292,
    root: 'celaka',
    targetWord: 'kecelakaan',
    sentence: 'Terjadi ___ beruntun di jalan tol pagi ini.',
    hint: 'accident',
    explanation: "The root 'celaka' (misfortune/harm) uses the circumfix 'ke-an' to form the noun 'kecelakaan' (accident). A chain accident occurred on the toll road."
  },
  {
    id: 293,
    root: 'candu',
    targetWord: 'kecanduan',
    sentence: '___ alkohol dapat merusak kesehatan fisik dan mental.',
    hint: 'addicted; addiction',
    explanation: "The root 'candu' (opium/addiction) takes the circumfix 'ke-an' to form the noun/state 'kecanduan' (addiction). Alcohol addiction can damage health."
  },
  {
    id: 294,
    root: 'duta',
    targetWord: 'kedutaan',
    sentence: 'Pengunjuk rasa berkumpul di depan ___ besar.',
    hint: 'embassy',
    explanation: "The root 'duta' (envoy/ambassador) takes the circumfix 'ke-an' to form the noun 'kedutaan' (embassy - place of the ambassador). Protesters gathered in front of the embassy."
  },
  {
    id: 295,
    root: 'hadir',
    targetWord: 'kehadiran',
    sentence: '___ Anda sangat berarti bagi kami.',
    hint: 'presence',
    explanation: "The root 'hadir' (present/attend) uses the circumfix 'ke-an' to form the noun 'kehadiran' (presence/attendance). Your presence means a lot."
  },
  {
    id: 296,
    root: 'habis',
    targetWord: 'kehabisan',
    sentence: 'Pom bensin ___ stok pertalite.',
    hint: 'to run out of',
    explanation: "The root 'habis' (finished/used up) takes the circumfix 'ke-an' to form the verb 'kehabisan' (to run out of something unintentionally). The gas station ran out of Pertalite stock."
  },
  {
    id: 297,
    root: 'hilang',
    targetWord: 'kehilangan',
    sentence: 'Dia sangat sedih atas ___ sahabatnya.',
    hint: 'to lose something; lost an item, miss a person',
    explanation: "The root 'hilang' (lost/disappear) uses the circumfix 'ke-an' to form the noun/verb 'kehilangan' (loss/to lose something). He is sad over the loss of his friend."
  },
  {
    id: 298,
    root: 'kebal',
    targetWord: 'kekebalan',
    sentence: 'Sistem ___ tubuh berfungsi melawan penyakit.',
    hint: 'immunity',
    explanation: "The root adjective 'kebal' (immune/invulnerable) takes the circumfix 'ke-an' to form the noun 'kekebalan' (immunity). The body's immune system fights disease."
  },
  {
    id: 299,
    root: 'kurang',
    targetWord: 'kekurangan',
    sentence: 'Daerah itu mengalami ___ air bersih.',
    hint: 'deficiency, shortage',
    explanation: "The root 'kurang' (less/lack) uses the circumfix 'ke-an' to form the noun 'kekurangan' (shortage/deficiency). The area experiences a shortage of clean water."
  },
  {
    id: 300,
    root: 'kuasa',
    targetWord: 'kekuasaan',
    sentence: 'Raja memiliki ___ mutlak di kerajaannya.',
    hint: 'power, authority, dominion',
    explanation: "The root 'kuasa' (power/authority) takes the circumfix 'ke-an' to form the abstract noun 'kekuasaan' (power/authority). The king has absolute power."
  },
  {
    id: 301,
    root: 'langsung',
    targetWord: 'kelangsungan',
    sentence: '___ program ini bergantung pada ketersediaan dana.',
    hint: 'continuity',
    explanation: "The root 'langsung' (direct/continue) uses the circumfix 'ke-an' (with sound change 'ngs' often relates to 'langsung' in this context) to form 'kelangsungan' (continuity/survival). The program's continuity depends on funding."
  },
  {
    id: 302,
    root: 'lengkap',
    targetWord: 'kelengkapan',
    sentence: 'Harap periksa ___ dokumen sebelum dikirim.',
    hint: 'completeness',
    explanation: "The root adjective 'lengkap' (complete) takes the circumfix 'ke-an' to form the noun 'kelengkapan' (completeness/equipment). Check the completeness of the documents."
  },
  {
    id: 303,
    root: 'lemah',
    targetWord: 'kelemahan',
    sentence: 'Mengakui ___ diri adalah langkah awal perbaikan.',
    hint: 'weakness',
    explanation: "The root adjective 'lemah' (weak) uses the circumfix 'ke-an' to form the noun 'kelemahan' (weakness). Admitting one's weakness is the first step."
  },
  {
    id: 304,
    root: 'mampu',
    targetWord: 'kemampuan',
    sentence: 'Setiap orang memiliki ___ yang berbeda.',
    hint: 'ability',
    explanation: "The root adjective 'mampu' (capable/able) takes the circumfix 'ke-an' to form the noun 'kemampuan' (ability/capability). Everyone has different abilities."
  },
  {
    id: 305,
    root: 'maju',
    targetWord: 'kemajuan',
    sentence: '___ teknologi sangat pesat dalam beberapa tahun terakhir.',
    hint: 'progress',
    explanation: "The root verb/adjective 'maju' (forward/progress/advanced) uses the circumfix 'ke-an' to form the noun 'kemajuan' (progress/advancement). Technological progress is rapid."
  },
  {
    id: 306,
    root: 'menang',
    targetWord: 'kemenangan',
    sentence: 'Suporter merayakan ___ tim kesayangannya.',
    hint: 'victory',
    explanation: "The root verb 'menang' (win) takes the circumfix 'ke-an' to form the noun 'kemenangan' (victory). Supporters celebrate their team's victory."
  },
  {
    id: 307,
    root: 'mungkin',
    targetWord: 'kemungkinan',
    sentence: 'Ada ___ hujan sore ini.',
    hint: 'possibility',
    explanation: "The root adverb/adjective 'mungkin' (possible/maybe) uses the circumfix 'ke-an' to form the noun 'kemungkinan' (possibility). There is a possibility of rain."
  },
  {
    id: 309,
    root: 'naik',
    targetWord: 'kenaikan',
    sentence: '___ harga BBM diumumkan pemerintah.',
    hint: 'the increase; the increment',
    explanation: "The root verb 'naik' (go up/increase) takes the circumfix 'ke-an' to form the noun 'kenaikan' (increase/rise). The fuel price increase was announced."
  },
  {
    id: 311,
    root: 'nyata',
    targetWord: 'kenyataan',
    sentence: '___ hidup kadang tak sesuai harapan.',
    hint: 'reality',
    explanation: "The root adjective 'nyata' (real/tangible) uses the circumfix 'ke-an' to form the noun 'kenyataan' (reality). The reality of life sometimes doesn't meet expectations."
  },
  {
    id: 312,
    root: 'penduduk',
    targetWord: 'kependudukan',
    sentence: 'Data ___ penting untuk perencanaan kota.',
    hint: 'demography',
    explanation: "The root noun 'penduduk' (population/resident) takes the circumfix 'ke-an' to form the abstract noun 'kependudukan' (matters relating to population/demography). Demographic data is important."
  },
  {
    id: 313,
    root: 'pasti',
    targetWord: 'kepastian',
    sentence: 'Kami menunggu ___ jadwal keberangkatan.',
    hint: 'confirmation, certainty (a fact that is definitely true or an event that is definitely going to take place)',
    explanation: "The root adjective 'pasti' (certain/sure) uses the circumfix 'ke-an' to form the noun 'kepastian' (certainty/confirmation). We are waiting for confirmation of the schedule."
  },
  {
    id: 314,
    root: 'milik',
    targetWord: 'kepemilikan',
    sentence: 'Status ___ lahan itu masih dalam sengketa.',
    hint: 'ownership',
    explanation: "The root 'milik' (belonging/own) uses the circumfix 'ke-peN-an' (derived from 'pemilik' - owner) to form the abstract noun 'kepemilikan' (ownership). The land ownership status is disputed."
  },
  {
    id: 315,
    root: 'pimpin',
    targetWord: 'kepemimpinan',
    sentence: 'Gaya ___ partisipatif cocok untuk tim kreatif.',
    hint: 'leadership',
    explanation: "The root 'pimpin' (lead) uses the circumfix 'ke-peN-an' (derived from 'pemimpin' - leader) to form the abstract noun 'kepemimpinan' (leadership). Participative leadership style suits creative teams."
  },
  {
    id: 316,
    root: 'racun',
    targetWord: 'keracunan',
    sentence: 'Korban ___ makanan segera dibawa ke rumah sakit.',
    hint: 'to suffer from poisoning, poisoned',
    explanation: "The root noun 'racun' (poison) uses the circumfix 'ke-an' to form 'keracunan', which means 'the state of being poisoned' or 'food poisoning'. The food poisoning victim was taken to the hospital."
  },
  {
    id: 317,
    root: 'rusak',
    targetWord: 'kerusakan',
    sentence: '___ pada mesin menyebabkan produksi terhenti.',
    hint: 'damage',
    explanation: "The root adjective/verb 'rusak' (damaged/broken) takes the circumfix 'ke-an' to form the noun 'kerusakan' (damage). Damage to the machine caused production to stop."
  },
  {
    id: 318,
    root: 'salah',
    targetWord: 'kesalahan',
    sentence: 'Mohon maaf atas ___ penulisan nama.',
    hint: 'error, mistake',
    explanation: "The root 'salah' (wrong/mistake) uses the circumfix 'ke-an' to form the noun 'kesalahan' (mistake/error). Apologies for the name spelling error."
  },
  {
    id: 319,
    root: 'selamat',
    targetWord: 'keselamatan',
    sentence: 'Utamakan ___ saat berkendara di jalan raya.',
    hint: 'safety',
    explanation: "The root adjective 'selamat' (safe) takes the circumfix 'ke-an' to form the abstract noun 'keselamatan' (safety). Prioritize safety when driving."
  },
  {
    id: 320,
    root: 'sadar',
    targetWord: 'kesadaran',
    sentence: '___ hukum masyarakat perlu ditingkatkan.',
    hint: 'consciousness, awareness, realization',
    explanation: "The root adjective 'sadar' (aware/conscious) uses the circumfix 'ke-an' to form the abstract noun 'kesadaran' (awareness/consciousness). Public legal awareness needs improvement."
  },
  {
    id: 321,
    root: 'saksi',
    targetWord: 'kesaksian',
    sentence: '___ saksi memberatkan posisi terdakwa.',
    hint: 'testimony',
    explanation: "The root noun 'saksi' (witness) takes the circumfix 'ke-an' to form the noun 'kesaksian' (testimony). The witness's testimony implicated the defendant."
  },
  {
    id: 322,
    root: 'kesan',
    targetWord: 'kesan',
    sentence: 'Dia memberikan ___ pertama yang baik saat wawancara.',
    hint: 'impression',
    explanation: "This is the root word used as a noun. 'Kesan' (impression) fits directly. He gave a good first impression. No affix needed here."
  },
  {
    id: 323,
    root: 'sedia',
    targetWord: 'kesediaan',
    sentence: 'Terima kasih atas ___ Anda untuk membantu.',
    hint: 'willingness',
    explanation: "The root adjective 'sedia' (ready/willing) takes the circumfix 'ke-an' to form the noun 'kesediaan' (willingness). Thank you for your willingness to help."
  },
  {
    id: 324,
    root: 'imbang',
    targetWord: 'keseimbangan',
    sentence: '___ ekosistem laut terganggu oleh sampah plastik.',
    hint: 'balance',
    explanation: "The root 'imbang' (balanced) uses the circumfix 'ke-an' to form the noun 'keseimbangan' (balance). The marine ecosystem balance is disturbed by plastic waste."
  },
  {
    id: 325,
    root: 'sepakat',
    targetWord: 'kesepakatan',
    sentence: '___ kerja sama ditandatangani oleh kedua pihak.',
    hint: 'deal, agreement',
    explanation: "The root 'sepakat' (agree/in agreement) takes the circumfix 'ke-an' to form the noun 'kesepakatan' (agreement/deal). The cooperation agreement was signed."
  },
  {
    id: 326,
    root: 'simpul',
    targetWord: 'kesimpulan',
    sentence: 'Apa ___ yang bisa ditarik dari diskusi ini?',
    hint: 'conclusion',
    explanation: "The root 'simpul' (knot/conclude) uses the circumfix 'ke-an' to form the noun 'kesimpulan' (conclusion). What conclusion can be drawn?"
  },
  {
    id: 327,
    root: 'batas',
    targetWord: 'keterbatasan',
    sentence: '___ anggaran menghambat pelaksanaan program.',
    hint: 'limitation',
    explanation: "The root 'batas' (limit) uses the circumfix 'ke-ter-...-an' (derived from 'terbatas' - limited) to form the noun 'keterbatasan' (limitation). Budget limitation hinders the program."
  },
  {
    id: 328,
    root: 'kait',
    targetWord: 'keterkaitan',
    sentence: 'Ada ___ erat antara pendidikan dan kemiskinan.',
    hint: 'linkage',
    explanation: "The root 'kait' (link/hook) uses the circumfix 'ke-ter-...-an' (derived from 'terkait' - linked) to form the noun 'keterkaitan' (linkage/relatedness). There is a close linkage between education and poverty."
  },
  {
    id: 329,
    root: 'libat',
    targetWord: 'keterlibatan',
    sentence: '___ orang tua dalam kegiatan sekolah sangat diharapkan.',
    hint: 'involvement',
    explanation: "The root 'libat' (involve) uses the circumfix 'ke-ter-...-an' (derived from 'terlibat' - involved) to form the noun 'keterlibatan' (involvement). Parental involvement is expected."
  },
  {
    id: 330,
    root: 'terampil',
    targetWord: 'keterampilan',
    sentence: '___ berbahasa asing sangat dibutuhkan saat ini.',
    hint: 'skill',
    explanation: "The root adjective 'terampil' (skilled) uses the circumfix 'ke-an' to form the noun 'keterampilan' (skill). Foreign language skill is needed."
  },
  {
    id: 331,
    root: 'tentu',
    targetWord: 'ketentuan',
    sentence: 'Harap patuhi ___ yang berlaku di area ini.',
    hint: 'terms, regulation',
    explanation: "The root 'tentu' (certain/sure) uses the circumfix 'ke-an' to form the noun 'ketentuan' (provision/regulation/term). Please obey the applicable regulations."
  },
  {
    id: 332,
    root: 'untung',
    targetWord: 'keuntungan',
    sentence: '___ berinvestasi properti bisa sangat besar.',
    hint: 'benefit, profit, advantage',
    explanation: "The root 'untung' (profit/luck) takes the circumfix 'ke-an' to form the noun 'keuntungan' (profit/advantage/benefit). The profit from property investment can be large."
  },
  {
    id: 333,
    root: 'unggul',
    targetWord: 'keunggulan',
    sentence: 'Salah satu ___ produk ini adalah desainnya yang unik.',
    hint: 'excellence, superiority, virtue',
    explanation: "The root adjective 'unggul' (superior/excellent) uses the circumfix 'ke-an' to form the noun 'keunggulan' (excellence/superiority/advantage). One advantage of this product is its unique design."
  },
  {
    id: 335,
    root: 'waspada',
    targetWord: 'kewaspadaan',
    sentence: '___ perlu ditingkatkan saat berada di tempat ramai.',
    hint: 'alertness',
    explanation: "The root adjective 'waspada' (alert/vigilant) takes the circumfix 'ke-an' to form the noun 'kewaspadaan' (alertness/vigilance). Alertness needs to be increased in crowded places."
  },
  {
    id: 336,
    root: 'kait',
    targetWord: 'kaitan',
    sentence: 'Apakah ada ___ antara kedua peristiwa itu?',
    hint: 'connection, relation, link',
    explanation: "The root 'kait' (hook/link) takes the suffix '-an' to form the noun 'kaitan' (connection/relation). Is there a connection between the two events?"
  },
  {
    id: 337,
    root: 'kandung',
    targetWord: 'kandungan',
    sentence: 'Periksa ___ nutrisi pada kemasan makanan.',
    hint: 'content; womb',
    explanation: "The root verb 'kandung' (contain/conceive) uses the suffix '-an' to form the noun 'kandungan' (content/womb). Check the nutritional content on the packaging."
  },
  {
    id: 339,
    root: 'kumpul',
    targetWord: 'kumpulan',
    sentence: 'Dia menerbitkan ___ puisi terbarunya.',
    hint: 'a group of, a collection of',
    explanation: "The root 'kumpul' (gather) takes the suffix '-an' to form the noun 'kumpulan' (collection/group). He published his latest collection of poems."
  },
  {
    id: 340,
    root: 'kunjung',
    targetWord: 'kunjungan',
    sentence: 'Jumlah ___ wisatawan ke museum itu meningkat.',
    hint: 'the visit, the visitation',
    explanation: "The root 'kunjung' (visit) uses the suffix '-an' to form the noun 'kunjungan' (a visit/visitation). The number of tourist visits to the museum increased."
  },
  {
    id: 343,
    root: 'larang',
    targetWord: 'larangan',
    sentence: '___ merokok di tempat umum sudah diterapkan.',
    hint: 'prohibition, restriction (a law or regulation forbidding something)',
    explanation: "The root verb 'larang' (forbid) takes the suffix '-an' to form the noun 'larangan' (prohibition/ban). The smoking ban in public places has been implemented."
  },
  {
    id: 344,
    root: 'latih',
    targetWord: 'latihan',
    sentence: '___ fisik secara teratur penting untuk kebugaran.',
    hint: 'practice, exercise, training',
    explanation: "The root verb 'latih' (train) uses the suffix '-an' to form the noun 'latihan' (practice/exercise/training). Regular physical exercise is important for fitness."
  },
  {
    id: 345,
    root: 'ledak',
    targetWord: 'ledakan',
    sentence: '___ bom terdengar hingga radius beberapa kilometer.',
    hint: 'explosion',
    explanation: "The root 'ledak' (explode) takes the suffix '-an' to form the noun 'ledakan' (explosion). The bomb explosion was heard for several kilometers."
  },
  {
    id: 351,
    root: 'manfaat',
    targetWord: 'manfaat',
    sentence: 'Jelaskan ___ produk ini bagi konsumen.',
    hint: 'the benefit',
    explanation: "This is the root word used as a noun. 'Manfaat' (benefit/use) fits directly. Explain the benefit of this product. No affix needed here."
  },
  {
    id: 352,
    root: 'bangun',
    targetWord: 'membangun',
    sentence: 'Mereka ___ rumah baru di pinggir kota.',
    hint: 'to build',
    explanation: "The root 'bangun' (build/wake up) takes the prefix 'meN-' (becoming 'mem-') to form the active transitive verb 'membangun' (to build). They (subject) build a new house (object)."
  },
  {
    id: 353,
    root: 'bangun',
    targetWord: 'membangunkan',
    sentence: 'Alarm ___ saya tepat pukul lima pagi.',
    hint: 'to wake someone up',
    explanation: "The root 'bangun' (wake up) takes the prefix 'meN-' ('mem-') and suffix '-kan' to form the causative transitive verb 'membangunkan' (to wake someone up). The alarm (subject) wakes me (object)."
  },
  {
    id: 355,
    root: 'bakar',
    targetWord: 'membakar',
    sentence: 'Dia ___ surat-surat lama dari mantannya.',
    hint: 'to burn something',
    explanation: "The root 'bakar' (burn) takes the prefix 'meN-' ('mem-') to form the active transitive verb 'membakar' (to burn something). He (subject) burns the old letters (object)."
  },
  {
    id: 356,
    root: 'balas',
    targetWord: 'membalas',
    sentence: 'Saya akan ___ email Anda sesegera mungkin.',
    hint: 'to reply, to retaliate',
    explanation: "The root 'balas' (reply/retaliate) takes the prefix 'meN-' ('mem-') to form the active transitive verb 'membalas' (to reply to/retaliate against). I (subject) will reply to your email (object)."
  },
  {
    id: 357,
    root: 'banding',
    targetWord: 'membandingkan',
    sentence: 'Jangan ___ dirimu dengan orang lain.',
    hint: 'to compare',
    explanation: "The root 'banding' (compare) takes prefix 'meN-' ('mem-') and suffix '-kan' to form the active transitive verb 'membandingkan' (to compare). Don't compare yourself (object) with others."
  },
  {
    id: 358,
    root: 'bangga',
    targetWord: 'membanggakan',
    sentence: 'Prestasinya ___ kedua orang tuanya.',
    hint: 'to be proud of',
    explanation: "The root 'bangga' (proud) takes prefix 'meN-' ('mem-') and suffix '-kan' to form the active transitive verb 'membanggakan' (to make someone proud). His achievement (subject) makes his parents (object) proud."
  },
  {
    id: 359,
    root: 'batas',
    targetWord: 'membatasi',
    sentence: 'Dokter menyarankan untuk ___ konsumsi gula.',
    hint: 'to limit, to restrict',
    explanation: "The root 'batas' (limit) takes prefix 'meN-' ('mem-') and suffix '-i' to form the active transitive verb 'membatasi' (to limit/restrict). The doctor advises limiting sugar consumption (object)."
  },
  {
    id: 360,
    root: 'baca',
    targetWord: 'membaca',
    sentence: 'Anak itu sedang belajar ___.' ,
    hint: 'to read',
    explanation: "The root 'baca' (read) takes the prefix 'meN-' ('mem-') to form the active verb 'membaca' (to read). The child is learning to read. It can be transitive (membaca buku) or intransitive here."
  },
  {
    id: 361,
    root: 'beda',
    targetWord: 'membedakan',
    sentence: 'Warna dapat membantu ___ jenis buah yang matang.',
    hint: 'to distinguish, to differentiate',
    explanation: "The root 'beda' (different) takes prefix 'meN-' ('mem-') and suffix '-kan' to form the active transitive verb 'membedakan' (to differentiate/distinguish). Color helps distinguish the type of ripe fruit (object)."
  },
  {
    id: 362,
    root: 'bentuk',
    targetWord: 'membentuk',
    sentence: 'Pengalaman akan ___ karakter seseorang.',
    hint: 'to form, to shape',
    explanation: "The root 'bentuk' (form/shape) takes the prefix 'meN-' ('mem-') to form the active transitive verb 'membentuk' (to form/shape). Experience (subject) will shape someone's character (object)."
  },
  {
    id: 363,
    root: 'laku',
    targetWord: 'memberlakukan',
    sentence: 'Sekolah ___ aturan baru tentang seragam.',
    hint: 'to impose, to put into effect, to implement',
    explanation: "The root 'laku' (apply/valid) uses the combined prefix 'member-' (from 'meN-' + 'ber-') and suffix '-kan' to form 'memberlakukan' (to implement/enforce). The school (subject) implements new rules (object)."
  },
  {
    id: 364,
    root: 'beri',
    targetWord: 'memberikan',
    sentence: 'Guru ___ tugas tambahan kepada siswa.',
    hint: 'to give to someone',
    explanation: "The root 'beri' (give) takes prefix 'meN-' ('mem-') and suffix '-kan' to form the active transitive verb 'memberikan' (to give). The teacher (subject) gives additional assignments (object)."
  },
  {
    id: 365,
    root: 'biasa',
    targetWord: 'membiasakan',
    sentence: '___ diri hidup disiplin tidaklah mudah.',
    hint: 'to get used to',
    explanation: "The root 'biasa' (usual) takes prefix 'meN-' ('mem-') and suffix '-kan' to form the active transitive verb 'membiasakan' (to make something/someone accustomed). Making oneself (object) accustomed to discipline is not easy."
  },
  {
    id: 366,
    root: 'bicara',
    targetWord: 'membicarakan',
    sentence: 'Kami perlu ___ rencana proyek ini lebih detail.',
    hint: 'to talk about',
    explanation: "The root 'bicara' (talk/speak) takes prefix 'meN-' ('mem-') and suffix '-kan' to form the active transitive verb 'membicarakan' (to talk about/discuss). We need to discuss this project plan (object)."
  },
  {
    id: 367,
    root: 'bingung',
    targetWord: 'membingungkan',
    sentence: 'Petunjuk arah yang ___ membuatnya tersesat.',
    hint: 'confusing',
    explanation: "The root 'bingung' (confused) takes prefix 'meN-' ('mem-') and suffix '-kan' to form the active verb/adjective 'membingungkan' (to confuse/confusing). The confusing directions (subject acting as adjective here) made him lost."
  },
  {
    id: 368,
    root: 'bukti',
    targetWord: 'membuktikan',
    sentence: 'Dia harus ___ bahwa alibinya benar.',
    hint: 'to prove something',
    explanation: "The root 'bukti' (proof) takes prefix 'meN-' ('mem-') and suffix '-kan' to form the active transitive verb 'membuktikan' (to prove). He has to prove his alibi (object)."
  },
  {
    id: 369,
    root: 'buang',
    targetWord: 'membuang',
    sentence: 'Harap ___ sampah pada tempatnya.',
    hint: 'to throw away, to discard',
    explanation: "The root 'buang' (throw) takes the prefix 'meN-' ('mem-') to form the active transitive verb 'membuang' (to throw away). Please throw the trash (object)."
  },
  {
    id: 370,
    root: 'buat',
    targetWord: 'membuat',
    sentence: 'Ibu sedang ___ kue untuk acara keluarga.',
    hint: 'to make something',
    explanation: "The root 'buat' (make) takes the prefix 'meN-' ('mem-') to form the active transitive verb 'membuat' (to make). Mother (subject) is making a cake (object)."
  },
  {
    id: 373,
    root: 'budaya',
    targetWord: 'membudayakan',
    sentence: 'Mari kita ___ membaca di kalangan anak muda.',
    hint: 'to cultivate a culture/habit',
    explanation: "The root 'budaya' (culture) takes prefix 'meN-' ('mem-') and suffix '-kan' to form the active transitive verb 'membudayakan' (to cultivate a culture/habit). Let's cultivate reading (object) among youth."
  },
  {
    id: 374,
    root: 'pengaruh',
    targetWord: 'memengaruhi',
    sentence: 'Cuaca dapat ___ suasana hati seseorang.',
    hint: 'to influence',
    explanation: "The root 'pengaruh' (influence) takes the prefix 'meN-' ('mem-') and suffix '-i' (dropping 'p' and adding 'm') to form the active transitive verb 'memengaruhi' (to influence). Weather (subject) can influence mood (object)."
  },
  {
    id: 375,
    root: 'maju',
    targetWord: 'memajukan',
    sentence: 'Pendidikan adalah kunci untuk ___ bangsa.',
    hint: 'to advance, to develop',
    explanation: "The root 'maju' (forward/advance) takes prefix 'meN-' ('mem-') and suffix '-kan' to form the active transitive verb 'memajukan' (to advance/develop). Education is the key to advancing the nation (object)."
  },
  {
    id: 376,
    root: 'paksa',
    targetWord: 'memaksa',
    sentence: 'Jangan ___ anak untuk mengikuti kehendak orang tua.',
    hint: 'to force',
    explanation: "The root 'paksa' (force) takes the prefix 'meN-' ('mem-') to form the active transitive verb 'memaksa' (to force). Don't force the child (object)."
  },
  {
    id: 377,
    root: 'pamer',
    targetWord: 'memamerkan',
    sentence: 'Dia suka ___ kekayaannya di media sosial.',
    hint: 'to show off something',
    explanation: "The root 'pamer' (show off) takes prefix 'meN-' ('mem-') and suffix '-kan' to form the active transitive verb 'memamerkan' (to show off/exhibit). He likes showing off his wealth (object)."
  },
  {
    id: 378,
    root: 'pandang',
    targetWord: 'memandang',
    sentence: '___ remeh kemampuan orang lain adalah sikap sombong.',
    hint: 'to view, to look at, to gaze at; to consider/regard',
    explanation: "The root 'pandang' (view/look) takes the prefix 'meN-' ('mem-') to form the active verb 'memandang' (to view/regard). Here 'memandang remeh' means 'to look down on' or 'underestimate'."
  },
  {
    id: 379,
    root: 'pasang',
    targetWord: 'memasang',
    sentence: 'Tukang listrik sedang ___ instalasi baru.',
    hint: 'to install',
    explanation: "The root 'pasang' (install/pair) takes the prefix 'meN-' ('mem-') to form the active transitive verb 'memasang' (to install). The electrician (subject) is installing a new installation (object)."
  },
  {
    id: 380,
    root: 'pasti',
    targetWord: 'memastikan',
    sentence: '___ pintu sudah terkunci sebelum pergi.',
    hint: 'to ascertain, to ensure, to confirm',
    explanation: "The root 'pasti' (sure/certain) takes prefix 'meN-' ('mem-') and suffix '-kan' to form the active transitive verb 'memastikan' (to ensure/make certain). Ensure the door (object/clause) is locked."
  },
  {
    id: 381,
    root: 'masuk',
    targetWord: 'memasuki',
    sentence: 'Kami ___ ruangan rapat tepat waktu.',
    hint: 'to enter into',
    explanation: "The root 'masuk' (enter) takes prefix 'meN-' ('mem-') and suffix '-i' to form the active transitive verb 'memasuki' (to enter into). We (subject) entered the meeting room (object)."
  },
  {
    id: 382,
    root: 'masuk',
    targetWord: 'memasukkan',
    sentence: 'Tolong ___ surat ini ke dalam amplop.',
    hint: 'to insert',
    explanation: "The root 'masuk' (enter) takes prefix 'meN-' ('mem-') and suffix '-kan' to form the active transitive verb 'memasukkan' (to insert/put into). Please insert this letter (object) into the envelope."
  },
  {
    id: 383,
    root: 'manfaat',
    targetWord: 'memanfaatkan',
    sentence: 'Kita bisa ___ barang bekas menjadi kerajinan.',
    hint: 'to make use of, to utilize',
    explanation: "The root 'manfaat' (benefit) takes prefix 'meN-' ('mem-') and suffix '-kan' to form the active transitive verb 'memanfaatkan' (to utilize/make use of). We can utilize used goods (object)."
  },
  {
    id: 384,
    root: 'menang',
    targetWord: 'memenangkan',
    sentence: 'Siapa yang akan ___ pertandingan ini?',
    hint: 'to win something (must have an object)',
    explanation: "The root 'menang' (win) takes prefix 'meN-' ('mem-') and suffix '-kan' to form the active transitive verb 'memenangkan' (to win something). Who (subject) will win this match (object)?"
  },
  {
    id: 385,
    root: 'percaya',
    targetWord: 'memercayai',
    sentence: 'Saya ___ bahwa dia berkata jujur.',
    hint: 'to trust someone/something',
    explanation: "The root 'percaya' (believe/trust) takes the prefix 'meN-' (becoming 'memper-' is also common but 'memercayai' uses 'meN-' + '-i' directly here) and suffix '-i' to form 'memercayai' (to trust/believe in). I (subject) trust/believe him/that he spoke honestly (object/clause)."
  },
  {
    id: 387,
    root: 'peran',
    targetWord: 'memerankan',
    sentence: 'Aktor itu ___ tokoh antagonis dengan sangat baik.',
    hint: 'to play a role of',
    explanation: "The root 'peran' (role) takes prefix 'meN-' ('mem-') and suffix '-kan' to form the active transitive verb 'memerankan' (to play the role of). The actor (subject) played the antagonist role (object)."
  },
  {
    id: 388,
    root: 'picu',
    targetWord: 'memicu',
    sentence: 'Kata-katanya yang kasar ___ pertengkaran.',
    hint: 'to trigger',
    explanation: "The root 'picu' (trigger) takes the prefix 'meN-' ('mem-') to form the active transitive verb 'memicu' (to trigger). His harsh words (subject) triggered the argument (object)."
  },
  {
    id: 389,
    root: 'milik',
    targetWord: 'memiliki',
    sentence: 'Dia ___ bakat luar biasa dalam bermain musik.',
    hint: 'to have, to own, to possess',
    explanation: "The root 'milik' (belonging/own) takes prefix 'meN-' ('mem-') and suffix '-i' to form the active transitive verb 'memiliki' (to have/possess). He (subject) possesses extraordinary talent (object)."
  },
  {
    id: 390,
    root: 'pimpin',
    targetWord: 'memimpin',
    sentence: 'Dia ditunjuk untuk ___ rapat penting itu.',
    hint: 'to lead',
    explanation: "The root 'pimpin' (lead) takes the prefix 'meN-' ('mem-') to form the active transitive verb 'memimpin' (to lead). He was appointed to lead the important meeting (object)."
  },
  {
    id: 392,
    root: 'pisah',
    targetWord: 'memisahkan',
    sentence: 'Guru ___ siswa yang berkelahi.',
    hint: 'to separate or disunite two or more things',
    explanation: "The root 'pisah' (separate) takes prefix 'meN-' ('mem-') and suffix '-kan' to form the active transitive verb 'memisahkan' (to separate). The teacher (subject) separated the fighting students (object)."
  },
  {
    id: 393,
    root: 'baru',
    targetWord: 'memperbarui',
    sentence: 'Silakan ___ data pribadi Anda di sistem.',
    hint: 'to renew, to update',
    explanation: "The root 'baru' (new) takes the circumfix 'memper-...-i' (active form indicating 'to make something [root]') to form 'memperbarui' (to renew/update). Please update your personal data (object)."
  },
  {
    id: 394,
    root: 'hati',
    targetWord: 'memperhatikan',
    sentence: '___ instruksi dengan baik agar tidak salah.',
    hint: 'to pay attention to',
    explanation: "The root 'hati' (heart/attention) takes the circumfix 'memper-...-kan' (active form) to form 'memperhatikan' (to pay attention to). Pay attention to the instructions (object)."
  },
  {
    id: 395,
    root: 'baik',
    targetWord: 'memperbaiki',
    sentence: 'Dia sedang ___ sepeda motornya yang rusak.',
    hint: 'to fix, to repair, to improve',
    explanation: "The root 'baik' (good) takes the circumfix 'memper-...-i' to form the active transitive verb 'memperbaiki' (to fix/repair/make better). He (subject) is fixing his broken motorcycle (object)."
  },
  {
    id: 396,
    root: 'cepat',
    targetWord: 'mempercepat',
    sentence: 'Jalan pintas ini akan ___ perjalanan kita.',
    hint: 'to speed up, to accelerate',
    explanation: "The root 'cepat' (fast) takes the prefix 'memper-' to form the active transitive verb 'mempercepat' (to accelerate/speed up). This shortcut (subject) will speed up our journey (object)."
  },
  {
    id: 397,
    root: 'dagang',
    targetWord: 'memperdagangkan',
    sentence: '___ barang ilegal adalah tindakan kriminal.',
    hint: 'to trade something',
    explanation: "The root 'dagang' (trade) takes the circumfix 'memper-...-kan' to form the active transitive verb 'memperdagangkan' (to trade something, often commercially). Trading illegal goods (object as part of gerund phrase) is a crime."
  },
  {
    id: 398,
    root: 'ingat',
    targetWord: 'memperingati',
    sentence: 'Bangsa Indonesia ___ Hari Pahlawan setiap 10 November.',
    hint: 'to commemorate',
    explanation: "The root 'ingat' (remember) takes the circumfix 'memper-...-i' to form the active transitive verb 'memperingati' (to commemorate). The Indonesian nation (subject) commemorates Heroes' Day (object)."
  },
  {
    id: 399,
    root: 'ingat',
    targetWord: 'memperingatkan',
    sentence: 'Polisi ___ pengendara agar mematuhi batas kecepatan.',
    hint: 'to warn; to reprimand',
    explanation: "The root 'ingat' (remember) takes the circumfix 'memper-...-kan' to form the active transitive verb 'memperingatkan' (to warn/remind forcefully). Police (subject) warn drivers (object)."
  },
  {
    id: 400,
    root: 'kuat',
    targetWord: 'memperkuat',
    sentence: 'Minum susu dapat ___ tulang.',
    hint: 'to strengthen, to reinforce',
    explanation: "The root 'kuat' (strong) takes the prefix 'memper-' to form the active transitive verb 'memperkuat' (to strengthen/reinforce). Drinking milk (subject) can strengthen bones (object)."
  },
  {
    id: 401,
    root: 'lengkap',
    targetWord: 'memperlengkapi',
    sentence: 'Bengkel itu ___ mobilnya dengan peralatan baru.',
    hint: 'to equip, to furnish with',
    explanation: "The root 'lengkap' (complete) takes the circumfix 'memper-...-i' to form the active transitive verb 'memperlengkapi' (to equip). The workshop (subject) equipped his car (object) with new tools."
  },
  {
    id: 402,
    root: 'luas',
    targetWord: 'memperluas',
    sentence: 'Dia ingin ___ pengetahuannya dengan banyak membaca.',
    hint: 'to expand, to widen',
    explanation: "The root 'luas' (wide) takes the prefix 'memper-' to form the active transitive verb 'memperluas' (to expand/widen). He wants to expand his knowledge (object)."
  },
  {
    id: 403,
    root: 'timbang',
    targetWord: 'mempertimbangkan',
    sentence: 'Harap ___ kembali keputusan Anda dengan matang.',
    hint: 'to consider',
    explanation: "The root 'timbang' (weigh/consider) takes the circumfix 'memper-...-kan' to form the active transitive verb 'mempertimbangkan' (to consider). Please consider your decision (object) carefully."
  },
  {
    id: 404,
    root: 'muat',
    targetWord: 'memuat',
    sentence: 'Koran hari ini ___ berita tentang pemilu.',
    hint: 'to load (e.g., cargo); to contain, to publish (e.g., news)',
    explanation: "The root 'muat' (load/contain) takes the prefix 'meN-' ('mem-') to form the active transitive verb 'memuat' (to load/contain/publish). Today's newspaper (subject) contains/publishes news (object) about the election."
  },
  {
    id: 406,
    root: 'pusat',
    targetWord: 'memusatkan',
    sentence: 'Dia ___ seluruh energinya untuk ujian akhir.',
    hint: 'to centre/direct, to concentrate, to focus',
    explanation: "The root 'pusat' (center) takes prefix 'meN-' ('mem-') and suffix '-kan' to form the active transitive verb 'memusatkan' (to focus/concentrate). He (subject) focused all his energy (object) on the final exam."
  },
  {
    id: 407,
    root: 'naik',
    targetWord: 'menaikkan',
    sentence: 'Toko itu ___ harga barang-barangnya.',
    hint: 'to increase; to lift up',
    explanation: "The root 'naik' (go up/increase) takes prefix 'meN-' ('men-') and suffix '-kan' to form the active transitive verb 'menaikkan' (to raise/increase). The store (subject) raised the prices of its goods (object)."
  },
  {
    id: 409,
    root: 'tanam',
    targetWord: 'menanam',
    sentence: 'Mereka ___ pohon di halaman belakang rumah.',
    hint: 'to plant',
    explanation: "The root 'tanam' (plant) takes the prefix 'meN-' ('men-') to form the active transitive verb 'menanam' (to plant). They (subject) planted trees (object)."
  },
  {
    id: 411,
    root: 'tangan',
    targetWord: 'menangani',
    sentence: 'Tim khusus dibentuk untuk ___ kasus tersebut.',
    hint: 'to handle',
    explanation: "The root 'tangan' (hand) takes prefix 'meN-' ('men-') and suffix '-i' to form the active transitive verb 'menangani' (to handle). A special team was formed to handle the case (object)."
  },
  {
    id: 412,
    root: 'tanggap',
    targetWord: 'menanggapi',
    sentence: 'Dia ___ pertanyaan wartawan dengan tenang.',
    hint: 'to respond to',
    explanation: "The root 'tanggap' (respond/responsive) takes prefix 'meN-' ('men-') and suffix '-i' to form the active transitive verb 'menanggapi' (to respond to). He (subject) responded to the reporter's questions (object) calmly."
  },
  {
    id: 413,
    root: 'tantang',
    targetWord: 'menantang',
    sentence: 'Mendaki gunung tertinggi adalah pengalaman yang ___.' ,
    hint: 'challenging; to challenge',
    explanation: "The root 'tantang' (challenge) takes the prefix 'meN-' ('men-') to form the active verb 'menantang' (to challenge / challenging). Here it acts like an adjective describing the experience."
  },
  {
    id: 414,
    root: 'tanya',
    targetWord: 'menanyakan',
    sentence: 'Murid itu ___ soal yang belum dipahaminya.',
    hint: 'to ask about, to inquire',
    explanation: "The root 'tanya' (ask) takes prefix 'meN-' ('men-') and suffix '-kan' to form the active transitive verb 'menanyakan' (to ask about). The student (subject) asked about the problem (object) he didn't understand."
  },
  {
    id: 416,
    root: 'tawar',
    targetWord: 'menawarkan',
    sentence: 'Dia ___ bantuan kepada temannya yang kesulitan.',
    hint: 'to offer',
    explanation: "The root 'tawar' (offer/bargain) takes prefix 'meN-' ('men-') and suffix '-kan' to form the active transitive verb 'menawarkan' (to offer). He (subject) offered help (object) to his friend."
  },
  {
    id: 417,
    root: 'cari',
    targetWord: 'mencari',
    sentence: 'Saya sedang ___ kunci mobil saya yang hilang.',
    hint: 'to look for',
    explanation: "The root 'cari' (look for) takes the prefix 'meN-' ('men-' + 'c' -> 'menc-') to form the active transitive verb 'mencari' (to look for). I (subject) am looking for my lost car keys (object)."
  },
  {
    id: 418,
    root: 'capai',
    targetWord: 'mencapai',
    sentence: 'Dia bekerja keras untuk ___ cita-citanya.',
    hint: 'to reach, to achieve',
    explanation: "The root 'capai' (reach/achieve) takes prefix 'meN-' ('men-' + 'c' -> 'menc-') and suffix '-i' to form the active transitive verb 'mencapai' (to reach/achieve). He worked hard to achieve his goals (object)."
  },
  {
    id: 420,
    root: 'cegah',
    targetWord: 'mencegah',
    sentence: 'Mencuci tangan dapat ___ penyebaran penyakit.',
    hint: 'to prevent (i.e.: to prevent something from happening)',
    explanation: "The root 'cegah' (prevent) takes the prefix 'meN-' ('men-' + 'c' -> 'menc-') to form the active transitive verb 'mencegah' (to prevent). Washing hands (subject) can prevent the spread of disease (object)."
  },
  {
    id: 421,
    root: 'cemar',
    targetWord: 'mencemari',
    sentence: 'Pembuangan limbah pabrik dapat ___ lingkungan.',
    hint: 'to pollute, to contaminate',
    explanation: "The root 'cemar' (polluted/defiled) takes prefix 'meN-' ('men-' + 'c' -> 'menc-') and suffix '-i' to form the active transitive verb 'mencemari' (to pollute/contaminate). Factory waste disposal (subject) can pollute the environment (object)."
  },
  {
    id: 422,
    root: 'cipta',
    targetWord: 'menciptakan',
    sentence: 'Suasana kerja yang positif dapat ___ produktivitas.',
    hint: 'to create',
    explanation: "The root 'cipta' (create) takes prefix 'meN-' ('men-' + 'c' -> 'menc-') and suffix '-kan' to form the active transitive verb 'menciptakan' (to create). A positive work atmosphere (subject) can create productivity (object)."
  },
  {
    id: 425,
    root: 'daftar',
    targetWord: 'mendaftar',
    sentence: 'Dia ___ sebagai peserta seminar internasional itu.',
    hint: 'to register yourself, to sign up (intransitive verb); to make a list of items (transitive verb)',
    explanation: "The root 'daftar' (list/register) takes the prefix 'meN-' ('men-' + 'd' -> 'mend-') to form the active verb 'mendaftar' (to register/sign up). He (subject) registered as a participant."
  },
  {
    id: 428,
    root: 'dapat',
    targetWord: 'mendapatkan',
    sentence: 'Dia ___ nilai tertinggi di kelasnya.',
    hint: 'to obtain, to get',
    explanation: "The root 'dapat' (can/get) takes prefix 'meN-' ('men-' + 'd' -> 'mend-') and suffix '-kan' to form the active transitive verb 'mendapatkan' (to obtain/get). He (subject) got the highest score (object)."
  },
  {
    id: 429,
    root: 'dasar',
    targetWord: 'mendasari',
    sentence: 'Kasih sayang ___ hubungan yang harmonis.',
    hint: 'to underlie',
    explanation: "The root 'dasar' (base/foundation) takes prefix 'meN-' ('men-' + 'd' -> 'mend-') and suffix '-i' to form the active transitive verb 'mendasari' (to underlie/be the basis of). Affection (subject) underlies a harmonious relationship (object)."
  },
  {
    id: 430,
    root: 'dekat',
    targetWord: 'mendekati',
    sentence: 'Kapal itu ___ pelabuhan.',
    hint: 'approaching; to approach',
    explanation: "The root 'dekat' (near) takes prefix 'meN-' ('men-' + 'd' -> 'mend-') and suffix '-i' to form the active transitive verb 'mendekati' (to approach). The ship (subject) is approaching the harbor (object)."
  },
  {
    id: 431,
    root: 'dorong',
    targetWord: 'mendorong',
    sentence: 'Motivasi internal ___ seseorang untuk sukses.',
    hint: 'to push, to encourage',
    explanation: "The root 'dorong' (push/encourage) takes the prefix 'meN-' ('men-' + 'd' -> 'mend-') to form the active transitive verb 'mendorong' (to push/encourage). Internal motivation (subject) encourages someone (object) to succeed."
  },
  {
    id: 433,
    root: 'dukung',
    targetWord: 'mendukung',
    sentence: 'Semua warga ___ program penghijauan desa.',
    hint: 'to support',
    explanation: "The root 'dukung' (support) takes the prefix 'meN-' ('men-' + 'd' -> 'mend-') to form the active transitive verb 'mendukung' (to support). All residents (subject) support the village greening program (object)."
  },
  {
    id: 434,
    root: 'duga',
    targetWord: 'menduga',
    sentence: 'Saya ___ dia tidak akan datang hari ini.',
    hint: 'to guess',
    explanation: "The root 'duga' (suspect/guess) takes the prefix 'meN-' ('men-' + 'd' -> 'mend-') to form the active transitive verb 'menduga' (to suspect/guess). I (subject) guess he won't come (object clause)."
  },
  {
    id: 435,
    root: 'tekan',
    targetWord: 'menekan',
    sentence: 'Dia ___ tombol bel berulang kali.',
    hint: 'to push; to press',
    explanation: "The root 'tekan' (press) takes the prefix 'meN-' ('men-' + 't' -> 'men-') to form the active transitive verb 'menekan' (to press). He (subject) pressed the doorbell button (object) repeatedly."
  },
  {
    id: 436,
    root: 'tekan',
    targetWord: 'menekankan',
    sentence: 'Pelatih ___ pentingnya disiplin dalam berlatih.',
    hint: 'to emphasize',
    explanation: "The root 'tekan' (press) takes prefix 'meN-' ('men-') and suffix '-kan' to form the active transitive verb 'menekankan' (to emphasize/stress). The coach (subject) emphasized the importance of discipline (object)."
  },
  {
    id: 437,
    root: 'temu',
    targetWord: 'menemukan',
    sentence: 'Akhirnya saya ___ buku yang saya cari.',
    hint: 'to find; to discover; to invent',
    explanation: "The root 'temu' (meet) takes prefix 'meN-' ('men-') and suffix '-kan' to form the active transitive verb 'menemukan' (to find/discover). Finally, I (subject) found the book (object) I was looking for."
  },
  {
    id: 440,
    root: 'tentu',
    targetWord: 'menentukan',
    sentence: 'Warna cat dinding dapat ___ suasana ruangan.',
    hint: 'to determine',
    explanation: "The root 'tentu' (certain) takes prefix 'meN-' ('men-') and suffix '-kan' to form the active transitive verb 'menentukan' (to determine/decide). Wall paint color (subject) can determine the room's atmosphere (object)."
  },
  {
    id: 442,
    root: 'terap',
    targetWord: 'menerapkan',
    sentence: 'Dia ___ ilmu yang didapatnya di tempat kerja.',
    hint: 'to apply, to implement',
    explanation: "The root 'terap' (apply) takes prefix 'meN-' ('men-') and suffix '-kan' to form the active transitive verb 'menerapkan' (to apply/implement). He (subject) applies the knowledge (object) he gained at work."
  },
  {
    id: 444,
    root: 'terang',
    targetWord: 'menerangkan',
    sentence: 'Guru ___ pelajaran dengan sabar kepada muridnya.',
    hint: 'to explain',
    explanation: "The root 'terang' (bright/clear) takes prefix 'meN-' ('men-') and suffix '-kan' to form the active transitive verb 'menerangkan' (to explain/make clear). The teacher (subject) explained the lesson (object)."
  },
  {
    id: 445,
    root: 'terjemah',
    targetWord: 'menerjemahkan',
    sentence: 'Dia bisa ___ bahasa Jepang ke bahasa Indonesia.',
    hint: 'to translate something',
    explanation: "The root 'terjemah' (translate) takes prefix 'meN-' ('men-') and suffix '-kan' to form the active transitive verb 'menerjemahkan' (to translate). He (subject) can translate Japanese (object) into Indonesian."
  },
  {
    id: 446,
    root: 'teliti',
    targetWord: 'meneliti',
    sentence: 'Mahasiswa itu sedang ___ dampak perubahan iklim.',
    hint: 'to research; to examine carefully',
    explanation: "The root 'teliti' (careful/research) takes the prefix 'meN-' ('men-') to form the active transitive verb 'meneliti' (to research/examine carefully). The student (subject) is researching the impact of climate change (object)."
  },
  {
    id: 447,
    root: 'timbang',
    targetWord: 'menimbang',
    sentence: 'Ibu ___ tepung untuk membuat kue.',
    hint: 'to weigh',
    explanation: "The root 'timbang' (weigh/consider) takes the prefix 'meN-' ('men-') to form the active transitive verb 'menimbang' (to weigh). Mother (subject) weighs flour (object)."
  },
  {
    id: 449,
    root: 'timbul',
    targetWord: 'menimbulkan',
    sentence: 'Berita bohong dapat ___ kepanikan massal.',
    hint: 'to cause something to occur',
    explanation: "The root 'timbul' (emerge/arise) takes prefix 'meN-' ('men-') and suffix '-kan' to form the active transitive causative verb 'menimbulkan' (to cause/bring about). Fake news (subject) can cause mass panic (object)."
  },
  {
    id: 451,
    root: 'tingkat',
    targetWord: 'meningkatkan',
    sentence: 'Membaca buku dapat ___ pengetahuan.',
    hint: 'to increase something, to raise',
    explanation: "The root 'tingkat' (level/increase) takes prefix 'meN-' ('men-') and suffix '-kan' to form the active transitive verb 'meningkatkan' (to increase/improve). Reading books (subject) can increase knowledge (object)."
  },
  {
    id: 453,
    root: 'jual',
    targetWord: 'menjual',
    sentence: 'Toko itu ___ pakaian dengan harga terjangkau.',
    hint: 'to sell',
    explanation: "The root 'jual' (sell) takes the prefix 'meN-' ('men-' + 'j' -> 'menj-') to form the active transitive verb 'menjual' (to sell). The store (subject) sells clothes (object)."
  },
  {
    id: 454,
    root: 'tuju',
    targetWord: 'menuju',
    sentence: 'Bus itu ___ ke arah terminal kota.',
    hint: 'heading towards',
    explanation: "The root 'tuju' (head towards/aim) takes the prefix 'meN-' ('men-') to form the active intransitive verb 'menuju' (heading towards). The bus is heading towards the city terminal."
  },
  {
    id: 455,
    root: 'tumbuh',
    targetWord: 'menumbuhkan',
    sentence: 'Pupuk organik membantu ___ tanaman dengan subur.',
    hint: 'to make something grow',
    explanation: "The root 'tumbuh' (grow) takes prefix 'meN-' ('men-') and suffix '-kan' to form the active transitive causative verb 'menumbuhkan' (to make grow/cultivate). Organic fertilizer helps grow plants (object) fertilely."
  },
  {
    id: 457,
    root: 'tunjuk',
    targetWord: 'menunjuk',
    sentence: 'Dia ___ foto keluarganya di dinding.',
    hint: 'to point; to appoint',
    explanation: "The root 'tunjuk' (point/appoint) takes the prefix 'meN-' ('men-') to form the active transitive verb 'menunjuk' (to point at/appoint). He (subject) pointed at his family photo (object)."
  },
  {
    id: 459,
    root: 'sadar',
    targetWord: 'menyadari',
    sentence: 'Dia ___ pentingnya menjaga kesehatan.',
    hint: 'to realize, to be aware of',
    explanation: "The root 'sadar' (aware) takes prefix 'meN-' ('meny-') and suffix '-i' to form the active transitive verb 'menyadari' (to realize/be aware of). He (subject) realizes the importance of maintaining health (object)."
  },
  {
    id: 461,
    root: 'saji',
    targetWord: 'menyajikan',
    sentence: 'Pelayan ___ hidangan utama kepada tamu.',
    hint: 'to serve (food and drink); to present (a presentation)',
    explanation: "The root 'saji' (serve/present) takes prefix 'meN-' ('meny-') and suffix '-kan' to form the active transitive verb 'menyajikan' (to serve/present). The waiter (subject) served the main course (object)."
  },
  {
    id: 463,
    root: 'salah',
    targetWord: 'menyalahkan',
    sentence: 'Jangan ___ orang lain atas kesalahanmu sendiri.',
    hint: 'to blame',
    explanation: "The root 'salah' (wrong/blame) takes prefix 'meN-' ('meny-') and suffix '-kan' to form the active transitive verb 'menyalahkan' (to blame). Don't blame other people (object) for your own mistakes."
  },
  {
    id: 464,
    root: 'sambut',
    targetWord: 'menyambut',
    sentence: 'Presiden ___ kedatangan tamu negara di istana.',
    hint: 'to welcome, to greet',
    explanation: "The root 'sambut' (welcome/greet) takes the prefix 'meN-' ('meny-') to form the active transitive verb 'menyambut' (to welcome/greet). The president (subject) welcomed the state guest's arrival (object)."
  },
  {
    id: 466,
    root: 'nyata',
    targetWord: 'menyatakan',
    sentence: 'Dia ___ perasaannya kepada orang yang dicintainya.',
    hint: 'to declare, to state',
    explanation: "The root 'nyata' (real/clear) takes prefix 'meN-' ('meny-') and suffix '-kan' to form the active transitive verb 'menyatakan' (to state/declare). He (subject) declared his feelings (object)."
  },
  {
    id: 467,
    root: 'sebab',
    targetWord: 'menyebabkan',
    sentence: 'Kurang tidur dapat ___ sulit berkonsentrasi.',
    hint: 'to cause',
    explanation: "The root 'sebab' (cause/reason) takes prefix 'meN-' ('meny-') and suffix '-kan' to form the active transitive verb 'menyebabkan' (to cause). Lack of sleep (subject) can cause difficulty concentrating (object)."
  },
  {
    id: 469,
    root: 'sebar',
    targetWord: 'menyebarkan',
    sentence: 'Angin ___ aroma bunga ke seluruh taman.',
    hint: 'to spread something, to disseminate something',
    explanation: "The root 'sebar' (spread) takes prefix 'meN-' ('meny-') and suffix '-kan' to form the active transitive verb 'menyebarkan' (to spread/disseminate). The wind (subject) spread the flower's aroma (object)."
  },
  {
    id: 470,
    root: 'sedia',
    targetWord: 'menyediakan',
    sentence: 'Restoran itu ___ berbagai macam masakan laut.',
    hint: 'to provide',
    explanation: "The root 'sedia' (ready/provide) takes prefix 'meN-' ('meny-') and suffix '-kan' to form the active transitive verb 'menyediakan' (to provide/prepare). The restaurant (subject) provides various seafood dishes (object)."
  },
  {
    id: 471,
    root: 'segel',
    targetWord: 'menyegel',
    sentence: 'Polisi ___ tempat kejadian perkara.',
    hint: 'to seal',
    explanation: "The root 'segel' (seal) takes the prefix 'meN-' ('meny-') to form the active transitive verb 'menyegel' (to seal). The police (subject) sealed the crime scene (object)."
  },
  {
    id: 472,
    root: 'selamat',
    targetWord: 'menyelamatkan',
    sentence: 'Penjaga pantai ___ perenang yang hampir tenggelam.',
    hint: 'to save, to rescue',
    explanation: "The root 'selamat' (safe/save) takes prefix 'meN-' ('meny-') and suffix '-kan' to form the active transitive verb 'menyelamatkan' (to save/rescue). The lifeguard (subject) saved the drowning swimmer (object)."
  },
  {
    id: 473,
    root: 'selenggara',
    targetWord: 'menyelenggarakan',
    sentence: 'Panitia ___ seminar nasional tentang pendidikan.',
    hint: 'to organize, to hold',
    explanation: "The root 'selenggara' (organize) takes prefix 'meN-' ('meny-') and suffix '-kan' to form the active transitive verb 'menyelenggarakan' (to organize/hold). The committee (subject) organized the national seminar (object)."
  },
  {
    id: 474,
    root: 'sepakat',
    targetWord: 'menyepakati',
    sentence: 'Kedua negara ___ perjanjian perdagangan baru.',
    hint: 'to agree on',
    explanation: "The root 'sepakat' (agree) takes prefix 'meN-' ('meny-') and suffix '-i' to form the active transitive verb 'menyepakati' (to agree on). The two countries (subject) agreed on a new trade agreement (object)."
  },
  {
    id: 475,
    root: 'serah',
    targetWord: 'menyerah',
    sentence: 'Prajurit itu menolak untuk ___ kepada musuh.',
    hint: 'to give up, to surrender',
    explanation: "The root 'serah' (hand over/surrender) takes the prefix 'meN-' ('meny-') to form the active intransitive verb 'menyerah' (to surrender/give up). The soldier refused to surrender."
  },
  {
    id: 477,
    root: 'serah',
    targetWord: 'menyerahkan',
    sentence: 'Dia ___ laporan tugasnya kepada dosen.',
    hint: 'to hand in/over, to give',
    explanation: "The root 'serah' (hand over) takes prefix 'meN-' ('meny-') and suffix '-kan' to form the active transitive verb 'menyerahkan' (to hand over/submit). He (subject) submitted his report (object) to the lecturer."
  },
  {
    id: 478,
    root: 'serap',
    targetWord: 'menyerap',
    sentence: 'Spons pandai ___ air.',
    hint: 'to absorb',
    explanation: "The root 'serap' (absorb) takes the prefix 'meN-' ('meny-') to form the active transitive verb 'menyerap' (to absorb). Sponges (subject) are good at absorbing water (object)."
  },
  {
    id: 479,
    root: 'suai',
    targetWord: 'menyesuaikan',
    sentence: 'Manusia harus ___ diri dengan lingkungannya.',
    hint: 'to adjust, to adapt',
    explanation: "The root 'suai' (match/fit) takes prefix 'meN-' ('meny-') and suffix '-kan' to form the active transitive verb 'menyesuaikan' (to adjust/adapt). Humans (subject) must adapt themselves (object) to their environment."
  },
  {
    id: 480,
    root: 'saksi',
    targetWord: 'menyaksikan',
    sentence: 'Kami ___ pertunjukan kembang api yang indah.',
    hint: 'to witness; to watch',
    explanation: "The root 'saksi' (witness) takes prefix 'meN-' ('meny-') and suffix '-kan' to form the active transitive verb 'menyaksikan' (to witness/watch). We (subject) watched the beautiful fireworks show (object)."
  },
  {
    id: 481,
    root: 'simpul',
    targetWord: 'menyimpulkan',
    sentence: 'Dari diskusi tadi, saya ___ bahwa kita perlu rencana baru.',
    hint: 'to conclude',
    explanation: "The root 'simpul' (knot/conclude) takes prefix 'meN-' ('meny-') and suffix '-kan' to form the active transitive verb 'menyimpulkan' (to conclude). From the discussion, I (subject) conclude that... (object clause)."
  },
  {
    id: 482,
    root: 'sumbang',
    targetWord: 'menyumbang',
    sentence: 'Banyak orang ___ untuk korban bencana alam.',
    hint: 'to donate, to contribute',
    explanation: "The root 'sumbang' (contribute/donate) takes the prefix 'meN-' ('meny-') to form the active verb 'menyumbang' (to donate/contribute). Many people donated for disaster victims."
  },
  {
    id: 483,
    root: 'racun',
    targetWord: 'meracuni',
    sentence: 'Limbah pabrik itu ___ ikan-ikan di sungai.',
    hint: 'to poison',
    explanation: "The root 'racun' (poison) takes prefix 'meN-' ('me-' + 'r' -> 'mer-') and suffix '-i' to form the active transitive verb 'meracuni' (to poison). The factory waste (subject) poisoned the fish (object)."
  },
  {
    id: 484,
    root: 'raya',
    targetWord: 'merayakan',
    sentence: 'Mereka ___ kelulusan dengan pesta kecil.',
    hint: 'to celebrate',
    explanation: "The root 'raya' (great/celebrate) takes prefix 'meN-' ('me-' + 'r' -> 'mer-') and suffix '-kan' to form the active transitive verb 'merayakan' (to celebrate). They (subject) celebrated graduation (object)."
  },
  {
    id: 485,
    root: 'rawat',
    targetWord: 'merawat',
    sentence: 'Dia ___ ibunya yang sakit dengan penuh kasih.',
    hint: 'to take care of; to treat',
    explanation: "The root 'rawat' (care for/treat) takes the prefix 'meN-' ('me-' + 'r' -> 'mer-') to form the active transitive verb 'merawat' (to take care of). He (subject) takes care of his sick mother (object)."
  },
  {
    id: 486,
    root: 'rencana',
    targetWord: 'merencanakan',
    sentence: 'Pasangan itu ___ pernikahan mereka tahun depan.',
    hint: 'to plan something',
    explanation: "The root 'rencana' (plan) takes prefix 'meN-' ('me-' + 'r' -> 'mer-') and suffix '-kan' to form the active transitive verb 'merencanakan' (to plan). The couple (subject) plans their wedding (object)."
  },
  {
    id: 487,
    root: 'rintis',
    targetWord: 'merintis',
    sentence: 'Dia ___ usaha kedai kopi kecil di garasi rumahnya.',
    hint: 'to pioneer, to open the way',
    explanation: "The root 'rintis' (pioneer) takes the prefix 'meN-' ('me-' + 'r' -> 'mer-') to form the active transitive verb 'merintis' (to pioneer/start). He (subject) pioneered a small coffee shop business (object)."
  },
  {
    id: 488,
    root: 'rusak',
    targetWord: 'merusak',
    sentence: 'Vandalisme ___ keindahan fasilitas umum.',
    hint: 'to damage, to ruin',
    explanation: "The root 'rusak' (damaged) takes the prefix 'meN-' ('me-' + 'r' -> 'mer-') to form the active transitive verb 'merusak' (to damage/ruin). Vandalism (subject) damages public facilities' beauty (object)."
  },
  {
    id: 489,
    root: 'wakil',
    targetWord: 'mewakili',
    sentence: 'Pengacara itu ___ kliennya di pengadilan.',
    hint: 'to represent',
    explanation: "The root 'wakil' (representative) takes prefix 'meN-' ('me-' + 'w' -> 'mew-') and suffix '-i' to form the active transitive verb 'mewakili' (to represent). The lawyer (subject) represents his client (object)."
  },
  {
    id: 490,
    root: 'wujud',
    targetWord: 'mewujudkan',
    sentence: 'Pemerintah berjanji ___ kesejahteraan rakyat.',
    hint: 'to actualize',
    explanation: "The root 'wujud' (form/manifestation) takes prefix 'meN-' ('me-' + 'w' -> 'mew-') and suffix '-kan' to form the active transitive verb 'mewujudkan' (to actualize/realize). The government promises to actualize public welfare (object)."
  },
  {
    id: 491,
    root: 'aku',
    targetWord: 'mengaku',
    sentence: 'Dia ___ telah melakukan kesalahan itu.',
    hint: 'to confess, to admit (intransitive verb)',
    explanation: "The root 'aku' (I/admit) takes the prefix 'meN-' ('meng-') to form the active verb 'mengaku' (to admit/confess). He admits having made the mistake."
  },
  {
    id: 492,
    root: 'aku',
    targetWord: 'mengakui',
    sentence: 'Dia ___ kesalahannya di depan semua orang.',
    hint: 'to admit something, to acknowledge something or someone',
    explanation: "The root 'aku' (I/admit) takes prefix 'meN-' ('meng-') and suffix '-i' to form the active transitive verb 'mengakui' (to admit/acknowledge). He (subject) admitted his mistake (object)."
  },
  {
    id: 493,
    root: 'akibat',
    targetWord: 'mengakibatkan',
    sentence: 'Banjir bandang ___ kerusakan parah.',
    hint: 'to result in',
    explanation: "The root 'akibat' (consequence) takes prefix 'meN-' ('meng-') and suffix '-kan' to form the active transitive verb 'mengakibatkan' (to result in/cause). The flash flood (subject) resulted in severe damage (object)."
  },
  {
    id: 494,
    root: 'abai',
    targetWord: 'mengabaikan',
    sentence: 'Pengemudi itu ___ rambu lalu lintas.',
    hint: 'to ignore, to neglect, to disregard',
    explanation: "The root 'abai' (neglect) takes prefix 'meN-' ('meng-') and suffix '-kan' to form the active transitive verb 'mengabaikan' (to ignore/neglect). The driver (subject) ignored the traffic signs (object)."
  },
  {
    id: 495,
    root: 'adil',
    targetWord: 'mengadili',
    sentence: 'Hakim ___ terdakwa dengan bijaksana.',
    hint: 'to judge',
    explanation: "The root 'adil' (just/judge) takes prefix 'meN-' ('meng-') and suffix '-i' to form the active transitive verb 'mengadili' (to judge/try). The judge (subject) judged the defendant (object) wisely."
  },
  {
    id: 496,
    root: 'ada',
    targetWord: 'mengadakan',
    sentence: 'Komunitas kami akan ___ bakti sosial minggu depan.',
    hint: 'to hold (e.g., an event, a meeting)',
    explanation: "The root 'ada' (exist/be) takes prefix 'meN-' ('meng-') and suffix '-kan' to form the active transitive verb 'mengadakan' (to hold/organize/bring into existence). Our community (subject) will hold a social service event (object)."
  },
  {
    id: 497,
    root: 'kait',
    targetWord: 'mengaitkan',
    sentence: 'Detektif itu ___ semua petunjuk yang ada.',
    hint: 'to link',
    explanation: "The root 'kait' (hook/link) takes prefix 'meN-' ('meng-') and suffix '-kan' to form the active transitive verb 'mengaitkan' (to link/connect). The detective (subject) linked all the existing clues (object)."
  },
  {
    id: 500,
    root: 'alam',
    targetWord: 'mengalami',
    sentence: 'Dia ___ kesulitan tidur belakangan ini.',
    hint: 'to experience',
    explanation: "The root 'alam' (nature/experience) takes prefix 'meN-' ('meng-') and suffix '-i' to form the active transitive verb 'mengalami' (to experience). He (subject) experiences difficulty sleeping (object)."
  },
  {
    id: 503,
    root: 'amat',
    targetWord: 'mengamati',
    sentence: 'Ilmuwan ___ perilaku bintang di langit malam.',
    hint: 'to observe',
    explanation: "The root 'amat' (observe) takes prefix 'meN-' ('meng-') and suffix '-i' to form the active transitive verb 'mengamati' (to observe). Scientists (subject) observe the behavior of stars (object)."
  },
  {
    id: 504,
    root: 'ancam',
    targetWord: 'mengancam',
    sentence: 'Perampok itu ___ kasir dengan senjata api.',
    hint: 'to threat',
    explanation: "The root 'ancam' (threaten) takes the prefix 'meN-' ('meng-') to form the active transitive verb 'mengancam' (to threaten). The robber (subject) threatened the cashier (object)."
  },
  {
    id: 505,
    root: 'anggap',
    targetWord: 'menganggap',
    sentence: 'Saya ___ dia sebagai teman baik saya.',
    hint: 'to assume, to presume; to consider/regard something as',
    explanation: "The root 'anggap' (assume/consider) takes the prefix 'meN-' ('meng-') to form the active transitive verb 'menganggap' (to consider/regard). I (subject) regard him (object) as my good friend."
  },
  {
    id: 506,
    root: 'anggur',
    targetWord: 'menganggur',
    sentence: 'Setelah lulus, dia ___ selama beberapa bulan.',
    hint: 'to be unemployed; to have nothing to do',
    explanation: "The root 'anggur' (grape/idle) takes the prefix 'meN-' ('meng-') to form the active intransitive verb 'menganggur' (to be unemployed/idle). After graduating, he (subject) was unemployed."
  },
  {
    id: 507,
    root: 'angkat',
    targetWord: 'mengangkat',
    sentence: 'Dia ___ kotak berat itu sendirian.',
    hint: 'to lift something up',
    explanation: "The root 'angkat' (lift) takes the prefix 'meN-' ('meng-') to form the active transitive verb 'mengangkat' (to lift). He (subject) lifted the heavy box (object) alone."
  },
  {
    id: 508,
    root: 'atasi',
    targetWord: 'mengatasi',
    sentence: 'Kita harus bekerja sama untuk ___ masalah ini.',
    hint: 'to overcome (eg a problem)',
    explanation: "The root 'atasi' (overcome) takes the prefix 'meN-' ('meng-') to form the active transitive verb 'mengatasi' (to overcome). We must cooperate to overcome this problem (object)."
  },
  {
    id: 509,
    root: 'atur',
    targetWord: 'mengatur',
    sentence: 'Sekretaris ___ jadwal rapat pimpinan.',
    hint: 'to arrange, to organise, to regulate',
    explanation: "The root 'atur' (arrange/regulate) takes the prefix 'meN-' ('meng-') to form the active transitive verb 'mengatur' (to arrange/organize). The secretary (subject) arranges the leadership meeting schedule (object)."
  },
  {
    id: 510,
    root: 'awal',
    targetWord: 'mengawali',
    sentence: 'Dia ___ presentasinya dengan sebuah kutipan inspiratif.',
    hint: 'to precede',
    explanation: "The root 'awal' (beginning) takes prefix 'meN-' ('meng-') and suffix '-i' to form the active transitive verb 'mengawali' (to begin/start/precede). He (subject) began his presentation (object) with a quote."
  },
  {
    id: 511,
    root: 'awas',
    targetWord: 'mengawasi',
    sentence: 'Ibu ___ anaknya bermain di taman.',
    hint: 'to keep an eye on; to invigilate',
    explanation: "The root 'awas' (watch out/supervise) takes prefix 'meN-' ('meng-') and suffix '-i' to form the active transitive verb 'mengawasi' (to supervise/watch over). Mother (subject) supervises her child (object) playing."
  },
  {
    id: 512,
    root: 'kandung',
    targetWord: 'mengandung',
    sentence: 'Cokelat hitam ___ antioksidan yang baik.',
    hint: 'to contain; pregnant',
    explanation: "The root 'kandung' (contain/conceive) takes the prefix 'meN-' ('meng-') to form the active transitive verb 'mengandung' (to contain). Dark chocolate (subject) contains good antioxidants (object)."
  },
  {
    id: 513,
    root: 'edar',
    targetWord: 'mengedarkan',
    sentence: 'Panitia ___ formulir pendaftaran kepada calon peserta.',
    hint: 'to circulate something',
    explanation: "The root 'edar' (circulate) takes prefix 'meN-' ('meng-') and suffix '-kan' to form the active transitive verb 'mengedarkan' (to circulate/distribute). The committee (subject) circulated registration forms (object)."
  },
  {
    id: 514,
    root: 'tahu',
    targetWord: 'mengetahui',
    sentence: 'Apakah Anda ___ siapa penulis buku ini?',
    hint: 'to know about',
    explanation: "The root 'tahu' (know) takes prefix 'meN-' ('menge-') and suffix '-i' to form the active transitive verb 'mengetahui' (to know about/find out). Do you (subject) know who the author is (object clause)?"
  },
  {
    id: 515,
    root: 'kelola',
    targetWord: 'mengelola',
    sentence: 'Manajer ___ sumber daya perusahaan dengan efisien.',
    hint: 'to manage',
    explanation: "The root 'kelola' (manage) takes the prefix 'meN-' ('meng-') to form the active transitive verb 'mengelola' (to manage). The manager (subject) manages company resources (object) efficiently."
  },
  {
    id: 516,
    root: 'kembang',
    targetWord: 'mengembangkan',
    sentence: 'Perusahaan itu ___ produk baru yang inovatif.',
    hint: 'to develop (something)',
    explanation: "The root 'kembang' (develop/flower) takes prefix 'meN-' ('meng-') and suffix '-kan' to form the active transitive verb 'mengembangkan' (to develop). The company (subject) develops innovative new products (object)."
  },
  {
    id: 517,
    root: 'kendali',
    targetWord: 'mengendalikan',
    sentence: 'Penting untuk bisa ___ emosi saat marah.',
    hint: 'to control; to control something',
    explanation: "The root 'kendali' (control) takes prefix 'meN-' ('meng-') and suffix '-kan' to form the active transitive verb 'mengendalikan' (to control). It's important to be able to control emotions (object) when angry."
  },
  {
    id: 518,
    root: 'kenal',
    targetWord: 'mengenal',
    sentence: 'Saya ___ dia sejak kami masih kecil.',
    hint: 'to know a person personally (transitive verb)',
    explanation: "The root 'kenal' (know/recognize) takes the prefix 'meN-' ('meng-') to form the active transitive verb 'mengenal' (to know personally). I (subject) have known him (object) since we were little."
  },
  {
    id: 519,
    root: 'kesan',
    targetWord: 'mengesankan',
    sentence: 'Pertunjukan tari itu sangat ___.' ,
    hint: 'impressive',
    explanation: "The root 'kesan' (impression) takes prefix 'meN-' ('meng-') and suffix '-kan' to form the active verb/adjective 'mengesankan' (to impress/impressive). The dance performance was very impressive."
  },
  {
    id: 520,
    root: 'geser',
    targetWord: 'menggeser',
    sentence: 'Tolong ___ kursi ini sedikit ke kanan.',
    hint: 'to shift something; to shift',
    explanation: "The root 'geser' (shift) takes the prefix 'meN-' ('meng-') to form the active transitive verb 'menggeser' (to shift/move something). Please shift this chair (object) a bit."
  },
  {
    id: 521,
    root: 'kemuka',
    targetWord: 'mengemukakan',
    sentence: 'Dia ___ pendapatnya dalam diskusi tersebut.',
    hint: 'to put forward, to express',
    explanation: "The root 'kemuka' (forward) takes prefix 'meN-' ('menge-') and suffix '-kan' to form the active transitive verb 'mengemukakan' (to put forward/express). He (subject) put forward his opinion (object)."
  },
  {
    id: 522,
    root: 'guna',
    targetWord: 'menggunakan',
    sentence: 'Dia ___ pensil untuk menggambar.',
    hint: 'to use',
    explanation: "The root 'guna' (use) takes prefix 'meN-' ('meng-') and suffix '-kan' to form the active transitive verb 'menggunakan' (to use). He (subject) uses a pencil (object) to draw."
  },
  {
    id: 524,
    root: 'hadap',
    targetWord: 'menghadapi',
    sentence: 'Tim kami siap ___ tantangan apapun.',
    hint: 'to face something, to encounter',
    explanation: "The root 'hadap' (face) takes prefix 'meN-' ('meng-' + 'h' -> 'mengh-') and suffix '-i' to form the active transitive verb 'menghadapi' (to face/encounter). Our team (subject) is ready to face any challenge (object)."
  },
  {
    id: 525,
    root: 'habis',
    targetWord: 'menghabiskan',
    sentence: 'Dia ___ seluruh uangnya untuk berjudi.',
    hint: 'to spend (until all is used up)',
    explanation: "The root 'habis' (finished) takes prefix 'meN-' ('mengh-') and suffix '-kan' to form the active transitive verb 'menghabiskan' (to spend completely/finish off). He (subject) spent all his money (object) gambling."
  },
  {
    id: 526,
    root: 'halang',
    targetWord: 'menghalangi',
    sentence: 'Pohon tumbang ___ jalan masuk ke desa.',
    hint: 'to hinder',
    explanation: "The root 'halang' (obstruct) takes prefix 'meN-' ('mengh-') and suffix '-i' to form the active transitive verb 'menghalangi' (to obstruct/hinder). The fallen tree (subject) blocked the entrance road (object)."
  },
  {
    id: 527,
    root: 'harap',
    targetWord: 'mengharapkan',
    sentence: 'Guru ___ siswanya belajar dengan rajin.',
    hint: 'to expect; to hope for',
    explanation: "The root 'harap' (hope) takes prefix 'meN-' ('mengh-') and suffix '-kan' to form the active transitive verb 'mengharapkan' (to hope for/expect). The teacher (subject) expects his students (object) to study diligently."
  },
  {
    id: 528,
    root: 'harga',
    targetWord: 'menghargai',
    sentence: 'Kita harus ___ waktu yang kita miliki.',
    hint: 'to appreciate, to value; to give a price to',
    explanation: "The root 'harga' (price/value) takes prefix 'meN-' ('mengh-') and suffix '-i' to form the active transitive verb 'menghargai' (to value/appreciate). We (subject) must value the time (object) we have."
  },
  {
    id: 529,
    root: 'hasil',
    targetWord: 'menghasilkan',
    sentence: 'Pabrik itu ___ tekstil berkualitas ekspor.',
    hint: 'to produce',
    explanation: "The root 'hasil' (result/produce) takes prefix 'meN-' ('mengh-') and suffix '-kan' to form the active transitive verb 'menghasilkan' (to produce). The factory (subject) produces export-quality textiles (object)."
  },
  {
    id: 531,
    root: 'hilang',
    targetWord: 'menghilangkan',
    sentence: 'Olahraga dapat ___ stres.',
    hint: 'to remove; to lose an item',
    explanation: "The root 'hilang' (lost/disappear) takes prefix 'meN-' ('mengh-') and suffix '-kan' to form the active transitive causative verb 'menghilangkan' (to make disappear/remove). Exercise (subject) can remove stress (object)."
  },
  {
    id: 532,
    root: 'himbau',
    targetWord: 'menghimbau',
    sentence: 'Pemerintah ___ warganya untuk memakai masker.',
    hint: 'to advise, to invite / encourage (i.e.: from a higher authority such as the government)',
    explanation: "The root 'himbau' (appeal/urge) takes the prefix 'meN-' ('mengh-') to form the active transitive verb 'menghimbau' (to urge/advise). The government (subject) urges its citizens (object) to wear masks."
  },
  {
    id: 534,
    root: 'hindar',
    targetWord: 'menghindari',
    sentence: 'Dia mencoba ___ kontak mata denganku.',
    hint: 'to avoid, to evade',
    explanation: "The root 'hindar' (avoid) takes prefix 'meN-' ('mengh-') and suffix '-i' to form the active transitive verb 'menghindari' (to avoid). He (subject) tried to avoid eye contact (object) with me."
  },
  {
    id: 535,
    root: 'hindar',
    targetWord: 'menghindarkan',
    sentence: 'Penggunaan helm ___ pengendara dari cedera kepala.',
    hint: 'to avoid, to prevent',
    explanation: "The root 'hindar' (avoid) takes prefix 'meN-' ('mengh-') and suffix '-kan' to form the active transitive verb 'menghindarkan' (to help avoid/prevent from happening to someone). Using a helmet (subject) prevents riders (object) from head injuries."
  },
  {
    id: 536,
    root: 'hubung',
    targetWord: 'menghubungi',
    sentence: 'Saya akan ___ Anda kembali besok.',
    hint: 'to contact',
    explanation: "The root 'hubung' (connect) takes prefix 'meN-' ('mengh-') and suffix '-i' to form the active transitive verb 'menghubungi' (to contact). I (subject) will contact you (object) again tomorrow."
  },
  {
    id: 537,
    root: 'hubung',
    targetWord: 'menghubungkan',
    sentence: 'Kabel ini ___ komputer dengan printer.',
    hint: 'to connect',
    explanation: "The root 'hubung' (connect) takes prefix 'meN-' ('mengh-') and suffix '-kan' to form the active transitive verb 'menghubungkan' (to connect). This cable (subject) connects the computer (object) with the printer."
  },
  {
    id: 538,
    root: 'hadir',
    targetWord: 'menghadiri',
    sentence: 'Banyak tamu ___ pesta pernikahannya.',
    hint: 'to attend',
    explanation: "The root 'hadir' (present/attend) takes prefix 'meN-' ('mengh-') and suffix '-i' to form the active transitive verb 'menghadiri' (to attend). Many guests (subject) attended his wedding party (object)."
  },
  {
    id: 539,
    root: 'khawatir',
    targetWord: 'mengkhawatirkan',
    sentence: 'Kondisi kesehatannya cukup ___.' ,
    hint: 'to worry about',
    explanation: "The root 'khawatir' (worried) takes prefix 'meN-' ('meng-') and suffix '-kan' to form the active verb 'mengkhawatirkan' (to cause worry / worrying). His health condition (subject) is quite worrying (acting as adjective)."
  },
  {
    id: 540,
    root: 'isi',
    targetWord: 'mengisi',
    sentence: 'Dia ___ waktu luangnya dengan membaca.',
    hint: 'to fill',
    explanation: "The root 'isi' (content/fill) takes prefix 'meN-' ('meng-') and suffix '-i' to form the active transitive verb 'mengisi' (to fill). He (subject) fills his spare time (object) with reading."
  },
  {
    id: 541,
    root: 'impi',
    targetWord: 'mengimpikan',
    sentence: 'Dia ___ memiliki rumah di tepi pantai.',
    hint: 'to dream of, to dream about',
    explanation: "The root 'impi' (dream) takes prefix 'meN-' ('meng-') and suffix '-kan' to form the active transitive verb 'mengimpikan' (to dream of). He (subject) dreams of having a house (object clause)."
  },
  {
    id: 542,
    root: 'obat',
    targetWord: 'mengobati',
    sentence: 'Perawat ___ luka pasien dengan hati-hati.',
    hint: 'to treat with medicine',
    explanation: "The root 'obat' (medicine) takes prefix 'meN-' ('meng-') and suffix '-i' to form the active transitive verb 'mengobati' (to treat with medicine). The nurse (subject) treats the patient's wound (object) carefully."
  },
  {
    id: 543,
    root: 'korban',
    targetWord: 'mengorbankan',
    sentence: 'Dia ___ kepentingannya sendiri demi tim.',
    hint: 'to sacrifice something',
    explanation: "The root 'korban' (victim/sacrifice) takes prefix 'meN-' ('meng-') and suffix '-kan' to form the active transitive verb 'mengorbankan' (to sacrifice). He (subject) sacrificed his own interests (object) for the team."
  },
  {
    id: 544,
    root: 'kuasa',
    targetWord: 'menguasai',
    sentence: 'Dia perlu ___ materi ini sebelum ujian.',
    hint: 'to master a skill; to dominate, to rule over',
    explanation: "The root 'kuasa' (power/authority) takes prefix 'meN-' ('meng-') and suffix '-i' to form the active transitive verb 'menguasai' (to master/dominate). He needs to master this material (object) before the exam."
  },
  {
    id: 545,
    root: 'kurang',
    targetWord: 'mengurangi',
    sentence: 'Diet ___ asupan kalori harian.',
    hint: 'to reduce, to decrease',
    explanation: "The root 'kurang' (less) takes prefix 'meN-' ('meng-') and suffix '-i' to form the active transitive verb 'mengurangi' (to reduce/decrease). The diet (subject) reduces daily calorie intake (object)."
  },
  {
    id: 546,
    root: 'ukur',
    targetWord: 'mengukur',
    sentence: 'Penjahit ___ lingkar pinggang pelanggan.',
    hint: 'to measure',
    explanation: "The root 'ukur' (measure) takes the prefix 'meN-' ('meng-') to form the active transitive verb 'mengukur' (to measure). The tailor (subject) measures the customer's waist circumference (object)."
  },
  {
    id: 547,
    root: 'kumpul',
    targetWord: 'mengumpulkan',
    sentence: 'Murid-murid ___ daun kering untuk kerajinan tangan.',
    hint: 'to collect things, to gather things; to submit (i.e.: homework)',
    explanation: "The root 'kumpul' (gather) takes prefix 'meN-' ('meng-') and suffix '-kan' to form the active transitive verb 'mengumpulkan' (to collect/gather). The students (subject) collected dry leaves (object)."
  },
  {
    id: 548,
    root: 'umum',
    targetWord: 'mengumumkan',
    sentence: 'Sekolah ___ jadwal ujian akhir.',
    hint: 'to announce, to make public',
    explanation: "The root 'umum' (public/general) takes prefix 'meN-' ('meng-') and suffix '-kan' to form the active transitive verb 'mengumumkan' (to announce). The school (subject) announced the final exam schedule (object)."
  },
  {
    id: 549,
    root: 'unggul',
    targetWord: 'mengungguli',
    sentence: 'Pesaing baru itu berhasil ___ produk lama.',
    hint: 'to outperform',
    explanation: "The root 'unggul' (superior) takes prefix 'meN-' ('meng-') and suffix '-i' to form the active transitive verb 'mengungguli' (to outperform/surpass). The new competitor (subject) managed to outperform the old product (object)."
  },
  {
    id: 551,
    root: 'untung',
    targetWord: 'menguntungkan',
    sentence: 'Bisnis online bisa sangat ___ jika dikelola baik.',
    hint: 'to benefit something or someone; profitable',
    explanation: "The root 'untung' (profit/luck) takes prefix 'meN-' ('meng-') and suffix '-kan' to form the active verb/adjective 'menguntungkan' (to benefit/profitable). Online business can be very profitable (acting as adjective)."
  },
  {
    id: 552,
    root: 'upaya',
    targetWord: 'mengupayakan',
    sentence: 'Pemerintah ___ pemerataan pembangunan.',
    hint: 'to make an effort to make something happen, to strive for',
    explanation: "The root 'upaya' (effort) takes prefix 'meN-' ('meng-') and suffix '-kan' to form the active transitive verb 'mengupayakan' (to strive for/work towards). The government (subject) strives for equitable development (object)."
  },
  {
    id: 553,
    root: 'usaha',
    targetWord: 'mengusahakan',
    sentence: 'Dia ___ agar proyek itu berjalan lancar.',
    hint: 'to try to make something work',
    explanation: "The root 'usaha' (effort/business) takes prefix 'meN-' ('meng-') and suffix '-kan' to form the active transitive verb 'mengusahakan' (to work on/endeavor). He (subject) endeavors to ensure the project runs smoothly (object clause)."
  },
  {
    id: 554,
    root: 'utama',
    targetWord: 'mengutamakan',
    sentence: 'Perusahaan ini ___ kepuasan pelanggan.',
    hint: 'to prioritize',
    explanation: "The root 'utama' (main/primary) takes prefix 'meN-' ('meng-') and suffix '-kan' to form the active transitive verb 'mengutamakan' (to prioritize). This company (subject) prioritizes customer satisfaction (object)."
  },
  {
    id: 557,
    root: 'muat',
    targetWord: 'muatan',
    sentence: '___ truk itu terlalu berat.',
    hint: 'cargo, load, content',
    explanation: "The root 'muat' (load/contain) takes the suffix '-an' to form the noun 'muatan' (load/cargo). The truck's load (subject) is too heavy."
  },
  {
    id: 562,
    root: 'paksa',
    targetWord: 'paksaan',
    sentence: 'Tidak boleh ada ___ dalam memilih keyakinan.',
    hint: 'compulsion, necessity',
    explanation: "The root 'paksa' (force) takes the suffix '-an' to form the noun 'paksaan' (compulsion/coercion). There should be no compulsion in choosing beliefs."
  },
  {
    id: 564,
    root: 'pamer',
    targetWord: 'pameran',
    sentence: 'Ada ___ lukisan di galeri seni kota.',
    hint: 'exhibition',
    explanation: "The root 'pamer' (show off/exhibit) uses the suffix '-an' to form the noun 'pameran' (exhibition). There is a painting exhibition at the city art gallery."
  },
  {
    id: 565,
    root: 'pandang',
    targetWord: 'pandangan',
    sentence: 'Dia memiliki ___ yang berbeda tentang isu tersebut.',
    hint: 'view',
    explanation: "The root 'pandang' (view/look) takes the suffix '-an' to form the noun 'pandangan' (view/opinion). He has a different view on the issue."
  },
  {
    id: 566,
    root: 'pasang',
    targetWord: 'pasangan',
    sentence: '___ pengantin itu terlihat sangat bahagia.',
    hint: 'couple, pair; partner',
    explanation: "The root 'pasang' (pair/install) uses the suffix '-an' to form the noun 'pasangan' (pair/couple). The bridal couple looked very happy."
  },
  {
    id: 568,
    root: 'candu',
    targetWord: 'pecandu',
    sentence: 'Pusat rehabilitasi membantu para ___ narkoba.',
    hint: 'addict',
    explanation: "The root 'candu' (opium/addiction) takes the prefix 'peN-' (becoming 'pe-') to form the noun 'pecandu' (addict). Rehab centers help drug addicts."
  },
  {
    id: 569,
    root: 'dagang',
    targetWord: 'pedagang',
    sentence: '___ itu menjajakan buah-buahan segar.',
    hint: 'trader, merchant',
    explanation: "The root 'dagang' (trade) takes the prefix 'peN-' (becoming 'pe-') to form the noun 'pedagang' (trader/merchant), indicating the person who trades."
  },
  {
    id: 570,
    root: 'langgan',
    targetWord: 'pelanggan',
    sentence: 'Kafe itu ramai oleh ___ setiap pagi.',
    hint: 'subscriber', // Context: customer
    explanation: "The root 'langgan' (subscribe) takes the prefix 'peN-' (becoming 'pe-') and suffix '-an' to form the noun 'pelanggan' (customer/subscriber), indicating the person who subscribes or frequents."
  },
  {
    id: 571,
    root: 'larang',
    targetWord: 'pelarangan',
    sentence: '___ merokok di tempat umum didukung masyarakat.',
    hint: 'the act/process of prohibiting',
    explanation: "The root 'larang' (forbid) takes the prefix 'peN-' ('pe-') and suffix '-an' to form the noun 'pelarangan' (prohibition), referring to the act of forbidding."
  },
  {
    id: 572,
    root: 'latih',
    targetWord: 'pelatih',
    sentence: '___ renang itu memberikan instruksi kepada muridnya.',
    hint: 'trainer',
    explanation: "The root 'latih' (train) takes the prefix 'peN-' ('pe-') to form the noun 'pelatih' (trainer/coach), indicating the person who trains."
  },
  {
    id: 573,
    root: 'latih',
    targetWord: 'pelatihan',
    sentence: '___ keterampilan komputer diadakan gratis.',
    hint: 'the act/process of training/coaching',
    explanation: "The root 'latih' (train) takes the prefix 'peN-' ('pe-') and suffix '-an' to form the noun 'pelatihan' (training session/process), referring to the event or act of training."
  },
  {
    id: 575,
    root: 'lengkap',
    targetWord: 'pelengkap',
    sentence: 'Bawang goreng menjadi ___ soto ayam.',
    hint: 'something/someone who completes, complement',
    explanation: "The root 'lengkap' (complete) takes the prefix 'peN-' ('pe-') to form the noun 'pelengkap' (complement/something that completes). Fried onions are a complement to chicken soto."
  },
  {
    id: 576,
    root: 'paksa',
    targetWord: 'pemaksaan',
    sentence: 'Tindakan ___ kehendak tidak dibenarkan.',
    hint: 'coercion',
    explanation: "The root 'paksa' (force) takes prefix 'peN-' ('pem-') and suffix '-an' to form the noun 'pemaksaan' (coercion/the act of forcing). Coercion is not justified."
  },
  {
    id: 577,
    root: 'pandang',
    targetWord: 'pemandangan',
    sentence: '___ sawah terasering di desa itu sangat indah.',
    hint: 'view, scenery',
    explanation: "The root 'pandang' (view) takes prefix 'peN-' ('pem-') and suffix '-an' to form the noun 'pemandangan' (scenery/view). The rice terrace scenery is beautiful."
  },
  {
    id: 578,
    root: 'manfaat',
    targetWord: 'pemanfaatan',
    sentence: '___ teknologi digital harus bijaksana.',
    hint: 'the act/process of utilizing, utilization',
    explanation: "The root 'manfaat' (benefit) takes prefix 'peN-' ('pem-') and suffix '-an' to form the noun 'pemanfaatan' (utilization), referring to the act of using."
  },
  {
    id: 580,
    root: 'balas',
    targetWord: 'pembalasan',
    sentence: 'Lingkaran ___ dendam tidak akan ada habisnya.',
    hint: 'the act/process of retaliating, retaliation',
    explanation: "The root 'balas' (reply/retaliate) takes prefix 'peN-' ('pem-') and suffix '-an' to form the noun 'pembalasan' (retaliation/revenge). The cycle of revenge is endless."
  },
  {
    id: 581,
    root: 'bakar',
    targetWord: 'pembakaran',
    sentence: 'Proses ___ sampah menghasilkan energi listrik.',
    hint: 'the act/process of burning', // Context: combustion
    explanation: "The root 'bakar' (burn) takes prefix 'peN-' ('pem-') and suffix '-an' to form the noun 'pembakaran' (burning/combustion). The waste burning process generates electricity."
  },
  {
    id: 582,
    root: 'baca',
    targetWord: 'pembaca',
    sentence: 'Surat ___ sering berisi keluhan atau saran.',
    hint: 'reader',
    explanation: "The root 'baca' (read) takes the prefix 'peN-' ('pem-') to form the noun 'pembaca' (reader), the person who reads."
  },
  {
    id: 583,
    root: 'baca',
    targetWord: 'pembacaan',
    sentence: '___ puisi itu sangat mengharukan.',
    hint: 'reading',
    explanation: "The root 'baca' (read) takes prefix 'peN-' ('pem-') and suffix '-an' to form the noun 'pembacaan' (the act of reading aloud). The poetry reading was touching."
  },
  {
    id: 585,
    root: 'bangun',
    targetWord: 'pembangunan',
    sentence: '___ jembatan itu memakan waktu dua tahun.',
    hint: 'development; construction',
    explanation: "The root 'bangun' (build) takes prefix 'peN-' ('pem-') and suffix '-an' to form the noun 'pembangunan' (construction/development). The bridge construction took two years."
  },
  {
    id: 586,
    root: 'buang',
    targetWord: 'pembuangan',
    sentence: 'Lokasi ___ limbah pabrik harus jauh dari pemukiman.',
    hint: 'disposal, removal',
    explanation: "The root 'buang' (throw away) takes prefix 'peN-' ('pem-') and suffix '-an' to form the noun 'pembuangan' (disposal/place of disposal). The waste disposal site must be far from settlements."
  },
  {
    id: 587,
    root: 'buat',
    targetWord: 'pembuat',
    sentence: '___ kopi itu sangat ahli meracik minuman.',
    hint: 'maker',
    explanation: "The root 'buat' (make) takes the prefix 'peN-' ('pem-') to form the noun 'pembuat' (maker), the person who makes something."
  },
  {
    id: 588,
    root: 'buat',
    targetWord: 'pembuatan',
    sentence: '___ film animasi membutuhkan waktu lama.',
    hint: 'the making of',
    explanation: "The root 'buat' (make) takes prefix 'peN-' ('pem-') and suffix '-an' to form the noun 'pembuatan' (the making of/production). Making an animated film takes time."
  },
  {
    id: 590,
    root: 'batas',
    targetWord: 'pembatasan',
    sentence: '___ kecepatan di area ini adalah 40 km/jam.',
    hint: 'the act/process of limiting or restricting',
    explanation: "The root 'batas' (limit) takes prefix 'peN-' ('pem-') and suffix '-an' to form the noun 'pembatasan' (restriction/limitation), referring to the act of limiting."
  },
  {
    id: 591,
    root: 'bentuk',
    targetWord: 'pembentukan',
    sentence: 'Proses ___ awan terjadi di atmosfer.',
    hint: 'the act/process of forming',
    explanation: "The root 'bentuk' (form) takes prefix 'peN-' ('pem-') and suffix '-an' to form the noun 'pembentukan' (formation). The process of cloud formation occurs in the atmosphere."
  },
  {
    id: 593,
    root: 'laku',
    targetWord: 'pemberlakuan',
    sentence: '___ aturan baru itu menuai pro dan kontra.',
    hint: 'the implementation, the imposition',
    explanation: "The root 'laku' (apply/valid), combined with 'ber-' implicitly ('memberlakukan'), takes 'peN-...-an' ('pem-') to form 'pemberlakuan' (implementation/enforcement). The implementation of the new rule drew pros and cons."
  },
  {
    id: 594,
    root: 'bukti',
    targetWord: 'pembuktian',
    sentence: 'Tahap ___ dalam sidang itu sangat penting.',
    hint: 'the act/process of proving, corroboration',
    explanation: "The root 'bukti' (proof) takes prefix 'peN-' ('pem-') and suffix '-an' to form the noun 'pembuktian' (the act of proving/verification). The proof stage in the trial is crucial."
  },
  {
    id: 595,
    root: 'menang',
    targetWord: 'pemenang',
    sentence: '___ lomba akan mendapatkan hadiah menarik.',
    hint: 'winner',
    explanation: "The root 'menang' (win) takes the prefix 'peN-' ('pe-') to form the noun 'pemenang' (winner), the one who wins."
  },
  {
    id: 596,
    root: 'milik',
    targetWord: 'pemilik',
    sentence: '___ toko itu sedang pergi ke luar kota.',
    hint: 'owner',
    explanation: "The root 'milik' (own/belonging) takes the prefix 'peN-' ('pem-') to form the noun 'pemilik' (owner), the person who owns."
  },
  {
    id: 597,
    root: 'picu',
    targetWord: 'pemicu',
    sentence: 'Alergi bisa menjadi ___ serangan asma.',
    hint: 'the trigger',
    explanation: "The root 'picu' (trigger) takes the prefix 'peN-' ('pem-') to form the noun 'pemicu' (trigger), the thing that triggers."
  },
  {
    id: 599,
    root: 'pisah',
    targetWord: 'pemisahan',
    sentence: '___ sampah organik dan anorganik memudahkan daur ulang.',
    hint: 'the act/process of separating two or more things, separation of two or more things',
    explanation: "The root 'pisah' (separate) takes prefix 'peN-' ('pem-') and suffix '-an' to form the noun 'pemisahan' (separation), the act of separating."
  },
  {
    id: 600,
    root: 'tanam',
    targetWord: 'penanaman',
    sentence: '___ modal asing meningkat tahun ini.',
    hint: 'the planting/investing of',
    explanation: "The root 'tanam' (plant) takes prefix 'peN-' ('pen-') and suffix '-an' to form the noun 'penanaman' (planting/investment). Foreign capital investment increased."
  },
  {
    id: 601,
    root: 'tangan',
    targetWord: 'penanganan',
    sentence: '___ pasien gawat darurat harus cepat dan tepat.',
    hint: 'the handling',
    explanation: "The root 'tangan' (hand) takes prefix 'peN-' ('pen-') and suffix '-an' to form the noun 'penanganan' (handling/management). The handling of emergency patients must be fast."
  },
  {
    id: 604,
    root: 'cegah',
    targetWord: 'pencegahan',
    sentence: '___ penyakit lebih baik daripada mengobati.',
    hint: 'the act/process of preventing, prevention',
    explanation: "The root 'cegah' (prevent) takes prefix 'peN-' ('pen-' + 'c' -> 'penc-') and suffix '-an' to form the noun 'pencegahan' (prevention). Disease prevention is better than cure."
  },
  {
    id: 605,
    root: 'capai',
    targetWord: 'pencapaian',
    sentence: '___ target penjualan disambut gembira oleh tim.',
    hint: 'achievement',
    explanation: "The root 'capai' (reach/achieve) takes prefix 'peN-' ('pen-' + 'c' -> 'penc-') and suffix '-an' to form the noun 'pencapaian' (achievement). The achievement of the sales target was welcomed."
  },
  {
    id: 606,
    root: 'cipta',
    targetWord: 'pencipta',
    sentence: 'Siapakah ___ lagu "Indonesia Raya"?',
    hint: 'creator',
    explanation: "The root 'cipta' (create) takes the prefix 'peN-' ('pen-' + 'c' -> 'penc-') to form the noun 'pencipta' (creator), the person who creates."
  },
  {
    id: 608,
    root: 'daftar',
    targetWord: 'pendaftaran',
    sentence: '___ ulang mahasiswa lama dibuka minggu depan.',
    hint: 'the act/process of registering/listing, registration',
    explanation: "The root 'daftar' (list/register) takes prefix 'peN-' ('pen-' + 'd' -> 'pend-') and suffix '-an' to form the noun 'pendaftaran' (registration). Re-registration opens next week."
  },
  {
    id: 609,
    root: 'dapat',
    targetWord: 'pendapatan',
    sentence: 'Sumber ___ utamanya berasal dari usaha katering.',
    hint: 'income',
    explanation: "The root 'dapat' (get/obtain) takes prefix 'peN-' ('pen-' + 'd' -> 'pend-') and suffix '-an' to form the noun 'pendapatan' (income/revenue). His main income source is catering."
  },
  {
    id: 610,
    root: 'dapat',
    targetWord: 'pendapat',
    sentence: 'Setiap orang berhak menyampaikan ___.' ,
    hint: 'opinion',
    explanation: "The root 'dapat' (get/obtain, but can imply 'find' or 'view') takes the prefix 'peN-' ('pen-' + 'd' -> 'pend-') to form the noun 'pendapat' (opinion/view)."
  },
  {
    id: 611,
    root: 'dekat',
    targetWord: 'pendekatan',
    sentence: '___ personal seringkali lebih efektif dalam negosiasi.',
    hint: 'approach',
    explanation: "The root 'dekat' (near) takes prefix 'peN-' ('pen-' + 'd' -> 'pend-') and suffix '-an' to form the noun 'pendekatan' (approach/method). A personal approach is often effective."
  },
  {
    id: 612,
    root: 'derita',
    targetWord: 'penderita',
    sentence: 'Jumlah ___ penyakit TBC masih cukup tinggi.',
    hint: 'sufferer, patient',
    explanation: "The root 'derita' (suffer) takes the prefix 'peN-' ('pen-' + 'd' -> 'pend-') to form the noun 'penderita' (sufferer/patient), the person who suffers."
  },
  {
    id: 613,
    root: 'derita',
    targetWord: 'penderitaan',
    sentence: 'Banyak ___ yang dialami korban perang.',
    hint: 'suffering, misery',
    explanation: "The root 'derita' (suffer) takes prefix 'peN-' ('pen-' + 'd' -> 'pend-') and suffix '-an' to form the noun 'penderitaan' (suffering/misery). Much suffering was experienced by war victims."
  },
  {
    id: 614,
    root: 'duduk',
    targetWord: 'penduduk',
    sentence: 'Jumlah ___ di kota ini terus bertambah.',
    hint: 'population, resident, inhabitant',
    explanation: "The root 'duduk' (sit, but can imply 'reside') takes the prefix 'peN-' ('pen-' + 'd' -> 'pend-') to form the noun 'penduduk' (resident/inhabitant/population)."
  },
  {
    id: 617,
    root: 'tekan',
    targetWord: 'penekanan',
    sentence: 'Dalam pidatonya, ia memberi ___ pada isu lingkungan.',
    hint: 'emphasis',
    explanation: "The root 'tekan' (press) takes prefix 'peN-' ('pen-') and suffix '-an' to form the noun 'penekanan' (emphasis/stress). He gave emphasis to environmental issues."
  },
  {
    id: 618,
    root: 'teliti',
    targetWord: 'peneliti',
    sentence: '___ itu menghabiskan waktu berbulan-bulan di laboratorium.',
    hint: 'researcher',
    explanation: "The root 'teliti' (careful/research) takes the prefix 'peN-' ('pen-') to form the noun 'peneliti' (researcher), the person who researches."
  },
  {
    id: 619,
    root: 'teliti',
    targetWord: 'penelitian',
    sentence: '___ ini didanai oleh lembaga riset nasional.',
    hint: 'research',
    explanation: "The root 'teliti' (careful/research) takes prefix 'peN-' ('pen-') and suffix '-an' to form the noun 'penelitian' (research). This research is funded by a national institution."
  },
  {
    id: 620,
    root: 'tempat',
    targetWord: 'penempatan',
    sentence: '___ karyawan baru disesuaikan dengan kebutuhan divisi.',
    hint: 'placement',
    explanation: "The root 'tempat' (place) takes prefix 'peN-' ('pen-') and suffix '-an' to form the noun 'penempatan' (placement). New employee placement is adjusted."
  },
  {
    id: 621,
    root: 'temu',
    targetWord: 'penemu',
    sentence: 'Alexander Graham Bell adalah ___ telepon.',
    hint: 'inventor',
    explanation: "The root 'temu' (meet/find) takes the prefix 'peN-' ('pen-') to form the noun 'penemu' (discoverer/inventor), the person who finds or invents."
  },
  {
    id: 622,
    root: 'temu',
    targetWord: 'penemuan',
    sentence: 'Roda adalah salah satu ___ terpenting dalam sejarah manusia.',
    hint: 'invention',
    explanation: "The root 'temu' (meet/find) takes prefix 'peN-' ('pen-') and suffix '-an' to form the noun 'penemuan' (discovery/invention). The wheel is one of the most important inventions."
  },
  {
    id: 623,
    root: 'terap',
    targetWord: 'penerapan',
    sentence: '___ teknologi baru diharapkan meningkatkan efisiensi.',
    hint: 'application, implementation',
    explanation: "The root 'terap' (apply) takes prefix 'peN-' ('pen-') and suffix '-an' to form the noun 'penerapan' (application/implementation). The application of new technology is expected to increase efficiency."
  },
  {
    id: 624,
    root: 'aku',
    targetWord: 'pengakuan',
    sentence: 'Terdakwa memberikan ___ di depan hakim.',
    hint: 'confession; recognition',
    explanation: "The root 'aku' (I/admit) takes prefix 'peN-' ('peng-') and suffix '-an' to form the noun 'pengakuan' (confession/acknowledgment). The defendant gave a confession."
  },
  {
    id: 625,
    root: 'adil',
    targetWord: 'pengadilan',
    sentence: 'Kasus sengketa tanah itu dibawa ke ___.' ,
    hint: 'court, trial',
    explanation: "The root 'adil' (just/judge) takes prefix 'peN-' ('peng-') and suffix '-an' to form the noun 'pengadilan' (court/trial - place of judging). The land dispute case was brought to court."
  },
  {
    id: 627,
    root: 'alam',
    targetWord: 'pengalaman',
    sentence: '___ kerja minimal 2 tahun dibutuhkan untuk posisi ini.',
    hint: 'experience',
    explanation: "The root 'alam' (nature/experience) takes prefix 'peN-' ('peng-') and suffix '-an' to form the noun 'pengalaman' (experience). Minimum 2 years of work experience is required."
  },
  {
    id: 628,
    root: 'amat',
    targetWord: 'pengamat',
    sentence: '___ burung mencatat jenis-jenis burung di taman nasional.',
    hint: 'observer',
    explanation: "The root 'amat' (observe) takes the prefix 'peN-' ('peng-') to form the noun 'pengamat' (observer), the person who observes."
  },
  {
    id: 629,
    root: 'amat',
    targetWord: 'pengamatan',
    sentence: '___ bintang memerlukan teleskop yang baik.',
    hint: 'the act/process of observing, observation',
    explanation: "The root 'amat' (observe) takes prefix 'peN-' ('peng-') and suffix '-an' to form the noun 'pengamatan' (observation), the act of observing."
  },
  {
    id: 630,
    root: 'atur',
    targetWord: 'pengaturan',
    sentence: '___ lalu lintas dilakukan untuk mengurangi kemacetan.',
    hint: 'the arrangement, the settings',
    explanation: "The root 'atur' (arrange/regulate) takes prefix 'peN-' ('peng-') and suffix '-an' to form the noun 'pengaturan' (arrangement/regulation/setting). Traffic regulation is done to reduce congestion."
  },
  {
    id: 632,
    root: 'awas',
    targetWord: 'pengawasan',
    sentence: '___ orang tua penting bagi perkembangan anak.',
    hint: 'supervision, overseeing, monitoring',
    explanation: "The root 'awas' (watch out/supervise) takes prefix 'peN-' ('peng-') and suffix '-an' to form the noun 'pengawasan' (supervision/monitoring). Parental supervision is important."
  },
  {
    id: 633,
    root: 'anggur',
    targetWord: 'pengangguran',
    sentence: 'Angka ___ menurun setelah pemerintah membuka lapangan kerja baru.',
    hint: 'unemployment',
    explanation: "The root 'anggur' (idle/unemployed) takes prefix 'peN-' ('peng-') and suffix '-an' to form the noun 'pengangguran' (unemployment). The unemployment rate decreased."
  },
  {
    id: 634,
    root: 'edar',
    targetWord: 'pengedar',
    sentence: 'Polisi berhasil menangkap ___ obat terlarang.',
    hint: 'dealer, distributor',
    explanation: "The root 'edar' (circulate) takes the prefix 'peN-' ('peng-') to form the noun 'pengedar' (dealer/distributor), the person who circulates or deals."
  },
  {
    id: 636,
    root: 'kendali',
    targetWord: 'pengendalian',
    sentence: '___ emosi sangat penting dalam situasi konflik.',
    hint: 'control; control, management',
    explanation: "The root 'kendali' (control) takes prefix 'peN-' ('peng-') and suffix '-an' to form the noun 'pengendalian' (control/management). Emotional control is important."
  },
  {
    id: 637,
    root: 'kelola',
    targetWord: 'pengelola',
    sentence: '___ gedung bertanggung jawab atas fasilitas umum.',
    hint: 'manager',
    explanation: "The root 'kelola' (manage) takes the prefix 'peN-' ('peng-') to form the noun 'pengelola' (manager), the person who manages."
  },
  {
    id: 638,
    root: 'kelola',
    targetWord: 'pengelolaan',
    sentence: 'Diperlukan ___ keuangan yang baik dalam rumah tangga.',
    hint: 'management',
    explanation: "The root 'kelola' (manage) takes prefix 'peN-' ('peng-') and suffix '-an' to form the noun 'pengelolaan' (management). Good financial management is needed."
  },
  {
    id: 639,
    root: 'kembang',
    targetWord: 'pengembang',
    sentence: '___ perangkat lunak itu merilis versi terbaru aplikasinya.',
    hint: 'developer',
    explanation: "The root 'kembang' (develop) takes the prefix 'peN-' ('peng-') to form the noun 'pengembang' (developer), the person or entity that develops."
  },
  {
    id: 640,
    root: 'kembang',
    targetWord: 'pengembangan',
    sentence: '___ pariwisata berkelanjutan menjadi fokus pemerintah.',
    hint: 'development (the act/process of developing something)',
    explanation: "The root 'kembang' (develop) takes prefix 'peN-' ('peng-') and suffix '-an' to form the noun 'pengembangan' (development), the act or process of developing."
  },
  {
    id: 641,
    root: 'gabung',
    targetWord: 'penggabungan',
    sentence: '___ dua perusahaan itu menghasilkan entitas bisnis yang lebih besar.',
    hint: 'the merging, the combining',
    explanation: "The root 'gabung' (join/merge) takes prefix 'peN-' ('peng-') and suffix '-an' to form the noun 'penggabungan' (merger/combination). The merger of the two companies resulted in a larger entity."
  },
  {
    id: 643,
    root: 'guna',
    targetWord: 'pengguna',
    sentence: '___ jalan raya diimbau untuk mematuhi peraturan.',
    hint: 'user',
    explanation: "The root 'guna' (use) takes the prefix 'peN-' ('peng-') to form the noun 'pengguna' (user), the person who uses."
  },
  {
    id: 644,
    root: 'guna',
    targetWord: 'penggunaan',
    sentence: '___ energi alternatif perlu digalakkan.',
    hint: 'the act/process of using, the use, the usage',
    explanation: "The root 'guna' (use) takes prefix 'peN-' ('peng-') and suffix '-an' to form the noun 'penggunaan' (usage/the act of using). The use of alternative energy needs promotion."
  },
  {
    id: 645,
    root: 'halang',
    targetWord: 'penghalang',
    sentence: 'Ketakutan adalah ___ terbesar untuk maju.',
    hint: 'barrier, hindrance',
    explanation: "The root 'halang' (obstruct) takes the prefix 'peN-' ('pen-' + 'h' -> 'pengh-') to form the noun 'penghalang' (barrier/hindrance), the thing that obstructs."
  },
  {
    id: 647,
    root: 'hasil',
    targetWord: 'penghasilan',
    sentence: 'Dia mencari pekerjaan dengan ___ yang lebih baik.',
    hint: 'income, earnings',
    explanation: "The root 'hasil' (result/produce) takes prefix 'peN-' ('pen-' + 'h' -> 'pengh-') and suffix '-an' to form the noun 'penghasilan' (income/earnings). He seeks a job with better income."
  },
  {
    id: 648,
    root: 'harga',
    targetWord: 'penghargaan',
    sentence: 'Dia menerima ___ atas dedikasinya selama ini.',
    hint: 'appreciation',
    explanation: "The root 'harga' (price/value) takes prefix 'peN-' ('pen-' + 'h' -> 'pengh-') and suffix '-an' to form the noun 'penghargaan' (award/appreciation). He received an award for his dedication."
  },
  {
    id: 649,
    root: 'hubung',
    targetWord: 'penghubung',
    sentence: 'Jembatan ini adalah ___ utama antar desa.',
    hint: 'connector, link',
    explanation: "The root 'hubung' (connect) takes the prefix 'peN-' ('pen-' + 'h' -> 'pengh-') to form the noun 'penghubung' (connector/link), the thing that connects."
  },
  {
    id: 652,
    root: 'obat',
    targetWord: 'pengobatan',
    sentence: '___ alternatif terkadang menjadi pilihan.',
    hint: 'medical treatment',
    explanation: "The root 'obat' (medicine) takes prefix 'peN-' ('peng-') and suffix '-an' to form the noun 'pengobatan' (medical treatment). Alternative treatment is sometimes an option."
  },
  {
    id: 653,
    root: 'korban',
    targetWord: 'pengorbanan',
    sentence: 'Kemerdekaan ini diraih dengan ___ jiwa dan raga.',
    hint: 'sacrifice',
    explanation: "The root 'korban' (victim/sacrifice) takes prefix 'peN-' ('peng-') and suffix '-an' to form the noun 'pengorbanan' (sacrifice). This independence was achieved with sacrifice."
  },
  {
    id: 654,
    root: 'kurang',
    targetWord: 'pengurangan',
    sentence: 'Ada ___ jumlah siswa yang mendaftar tahun ini.',
    hint: 'reduction, subtraction',
    explanation: "The root 'kurang' (less) takes prefix 'peN-' ('peng-') and suffix '-an' to form the noun 'pengurangan' (reduction/decrease). There is a reduction in student enrollment."
  },
  {
    id: 655,
    root: 'kuasa',
    targetWord: 'penguasa',
    sentence: '___ wilayah itu dikenal bijaksana.',
    hint: 'ruler',
    explanation: "The root 'kuasa' (power) takes the prefix 'peN-' ('peng-') to form the noun 'penguasa' (ruler/authority), the person who holds power."
  },
  {
    id: 657,
    root: 'ukur',
    targetWord: 'pengukuran',
    sentence: '___ tanah dilakukan oleh petugas BPN.',
    hint: 'the act/process of measuring, measurement',
    explanation: "The root 'ukur' (measure) takes prefix 'peN-' ('peng-') and suffix '-an' to form the noun 'pengukuran' (measurement), the act of measuring."
  },
  {
    id: 659,
    root: 'kumpul',
    targetWord: 'pengumpulan',
    sentence: '___ dana amal melebihi target awal.',
    hint: 'the act/process of collecting/gathering; collection',
    explanation: "The root 'kumpul' (gather) takes prefix 'peN-' ('peng-') and suffix '-an' to form the noun 'pengumpulan' (collection/gathering). The charity fund collection exceeded the target."
  },
  {
    id: 660,
    root: 'kunjung',
    targetWord: 'pengunjung',
    sentence: 'Jumlah ___ perpustakaan meningkat pesat.',
    hint: 'visitor',
    explanation: "The root 'kunjung' (visit) takes the prefix 'peN-' ('peng-') to form the noun 'pengunjung' (visitor), the person who visits."
  },
  {
    id: 661,
    root: 'usaha',
    targetWord: 'pengusaha',
    sentence: '___ muda itu sukses mengembangkan bisnisnya.',
    hint: 'entrepreneur',
    explanation: "The root 'usaha' (effort/business) takes the prefix 'peN-' ('peng-') to form the noun 'pengusaha' (entrepreneur/businessman), the person who does business."
  },
  {
    id: 662,
    root: 'umum',
    targetWord: 'pengumuman',
    sentence: '___ kelulusan akan ditempel di papan informasi.',
    hint: 'the act/process of announcing, announcement',
    explanation: "The root 'umum' (public/general) takes prefix 'peN-' ('peng-') and suffix '-an' to form the noun 'pengumuman' (announcement). The graduation announcement will be posted."
  },
  {
    id: 664,
    root: 'tingkat',
    targetWord: 'peningkatan',
    sentence: 'Terjadi ___ kualitas udara setelah hujan.',
    hint: 'increase, improvement',
    explanation: "The root 'tingkat' (level/increase) takes prefix 'peN-' ('pen-') and suffix '-an' to form the noun 'peningkatan' (increase/improvement). An improvement in air quality occurred after the rain."
  },
  {
    id: 666,
    root: 'jual',
    targetWord: 'penjualan',
    sentence: '___ tiket konser dibuka secara online.',
    hint: 'sales',
    explanation: "The root 'jual' (sell) takes prefix 'peN-' ('pen-' + 'j' -> 'penj-') and suffix '-an' to form the noun 'penjualan' (sales). Concert ticket sales opened online."
  },
  {
    id: 667,
    root: 'jual',
    targetWord: 'penjual',
    sentence: '___ koran itu selalu ramah menyapa.',
    hint: 'seller, vendor',
    explanation: "The root 'jual' (sell) takes the prefix 'peN-' ('pen-' + 'j' -> 'penj-') to form the noun 'penjual' (seller), the person who sells."
  },
  {
    id: 670,
    root: 'saji',
    targetWord: 'penyajian',
    sentence: '___ makanan di restoran itu sangat menarik.',
    hint: 'the act/process of serving; the presentation',
    explanation: "The root 'saji' (serve/present) takes prefix 'peN-' ('peny-') and suffix '-an' to form the noun 'penyajian' (presentation/serving). The food presentation at the restaurant is appealing."
  },
  {
    id: 671,
    root: 'sebar',
    targetWord: 'penyebaran',
    sentence: '___ berita palsu dapat dihukum.',
    hint: 'the spreading of',
    explanation: "The root 'sebar' (spread) takes prefix 'peN-' ('peny-') and suffix '-an' to form the noun 'penyebaran' (spreading/dissemination). The spreading of fake news is punishable."
  },
  {
    id: 672,
    root: 'sebab',
    targetWord: 'penyebab',
    sentence: '___ kemacetan itu adalah kecelakaan truk.',
    hint: 'the cause',
    explanation: "The root 'sebab' (cause/reason) takes the prefix 'peN-' ('peny-') to form the noun 'penyebab' (cause), the thing that causes."
  },
  {
    id: 673,
    root: 'sedia',
    targetWord: 'penyedia',
    sentence: 'Ada banyak ___ layanan internet di kota ini.',
    hint: 'provider',
    explanation: "The root 'sedia' (ready/provide) takes the prefix 'peN-' ('peny-') to form the noun 'penyedia' (provider), the one who provides."
  },
  {
    id: 674,
    root: 'sedia',
    targetWord: 'penyediaan',
    sentence: '___ fasilitas publik yang memadai penting.',
    hint: 'the act/process of providing',
    explanation: "The root 'sedia' (ready/provide) takes prefix 'peN-' ('peny-') and suffix '-an' to form the noun 'penyediaan' (provision/supply), the act of providing."
  },
  {
    id: 675,
    root: 'selamat',
    targetWord: 'penyelamatan',
    sentence: 'Proses ___ sandera berlangsung menegangkan.',
    hint: 'rescue',
    explanation: "The root 'selamat' (safe/save) takes prefix 'peN-' ('peny-') and suffix '-an' to form the noun 'penyelamatan' (rescue/saving). The hostage rescue process was tense."
  },
  {
    id: 676,
    root: 'selenggara',
    targetWord: 'penyelenggara',
    sentence: '___ acara mohon maaf atas keterlambatan.',
    hint: 'organizer',
    explanation: "The root 'selenggara' (organize) takes the prefix 'peN-' ('peny-') to form the noun 'penyelenggara' (organizer), the one who organizes."
  },
  {
    id: 677,
    root: 'selenggara',
    targetWord: 'penyelenggaraan',
    sentence: '___ pemilu berjalan aman dan lancar.',
    hint: 'the organizing of; the act/process of organizing/conducting an event',
    explanation: "The root 'selenggara' (organize) takes prefix 'peN-' ('peny-') and suffix '-an' to form the noun 'penyelenggaraan' (organization/conduct). The election conduct went smoothly."
  },
  {
    id: 678,
    root: 'serah',
    targetWord: 'penyerahan',
    sentence: '___ bantuan dilakukan secara simbolis.',
    hint: 'the handing in/over of',
    explanation: "The root 'serah' (hand over) takes prefix 'peN-' ('peny-') and suffix '-an' to form the noun 'penyerahan' (handover/submission). The aid handover was done symbolically."
  },
  {
    id: 679,
    root: 'serap',
    targetWord: 'penyerapan',
    sentence: '___ anggaran tahun ini diharapkan maksimal.',
    hint: 'absorption',
    explanation: "The root 'serap' (absorb) takes prefix 'peN-' ('peny-') and suffix '-an' to form the noun 'penyerapan' (absorption). Budget absorption this year is expected to be maximal."
  },
  {
    id: 680,
    root: 'suai',
    targetWord: 'penyesuaian',
    sentence: 'Diperlukan ___ terhadap lingkungan baru.',
    hint: 'adjustment',
    explanation: "The root 'suai' (match/fit) takes prefix 'peN-' ('peny-') and suffix '-an' to form the noun 'penyesuaian' (adjustment). Adjustment to the new environment is needed."
  },
  {
    id: 681,
    root: 'sumbang',
    targetWord: 'penyumbang',
    sentence: 'Nama para ___ akan dicatat oleh panitia.',
    hint: 'contributor, donor',
    explanation: "The root 'sumbang' (contribute/donate) takes the prefix 'peN-' ('peny-') to form the noun 'penyumbang' (donor/contributor), the person who donates."
  },
  {
    id: 684,
    root: 'raya',
    targetWord: 'perayaan',
    sentence: '___ kelulusan sekolah diadakan di aula.',
    hint: 'celebration',
    explanation: "The root 'raya' (great/celebrate) takes the prefix 'per-' and suffix '-an' to form the noun 'perayaan' (celebration). The school graduation celebration was held in the hall."
  },
  {
    id: 685,
    root: 'baik',
    targetWord: 'perbaikan',
    sentence: '___ sistem komputer sedang dilakukan.',
    hint: 'reparation, improvement',
    explanation: "The root 'baik' (good) takes the prefix 'per-' and suffix '-an' to form the noun 'perbaikan' (repair/improvement). Computer system repair is underway."
  },
  {
    id: 686,
    root: 'banding',
    targetWord: 'perbandingan',
    sentence: '___ harga antara dua toko itu cukup signifikan.',
    hint: 'ratio, comparison',
    explanation: "The root 'banding' (compare) takes prefix 'per-' and suffix '-an' to form the noun 'perbandingan' (comparison). The price comparison between the two stores is significant."
  },
  {
    id: 687,
    root: 'batas',
    targetWord: 'perbatasan',
    sentence: 'Pos penjagaan ___ dijaga ketat oleh tentara.',
    hint: 'border (i.e.: between countries)',
    explanation: "The root 'batas' (limit/border) takes prefix 'per-' and suffix '-an' to form the noun 'perbatasan' (border area). The border guard post is tightly guarded."
  },
  {
    id: 688,
    root: 'dagang',
    targetWord: 'perdagangan',
    sentence: 'Aktivitas ___ di pasar itu sangat ramai.',
    hint: 'trading',
    explanation: "The root 'dagang' (trade) takes prefix 'per-' and suffix '-an' to form the noun 'perdagangan' (trade/commerce). Trading activity in the market is very busy."
  },
  {
    id: 689,
    root: 'beda',
    targetWord: 'perbedaan',
    sentence: '___ pendapat dalam diskusi adalah hal wajar.',
    hint: 'difference',
    explanation: "The root 'beda' (different) takes prefix 'per-' and suffix '-an' to form the noun 'perbedaan' (difference). Difference of opinion in discussion is normal."
  },
  {
    id: 690,
    root: 'edar',
    targetWord: 'peredaran',
    sentence: '___ narkoba harus diberantas tuntas.',
    hint: 'circulation, distribution',
    explanation: "The root 'edar' (circulate) takes prefix 'per-' and suffix '-an' to form the noun 'peredaran' (circulation/distribution). Drug circulation must be eradicated."
  },
  {
    id: 691,
    root: 'gaul',
    targetWord: 'pergaulan',
    sentence: '___ bebas dapat membawa dampak negatif.',
    hint: 'social interaction',
    explanation: "The root 'gaul' (socialize) takes prefix 'per-' and suffix '-an' to form the noun 'pergaulan' (social interaction/association). Free association can have negative impacts."
  },
  {
    id: 692,
    root: 'geser',
    targetWord: 'pergeseran',
    sentence: '___ nilai-nilai budaya terjadi di era modern.',
    hint: 'the shift; shifting (the process of \'bergeser\')',
    explanation: "The root 'geser' (shift) takes prefix 'per-' and suffix '-an' to form the noun 'pergeseran' (a shift). A shift in cultural values occurs in the modern era."
  },
  {
    id: 694,
    root: 'ingat',
    targetWord: 'peringatan',
    sentence: '___ Hari Guru Nasional jatuh pada 25 November.',
    hint: 'warning; commemoration, remembrance',
    explanation: "The root 'ingat' (remember) takes prefix 'per-' and suffix '-an' to form the noun 'peringatan' (commemoration/warning). National Teacher's Day commemoration falls on Nov 25th."
  },
  {
    id: 695,
    root: 'kembang',
    targetWord: 'perkembangan',
    sentence: '___ teknologi digital sangat cepat.',
    hint: 'development (the act/process of something that develops)',
    explanation: "The root 'kembang' (develop) takes prefix 'per-' and suffix '-an' to form the noun 'perkembangan' (development/progress). Digital technology development is very fast."
  },
  {
    id: 696,
    root: 'kumpul',
    targetWord: 'perkumpulan',
    sentence: '___ filateli itu mengadakan pameran perangko.',
    hint: 'association',
    explanation: "The root 'kumpul' (gather) takes prefix 'per-' and suffix '-an' to form the noun 'perkumpulan' (association/gathering). The philately association held a stamp exhibition."
  },
  {
    id: 697,
    root: 'laku',
    targetWord: 'perlakuan',
    sentence: 'Anak itu mendapat ___ khusus dari gurunya.',
    hint: 'treatment (the manner in which someone behaves towards or deals with someone or something)',
    explanation: "The root 'laku' (behavior/apply) takes prefix 'per-' and suffix '-an' to form the noun 'perlakuan' (treatment). The child received special treatment from the teacher."
  },
  {
    id: 698,
    root: 'lengkap',
    targetWord: 'perlengkapan',
    sentence: '___ sekolah seperti buku dan alat tulis harus disiapkan.',
    hint: 'equipment',
    explanation: "The root 'lengkap' (complete) takes prefix 'per-' and suffix '-an' to form the noun 'perlengkapan' (equipment/supplies). School supplies must be prepared."
  },
  {
    id: 699,
    root: 'luas',
    targetWord: 'perluasan',
    sentence: '___ pabrik akan menambah kapasitas produksi.',
    hint: 'expansion',
    explanation: "The root 'luas' (wide) takes prefix 'per-' and suffix '-an' to form the noun 'perluasan' (expansion). Factory expansion will increase production capacity."
  },
  {
    id: 700,
    root: 'minta',
    targetWord: 'permintaan',
    sentence: '___ maafnya tulus dari hati.',
    hint: 'request, demand',
    explanation: "The root 'minta' (ask for/request) takes prefix 'per-' and suffix '-an' to form the noun 'permintaan' (request/demand). His apology (request for forgiveness) was sincere."
  },
  {
    id: 701,
    root: 'pisah',
    targetWord: 'perpisahan',
    sentence: 'Acara ___ dengan rekan kerja terasa mengharukan.',
    hint: 'the act/process of parting ways, separation, farewell',
    explanation: "The root 'pisah' (separate) takes prefix 'per-' and suffix '-an' to form the noun 'perpisahan' (farewell/separation). The farewell event with colleagues was touching."
  },
  {
    id: 702,
    root: 'saing',
    targetWord: 'persaingan',
    sentence: '___ di dunia kerja semakin ketat.',
    hint: 'competition, rivalry',
    explanation: "The root 'saing' (compete) takes prefix 'per-' and suffix '-an' to form the noun 'persaingan' (competition/rivalry). Competition in the working world is getting tighter."
  },
  {
    id: 703,
    root: 'sedia',
    targetWord: 'persediaan',
    sentence: '___ bahan makanan menipis akibat banjir.',
    hint: 'stock, supply',
    explanation: "The root 'sedia' (ready/provide) takes prefix 'per-' and suffix '-an' to form the noun 'persediaan' (supply/stock). Food supplies dwindled due to the flood."
  },
  {
    id: 704,
    root: 'timbang',
    targetWord: 'pertimbangan',
    sentence: 'Semua aspek menjadi ___ dalam keputusan ini.',
    hint: 'consideration',
    explanation: "The root 'timbang' (weigh/consider) takes prefix 'per-' and suffix '-an' to form the noun 'pertimbangan' (consideration). All aspects become a consideration in this decision."
  },
  {
    id: 705,
    root: 'tumbuh',
    targetWord: 'pertumbuhan',
    sentence: '___ ekonomi yang stabil penting bagi negara.',
    hint: 'growth',
    explanation: "The root 'tumbuh' (grow) takes prefix 'per-' and suffix '-an' to form the noun 'pertumbuhan' (growth). Stable economic growth is important for the country."
  },
  {
    id: 706,
    root: 'tunjuk',
    targetWord: 'pertunjukan',
    sentence: '___ sulap itu sangat menghibur penonton.',
    hint: 'show',
    explanation: "The root 'tunjuk' (point/show) takes prefix 'per-' and suffix '-an' to form the noun 'pertunjukan' (show/performance). The magic show was very entertaining."
  },
  {
    id: 708,
    root: 'rusak',
    targetWord: 'perusakan',
    sentence: '___ hutan mengancam keanekaragaman hayati.',
    hint: 'destruction',
    explanation: "The root 'rusak' (damaged) takes prefix 'per-' and suffix '-an' to form the noun 'perusakan' (destruction/vandalism). Forest destruction threatens biodiversity."
  },
  {
    id: 709,
    root: 'wakil',
    targetWord: 'perwakilan',
    sentence: 'Kantor ___ diplomatik dibuka di negara sahabat.',
    hint: 'representative',
    explanation: "The root 'wakil' (representative) takes prefix 'per-' and suffix '-an' to form the noun 'perwakilan' (representation/delegation/representative office). A diplomatic representative office was opened."
  },
  {
    id: 710,
    root: 'wujud',
    targetWord: 'perwujudan',
    sentence: 'Cinta kasih adalah ___ perhatian antar sesama.',
    hint: 'actualization, embodiment',
    explanation: "The root 'wujud' (form/manifestation) takes prefix 'per-' and suffix '-an' to form the noun 'perwujudan' (embodiment/manifestation). Love is the embodiment of care."
  },
  {
    id: 711,
    root: 'hati',
    targetWord: 'perhatian',
    sentence: 'Mohon ___nya, pengumuman penting akan disampaikan.',
    hint: 'attention',
    explanation: "The root 'hati' (heart/attention) takes prefix 'per-' and suffix '-an' to form the noun 'perhatian' (attention). Please pay attention (lit. request for your attention), an announcement will be made."
  },
  {
    id: 712,
    root: 'atur',
    targetWord: 'peraturan',
    sentence: 'Mematuhi ___ adalah kewajiban setiap warga.',
    hint: 'regulation',
    explanation: "The root 'atur' (arrange/regulate) takes prefix 'per-' and suffix '-an' to form the noun 'peraturan' (regulation). Obeying regulations is every citizen's duty."
  },
  {
    id: 713,
    root: 'pimpin',
    targetWord: 'pimpinan',
    sentence: 'Keputusan akhir ada di tangan ___.' ,
    hint: 'leader',
    explanation: "The root 'pimpin' (lead) takes the suffix '-an' to form the noun 'pimpinan' (leader/leadership). The final decision rests with the leader."
  },
  {
    id: 714,
    root: 'pusat',
    targetWord: 'pemusatan', // Corrected target based on common usage for 'centering' process. 'Pusat perbelanjaan' is a compound noun.
    sentence: '___ perhatian pada satu titik membantu fokus.', // Adjusted sentence
    hint: 'concentration, focus (act of centering)',
    explanation: "The root 'pusat' (center) takes prefix 'peN-' ('pem-') and suffix '-an' to form 'pemusatan' (concentration/centering). Concentration of attention on one point helps focus."
  },
  {
    id: 718,
    root: 'rela',
    targetWord: 'relawan',
    sentence: '___ bencana alam membantu tanpa pamrih.',
    hint: 'volunteer',
    explanation: "The root 'rela' (willing) takes the suffix '-wan' (indicating person/practitioner) to form the noun 'relawan' (volunteer). Disaster volunteers help selflessly."
  },
  {
    id: 722,
    root: 'saing',
    targetWord: 'pesaing',
    sentence: 'Dia adalah ___ terberat dalam kompetisi itu.',
    hint: 'rivals, competitors',
    explanation: "The root 'saing' (compete) takes the prefix 'peN-' ('pe-') to form the noun 'pesaing' (competitor/rival), the person who competes."
  },
  {
    id: 723,
    root: 'saji',
    targetWord: 'sajian',
    sentence: '___ istimewa disiapkan untuk para tamu.',
    hint: 'the thing that is served',
    explanation: "The root 'saji' (serve/present) takes the suffix '-an' to form the noun 'sajian' (dish/serving/presentation). Special dishes were prepared for the guests."
  },
  {
    id: 727,
    root: 'sambut',
    targetWord: 'sambutan',
    sentence: '___ hangat diberikan kepada delegasi tamu.',
    hint: 'a welcome, a greeting',
    explanation: "The root 'sambut' (welcome/greet) takes the suffix '-an' to form the noun 'sambutan' (welcome/reception/speech). A warm welcome was given to the guest delegation."
  },
  {
    id: 728,
    root: 'sasar',
    targetWord: 'sasaran',
    sentence: '___ tembaknya tepat mengenai target.',
    hint: 'target',
    explanation: "The root 'sasar' (target/aim) takes the suffix '-an' to form the noun 'sasaran' (target/goal). His shot's target hit the mark."
  },
  {
    id: 733,
    root: 'segel',
    targetWord: 'segel',
    sentence: 'Pintu ruangan itu diberi ___ oleh polisi.',
    hint: 'seal',
    explanation: "This is the root word used as a noun. 'Segel' (seal) fits directly. The door was given a seal by the police. No affix needed here."
  },
  {
    id: 734,
    root: 'imbang',
    targetWord: 'seimbang',
    sentence: 'Diet ___ penting untuk kesehatan.',
    hint: 'balanced',
    explanation: "The root 'imbang' (balance) takes the prefix 'se-' (meaning one, or indicating state/similarity) to form the adjective 'seimbang' (balanced). A balanced diet is important."
  },
  {
    id: 738,
    root: 'serah',
    targetWord: 'penyerahan', // Corrected target based on hint 'handover' (the process/act)
    sentence: 'Proses ___ jabatan berjalan lancar.',
    hint: 'handover',
    explanation: "The root 'serah' (hand over) uses prefix 'peN-' ('peny-') and suffix '-an' to form the noun 'penyerahan' (handover/submission). The handover process of the position went smoothly."
  },
  {
    id: 740, // Assuming ID 740 was intended, filling a gap
    root: 'serap',
    targetWord: 'serapan',
    sentence: 'Kata ___ dari bahasa asing sering digunakan.',
    hint: 'absorbed (word), loanword',
    explanation: "The root 'serap' (absorb) takes the suffix '-an' to form 'serapan' (absorption, or here, loanword - 'kata serapan'). Loanwords from foreign languages are often used."
  },
  {
    id: 741,
    root: 'sumbang',
    targetWord: 'sumbangan',
    sentence: '___ dana untuk korban bencana terus mengalir.',
    hint: 'donation',
    explanation: "The root 'sumbang' (contribute/donate) takes the suffix '-an' to form the noun 'sumbangan' (donation/contribution). Fund donations for disaster victims continue to flow."
  },
  {
    id: 743,
    root: 'tanam',
    targetWord: 'tanaman',
    sentence: '___ obat keluarga bermanfaat untuk kesehatan.',
    hint: 'plant',
    explanation: "The root 'tanam' (plant) takes the suffix '-an' to form the noun 'tanaman' (plant). Family medicinal plants are beneficial for health."
  },
  {
    id: 744,
    root: 'tanggap',
    targetWord: 'tanggapan',
    sentence: '___ positif diterima atas usulan tersebut.',
    hint: 'response',
    explanation: "The root 'tanggap' (respond) uses the suffix '-an' to form the noun 'tanggapan' (response). A positive response was received for the proposal."
  },
  {
    id: 745,
    root: 'tantang',
    targetWord: 'tantangan',
    sentence: 'Menghadapi ___ membuat kita lebih kuat.',
    hint: 'challenge',
    explanation: "The root 'tantang' (challenge) takes the suffix '-an' to form the noun 'tantangan' (challenge). Facing challenges makes us stronger."
  },
  {
    id: 746,
    root: 'tekan',
    targetWord: 'tekanan',
    sentence: 'Dia bekerja dengan baik di bawah ___.' ,
    hint: 'pressure',
    explanation: "The root 'tekan' (press) uses the suffix '-an' to form the noun 'tekanan' (pressure). He works well under pressure."
  },
  {
    id: 749,
    root: 'temu',
    targetWord: 'temuan',
    sentence: '___ baru di bidang sains mengubah pandangan lama.',
    hint: 'findings',
    explanation: "The root 'temu' (meet/find) takes the suffix '-an' to form the noun 'temuan' (finding/discovery). New findings in science change old views."
  },
  {
    id: 750,
    root: 'tenggelam',
    targetWord: 'tenggelam',
    sentence: 'Kapal tua itu ___ di dasar laut.',
    hint: 'is drowned',
    explanation: "This is the root word used as an intransitive verb. 'Tenggelam' (to sink/drown) fits directly. The old ship sank to the seabed. No affix needed here."
  },
  {
    id: 752,
    root: 'abai',
    targetWord: 'terabaikan',
    sentence: 'Bakat anak itu ___ karena kurangnya perhatian.',
    hint: 'is abandoned, is neglected',
    explanation: "The root 'abai' (neglect) takes the prefix 'ter-' and suffix '-kan' to form the passive verb 'terabaikan' (to be neglected/ignored, often unintentionally). The child's talent was neglected. Heuristic: 'ter-' often indicates a passive or unintentional state."
  },
  {
    id: 754,
    root: 'ancam',
    targetWord: 'terancam',
    sentence: 'Populasi badak Jawa ___ punah.',
    hint: 'threatened',
    explanation: "The root 'ancam' (threaten) takes the prefix 'ter-' to form the passive state verb 'terancam' (to be threatened). The Javan rhino population is threatened with extinction."
  },
  {
    id: 755,
    root: 'atasi',
    targetWord: 'teratasi',
    sentence: 'Berkat kerja sama, masalah itu akhirnya ___.' ,
    hint: 'is resolved',
    explanation: "The root 'atasi' (overcome) uses the prefix 'ter-' to form the passive state verb 'teratasi' (to be resolved/overcome). The problem was finally resolved thanks to cooperation."
  },
  {
    id: 756,
    root: 'atur',
    targetWord: 'teratur',
    sentence: 'Dia hidup dengan jadwal yang sangat ___.' ,
    hint: 'organised, arranged',
    explanation: "The root 'atur' (arrange) takes the prefix 'ter-' to form the adjective 'teratur' (organized/regular). He lives with a very organized schedule."
  },
  {
    id: 757,
    root: 'awas',
    targetWord: 'terawasi',
    sentence: 'Semua kegiatan di area ini ___ oleh CCTV.',
    hint: 'is watched, is supervised',
    explanation: "The root 'awas' (supervise) uses prefix 'ter-' and suffix '-i' to form the passive verb 'terawasi' (to be supervised). All activities are supervised by CCTV."
  },
  {
    id: 758,
    root: 'batas',
    targetWord: 'terbatas',
    sentence: 'Jumlah tiket yang dijual sangat ___.' ,
    hint: 'is limited',
    explanation: "The root 'batas' (limit) takes the prefix 'ter-' to form the adjective/passive state verb 'terbatas' (limited). The number of tickets sold is very limited."
  },
  {
    id: 759,
    root: 'banyak',
    targetWord: 'terbanyak',
    sentence: 'Dia mengumpulkan poin ___ dalam permainan itu.',
    hint: 'the most',
    explanation: "The root 'banyak' (many) takes the prefix 'ter-' to form the superlative adjective 'terbanyak' (the most). He collected the most points."
  },
  {
    id: 760,
    root: 'baca',
    targetWord: 'terbaca',
    sentence: 'Tulisan tangannya sulit ___ karena terlalu kecil.',
    hint: 'is unintentionally read; readable, can be read',
    explanation: "The root 'baca' (read) takes the prefix 'ter-' to form 'terbaca' (readable/can be read). His handwriting is difficult to be read. 'Ter-' can indicate potential or ability."
  },
  {
    id: 761,
    root: 'biasa',
    targetWord: 'terbiasa',
    sentence: 'Dia ___ dengan suasana kerja yang sibuk.',
    hint: 'is get used to',
    explanation: "The root 'biasa' (usual) takes the prefix 'ter-' to form 'terbiasa' (to be accustomed to/used to). He is used to the busy work atmosphere."
  },
  {
    id: 762,
    root: 'buang',
    targetWord: 'terbuang',
    sentence: 'Makanan sisa sebaiknya tidak ___ begitu saja.',
    hint: 'is thrown away, is discarded',
    explanation: "The root 'buang' (throw away) takes the prefix 'ter-' to form the passive verb 'terbuang' (to be thrown away, often implying waste or unintentionality). Leftover food shouldn't just be thrown away."
  },
  {
    id: 763,
    root: 'bukti',
    targetWord: 'terbukti',
    sentence: 'Dia ___ bersalah melakukan pelanggaran.',
    hint: 'is proven, is evident',
    explanation: "The root 'bukti' (proof) takes the prefix 'ter-' to form 'terbukti' (proven/evident). He is proven guilty of committing the violation."
  },
  {
    id: 764,
    root: 'bentuk',
    targetWord: 'terbentuk',
    sentence: 'Gugusan karang ___ selama jutaan tahun.',
    hint: 'is formed, is shaped',
    explanation: "The root 'bentuk' (form) takes the prefix 'ter-' to form the passive verb 'terbentuk' (to be formed, often naturally or unintentionally). Coral reefs were formed over millions of years."
  },
  {
    id: 765,
    root: 'capai',
    targetWord: 'tercapai',
    sentence: 'Tujuan utama proyek ini telah ___.' ,
    hint: 'is achieved, is reached',
    explanation: "The root 'capai' (reach/achieve) uses the prefix 'ter-' to form the passive verb 'tercapai' (to be achieved/reached). The main goal of this project has been achieved."
  },
  {
    id: 766,
    root: 'cegah',
    targetWord: 'tercegah',
    sentence: 'Kecelakaan itu bisa ___ jika pengemudi lebih hati-hati.',
    hint: 'is prevented; preventable',
    explanation: "The root 'cegah' (prevent) takes the prefix 'ter-' to form 'tercegah' (preventable/can be prevented). The accident could have been prevented."
  },
  {
    id: 767,
    root: 'cipta',
    targetWord: 'tercipta',
    sentence: 'Suasana damai ___ setelah mediasi.',
    hint: 'is created',
    explanation: "The root 'cipta' (create) takes the prefix 'ter-' to form the passive verb 'tercipta' (to be created, often spontaneously or as a result). A peaceful atmosphere was created after mediation."
  },
  {
    id: 768,
    root: 'dapat',
    targetWord: 'terdapat',
    sentence: '___ banyak buku menarik di perpustakaan ini.',
    hint: 'there is/are',
    explanation: "The root 'dapat' (get/can) takes the prefix 'ter-' to form 'terdapat' (to be found/there is/there are). There are many interesting books in this library."
  },
  {
    id: 769,
    root: 'daftar',
    targetWord: 'terdaftar',
    sentence: 'Apakah nama Anda sudah ___ sebagai peserta?',
    hint: 'is registered, is listed',
    explanation: "The root 'daftar' (list/register) takes the prefix 'ter-' to form 'terdaftar' (registered/listed). Is your name already registered as a participant?"
  },
  {
    id: 770,
    root: 'dorong',
    targetWord: 'terdorong',
    sentence: 'Dia ___ untuk membantu setelah melihat kondisi mereka.',
    hint: 'is pushed, is encouraged',
    explanation: "The root 'dorong' (push) takes the prefix 'ter-' to form 'terdorong' (pushed/motivated/encouraged, often internally or by circumstance). He felt compelled/encouraged to help."
  },
  {
    id: 771,
    root: 'duga',
    targetWord: 'terduga',
    sentence: 'Pencuri ___ itu berhasil ditangkap polisi.',
    hint: 'is suspected',
    explanation: "The root 'duga' (suspect) takes the prefix 'ter-' to form 'terduga' (suspected). The suspected thief was caught. Often used like an adjective 'the suspect'."
  },
  {
    id: 772,
    root: 'halang',
    targetWord: 'terhalang',
    sentence: 'Pintu masuk ___ oleh mobil yang parkir sembarangan.',
    hint: 'is hindered',
    explanation: "The root 'halang' (obstruct) takes the prefix 'ter-' to form the passive verb 'terhalang' (to be blocked/obstructed). The entrance was blocked by a car."
  },
  {
    id: 774,
    root: 'hindar',
    targetWord: 'terhindar',
    sentence: 'Semoga kita semua ___ dari marabahaya.',
    hint: 'is avoided/evaded, is spared',
    explanation: "The root 'hindar' (avoid) takes the prefix 'ter-' to form 'terhindar' (to be spared from/avoided). May we all be spared from danger."
  },
  {
    id: 775,
    root: 'hubung',
    targetWord: 'terhubung',
    sentence: 'Komputer saya tidak ___ ke internet.',
    hint: 'is connected',
    explanation: "The root 'hubung' (connect) takes the prefix 'ter-' to form 'terhubung' (connected). My computer is not connected to the internet."
  },
  {
    id: 776,
    root: 'ingat',
    targetWord: 'teringat',
    sentence: 'Saya ___ akan janji temu besok.',
    hint: 'recalled',
    explanation: "The root 'ingat' (remember) takes the prefix 'ter-' to form 'teringat' (to suddenly remember/recall). I recalled the appointment tomorrow."
  },
  {
    id: 777,
    root: 'jadi',
    targetWord: 'terjadi',
    sentence: 'Apa yang sebenarnya ___ di lokasi itu?',
    hint: 'to occur, to happen',
    explanation: "The root 'jadi' (become/happen) takes the prefix 'ter-' to form 'terjadi' (to happen/occur, often spontaneously). What actually happened at that location?"
  },
  {
    id: 778,
    root: 'jamin',
    targetWord: 'terjamin',
    sentence: 'Kualitas produk kami ___ mutunya.',
    hint: 'is guaranteed',
    explanation: "The root 'jamin' (guarantee) takes the prefix 'ter-' to form 'terjamin' (guaranteed/assured). The quality of our product is guaranteed."
  },
  {
    id: 779,
    root: 'terjemah',
    targetWord: 'terjemahan',
    sentence: '___ dokumen ini memerlukan waktu beberapa hari.',
    hint: 'translation',
    explanation: "The root 'terjemah' (translate) takes the suffix '-an' to form the noun 'terjemahan' (translation). The translation of this document takes several days."
  },
  {
    id: 780,
    root: 'kait',
    targetWord: 'terkait',
    sentence: 'Informasi ___ akan segera kami sampaikan.',
    hint: 'is linked',
    explanation: "The root 'kait' (link/hook) takes the prefix 'ter-' to form 'terkait' (related/linked). Related information will be conveyed soon. Often used like an adjective."
  },
  {
    id: 781,
    root: 'kandung',
    targetWord: 'terkandung',
    sentence: 'Pesan moral ___ dalam cerita rakyat itu.',
    hint: 'is contained',
    explanation: "The root 'kandung' (contain) takes the prefix 'ter-' to form 'terkandung' (contained within). Moral messages are contained within the folklore."
  },
  {
    id: 782,
    root: 'kendali',
    targetWord: 'terkendali',
    sentence: 'Situasi di lapangan sudah ___.' ,
    hint: 'is undercontrolled; under control',
    explanation: "The root 'kendali' (control) takes the prefix 'ter-' to form 'terkendali' (under control/controlled). The situation on the ground is under control."
  },
  {
    id: 783,
    root: 'kenal',
    targetWord: 'terkenal',
    sentence: 'Dia adalah penyanyi ___ di negaranya.',
    hint: 'famous, well-known, popular',
    explanation: "The root 'kenal' (know/recognize) takes the prefix 'ter-' to form the adjective 'terkenal' (famous/well-known). He is a famous singer in his country."
  },
  {
    id: 784,
    root: 'kelola',
    targetWord: 'terkelola',
    sentence: 'Dengan manajemen yang baik, semua sumber daya ___ efektif.',
    hint: 'is managed',
    explanation: "The root 'kelola' (manage) takes the prefix 'ter-' to form 'terkelola' (managed). With good management, all resources are managed effectively."
  },
  {
    id: 785,
    root: 'kemuka',
    targetWord: 'terkemuka',
    sentence: 'Universitas ___ itu menghasilkan banyak lulusan hebat.',
    hint: 'leading, prominent',
    explanation: "The root 'kemuka' (forward) takes the prefix 'ter-' to form the adjective 'terkemuka' (leading/prominent). That leading university produces great graduates."
  },
  {
    id: 786,
    root: 'kesan',
    targetWord: 'terkesan',
    sentence: 'Saya ___ dengan penampilannya yang sederhana.',
    hint: 'impressed',
    explanation: "The root 'kesan' (impression) takes the prefix 'ter-' to form 'terkesan' (impressed/affected). I was impressed by his simple appearance."
  },
  {
    id: 787,
    root: 'kumpul',
    targetWord: 'terkumpul',
    sentence: 'Dana yang ___ akan digunakan untuk membangun sekolah.',
    hint: 'is collected, is gathered',
    explanation: "The root 'kumpul' (gather) takes the prefix 'ter-' to form 'terkumpul' (collected/gathered). The collected funds will be used to build a school."
  },
  {
    id: 788,
    root: 'larang',
    targetWord: 'terlarang',
    sentence: 'Obat-obatan ___ tidak boleh dikonsumsi.',
    hint: 'is forbidden, is prohibited',
    explanation: "The root 'larang' (forbid) takes the prefix 'ter-' to form the adjective 'terlarang' (forbidden/prohibited). Forbidden drugs should not be consumed."
  },
  {
    id: 789,
    root: 'latih',
    targetWord: 'terlatih',
    sentence: 'Anjing ___ itu membantu menemukan korban hilang.',
    hint: 'is trained',
    explanation: "The root 'latih' (train) takes the prefix 'ter-' to form the adjective 'terlatih' (trained). The trained dog helped find the missing victim."
  },
  {
    id: 790,
    root: 'lemah',
    targetWord: 'terlemah',
    sentence: 'Mata rantai yang ___ dalam tim itu perlu diperkuat.',
    hint: 'weakest',
    explanation: "The root 'lemah' (weak) takes the prefix 'ter-' to form the superlative adjective 'terlemah' (weakest). The weakest link in the team needs strengthening."
  },
  {
    id: 791,
    root: 'libat',
    targetWord: 'terlibat',
    sentence: 'Dia ___ aktif dalam organisasi kemahasiswaan.',
    hint: 'is involved; involved, implicated',
    explanation: "The root 'libat' (involve) takes the prefix 'ter-' to form 'terlibat' (involved/implicated). He is actively involved in student organizations."
  },
  {
    id: 792,
    root: 'obat',
    targetWord: 'terobati',
    sentence: 'Semoga luka hatinya segera ___.' ,
    hint: 'is treated; is already treated; can be treated',
    explanation: "The root 'obat' (medicine) uses prefix 'ter-' and suffix '-i' to form 'terobati' (can be treated/is treated). Hopefully, his heartache will soon be treated/healed."
  },
  {
    id: 793,
    root: 'pandang',
    targetWord: 'terpandang',
    sentence: 'Keluarga ___ itu menyumbang besar untuk amal.',
    hint: 'is respected',
    explanation: "The root 'pandang' (view/look) takes the prefix 'ter-' to form the adjective 'terpandang' (respected/prominent). That respected family donated generously to charity."
  },
  {
    id: 794,
    root: 'pasang',
    targetWord: 'terpasang',
    sentence: 'Kamera pengintai ___ di sudut ruangan.',
    hint: 'installed',
    explanation: "The root 'pasang' (install) takes the prefix 'ter-' to form 'terpasang' (installed). Surveillance cameras are installed in the corner."
  },
  {
    id: 795,
    root: 'paksa',
    targetWord: 'terpaksa',
    sentence: 'Dia ___ berbohong untuk menutupi kesalahannya.',
    hint: 'is forced to..., have no choice but to...',
    explanation: "The root 'paksa' (force) takes the prefix 'ter-' to form 'terpaksa' (forced/compelled by circumstance). He was forced to lie to cover his mistake."
  },
  {
    id: 796,
    root: 'pengaruh',
    targetWord: 'terpengaruh',
    sentence: 'Anak muda mudah ___ oleh tren terbaru.',
    hint: 'is affected',
    explanation: "The root 'pengaruh' (influence) takes the prefix 'ter-' to form 'terpengaruh' (influenced/affected). Young people are easily influenced by the latest trends."
  },
  {
    id: 797,
    root: 'picu',
    targetWord: 'terpicu',
    sentence: 'Ledakan ___ oleh kebocoran gas.',
    hint: 'is triggered',
    explanation: "The root 'picu' (trigger) takes the prefix 'ter-' to form the passive verb 'terpicu' (triggered). The explosion was triggered by a gas leak."
  },
  {
    id: 798,
    root: 'pisah',
    targetWord: 'terpisah',
    sentence: 'Dia tinggal ___ dari orang tuanya.',
    hint: 'is separated',
    explanation: "The root 'pisah' (separate) takes the prefix 'ter-' to form 'terpisah' (separated). He lives separately from his parents."
  },
  {
    id: 800,
    root: 'saing',
    targetWord: 'tersaingi',
    sentence: 'Produk lama mulai ___ oleh produk baru.',
    hint: 'is rivaled',
    explanation: "The root 'saing' (compete) uses prefix 'ter-' and suffix '-i' to form the passive verb 'tersaingi' (to be rivaled/outcompeted). The old product began to be rivaled by the new one."
  },
  {
    id: 801,
    root: 'saji',
    targetWord: 'tersaji',
    sentence: 'Hidangan lezat ___ di atas meja makan.',
    hint: 'is served (i.e.: food & drink)',
    explanation: "The root 'saji' (serve/present) takes the prefix 'ter-' to form the passive verb 'tersaji' (served/presented). Delicious dishes are served on the dining table."
  },
  {
    id: 802,
    root: 'sasar',
    targetWord: 'tersasar',
    sentence: 'Pendaki itu ___ di tengah hutan lebat.',
    hint: 'lost (lose one\'s way)',
    explanation: "The root 'sasar' (aim/target) takes the prefix 'ter-' to form 'tersasar' (lost/strayed, often unintentionally). The hiker got lost in the dense forest."
  },
  {
    id: 803,
    root: 'sebar',
    targetWord: 'tersebar',
    sentence: 'Berita kelulusannya ___ ke seluruh sekolah.',
    hint: 'is spread, is scattered',
    explanation: "The root 'sebar' (spread) takes the prefix 'ter-' to form 'tersebar' (spread/scattered). The news of his graduation spread throughout the school."
  },
  {
    id: 804,
    root: 'serap',
    targetWord: 'terserap',
    sentence: 'Air hujan ___ ke dalam tanah.',
    hint: 'is absorbed',
    explanation: "The root 'serap' (absorb) takes the prefix 'ter-' to form the passive verb 'terserap' (absorbed). Rainwater is absorbed into the ground."
  },
  {
    id: 806,
    root: 'sedia',
    targetWord: 'tersedia',
    sentence: 'Banyak pilihan makanan ___ di kantin itu.',
    hint: 'is available, is provided',
    explanation: "The root 'sedia' (ready/provide) takes the prefix 'ter-' to form 'tersedia' (available/provided). Many food choices are available in the canteen."
  },
  {
    id: 807,
    root: 'tekan',
    targetWord: 'tertekan',
    sentence: 'Dia merasa ___ karena beban pekerjaan yang berat.',
    hint: 'is depressed',
    explanation: "The root 'tekan' (press) takes the prefix 'ter-' to form 'tertekan' (pressed down/depressed/under pressure). He feels depressed due to the heavy workload."
  },
  {
    id: 808,
    root: 'tentu',
    targetWord: 'tertentu',
    sentence: 'Hanya orang ___ yang diizinkan masuk.',
    hint: 'certain',
    explanation: "The root 'tentu' (certain/sure) takes the prefix 'ter-' to form the adjective 'tertentu' (certain/specific). Only certain people are allowed entry."
  },
  {
    id: 809,
    root: 'tantang',
    targetWord: 'tertantang',
    sentence: 'Dia merasa ___ oleh soal matematika yang sulit itu.',
    hint: 'is challenged',
    explanation: "The root 'tantang' (challenge) takes the prefix 'ter-' to form 'tertantang' (challenged). He feels challenged by the difficult math problem."
  },
  {
    id: 810,
    root: 'jual',
    targetWord: 'terjual',
    sentence: 'Rumah itu akhirnya ___ setelah lama ditawarkan.',
    hint: 'is sold',
    explanation: "The root 'jual' (sell) takes the prefix 'ter-' to form the passive verb 'terjual' (sold/has been sold). The house was finally sold after being offered for a long time."
  },
  {
    id: 812,
    root: 'timbul',
    targetWord: 'timbul',
    sentence: 'Masalah bisa ___ jika tidak ada komunikasi.',
    hint: 'arise',
    explanation: "This is the root word used as an intransitive verb. 'Timbul' (to arise/emerge) fits directly. Problems can arise if there's no communication. No affix needed here."
  },
  {
    id: 813,
    root: 'timbang',
    targetWord: 'timbangan',
    sentence: 'Letakkan barang di atas ___ untuk mengetahui beratnya.',
    hint: 'weighing scale',
    explanation: "The root 'timbang' (weigh) takes the suffix '-an' to form the noun 'timbangan' (scale/balance), the tool for weighing."
  },
  {
    id: 814,
    root: 'tindak',
    targetWord: 'tindakan',
    sentence: '___ tegas akan diambil terhadap pelanggar aturan.',
    hint: 'act, action',
    explanation: "The root 'tindak' (act/step) takes the suffix '-an' to form the noun 'tindakan' (action). Firm action will be taken against rule violators."
  },
  {
    id: 816,
    root: 'tumbuh',
    targetWord: 'bertumbuh', // Often 'tumbuh' itself is used, but 'bertumbuh' emphasizes the process
    sentence: 'Anak itu ___ menjadi remaja yang cerdas.',
    hint: 'to grow',
    explanation: "The root 'tumbuh' (grow) takes the prefix 'ber-' to form 'bertumbuh' (to grow/be growing), emphasizing the process. The child grew into a smart teenager. ('Tumbuh' alone also works here)."
  },
  {
    id: 817,
    root: 'tumbuh',
    targetWord: 'tumbuhan',
    sentence: '___ memerlukan air dan sinar matahari.',
    hint: 'plant',
    explanation: "The root 'tumbuh' (grow) takes the suffix '-an' to form the noun 'tumbuhan' (plant), the thing that grows."
  },
  {
    id: 818,
    root: 'tuju',
    targetWord: 'tujuan',
    sentence: 'Apa ___ Anda datang ke sini?',
    hint: 'destination; purpose', // Corrected hint
    explanation: "The root 'tuju' (head towards/aim) takes the suffix '-an' to form the noun 'tujuan' (destination/purpose/goal). What is your purpose in coming here?"
  },
  {
    id: 819,
    root: 'ukur',
    targetWord: 'ukuran',
    sentence: 'Baju ini tersedia dalam berbagai ___.' ,
    hint: 'size, measurement',
    explanation: "The root 'ukur' (measure) takes the suffix '-an' to form the noun 'ukuran' (size/measurement). This shirt is available in various sizes."
  },
  {
    id: 821,
    root: 'umum',
    targetWord: 'umumnya',
    sentence: '___, hari Minggu adalah hari libur.',
    hint: 'generally',
    explanation: "The root 'umum' (general/public) takes the suffix '-nya' (often acting as an adverbializer) to form 'umumnya' (generally). Generally, Sunday is a holiday."
  },
  {
    id: 823,
    root: 'unggul',
    targetWord: 'unggulan',
    sentence: 'Produk ___ kami selalu laris di pasaran.',
    hint: 'the superior, the favored',
    explanation: "The root 'unggul' (superior) takes the suffix '-an' to form the noun/adjective 'unggulan' (flagship/superior/favored). Our flagship product always sells well."
  },
  {
    id: 824,
    root: 'untung',
    targetWord: 'untung',
    sentence: 'Dia mendapat ___ besar dari investasinya.',
    hint: 'profit',
    explanation: "This is the root word used as a noun. 'Untung' (profit/luck) fits directly. He got a big profit from his investment. No affix needed here."
  },
  {
    id: 825,
    root: 'upaya',
    targetWord: 'upaya',
    sentence: '___ kerasnya akhirnya membuahkan hasil.',
    hint: 'effort',
    explanation: "This is the root word used as a noun. 'Upaya' (effort) fits directly. His hard effort finally paid off. No affix needed here."
  },
  {
    id: 826,
    root: 'usaha',
    targetWord: 'usaha',
    sentence: 'Membuka ___ sendiri membutuhkan modal.',
    hint: 'effort; business',
    explanation: "This is the root word used as a noun. 'Usaha' (effort/business) fits directly. Opening your own business requires capital. No affix needed here."
  },
  {
    id: 828,
    root: 'wakil',
    targetWord: 'wakil',
    sentence: '___ ketua OSIS menyampaikan sambutan.',
    hint: 'vice, deputy; representative',
    explanation: "This is the root word used as a noun/modifier. 'Wakil' (deputy/vice/representative) fits directly. The vice chairman of OSIS delivered remarks. No affix needed here."
  },
  {
    id: 830,
    root: 'wujud',
    targetWord: 'perwujudan',
    sentence: 'Pembangunan jembatan itu adalah ___ janji kampanye.',
    hint: 'actualization, embodiment',
    explanation: "The root 'wujud' (form/manifestation) takes prefix 'per-' and suffix '-an' to form the noun 'perwujudan' (embodiment/actualization). The bridge construction is the actualization of campaign promises."
  }
];

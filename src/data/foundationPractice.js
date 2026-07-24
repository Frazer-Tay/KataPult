export const storyReadingData = [
  {
    id: 1,
    title: "Sepeda Baru Ryan",
    content: "Ryan punya sepeda baru. Dia sangat senang. Ryan bersepeda di depan rumah. Teman-teman Ryan ikut main.",
    englishContent: "Ryan has a new bicycle. He is very happy. Ryan rides his bicycle in front of his house. Ryan's friends play along.",
    questions: [
      { id: 1, question: "Apa yang baru?", englishQuestion: "What is new?", prefix: "Ryan punya", englishPrefix: "Ryan has", answer: "sepeda baru", englishAnswer: "a new bicycle" },
      { id: 2, question: "Bagaimana perasaan Ryan?", englishQuestion: "How does Ryan feel?", prefix: "Ryan sangat", englishPrefix: "Ryan is very", answer: "senang", englishAnswer: "happy" },
      { id: 3, question: "Di mana Ryan bersepeda?", englishQuestion: "Where does Ryan ride his bike?", prefix: "Ryan bersepeda di depan", englishPrefix: "Ryan rides his bike in front of the", answer: "rumah", englishAnswer: "house" }
    ]
  },
  {
    id: 2,
    title: "Laba-Laba",
    content: "Ali takut laba-laba. Ada laba-laba di lemari. Ali teriak keras. Ibu datang memeluk Ali. Ibu bilang laba-laba itu kecil.",
    englishContent: "Ali is afraid of spiders. There is a spider in the closet. Ali screams loudly. Mother comes and hugs Ali. Mother says the spider is small.",
    questions: [
      { id: 1, question: "Ali takut apa?", englishQuestion: "What is Ali afraid of?", prefix: "Ali takut", englishPrefix: "Ali is afraid of", answer: "laba-laba", englishAnswer: "spiders" },
      { id: 2, question: "Di mana laba-laba itu?", englishQuestion: "Where is the spider?", prefix: "Laba-laba ada di", englishPrefix: "The spider is in the", answer: "lemari", englishAnswer: "closet" },
      { id: 3, question: "Siapa yang datang memeluk Ali?", englishQuestion: "Who comes to hug Ali?", prefix: "Yang memeluk Ali adalah", englishPrefix: "The one who hugs Ali is", answer: "Ibu", englishAnswer: "Mother" }
    ]
  },
  {
    id: 3,
    title: "Kucing Maya",
    content: "Ciko adalah kucing Maya. Ciko sedang sakit. Dia tidak mau makan. Maya bawa Ciko ke dokter hewan. Dokter kasih Ciko obat.",
    englishContent: "Ciko is Maya's cat. Ciko is sick. He doesn't want to eat. Maya brings Ciko to the vet. The vet gives Ciko medicine.",
    questions: [
      { id: 1, question: "Siapa nama kucing Maya?", englishQuestion: "What is Maya's cat's name?", prefix: "Nama kucing Maya adalah", englishPrefix: "Maya's cat's name is", answer: "Ciko", englishAnswer: "Ciko" },
      { id: 2, question: "Kenapa Ciko tidak makan?", englishQuestion: "Why is Ciko not eating?", prefix: "Ciko tidak makan karena", englishPrefix: "Ciko is not eating because he is", answer: "sakit", englishAnswer: "sick" },
      { id: 3, question: "Siapa yang kasih obat?", englishQuestion: "Who gave the medicine?", prefix: "Yang kasih obat adalah", englishPrefix: "The one who gave the medicine is the", answer: "dokter hewan", englishAnswer: "vet" }
    ]
  },
  {
    id: 4,
    title: "Kue Donat",
    content: "Ibu suka buat kue donat. Kue donat ibu sangat enak. Donat dijual di pasar. Saya suka makan donat.",
    englishContent: "Mother likes to make donuts. Mother's donuts are very delicious. The donuts are sold at the market. I like eating donuts.",
    questions: [
      { id: 1, question: "Siapa yang buat kue?", englishQuestion: "Who makes the cakes?", prefix: "Yang buat kue adalah", englishPrefix: "The one who makes the cakes is", answer: "Ibu", englishAnswer: "Mother" },
      { id: 2, question: "Kue apa yang dibuat?", englishQuestion: "What cake is made?", prefix: "Ibu buat kue", englishPrefix: "Mother makes", answer: "donat", englishAnswer: "donuts" },
      { id: 3, question: "Di mana kue dijual?", englishQuestion: "Where are the cakes sold?", prefix: "Kue dijual di", englishPrefix: "The cakes are sold at the", answer: "pasar", englishAnswer: "market" }
    ]
  }
];

export const dialogueData = [
  {
    id: 1,
    title: "Menabung Uang",
    dialogue: [
      { speaker: "Hafiz", text: "Mau ke mana, Raju?", englishText: "Where are you going, Raju?" },
      { speaker: "Raju", text: "Saya mau ke bank. Saya mau simpan uang.", englishText: "I am going to the bank. I want to save money." },
      { speaker: "Hafiz", text: "Ayo kita pergi sama-sama. Saya juga mau simpan uang.", englishText: "Let's go together. I also want to save money." },
      { speaker: "Raju", text: "Iya. Guru kita suruh kita rajin menabung.", englishText: "Yes. Our teacher told us to save diligently." },
      { speaker: "Hafiz", text: "Ayo naik bus sekarang.", englishText: "Let's take the bus now." }
    ],
    questions: [
      {
        id: 1,
        question: "Raju mau pergi ke mana?",
        englishQuestion: "Where does Raju want to go?",
        options: ["Ke sekolah", "Ke bank", "Ke pasar", "Ke taman"],
        englishOptions: ["To school", "To the bank", "To the market", "To the park"],
        answer: "Ke bank"
      },
      {
        id: 2,
        question: "Apa yang mau mereka lakukan?",
        englishQuestion: "What do they want to do?",
        options: ["Main bola", "Simpan uang", "Beli buku", "Makan kue"],
        englishOptions: ["Play soccer", "Save money", "Buy books", "Eat cake"],
        answer: "Simpan uang"
      },
      {
        id: 3,
        question: "Naik apa mereka pergi?",
        englishQuestion: "How are they going there?",
        options: ["Jalan kaki", "Naik bus", "Naik mobil", "Naik sepeda"],
        englishOptions: ["Walk", "Take the bus", "Take a car", "Ride a bicycle"],
        answer: "Naik bus"
      }
    ]
  }
];

export const pictureMCQData = [
  {
    id: 1,
    image: "anak_basket.png",
    question: "Apa yang dia lakukan?",
    englishQuestion: "What is he doing?",
    options: [
      { text: "Bermain bola basket", englishText: "Playing basketball", isCorrect: true },
      { text: "Bermain sepak bola", englishText: "Playing soccer", isCorrect: false },
      { text: "Berenang di kolam", englishText: "Swimming in a pool", isCorrect: false }
    ]
  },
  {
    id: 2,
    image: "anak_cuci_piring.png",
    question: "Apa yang dia lakukan?",
    englishQuestion: "What is he doing?",
    options: [
      { text: "Dia mencuci sepatu", englishText: "He is washing shoes", isCorrect: false },
      { text: "Dia mencuci piring", englishText: "He is washing dishes", isCorrect: true },
      { text: "Dia mencuci tangan", englishText: "He is washing hands", isCorrect: false }
    ]
  },
  {
    id: 3,
    image: "anak_masak.png",
    question: "Anak ini sedang...",
    englishQuestion: "This child is...",
    options: [
      { text: "Memasak telur", englishText: "Cooking eggs", isCorrect: true },
      { text: "Memasak nasi", englishText: "Cooking rice", isCorrect: false },
      { text: "Membaca buku", englishText: "Reading a book", isCorrect: false }
    ]
  },
  {
    id: 4,
    image: "anak_anjing.png",
    question: "Berapa banyak anjing?",
    englishQuestion: "How many dogs?",
    options: [
      { text: "Ada satu anjing", englishText: "There is one dog", isCorrect: false },
      { text: "Ada tiga anjing", englishText: "There are three dogs", isCorrect: true },
      { text: "Ada lima anjing", englishText: "There are five dogs", isCorrect: false }
    ]
  },
  {
    id: 5,
    image: "bebek_renang.png",
    question: "Siapa yang berenang?",
    englishQuestion: "Who is swimming?",
    options: [
      { text: "Ayam berenang", englishText: "Chicken swimming", isCorrect: false },
      { text: "Burung terbang", englishText: "Bird flying", isCorrect: false },
      { text: "Bebek berenang", englishText: "Duck swimming", isCorrect: true }
    ]
  },
  {
    id: 6,
    image: "petani.png",
    question: "Apa pekerjaan dia?",
    englishQuestion: "What is his job?",
    options: [
      { text: "Dia seorang polisi", englishText: "He is a police officer", isCorrect: false },
      { text: "Dia seorang dokter", englishText: "He is a doctor", isCorrect: false },
      { text: "Dia seorang petani", englishText: "He is a farmer", isCorrect: true }
    ]
  }
];

export const matchingData = [
  {
    id: 1,
    title: "Kegiatan Siang dan Malam",
    pairs: [
      { image: "belajar_siang.png", text: "Belajar di sekolah (Siang)", englishText: "Learning at school (Day)" },
      { image: "bermain_siang.png", text: "Bermain di luar (Siang)", englishText: "Playing outside (Day)" },
      { image: "belajar_malam.png", text: "Belajar pakai lampu (Malam)", englishText: "Learning using a lamp (Night)" },
      { image: "tidur_malam.png", text: "Tidur di kasur (Malam)", englishText: "Sleeping in bed (Night)" }
    ]
  }
];

export const sequencingData = [
  {
    id: 1,
    title: "Cara Masak Nasi",
    steps: [
      { text: "Cuci beras dengan air bersih.", englishText: "Wash the rice with clean water." },
      { text: "Masukkan beras ke dalam panci.", englishText: "Put the rice into the pot." },
      { text: "Colokkan kabel listrik.", englishText: "Plug in the power cable." },
      { text: "Tekan tombol untuk masak.", englishText: "Press the button to cook." }
    ]
  },
  {
    id: 2,
    title: "Buat Es Buah",
    steps: [
      { text: "Potong buah kecil-kecil.", englishText: "Cut fruits into small pieces." },
      { text: "Taruh buah di dalam mangkuk.", englishText: "Put the fruits in a bowl." },
      { text: "Tuang air manis dan es batu.", englishText: "Pour sweet water and ice cubes." },
      { text: "Es buah siap diminum.", englishText: "The fruit ice is ready to drink." }
    ]
  }
];

export const comparisonData = [
  {
    id: 1,
    question: "Berat 1 boneka = ... apel.",
    englishQuestion: "Weight of 1 doll = ... apples.",
    image: "boneka_apel.png",
    options: ["Tiga", "Empat"],
    englishOptions: ["Three", "Four"],
    answer: "Empat"
  },
  {
    id: 2,
    question: "Satu tas ... dari apel.",
    englishQuestion: "One bag is ... than the apples.",
    image: "tas_apel.png",
    options: ["Lebih ringan", "Lebih berat"],
    englishOptions: ["Lighter", "Heavier"],
    answer: "Lebih berat"
  },
  {
    id: 3,
    question: "Satu pensil ... dari bola.",
    englishQuestion: "One pencil case is ... than the balls.",
    image: "pensil_bola.png",
    options: ["Lebih ringan", "Lebih berat"],
    englishOptions: ["Lighter", "Heavier"],
    answer: "Lebih ringan"
  },
  {
    id: 4,
    question: "Satu labu ... dengan 4 apel.",
    englishQuestion: "One pumpkin is ... with 4 apples.",
    image: "labu_apel.png",
    options: ["Sama berat", "Berbeda"],
    englishOptions: ["Same weight", "Different"],
    answer: "Sama berat"
  }
];

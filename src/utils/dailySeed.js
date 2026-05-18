import { vocabularyData } from '../data/vocabulary';
import { imbuhanData } from '../data/imbuhan';
import { persamaanData } from '../data/persamaan';

// Seeded PRNG utility (Mulberry32)
function xmur3(str) {
  let h = 1779033703 ^ str.length;
  for(let i = 0; i < str.length; i++) {
      h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
      h = (h << 13) | (h >>> 19);
  } 
  return function() {
      h = Math.imul(h ^ (h >>> 16), 2246822507);
      h = Math.imul(h ^ (h >>> 13), 3266489909);
      return (h ^= h >>> 16) >>> 0;
  }
}

function mulberry32(a) {
  return function() {
    let t = a += 0x6D2B79F5;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
}

// Fisher-Yates shuffle using our seeded PRNG
function seededShuffle(array, randomFunc) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(randomFunc() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

export function getDailyChallengeData(dateString) {
  // Use dateString as the seed (e.g., "2026-04-27")
  const seed = xmur3(dateString)();
  const randomFunc = mulberry32(seed);

  // 1. Pick 4 Vocabulary words
  const validVocab = vocabularyData.filter(item => item.word && item.definition && item.level === 2);
  const shuffledVocab = seededShuffle([...validVocab], randomFunc).slice(0, 4);
  const vocabQuestions = shuffledVocab.map(v => {
    // Generate 3 wrong options for MCQ
    const otherVocab = seededShuffle([...validVocab.filter(item => item.word !== v.word)], randomFunc).slice(0, 3);
    const options = seededShuffle([v.word, ...otherVocab.map(o => o.word)], randomFunc);
    
    return {
      type: 'vocab',
      id: `vocab-${v.id}`,
      question: `Apa terjemahan/kata yang tepat untuk definisi: "${v.definition}"?`,
      example: v.exampleSentence,
      correctAnswer: v.word,
      options: options,
      explanation: v.exampleTranslation
    };
  });

  // 2. Pick 3 Imbuhan questions
  const validImbuhan = imbuhanData.filter(item => item.root && item.targetWord && item.sentence);
  const shuffledImbuhan = seededShuffle([...validImbuhan], randomFunc).slice(0, 3);
  const imbuhanQuestions = shuffledImbuhan.map(i => ({
    type: 'imbuhan',
    id: `imbuhan-${i.id}`,
    question: `Lengkapi kalimat berikut dengan bentuk kata turunan dari "${i.root}":`,
    sentence: i.sentence,
    hint: i.hint,
    correctAnswer: i.targetWord,
    explanation: i.explanation
  }));

  // 3. Pick 3 Persamaan questions
  const validPersamaan = persamaanData.filter(item => item.word && item.synonyms && item.synonyms.length > 0 && item.example_sentence_target);
  const shuffledPersamaan = seededShuffle([...validPersamaan], randomFunc).slice(0, 3);
  const persamaanQuestions = shuffledPersamaan.map(p => {
    // Get correct synonym
    const correctSynonymObj = seededShuffle([...p.synonyms], randomFunc)[0];
    
    // Get 3 wrong options
    const otherPersamaan = validPersamaan.filter(item => item.word !== p.word);
    const wrongOptions = [];
    while (wrongOptions.length < 3) {
      const randomWord = otherPersamaan[Math.floor(randomFunc() * otherPersamaan.length)];
      if (randomWord.synonyms && randomWord.synonyms.length > 0) {
        wrongOptions.push(randomWord.synonyms[0].synonym);
      }
    }
    
    const options = seededShuffle([correctSynonymObj.synonym, ...wrongOptions], randomFunc);

    return {
      type: 'persamaan',
      id: `persamaan-${p.id}`,
      question: `Carikan persamaan kata (sinonim) untuk kata: "${p.word}"`,
      example: p.example_sentence_target,
      correctAnswer: correctSynonymObj.synonym,
      options: options
    };
  });

  // Combine and shuffle the final 10 questions
  const combinedQuestions = [...vocabQuestions, ...imbuhanQuestions, ...persamaanQuestions];
  return seededShuffle(combinedQuestions, randomFunc);
}

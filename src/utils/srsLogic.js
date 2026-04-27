// src/utils/srsLogic.js

const SRS_STORAGE_KEY = 'katapult_srs_data';

// Initialize or get SRS data
export const getSRSData = () => {
  const data = localStorage.getItem(SRS_STORAGE_KEY);
  return data ? JSON.parse(data) : {};
};

// Save SRS data
export const saveSRSData = (data) => {
  localStorage.setItem(SRS_STORAGE_KEY, JSON.stringify(data));
};

/**
 * Update a word's SRS stats based on user performance.
 * 
 * @param {string} wordId - Unique identifier for the word (could be the word itself)
 * @param {number} quality - 0 (Hard/Fail), 1 (Good), 2 (Easy)
 */
export const updateWordSRS = (wordId, quality) => {
  const data = getSRSData();
  const now = new Date().getTime();
  const ONE_DAY = 24 * 60 * 60 * 1000;

  let item = data[wordId];

  // Default values for new words
  if (!item) {
    item = { interval: 0, ease: 2.5, repetitions: 0, nextReview: now };
  }

  // Simplified SM-2 inspired algorithm
  if (quality === 0) { // Hard / Lupa
    item.repetitions = 0;
    item.interval = 1; // review tomorrow
    item.ease = Math.max(1.3, item.ease - 0.2); // decrease ease
  } else {
    // Good (1) or Easy (2)
    if (item.repetitions === 0) {
      item.interval = 1;
    } else if (item.repetitions === 1) {
      item.interval = 6;
    } else {
      // Increase ease if Easy
      if (quality === 2) {
        item.ease += 0.15;
      }
      item.interval = Math.round(item.interval * item.ease);
    }
    item.repetitions += 1;
  }

  item.nextReview = now + (item.interval * ONE_DAY);
  data[wordId] = item;
  saveSRSData(data);
};

// Get words that are due for review today
export const getDueWords = (allVocabularyWords) => {
  const data = getSRSData();
  const now = new Date().getTime();
  
  const dueWords = [];
  const newWords = [];

  allVocabularyWords.forEach(wordObj => {
    const wordId = wordObj.malay; // Using the indonesian word as ID
    const srsItem = data[wordId];
    
    if (srsItem) {
      if (srsItem.nextReview <= now) {
        dueWords.push(wordObj);
      }
    } else {
      newWords.push(wordObj);
    }
  });

  return { dueWords, newWords };
};

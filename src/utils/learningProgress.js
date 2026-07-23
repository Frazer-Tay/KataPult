const STORAGE_PREFIX = 'katapult_learning_progress_v1';
export const LEARNING_PROGRESS_EVENT = 'katapult:learning-progress';

const LEARNING_ROUTES = [
  { prefix: '/level1/vocabulary', title: 'Level 1 Vocabulary', icon: 'book', tone: 'violet' },
  { prefix: '/level1/reading', title: 'Reading Comprehension', icon: 'book', tone: 'blue' },
  { prefix: '/level1/sentence', title: 'Sentence Practice', icon: 'sentence', tone: 'cyan' },
  { prefix: '/level1/imbuhan-practice', title: 'Level 1 Imbuhan', icon: 'link', tone: 'green' },
  { prefix: '/level1/cloze', title: 'Cloze Practice', icon: 'puzzle', tone: 'orange' },
  { prefix: '/level1/writing', title: 'Writing Practice', icon: 'pen', tone: 'pink' },
  { prefix: '/level1/surat', title: 'Formal Letters', icon: 'pen', tone: 'violet' },
  { prefix: '/foundation/reading', title: 'Foundation Reading', icon: 'book', tone: 'blue' },
  { prefix: '/foundation/dialogue', title: 'Foundation Dialogue', icon: 'chat', tone: 'cyan' },
  { prefix: '/foundation/picture', title: 'Picture Practice', icon: 'image', tone: 'orange' },
  { prefix: '/foundation/matching', title: 'Matching Practice', icon: 'matching', tone: 'green' },
  { prefix: '/foundation/sequencing', title: 'Sequencing Practice', icon: 'sequencing', tone: 'violet' },
  { prefix: '/persamaan-latihan', title: 'Synonym Recall', icon: 'pen', tone: 'blue' },
  { prefix: '/test/imbuhan', title: 'Imbuhan Test', icon: 'clipboard', tone: 'red' },
  { prefix: '/test/persamaan', title: 'Synonym Test', icon: 'clipboard', tone: 'red' },
  { prefix: '/daily-challenge', title: 'Daily Challenge', icon: 'trophy', tone: 'orange' },
  { prefix: '/vocabulary', title: 'Vocabulary', icon: 'brain', tone: 'violet' },
  { prefix: '/flashcards', title: 'Essay Bank', icon: 'layers', tone: 'pink' },
  { prefix: '/persamaan', title: 'Synonym MCQ', icon: 'matching', tone: 'cyan' },
  { prefix: '/karangan', title: 'Essay Vocabulary', icon: 'sentence', tone: 'orange' },
  { prefix: '/imbuhan', title: 'Imbuhan', icon: 'link', tone: 'green' },
  { prefix: '/surat', title: 'Formal Letters', icon: 'pen', tone: 'violet' }
];

const storageKey = (userId) => `${STORAGE_PREFIX}:${userId || 'guest'}`;
const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export const getLearningRouteMeta = (route = '') => (
  LEARNING_ROUTES.find(({ prefix }) => route === prefix || route.startsWith(`${prefix}/`)) || null
);

export const readLearningProgress = (userId) => {
  if (typeof window === 'undefined') return {};

  try {
    const parsed = JSON.parse(window.localStorage.getItem(storageKey(userId)) || '{}');
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {};
  } catch {
    return {};
  }
};

const writeEntry = (userId, route, update) => {
  if (typeof window === 'undefined' || !userId || !getLearningRouteMeta(route)) return;

  const current = readLearningProgress(userId);
  const previous = current[route] || {};
  const next = {
    ...current,
    [route]: {
      ...previous,
      ...update,
      route,
      lastActivityAt: new Date().toISOString()
    }
  };

  try {
    window.localStorage.setItem(storageKey(userId), JSON.stringify(next));
    window.dispatchEvent(new CustomEvent(LEARNING_PROGRESS_EVENT, { detail: { userId, route } }));
  } catch {
    // Learning history is a convenience feature; storage restrictions must never block practice.
  }
};

export const recordLearningVisit = ({ userId, route, section }) => {
  const meta = getLearningRouteMeta(route);
  if (!meta) return;
  writeEntry(userId, route, { title: meta.title || section });
};

export const recordLearningProgress = ({ userId, route, label, current, total }) => {
  if (!Number.isFinite(Number(total)) || Number(total) <= 0) return;

  const safeTotal = Math.max(1, Math.round(Number(total)));
  const safeCurrent = clamp(Math.round(Number(current) || 0), 0, safeTotal);
  writeEntry(userId, route, {
    label: label || 'Progress',
    current: safeCurrent,
    total: safeTotal,
    percentage: Math.round((safeCurrent / safeTotal) * 100)
  });
};

export const getLearningSummary = (userId) => {
  const entries = Object.values(readLearningProgress(userId))
    .filter((entry) => entry?.route && getLearningRouteMeta(entry.route))
    .map((entry) => ({ ...getLearningRouteMeta(entry.route), ...entry }))
    .sort((a, b) => new Date(b.lastActivityAt || 0) - new Date(a.lastActivityAt || 0));

  return {
    entries,
    continueEntry: entries.find((entry) => (entry.percentage ?? 0) < 100) || entries[0] || null
  };
};

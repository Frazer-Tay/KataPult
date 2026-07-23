import {
  getLearningRouteMeta,
  getLearningSummary,
  recordLearningProgress,
  recordLearningVisit
} from './learningProgress';

describe('learning progress', () => {
  const userId = 'test-user';

  beforeEach(() => {
    window.localStorage.clear();
  });

  it('recognizes practice routes and ignores non-learning routes', () => {
    expect(getLearningRouteMeta('/vocabulary')?.title).toBe('Vocabulary');
    expect(getLearningRouteMeta('/dashboard')).toBeNull();
  });

  it('stores resumable progress per user', () => {
    recordLearningVisit({ userId, route: '/imbuhan', section: 'Imbuhan' });
    recordLearningProgress({ userId, route: '/imbuhan', label: 'Set 2', current: 4, total: 10 });

    const summary = getLearningSummary(userId);
    expect(summary.continueEntry).toMatchObject({
      route: '/imbuhan',
      label: 'Set 2',
      percentage: 40
    });
    expect(getLearningSummary('different-user').entries).toHaveLength(0);
  });

  it('clamps invalid progress without throwing', () => {
    recordLearningProgress({ userId, route: '/persamaan', current: 99, total: 10 });
    expect(getLearningSummary(userId).continueEntry.percentage).toBe(100);
  });
});

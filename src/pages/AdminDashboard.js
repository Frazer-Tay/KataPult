import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { collection, doc, getDocs, orderBy, query, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import styles from './AdminDashboard.module.css';

const formatDuration = (seconds = 0) => {
  const safeSeconds = Math.max(0, Math.round(seconds || 0));
  const hours = Math.floor(safeSeconds / 3600);
  const minutes = Math.floor((safeSeconds % 3600) / 60);

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }

  if (minutes > 0) {
    return `${minutes}m`;
  }

  return `${safeSeconds}s`;
};

const formatDate = (timestamp) => {
  if (!timestamp) {
    return 'No activity yet';
  }

  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);

  if (Number.isNaN(date.getTime())) {
    return 'No activity yet';
  }

  return new Intl.DateTimeFormat('en-SG', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(date);
};

const getTimestampMillis = (timestamp) => {
  if (!timestamp) {
    return 0;
  }

  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return Number.isNaN(date.getTime()) ? 0 : date.getTime();
};

const getTopSections = (sectionTotals = {}, limit = 3) => (
  Object.values(sectionTotals)
    .map((section) => ({
      name: section.name || 'Unknown',
      seconds: section.seconds || 0,
      visits: section.visits || 0,
      attempts: section.attempts || 0,
      correct: section.correct || 0
    }))
    .sort((a, b) => b.seconds - a.seconds)
    .slice(0, limit)
);

const getSectionKey = (section = 'unknown') => (
  section
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '') || 'unknown'
);

const emptyActivity = () => ({
  totalSessionSeconds: 0,
  totalSectionSeconds: 0,
  totalAttempts: 0,
  totalCorrect: 0,
  totalIncorrect: 0,
  testsCompleted: 0,
  totalScore: 0,
  xpEarned: 0,
  lastSeenAt: null,
  lastRoute: '',
  sectionTotals: {}
});

const buildActivityFromEvents = (eventDocs) => {
  const activityByUid = new Map();

  eventDocs.forEach((docSnap) => {
    const event = docSnap.data();

    if (!event.uid) {
      return;
    }

    const activity = activityByUid.get(event.uid) || emptyActivity();
    const sectionName = event.section || 'Unknown';
    const sectionKey = getSectionKey(sectionName);
    const section = activity.sectionTotals[sectionKey] || {
      name: sectionName,
      seconds: 0,
      visits: 0,
      attempts: 0,
      correct: 0,
      incorrect: 0
    };
    const duration = Number.isFinite(event.durationSeconds) ? Math.max(0, event.durationSeconds) : 0;

    activity.lastSeenAt = getTimestampMillis(event.createdAt) >= getTimestampMillis(activity.lastSeenAt)
      ? event.createdAt
      : activity.lastSeenAt;
    activity.lastRoute = event.route || activity.lastRoute;

    if (event.eventType === 'section_visit') {
      section.visits += 1;
      section.lastRoute = event.route || '';
      section.lastSeenAt = event.createdAt || null;
    }

    if (event.eventType === 'section_time') {
      activity.totalSectionSeconds += duration;
      section.seconds += duration;
      section.lastRoute = event.route || '';
      section.lastSeenAt = event.createdAt || null;
    }

    if (event.eventType === 'session_time') {
      activity.totalSessionSeconds += duration;
    }

    if (event.eventType === 'answer_attempt') {
      activity.totalAttempts += 1;
      activity.totalCorrect += event.correct ? 1 : 0;
      activity.totalIncorrect += event.correct ? 0 : 1;
      section.attempts += 1;
      section.correct += event.correct ? 1 : 0;
      section.incorrect += event.correct ? 0 : 1;
    }

    if (event.eventType === 'test_result') {
      activity.testsCompleted += event.completed ? 1 : 0;
      activity.totalScore += Number.isFinite(event.score) ? event.score : 0;
      section.testsCompleted = (section.testsCompleted || 0) + (event.completed ? 1 : 0);
      section.score = (section.score || 0) + (Number.isFinite(event.score) ? event.score : 0);
    }

    if (event.eventType === 'xp_awarded') {
      activity.xpEarned += Number.isFinite(event.xpAmount) ? event.xpAmount : 0;
    }

    activity.sectionTotals[sectionKey] = section;
    activityByUid.set(event.uid, activity);
  });

  return activityByUid;
};

const formatAccuracy = (correct = 0, attempts = 0) => {
  if (!attempts) {
    return 'No attempts';
  }

  return `${Math.round((correct / attempts) * 100)}%`;
};

const AdminDashboard = () => {
  const [learners, setLearners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [feedback, setFeedback] = useState([]);

  const loadLearners = useCallback(async () => {
    try {
      setError('');
      setIsLoading(true);

      const [usersSnapshot, activitySnapshot, eventSnapshot, feedbackSnapshot] = await Promise.all([
        getDocs(query(collection(db, 'users'), orderBy('createdAt', 'desc'))),
        getDocs(collection(db, 'learnerActivity')),
        getDocs(query(collection(db, 'activityEvents'), orderBy('createdAt', 'desc'))),
        getDocs(query(collection(db, 'feedback'), orderBy('createdAt', 'desc')))
      ]);

      const activityByUid = new Map();
      activitySnapshot.forEach((docSnap) => {
        activityByUid.set(docSnap.id, docSnap.data());
      });

      const eventActivityByUid = buildActivityFromEvents(eventSnapshot.docs || []);

      const combinedLearners = [];
      usersSnapshot.forEach((docSnap) => {
        const user = docSnap.data();
        const activity = eventActivityByUid.get(docSnap.id) || activityByUid.get(docSnap.id) || {};

        combinedLearners.push({
          id: docSnap.id,
          ...user,
          activity,
          totalSessionSeconds: activity.totalSessionSeconds || 0,
          totalSectionSeconds: activity.totalSectionSeconds || 0,
          totalAttempts: activity.totalAttempts || 0,
          totalCorrect: activity.totalCorrect || 0,
          testsCompleted: activity.testsCompleted || 0,
          xpEarned: activity.xpEarned || 0,
          lastSeenAt: activity.lastSeenAt || user.createdAt || null,
          topSections: getTopSections(activity.sectionTotals)
        });
      });

      setLearners(combinedLearners);
      setFeedback(feedbackSnapshot.docs?.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data()
      })) || []);
    } catch (err) {
      console.error('Failed to load admin dashboard:', err);
      setError('Could not load learner analytics. Check that your account has the admin role and Firestore rules are deployed.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadLearners();
  }, [loadLearners]);

  const filteredLearners = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    if (!term) {
      return learners;
    }

    return learners.filter((learner) => (
      learner.username?.toLowerCase().includes(term)
      || learner.email?.toLowerCase().includes(term)
      || learner.displayName?.toLowerCase().includes(term)
    ));
  }, [learners, searchTerm]);

  const dashboardStats = useMemo(() => {
    const now = Date.now();
    const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;
    const trackedLearners = learners.filter((learner) => learner.role !== 'admin');
    const learnerCount = trackedLearners.length;
    const totalSeconds = trackedLearners.reduce((sum, learner) => sum + learner.totalSectionSeconds, 0);
    const totalAttempts = trackedLearners.reduce((sum, learner) => sum + learner.totalAttempts, 0);
    const totalCorrect = trackedLearners.reduce((sum, learner) => sum + learner.totalCorrect, 0);
    const activeThisWeek = trackedLearners.filter((learner) => (
      now - getTimestampMillis(learner.lastSeenAt) <= sevenDaysMs
    )).length;
    const allSections = new Map();

    trackedLearners.forEach((learner) => {
      Object.values(learner.activity?.sectionTotals || {}).forEach((section) => {
        const key = section.name || 'Unknown';
        const existing = allSections.get(key) || { name: key, seconds: 0, visits: 0, attempts: 0, correct: 0 };
        existing.seconds += section.seconds || 0;
        existing.visits += section.visits || 0;
        existing.attempts += section.attempts || 0;
        existing.correct += section.correct || 0;
        allSections.set(key, existing);
      });
    });

    const topSections = Array.from(allSections.values())
      .sort((a, b) => b.seconds - a.seconds)
      .slice(0, 6);

    return {
      learnerCount,
      activeThisWeek,
      totalSeconds,
      totalAttempts,
      totalCorrect,
      averageSeconds: learnerCount ? totalSeconds / learnerCount : 0,
      topSections
    };
  }, [learners]);

  const sortedLearners = useMemo(() => (
    [...filteredLearners].sort((a, b) => (
      getTimestampMillis(b.lastSeenAt) - getTimestampMillis(a.lastSeenAt)
    ))
  ), [filteredLearners]);

  const maxSectionSeconds = Math.max(...dashboardStats.topSections.map((section) => section.seconds), 1);

  const markFeedbackReviewed = async (feedbackId) => {
    try {
      await updateDoc(doc(db, 'feedback', feedbackId), {
        status: 'reviewed',
        updatedAt: serverTimestamp()
      });
      setFeedback((items) => items.map((item) => (
        item.id === feedbackId ? { ...item, status: 'reviewed' } : item
      )));
    } catch (err) {
      console.error('Failed to update feedback status:', err);
      setError('Could not update feedback status. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <section className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Admin overview</p>
          <h1 className={styles.title}>Learner engagement</h1>
          <p className={styles.subtitle}>
            Track who is studying, where they spend time, and which practice areas are drawing the most attention.
          </p>
        </div>
        <button className={styles.refreshButton} onClick={loadLearners} disabled={isLoading}>
          {isLoading ? 'Refreshing...' : 'Refresh'}
        </button>
      </section>

      {error && <div className={styles.error}>{error}</div>}

      <section className={styles.metricGrid} aria-label="Learner activity summary">
        <div className={styles.metricCard}>
          <div className={styles.metricLabel}>Learners</div>
          <div className={styles.metricValue}>{dashboardStats.learnerCount}</div>
          <div className={styles.metricHint}>registered accounts</div>
        </div>
        <div className={styles.metricCard}>
          <div className={styles.metricLabel}>Active 7 days</div>
          <div className={styles.metricValue}>{dashboardStats.activeThisWeek}</div>
          <div className={styles.metricHint}>seen this week</div>
        </div>
        <div className={styles.metricCard}>
          <div className={styles.metricLabel}>Study time</div>
          <div className={styles.metricValue}>{formatDuration(dashboardStats.totalSeconds)}</div>
          <div className={styles.metricHint}>across all sections</div>
        </div>
        <div className={styles.metricCard}>
          <div className={styles.metricLabel}>Attempts</div>
          <div className={styles.metricValue}>{dashboardStats.totalAttempts}</div>
          <div className={styles.metricHint}>{formatAccuracy(dashboardStats.totalCorrect, dashboardStats.totalAttempts)} accuracy</div>
        </div>
      </section>

      <section className={styles.panel}>
        <div className={styles.panelHeader}>
          <h2 className={styles.panelTitle}>Most-used sections</h2>
        </div>
        {dashboardStats.topSections.length === 0 ? (
          <div className={styles.empty}>No section activity has been recorded yet.</div>
        ) : (
          <div className={styles.sectionGrid}>
            {dashboardStats.topSections.map((section) => (
              <div className={styles.sectionRow} key={section.name}>
                <div>
                  <div className={styles.sectionName}>{section.name}</div>
                  <div className={styles.sectionVisits}>
                    {section.visits} visit{section.visits === 1 ? '' : 's'} · {section.attempts || 0} attempt{section.attempts === 1 ? '' : 's'} · {formatAccuracy(section.correct, section.attempts)}
                  </div>
                </div>
                <div className={styles.barTrack} aria-hidden="true">
                  <div
                    className={styles.barFill}
                    style={{ width: `${Math.max(4, (section.seconds / maxSectionSeconds) * 100)}%` }}
                  />
                </div>
                <div className={styles.sectionTime}>{formatDuration(section.seconds)}</div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className={styles.panel}>
        <div className={styles.panelHeader}>
          <h2 className={styles.panelTitle}>Learners</h2>
          <input
            className={styles.searchInput}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search learners"
            type="search"
            value={searchTerm}
          />
        </div>

        {isLoading ? (
          <div className={styles.empty}>Loading learner analytics...</div>
        ) : sortedLearners.length === 0 ? (
          <div className={styles.empty}>No learners match this search.</div>
        ) : (
          <div className={styles.learnerList}>
            {sortedLearners.map((learner) => (
              <article className={styles.learnerCard} key={learner.id}>
                <div className={styles.learnerIdentity}>
                  <div className={styles.learnerName}>{learner.username || learner.displayName || 'Unnamed learner'}</div>
                  <div className={styles.learnerEmail}>{learner.email || 'No email'}</div>
                  {learner.role === 'admin' && <div className={styles.adminBadge}>Admin</div>}
                </div>
                <div className={styles.learnerStats}>
                  <div>
                    <span className={styles.statLabel}>Last seen</span>
                    <strong>{formatDate(learner.lastSeenAt)}</strong>
                  </div>
                  <div>
                    <span className={styles.statLabel}>Section time</span>
                    <strong>{formatDuration(learner.totalSectionSeconds)}</strong>
                  </div>
                  <div>
                    <span className={styles.statLabel}>Session time</span>
                    <strong>{formatDuration(learner.totalSessionSeconds)}</strong>
                  </div>
                  <div>
                    <span className={styles.statLabel}>Attempts</span>
                    <strong>{learner.totalAttempts}</strong>
                    <span className={styles.muted}>{formatAccuracy(learner.totalCorrect, learner.totalAttempts)}</span>
                  </div>
                  <div>
                    <span className={styles.statLabel}>Progress</span>
                    <strong>Level {learner.level || 1}</strong>
                    <span className={styles.muted}>{learner.xp || 0} XP, {learner.xpEarned || 0} tracked XP, {learner.streak || 0} day streak</span>
                  </div>
                </div>
                <div className={styles.learnerSections}>
                  <span className={styles.statLabel}>Top sections</span>
                  {learner.topSections.length === 0 ? (
                    <span className={styles.muted}>No activity yet</span>
                  ) : (
                    <div className={styles.sectionPills}>
                      {learner.topSections.map((section) => (
                        <span className={styles.sectionPill} key={section.name}>
                          {section.name}: {formatDuration(section.seconds)}
                          {section.attempts ? `, ${formatAccuracy(section.correct, section.attempts)}` : ''}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className={styles.panel}>
        <div className={styles.panelHeader}>
          <h2 className={styles.panelTitle}>Feedback</h2>
        </div>
        {feedback.length === 0 ? (
          <div className={styles.empty}>No feedback has been submitted yet.</div>
        ) : (
          <div className={styles.feedbackList}>
            {feedback.slice(0, 8).map((item) => (
              <article className={styles.feedbackCard} key={item.id}>
                <div className={styles.feedbackHeader}>
                  <div>
                    <div className={styles.feedbackCategory}>{item.category || 'Feedback'}</div>
                    <div className={styles.muted}>
                      {item.displayName || item.email || 'Unknown learner'} · {formatDate(item.createdAt)}
                    </div>
                  </div>
                  <span className={item.status === 'reviewed' ? styles.reviewedBadge : styles.openBadge}>
                    {item.status || 'open'}
                  </span>
                </div>
                <p className={styles.feedbackMessage}>{item.message}</p>
                <div className={styles.feedbackFooter}>
                  {item.route && <span className={styles.muted}>{item.route}</span>}
                  {item.status !== 'reviewed' && (
                    <button className={styles.reviewButton} onClick={() => markFeedbackReviewed(item.id)}>
                      Mark reviewed
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminDashboard;

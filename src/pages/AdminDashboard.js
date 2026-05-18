import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
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
      visits: section.visits || 0
    }))
    .sort((a, b) => b.seconds - a.seconds)
    .slice(0, limit)
);

const AdminDashboard = () => {
  const [learners, setLearners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const loadLearners = useCallback(async () => {
    try {
      setError('');
      setIsLoading(true);

      const [usersSnapshot, activitySnapshot] = await Promise.all([
        getDocs(query(collection(db, 'users'), orderBy('createdAt', 'desc'))),
        getDocs(collection(db, 'learnerActivity'))
      ]);

      const activityByUid = new Map();
      activitySnapshot.forEach((docSnap) => {
        activityByUid.set(docSnap.id, docSnap.data());
      });

      const combinedLearners = [];
      usersSnapshot.forEach((docSnap) => {
        const user = docSnap.data();
        const activity = activityByUid.get(docSnap.id) || {};

        combinedLearners.push({
          id: docSnap.id,
          ...user,
          activity,
          totalSessionSeconds: activity.totalSessionSeconds || 0,
          totalSectionSeconds: activity.totalSectionSeconds || 0,
          lastSeenAt: activity.lastSeenAt || user.createdAt || null,
          topSections: getTopSections(activity.sectionTotals)
        });
      });

      setLearners(combinedLearners);
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
    const learnerCount = learners.filter((learner) => learner.role !== 'admin').length || learners.length;
    const totalSeconds = learners.reduce((sum, learner) => sum + learner.totalSectionSeconds, 0);
    const activeThisWeek = learners.filter((learner) => (
      now - getTimestampMillis(learner.lastSeenAt) <= sevenDaysMs
    )).length;
    const allSections = new Map();

    learners.forEach((learner) => {
      Object.values(learner.activity?.sectionTotals || {}).forEach((section) => {
        const key = section.name || 'Unknown';
        const existing = allSections.get(key) || { name: key, seconds: 0, visits: 0 };
        existing.seconds += section.seconds || 0;
        existing.visits += section.visits || 0;
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
          <div className={styles.metricLabel}>Average</div>
          <div className={styles.metricValue}>{formatDuration(dashboardStats.averageSeconds)}</div>
          <div className={styles.metricHint}>per learner</div>
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
                  <div className={styles.sectionVisits}>{section.visits} visit{section.visits === 1 ? '' : 's'}</div>
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
          <div className={styles.tableWrap}>
            <table className={styles.learnerTable}>
              <thead>
                <tr>
                  <th>Learner</th>
                  <th>Last seen</th>
                  <th>Section time</th>
                  <th>Session time</th>
                  <th>Progress</th>
                  <th>Top sections</th>
                </tr>
              </thead>
              <tbody>
                {sortedLearners.map((learner) => (
                  <tr key={learner.id}>
                    <td>
                      <div className={styles.learnerName}>{learner.username || learner.displayName || 'Unnamed learner'}</div>
                      <div className={styles.learnerEmail}>{learner.email || 'No email'}</div>
                      {learner.role === 'admin' && <div className={styles.muted}>Admin</div>}
                    </td>
                    <td>{formatDate(learner.lastSeenAt)}</td>
                    <td>{formatDuration(learner.totalSectionSeconds)}</td>
                    <td>{formatDuration(learner.totalSessionSeconds)}</td>
                    <td>
                      <div>Level {learner.level || 1}</div>
                      <div className={styles.muted}>{learner.xp || 0} XP, {learner.streak || 0} day streak</div>
                    </td>
                    <td>
                      {learner.topSections.length === 0 ? (
                        <span className={styles.muted}>No activity yet</span>
                      ) : (
                        <div className={styles.sectionPills}>
                          {learner.topSections.map((section) => (
                            <span className={styles.sectionPill} key={section.name}>
                              {section.name}: {formatDuration(section.seconds)}
                            </span>
                          ))}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminDashboard;

// src/App.js
import React, { useState, Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route, Link, NavLink, useLocation } from 'react-router-dom';

import ProtectedRoute from './components/ProtectedRoute';
import AnalyticsTracker from './components/AnalyticsTracker';
import { ProgressProvider, useProgress } from './contexts/ProgressContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { useSettings } from './contexts/SettingsContext';
import './App.css';
import appLogo from './assets/images/app-logo.png';
import UiIcon from './components/UiIcon';
import { LoadingState } from './components/SharedUI';

const LandingPage = lazy(() => import('./pages/LandingPage'));
const Level1Dashboard = lazy(() => import('./pages/Level1Dashboard'));
const Level1ReadingPage = lazy(() => import('./pages/Level1ReadingPage'));
const Level1SentencePage = lazy(() => import('./pages/Level1SentencePage'));
const Level1ImbuhanPage = lazy(() => import('./pages/Level1ImbuhanPage'));
const Level1ClozePage = lazy(() => import('./pages/Level1ClozePage'));
const Level1WritingPage = lazy(() => import('./pages/Level1WritingPage'));
const Level1SuratPage = lazy(() => import('./pages/Level1SuratPage'));
const HomePage = lazy(() => import('./pages/HomePage'));
const VocabularyPage = lazy(() => import('./pages/VocabularyPage'));
const ImbuhanPage = lazy(() => import('./pages/ImbuhanPage'));
const PersamaanPage = lazy(() => import('./pages/PersamaanPage'));
const PersamaanLatihanPage = lazy(() => import('./pages/PersamaanLatihanPage'));
const KaranganPage = lazy(() => import('./pages/KaranganPage'));
const FlashcardsPage = lazy(() => import('./pages/FlashcardsPage'));
const SuratResmiPage = lazy(() => import('./pages/SuratResmiPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const OnboardingPage = lazy(() => import('./pages/OnboardingPage'));
const TestSetupPage = lazy(() => import('./pages/TestSetupPage'));
const ImbuhanTestPage = lazy(() => import('./pages/ImbuhanTestPage'));
const PersamaanTestPage = lazy(() => import('./pages/PersamaanTestPage'));
const DailyChallengePage = lazy(() => import('./pages/DailyChallengePage'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const FeedbackPage = lazy(() => import('./pages/FeedbackPage'));
const ChangelogPage = lazy(() => import('./pages/ChangelogPage'));

// Foundation Pages
const FoundationDashboard = lazy(() => import('./pages/FoundationDashboard'));
const FoundationReadingPage = lazy(() => import('./pages/FoundationReadingPage'));
const FoundationDialoguePage = lazy(() => import('./pages/FoundationDialoguePage'));
const FoundationPicturePage = lazy(() => import('./pages/FoundationPicturePage'));
const FoundationMatchingPage = lazy(() => import('./pages/FoundationMatchingPage'));
const FoundationSequencingPage = lazy(() => import('./pages/FoundationSequencingPage'));

const AppContent = () => {
  const { currentUser, userData, isAdmin, logout } = useAuth();
  const { streak, xp } = useProgress();
  const { englishAssist, toggleEnglishAssist } = useSettings();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const location = useLocation();

  const toggleNav = () => setIsNavOpen(!isNavOpen);
  const closeNav = () => setIsNavOpen(false);

  const isLandingPage = location.pathname === '/';
  const isLoginPage = location.pathname === '/login';
  const isOnboardingPage = location.pathname === '/onboarding';
  const hideNav = isLandingPage || isLoginPage || isOnboardingPage;

  const isLevel1 = location.pathname.startsWith('/level1');
  const isFoundation = location.pathname.startsWith('/foundation');
  const primaryLinks = isFoundation
    ? [
        ['/foundation/reading', englishAssist ? 'Reading' : 'Membaca'],
        ['/foundation/dialogue', englishAssist ? 'Dialogue' : 'Dialog'],
        ['/foundation/picture', englishAssist ? 'Picture' : 'Gambar'],
        ['/foundation/matching', englishAssist ? 'Matching' : 'Mencocokkan'],
        ['/foundation/sequencing', englishAssist ? 'Sequencing' : 'Mengurutkan']
      ]
    : isLevel1
      ? [
          ['/level1/reading', 'Reading'],
          ['/level1/sentence', 'Sentence'],
          ['/level1/imbuhan-practice', englishAssist ? 'Affixes' : 'Imbuhan'],
          ['/level1/cloze', 'Cloze'],
          ['/level1/writing', 'Writing']
        ]
      : [
          ['/vocabulary', 'Vocabulary'],
          ['/imbuhan', englishAssist ? 'Affixes' : 'Imbuhan'],
          ['/persamaan', englishAssist ? 'Synonyms' : 'Persamaan'],
          ['/karangan', 'Essay Vocab'],
          ['/test-setup', englishAssist ? 'Tests' : 'Tes']
        ];
  const secondaryLinks = isFoundation
    ? []
    : isLevel1
      ? [
          ['/level1/vocabulary', 'Vocabulary'],
          ['/level1/surat', englishAssist ? 'Letter' : 'Surat']
        ]
      : [
          ['/persamaan-latihan', englishAssist ? 'Synonym Practice' : 'Persamaan Latihan'],
          ['/flashcards', 'Essay Bank'],
          ['/surat', englishAssist ? 'Formal Letter' : 'Surat Resmi']
        ];

  return (
    <>
      {!hideNav && (
        <header className="app-header">
          <Link to="/" className="header-brand" onClick={closeNav}>
            <img src={appLogo} alt="KataPult Logo" className="logo-image" />
            <div className="logo-text-container">
              <span className="logo-title">KataPult</span>
              <span className="logo-tagline">Bahasa Prep Companion</span>
            </div>
          </Link>
          <button className="hamburger-button" onClick={toggleNav} aria-label="Toggle navigation" aria-expanded={isNavOpen}>
            <UiIcon name={isNavOpen ? 'x' : 'menu'} size={24} />
          </button>

          <nav className={`app-nav ${isNavOpen ? 'open' : ''}`} aria-label="Learning modules">
            <div className="nav-primary-links">
              {primaryLinks.map(([to, label]) => (
                <NavLink key={to} to={to} className={({ isActive }) => isActive ? 'active-link' : ''} onClick={closeNav}>
                  {label}
                </NavLink>
              ))}
            </div>
            <details className="nav-more">
              <summary>
                {englishAssist ? 'More' : 'Lainnya'}
                <UiIcon name="chevronDown" size={15} />
              </summary>
              <div className="nav-more-menu">
                {secondaryLinks.map(([to, label]) => (
                  <NavLink key={to} to={to} className={({ isActive }) => isActive ? 'active-link' : ''} onClick={closeNav}>
                    {label}
                  </NavLink>
                ))}
                {isAdmin && <NavLink to="/changelog" className={({ isActive }) => isActive ? 'active-link' : ''} onClick={closeNav}>Changelog</NavLink>}
                {isAdmin && <NavLink to="/admin" className={({ isActive }) => isActive ? 'active-link' : ''} onClick={closeNav}>Admin</NavLink>}
              </div>
            </details>
            <div className="nav-more-mobile" aria-label={englishAssist ? 'More learning modules' : 'Modul pembelajaran lainnya'}>
              <span className="nav-more-mobile-heading">{englishAssist ? 'More' : 'Lainnya'}</span>
              <div className="nav-more-mobile-links">
                {secondaryLinks.map(([to, label]) => (
                  <NavLink key={to} to={to} className={({ isActive }) => isActive ? 'active-link' : ''} onClick={closeNav}>
                    {label}
                  </NavLink>
                ))}
                {isAdmin && <NavLink to="/changelog" className={({ isActive }) => isActive ? 'active-link' : ''} onClick={closeNav}>Changelog</NavLink>}
                {isAdmin && <NavLink to="/admin" className={({ isActive }) => isActive ? 'active-link' : ''} onClick={closeNav}>Admin</NavLink>}
              </div>
            </div>
          </nav>

          <div className="nav-profile">
            {currentUser ? (
              <div className="nav-session">
                <div className="level-tabs" aria-label="Level selector">
                  <NavLink to="/foundation" className={isFoundation ? 'active-level' : ''} onClick={closeNav}>F</NavLink>
                  <NavLink to="/level1" className={isLevel1 ? 'active-level' : ''} onClick={closeNav}>L1</NavLink>
                  <NavLink to="/dashboard" className={!isLevel1 && !isFoundation && location.pathname !== '/admin' ? 'active-level' : ''} onClick={closeNav}>L2</NavLink>
                </div>
                <div className="nav-progress-pill" aria-label={`${streak || 0} day streak, ${xp || 0} XP`}>
                  <span title="Daily streak"><UiIcon name="flame" size={16} />{streak || 0}</span>
                  <span title="Total XP"><UiIcon name="star" size={16} />{xp || 0}</span>
                </div>
                <details className="profile-menu">
                  <summary aria-label="Open profile and settings">
                    <span className="profile-avatar">{(userData?.username || currentUser.displayName || 'U').slice(0, 1).toUpperCase()}</span>
                    <span className="nav-username">{userData?.username || currentUser.displayName || 'Learner'}</span>
                    <UiIcon name="chevronDown" size={15} />
                  </summary>
                  <div className="profile-popover">
                    <div className="profile-heading">
                      <span className="profile-avatar profile-avatar-large"><UiIcon name="user" size={20} /></span>
                      <span>
                        <strong>{userData?.username || currentUser.displayName || 'Learner'}</strong>
                        <small>{currentUser.email}</small>
                      </span>
                    </div>
                    <button className="profile-action" onClick={toggleEnglishAssist} type="button">
                      <UiIcon name="globe" size={18} />
                      <span>
                        <strong>English Assist</strong>
                        <small>{englishAssist ? 'English guidance is on' : 'Indonesian immersion mode'}</small>
                      </span>
                      <span className={`setting-switch ${englishAssist ? 'on' : ''}`} aria-hidden="true"><span /></span>
                    </button>
                    <Link className="profile-action" to="/feedback" onClick={closeNav}>
                      <UiIcon name="chat" size={18} /><span><strong>Feedback</strong><small>Report an issue or share an idea</small></span>
                    </Link>
                    <button className="profile-action profile-logout" onClick={() => logout()} type="button">
                      <UiIcon name="logout" size={18} /><span><strong>Logout</strong><small>End this session</small></span>
                    </button>
                  </div>
                </details>
              </div>
            ) : (
              <Link to="/login" className="nav-login-btn">Login</Link>
            )}
          </div>
        </header>
      )}
      <main className="main-content">
        {(isLevel1 || isFoundation) && (
          <section className="level-notice" aria-label="Level content notice">
            {isFoundation ? 'Foundation Level' : 'Level 1'} is a work in progress and is being incrementally updated with relevant exam content.
          </section>
        )}
        <Suspense fallback={<LoadingState label="Memuat halaman..." />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/onboarding" element={<OnboardingPage />} />

            <Route path="/foundation" element={<ProtectedRoute><FoundationDashboard /></ProtectedRoute>} />
            <Route path="/foundation/reading" element={<ProtectedRoute><FoundationReadingPage /></ProtectedRoute>} />
            <Route path="/foundation/dialogue" element={<ProtectedRoute><FoundationDialoguePage /></ProtectedRoute>} />
            <Route path="/foundation/picture" element={<ProtectedRoute><FoundationPicturePage /></ProtectedRoute>} />
            <Route path="/foundation/matching" element={<ProtectedRoute><FoundationMatchingPage /></ProtectedRoute>} />
            <Route path="/foundation/sequencing" element={<ProtectedRoute><FoundationSequencingPage /></ProtectedRoute>} />

            <Route path="/level1" element={<ProtectedRoute><Level1Dashboard /></ProtectedRoute>} />
            <Route path="/level1/vocabulary" element={<ProtectedRoute><VocabularyPage level={1} /></ProtectedRoute>} />
            <Route path="/level1/reading" element={<ProtectedRoute><Level1ReadingPage /></ProtectedRoute>} />
            <Route path="/level1/sentence" element={<ProtectedRoute><Level1SentencePage /></ProtectedRoute>} />
            <Route path="/level1/imbuhan-practice" element={<ProtectedRoute><Level1ImbuhanPage /></ProtectedRoute>} />
            <Route path="/level1/cloze" element={<ProtectedRoute><Level1ClozePage /></ProtectedRoute>} />
            <Route path="/level1/writing" element={<ProtectedRoute><Level1WritingPage /></ProtectedRoute>} />
            <Route path="/level1/surat" element={<ProtectedRoute><Level1SuratPage /></ProtectedRoute>} />
            <Route path="/level1/changelog" element={<ProtectedRoute requireAdmin><ChangelogPage /></ProtectedRoute>} />

            <Route path="/dashboard" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
            <Route path="/vocabulary" element={<ProtectedRoute><VocabularyPage /></ProtectedRoute>} />
            <Route path="/imbuhan" element={<ProtectedRoute><ImbuhanPage /></ProtectedRoute>} />
            <Route path="/persamaan" element={<ProtectedRoute><PersamaanPage /></ProtectedRoute>} />
            <Route path="/persamaan-latihan" element={<ProtectedRoute><PersamaanLatihanPage /></ProtectedRoute>} />
            <Route path="/karangan" element={<ProtectedRoute><KaranganPage /></ProtectedRoute>} />
            <Route path="/flashcards/*" element={<ProtectedRoute><FlashcardsPage /></ProtectedRoute>} />
            <Route path="/surat" element={<ProtectedRoute><SuratResmiPage /></ProtectedRoute>} />
            <Route path="/test-setup" element={<ProtectedRoute><TestSetupPage /></ProtectedRoute>} />
            <Route path="/test/imbuhan" element={<ProtectedRoute><ImbuhanTestPage /></ProtectedRoute>} />
            <Route path="/test/persamaan" element={<ProtectedRoute><PersamaanTestPage /></ProtectedRoute>} />
            <Route path="/daily-challenge" element={<ProtectedRoute><DailyChallengePage /></ProtectedRoute>} />
            <Route path="/feedback" element={<ProtectedRoute><FeedbackPage /></ProtectedRoute>} />
            <Route path="/changelog" element={<ProtectedRoute requireAdmin><ChangelogPage /></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute requireAdmin><AdminDashboard /></ProtectedRoute>} />
          </Routes>
        </Suspense>
      </main>
      {!isLandingPage && (
        <footer className="app-footer">
          <p>&copy; {new Date().getFullYear()} KataPult. Latih Bahasa Anda!</p>
          <p className="footer-disclaimer">
            Content is compiled from publicly available learning references, online resources, user-submitted notes, and internal practice materials. KataPult is provided for revision support only; we make a good-faith effort to keep content accurate and complete, but we do not guarantee that every item is error-free, exhaustive, or endorsed by any examination body or third-party source.
          </p>
          {!hideNav && currentUser && (
            <Link to="/feedback" className="footer-feedback-link">Send feedback or report an issue</Link>
          )}
        </footer>
      )}
    </>
  );
}

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <ProgressProvider>
          <AnalyticsTracker />
          <AppContent />
        </ProgressProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;

// src/App.js
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Link, NavLink, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Level1Dashboard from './pages/Level1Dashboard';
import Level1ReadingPage from './pages/Level1ReadingPage';
import Level1SentencePage from './pages/Level1SentencePage';
import Level1ImbuhanPage from './pages/Level1ImbuhanPage';
import Level1ClozePage from './pages/Level1ClozePage';
import Level1WritingPage from './pages/Level1WritingPage';
import HomePage from './pages/HomePage';
import VocabularyPage from './pages/VocabularyPage';
import ImbuhanPage from './pages/ImbuhanPage';
import PersamaanPage from './pages/PersamaanPage';
import PersamaanLatihanPage from './pages/PersamaanLatihanPage';
import KaranganPage from './pages/KaranganPage';
import FlashcardsPage from './pages/FlashcardsPage';
import SuratResmiPage from './pages/SuratResmiPage';
import LoginPage from './pages/LoginPage';
import OnboardingPage from './pages/OnboardingPage';
import TestSetupPage from './pages/TestSetupPage';
import ImbuhanTestPage from './pages/ImbuhanTestPage';
import PersamaanTestPage from './pages/PersamaanTestPage';
import DailyChallengePage from './pages/DailyChallengePage';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import AnalyticsTracker from './components/AnalyticsTracker';
import { ProgressProvider } from './contexts/ProgressContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import './App.css';
import appLogo from './assets/images/app-logo.png';

const AppContent = () => {
  const { currentUser, userData, isAdmin, logout } = useAuth();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const location = useLocation();

  const toggleNav = () => setIsNavOpen(!isNavOpen);
  const closeNav = () => setIsNavOpen(false);

  const isLandingPage = location.pathname === '/';
  const isLoginPage = location.pathname === '/login';
  const isOnboardingPage = location.pathname === '/onboarding';
  const hideNav = isLandingPage || isLoginPage || isOnboardingPage;
  
  const isLevel1 = location.pathname.startsWith('/level1');

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
          
          <div className="nav-profile">
            {currentUser ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div className="nav-user-info">
                  <span className="nav-username">{userData?.username || currentUser.displayName}</span>
                  <button onClick={() => logout()} className="logout-btn">Logout</button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="nav-login-btn">Login</Link>
            )}
          </div>

          <button className="hamburger-button" onClick={toggleNav} aria-label="Toggle navigation" aria-expanded={isNavOpen}>
            ☰
          </button>

          <nav className={`app-nav ${isNavOpen ? 'open' : ''}`}>
            {isLevel1 ? (
              <>
                <NavLink to="/level1" end className={({ isActive }) => isActive ? "active-link" : ""} onClick={closeNav}>Level 1 Home</NavLink>
                <NavLink to="/level1/vocabulary" className={({ isActive }) => isActive ? "active-link" : ""} onClick={closeNav}>Vocabulary</NavLink>
                <NavLink to="/level1/reading" className={({ isActive }) => isActive ? "active-link" : ""} onClick={closeNav}>Reading</NavLink>
                <NavLink to="/level1/sentence" className={({ isActive }) => isActive ? "active-link" : ""} onClick={closeNav}>Sentence</NavLink>
                <NavLink to="/level1/imbuhan-practice" className={({ isActive }) => isActive ? "active-link" : ""} onClick={closeNav}>Imbuhan</NavLink>
                <NavLink to="/level1/cloze" className={({ isActive }) => isActive ? "active-link" : ""} onClick={closeNav}>Cloze</NavLink>
                <NavLink to="/level1/writing" className={({ isActive }) => isActive ? "active-link" : ""} onClick={closeNav}>Writing</NavLink>
                <NavLink to="/dashboard" className={({ isActive }) => isActive ? "active-link" : ""} onClick={closeNav}>Switch to Level 2</NavLink>
                {isAdmin && <NavLink to="/admin" className={({ isActive }) => isActive ? "active-link" : ""} onClick={closeNav}>Admin</NavLink>}
              </>
            ) : (
              <>
                <NavLink to="/dashboard" className={({ isActive }) => isActive ? "active-link" : ""} onClick={closeNav}>Level 2 Home</NavLink>
                <NavLink to="/level1" className={({ isActive }) => isActive ? "active-link" : ""} onClick={closeNav}>Level 1 Practice</NavLink>
                <NavLink to="/vocabulary" className={({ isActive }) => isActive ? "active-link" : ""} onClick={closeNav}>Vocabulary</NavLink>
                <NavLink to="/imbuhan" className={({ isActive }) => isActive ? "active-link" : ""} onClick={closeNav}>Imbuhan</NavLink>
                <NavLink to="/persamaan" className={({ isActive }) => isActive ? "active-link" : ""} onClick={closeNav}>Persamaan MCQ</NavLink>
                <NavLink to="/persamaan-latihan" className={({ isActive }) => isActive ? "active-link" : ""} onClick={closeNav}>Persamaan Latihan</NavLink>
                <NavLink to="/karangan" className={({ isActive }) => isActive ? "active-link" : ""} onClick={closeNav}>Karangan</NavLink>
                <NavLink to="/surat" className={({ isActive }) => isActive ? "active-link" : ""} onClick={closeNav}>Surat Resmi</NavLink>
                <NavLink to="/test-setup" className={({ isActive }) => isActive ? "active-link" : ""} onClick={closeNav}>Tes</NavLink>
                {isAdmin && <NavLink to="/admin" className={({ isActive }) => isActive ? "active-link" : ""} onClick={closeNav}>Admin</NavLink>}
              </>
            )}
          </nav>
        </header>
      )}
      <main className="main-content">
        {isLevel1 && (
          <section className="level-notice" aria-label="Level 1 content notice">
            Level 1 is a work in progress and is being incrementally updated with relevant exam content.
          </section>
        )}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          
          <Route path="/level1" element={<ProtectedRoute><Level1Dashboard /></ProtectedRoute>} />
          <Route path="/level1/vocabulary" element={<ProtectedRoute><VocabularyPage level={1} /></ProtectedRoute>} />
          <Route path="/level1/reading" element={<ProtectedRoute><Level1ReadingPage /></ProtectedRoute>} />
          <Route path="/level1/sentence" element={<ProtectedRoute><Level1SentencePage /></ProtectedRoute>} />
          <Route path="/level1/imbuhan-practice" element={<ProtectedRoute><Level1ImbuhanPage /></ProtectedRoute>} />
          <Route path="/level1/cloze" element={<ProtectedRoute><Level1ClozePage /></ProtectedRoute>} />
          <Route path="/level1/writing" element={<ProtectedRoute><Level1WritingPage /></ProtectedRoute>} />
          
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
          <Route path="/admin" element={<ProtectedRoute requireAdmin><AdminDashboard /></ProtectedRoute>} />
        </Routes>
      </main>
      <footer className="app-footer">
        <p>© {new Date().getFullYear()} KataPult. Latih Bahasa Anda!</p>
      </footer>
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

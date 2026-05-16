// src/App.js
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Link, NavLink, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Level1Placeholder from './pages/Level1Placeholder';
import HomePage from './pages/HomePage';
import VocabularyPage from './pages/VocabularyPage';
import ImbuhanPage from './pages/ImbuhanPage';
import PersamaanPage from './pages/PersamaanPage';
import PersamaanLatihanPage from './pages/PersamaanLatihanPage'; // Ensure this path is correct
import KaranganPage from './pages/KaranganPage';
import FlashcardsPage from './pages/FlashcardsPage';
import SuratResmiPage from './pages/SuratResmiPage';
import TestSetupPage from './pages/TestSetupPage';
import ImbuhanTestPage from './pages/ImbuhanTestPage';
import PersamaanTestPage from './pages/PersamaanTestPage';
import DailyChallengePage from './pages/DailyChallengePage';
import AnalyticsTracker from './components/AnalyticsTracker';
import { ProgressProvider } from './contexts/ProgressContext';
import './App.css';
import appLogo from './assets/images/app-logo.png';

function AppContent() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const location = useLocation();

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const closeNav = () => {
    setIsNavOpen(false);
  };

  const hideNav = location.pathname === '/' || location.pathname === '/level1';

  return (
    <>
      <header className="app-header">
        <Link to="/" className="header-brand" onClick={closeNav}>
          <img src={appLogo} alt="KataPult Logo" className="logo-image" />
          <div className="logo-text-container">
            <span className="logo-title">KataPult</span>
            <span className="logo-tagline">Bahasa Prep Companion</span>
          </div>
        </Link>
        
        {!hideNav && (
          <>
            <button className="hamburger-button" onClick={toggleNav} aria-label="Toggle navigation" aria-expanded={isNavOpen}>
              ☰
            </button>

            <nav className={`app-nav ${isNavOpen ? 'open' : ''}`}>
              <NavLink to="/dashboard" className={({ isActive }) => isActive ? "active-link" : ""} onClick={closeNav}>Beranda</NavLink>
              <NavLink to="/vocabulary" className={({ isActive }) => isActive ? "active-link" : ""} onClick={closeNav}>Vocabulary</NavLink>
              <NavLink to="/imbuhan" className={({ isActive }) => isActive ? "active-link" : ""} onClick={closeNav}>Imbuhan</NavLink>
              <NavLink to="/persamaan" className={({ isActive }) => isActive ? "active-link" : ""} onClick={closeNav}>Persamaan MCQ</NavLink>
              <NavLink to="/persamaan-latihan" className={({ isActive }) => isActive ? "active-link" : ""} onClick={closeNav}>Persamaan Latihan</NavLink>
              <NavLink to="/karangan" className={({ isActive }) => isActive ? "active-link" : ""} onClick={closeNav}>Karangan</NavLink>
              <NavLink to="/flashcards" className={({ isActive }) => isActive ? "active-link" : ""} onClick={closeNav}>Flashcards</NavLink>
              <NavLink to="/surat-resmi" className={({ isActive }) => isActive ? "active-link" : ""} onClick={closeNav}>Surat Resmi</NavLink>
              <NavLink to="/test-setup" className={({ isActive }) => isActive ? "active-link" : ""} onClick={closeNav}>Tes</NavLink>
            </nav>
          </>
        )}
      </header>
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/level1" element={<Level1Placeholder />} />
          <Route path="/dashboard" element={<HomePage />} />
          <Route path="/vocabulary" element={<VocabularyPage />} />
          <Route path="/imbuhan" element={<ImbuhanPage />} />
          <Route path="/persamaan" element={<PersamaanPage />} />
          <Route path="/persamaan-latihan" element={<PersamaanLatihanPage />} /> 
          <Route path="/karangan" element={<KaranganPage />} />
          <Route path="/flashcards" element={<FlashcardsPage />} />
          <Route path="/surat-resmi" element={<SuratResmiPage />} />
          <Route path="/test-setup" element={<TestSetupPage />} />
          <Route path="/test/imbuhan" element={<ImbuhanTestPage />} />
          <Route path="/test/persamaan" element={<PersamaanTestPage />} />
          <Route path="/daily-challenge" element={<DailyChallengePage />} />
        </Routes>
      </main>
      <footer className="app-footer">
        <p>© {new Date().getFullYear()} KataPult. Latih Bahasa Anda!</p>
      </footer>
    </>
  );
}

function App() {
  return (
    <ProgressProvider>
      <Router>
        <AnalyticsTracker />
        <AppContent />
      </Router>
    </ProgressProvider>
  );
}

export default App;
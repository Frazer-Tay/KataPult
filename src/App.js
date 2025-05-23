// src/App.js
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
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
import AnalyticsTracker from './components/AnalyticsTracker';
import './App.css';

function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const closeNav = () => {
    setIsNavOpen(false);
  };

  return (
    <Router>
      <AnalyticsTracker />
      <header className="app-header">
        <Link to="/" className="logo-link" onClick={closeNav}>
          KataPult Bahasa Prep
        </Link>
        
        <button className="hamburger-button" onClick={toggleNav} aria-label="Toggle navigation" aria-expanded={isNavOpen}>
          ☰
        </button>

        <nav className={`app-nav ${isNavOpen ? 'open' : ''}`}>
          <NavLink to="/" className={({ isActive }) => isActive ? "active-link" : ""} onClick={closeNav}>Beranda</NavLink>
          <NavLink to="/vocabulary" className={({ isActive }) => isActive ? "active-link" : ""} onClick={closeNav}>Vocabulary</NavLink>
          <NavLink to="/imbuhan" className={({ isActive }) => isActive ? "active-link" : ""} onClick={closeNav}>Imbuhan</NavLink>
          <NavLink to="/persamaan" className={({ isActive }) => isActive ? "active-link" : ""} onClick={closeNav}>Persamaan MCQ</NavLink>
          <NavLink to="/persamaan-latihan" className={({ isActive }) => isActive ? "active-link" : ""} onClick={closeNav}>Persamaan Latihan</NavLink>
          <NavLink to="/karangan" className={({ isActive }) => isActive ? "active-link" : ""} onClick={closeNav}>Karangan</NavLink>
          <NavLink to="/flashcards" className={({ isActive }) => isActive ? "active-link" : ""} onClick={closeNav}>Flashcards</NavLink>
          <NavLink to="/surat-resmi" className={({ isActive }) => isActive ? "active-link" : ""} onClick={closeNav}>Surat Resmi</NavLink>
          <NavLink to="/test-setup" className={({ isActive }) => isActive ? "active-link" : ""} onClick={closeNav}>Tes</NavLink>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
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
        </Routes>
      </main>
      <footer className="app-footer">
        <p>© {new Date().getFullYear()} KataPult. Latih Bahasa Anda!</p>
      </footer>
    </Router>
  );
}

export default App;
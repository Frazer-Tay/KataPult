// src/App.js
import React, { useState } from 'react'; // Import useState
import { HashRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom'; // Use NavLink for active styling
import HomePage from './pages/HomePage';
import VocabularyPage from './pages/VocabularyPage';
import ImbuhanPage from './pages/ImbuhanPage';
import PersamaanPage from './pages/PersamaanPage';
import KaranganPage from './pages/KaranganPage';
import FlashcardsPage from './pages/FlashcardsPage';
import TestSetupPage from './pages/TestSetupPage';
import ImbuhanTestPage from './pages/ImbuhanTestPage';
import PersamaanTestPage from './pages/PersamaanTestPage';
import AnalyticsTracker from './components/AnalyticsTracker';
import './App.css';

function App() {
  const [isNavOpen, setIsNavOpen] = useState(false); // State for mobile nav visibility

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const closeNav = () => { // Function to close nav when a link is clicked
    setIsNavOpen(false);
  }

  return (
    <Router> {/* Removed basename as discussed */}
      <AnalyticsTracker />
      <header className="app-header">
        <Link to="/" className="logo-link" onClick={closeNav}> {/* Close nav on logo click */}
          KataPult Bahasa Prep
        </Link>
        
        {/* Hamburger Button - visible only on mobile via CSS */}
        <button className="hamburger-button" onClick={toggleNav} aria-label="Toggle navigation" aria-expanded={isNavOpen}>
          ☰ {/* Hamburger icon */}
        </button>

        {/* Navigation Links */}
        <nav className={`app-nav ${isNavOpen ? 'open' : ''}`}>
          {/* Use NavLink for active class styling */}
          <NavLink to="/" className={({ isActive }) => isActive ? "active-link" : ""} onClick={closeNav}>Beranda</NavLink>
          <NavLink to="/vocabulary" className={({ isActive }) => isActive ? "active-link" : ""} onClick={closeNav}>Vocabulary</NavLink>
          <NavLink to="/imbuhan" className={({ isActive }) => isActive ? "active-link" : ""} onClick={closeNav}>Imbuhan</NavLink>
          <NavLink to="/persamaan" className={({ isActive }) => isActive ? "active-link" : ""} onClick={closeNav}>Persamaan</NavLink>
          <NavLink to="/karangan" className={({ isActive }) => isActive ? "active-link" : ""} onClick={closeNav}>Karangan</NavLink>
          <NavLink to="/flashcards" className={({ isActive }) => isActive ? "active-link" : ""} onClick={closeNav}>Flashcards</NavLink>
          <NavLink to="/test-setup" className={({ isActive }) => isActive ? "active-link" : ""} onClick={closeNav}>Tes</NavLink>
        </nav>
      </header>
      <main> {/* Removed className="app-main" if not specifically styled with it before */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/vocabulary" element={<VocabularyPage />} />
          <Route path="/imbuhan" element={<ImbuhanPage />} />
          <Route path="/persamaan" element={<PersamaanPage />} />
          <Route path="/karangan" element={<KaranganPage />} />
          <Route path="/flashcards" element={<FlashcardsPage />} />
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
// src/App.js
import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import VocabularyPage from './pages/VocabularyPage';
import ImbuhanPage from './pages/ImbuhanPage';
import PersamaanPage from './pages/PersamaanPage';
import KaranganPage from './pages/KaranganPage';
import TestSetupPage from './pages/TestSetupPage';
import ImbuhanTestPage from './pages/ImbuhanTestPage';
import PersamaanTestPage from './pages/PersamaanTestPage';
import FlashcardsPage from './pages/FlashcardsPage'; // <--- IMPORT NEW UNIFIED PAGE
// KaranganTestPage will be added later
import AnalyticsTracker from './components/AnalyticsTracker';
import './App.css';

function App() {
  return (
    <Router basename="/KataPult">
      <AnalyticsTracker />
      <header className="app-header">
        <Link to="/" className="logo-link">KataPult Bahasa Prep</Link>
        <nav className="app-nav">
          <Link to="/">Beranda</Link>
          <Link to="/vocabulary">Vocabulary</Link>
          <Link to="/imbuhan">Imbuhan</Link>
          <Link to="/persamaan">Persamaan</Link>
          <Link to="/karangan">Karangan</Link>
          <Link to="/flashcards">Flashcards</Link> {/* <--- UPDATED LINK */}
          <Link to="/test-setup">Tes</Link>
        </nav>
      </header>
      <main className="app-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/vocabulary" element={<VocabularyPage />} />
          <Route path="/imbuhan" element={<ImbuhanPage />} />
          <Route path="/persamaan" element={<PersamaanPage />} />
          <Route path="/karangan" element={<KaranganPage />} />
          <Route path="/flashcards" element={<FlashcardsPage />} /> {/* <--- UPDATED ROUTE */}
          <Route path="/test-setup" element={<TestSetupPage />} />
          <Route path="/test/imbuhan" element={<ImbuhanTestPage />} />
          <Route path="/test/persamaan" element={<PersamaanTestPage />} />
          {/* <Route path="/test/karangan" element={<KaranganTestPage />} /> */}
        </Routes>
      </main>
      <footer className="app-footer">
        <p>© {new Date().getFullYear()} KataPult. Latih Bahasa Anda!</p>
      </footer>
    </Router>
  );
}

export default App;
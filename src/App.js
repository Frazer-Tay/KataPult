// src/App.js
// Restored full version with all page components and routes
import React from 'react';
// Using HashRouter for GitHub Pages compatibility
import { HashRouter, Routes, Route, Link } from 'react-router-dom';

// Import Page Components (Make sure these paths are correct)
import HomePage from './pages/HomePage';
import VocabularyPage from './pages/VocabularyPage';
import ImbuhanPage from './pages/ImbuhanPage';
import PersamaanPage from './pages/PersamaanPage';
import KaranganPage from './pages/KaranganPage';

// Import Global Styles
import './App.css';

function App() {
  // No basename needed when using HashRouter for GitHub Pages subdirectories
  return (
    <HashRouter>
      <header className="app-header">
        {/* Updated Header Link Text */}
        <Link to="/" className="home-link">KataPult Bahasa Prep</Link>
      </header>
      <main>
        {/* Added Suspense for potential code splitting or lazy loading in future */}
        <React.Suspense fallback={<div className="loading-page">Loading Page...</div>}>
          <Routes>
            {/* Define routes for each page */}
            <Route path="/" element={<HomePage />} />
            <Route path="/vocabulary" element={<VocabularyPage />} />
            <Route path="/imbuhan" element={<ImbuhanPage />} />
            <Route path="/persamaan" element={<PersamaanPage />} />
            <Route path="/karangan" element={<KaranganPage />} />

            {/* Catch-all 404 route */}
            <Route path="*" element={
              <div style={{ padding: '20px', textAlign: 'center' }}>
                <h2>404 - Halaman Tidak Ditemukan</h2>
                <Link to="/">Kembali ke Beranda</Link>
              </div>
            } />
          </Routes>
        </React.Suspense>
      </main>
      <footer className="app-footer">
        {/* Updated Footer Text */}
        <p>© {new Date().getFullYear()} KataPult</p>
      </footer>
    </HashRouter>
  );
}

export default App;
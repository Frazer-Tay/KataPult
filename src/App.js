// src/App.js
import React from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import VocabularyPage from './pages/VocabularyPage';
import ImbuhanPage from './pages/ImbuhanPage';
import PersamaanPage from './pages/PersamaanPage';
import KaranganPage from './pages/KaranganPage';
import './App.css'; // Import the global styles

function App() {
  return (
    <HashRouter>
      <header className="app-header">
        <Link to="/" className="home-link">KataPult Bahasa Prep</Link>
      </header>
      <main>
        <React.Suspense fallback={<div className="loading-page">Loading Page...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/vocabulary" element={<VocabularyPage />} />
            <Route path="/imbuhan" element={<ImbuhanPage />} />
            <Route path="/persamaan" element={<PersamaanPage />} />
            <Route path="/karangan" element={<KaranganPage />} />
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
        <p>© {new Date().getFullYear()} KataPult</p>
      </footer>
    </HashRouter>
  );
}

export default App;
// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import VocabularyPage from './pages/VocabularyPage';
import ImbuhanPage from './pages/ImbuhanPage';
import PersamaanPage from './pages/PersamaanPage';
import KaranganPage from './pages/KaranganPage';
import './App.css'; // Import the global styles

function App() {
  // IMPORTANT: Set the basename for GitHub Pages deployment.
  // Replace 'bahasa-web-app' with YOUR GitHub repository name.
  // If deploying to the root (e.g., your-username.github.io), use just '/'
  const repoName = 'bahasa-web-app'; // <-- CHANGE THIS TO YOUR REPO NAME
  const basename = process.env.NODE_ENV === 'production' ? `/${repoName}` : '/';


  return (
    // Use `HashRouter` instead of `BrowserRouter` for simpler GitHub Pages config sometimes
    // Or stick with BrowserRouter and ensure server config (like gh-pages does) handles paths
    <BrowserRouter basename={basename}>
      <header className="app-header">
        <Link to="/" className="home-link">Bahasa Indonesia Prep</Link>
      </header>
      <main>
        <Routes>
          {/* Ensure paths start without a leading slash if using basename */}
          <Route path="/" element={<HomePage />} />
          <Route path="/vocabulary" element={<VocabularyPage />} />
          <Route path="/imbuhan" element={<ImbuhanPage />} />
          <Route path="/persamaan" element={<PersamaanPage />} />
          <Route path="/karangan" element={<KaranganPage />} />
          {/* Optional: Add a catch-all route for 404 */}
          <Route path="*" element={
            <div>
              <h2>404 - Halaman Tidak Ditemukan</h2>
              <Link to="/">Kembali ke Beranda</Link>
            </div>
          } />
        </Routes>
      </main>
      <footer className="app-footer">
        <p>© {new Date().getFullYear()} Belajar Bahasa Indonesia</p>
      </footer>
    </BrowserRouter>
  );
}

export default App;
// src/App.js (Temporary Test)
import React from 'react';
import { HashRouter, Link } from 'react-router-dom'; // Keep HashRouter
import './App.css';

function App() {
  console.log("Rendering Simple Test App"); // Add a console log
  return (
    <HashRouter>
      <header className="app-header">
         <Link to="/" className="home-link">KataPult Test Header</Link>
      </header>
      <main style={{ padding: '20px', textAlign: 'center' }}> {/* Added style */}
        <h1>App Component is Rendering! It Should Be Visible.</h1>
        <p>If you see this, the basic setup is working.</p>
        <Link to="/test-nonexistent">Test 404 Link</Link> {/* Added for testing */}
      </main>
      <footer className="app-footer">
         <p>© {new Date().getFullYear()} Test Footer</p>
      </footer>
    </HashRouter>
  );
}

export default App;
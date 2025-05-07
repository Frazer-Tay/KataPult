// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import './index.css'; // Default CRA styles
import App from './App';
import reportWebVitals from './reportWebVitals';
import './App.css'; // Load our main application styles LAST

// Fallback component for Error Boundary
function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert" style={{ padding: '40px', margin: '20px', border: '2px solid #e74c3c', borderRadius: '8px', backgroundColor: '#fef2f2', color: '#a94442' }}>
      <h2 style={{ marginTop: '0' }}>Oops! Ada yang tidak beres.</h2>
      <p>Terjadi kesalahan pada aplikasi:</p>
      <pre style={{ color: '#e74c3c', background: '#f9f9f9', padding: '10px', borderRadius: '4px', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
        {error.message}
      </pre>
      <button
        onClick={resetErrorBoundary}
        style={{
            marginTop: '15px',
            padding: '10px 15px',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
        }}
        >
            Coba Muat Ulang Aplikasi
        </button>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => {
          window.location.assign('/'); // Navigate home to reset
        }}
    >
        <App />
    </ErrorBoundary>
  </React.StrictMode>
);

reportWebVitals();
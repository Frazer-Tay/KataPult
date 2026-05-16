import React from 'react';
import { Link } from 'react-router-dom';

const Level1Placeholder = () => {
  return (
    <div className="completionMessage" style={{ minHeight: '60vh', animation: 'fadeIn 0.5s ease-out' }}>
      <h1 style={{ color: 'var(--primary-color)', fontSize: '3rem', marginBottom: '24px', fontWeight: '800' }}>
        Indonesia Level 1
      </h1>
      <p className="completionSubMessage" style={{ maxWidth: '650px', fontSize: '1.25rem', lineHeight: '1.6', marginBottom: '40px' }}>
        We're currently preparing exciting new content for Indonesia Level 1! Check back soon to start building your fundamental vocabulary.
      </p>
      <div className="completionActions" style={{ marginTop: '10px', gap: '20px' }}>
        <Link to="/" className="secondaryButton button" style={{ padding: '14px 28px', fontSize: '1.1rem' }}>
          ← Back to Selection
        </Link>
        <Link to="/dashboard" className="primaryButton button" style={{ padding: '14px 28px', fontSize: '1.1rem' }}>
          Go to Level 2
        </Link>
      </div>
    </div>
  );
};

export default Level1Placeholder;

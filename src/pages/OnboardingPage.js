import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styles from './LandingPage.module.css';

const OnboardingPage = () => {
  const { currentUser, completeOnboarding } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // If there's no user, or they somehow got here without logging in, redirect them
  if (!currentUser) {
    navigate('/login', { replace: true });
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedUsername = username.trim();
    
    if (trimmedUsername.length < 3) {
      setError('Username must be at least 3 characters long.');
      return;
    }
    
    if (trimmedUsername.length > 20) {
      setError('Username must be 20 characters or less.');
      return;
    }

    try {
      setError('');
      setIsLoading(true);
      
      // Save the username to Firestore
      await completeOnboarding(trimmedUsername);
      
      // Success! Send them to the dashboard
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError('Failed to create username: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container} style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className={styles.heroContent} style={{ padding: '3rem', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 8px 30px rgba(0,0,0,0.1)', maxWidth: '500px', width: '100%' }}>
        
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
          {currentUser.photoURL && (
            <img 
              src={currentUser.photoURL} 
              alt="Profile" 
              style={{ width: '80px', height: '80px', borderRadius: '50%', border: '3px solid var(--primary-color)' }} 
            />
          )}
        </div>

        <h1 className={styles.title} style={{ fontSize: '2rem', marginBottom: '1rem' }}>Choose your KataPult ID</h1>
        <p className={styles.subtitle} style={{ fontSize: '1.1rem', marginBottom: '2rem', color: '#64748b' }}>
          Welcome, {currentUser.displayName || 'friend'}! What should we call you on the leaderboard?
        </p>

        {error && <div style={{ color: '#e74c3c', backgroundColor: '#fdf3f2', padding: '10px', borderRadius: '8px', marginBottom: '1.5rem' }}>{error}</div>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="e.g. MasterBahasa99"
            required
            style={{
              padding: '1rem',
              fontSize: '1.2rem',
              borderRadius: '8px',
              border: '2px solid #cbd5e1',
              width: '100%',
              textAlign: 'center',
              fontWeight: 'bold',
              color: 'var(--primary-color)'
            }}
          />
          
          <button 
            type="submit"
            className={styles.primaryButton} 
            disabled={isLoading}
            style={{ width: '100%', marginTop: '1rem' }}
          >
            {isLoading ? 'Saving...' : 'Start Learning →'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OnboardingPage;

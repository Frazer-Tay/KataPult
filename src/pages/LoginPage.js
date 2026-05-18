import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styles from './LandingPage.module.css'; // Reusing some styles

const LoginPage = () => {
  const { loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Determine where to send the user after login
  const from = location.state?.from?.pathname || '/dashboard';

  const handleGoogleLogin = async () => {
    try {
      setError('');
      setIsLoading(true);
      await loginWithGoogle();
      navigate(from, { replace: true });
    } catch (err) {
      setError('Failed to sign in with Google. ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container} style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className={styles.heroContent} style={{ padding: '3rem', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 8px 30px rgba(0,0,0,0.1)', maxWidth: '500px', width: '100%' }}>
        <h1 className={styles.title} style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Welcome Back</h1>
        <p className={styles.subtitle} style={{ fontSize: '1.1rem', marginBottom: '2rem', color: '#64748b' }}>
          Sign in to save your progress, sync your XP, and climb the leaderboard.
        </p>

        {error && <div style={{ color: '#e74c3c', backgroundColor: '#fdf3f2', padding: '10px', borderRadius: '8px', marginBottom: '1.5rem' }}>{error}</div>}

        <button 
          className={styles.primaryButton} 
          onClick={handleGoogleLogin}
          disabled={isLoading}
          style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', backgroundColor: '#4285F4', color: 'white', marginBottom: '10px' }}
        >
          {isLoading ? 'Signing in...' : (
            <>
              <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Sign in with Google
            </>
          )}
        </button>

        <p style={{ marginTop: '2rem', fontSize: '0.9rem', color: '#94a3b8' }}>
          By signing in, you agree to KataPult's Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

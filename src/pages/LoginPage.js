import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styles from './LandingPage.module.css';

const LoginPage = () => {
  const { loginWithGoogle, authError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [forceShowLogin, setForceShowLogin] = useState(false);

  const isInAppBrowser = /Instagram|FBAV|FBAN|Line|MicroMessenger|Telegram|Viber|WhatsApp|WeChat/i.test(navigator.userAgent);

  // Determine where to send the user after login
  const from = location.state?.from?.pathname || '/dashboard';

  // Combine local errors and redirect auth errors
  const displayError = error || (authError ? `Sign-in error: ${authError.message || authError.code}. If you are using an in-app browser (like Telegram), this is caused by storage restrictions. Please tap the '...' menu and select "Open in Safari" or your system browser.` : '');

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
    <div className={styles.landingContainer} style={{ minHeight: '85vh', justifyContent: 'center' }}>
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '16px',
        boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
        maxWidth: '550px',
        width: '100%',
        padding: '3rem',
        border: '1px solid #e2e8f0'
      }}>
        <h1 style={{ fontSize: '2.25rem', fontWeight: '800', color: '#1e293b', marginBottom: '1.5rem', textAlign: 'center', letterSpacing: '-0.02em' }}>
          Unlock Your Learning Journey
        </h1>

        <div style={{ backgroundColor: '#f8fafc', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem', border: '1px solid #f1f5f9' }}>
          <p style={{ fontWeight: '600', color: '#334155', marginBottom: '1rem', fontSize: '1.05rem' }}>
            Why create an account?
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <span style={{ fontSize: '1.25rem' }}>💾</span>
              <div>
                <strong style={{ color: '#1e293b', display: 'block', marginBottom: '2px' }}>Save Your Progress</strong>
                <span style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.4', display: 'block' }}>Never lose your place. Pick up exactly where you left off across any device.</span>
              </div>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <span style={{ fontSize: '1.25rem' }}>📈</span>
              <div>
                <strong style={{ color: '#1e293b', display: 'block', marginBottom: '2px' }}>Track Your Mastery</strong>
                <span style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.4', display: 'block' }}>Watch your vocabulary and grammar skills grow over time.</span>
              </div>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <span style={{ fontSize: '1.25rem' }}>🏆</span>
              <div>
                <strong style={{ color: '#1e293b', display: 'block', marginBottom: '2px' }}>Earn XP & Achievements</strong>
                <span style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.4', display: 'block' }}>Join the community leaderboard and stay motivated.</span>
              </div>
            </li>
          </ul>
        </div>

        {displayError && <div style={{ color: '#b91c1c', backgroundColor: '#fef2f2', padding: '12px', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid #fecaca', fontSize: '0.95rem' }}>{displayError}</div>}

        {isInAppBrowser && !forceShowLogin ? (
          <div style={{ backgroundColor: '#fffbeb', padding: '1.5rem', borderRadius: '12px', border: '1px solid #fde68a', marginBottom: '1.5rem' }}>
            <h3 style={{ color: '#b45309', margin: '0 0 10px 0', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>⚠️</span> In-App Browser Detected
            </h3>
            <p style={{ color: '#92400e', fontSize: '0.95rem', margin: '0 0 10px 0', lineHeight: '1.5' }}>
              Google Sign-In requires hardware security features (like Passkeys or FaceID) which are blocked by this app.
            </p>
            <p style={{ color: '#92400e', fontSize: '0.95rem', margin: '0 0 15px 0', lineHeight: '1.5', fontWeight: 'bold' }}>
              Please tap the <strong style={{ fontSize: '1.2rem', padding: '0 4px' }}>...</strong> menu at the top right and select "Open in System Browser" or "Open in Safari" to continue.
            </p>
            <button
              onClick={() => setForceShowLogin(true)}
              style={{ background: 'none', border: 'none', color: '#b45309', textDecoration: 'underline', cursor: 'pointer', padding: 0, fontSize: '0.85rem' }}
            >
              I've opened in Safari / Continue anyway
            </button>
          </div>
        ) : (
          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              backgroundColor: '#ffffff',
              color: '#334155',
              padding: '14px',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              fontSize: '1.05rem',
              fontWeight: '600',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
            }}
            onMouseOver={(e) => { if(!isLoading) e.currentTarget.style.backgroundColor = '#f8fafc'; }}
            onMouseOut={(e) => { if(!isLoading) e.currentTarget.style.backgroundColor = '#ffffff'; }}
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
        )}

        <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '16px', backgroundColor: '#f0fdf4', borderRadius: '8px', border: '1px solid #dcfce7' }}>
          <span style={{ fontSize: '1.2rem' }}>🔒</span>
          <p style={{ margin: 0, fontSize: '0.85rem', color: '#166534', lineHeight: '1.5' }}>
            <strong style={{display: 'block', marginBottom: '4px'}}>Secure & Private</strong>
            We use Google Authentication so you don't have to memorize a new password. We only access your basic profile info to create your account.
          </p>
        </div>

        <p style={{ marginTop: '2rem', fontSize: '0.85rem', color: '#94a3b8', textAlign: 'center' }}>
          By signing in, you agree to KataPult's Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

import React, { useMemo, useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import styles from './FeedbackPage.module.css';

const CATEGORY_OPTIONS = [
  'Wrong answer or explanation',
  'Missing content',
  'Confusing wording',
  'Technical issue',
  'Feature idea',
  'Other'
];

const FeedbackPage = () => {
  const { currentUser, userData } = useAuth();
  const location = useLocation();
  const [category, setCategory] = useState(CATEGORY_OPTIONS[0]);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const trimmedMessage = message.trim();
  const charactersLeft = useMemo(() => 1000 - message.length, [message.length]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!trimmedMessage || trimmedMessage.length < 8) {
      setError('Please include a little more detail so the issue is easy to trace.');
      return;
    }

    try {
      setStatus('submitting');
      setError('');

      await addDoc(collection(db, 'feedback'), {
        uid: currentUser.uid,
        email: currentUser.email || '',
        displayName: userData?.username || currentUser.displayName || '',
        category,
        message: trimmedMessage,
        route: location.state?.from || window.location.hash || '',
        status: 'open',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      setMessage('');
      setCategory(CATEGORY_OPTIONS[0]);
      setStatus('submitted');
    } catch (err) {
      console.error('Failed to submit feedback:', err);
      setError('Could not send feedback right now. Please try again later.');
      setStatus('idle');
    }
  };

  return (
    <div className={styles.container}>
      <section className={styles.card}>
        <p className={styles.eyebrow}>Feedback</p>
        <h1 className={styles.title}>Report an issue or suggestion</h1>
        <p className={styles.subtitle}>
          Use this for wrong answers, unclear wording, missing exam content, or ideas that would make practice better.
        </p>

        {status === 'submitted' && (
          <div className={styles.success}>Thanks. Your feedback has been sent to the admin dashboard.</div>
        )}
        {error && <div className={styles.error}>{error}</div>}

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label} htmlFor="feedback-category">Category</label>
          <select
            className={styles.select}
            id="feedback-category"
            onChange={(event) => setCategory(event.target.value)}
            value={category}
          >
            {CATEGORY_OPTIONS.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>

          <label className={styles.label} htmlFor="feedback-message">Details</label>
          <textarea
            className={styles.textarea}
            id="feedback-message"
            maxLength={1000}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Tell us what page, word, question, or explanation needs attention."
            rows={8}
            value={message}
          />
          <div className={styles.helper}>{charactersLeft} characters left</div>

          <button className="primaryButton" disabled={status === 'submitting'} type="submit">
            {status === 'submitting' ? 'Sending...' : 'Send feedback'}
          </button>
        </form>
      </section>
    </div>
  );
};

export default FeedbackPage;

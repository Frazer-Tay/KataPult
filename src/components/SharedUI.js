import React from 'react';
import { Link } from 'react-router-dom';
import UiIcon from './UiIcon';
import styles from './SharedUI.module.css';

export const PageHeader = ({ eyebrow, title, description, assistiveText, actions, align = 'center' }) => (
  <header className={`${styles.pageHeader} ${align === 'left' ? styles.left : ''}`}>
    {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
    <h1 className={styles.pageTitle}>{title}</h1>
    {description && <p className={styles.pageDescription}>{description}</p>}
    {assistiveText && <p className={styles.assistiveText}>{assistiveText}</p>}
    {actions && <div className={styles.headerActions}>{actions}</div>}
  </header>
);

export const ModuleCard = ({ to, icon, tone = 'violet', title, subtitle, meta, badge }) => (
  <Link className={`${styles.moduleCard} ${styles[tone] || ''}`} to={to}>
    <span className={styles.moduleIcon}><UiIcon name={icon} size={24} /></span>
    <span className={styles.moduleContent}>
      <span className={styles.moduleTitleRow}>
        <span className={styles.moduleTitle}>{title}</span>
        {badge && <span className={styles.cardBadge}>{badge}</span>}
      </span>
      {subtitle && <span className={styles.moduleSubtitle}>{subtitle}</span>}
      {meta && <span className={styles.moduleMeta}>{meta}</span>}
    </span>
    <UiIcon className={styles.moduleArrow} name="arrowRight" size={19} />
  </Link>
);

export const StatusBadge = ({ icon, children, tone = 'neutral' }) => (
  <span className={`${styles.statusBadge} ${styles[tone] || ''}`}>
    {icon && <UiIcon name={icon} size={16} />}
    {children}
  </span>
);

export const FeedbackBanner = ({ status = 'info', title, children }) => (
  <div className={`${styles.feedbackBanner} ${styles[status] || ''}`} role={status === 'error' ? 'alert' : 'status'}>
    <span className={styles.feedbackIcon}>
      <UiIcon name={status === 'success' ? 'check' : status === 'error' ? 'x' : 'star'} size={18} />
    </span>
    <span>
      {title && <strong className={styles.feedbackTitle}>{title}</strong>}
      {children && <span className={styles.feedbackText}>{children}</span>}
    </span>
  </div>
);

export const CompletionCard = ({ title, description, actions, xp }) => (
  <section className={styles.completionCard} aria-live="polite">
    <span className={styles.completionIcon}><UiIcon name="trophy" size={34} /></span>
    <h2>{title}</h2>
    {description && <p>{description}</p>}
    {typeof xp === 'number' && <StatusBadge icon="star" tone="warning">+{xp} XP</StatusBadge>}
    {actions && <div className={styles.completionActions}>{actions}</div>}
  </section>
);

export const LoadingState = ({ label = 'Loading…' }) => (
  <div className={styles.loadingState} role="status" aria-live="polite">
    <span className={styles.loadingMark} />
    <div className={styles.loadingLines}>
      <span />
      <span />
      <span />
    </div>
    <span className={styles.srOnly}>{label}</span>
  </div>
);

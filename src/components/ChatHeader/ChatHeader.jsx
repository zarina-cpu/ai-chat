import { AGENT_NAME, AGENT_TITLE } from '../../../shared/beautyCenter.js';
import styles from './ChatHeader.module.css';

function ThemeIcon({ theme }) {
  if (theme === 'dark') {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 3a9 9 0 109 9c0-.46-.04-.92-.1-1.36a5 5 0 01-4.9 3.36 5 5 0 01-5.64-5.64A9 9 0 0112 3z"
          fill="currentColor"
        />
      </svg>
    );
  }
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="5" fill="currentColor" />
      <path
        d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ChatHeader({ onClose, theme, onToggleTheme }) {
  return (
    <header className={styles.header}>
      <img
        className={styles.avatar}
        src="/avatar-agent.svg"
        alt=""
        width={44}
        height={44}
      />
      <div className={styles.info}>
        <span className={styles.name}>{AGENT_NAME}, {AGENT_TITLE}</span>
        <span className={styles.status}>
          <span className={styles.statusDot} aria-hidden="true" />
          В сети
        </span>
      </div>
      <div className={styles.actions}>
        <button
          type="button"
          className={styles.iconBtn}
          onClick={onToggleTheme}
          aria-label={theme === 'light' ? 'Включить тёмную тему' : 'Включить светлую тему'}
        >
          <ThemeIcon theme={theme} />
        </button>
        <button
          type="button"
          className={styles.iconBtn}
          onClick={onClose}
          aria-label="Свернуть чат"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </header>
  );
}

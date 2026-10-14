import styles from './ChatLauncher.module.css';

export function ChatLauncher({ onClick, unreadCount, showAttentionPulse }) {
  return (
    <button
      type="button"
      className={`${styles.launcher} ${showAttentionPulse ? styles.launcherAttention : ''}`}
      onClick={onClick}
      aria-label="Открыть чат"
      aria-expanded={false}
    >
      <img
        className={`${styles.avatar} ${showAttentionPulse ? styles.avatarPulse : ''}`}
        src="/avatar-agent.svg"
        alt=""
        width={60}
        height={60}
      />
      {unreadCount > 0 && (
        <span className={styles.badge} aria-label={`Непрочитанных: ${unreadCount}`}>
          {unreadCount > 9 ? '9+' : unreadCount}
        </span>
      )}
    </button>
  );
}

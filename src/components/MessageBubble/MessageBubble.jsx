import { ROLE_USER } from '../../chat/types.js';
import styles from './MessageBubble.module.css';

export function MessageBubble({ role, text, time, showAvatar }) {
  const isUser = role === ROLE_USER;

  return (
    <div
      className={`${styles.row} ${isUser ? styles.rowUser : styles.rowAgent}`}
    >
      {!isUser && showAvatar && (
        <img
          className={styles.avatar}
          src="/avatar-agent.svg"
          alt=""
          width={32}
          height={32}
        />
      )}
      {!isUser && !showAvatar && <span className={styles.avatarSpacer} aria-hidden="true" />}
      <div className={styles.content}>
        <div
          className={`${styles.bubble} ${isUser ? styles.bubbleUser : styles.bubbleAgent}`}
        >
          {text}
        </div>
        <time className={styles.time} dateTime={time}>{time}</time>
      </div>
    </div>
  );
}

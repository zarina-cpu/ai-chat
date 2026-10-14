import styles from './TypingIndicator.module.css';

export function TypingIndicator() {
  return (
    <div className={styles.wrap} aria-label="Агент печатает">
      <img className={styles.avatar} src="/avatar-agent.svg" alt="" width={32} height={32} />
      <div className={styles.bubble}>
        <span className={styles.text}>Агент печатает</span>
        <span className={styles.dots} aria-hidden="true">
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
        </span>
      </div>
    </div>
  );
}

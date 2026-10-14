import styles from './QuickReplies.module.css';

export function QuickReplies({ suggestions, onSelect, disabled }) {
  if (!suggestions?.length) return null;

  return (
    <div className={styles.wrap} role="group" aria-label="Быстрые ответы">
      {suggestions.map((text) => (
        <button
          key={text}
          type="button"
          className={styles.chip}
          disabled={disabled}
          onClick={() => onSelect(text)}
        >
          {text}
        </button>
      ))}
    </div>
  );
}

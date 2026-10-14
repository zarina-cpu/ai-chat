import { forwardRef, useCallback, useState } from 'react';
import { useSpeechRecognition } from '../../hooks/useSpeechRecognition.js';
import styles from './ChatComposer.module.css';

function MicIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 14a3 3 0 003-3V6a3 3 0 10-6 0v5a3 3 0 003 3z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M19 11a7 7 0 01-14 0M12 18v3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export const ChatComposer = forwardRef(function ChatComposer(
  { onSend, disabled },
  ref,
) {
  const [value, setValue] = useState('');

  const handleSpeechText = useCallback((text) => {
    setValue((prev) => {
      const base = prev.trim();
      return base ? `${base} ${text}`.trim() : text;
    });
  }, []);

  const {
    isSupported,
    isListening,
    error,
    toggle,
    stop,
    clearError,
  } = useSpeechRecognition({ onFinalText: handleSpeechText });

  const submit = () => {
    if (!value.trim() || disabled) return;
    stop();
    onSend(value);
    setValue('');
    clearError();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  const micDisabled = disabled || !isSupported;

  return (
    <div className={styles.wrap}>
      <div className={styles.composer}>
        <textarea
          ref={ref}
          className={styles.input}
          rows={2}
          placeholder={isListening ? 'Слушаю…' : 'Напишите или нажмите микрофон…'}
          value={value}
          onChange={(e) => {
            clearError();
            setValue(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          aria-label="Сообщение"
        />
        <button
          type="button"
          className={`${styles.mic} ${isListening ? styles.micActive : ''}`}
          onClick={toggle}
          disabled={micDisabled}
          aria-label={isListening ? 'Остановить запись' : 'Голосовой ввод'}
          aria-pressed={isListening}
          title={
            !isSupported
              ? 'Голосовой ввод не поддерживается в этом браузере'
              : isListening
                ? 'Остановить'
                : 'Говорить'
          }
        >
          <MicIcon />
        </button>
        <button
          type="button"
          className={styles.send}
          onClick={submit}
          disabled={disabled || !value.trim()}
          aria-label="Отправить"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      {(error || (isSupported && isListening)) && (
        <p className={styles.hint} role="status" aria-live="polite">
          {error || 'Идёт запись… говорите чётко в микрофон.'}
        </p>
      )}
    </div>
  );
});

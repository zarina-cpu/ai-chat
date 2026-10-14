import { useEffect, useRef } from 'react';
import { ChatHeader } from '../ChatHeader/ChatHeader.jsx';
import { ChatBackground3D } from '../ChatBackground3D/ChatBackground3D.jsx';
import { MessageList } from '../MessageList/MessageList.jsx';
import { ChatComposer } from '../ChatComposer/ChatComposer.jsx';
import { QuickReplies } from '../QuickReplies/QuickReplies.jsx';
import { quickReplySuggestions } from '../../data/mockMessages.js';
import styles from './ChatPanel.module.css';

export function ChatPanel({
  messages,
  isTyping,
  isSending,
  onSend,
  onClose,
  theme,
  onToggleTheme,
}) {
  const inputRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 150);
    return () => clearTimeout(t);
  }, []);

  const handleQuickReply = (text) => {
    onSend(text);
  };

  return (
    <div
      className={styles.panel}
      role="dialog"
      aria-label="Чат с ИИ-ассистентом"
      aria-modal="false"
    >
      <ChatHeader
        onClose={onClose}
        theme={theme}
        onToggleTheme={onToggleTheme}
      />
      <div className={styles.messageArea}>
        <ChatBackground3D theme={theme} />
        <MessageList messages={messages} isTyping={isTyping} />
      </div>
      <div className={styles.footer}>
        <QuickReplies
          suggestions={quickReplySuggestions}
          onSelect={handleQuickReply}
          disabled={isSending}
        />
        <ChatComposer
          ref={inputRef}
          onSend={onSend}
          disabled={isSending}
        />
      </div>
    </div>
  );
}

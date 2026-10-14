import { useEffect, useRef } from 'react';
import { MessageBubble } from '../MessageBubble/MessageBubble.jsx';
import { TypingIndicator } from '../TypingIndicator/TypingIndicator.jsx';
import { ROLE_AGENT } from '../../chat/types.js';
import styles from './MessageList.module.css';

function formatTime(ts) {
  const d = new Date(ts);
  return d.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
}

export function MessageList({ messages, isTyping }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, isTyping]);

  let prevRole = null;

  return (
    <div className={styles.list} role="log" aria-live="polite" aria-relevant="additions">
      {messages.map((msg) => {
        const showAvatar = msg.role === ROLE_AGENT && prevRole !== ROLE_AGENT;
        prevRole = msg.role;
        return (
          <MessageBubble
            key={msg.id}
            role={msg.role}
            text={msg.text}
            time={formatTime(msg.createdAt)}
            showAvatar={showAvatar}
          />
        );
      })}
      {isTyping && <TypingIndicator />}
      <div ref={bottomRef} className={styles.anchor} aria-hidden="true" />
    </div>
  );
}

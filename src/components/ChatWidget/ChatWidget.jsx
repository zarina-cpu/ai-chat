import { useCallback, useEffect, useRef, useState } from 'react';
import { useChat } from '../../chat/useChat.js';
import { useTheme } from '../../theme/useTheme.js';
import { ChatLauncher } from '../ChatLauncher/ChatLauncher.jsx';
import { ChatPanel } from '../ChatPanel/ChatPanel.jsx';
import styles from './ChatWidget.module.css';

const LAUNCHER_OPENED_KEY = 'ai-chat-launcher-opened';

function readLauncherOpened() {
  try {
    return localStorage.getItem(LAUNCHER_OPENED_KEY) === '1';
  } catch {
    return false;
  }
}

function markLauncherOpened() {
  try {
    localStorage.setItem(LAUNCHER_OPENED_KEY, '1');
  } catch {
    /* ignore */
  }
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpenedBefore, setHasOpenedBefore] = useState(readLauncherOpened);
  const [unreadCount, setUnreadCount] = useState(0);
  const { messages, isTyping, isSending, sendMessage } = useChat();
  const { theme, toggleTheme } = useTheme();
  const prevMessageCountRef = useRef(messages.length);
  const wasOpenRef = useRef(isOpen);

  useEffect(() => {
    const grew = messages.length > prevMessageCountRef.current;
    const last = messages[messages.length - 1];
    if (grew && last?.role === 'agent' && !wasOpenRef.current) {
      setUnreadCount((c) => c + 1);
    }
    prevMessageCountRef.current = messages.length;
  }, [messages]);

  useEffect(() => {
    wasOpenRef.current = isOpen;
    if (isOpen) setUnreadCount(0);
  }, [isOpen]);

  const open = useCallback(() => {
    setIsOpen(true);
    if (!hasOpenedBefore) {
      setHasOpenedBefore(true);
      markLauncherOpened();
    }
  }, [hasOpenedBefore]);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <div className={styles.root}>
      {isOpen && (
        <ChatPanel
          messages={messages}
          isTyping={isTyping}
          isSending={isSending}
          onSend={sendMessage}
          onClose={close}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
      )}
      {!isOpen && (
        <ChatLauncher
          onClick={open}
          unreadCount={unreadCount}
          showAttentionPulse={!hasOpenedBefore}
        />
      )}
    </div>
  );
}

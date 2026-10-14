import { useCallback, useRef, useState } from 'react';
import { initialMessages } from '../data/mockMessages.js';
import { ROLE_AGENT, ROLE_USER } from './types.js';
import { getAgentReply } from './agentClient.js';

function createId() {
  return `msg-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function useChat() {
  const [messages, setMessages] = useState(() => [...initialMessages]);
  const [isTyping, setIsTyping] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const messagesRef = useRef(messages);
  messagesRef.current = messages;

  const sendMessage = useCallback(async (rawText) => {
    const text = rawText.trim();
    if (!text || isSending) return;

    const userMessage = {
      id: createId(),
      role: ROLE_USER,
      text,
      createdAt: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsSending(true);

    try {
      const replyText = await getAgentReply(
        setIsTyping,
        text,
        [...messagesRef.current, userMessage],
      );

      const agentMessage = {
        id: createId(),
        role: ROLE_AGENT,
        text: replyText,
        createdAt: Date.now(),
      };
      setMessages((prev) => [...prev, agentMessage]);
    } catch (error) {
      const agentMessage = {
        id: createId(),
        role: ROLE_AGENT,
        text:
          error instanceof Error
            ? `Сейчас не получается ответить: ${error.message}`
            : 'Сейчас не получается ответить. Попробуйте позже.',
        createdAt: Date.now(),
      };
      setMessages((prev) => [...prev, agentMessage]);
    } finally {
      setIsSending(false);
      setIsTyping(false);
    }
  }, [isSending]);

  return {
    messages,
    isTyping,
    isSending,
    sendMessage,
  };
}

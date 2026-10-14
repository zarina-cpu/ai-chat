import { fetchAgentReply } from './chatApi.js';
import { USE_MOCK, simulateAgentReply } from './mockAgent.js';

/**
 * @param {(typing: boolean) => void} onTypingChange
 * @param {string} userText
 * @param {import('./types.js').ChatMessage[]} history
 */
export async function getAgentReply(onTypingChange, userText, history) {
  if (USE_MOCK) {
    return simulateAgentReply(onTypingChange, userText, history);
  }

  onTypingChange(true);
  try {
    return await fetchAgentReply(history);
  } catch (error) {
    onTypingChange(false);
    if (import.meta.env.VITE_FALLBACK_MOCK !== 'false') {
      console.warn('[chat] API недоступен, fallback на мок:', error);
      return simulateAgentReply(onTypingChange, userText, history);
    }
    throw error;
  } finally {
    onTypingChange(false);
  }
}

import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_API_KEY, GEMINI_MODEL, SYSTEM_INSTRUCTION } from './config.js';

/** @param {{ role: 'user' | 'agent', text: string }[]} messages */
export async function generateChatReply(messages) {
  if (!GEMINI_API_KEY) {
    const err = new Error('GEMINI_API_KEY не задан на сервере');
    err.code = 'MISSING_API_KEY';
    throw err;
  }

  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({
    model: GEMINI_MODEL,
    systemInstruction: SYSTEM_INSTRUCTION,
  });

  const normalized = messages
    .filter((m) => m.text?.trim())
    .map((m) => ({
      role: m.role === 'agent' ? 'model' : 'user',
      parts: [{ text: m.text.trim() }],
    }));

  if (normalized.length === 0) {
    const err = new Error('Пустая история сообщений');
    err.code = 'EMPTY_HISTORY';
    throw err;
  }

  const last = normalized[normalized.length - 1];
  if (last.role !== 'user') {
    const err = new Error('Последнее сообщение должно быть от пользователя');
    err.code = 'INVALID_LAST_MESSAGE';
    throw err;
  }

  let history = normalized.slice(0, -1);
  while (history.length > 0 && history[0].role === 'model') {
    history = history.slice(1);
  }

  const chat = model.startChat({ history });
  const result = await chat.sendMessage(last.parts[0].text);
  const reply = result.response.text()?.trim();

  if (!reply) {
    const err = new Error('Пустой ответ модели');
    err.code = 'EMPTY_REPLY';
    throw err;
  }

  return reply;
}

import { generateChatReply } from './gemini.js';

export function validateChatMessages(messages) {
  if (!Array.isArray(messages) || messages.length === 0) {
    return { ok: false, status: 400, body: { error: 'Ожидается массив messages' } };
  }

  const valid = messages.every(
    (m) =>
      m &&
      typeof m.text === 'string' &&
      (m.role === 'user' || m.role === 'agent'),
  );

  if (!valid) {
    return { ok: false, status: 400, body: { error: 'Некорректный формат messages' } };
  }

  return { ok: true };
}

export async function handleChatRequest(messages) {
  const validation = validateChatMessages(messages);
  if (!validation.ok) return validation;

  try {
    const reply = await generateChatReply(messages);
    return { ok: true, status: 200, body: { reply } };
  } catch (error) {
    console.error('[api/chat]', error);

    if (error.code === 'MISSING_API_KEY') {
      return {
        ok: false,
        status: 503,
        body: { error: 'Сервис ИИ не настроен: добавьте GEMINI_API_KEY в переменные окружения' },
      };
    }

    return {
      ok: false,
      status: 502,
      body: {
        error: 'Не удалось получить ответ от Gemini',
        details: error.message,
      },
    };
  }
}

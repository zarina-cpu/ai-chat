/**
 * @param {import('./types.js').ChatMessage[]} messages
 * @returns {Promise<string>}
 */
export async function fetchAgentReply(messages) {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messages: messages.map(({ role, text }) => ({ role, text })),
    }),
  });

  let payload = null;
  try {
    payload = await res.json();
  } catch {
    payload = null;
  }

  if (!res.ok) {
    const msg =
      payload?.error ||
      payload?.details ||
      `Ошибка сервера (${res.status})`;
    throw new Error(msg);
  }

  if (!payload?.reply || typeof payload.reply !== 'string') {
    throw new Error('Некорректный ответ API');
  }

  return payload.reply;
}

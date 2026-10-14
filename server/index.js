import cors from 'cors';
import express from 'express';
import { GEMINI_API_KEY, GEMINI_MODEL, PORT } from './config.js';
import { generateChatReply } from './gemini.js';

const app = express();

app.use(cors({ origin: true }));
app.use(express.json({ limit: '256kb' }));

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    geminiConfigured: Boolean(GEMINI_API_KEY),
    model: GEMINI_MODEL,
  });
});

app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body ?? {};

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Ожидается массив messages' });
    }

    const valid = messages.every(
      (m) =>
        m &&
        typeof m.text === 'string' &&
        (m.role === 'user' || m.role === 'agent'),
    );

    if (!valid) {
      return res.status(400).json({ error: 'Некорректный формат messages' });
    }

    const reply = await generateChatReply(messages);
    return res.json({ reply });
  } catch (error) {
    console.error('[api/chat]', error);

    if (error.code === 'MISSING_API_KEY') {
      return res.status(503).json({
        error: 'Сервис ИИ не настроен: добавьте GEMINI_API_KEY в .env',
      });
    }

    return res.status(502).json({
      error: 'Не удалось получить ответ от Gemini',
      details: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`API: http://localhost:${PORT}`);
  console.log(`Gemini model: ${GEMINI_MODEL}`);
  if (!GEMINI_API_KEY) {
    console.warn('GEMINI_API_KEY не задан — /api/chat вернёт 503');
  }
});

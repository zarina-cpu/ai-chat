import cors from 'cors';
import express from 'express';
import { GEMINI_API_KEY, GEMINI_MODEL, PORT } from './config.js';
import { handleChatRequest } from './chatRoute.js';

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
  const result = await handleChatRequest(req.body?.messages);
  return res.status(result.status).json(result.body);
});

app.listen(PORT, () => {
  console.log(`API: http://localhost:${PORT}`);
  console.log(`Gemini model: ${GEMINI_MODEL}`);
  if (!GEMINI_API_KEY) {
    console.warn('GEMINI_API_KEY не задан — /api/chat вернёт 503');
  }
});

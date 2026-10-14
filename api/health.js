import { GEMINI_API_KEY, GEMINI_MODEL } from '../server/config.js';

export default function handler(_req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json({
    ok: true,
    geminiConfigured: Boolean(GEMINI_API_KEY),
    model: GEMINI_MODEL,
  });
}

import express from 'express';
import cors from 'cors';
import crypto from 'crypto';
import { createClient } from 'redis';
import { GoogleGenAI } from '@google/genai';

const PORT = Number(process.env.PORT || 8787);
const REDIS_URL = process.env.REDIS_URL;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const CONTACT_WEBHOOK_URL = process.env.CONTACT_WEBHOOK_URL;
const LEAD_TOKEN_SECRET = process.env.LEAD_TOKEN_SECRET;
const CORS_ORIGIN = process.env.CORS_ORIGIN;

const LEAD_TTL_SECONDS = 60 * 60 * 24 * 30;
const DAILY_LIMIT = 10;
const DAILY_TTL_SECONDS = 60 * 60 * 24;

if (!REDIS_URL) {
  throw new Error('REDIS_URL is required');
}
if (!LEAD_TOKEN_SECRET) {
  throw new Error('LEAD_TOKEN_SECRET is required');
}

const app = express();
app.use(
  cors({
    origin: CORS_ORIGIN ? CORS_ORIGIN.split(',').map((v) => v.trim()) : true,
    credentials: true,
  })
);
app.use(express.json({ limit: '64kb' }));

const redis = createClient({ url: REDIS_URL });
redis.on('error', (err) => {
  console.error('Redis error:', err);
});

function base64UrlEncode(input) {
  return Buffer.from(input).toString('base64url');
}

function base64UrlDecode(input) {
  return Buffer.from(input, 'base64url').toString('utf8');
}

function signLeadToken(payload) {
  const body = base64UrlEncode(JSON.stringify(payload));
  const signature = crypto
    .createHmac('sha256', LEAD_TOKEN_SECRET)
    .update(body)
    .digest('base64url');
  return `${body}.${signature}`;
}

function verifyLeadToken(token) {
  if (!token || typeof token !== 'string') return null;
  const [body, signature] = token.split('.');
  if (!body || !signature) return null;
  const expected = crypto
    .createHmac('sha256', LEAD_TOKEN_SECRET)
    .update(body)
    .digest('base64url');
  if (signature.length !== expected.length) {
    return null;
  }
  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) {
    return null;
  }

  try {
    const payload = JSON.parse(base64UrlDecode(body));
    if (!payload || typeof payload !== 'object') return null;
    if (payload.exp && Date.now() > payload.exp) return null;
    return payload;
  } catch {
    return null;
  }
}

function normalizeHistory(history) {
  if (!Array.isArray(history)) return [];
  return history
    .filter((item) => item && typeof item.text === 'string' && item.text.trim())
    .slice(-8)
    .map((item) => ({
      role: item.role === 'user' ? 'user' : 'model',
      parts: [{ text: item.text }],
    }));
}

const systemInstruction = `
Voce e o "Architect", um consultor de solucoes senior da Collaby.t.

CONTEXTO:
A Collaby.t e um estudio de inovacao que cria MVPs para startups, faz transformacao digital para industrias e desenvolve e-commerce B2B.

SUA MISSAO:
Agir como um pre-vendedor tecnico. Voce deve qualificar o lead fazendo perguntas instigantes sobre o projeto dele.

DIRETRIZES:
1. Responda de forma curta (maximo 3 paragrafos), inteligente e levemente futurista/profissional.
2. Se o usuario falar de uma ideia, elogie e pergunte sobre o estagio atual (apenas ideia, rascunho, ou sistema legado).
3. Se o usuario falar de problemas tecnicos, mostre autoridade citando tecnologias modernas (React, Node, Cloud, AI).
4. O OBJETIVO FINAL e convencer o usuario a agendar um diagnostico humano.
   Use frases como: "Isso tem grande potencial. Recomendo fortemente que voce solicite nosso Diagnostico Gratuito para aprofundarmos a arquitetura."
`.trim();

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.post('/api/contact', async (req, res) => {
  const { name, email, challenge, message, consent } = req.body || {};

  if (!name || !email) {
    return res.status(400).json({ error: 'name and email are required' });
  }

  if (consent !== true) {
    return res.status(400).json({ error: 'consent is required' });
  }

  const leadId = crypto.randomUUID();
  const createdAt = new Date().toISOString();
  const payload = {
    leadId,
    email,
    exp: Date.now() + LEAD_TTL_SECONDS * 1000,
  };

  const leadData = {
    id: leadId,
    name,
    email,
    challenge: challenge || '',
    message: message || '',
    consent: true,
    createdAt,
    source: 'architect-ai',
  };

  await redis.set(`lead:${leadId}`, JSON.stringify(leadData), {
    EX: LEAD_TTL_SECONDS,
  });

  if (CONTACT_WEBHOOK_URL) {
    try {
      await fetch(CONTACT_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData),
      });
    } catch (error) {
      console.error('CONTACT_WEBHOOK_URL failed', error);
    }
  }

  const leadToken = signLeadToken(payload);
  return res.json({ leadToken });
});

app.post('/api/ai/chat', async (req, res) => {
  if (!GEMINI_API_KEY) {
    return res.status(500).json({ error: 'GEMINI_API_KEY not configured' });
  }

  const { leadToken, message, history } = req.body || {};
  if (!leadToken || !message) {
    return res.status(400).json({ error: 'leadToken and message are required' });
  }

  const payload = verifyLeadToken(leadToken);
  if (!payload?.leadId) {
    return res.status(401).json({ error: 'invalid lead token' });
  }

  const leadKey = `lead:${payload.leadId}`;
  const lead = await redis.get(leadKey);
  if (!lead) {
    return res.status(401).json({ error: 'lead not found' });
  }

  const dailyKey = `lead:${payload.leadId}:dailyCount`;
  const count = await redis.incr(dailyKey);
  if (count === 1) {
    await redis.expire(dailyKey, DAILY_TTL_SECONDS);
  }

  if (count > DAILY_LIMIT) {
    return res.status(429).json({ error: 'daily limit reached' });
  }

  try {
    const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: { systemInstruction },
      history: normalizeHistory(history),
    });

    const response = await chat.sendMessage({ message });
    const reply = response.text || '';

    return res.json({ reply, remaining: Math.max(0, DAILY_LIMIT - count) });
  } catch (error) {
    console.error('Gemini error', error);
    return res.status(500).json({ error: 'ai_error' });
  }
});

async function start() {
  await redis.connect();
  app.listen(PORT, () => {
    console.log(`Architect AI server running on :${PORT}`);
  });
}

start().catch((error) => {
  console.error('Failed to start server', error);
  process.exit(1);
});

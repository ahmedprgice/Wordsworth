import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import chatHandler from './api/chat.js';
import { savePlacementSubmission } from './api/_placement-db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8787;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.post('/api/chat', chatHandler);

app.post('/api/contact', async (req, res) => {
  const { fullName, email, phone, subject, courseInterest, message, source } = req.body || {};

  const isVisaGuidePopup = source === 'Home Visa Guide Popup';
  if (isVisaGuidePopup) {
    if (!email || !subject) {
      return res.status(400).json({ error: 'Email and selected option are required.' });
    }
  } else if (!fullName || !email || !phone || !subject) {
    return res.status(400).json({ error: 'Full name, email, phone number, and subject are required.' });
  }

  const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const telegramChatId = process.env.TELEGRAM_CHAT_ID?.trim();

  if (!telegramBotToken || !telegramChatId) {
    return res.status(500).json({ error: 'Telegram bot is not configured on the server.' });
  }

  const text = [
    'New Contact Form Submission',
    '',
    `Source: ${source || 'Website Contact Form'}`,
    `Name: ${fullName || '-'}`,
    `Email: ${email}`,
    `Phone: ${phone || '-'}`,
    `Subject: ${subject || courseInterest || '-'}`,
    '',
    'Message:',
    message || '-' ,
  ].join('\n');

  try {
    const telegramResponse = await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: telegramChatId,
        text,
      }),
    });

    const telegramResult = await telegramResponse.json();

    if (!telegramResponse.ok || !telegramResult.ok) {
      const telegramDescription =
        typeof telegramResult?.description === 'string'
          ? telegramResult.description
          : 'Unknown Telegram error.';
      return res.status(502).json({
        error: `Telegram API rejected the message: ${telegramDescription}`,
      });
    }

    return res.json({ ok: true });
  } catch (_error) {
    return res.status(500).json({ error: 'Failed to send message to Telegram.' });
  }
});

app.post('/api/placement-submit', async (req, res) => {
  const {
    email,
    country,
    classLevel,
    age,
    score,
    totalQuestions,
    cefrLevel,
    recommendedCourseId,
    writingAnswer,
    grammarAnswers,
    source,
  } = req.body || {};

  if (!email || !country || !classLevel || !age || !writingAnswer) {
    return res.status(400).json({ error: 'Missing required placement submission fields.' });
  }

  const ageNumber = Number(age);
  const scoreNumber = Number(score);
  const totalNumber = Number(totalQuestions);
  if (!Number.isFinite(ageNumber) || ageNumber < 1) {
    return res.status(400).json({ error: 'Age must be a valid positive number.' });
  }
  if (!Number.isFinite(scoreNumber) || !Number.isFinite(totalNumber) || totalNumber < 1) {
    return res.status(400).json({ error: 'Score and total questions must be valid numbers.' });
  }

  const payload = {
    source: source || 'Placement Test',
    lead: {
      email: String(email).trim(),
      country: String(country).trim(),
      classLevel: String(classLevel).trim(),
      age: ageNumber,
    },
    result: {
      score: scoreNumber,
      totalQuestions: totalNumber,
      percentage: Number(((scoreNumber / totalNumber) * 100).toFixed(2)),
      cefrLevel: String(cefrLevel || '').trim(),
      recommendedCourseId: String(recommendedCourseId || '').trim(),
    },
    writingAnswer: String(writingAnswer).trim(),
    grammarAnswers: Array.isArray(grammarAnswers) ? grammarAnswers : [],
  };

  try {
    const saved = await savePlacementSubmission(payload);

    const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN?.trim();
    const telegramChatId = process.env.TELEGRAM_CHAT_ID?.trim();
    if (telegramBotToken && telegramChatId) {
      const text = [
        'New Placement Test Submission',
        '',
        `Email: ${payload.lead.email}`,
        `Country: ${payload.lead.country}`,
        `Class Level: ${payload.lead.classLevel}`,
        `Age: ${payload.lead.age}`,
        `Score: ${payload.result.score}/${payload.result.totalQuestions} (${payload.result.percentage}%)`,
        `CEFR: ${payload.result.cefrLevel || '-'}`,
        `Recommended Course: ${payload.result.recommendedCourseId || '-'}`,
        '',
        'Writing Answer:',
        payload.writingAnswer,
      ].join('\n');

      await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: telegramChatId,
          text,
        }),
      });
    }

    return res.status(200).json({ ok: true, submissionId: saved.id });
  } catch (error) {
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to save placement submission.',
    });
  }
});

app.listen(PORT, () => {
  console.log(`Telegram contact server listening on http://localhost:${PORT}`);
});

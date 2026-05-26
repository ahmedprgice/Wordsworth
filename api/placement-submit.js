import { savePlacementSubmission } from './_placement-db.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

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
  if (!Number.isFinite(ageNumber) || ageNumber < 1) {
    return res.status(400).json({ error: 'Age must be a valid positive number.' });
  }

  const scoreNumber = Number(score);
  const totalNumber = Number(totalQuestions);
  if (!Number.isFinite(scoreNumber) || !Number.isFinite(totalNumber) || totalNumber < 1) {
    return res.status(400).json({ error: 'Score and total questions must be valid numbers.' });
  }

  const writingText = String(writingAnswer).trim();
  if (!writingText) {
    return res.status(400).json({ error: 'Writing answer is required.' });
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
    writingAnswer: writingText,
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
}

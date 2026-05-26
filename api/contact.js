import crypto from 'node:crypto';

const OTP_VERIFY_COOKIE = 'ww_otp_verified';
const OTP_SECRET = process.env.OTP_SECRET?.trim() || process.env.TELEGRAM_BOT_TOKEN?.trim() || 'wordsworth-otp-secret';

function signPayload(payloadObj) {
  const payload = Buffer.from(JSON.stringify(payloadObj)).toString('base64url');
  const sig = crypto.createHmac('sha256', OTP_SECRET).update(payload).digest('base64url');
  return `${payload}.${sig}`;
}

function verifyPayload(token) {
  if (!token || !token.includes('.')) return null;
  const [payload, sig] = token.split('.');
  const expected = crypto.createHmac('sha256', OTP_SECRET).update(payload).digest('base64url');
  if (sig !== expected) return null;
  const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
  if (!data?.exp || Date.now() > data.exp) return null;
  return data;
}

function parseCookies(req) {
  const cookieHeader = req.headers.cookie || '';
  return cookieHeader.split(';').reduce((acc, part) => {
    const [k, ...rest] = part.trim().split('=');
    if (!k) return acc;
    acc[k] = decodeURIComponent(rest.join('='));
    return acc;
  }, {});
}

function clearOtpCookies(res) {
  res.setHeader('Set-Cookie', [
    `ww_otp_session=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=Lax`,
    `${OTP_VERIFY_COOKIE}=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=Lax`,
  ]);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const isVisaGuidePopup = source === 'Home Visa Guide Popup';
  const { fullName, email, phone, subject, courseInterest, message, source } = req.body || {};

  if (isVisaGuidePopup) {
    if (!email || !subject) {
      return res.status(400).json({ error: 'Email and selected option are required.' });
    }
  } else if (!fullName || !email || !phone || !subject) {
    return res.status(400).json({ error: 'Full name, email, phone number, and subject are required.' });
  }

  if (!isVisaGuidePopup) {
    const cookies = parseCookies(req);
    const otpProof = verifyPayload(cookies[OTP_VERIFY_COOKIE]);
    if (!otpProof || !otpProof.verified || otpProof.email !== email || otpProof.phone !== phone) {
      return res.status(401).json({ error: 'OTP verification is required before sending the message.' });
    }
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
    message || '-',
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

    if (!isVisaGuidePopup) {
      clearOtpCookies(res);
    }
    return res.status(200).json({ ok: true });
  } catch (_error) {
    return res.status(500).json({ error: 'Failed to send message to Telegram.' });
  }
}

import crypto from 'node:crypto';
import nodemailer from 'nodemailer';

const OTP_SESSION_COOKIE = 'ww_otp_session';
const OTP_VERIFY_COOKIE = 'ww_otp_verified';
const OTP_SECRET = process.env.OTP_SECRET?.trim() || process.env.TELEGRAM_BOT_TOKEN?.trim() || 'wordsworth-otp-secret';
const OTP_EXPIRY_MS = 5 * 60 * 1000;
const OTP_VERIFIED_EXPIRY_MS = 10 * 60 * 1000;

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

function setCookie(res, name, value, maxAgeSeconds) {
  const cookie = `${name}=${encodeURIComponent(value)}; Max-Age=${maxAgeSeconds}; Path=/; HttpOnly; Secure; SameSite=Lax`;
  const prev = res.getHeader('Set-Cookie');
  if (!prev) {
    res.setHeader('Set-Cookie', cookie);
  } else if (Array.isArray(prev)) {
    res.setHeader('Set-Cookie', [...prev, cookie]);
  } else {
    res.setHeader('Set-Cookie', [prev, cookie]);
  }
}

function clearCookie(res, name) {
  setCookie(res, name, '', 0);
}

function getMailer() {
  const host = process.env.SMTP_HOST?.trim();
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
  const from = process.env.OTP_FROM_EMAIL?.trim() || process.env.SMTP_FROM?.trim();

  if (!host || !user || !pass || !from) return null;

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
  return { transporter, from };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { action, email, phone, otp } = req.body || {};

  if (!action || !email || !phone) {
    return res.status(400).json({ error: 'Action, email, and phone are required.' });
  }

  if (action === 'request') {
    const mailer = getMailer();
    if (!mailer) {
      return res.status(500).json({
        error: 'OTP email is not configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, and OTP_FROM_EMAIL.',
      });
    }

    const code = String(crypto.randomInt(100000, 1000000));
    const token = signPayload({
      email,
      phone,
      code,
      exp: Date.now() + OTP_EXPIRY_MS,
    });

    try {
      await mailer.transporter.sendMail({
        from: mailer.from,
        to: email,
        subject: 'Your Wordsworth verification code',
        text: `Your OTP code is ${code}. It expires in 5 minutes.`,
        html: `<p>Your OTP code is <strong>${code}</strong>.</p><p>It expires in 5 minutes.</p>`,
      });

      setCookie(res, OTP_SESSION_COOKIE, token, Math.floor(OTP_EXPIRY_MS / 1000));
      clearCookie(res, OTP_VERIFY_COOKIE);
      return res.status(200).json({ ok: true, message: 'OTP sent to your email.' });
    } catch (_error) {
      return res.status(500).json({ error: 'Failed to send OTP email.' });
    }
  }

  if (action === 'verify') {
    if (!otp) return res.status(400).json({ error: 'OTP code is required.' });
    const cookies = parseCookies(req);
    const session = verifyPayload(cookies[OTP_SESSION_COOKIE]);
    if (!session) {
      return res.status(401).json({ error: 'OTP session expired. Please request a new code.' });
    }
    if (session.email !== email || session.phone !== phone) {
      return res.status(401).json({ error: 'OTP session does not match your details. Request a new code.' });
    }
    if (session.code !== String(otp).trim()) {
      return res.status(401).json({ error: 'Invalid OTP code.' });
    }

    const verifiedToken = signPayload({
      verified: true,
      email,
      phone,
      exp: Date.now() + OTP_VERIFIED_EXPIRY_MS,
    });
    setCookie(res, OTP_VERIFY_COOKIE, verifiedToken, Math.floor(OTP_VERIFIED_EXPIRY_MS / 1000));
    clearCookie(res, OTP_SESSION_COOKIE);
    return res.status(200).json({ ok: true, message: 'OTP verified.' });
  }

  return res.status(400).json({ error: 'Invalid action.' });
}

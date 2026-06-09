const defaultQuickReplies = [
  { label: 'Courses', action: 'courses' },
  { label: 'Scholarship', action: 'scholarship' },
  { label: 'Placement Test', action: 'placement' },
  { label: 'Contact Team', action: 'agent' },
];

const actionMap = {
  courses: { label: 'Courses', action: 'courses' },
  scholarship: { label: 'Scholarship', action: 'scholarship' },
  placement: { label: 'Placement Test', action: 'placement' },
  fees: { label: 'Fees', action: 'fees' },
  visa: { label: 'Visa', action: 'visa' },
  register: { label: 'Register', action: 'register' },
  agent: { label: 'Contact Team', action: 'agent' },
  beginner: { label: 'Beginner English', action: 'beginner' },
  ielts: { label: 'IELTS', action: 'ielts' },
  business: { label: 'Business English', action: 'business' },
  mandarin: { label: 'Mandarin', action: 'mandarin' },
  short: { label: 'Less Than 3 Months', action: 'short' },
  long: { label: 'More Than 3 Months', action: 'long' },
  reset: { label: 'Start Over', action: 'reset' },
};

const siteKnowledge = `
Wordsworth Language Centre support assistant knowledge:

Core contact:
- WhatsApp / phone: +60 17-504 5565
- Email: info@wordsworth.edu.my
- Contact page exists for staff handoff

Main course cards:
1. Beginner English
- For students starting from the basics
- Duration: 12 weeks
- Focus: grammar, vocabulary, daily conversation

2. Intermediate English
- Duration: 16 weeks
- Focus: fluency and confidence in everyday English communication

3. Advanced English
- Duration: 14 weeks
- Focus: complex grammar and professional vocabulary

4. IELTS Preparation
- Duration: 10 weeks
- Focus: all four IELTS sections and test strategies

5. IELTS Intensive
- Duration: 6 weeks
- Focus: fast-track IELTS practice

6. Business English
- Duration: 12 weeks
- Focus: meetings, presentations, emails, workplace communication

7. Mandarin Course
- Focus: practical Mandarin and HSK-oriented learning
- Scholarship options: 1 + 1 free, 2 + 2 free, 3 + 3 free

8. Academic Writing
- Duration: 10 weeks
- Focus: essays, research papers, academic English

Scholarship information:
- English scholarship options:
  - 2 + 1 free = 3 months total, scholarship fee RM 5,800, original fee RM 8,450
  - 4 + 2 free = 6 months total, scholarship fee RM 13,900, original fee RM 19,200
  - 5 + 3 free = 8 months total, scholarship fee RM 17,350, original fee RM 25,300
  - 6 + 6 free = 12 months total, scholarship fee RM 20,000, original fee RM 35,900
- English promotion includes: English placement test, registration fee, books and materials, visa fee

- Mandarin scholarship options:
  - 1 + 1 free = 2 months total, scholarship fee RM 3,150, original fee RM 5,800
  - 2 + 2 free = 4 months total, scholarship fee RM 5,800, original fee RM 11,100
  - 3 + 3 free = 6 months total, scholarship fee RM 8,450, original fee RM 16,400
- Mandarin promotion includes: placement test if needed, registration fee, learning materials

Placement test:
- Students can take an online placement test
- The team reviews results and gets back to the student
- Do not claim instant final placement results from the chatbot

Visa guidance:
- Short-term study is simpler
- For study longer than 3 months, tell the student the team should confirm the latest visa steps directly
- Do not give legal or final visa advice

Registration flow:
- Choose a course or scholarship option
- Take placement test if needed
- Submit registration or contact team
- Staff follows up for next steps
`;

function normalizeLanguage(language) {
  return language === 'ar' || language === 'zh' || language === 'ms' ? language : 'en';
}

function getLanguageInstruction(language) {
  switch (language) {
    case 'ar':
      return 'Reply in Arabic.';
    case 'zh':
      return 'Reply in Simplified Chinese.';
    case 'ms':
      return 'Reply in Bahasa Melayu.';
    default:
      return 'Reply in English.';
  }
}

function getSystemPrompt(language) {
  return [
    'You are the official website assistant for Wordsworth Language Centre.',
    getLanguageInstruction(language),
    'Use only the provided site knowledge. If something is not in the knowledge, say you will connect the student with the team.',
    'Be concise, warm, and practical.',
    'Never invent fees, schedules, visa rules, or placement results.',
    'If a question is high-stakes or specific, recommend staff handoff.',
    'Prefer recommending the placement test for level uncertainty.',
    'Return valid JSON only with this shape:',
    '{"reply":"string","suggestions":[{"label":"string","action":"courses|scholarship|placement|fees|visa|register|agent|beginner|ielts|business|mandarin|short|long|reset"}]}',
    'Keep suggestions to 0-4 items from the allowed action list.',
    siteKnowledge,
  ].join('\n');
}

function sanitizeMessages(messages) {
  if (!Array.isArray(messages)) return [];

  return messages
    .filter((message) => message && (message.type === 'user' || message.type === 'bot') && typeof message.text === 'string')
    .slice(-8)
    .map((message) => ({
      role: message.type === 'user' ? 'user' : 'assistant',
      content: message.text.slice(0, 1200),
    }));
}

function fallbackPayload(language) {
  const reply =
    language === 'zh'
      ? '我现在可以先帮助您了解课程、奖学金、水平测试、费用或报名流程。如果您需要具体安排，我们的团队会继续跟进您。'
      : language === 'ar'
        ? 'يمكنني مساعدتك الآن في الدورات والمنح واختبار تحديد المستوى والرسوم والتسجيل. وإذا احتجت تفاصيل أدق فسيتابع معك فريقنا.'
        : language === 'ms'
          ? 'Saya boleh bantu dengan kursus, biasiswa, ujian penempatan, yuran, dan pendaftaran. Jika anda perlukan butiran khusus, pasukan kami akan sambung membantu anda.'
          : 'I can help with courses, scholarship, placement test, fees, and registration. If you need specific next steps, our team can continue with you.';

  return {
    reply,
    suggestions: defaultQuickReplies,
  };
}

function normalizeSuggestions(rawSuggestions) {
  if (!Array.isArray(rawSuggestions)) return defaultQuickReplies;

  const normalized = rawSuggestions
    .map((item) => {
      const action = typeof item?.action === 'string' ? item.action.trim() : '';
      return actionMap[action] || null;
    })
    .filter(Boolean);

  return normalized.length > 0 ? normalized.slice(0, 4) : defaultQuickReplies;
}

async function callGroq({ messages, language }) {
  const apiKey = process.env.GROQ_API_KEY?.trim();
  if (!apiKey) {
    throw new Error('Missing GROQ_API_KEY');
  }

  const model = process.env.GROQ_MODEL?.trim() || 'openai/gpt-oss-20b';
  const payload = {
    model,
    temperature: 0.2,
    max_output_tokens: 350,
    response_format: { type: 'json_object' },
    messages: [
      { role: 'system', content: getSystemPrompt(language) },
      ...messages,
    ],
  };

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  if (!response.ok) {
    const message =
      typeof data?.error?.message === 'string'
        ? data.error.message
        : 'Groq chat request failed.';
    throw new Error(message);
  }

  const content = data?.choices?.[0]?.message?.content;
  if (typeof content !== 'string' || !content.trim()) {
    throw new Error('Groq returned an empty chat response.');
  }

  const parsed = JSON.parse(content);
  return {
    reply: typeof parsed?.reply === 'string' ? parsed.reply.trim() : '',
    suggestions: normalizeSuggestions(parsed?.suggestions),
  };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { messages, language } = req.body || {};
  const normalizedLanguage = normalizeLanguage(language);
  const cleanedMessages = sanitizeMessages(messages);

  if (cleanedMessages.length === 0) {
    return res.status(200).json(fallbackPayload(normalizedLanguage));
  }

  try {
    const result = await callGroq({
      messages: cleanedMessages,
      language: normalizedLanguage,
    });

    if (!result.reply) {
      return res.status(200).json(fallbackPayload(normalizedLanguage));
    }

    return res.status(200).json(result);
  } catch (_error) {
    return res.status(200).json(fallbackPayload(normalizedLanguage));
  }
}

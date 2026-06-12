const unavailableSuggestions = [
  { label: 'Contact Team', action: 'agent' },
  { label: 'Placement Test', action: 'placement' },
  { label: 'Courses', action: 'courses' },
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
- Marketing Executive Ahmed: +60 11-7248 3122
- Marketing Executive Jowed: +60 14-279 9014

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
- Do not push the placement test when a student is already ready to apply or asking about scholarship registration

Visa guidance:
- Short-term study is simpler
- For study longer than 3 months, tell the student the team should confirm the latest visa steps directly
- Do not give legal or final visa advice

Registration flow:
- Choose a course or scholarship option
- For scholarship interest, guide the student directly to the Marketing Executives to apply online
- Only mention the placement test when the student specifically asks about level checking
- Share these contacts when handing off:
  - Ahmed: +60 11-7248 3122
  - Jowed: +60 14-279 9014
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

function sanitizeMessages(messages) {
  if (!Array.isArray(messages)) return [];

  return messages
    .filter((message) => message && (message.type === 'user' || message.type === 'bot') && typeof message.text === 'string')
    .slice(-10)
    .map((message) => ({
      role: message.type === 'user' ? 'user' : 'assistant',
      content: message.text.slice(0, 1500),
    }));
}

function normalizeSuggestions(rawSuggestions) {
  if (!Array.isArray(rawSuggestions)) return [];

  const normalized = rawSuggestions
    .map((item) => {
      const action = typeof item?.action === 'string' ? item.action.trim() : '';
      const label = typeof item?.label === 'string' ? item.label.trim() : '';
      const knownAction = actionMap[action];
      if (!knownAction) return null;
      return {
        label: label || knownAction.label,
        action: knownAction.action,
      };
    })
    .filter(Boolean);

  return normalized.slice(0, 4);
}

function getSystemPrompt(language) {
  return [
    'You are the official website AI assistant for Wordsworth Language Centre.',
    getLanguageInstruction(language),
    'Answer naturally like a real assistant, not like a menu or scripted FAQ.',
    'Use only the provided site knowledge. If something is missing or uncertain, say you will connect the student with the team.',
    'Be concise, helpful, and conversational.',
    'Use a warm, promotional tone when the student asks about scholarship offers or registration.',
    'Never invent fees, schedules, visa rules, or placement results.',
    'If the student asks about their level, recommend the placement test.',
    'If the student is interested in applying, registration, or scholarship offers, direct them to our Marketing Executives: 
    Ahmed (+60 11-7248 3122) and Jowed (+60 14-279 9014).',
    'Do not tell interested students to take a placement test unless they explicitly ask about their level or need level checking.',
    'For messages like "I want to apply", "how do I register", or questions about the 2 + 1 free scholarship, reply with a direct handoff to the Marketing Executives and do not mention the placement test.',
    'For messages like "connect me to the team", do not say "I will connect you". Instead say the student can directly contact our Marketing Executives, then list Ahmed (+60 11-7248 3122) and Jowed (+60 14-279 9014).',
    'Prefer clear wording like: "Sure! For the English scholarship options, please contact our Marketing Executives directly to start your application. You can reach: • Ahmed: +60 11-7248 3122 • Jowed: +60 14-279 9014. They will guide you through the process and answer any questions you have."',
    'If the student asks something specific that needs confirmation, suggest staff handoff.',
    'Return valid JSON only with this exact shape:',
    '{"reply":"string","suggestions":[{"label":"string","action":"courses|scholarship|placement|fees|visa|register|agent|beginner|ielts|business|mandarin|short|long|reset"}]}',
    'Suggestions are optional and should only be included when truly useful.',
    siteKnowledge,
  ].join('\n');
}

function getUnavailablePayload(language) {
  const reply =
    language === 'zh'
      ? 'AI 助手暂时不可用。您可以稍后再试，或先联系团队获取帮助。'
      : language === 'ar'
        ? 'المساعد الذكي غير متاح مؤقتًا الآن. يمكنك المحاولة مرة أخرى لاحقًا أو التواصل مع الفريق مباشرة.'
        : language === 'ms'
          ? 'Pembantu AI tidak tersedia buat masa ini. Anda boleh cuba lagi sebentar lagi atau hubungi pasukan kami terus.'
          : 'The AI assistant is temporarily unavailable right now. Please try again shortly, or contact our team directly.';

  return {
    reply,
    suggestions: unavailableSuggestions,
  };
}

async function callGroq({ messages, language }) {
  const apiKey = process.env.GROQ_API_KEY?.trim();
  if (!apiKey) {
    throw new Error('Missing GROQ_API_KEY');
  }

  const model = process.env.GROQ_MODEL?.trim() || 'openai/gpt-oss-20b';
  const payload = {
    model,
    temperature: 0.3,
    max_completion_tokens: 500,
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
    throw new Error('Groq returned an empty response.');
  }

  const parsed = JSON.parse(content);
  if (typeof parsed?.reply !== 'string' || !parsed.reply.trim()) {
    throw new Error('Groq returned invalid JSON content.');
  }

  return {
    reply: parsed.reply.trim(),
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
    return res.status(200).json(getUnavailablePayload(normalizedLanguage));
  }

  try {
    const result = await callGroq({
      messages: cleanedMessages,
      language: normalizedLanguage,
    });

    return res.status(200).json(result);
  } catch (_error) {
    return res.status(200).json(getUnavailablePayload(normalizedLanguage));
  }
}

import { useEffect, useMemo, useRef, useState } from 'react';
import { MessageCircle, X, Send, Phone, Mail, ArrowRight } from 'lucide-react';
import { Button } from './ui/Button';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router';
import { useLanguage } from '../contexts/LanguageContext';

type ChatAction =
  | 'courses'
  | 'scholarship'
  | 'placement'
  | 'fees'
  | 'visa'
  | 'register'
  | 'agent'
  | 'beginner'
  | 'ielts'
  | 'business'
  | 'mandarin'
  | 'short'
  | 'long'
  | 'name'
  | 'email'
  | 'whatsapp'
  | 'reset';

type ChatMessage = {
  type: 'bot' | 'user';
  text: string;
  timestamp: Date;
  actions?: Array<{ label: string; action: ChatAction }>;
};

type LeadField = 'name' | 'email' | 'whatsapp';

const whatsappNumber = '60175045565';
const supportEmail = 'info@wordsworth.edu.my';
const marketingExecutives = [
  { name: 'Ahmed', phone: '+60 11-7248 3122', whatsapp: '601172483122' },
  { name: 'Jowed', phone: '+60 14-279 9014', whatsapp: '60142799014' },
] as const;

const courseCards = [
  {
    id: 'beginner-english',
    title: 'Beginner English',
    summary: 'Strong foundation in grammar, vocabulary, and daily conversation.',
    duration: '12 weeks',
    fee: 'Scholarship from RM 5,800 for 2 + 1 free',
  },
  {
    id: 'intermediate-english',
    title: 'Intermediate English',
    summary: 'Build fluency and confidence for daily communication.',
    duration: '16 weeks',
    fee: 'Scholarship options available',
  },
  {
    id: 'advanced-english',
    title: 'Advanced English',
    summary: 'Improve professional English and advanced language accuracy.',
    duration: '14 weeks',
    fee: 'Scholarship options available',
  },
  {
    id: 'ielts-preparation',
    title: 'IELTS Preparation',
    summary: 'Complete IELTS preparation for listening, reading, writing, and speaking.',
    duration: '10 weeks',
    fee: 'Ideal for exam-focused students',
  },
  {
    id: 'business-english',
    title: 'Business English',
    summary: 'Professional English for meetings, presentations, and emails.',
    duration: '12 weeks',
    fee: 'Best for working professionals',
  },
  {
    id: 'mandarin-course',
    title: 'Mandarin Course',
    summary: 'Structured Mandarin learning with HSK-focused progression.',
    duration: '1 + 1, 2 + 2, or 3 + 3 scholarship plans',
    fee: 'Scholarship from RM 3,150',
  },
] as const;

const getChatLocale = (language: string) => {
  if (language === 'ar') {
    return {
      welcome:
        'مرحبًا بك في دعم ووردزوورث. يمكنني مساعدتك في الدورات والمنح الدراسية واختبار تحديد المستوى والرسوم والتسجيل.',
      actions: [
        { label: 'الدورات', action: 'courses' as ChatAction },
        { label: 'المنح الدراسية', action: 'scholarship' as ChatAction },
        { label: 'اختبار تحديد المستوى', action: 'placement' as ChatAction },
        { label: 'تواصل مع الفريق', action: 'agent' as ChatAction },
      ],
    };
  }

  if (language === 'zh') {
    return {
      welcome:
        '欢迎来到 Wordsworth 支持中心。我可以帮助您了解课程、奖学金、水平测试、费用和报名流程。',
      actions: [
        { label: '课程', action: 'courses' as ChatAction },
        { label: '奖学金', action: 'scholarship' as ChatAction },
        { label: '水平测试', action: 'placement' as ChatAction },
        { label: '联系团队', action: 'agent' as ChatAction },
      ],
    };
  }

  if (language === 'ms') {
    return {
      welcome:
        'Selamat datang ke sokongan Wordsworth. Saya boleh bantu dengan kursus, biasiswa, ujian penempatan, yuran, dan pendaftaran.',
      actions: [
        { label: 'Kursus', action: 'courses' as ChatAction },
        { label: 'Biasiswa', action: 'scholarship' as ChatAction },
        { label: 'Ujian Penempatan', action: 'placement' as ChatAction },
        { label: 'Hubungi Pasukan', action: 'agent' as ChatAction },
      ],
    };
  }

  return {
    welcome:
      'Welcome to Wordsworth Support. I can help with courses, scholarship offers, placement test guidance, fees, visa questions, and registration.',
    actions: [
      { label: 'Courses', action: 'courses' as ChatAction },
      { label: 'Scholarship', action: 'scholarship' as ChatAction },
      { label: 'Placement Test', action: 'placement' as ChatAction },
      { label: 'Contact Team', action: 'agent' as ChatAction },
    ],
  };
};

const initialBotMessage = (language: string): ChatMessage => {
  const locale = getChatLocale(language);

  return {
    type: 'bot',
    text: locale.welcome,
    timestamp: new Date(),
    actions: locale.actions,
  };
};

function makeBotMessage(
  text: string,
  actions?: Array<{ label: string; action: ChatAction }>
): ChatMessage {
  return {
    type: 'bot',
    text,
    timestamp: new Date(),
    actions,
  };
}

function makeUserMessage(text: string): ChatMessage {
  return {
    type: 'user',
    text,
    timestamp: new Date(),
  };
}

export function FloatingChat() {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => [initialBotMessage(language)]);
  const [inputMessage, setInputMessage] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [expectedLeadField, setExpectedLeadField] = useState<LeadField | null>(null);
  const [lead, setLead] = useState({ name: '', email: '', whatsapp: '' });
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isOpen]);

  useEffect(() => {
    setMessages((current) => {
      if (current.length !== 1 || current[0]?.type !== 'bot') {
        return current;
      }

      return [initialBotMessage(language)];
    });
  }, [language]);

  const handoffMessage = useMemo(() => {
    const details = [
      lead.name ? `Name: ${lead.name}` : null,
      lead.email ? `Email: ${lead.email}` : null,
      lead.whatsapp ? `WhatsApp: ${lead.whatsapp}` : null,
    ]
      .filter(Boolean)
      .join('%0A');

    return `https://wa.me/${whatsappNumber}?text=Hi%20Wordsworth%20team,%20I%20need%20help%20with%20a%20course.%0A${details}`;
  }, [lead.email, lead.name, lead.whatsapp]);

  const appendMessages = (...nextMessages: ChatMessage[]) => {
    setMessages((current) => [...current, ...nextMessages]);
  };

  const promptForLeadField = (field: LeadField) => {
    setExpectedLeadField(field);

    const prompts: Record<LeadField, string> = {
      name: 'Please type your name and I will prepare the handoff for our team.',
      email: 'Please type your email so our team can get back to you.',
      whatsapp: 'Please type your WhatsApp number with country code.',
    };

    appendMessages(makeBotMessage(prompts[field]));
  };

  const handleLeadCapture = (value: string) => {
    if (!expectedLeadField) return false;

    const trimmedValue = value.trim();
    if (!trimmedValue) return false;

    setLead((current) => ({ ...current, [expectedLeadField]: trimmedValue }));

    const nextAction =
      expectedLeadField === 'name'
        ? 'email'
        : expectedLeadField === 'email'
          ? 'whatsapp'
          : null;

    setExpectedLeadField(nextAction as LeadField | null);

    if (nextAction) {
      const nextPrompt =
        nextAction === 'email'
          ? 'Thanks. Now send your email address.'
          : 'Great. Now send your WhatsApp number so our team can contact you.';

      appendMessages(makeBotMessage(nextPrompt));
    } else {
      appendMessages(
        makeBotMessage(
          'Perfect. Your details are ready. Tap WhatsApp below or use Contact Team so our staff can continue with you.',
          [
            { label: 'Contact Team', action: 'agent' },
            { label: 'Start Over', action: 'reset' },
          ]
        )
      );
    }

    return true;
  };

  const getCourseListText = () =>
    courseCards
      .map((course) => `• ${course.title}: ${course.summary} ${course.duration}. ${course.fee}.`)
      .join('\n');

  const getBotReply = (action: ChatAction): ChatMessage => {
    switch (action) {
      case 'courses':
        return makeBotMessage(
          `Here are the main options we currently offer:\n${getCourseListText()}\n\nTell me your goal and I can suggest the best one.`,
          [
            { label: 'Beginner English', action: 'beginner' },
            { label: 'IELTS', action: 'ielts' },
            { label: 'Business English', action: 'business' },
            { label: 'Mandarin', action: 'mandarin' },
          ]
        );
      case 'scholarship':
        return makeBotMessage(
          'Sure! For the English scholarship options, please contact our Marketing Executives directly to start your application. You can reach:\n- Ahmed at +60 11-7248 3122\n- Jowed at +60 14-279 9014\n\nThey will guide you through the process and answer any questions you have.',
          [
            { label: 'English Scholarship', action: 'fees' },
            { label: 'Mandarin Scholarship', action: 'mandarin' },
            { label: 'Contact Team', action: 'agent' },
          ]
        );
        return makeBotMessage(
          'Current scholarship offers:\n• English: 2 + 1 free, 4 + 2 free, 5 + 3 free, 6 + 6 free\n• Mandarin: 1 + 1 free, 2 + 2 free, 3 + 3 free\n\nThese offers may include registration, materials, placement support, and some visa-related items depending on the course.',
          [
            { label: 'English Scholarship', action: 'fees' },
            { label: 'Mandarin Scholarship', action: 'mandarin' },
            { label: 'How to Register', action: 'register' },
          ]
        );
      case 'placement':
        return makeBotMessage(
          'The placement test helps us match students to the right level. After you finish the test, our team reviews the result and gets back to you with the suitable course.',
          [
            { label: 'Open Placement Test', action: 'short' },
            { label: 'Contact Team', action: 'agent' },
          ]
        );
      case 'fees':
        return makeBotMessage(
          'For scholarship-based English study, the main offers currently start from RM 5,800 for 2 months + 1 month free. Mandarin scholarship starts from RM 3,150 for 1 month + 1 month free.\n\nTo start your application, please contact our Marketing Executives directly:\n- Ahmed at +60 11-7248 3122\n- Jowed at +60 14-279 9014\n\nThey will guide you through the process and answer any questions you have.',
          [
            { label: 'English Courses', action: 'courses' },
            { label: 'Mandarin Course', action: 'mandarin' },
            { label: 'Contact Team', action: 'agent' },
          ]
        );
        return makeBotMessage(
          'For scholarship-based English study, the main offers currently start from RM 5,800 for 2 months + 1 month free. Mandarin scholarship starts from RM 3,150 for 1 month + 1 month free.',
          [
            { label: 'English Courses', action: 'courses' },
            { label: 'Mandarin Course', action: 'mandarin' },
            { label: 'Ask About Visa', action: 'visa' },
          ]
        );
      case 'visa':
        return makeBotMessage(
          'Short-term study usually does not require the same visa process as long-term study. For study beyond 3 months, our team should confirm the latest visa steps with you directly.',
          [
            { label: 'Less Than 3 Months', action: 'short' },
            { label: 'More Than 3 Months', action: 'long' },
            { label: 'Contact Team', action: 'agent' },
          ]
        );
      case 'register':
        return makeBotMessage(
          'The simplest path is:\n1. Choose your course or scholarship plan\n2. Contact our Marketing Executives directly to start your application\n\nYou can reach:\n- Ahmed at +60 11-7248 3122\n- Jowed at +60 14-279 9014\n\nThey will guide you through the process and answer any questions you have.',
          [
            { label: 'Courses', action: 'courses' },
            { label: 'Contact Team', action: 'agent' },
          ]
        );
        return makeBotMessage(
          'The simplest path is:\n1. Choose your course or scholarship plan\n2. Take the placement test if needed\n3. Submit your registration\n4. Our team contacts you for the next steps',
          [
            { label: 'Courses', action: 'courses' },
            { label: 'Placement Test', action: 'placement' },
            { label: 'Contact Team', action: 'agent' },
          ]
        );
      case 'beginner':
        return makeBotMessage(
          'Beginner English is best if you are starting from the basics and want to build vocabulary, grammar, and daily speaking confidence.',
          [
            { label: 'View Course Page', action: 'courses' },
            { label: 'Placement Test', action: 'placement' },
            { label: 'Contact Team', action: 'agent' },
          ]
        );
      case 'ielts':
        return makeBotMessage(
          'IELTS Preparation is best if your goal is an exam score. IELTS Intensive is better when you need faster preparation in a shorter period.',
          [
            { label: 'Fees', action: 'fees' },
            { label: 'Placement Test', action: 'placement' },
            { label: 'Contact Team', action: 'agent' },
          ]
        );
      case 'business':
        return makeBotMessage(
          'Business English is ideal for meetings, presentations, emails, and professional communication. It fits learners who already want practical workplace English.',
          [
            { label: 'View Courses', action: 'courses' },
            { label: 'Contact Team', action: 'agent' },
          ]
        );
      case 'mandarin':
        return makeBotMessage(
          'Mandarin Course includes structured learning with scholarship plans such as 1 + 1 free, 2 + 2 free, and 3 + 3 free. It is suitable for beginners and HSK-focused learners.',
          [
            { label: 'Mandarin Scholarship', action: 'scholarship' },
            { label: 'Contact Team', action: 'agent' },
          ]
        );
      case 'short':
        return makeBotMessage(
          'For short-term study, please contact our Marketing Executives directly to start your application. You can reach:\n- Ahmed at +60 11-7248 3122\n- Jowed at +60 14-279 9014\n\nThey will guide you through the process and answer any questions you have.',
          [
            { label: 'Contact Team', action: 'agent' },
          ]
        );
        return makeBotMessage(
          'For short-term study, we usually guide students to the lighter registration path. You can start from the placement test or ask our team for the fastest option.',
          [
            { label: 'Placement Test', action: 'placement' },
            { label: 'Contact Team', action: 'agent' },
          ]
        );
      case 'long':
        return makeBotMessage(
          'For study longer than 3 months, we recommend speaking with our team so they can guide you on documents, visa processing, and the right scholarship package.',
          [
            { label: 'Contact Team', action: 'agent' },
            { label: 'Scholarship', action: 'scholarship' },
          ]
        );
      case 'name':
      case 'email':
      case 'whatsapp':
        return makeBotMessage('');
      case 'reset':
        return initialBotMessage(language);
      case 'agent':
      default:
        return makeBotMessage(
          `Sure! Please contact our Marketing Executives directly to start your application. You can reach:\n- ${marketingExecutives[0].name} at ${marketingExecutives[0].phone}\n- ${marketingExecutives[1].name} at ${marketingExecutives[1].phone}\n\nThey will guide you through the process and answer any questions you have.\n\nIf you want, send your name, email, and WhatsApp here first so the staff already has your details.`,
          [
            { label: 'Send Name', action: 'name' },
            { label: 'Send Email', action: 'email' },
            { label: 'Send WhatsApp', action: 'whatsapp' },
            { label: 'Start Over', action: 'reset' },
          ]
        );
        return makeBotMessage(
          'I can hand you over to our team. If you want, send your name, email, and WhatsApp here first so the staff already has your details.',
          [
            { label: 'Send Name', action: 'name' },
            { label: 'Send Email', action: 'email' },
            { label: 'Send WhatsApp', action: 'whatsapp' },
            { label: 'Start Over', action: 'reset' },
          ]
        );
    }
  };

  const getUnavailableReply = (): ChatMessage =>
    makeBotMessage(
      'The AI assistant is temporarily unavailable right now. Please try again shortly, or contact our team directly.',
      [
        { label: 'Contact Team', action: 'agent' },
        { label: 'Placement Test', action: 'placement' },
        { label: 'Courses', action: 'courses' },
      ]
    );

  const requestBotReply = async (nextMessages: ChatMessage[]) => {
    try {
      setIsThinking(true);

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language,
          messages: nextMessages.map((message) => ({
            type: message.type,
            text: message.text,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error('Chat API request failed.');
      }

      const data = await response.json();
      if (typeof data?.reply !== 'string' || !data.reply.trim()) {
        throw new Error('Chat API returned no reply.');
      }

      const actions = Array.isArray(data?.suggestions)
        ? data.suggestions
            .filter((item: { label?: string; action?: string }) => typeof item?.label === 'string' && typeof item?.action === 'string')
            .map((item: { label: string; action: string }) => ({
              label: item.label,
              action: item.action as ChatAction,
            }))
        : undefined;

      appendMessages(makeBotMessage(data.reply.trim(), actions && actions.length > 0 ? actions : undefined));
    } catch (_error) {
      appendMessages(getUnavailableReply());
    } finally {
      setIsThinking(false);
    }
  };

  const handleQuickReply = async (action: ChatAction, label?: string) => {
    if (action === 'reset') {
      setLead({ name: '', email: '', whatsapp: '' });
      setExpectedLeadField(null);
      setMessages([makeUserMessage(label || 'Start Over'), initialBotMessage(language)]);
      return;
    }

    if (action === 'name' || action === 'email' || action === 'whatsapp') {
      appendMessages(makeUserMessage(label || action));
      promptForLeadField(action);
      return;
    }

    const userText = label || action;
    const userMessage = makeUserMessage(userText);
    const nextMessages = [...messages, userMessage];
    appendMessages(userMessage);
    await requestBotReply(nextMessages);
  };

  const handleSendMessage = async (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = inputMessage.trim();
    if (!trimmed) return;

    setInputMessage('');
    const userMessage = makeUserMessage(trimmed);
    const nextMessages = [...messages, userMessage];
    appendMessages(userMessage);

    if (handleLeadCapture(trimmed)) {
      return;
    }
    await requestBotReply(nextMessages);
  };

  return (
    <>
      <motion.a
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        href={handoffMessage}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 right-4 md:right-6 z-50 bg-[#25D366] text-white p-3.5 rounded-full shadow-2xl hover:brightness-95 transition-colors"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </motion.a>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-4 md:right-6 z-50 w-[calc(100vw-2rem)] md:w-[26rem] bg-white rounded-2xl shadow-2xl overflow-hidden border border-brand-blue/10"
          >
            <div className="bg-gradient-to-r from-brand-blue to-brand-blue-dark text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-brand-green w-3 h-3 rounded-full animate-pulse"></div>
                <div>
                  <h3 className="text-white">Wordsworth Assistant</h3>
                  <p className="text-xs text-blue-100">Free on-site support assistant</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="h-[34rem] flex flex-col">
              <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_18%,#ffffff_100%)]">
                {messages.map((message, index) => (
                  <div
                    key={`${message.timestamp.getTime()}-${index}`}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className="max-w-[88%]">
                      <div
                        className={`rounded-2xl px-4 py-3 ${
                          message.type === 'user'
                            ? 'bg-brand-blue text-white rounded-br-sm'
                            : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-line leading-6">{message.text}</p>
                      </div>
                      {message.type === 'bot' && message.actions && message.actions.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {message.actions.map((action) => (
                            <button
                              key={`${index}-${action.action}-${action.label}`}
                              onClick={() => handleQuickReply(action.action, action.label)}
                              disabled={isThinking}
                              className="rounded-full border border-brand-blue/15 bg-white px-3 py-1.5 text-xs font-medium text-brand-blue hover:bg-brand-blue hover:text-white transition-colors"
                            >
                              {action.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {isThinking && (
                  <div className="flex justify-start">
                    <div className="max-w-[88%] rounded-2xl rounded-bl-sm bg-gray-100 px-4 py-3 text-sm text-gray-600">
                      Wordsworth Assistant is replying...
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t border-gray-200 p-4 bg-white">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(event) => setInputMessage(event.target.value)}
                    placeholder={expectedLeadField ? `Type your ${expectedLeadField}...` : 'Ask about courses, fees, scholarship, or visa...'}
                    disabled={isThinking}
                    className="flex-1 px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-brand-blue transition-colors text-sm"
                  />
                  <button
                    type="submit"
                    disabled={isThinking}
                    className="bg-brand-blue text-white p-2.5 rounded-lg hover:bg-brand-blue-dark transition-colors"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </form>
              </div>

              <div className="border-t border-gray-200 bg-gray-50 p-3 flex items-center justify-center gap-4 text-xs">
                <a href={handoffMessage} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-brand-green hover:underline">
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
                <a href={`tel:+${whatsappNumber}`} className="flex items-center gap-1 text-brand-blue hover:underline">
                  <Phone className="w-4 h-4" />
                  +60 17-504 5565
                </a>
                <a href={`mailto:${supportEmail}`} className="flex items-center gap-1 text-brand-blue hover:underline">
                  <Mail className="w-4 h-4" />
                  Email
                </a>
                <Link to="/contact" onClick={() => setIsOpen(false)} className="flex items-center gap-1 text-brand-blue hover:underline">
                  <ArrowRight className="w-4 h-4" />
                  Contact
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen((current) => !current)}
        className="fixed bottom-4 right-4 md:right-6 z-50 bg-brand-blue text-white p-4 rounded-full shadow-2xl hover:bg-brand-blue-dark transition-colors"
        aria-label="Open chat"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <div className="relative">
            <MessageCircle className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 bg-brand-orange w-3 h-3 rounded-full animate-pulse"></span>
          </div>
        )}
      </motion.button>
    </>
  );
}

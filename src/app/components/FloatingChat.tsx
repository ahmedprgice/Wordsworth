import { useState } from 'react';
import { MessageCircle, X, Send, Phone, Mail } from 'lucide-react';
import { Button } from './ui/Button';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router';

const quickReplies = [
  { label: 'View Courses', action: 'courses' },
  { label: 'Course Fees', action: 'fees' },
  { label: 'Class Schedule', action: 'schedule' },
  { label: 'Speak to Agent', action: 'agent' },
];

export function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: 'Hello! 👋 Welcome to Wordsworth Language Centre. I\'m here to help you with course information, fees, and schedules. How can I assist you today?',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleQuickReply = (action: string) => {
    let response = '';

    switch (action) {
      case 'courses':
        response = 'We offer a wide range of English courses including Beginner, Intermediate, Advanced, IELTS Preparation, and Business English. Would you like to see our full course catalog?';
        break;
      case 'fees':
        response = 'Our course fees range from RM 800 to RM 2,500 depending on the program and duration. We also offer flexible payment plans. Would you like specific pricing for a particular course?';
        break;
      case 'schedule':
        response = 'We have flexible schedules available:\n• Weekday classes (Mon-Fri evenings)\n• Weekend classes (Sat-Sun)\n• Intensive courses (Mon-Fri mornings)\n\nWhich schedule works best for you?';
        break;
      case 'agent':
        response = 'I\'d be happy to connect you with one of our education counselors! You can:\n• Call us: +60 17-504 5565\n• WhatsApp: +60 17-504 5565\n• Email: info@wordsworth.edu.my\n\nWe\'re located at Megan Avenue 2, Jalan Yap Kwan Seng, Kuala Lumpur. Visit us or contact us, and we\'ll respond within 24 hours.';
        break;
    }

    const userMessage = {
      type: 'user',
      text: quickReplies.find(r => r.action === action)?.label || '',
      timestamp: new Date(),
    };

    const botMessage = {
      type: 'bot',
      text: response,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage, botMessage]);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = {
      type: 'user',
      text: inputMessage,
      timestamp: new Date(),
    };

    const botMessage = {
      type: 'bot',
      text: 'Thank you for your message! Our team will get back to you shortly. For immediate assistance, please call us at +60 17-504 5565 or WhatsApp us at the same number.',
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage, botMessage]);
    setInputMessage('');
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-4 md:right-6 z-50 w-[calc(100vw-2rem)] md:w-96 bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="bg-gradient-to-r from-brand-blue to-brand-blue-dark text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-brand-green w-3 h-3 rounded-full animate-pulse"></div>
                <div>
                  <h3 className="text-white">Chat with Wordsworth Support</h3>
                  <p className="text-xs text-blue-100">We typically reply instantly</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="h-96 flex flex-col">
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                        message.type === 'user'
                          ? 'bg-brand-blue text-white rounded-br-sm'
                          : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">{message.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              {messages.length <= 2 && (
                <div className="px-4 pb-4">
                  <p className="text-xs text-gray-500 mb-2">Quick replies:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {quickReplies.map((reply) => (
                      <button
                        key={reply.action}
                        onClick={() => handleQuickReply(reply.action)}
                        className="px-3 py-2 bg-blue-50 text-brand-blue rounded-lg text-sm hover:bg-blue-100 transition-colors"
                      >
                        {reply.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="border-t border-gray-200 p-4">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-brand-blue transition-colors text-sm"
                  />
                  <button
                    type="submit"
                    className="bg-brand-blue text-white p-2 rounded-lg hover:bg-brand-blue-dark transition-colors"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </form>
              </div>

              <div className="border-t border-gray-200 bg-gray-50 p-3 flex items-center justify-center gap-4 text-xs">
                <a href="https://wa.me/60175045565" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-brand-green hover:underline">
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
                <a href="tel:+60175045565" className="flex items-center gap-1 text-brand-blue hover:underline">
                  <Phone className="w-4 h-4" />
                  +60 17-504 5565
                </a>
                <Link to="/contact" onClick={() => setIsOpen(false)} className="flex items-center gap-1 text-brand-blue hover:underline">
                  <Mail className="w-4 h-4" />
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
        onClick={() => setIsOpen(!isOpen)}
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

import { useState } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const languages = [
  { code: 'en' as const, name: 'English', flag: '🇬🇧' },
  { code: 'ar' as const, name: 'العربية', flag: '🇸🇦' },
  { code: 'zh' as const, name: '中文', flag: '🇨🇳' },
  { code: 'ms' as const, name: 'Bahasa', flag: '🇲🇾' },
];

export function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage } = useLanguage();

  const currentLang = languages.find(lang => lang.code === language) || languages[0];

  const handleLanguageChange = (lang: typeof languages[0]) => {
    setLanguage(lang.code);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <Globe className="w-4 h-4 text-gray-600" />
        <span className="text-sm text-gray-700">{currentLang.code.toUpperCase()}</span>
        <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang)}
              className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors ${
                currentLang.code === lang.code ? 'bg-blue-50' : ''
              }`}
            >
              <span className="text-2xl">{lang.flag}</span>
              <span className="text-sm text-gray-800">{lang.name}</span>
              {currentLang.code === lang.code && (
                <div className="ml-auto w-2 h-2 bg-brand-blue rounded-full" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

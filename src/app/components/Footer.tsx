import { Link } from 'react-router';
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <img
              src="/assets/images/wordsworth-logo.png"
              alt="Wordsworth Language Centre"
              className="h-10 w-auto object-contain mb-4"
            />
            <p className="text-sm">
              {t('footer.description')}
            </p>
          </div>

          <div>
            <h4 className="text-white mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/courses" className="hover:text-white transition-colors">{t('nav.courses')}</Link></li>
              <li><Link to="/media" className="hover:text-white transition-colors">{t('nav.media')}</Link></li>
              <li><Link to="/placement-test" className="hover:text-white transition-colors">{t('nav.placementTest')}</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">{t('nav.contact')}</Link></li>
              <li><Link to="/register" className="hover:text-white transition-colors">{t('common.register')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white mb-4">{t('footer.contact')}</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <a href="tel:+60175045565" className="hover:text-white transition-colors">
                  +60 17-504 5565
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:info@wordsworth.edu.my" className="hover:text-white transition-colors">
                  info@wordsworth.edu.my
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>Megan Avenue 2,<br />Jalan Yap Kwan Seng,<br />Kuala Lumpur</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white mb-4">{t('footer.followUs')}</h4>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors" aria-label="WhatsApp">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>&copy; 2026 Wordsworth Language Centre. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
}

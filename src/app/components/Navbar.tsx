import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/Button';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useLanguage } from '../contexts/LanguageContext';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  const isActive = (path: string) => location.pathname === path;
  const isMediaActive = location.pathname === '/media';

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center h-16">
          {/* Logo - Left Side */}
          <Link to="/" className="flex items-center flex-shrink-0">
            <img
              src="/assets/images/wordsworth-logo.png"
              alt="Wordsworth Language Centre"
              className="h-8 md:h-10 w-auto object-contain"
            />
          </Link>

          {/* Navigation Items - Center */}
          <div className="hidden xl:flex flex-1 items-center justify-center gap-8 2xl:gap-10 px-6">
            <Link
              to="/"
              className={`pb-1 border-b-2 transition-colors whitespace-nowrap ${
                isActive('/')
                  ? 'text-brand-blue font-medium border-brand-orange'
                  : 'text-gray-600 hover:text-brand-blue border-transparent'
              }`}
            >
              {t('nav.home')}
            </Link>
            <Link
              to="/courses"
              className={`pb-1 border-b-2 transition-colors whitespace-nowrap ${
                isActive('/courses')
                  ? 'text-brand-blue font-medium border-brand-orange'
                  : 'text-gray-600 hover:text-brand-blue border-transparent'
              }`}
            >
              {t('nav.courses')}
            </Link>

            <Link
              to="/media"
              className={`pb-1 border-b-2 transition-colors whitespace-nowrap ${
                isMediaActive
                  ? 'text-brand-blue font-medium border-brand-orange'
                  : 'text-gray-600 hover:text-brand-blue border-transparent'
              }`}
            >
              {t('nav.media')}
            </Link>

            <Link
              to="/placement-test"
              className={`pb-1 border-b-2 transition-colors whitespace-nowrap ${
                isActive('/placement-test')
                  ? 'text-brand-blue font-medium border-brand-orange'
                  : 'text-gray-600 hover:text-brand-blue border-transparent'
              }`}
            >
              {t('nav.placementTest')}
            </Link>
          </div>

          {/* Action Buttons - Right Side */}
          <div className="hidden xl:flex items-center gap-3 flex-shrink-0 ml-auto">
            <LanguageSwitcher />
            <Link to="/contact">
              <Button variant="secondary" size="sm" className="py-1.5">
                {t('nav.contact')}
              </Button>
            </Link>
            <Link to="/contact#contact-form">
              <Button variant="primary" size="sm" className="bg-brand-orange hover:brightness-95 py-1.5">
                {t('nav.applyNow')}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="xl:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-brand-blue" />
            ) : (
              <Menu className="w-6 h-6 text-brand-blue" />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <div className="xl:hidden pb-6 space-y-2">
            <Link
              to="/"
              className={`block py-3 ${
                isActive('/')
                  ? 'text-brand-blue font-medium'
                  : 'text-gray-600'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.home')}
            </Link>
            <Link
              to="/courses"
              className={`block py-3 ${
                isActive('/courses')
                  ? 'text-brand-blue font-medium'
                  : 'text-gray-600'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.courses')}
            </Link>

            <Link
              to="/media"
              className={`block py-3 ${
                isMediaActive
                  ? 'text-brand-blue font-medium'
                  : 'text-gray-600'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.media')}
            </Link>

            <Link
              to="/placement-test"
              className={`block py-3 ${
                isActive('/placement-test')
                  ? 'text-brand-blue font-medium'
                  : 'text-gray-600'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.placementTest')}
            </Link>
            <div className="pt-4 pb-4 border-t border-gray-200">
              <LanguageSwitcher />
            </div>

            <div className="pt-3">
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-2.5 shadow-sm space-y-2.5">
              <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                <Button variant="secondary" size="sm" className="w-full h-11 rounded-lg border-gray-300 bg-white hover:bg-gray-100">
                  {t('nav.contact')}
                </Button>
              </Link>
              <Link to="/contact#contact-form" onClick={() => setIsMenuOpen(false)}>
                <Button variant="primary" size="sm" className="w-full h-11 rounded-lg bg-brand-orange hover:brightness-95 shadow-[0_8px_18px_rgba(245,162,31,0.30)]">
                  {t('nav.applyNow')}
                </Button>
              </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

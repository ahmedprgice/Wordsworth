import { Link } from 'react-router';
import { Home, Search } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useLanguage } from '../contexts/LanguageContext';

export function NotFoundPage() {
  const { language, isRTL, t } = useLanguage();
  const isArabic = language === 'ar';
  const isChinese = language === 'zh';

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-blue to-brand-blue-dark flex items-center justify-center px-4" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="text-center text-white max-w-2xl">
        <div className="mb-8">
          <h1 className="text-9xl mb-4 text-white">404</h1>
          <h2 className="text-3xl mb-4 text-white">{isArabic ? 'الصفحة غير موجودة' : isChinese ? '页面未找到' : 'Page Not Found'}</h2>
          <p className="text-xl text-blue-100 mb-8">
            {isArabic
              ? 'عذرًا! الصفحة التي تبحث عنها غير متاحة الآن. دعنا نعيدك إلى المسار الصحيح.'
              : isChinese
                ? '抱歉！您查找的页面暂时不可用。让我们帮您回到正确的位置。'
                : "Oops! The page you're looking for seems to have wandered off. Let's get you back on track."}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button variant="secondary" size="lg">
              <Home className="w-5 h-5" />
              {isArabic ? 'الذهاب إلى الرئيسية' : isChinese ? '返回首页' : 'Go to Homepage'}
            </Button>
          </Link>
          <Link to="/courses">
            <Button variant="outline" size="lg" className="bg-white/10 border-white text-white hover:bg-white hover:text-brand-blue">
              <Search className="w-5 h-5" />
              {isArabic ? 'تصفح الدورات' : isChinese ? '浏览课程' : 'Browse Courses'}
            </Button>
          </Link>
        </div>

        <div className="mt-12 pt-12 border-t border-white/20">
          <p className="text-blue-100 mb-4">{isArabic ? 'هل تبحث عن شيء محدد؟' : isChinese ? '正在寻找特定内容？' : 'Looking for something specific?'}</p>
          <div className="flex flex-wrap gap-4 justify-center text-sm">
            <Link to="/" className="hover:text-white transition-colors">{t('nav.home')}</Link>
            <Link to="/courses" className="hover:text-white transition-colors">{t('nav.courses')}</Link>
            <Link to="/media" className="hover:text-white transition-colors">{t('nav.media')}</Link>
            <Link to="/placement-test" className="hover:text-white transition-colors">{t('nav.placementTest')}</Link>
            <Link to="/contact" className="hover:text-white transition-colors">{t('nav.contact')}</Link>
            <Link to="/login" className="hover:text-white transition-colors">{t('nav.login')}</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

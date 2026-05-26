import { useState } from 'react';
import { Link } from 'react-router';
import { Clock, Users, ArrowRight, Filter, Download } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/card';
import { useLanguage } from '../contexts/LanguageContext';

const allCourses = [
  {
    id: 'beginner-english',
    title: 'Beginner English',
    description: 'Build a strong foundation in English grammar, vocabulary, and basic conversation skills.',
    level: 'Beginner',
    type: 'General English',
    duration: '12 weeks',
    schedule: 'Mon, Wed, Fri',
    students: 15,
    price: 'RM 1,200',
  },
  {
    id: 'intermediate-english',
    title: 'Intermediate English',
    description: 'Enhance your fluency and confidence in everyday English communication.',
    level: 'Intermediate',
    type: 'General English',
    duration: '16 weeks',
    schedule: 'Tue, Thu',
    students: 12,
    price: 'RM 1,500',
  },
  {
    id: 'advanced-english',
    title: 'Advanced English',
    description: 'Master complex grammar structures and sophisticated vocabulary for professional settings.',
    level: 'Advanced',
    type: 'General English',
    duration: '14 weeks',
    schedule: 'Mon, Wed',
    students: 10,
    price: 'RM 1,800',
  },
  {
    id: 'ielts-preparation',
    title: 'IELTS Preparation',
    description: 'Comprehensive preparation for all four IELTS test sections with proven strategies.',
    level: 'Intermediate',
    type: 'IELTS',
    duration: '10 weeks',
    schedule: 'Sat, Sun',
    students: 20,
    price: 'RM 2,000',
  },
  {
    id: 'ielts-intensive',
    title: 'IELTS Intensive',
    description: 'Fast-track your IELTS preparation with intensive daily classes and practice tests.',
    level: 'Advanced',
    type: 'IELTS',
    duration: '6 weeks',
    schedule: 'Mon-Fri',
    students: 15,
    price: 'RM 2,500',
  },
  {
    id: 'business-english',
    title: 'Business English',
    description: 'Professional English for meetings, presentations, emails, and business communication.',
    level: 'Intermediate',
    type: 'Business English',
    duration: '12 weeks',
    schedule: 'Tue, Thu',
    students: 12,
    price: 'RM 1,800',
  },
  {
    id: 'conversation-club',
    title: 'Conversation Club',
    description: 'Practice speaking English in a relaxed, supportive environment with native speakers.',
    level: 'Beginner',
    type: 'Conversation',
    duration: '8 weeks',
    schedule: 'Friday',
    students: 20,
    price: 'RM 800',
  },
  {
    id: 'academic-writing',
    title: 'Academic Writing',
    description: 'Master essay writing, research papers, and academic English for university studies.',
    level: 'Advanced',
    type: 'Academic',
    duration: '10 weeks',
    schedule: 'Wed, Fri',
    students: 10,
    price: 'RM 1,600',
  },
];

export function CoursesPage() {
  const { t, language, isRTL } = useLanguage();
  const isArabic = language === 'ar';
  const ui = isArabic
    ? {
        maxStudentsPerClass: (count: number) => `الحد الأقصى ${count} طالبًا لكل فصل`,
        notSureTitle: 'لست متأكدًا من الدورة المناسبة لك؟',
        notSureDesc: 'خذ اختبار تحديد المستوى المجاني لاكتشاف مستواك الحالي في اللغة الإنجليزية والحصول على توصيات مناسبة للدورات.',
        takePlacement: 'خذ اختبار تحديد المستوى',
      }
    : {
        maxStudentsPerClass: (count: number) => `Max ${count} students per class`,
        notSureTitle: 'Not Sure Which Course is Right for You?',
        notSureDesc: 'Take our free placement test to discover your current English level and get personalized course recommendations.',
        takePlacement: 'Take Placement Test',
      };
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');

  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];
  const types = ['All', 'General English', 'IELTS', 'Business English', 'Conversation', 'Academic'];

  const filteredCourses = allCourses.filter(course => {
    const levelMatch = selectedLevel === 'All' || course.level === selectedLevel;
    const typeMatch = selectedType === 'All' || course.type === selectedType;
    return levelMatch && typeMatch;
  });

  const getLevelLabel = (level: string) => {
    const map: Record<string, string> = {
      'All': t('level.all'),
      'Beginner': t('level.beginner'),
      'Intermediate': t('level.intermediate'),
      'Advanced': t('level.advanced'),
    };
    return map[level] || level;
  };

  const getTypeLabel = (type: string) => {
    const map: Record<string, string> = {
      'All': t('type.all'),
      'General English': t('type.generalEnglish'),
      'IELTS': t('type.ielts'),
      'Business English': t('type.businessEnglish'),
      'Conversation': t('type.conversation'),
      'Academic': t('type.academic'),
    };
    return map[type] || type;
  };
  const getLevelPillClasses = (level: string) => {
    if (level === 'Beginner') return 'bg-brand-orange/10 text-brand-orange';
    if (level === 'Intermediate') return 'bg-brand-orange/20 text-brand-orange';
    return 'bg-brand-orange/20 text-brand-orange';
  };

  const getTypePillClasses = (type: string) => {
    if (type === 'IELTS' || type === 'Academic') return 'bg-brand-orange/15 text-brand-orange';
    if (type === 'Business English') return 'bg-brand-orange/10 text-brand-orange';
    return 'bg-orange-50 text-brand-orange';
  };

  const getCourseTitle = (id: string, fallback: string) => {
    const map: Record<string, { key: string; fallback: string }> = {
      'beginner-english': { key: 'course.beginnerEnglish', fallback: 'Beginner English' },
      'intermediate-english': { key: 'course.intermediateEnglish', fallback: 'Intermediate English' },
      'advanced-english': { key: 'course.advancedEnglish', fallback: 'Advanced English' },
      'ielts-preparation': { key: 'course.ieltsPreparation', fallback: 'IELTS Preparation' },
      'business-english': { key: 'course.businessEnglish', fallback: 'Business English' },
      'conversation-club': { key: 'course.conversationClub', fallback: 'Conversation Club' },
      'academic-writing': { key: 'course.academicWriting', fallback: 'Academic Writing' },
    };
    const entry = map[id];
    if (!entry) return fallback;
    const translated = t(entry.key);
    return translated === entry.key ? entry.fallback : translated;
  };

  const getCourseDescription = (id: string, fallback: string) => {
    if (!isArabic) return fallback;
    const map: Record<string, string> = {
      'beginner-english': 'ابنِ أساسًا قويًا في قواعد اللغة الإنجليزية والمفردات ومهارات المحادثة الأساسية.',
      'intermediate-english': 'طوّر طلاقتك وثقتك في التواصل اليومي باللغة الإنجليزية.',
      'advanced-english': 'أتقن التراكيب النحوية المعقدة والمفردات المتقدمة للبيئات المهنية.',
      'ielts-preparation': 'تحضير شامل لأقسام اختبار IELTS الأربعة مع استراتيجيات مجربة.',
      'ielts-intensive': 'برنامج مكثف لتحضير IELTS مع حصص يومية واختبارات تدريبية.',
      'business-english': 'إنجليزية احترافية للاجتماعات والعروض التقديمية والبريد الإلكتروني والتواصل في العمل.',
      'conversation-club': 'تدرب على التحدث بالإنجليزية في بيئة مريحة وداعمة.',
      'academic-writing': 'أتقن كتابة المقالات والأبحاث والإنجليزية الأكاديمية للدراسة الجامعية.',
    };
    return map[id] || fallback;
  };

  return (
    <div className="min-h-screen bg-gray-50" dir={isRTL ? 'rtl' : 'ltr'}>
      <section className="relative overflow-hidden bg-white text-white py-3 sm:py-4 min-h-[196px] sm:min-h-[210px] flex items-center">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#f5a21f_0%,#f5a21f_24%,#ffffff_24%,#ffffff_58%,#06115a_58%,#06115a_100%)]" />
        <div className="absolute inset-0 opacity-90 bg-[radial-gradient(circle_at_18%_28%,rgba(255,255,255,0.45)_0_14%,transparent_15%),linear-gradient(120deg,transparent_0_42%,rgba(245,162,31,0.9)_42%_50%,transparent_50%_100%)]" />
        <div className="absolute -left-20 top-0 h-full w-64 -skew-x-12 bg-brand-blue" />
        <div className="absolute right-0 bottom-0 h-28 w-72 -skew-x-12 bg-brand-orange/90" />
        <div className="absolute inset-0 bg-brand-blue/30" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mx-auto max-w-2xl rounded-xl bg-brand-blue/45 px-4 py-2.5 sm:px-6 sm:py-3 backdrop-blur-[1px]">
          <h1 className="mb-3 text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.45)]">{t('nav.courses')}</h1>
          <p className="text-xl text-white max-w-2xl mx-auto [text-shadow:0_2px_10px_rgba(0,0,0,0.45)]">
            {t('courses.subtitle')}
          </p>
          <div className="mt-4">
            <a
              href="/assets/brochures/fee-structure-redesigned-2026.pdf"
              download="fee-structure-redesigned-2026.pdf"
              className="inline-block"
            >
              <Button variant="primary" className="bg-brand-orange hover:brightness-95">
                <Download className="w-4 h-4" />
                {t('courses.downloadBrochure')}
              </Button>
            </a>
          </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 bg-white rounded-xl p-6 shadow-md">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-brand-blue" />
            <h3>{t('common.filter')} {t('nav.courses')}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            <div>
              <label className="block mb-2 text-gray-700">{t('filter.level')}</label>
              <div className="flex flex-wrap gap-2">
                {levels.map(level => (
                  <button
                    key={level}
                    onClick={() => setSelectedLevel(level)}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      selectedLevel === level
                        ? 'bg-brand-orange text-white'
                        : 'bg-orange-50 text-gray-700 hover:bg-orange-100'
                    }`}
                  >
                    {getLevelLabel(level)}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block mb-2 text-gray-700">{t('filter.type')}</label>
              <div className="flex flex-wrap gap-2">
                {types.map(type => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      selectedType === type
                        ? 'bg-brand-orange text-white'
                        : 'bg-orange-50 text-gray-700 hover:bg-orange-100'
                    }`}
                  >
                    {getTypeLabel(type)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-gray-600">
            {t('courses.showing')} {filteredCourses.length} {isArabic ? 'دورة' : filteredCourses.length === 1 ? 'course' : 'courses'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCourses.map(course => (
            <Card key={course.id} className="flex flex-col p-4 sm:p-5 gap-2 border border-orange-100 bg-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
              <div className="mb-1">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getLevelPillClasses(course.level)}`}>
                  {getLevelLabel(course.level)}
                </span>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${isRTL ? 'mr-2' : 'ml-2'} ${getTypePillClasses(course.type)}`}>
                  {getTypeLabel(course.type)}
                </span>
              </div>

              <h3 className="mb-1 text-2xl font-bold text-gray-900">{getCourseTitle(course.id, course.title)}</h3>
              <p className="text-gray-600 mb-2 flex-1">{getCourseDescription(course.id, course.description)}</p>

              <div className="space-y-1 mb-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4 text-brand-orange" />
                  <span>{course.duration} • {course.schedule}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="w-4 h-4 text-brand-green" />
                  <span>{ui.maxStudentsPerClass(course.students)}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-orange-100">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-2xl font-bold text-brand-orange">{course.price}</span>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Link to={`/courses/${course.id}`} className="flex-1">
                    <Button variant="primary" size="sm" className="w-full bg-brand-orange hover:brightness-95">
                      {t('courses.viewDetails')}
                      <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                    </Button>
                  </Link>
                  <a
                    href="/assets/brochures/fee-structure-redesigned-2026.pdf"
                    download="fee-structure-redesigned-2026.pdf"
                    className="flex-1"
                  >
                    <Button variant="outline" size="sm" className="w-full">
                      <Download className="w-4 h-4" />
                      {t('courses.downloadBrochure')}
                    </Button>
                  </a>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">{t('courses.noCoursesFound')}</p>
            <Button
              variant="outline"
              onClick={() => {
                setSelectedLevel('All');
                setSelectedType('All');
              }}
            >
              {t('courses.clearFilters')}
            </Button>
          </div>
        )}
      </div>

      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="mb-4">{ui.notSureTitle}</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            {ui.notSureDesc}
          </p>
          <Link to="/placement-test">
            <Button variant="primary" size="lg">
              {ui.takePlacement}
              <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}




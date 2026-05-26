import { useParams, Link } from 'react-router';
import { Clock, Users, Calendar, CheckCircle, ArrowRight, BookOpen } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/card';
import { useLanguage } from '../contexts/LanguageContext';

const courseData: Record<string, any> = {
  'beginner-english': {
    title: 'Beginner English',
    level: 'A1-A2',
    description: 'Perfect for those starting their English learning journey. Build a strong foundation in English grammar, vocabulary, and basic conversation skills.',
    duration: '12 weeks',
    schedule: 'Mon, Wed, Fri • 7:00 PM - 9:00 PM',
    price: 'RM 1,200',
    maxStudents: 15,
    curriculum: [
      { week: '1-3', topic: 'Basic Grammar & Sentence Structure', items: ['Present simple tense', 'Articles and pronouns', 'Basic questions'] },
      { week: '4-6', topic: 'Everyday Vocabulary', items: ['Family and relationships', 'Food and dining', 'Shopping and numbers'] },
      { week: '7-9', topic: 'Conversation Skills', items: ['Introducing yourself', 'Making small talk', 'Asking for help'] },
      { week: '10-12', topic: 'Practical English', items: ['Giving directions', 'Making appointments', 'Describing routines'] },
    ],
    outcomes: [
      'Understand and use basic English phrases',
      'Introduce yourself and others confidently',
      'Ask and answer simple questions',
      'Write simple emails and messages',
      'Handle everyday situations in English'
    ],
    testimonials: [
      { name: 'Mei Lin', text: 'As a complete beginner, I was nervous but the teachers made learning fun and easy!', rating: 5 },
      { name: 'Kumar S.', text: 'I can now have basic conversations with my colleagues. Great course!', rating: 5 },
    ]
  },
  'ielts-preparation': {
    title: 'IELTS Preparation',
    level: 'B2+',
    description: 'Achieve your target IELTS score with expert guidance. Comprehensive preparation for all four test sections with proven strategies and regular mock tests.',
    duration: '10 weeks',
    schedule: 'Sat, Sun • 2:00 PM - 5:00 PM',
    price: 'RM 2,000',
    maxStudents: 20,
    curriculum: [
      { week: '1-2', topic: 'IELTS Overview & Listening', items: ['Test format and scoring', 'Note-taking strategies', 'Practice tests'] },
      { week: '3-4', topic: 'Reading Skills', items: ['Skimming and scanning', 'Time management', 'Question types mastery'] },
      { week: '5-7', topic: 'Writing Task 1 & 2', items: ['Essay structure', 'Academic vocabulary', 'Common topics'] },
      { week: '8-10', topic: 'Speaking & Mock Tests', items: ['Fluency techniques', 'Topic vocabulary', 'Full mock exams'] },
    ],
    outcomes: [
      'Master all four IELTS test sections',
      'Develop effective time management strategies',
      'Build confidence for test day',
      'Achieve your target band score',
      'Receive personalized feedback and improvement tips'
    ],
    testimonials: [
      { name: 'Sarah Tan', text: 'I scored 7.5 overall! The mock tests were incredibly helpful.', rating: 5 },
      { name: 'David Ng', text: 'The writing feedback helped me improve from 6.0 to 7.5 in just 10 weeks.', rating: 5 },
    ]
  },
  'intermediate-english': {
    title: 'Intermediate English',
    level: 'B1-B2',
    description: 'Build confidence and fluency in everyday conversations. Enhance your communication skills for work, travel, and social situations.',
    duration: '16 weeks',
    schedule: 'Tue, Thu • 7:00 PM - 9:00 PM',
    price: 'RM 1,500',
    maxStudents: 12,
    curriculum: [
      { week: '1-4', topic: 'Grammar Mastery', items: ['Past and future tenses', 'Modal verbs', 'Conditional sentences'] },
      { week: '5-8', topic: 'Vocabulary Expansion', items: ['Idioms and expressions', 'Work and business', 'Travel and culture'] },
      { week: '9-12', topic: 'Speaking & Listening', items: ['Presentations', 'Debates and discussions', 'Understanding accents'] },
      { week: '13-16', topic: 'Writing & Real-world Practice', items: ['Formal emails', 'Reports and articles', 'Project work'] },
    ],
    outcomes: [
      'Communicate fluently in most situations',
      'Understand movies and TV shows in English',
      'Write professional emails and reports',
      'Give presentations with confidence',
      'Participate in group discussions'
    ],
    testimonials: [
      { name: 'Ahmad Rahman', text: 'My confidence has grown so much. I can now lead meetings in English!', rating: 5 },
      { name: 'Li Wei', text: 'The interactive lessons made learning enjoyable and effective.', rating: 5 },
    ]
  },
};

export function CourseDetailsPage() {
  const { language, isRTL } = useLanguage();
  const isArabic = language === 'ar';
  const courseAliasMap: Record<string, string> = {
    'advanced-english': 'intermediate-english',
    'ielts-intensive': 'ielts-preparation',
    'business-english': 'intermediate-english',
    'conversation-club': 'intermediate-english',
    'academic-writing': 'ielts-preparation',
  };
  const ui = isArabic
    ? {
        notFound: 'الدورة غير موجودة',
        notFoundDesc: 'الدورة التي تبحث عنها غير موجودة.',
        viewAll: 'عرض جميع الدورات',
        backToCourses: 'العودة إلى الدورات',
        maxStudents: 'الحد الأقصى',
        students: 'طلاب',
        courseFee: 'رسوم الدورة',
        registerNow: 'سجل الآن',
        contactUs: 'اتصل بنا',
        learningOutcomes: 'مخرجات التعلم',
        curriculum: 'منهج الدورة',
        weeks: 'الأسابيع',
        reviews: 'آراء الطلاب',
        notSureLevel: 'غير متأكد من مستواك؟',
        notSureDesc: 'خذ اختبار تحديد المستوى المجاني لاختيار الدورة المناسبة لك.',
        takePlacement: 'خذ اختبار تحديد المستوى',
        features: 'مميزات الدورة',
        related: 'دورات ذات صلة',
        readyStart: 'جاهز لبدء التعلم؟',
        readyDescPrefix: 'انضم إلى',
        readyDescSuffix: 'واتخذ الخطوة التالية في رحلة تعلم الإنجليزية.',
      }
    : {
        notFound: 'Course Not Found',
        notFoundDesc: "The course you're looking for doesn't exist.",
        viewAll: 'View All Courses',
        backToCourses: 'Back to Courses',
        maxStudents: 'Max',
        students: 'students',
        courseFee: 'Course Fee',
        registerNow: 'Register Now',
        contactUs: 'Contact Us',
        learningOutcomes: 'Learning Outcomes',
        curriculum: 'Course Curriculum',
        weeks: 'Weeks',
        reviews: 'Student Reviews',
        notSureLevel: 'Not Sure About Your Level?',
        notSureDesc: 'Take our free placement test to find the perfect course for you.',
        takePlacement: 'Take Placement Test',
        features: 'Course Features',
        related: 'Related Courses',
        readyStart: 'Ready to Start Learning?',
        readyDescPrefix: 'Join',
        readyDescSuffix: 'and take the next step in your English learning journey.',
      };
  const getCourseTitle = (id: string, fallback: string) => {
    if (!isArabic) return fallback;
    const map: Record<string, string> = {
      'beginner-english': 'اللغة الإنجليزية للمبتدئين',
      'ielts-preparation': 'التحضير لاختبار IELTS',
      'intermediate-english': 'اللغة الإنجليزية المتوسطة',
    };
    return map[id] || fallback;
  };
  const getCourseDescription = (id: string, fallback: string) => {
    if (!isArabic) return fallback;
    const map: Record<string, string> = {
      'beginner-english':
        'مناسبة لمن يبدأون رحلتهم في تعلم الإنجليزية. ابنِ أساسًا قويًا في القواعد والمفردات ومهارات المحادثة الأساسية.',
      'ielts-preparation':
        'حقق الدرجة المستهدفة في IELTS بإرشاد خبراء. تحضير شامل للأقسام الأربعة مع استراتيجيات مجربة واختبارات تدريبية منتظمة.',
      'intermediate-english':
        'ابنِ الثقة والطلاقة في المحادثات اليومية. طوّر مهارات التواصل للعمل والسفر والمواقف الاجتماعية.',
    };
    return map[id] || fallback;
  };
  const getLocalizedOutcomes = (id: string, fallback: string[]) => {
    if (!isArabic) return fallback;
    const map: Record<string, string[]> = {
      'beginner-english': [
        'فهم واستخدام العبارات الإنجليزية الأساسية',
        'تقديم نفسك والآخرين بثقة',
        'طرح الأسئلة البسيطة والإجابة عنها',
        'كتابة رسائل وبريد إلكتروني بسيط',
        'التعامل مع المواقف اليومية باللغة الإنجليزية',
      ],
      'ielts-preparation': [
        'إتقان أقسام اختبار IELTS الأربعة',
        'تطوير استراتيجيات فعالة لإدارة الوقت',
        'بناء الثقة ليوم الاختبار',
        'تحقيق الدرجة المستهدفة في الاختبار',
        'الحصول على ملاحظات شخصية وخطط تحسين واضحة',
      ],
      'intermediate-english': [
        'التواصل بطلاقة في أغلب المواقف',
        'فهم الأفلام والبرامج التلفزيونية باللغة الإنجليزية',
        'كتابة رسائل وتقارير مهنية',
        'تقديم عروض بثقة',
        'المشاركة الفعالة في النقاشات الجماعية',
      ],
    };
    return map[id] || fallback;
  };

  const getLocalizedCurriculum = (id: string, fallback: any[]) => {
    if (!isArabic) return fallback;
    const map: Record<string, any[]> = {
      'beginner-english': [
        { week: '1-3', topic: 'القواعد الأساسية وبناء الجملة', items: ['المضارع البسيط', 'أدوات التعريف والضمائر', 'الأسئلة الأساسية'] },
        { week: '4-6', topic: 'مفردات الحياة اليومية', items: ['العائلة والعلاقات', 'الطعام والمطاعم', 'التسوق والأرقام'] },
        { week: '7-9', topic: 'مهارات المحادثة', items: ['تقديم النفس', 'إجراء محادثات قصيرة', 'طلب المساعدة'] },
        { week: '10-12', topic: 'الإنجليزية العملية', items: ['إعطاء الاتجاهات', 'حجز المواعيد', 'وصف الروتين اليومي'] },
      ],
      'ielts-preparation': [
        { week: '1-2', topic: 'نظرة عامة على IELTS والاستماع', items: ['صيغة الاختبار والتقييم', 'استراتيجيات تدوين الملاحظات', 'اختبارات تدريبية'] },
        { week: '3-4', topic: 'مهارات القراءة', items: ['القراءة السريعة والبحث عن المعلومات', 'إدارة الوقت', 'إتقان أنواع الأسئلة'] },
        { week: '5-7', topic: 'الكتابة 1 و2', items: ['هيكلة المقال', 'المفردات الأكاديمية', 'الموضوعات الشائعة'] },
        { week: '8-10', topic: 'المحادثة والاختبارات التجريبية', items: ['تقنيات الطلاقة', 'مفردات الموضوعات', 'اختبارات تجريبية كاملة'] },
      ],
      'intermediate-english': [
        { week: '1-4', topic: 'إتقان القواعد', items: ['الماضي والمستقبل', 'الأفعال الناقصة', 'الجمل الشرطية'] },
        { week: '5-8', topic: 'توسيع المفردات', items: ['التعابير والعبارات الاصطلاحية', 'العمل والأعمال', 'السفر والثقافة'] },
        { week: '9-12', topic: 'التحدث والاستماع', items: ['العروض التقديمية', 'المناظرات والنقاشات', 'فهم اللهجات'] },
        { week: '13-16', topic: 'الكتابة والتطبيق العملي', items: ['رسائل البريد الرسمية', 'التقارير والمقالات', 'مشروع تطبيقي'] },
      ],
    };
    return map[id] || fallback;
  };
  const localizedFeatureList = isArabic
    ? [
        'مدربون خبراء',
        'دروس تفاعلية',
        'مواد دراسية مشمولة',
        'شهادة عند الإكمال',
        'اختبار تحديد مستوى مجاني',
        'خيارات دفع مرنة',
      ]
    : [
        'Expert instructors',
        'Interactive lessons',
        'Study materials included',
        'Certificate upon completion',
        'Free placement test',
        'Flexible payment options',
      ];
  const { courseId } = useParams();
  const routeCourseId = courseId || '';
  const courseIdKey = courseAliasMap[routeCourseId] || routeCourseId;
  const course = courseData[courseIdKey];
  const localizedOutcomes = course ? getLocalizedOutcomes(courseIdKey, course.outcomes) : [];
  const localizedCurriculum = course ? getLocalizedCurriculum(courseIdKey, course.curriculum) : [];
  const whatsappNumber = '60175045565';

  const buildWhatsAppUrl = (intent: 'register' | 'contact') => {
    const courseName = getCourseTitle(courseIdKey, course.title);
    const message = isArabic
      ? intent === 'register'
        ? `السلام عليكم، أريد التسجيل في دورة ${courseName}.`
        : `السلام عليكم، أريد الاستفسار عن دورة ${courseName}.`
      : intent === 'register'
        ? `Hi, I want to register for ${courseName}.`
        : `Hi, I want to ask about ${courseName}.`;

    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  };

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="mb-4">{ui.notFound}</h2>
          <p className="text-gray-600 mb-6">{ui.notFoundDesc}</p>
          <Link to="/courses">
            <Button variant="primary">{ui.viewAll}</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" dir={isRTL ? 'rtl' : 'ltr'}>
      <section className="bg-gradient-to-r from-brand-blue to-brand-blue-dark text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-4">
            <Link to="/courses" className="text-blue-200 hover:text-white transition-colors">
              {isArabic ? '→' : '←'} {ui.backToCourses}
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm mb-4">
                {course.level}
              </div>
              <h1 className="mb-4 text-white">{getCourseTitle(courseIdKey, course.title)}</h1>
              <p className="text-xl text-blue-100 mb-6">{getCourseDescription(courseIdKey, course.description)}</p>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>{course.schedule}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>{ui.maxStudents} {course.maxStudents} {ui.students}</span>
                </div>
              </div>
            </div>
            <div className="bg-white text-gray-900 rounded-xl p-6 shadow-lg h-fit">
              <div className="text-center mb-4">
                <p className="text-gray-600 mb-2">{ui.courseFee}</p>
                <p className="text-3xl text-brand-blue mb-4">{course.price}</p>
              </div>
              <a href={buildWhatsAppUrl('register')} target="_blank" rel="noopener noreferrer">
                <Button variant="primary" size="lg" className="w-full mb-3">
                  {ui.registerNow}
                </Button>
              </a>
              <a href={buildWhatsAppUrl('contact')} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg" className="w-full">
                  {ui.contactUs}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <Card>
              <h2 className="mb-6">{ui.learningOutcomes}</h2>
              <div className="space-y-3">
                {localizedOutcomes.map((outcome: string, index: number) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-brand-green flex-shrink-0 mt-1" />
                    <p className="text-gray-700">{outcome}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <h2 className="mb-6">{ui.curriculum}</h2>
              <div className="space-y-6">
                {localizedCurriculum.map((module: any, index: number) => (
                  <div key={index} className="border-l-4 border-brand-blue pl-4">
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen className="w-5 h-5 text-brand-blue" />
                      <p className="text-gray-600">{ui.weeks} <span dir="ltr" className="inline-block">{module.week}</span></p>
                    </div>
                    <h3 className="mb-3">{module.topic}</h3>
                    <ul className="space-y-2">
                      {module.items.map((item: string, itemIndex: number) => (
                        <li key={itemIndex} className="flex items-center gap-2 text-gray-700">
                          <div className="w-1.5 h-1.5 bg-brand-blue rounded-full"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Card>

          </div>

          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-brand-orange to-brand-orange text-white">
              <h3 className="mb-3 text-white">{ui.notSureLevel}</h3>
              <p className="mb-4 text-orange-100">{ui.notSureDesc}</p>
              <Link to="/placement-test">
                <Button variant="secondary" className="w-full">
                  {ui.takePlacement}
                  <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                </Button>
              </Link>
            </Card>

            <Card>
              <h3 className="mb-4">{ui.features}</h3>
              <div className="space-y-3">
                {localizedFeatureList.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-brand-green" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <h3 className="mb-4">{ui.related}</h3>
              <div className="space-y-3">
                {Object.keys(courseData)
                  .filter(id => id !== courseIdKey)
                  .slice(0, 3)
                  .map(id => (
                    <Link key={id} to={`/courses/${id}`} className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <p className="text-sm text-brand-blue">{getCourseTitle(id, courseData[id].title)}</p>
                      <p className="text-xs text-gray-600">{courseData[id].level}</p>
                    </Link>
                  ))}
              </div>
            </Card>
          </div>
        </div>
      </div>

      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="mb-4">{ui.readyStart}</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            {ui.readyDescPrefix} {getCourseTitle(courseIdKey, course.title)} {ui.readyDescSuffix}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={buildWhatsAppUrl('register')} target="_blank" rel="noopener noreferrer">
              <Button variant="primary" size="lg">
                {ui.registerNow}
              </Button>
            </a>
            <a href={buildWhatsAppUrl('contact')} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg">
                {ui.contactUs}
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}



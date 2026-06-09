import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'ar' | 'zh' | 'ms';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.courses': 'Our Courses',
    'nav.media': 'Our Media',
    'nav.placementTest': 'Placement Test',
    'nav.contact': 'Contact',
    'nav.applyNow': 'Apply Now',
    'nav.login': 'Login',

    // Hero
    'hero.title': 'Improve Your English with Confidence',
    'hero.subtitle': "Join Malaysia's premier English language institution. Learn from expert instructors and achieve your language goals.",
    'hero.startTest': 'Start Placement Test',
    'hero.exploreCourses': 'Explore Courses',

    // Stats
    'stats.students': 'Students Enrolled',
    'stats.successRate': 'Success Rate',
    'stats.countries': 'Countries Represented',

    // Courses
    'courses.title': 'Popular Courses',
    'courses.subtitle': 'Choose the perfect course for your English learning journey',
    'courses.viewDetails': 'View Details',
    'courses.viewAll': 'View All Courses',
    'courses.duration': 'Duration',
    'courses.downloadBrochure': 'Brochure',
    'courses.schedule': 'Schedule',
    'courses.maxStudents': 'Max Students',
    'courses.studentsPerClass': 'students per class',
    'courses.showing': 'Showing',
    'courses.noCoursesFound': 'No courses found matching your filters.',
    'courses.clearFilters': 'Clear Filters',

    // Course Levels
    'level.all': 'All',
    'level.beginner': 'Beginner',
    'level.intermediate': 'Intermediate',
    'level.advanced': 'Advanced',

    // Course Types
    'type.all': 'All',
    'type.generalEnglish': 'General English',
    'type.ielts': 'IELTS',
    'type.businessEnglish': 'Business English',
    'type.conversation': 'Conversation',
    'type.academic': 'Academic',

    // Filters
    'filter.level': 'Level',
    'filter.type': 'Type',
    'filter.apply': 'Apply',
    'filter.clear': 'Clear',

    // Common
    'common.filter': 'Filter',

    // Footer
    'footer.description': "Malaysia's leading English language institution dedicated to helping students achieve fluency and confidence.",
    'footer.quickLinks': 'Quick Links',
    'footer.courses': 'Courses',
    'footer.contact': 'Contact Us',
    'footer.followUs': 'Follow Us',
    'footer.rights': 'All rights reserved.',

    // Media Page
    'media.title': 'Social Media Hub',
    'media.subtitle': 'Stay updated with our latest tips, student stories, and updates across platforms',
    'media.instagramFeed': 'Instagram Feed',
    'media.instagramDesc': 'Latest posts, reels, and classroom highlights from Instagram',
    'media.tiktokVideos': 'TikTok Videos',
    'media.tiktokDesc': 'Quick English tips and short-form learning content',
    'media.facebookUpdates': 'Facebook Updates',
    'media.facebookDesc': 'News, announcements, and community updates',
    'media.visitInstagram': 'Visit Instagram',
    'media.visitTikTok': 'Watch on TikTok',
    'media.visitFacebook': 'Visit Facebook',
    'media.viewReel': 'View Reel',
    'media.followForUpdates': 'Follow Us for Daily Updates',
    'media.dailyTips': 'Get daily English-learning tips, student success stories, and exclusive content',
    'media.followOnInstagram': 'Follow on Instagram',
    'media.followOnTikTok': 'Follow on TikTok',
    'media.likeOnFacebook': 'Like on Facebook',
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.courses': 'الدورات',
    'nav.media': 'وسائطنا',
    'nav.placementTest': 'اختبار تحديد المستوى',
    'nav.contact': 'اتصل بنا',
    'nav.applyNow': 'سجل الآن',
    'nav.login': 'تسجيل الدخول',

    // Hero
    'hero.title': 'حسّن لغتك الإنجليزية بثقة',
    'hero.subtitle': 'انضم إلى أفضل مؤسسة لتعليم اللغة الإنجليزية في ماليزيا. تعلم من مدربين خبراء وحقق أهدافك اللغوية.',
    'hero.startTest': 'ابدأ اختبار تحديد المستوى',
    'hero.exploreCourses': 'استكشف الدورات',

    // Stats
    'stats.students': 'طالب مسجل',
    'stats.successRate': 'معدل النجاح',
    'stats.countries': 'دولة ممثلة',

    // Courses
    'courses.title': 'الدورات الشائعة',
    'courses.subtitle': 'اختر الدورة المثالية لرحلتك في تعلم اللغة الإنجليزية',
    'courses.viewDetails': 'عرض التفاصيل',
    'courses.viewAll': 'عرض جميع الدورات',
    'courses.duration': 'المدة',
    'courses.downloadBrochure': 'تحميل الكتيب',
    'courses.schedule': 'الجدول',
    'courses.maxStudents': 'الحد الأقصى',
    'courses.studentsPerClass': 'طالب لكل فصل',
    'courses.showing': 'عرض',
    'courses.noCoursesFound': 'لم يتم العثور على دورات تطابق الفلاتر الخاصة بك.',
    'courses.clearFilters': 'مسح الفلاتر',

    // Course Levels
    'level.all': 'الكل',
    'level.beginner': 'مبتدئ',
    'level.intermediate': 'متوسط',
    'level.advanced': 'متقدم',

    // Course Types
    'type.all': 'الكل',
    'type.generalEnglish': 'اللغة الإنجليزية العامة',
    'type.ielts': 'آيلتس',
    'type.businessEnglish': 'الإنجليزية للأعمال',
    'type.conversation': 'المحادثة',
    'type.academic': 'أكاديمي',

    // Course Names
    'course.beginnerEnglish': 'اللغة الإنجليزية للمبتدئين',
    'course.intermediateEnglish': 'اللغة الإنجليزية المتوسطة',
    'course.advancedEnglish': 'اللغة الإنجليزية المتقدمة',
    'course.ieltsPreparation': 'التحضير لاختبار آيلتس',
    'course.ieltsIntensive': 'آيلتس المكثف',
    'course.businessEnglish': 'الإنجليزية للأعمال',
    'course.conversationClub': 'نادي المحادثة',
    'course.academicWriting': 'الكتابة الأكاديمية',

    // Filters
    'filter.level': 'المستوى',
    'filter.type': 'النوع',
    'filter.apply': 'تطبيق',
    'filter.clear': 'مسح',

    // Common
    'common.week': 'أسبوع',
    'common.weeks': 'أسابيع',
    'common.month': 'شهر',
    'common.months': 'أشهر',
    'common.year': 'سنة',
    'common.and': 'و',
    'common.or': 'أو',
    'common.more': 'المزيد',
    'common.less': 'أقل',
    'common.showMore': 'عرض المزيد',
    'common.showLess': 'عرض أقل',
    'common.readMore': 'اقرأ المزيد',
    'common.learnMore': 'تعلم المزيد',
    'common.getStarted': 'ابدأ الآن',
    'common.enrollNow': 'سجل الآن',
    'common.register': 'التسجيل',
    'common.submit': 'إرسال',
    'common.send': 'إرسال',
    'common.search': 'بحث',
    'common.filter': 'تصفية',
    'common.sort': 'ترتيب',
    'common.close': 'إغلاق',
    'common.back': 'رجوع',
    'common.next': 'التالي',
    'common.previous': 'السابق',

    // Quick Access
    'quickAccess.title': 'الوصول السريع',
    'quickAccess.onlineClasses': 'فصول عبر الإنترنت',
    'quickAccess.schedule': 'الجدول الزمني',
    'quickAccess.resources': 'الموارد',
    'quickAccess.community': 'المجتمع',
    'quickAccess.support': 'الدعم',

    // Teachers
    'teachers.title': 'تعرف على معلمينا الخبراء',
    'teachers.subtitle': 'فريق من المعلمين المؤهلين ذوي الخبرة المكرسين لنجاحك',
    'teachers.viewProfile': 'عرض الملف الشخصي',
    'teachers.experience': 'الخبرة',
    'teachers.qualifications': 'المؤهلات',
    'teachers.specialization': 'التخصص',
    'teachers.teachingStyle': 'أسلوب التدريس',
    'teachers.availability': 'التوفر',
    'teachers.languages': 'اللغات',

    // Events
    'events.title': 'الفعاليات والأنشطة',
    'events.subtitle': 'انضم إلى ورش العمل والفعاليات لدينا',
    'events.viewGallery': 'عرض المعرض',

    // Social
    'social.title': 'تابعنا على وسائل التواصل',
    'social.instagram': 'انستغرام',
    'social.facebook': 'فيسبوك',
    'social.tiktok': 'تيك توك',
    'social.followUs': 'تابعنا',

    // Schedule
    'schedule.title': 'الفصول القادمة',
    'schedule.day': 'اليوم',
    'schedule.time': 'الوقت',
    'schedule.course': 'الدورة',
    'schedule.teacher': 'المعلم',
    'schedule.seatsAvailable': 'المقاعد المتاحة',
    'schedule.viewFullSchedule': 'عرض الجدول الكامل',

    // Testimonials
    'testimonials.title': 'ماذا يقول طلابنا',
    'testimonials.subtitle': 'قصص نجاح حقيقية من متعلمي اللغة الإنجليزية لدينا',

    // Contact
    'contact.title': 'اتصل بنا',
    'contact.subtitle': 'تواصل معنا للحصول على أي استفسارات',
    'contact.name': 'الاسم',
    'contact.email': 'البريد الإلكتروني',
    'contact.phone': 'الهاتف',
    'contact.message': 'الرسالة',
    'contact.sendMessage': 'إرسال الرسالة',
    'contact.getInTouch': 'تواصل معنا',
    'contact.visitUs': 'قم بزيارتنا',
    'contact.callUs': 'اتصل بنا',
    'contact.emailUs': 'راسلنا عبر البريد',

    // Footer
    'footer.description': 'المؤسسة الرائدة في ماليزيا لتعليم اللغة الإنجليزية المكرسة لمساعدة الطلاب على تحقيق الطلاقة والثقة.',
    'footer.quickLinks': 'روابط سريعة',
    'footer.courses': 'الدورات',
    'footer.about': 'من نحن',
    'footer.contact': 'اتصل بنا',
    'footer.followUs': 'تابعنا',
    'footer.rights': 'جميع الحقوق محفوظة.',
    'footer.privacyPolicy': 'سياسة الخصوصية',
    'footer.termsOfService': 'شروط الخدمة',

    // Media Page
    'media.title': 'مركز وسائل التواصل الاجتماعي',
    'media.subtitle': 'ابق على اطلاع بأحدث التحديثات والنصائح وقصص الطلاب عبر جميع المنصات',
    'media.instagramFeed': 'موجز انستغرام',
    'media.instagramDesc': 'أحدث المنشورات والقصص والتحديثات من انستغرام',
    'media.tiktokVideos': 'فيديوهات تيك توك',
    'media.tiktokDesc': 'نصائح سريعة للغة الإنجليزية ومحتوى ممتع ولحظات فيروسية',
    'media.facebookUpdates': 'تحديثات فيسبوك',
    'media.facebookDesc': 'الأخبار والإعلانات ومنشورات المجتمع',
    'media.visitInstagram': 'زيارة انستغرام',
    'media.visitTikTok': 'مشاهدة على تيك توك',
    'media.visitFacebook': 'زيارة فيسبوك',
    'media.viewReel': 'مشاهدة الريل',
    'media.followForUpdates': 'تابعنا للحصول على التحديثات اليومية',
    'media.dailyTips': 'احصل على نصائح لتعلم اللغة الإنجليزية وقصص نجاح الطلاب والمحتوى الحصري يوميًا',
    'media.followOnInstagram': 'تابع على انستغرام',
    'media.followOnTikTok': 'تابع على تيك توك',
    'media.likeOnFacebook': 'أعجب على فيسبوك',

    // Placement Test
    'test.title': 'اختبار تحديد المستوى',
    'test.subtitle': 'اكتشف مستواك في اللغة الإنجليزية',
    'test.start': 'بدء الاختبار',
    'test.next': 'التالي',
    'test.submit': 'إرسال',
    'test.yourResult': 'نتيجتك',
    'test.recommendedCourses': 'الدورات الموصى بها',
  },
  zh: {
    // Navigation
    'nav.home': '首页',
    'nav.courses': '课程',
    'nav.media': '我们的媒体',
    'nav.placementTest': '水平测试',
    'nav.contact': '联系我们',
    'nav.applyNow': '立即申请',
    'nav.login': '登录',

    // Hero
    'hero.title': '自信地提升您的英语水平',
    'hero.subtitle': '加入马来西亚顶尖的英语语言机构。向专业导师学习，实现您的语言目标。',
    'hero.startTest': '开始水平测试',
    'hero.exploreCourses': '探索课程',

    // Stats
    'stats.students': '注册学生',
    'stats.successRate': '成功率',
    'stats.countries': '代表国家',

    // Courses
    'courses.title': '热门课程',
    'courses.subtitle': '选择适合您英语学习之旅的完美课程',
    'courses.viewDetails': '查看详情',
    'courses.viewAll': '查看所有课程',
    'courses.duration': '时长',
    'courses.downloadBrochure': '手册',

    // Footer
    'footer.description': '马来西亚领先的英语语言机构，致力于帮助学生实现流利和自信。',
    'footer.quickLinks': '快速链接',
    'footer.courses': '课程',
    'footer.contact': '联系我们',
    'footer.followUs': '关注我们',
    'footer.rights': '版权所有。',
  },
  ms: {
    // Navigation
    'nav.home': 'Laman Utama',
    'nav.courses': 'Kursus',
    'nav.media': 'Media Kami',
    'nav.placementTest': 'Ujian Penempatan',
    'nav.contact': 'Hubungi Kami',
    'nav.applyNow': 'Daftar Sekarang',
    'nav.login': 'Log Masuk',

    // Hero
    'hero.title': 'Tingkatkan Bahasa Inggeris Anda dengan Yakin',
    'hero.subtitle': 'Sertai institusi bahasa Inggeris terkemuka di Malaysia. Belajar daripada pengajar pakar dan capai matlamat bahasa anda.',
    'hero.startTest': 'Mula Ujian Penempatan',
    'hero.exploreCourses': 'Terokai Kursus',

    // Stats
    'stats.students': 'Pelajar Berdaftar',
    'stats.successRate': 'Kadar Kejayaan',
    'stats.countries': 'Negara Diwakili',

    // Courses
    'courses.title': 'Kursus Popular',
    'courses.subtitle': 'Pilih kursus yang sempurna untuk perjalanan pembelajaran Bahasa Inggeris anda',
    'courses.viewDetails': 'Lihat Butiran',
    'courses.viewAll': 'Lihat Semua Kursus',
    'courses.duration': 'Tempoh',
    'courses.downloadBrochure': 'Brosur',
    'courses.schedule': 'Jadual',
    'courses.maxStudents': 'Maksimum Pelajar',
    'courses.studentsPerClass': 'pelajar setiap kelas',
    'courses.showing': 'Memaparkan',
    'courses.noCoursesFound': 'Tiada kursus yang sepadan dengan penapis anda.',
    'courses.clearFilters': 'Kosongkan Penapis',

    // Course Levels
    'level.all': 'Semua',
    'level.beginner': 'Permulaan',
    'level.intermediate': 'Pertengahan',
    'level.advanced': 'Lanjutan',

    // Course Types
    'type.all': 'Semua',
    'type.generalEnglish': 'Bahasa Inggeris Umum',
    'type.ielts': 'IELTS',
    'type.businessEnglish': 'Bahasa Inggeris Perniagaan',
    'type.conversation': 'Perbualan',
    'type.academic': 'Akademik',

    // Filters
    'filter.level': 'Tahap',
    'filter.type': 'Jenis',
    'filter.apply': 'Terapkan',
    'filter.clear': 'Kosongkan',

    // Common
    'common.filter': 'Penapis',
    'common.register': 'Daftar',

    // Footer
    'footer.description': 'Institusi bahasa Inggeris terkemuka Malaysia yang berdedikasi untuk membantu pelajar mencapai kefasihan dan keyakinan.',
    'footer.quickLinks': 'Pautan Pantas',
    'footer.courses': 'Kursus',
    'footer.contact': 'Hubungi Kami',
    'footer.followUs': 'Ikuti Kami',
    'footer.rights': 'Hak cipta terpelihara.',

    // Media Page
    'media.title': 'Pusat Media Sosial',
    'media.subtitle': 'Ikuti kemas kini terkini, tip pelajar, dan cerita kejayaan di semua platform',
    'media.instagramFeed': 'Suapan Instagram',
    'media.instagramDesc': 'Kiriman terbaru, reels, dan sorotan kelas dari Instagram',
    'media.tiktokVideos': 'Video TikTok',
    'media.tiktokDesc': 'Tip Bahasa Inggeris pantas dan kandungan pembelajaran ringkas',
    'media.facebookUpdates': 'Kemas Kini Facebook',
    'media.facebookDesc': 'Berita, pengumuman, dan kemas kini komuniti',
    'media.visitInstagram': 'Lawati Instagram',
    'media.visitTikTok': 'Tonton di TikTok',
    'media.visitFacebook': 'Lawati Facebook',
    'media.viewReel': 'Lihat Reel',
    'media.followForUpdates': 'Ikuti Kami untuk Kemas Kini Harian',
    'media.dailyTips': 'Dapatkan tip pembelajaran harian, kisah kejayaan pelajar, dan kandungan eksklusif',
    'media.followOnInstagram': 'Ikuti di Instagram',
    'media.followOnTikTok': 'Ikuti di TikTok',
    'media.likeOnFacebook': 'Like di Facebook',
  },
};

const zhOverrides: Record<string, string> = {
  'nav.home': '首页',
  'nav.courses': '课程',
  'nav.media': '我们的媒体',
  'nav.placementTest': '水平测试',
  'nav.contact': '联系我们',
  'nav.applyNow': '立即申请',
  'nav.login': '登录',
  'hero.title': '自信提升您的英语水平',
  'hero.subtitle': '加入马来西亚专业语言中心，向经验丰富的导师学习，实现您的语言目标。',
  'hero.startTest': '开始水平测试',
  'hero.exploreCourses': '探索课程',
  'stats.students': '注册学生',
  'stats.successRate': '成功率',
  'stats.countries': '学生来源国家',
  'courses.title': '热门课程',
  'courses.subtitle': '选择最适合您学习目标的课程',
  'courses.viewDetails': '查看详情',
  'courses.viewAll': '查看所有课程',
  'courses.duration': '课程时长',
  'courses.downloadBrochure': '手册',
  'courses.schedule': '时间表',
  'courses.maxStudents': '最多学生',
  'courses.studentsPerClass': '每班学生',
  'courses.showing': '显示',
  'courses.noCoursesFound': '没有找到符合筛选条件的课程。',
  'courses.clearFilters': '清除筛选',
  'level.all': '全部',
  'level.beginner': '初级',
  'level.intermediate': '中级',
  'level.advanced': '高级',
  'type.all': '全部',
  'type.generalEnglish': '通用英语',
  'type.ielts': 'IELTS',
  'type.businessEnglish': '商务英语',
  'type.conversation': '会话',
  'type.mandarin': '普通话',
  'type.academic': '学术英语',
  'filter.level': '等级',
  'filter.type': '类型',
  'filter.apply': '应用',
  'filter.clear': '清除',
  'common.filter': '筛选',
  'common.register': '报名',
  'course.beginnerEnglish': '初级英语',
  'course.intermediateEnglish': '中级英语',
  'course.advancedEnglish': '高级英语',
  'course.ieltsPreparation': 'IELTS 备考',
  'course.ieltsIntensive': 'IELTS 强化课程',
  'course.businessEnglish': '商务英语',
  'course.mandarinCourse': '普通话课程',
  'course.academicWriting': '学术写作',
  'footer.description': '马来西亚专业语言中心，致力于帮助学生提升流利度与自信。',
  'footer.quickLinks': '快速链接',
  'footer.courses': '课程',
  'footer.contact': '联系我们',
  'footer.followUs': '关注我们',
  'footer.rights': '版权所有。',
  'media.title': '社交媒体中心',
  'media.subtitle': '通过各个平台了解最新学习技巧、学生故事和中心动态',
  'media.instagramFeed': 'Instagram 动态',
  'media.instagramDesc': '来自 Instagram 的最新帖子、短视频和课堂精彩瞬间',
  'media.tiktokVideos': 'TikTok 视频',
  'media.tiktokDesc': '快速英语技巧和短视频学习内容',
  'media.facebookUpdates': 'Facebook 更新',
  'media.facebookDesc': '新闻、公告和社区动态',
  'media.visitInstagram': '访问 Instagram',
  'media.visitTikTok': '在 TikTok 观看',
  'media.visitFacebook': '访问 Facebook',
  'media.viewReel': '查看短片',
  'media.followForUpdates': '关注我们获取每日更新',
  'media.dailyTips': '获取每日英语学习技巧、学生成功故事和独家内容',
  'media.followOnInstagram': '在 Instagram 关注',
  'media.followOnTikTok': '在 TikTok 关注',
  'media.likeOnFacebook': '在 Facebook 点赞',
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const isRTL = language === 'ar';

  useEffect(() => {
    // Apply RTL direction to document
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language, isRTL]);

  const t = (key: string): string => {
    if (language === 'zh' && zhOverrides[key]) return zhOverrides[key];
    return translations[language][key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}

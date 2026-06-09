import { useState } from 'react';
import { useParams, Link } from 'react-router';
import { Calendar, CheckCircle, ArrowRight } from 'lucide-react';
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
  'advanced-english': {
    title: 'Advanced English',
    level: 'Advanced',
    description: 'Master complex grammar structures and sophisticated vocabulary for professional and academic settings.',
    duration: '14 weeks',
    schedule: 'Mon, Wed',
    price: 'RM 1,800',
    maxStudents: 10,
    outcomes: [
      'Use advanced grammar accurately in speaking and writing',
      'Expand vocabulary for professional and academic communication',
      'Discuss complex topics with clarity and confidence',
      'Write stronger essays, reports, and formal messages',
      'Improve fluency for higher-level study or workplace goals',
    ],
  },
  'ielts-intensive': {
    title: 'IELTS Intensive',
    level: 'Advanced',
    description: 'Fast-track your IELTS preparation with intensive classes, focused practice, and test strategies.',
    duration: '6 weeks',
    schedule: 'Mon-Fri',
    price: 'RM 2,500',
    maxStudents: 15,
    outcomes: [
      'Practise IELTS listening, reading, writing, and speaking daily',
      'Improve test timing and question-handling strategies',
      'Build confidence through focused exam-style exercises',
      'Strengthen academic vocabulary and writing structure',
      'Prepare quickly for an upcoming IELTS test date',
    ],
  },
  'business-english': {
    title: 'Business English',
    level: 'Intermediate',
    description: 'Professional English for meetings, presentations, emails, and workplace communication.',
    duration: '12 weeks',
    schedule: 'Tue, Thu',
    price: 'RM 1,800',
    maxStudents: 12,
    outcomes: [
      'Write clearer professional emails and workplace messages',
      'Speak more confidently in meetings and discussions',
      'Prepare and deliver business presentations',
      'Use appropriate vocabulary for professional situations',
      'Communicate more effectively with colleagues and clients',
    ],
  },
  'mandarin-course': {
    title: 'Mandarin Course',
    level: 'Beginner',
    description: 'Build practical Mandarin communication skills from beginner level with structured lessons and HSK-focused learning.',
    duration: '6-12 months',
    schedule: 'Intensive or standard track',
    price: 'From RM 2,500/month',
    maxStudents: 20,
    outcomes: [
      'Understand and use basic Mandarin vocabulary and sentence structures',
      'Communicate confidently in everyday situations',
      'Read and write essential Chinese characters',
      'Build listening, speaking, reading, and writing skills',
      'Prepare for HSK Level 1, 2, or 3 depending on study duration',
    ],
  },
  'academic-writing': {
    title: 'Academic Writing',
    level: 'Advanced',
    description: 'Master essay writing, research papers, and academic English for university studies.',
    duration: '10 weeks',
    schedule: 'Wed, Fri',
    price: 'RM 1,600',
    maxStudents: 10,
    outcomes: [
      'Plan and structure academic essays clearly',
      'Develop stronger arguments with supporting evidence',
      'Improve grammar, vocabulary, and academic style',
      'Write more effective research-based assignments',
      'Build confidence for university-level English writing',
    ],
  },
};

export function CourseDetailsPage() {
  const { language, isRTL } = useLanguage();
  const isArabic = language === 'ar';
  const isChinese = language === 'zh';
  const courseAliasMap: Record<string, string> = {
    'advanced-english': 'intermediate-english',
    'ielts-intensive': 'ielts-preparation',
    'business-english': 'intermediate-english',
    'mandarin-course': 'intermediate-english',
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
        courseDates: 'مدة الدراسة',
        studyDuration: 'مدة الدراسة',
        scholarshipFee: 'رسوم المنحة',
        originalFee: 'السعر الأصلي',
        promotionIncludes: 'يشمل العرض',
        scholarshipIncludes: ['اختبار تحديد مستوى اللغة الإنجليزية', 'رسوم التسجيل', 'الكتب والمواد', 'رسوم التأشيرة'],
        monthLabel: (count: number) => `${count} ${count === 1 ? 'شهر' : 'أشهر'}`,
        scholarshipDurationLabel: (studyMonths: number, bonusMonths: number, totalMonths: number) => `${studyMonths} + ${bonusMonths} مجاني (${totalMonths} أشهر)`,
        scholarshipDurationDesc: (studyMonths: number, bonusMonths: number, totalMonths: number) => `ادرس ${studyMonths} أشهر واحصل على ${bonusMonths} ${bonusMonths === 1 ? 'شهر مجاني' : 'أشهر مجانية'} - ${totalMonths} أشهر إجماليًا`,
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
        courseDates: 'Study Duration',
        studyDuration: 'Study Duration',
        scholarshipFee: 'Scholarship Fee',
        originalFee: 'Original Fee',
        promotionIncludes: 'Promotion Includes',
        placementNote: 'Start with our free online placement test. It helps us match you with the right English level before joining.',
        scholarshipIncludes: ['English Placement Test', 'Registration Fee', 'Books & Materials', 'Visa Fee'],
        mandarinPlacementNote: 'Mandarin students can take a placement test if needed before joining the right class.',
        mandarinScholarshipIncludes: ['Placement Test (if needed)', 'Registration Fee', 'Learning Materials'],
        monthLabel: (count: number) => `${count} ${count === 1 ? 'month' : 'months'}`,
        scholarshipDurationLabel: (studyMonths: number, bonusMonths: number, totalMonths: number) => `${studyMonths} + ${bonusMonths} free (${totalMonths} months)`,
        scholarshipDurationDesc: (studyMonths: number, bonusMonths: number, totalMonths: number) => `Study ${studyMonths} ${studyMonths === 1 ? 'month' : 'months'} and get ${bonusMonths} ${bonusMonths === 1 ? 'month' : 'months'} free - ${totalMonths} months total`,
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
  if (isChinese) {
    Object.assign(ui, {
      notFound: '找不到课程',
      notFoundDesc: '您查找的课程不存在。',
      viewAll: '查看所有课程',
      backToCourses: '返回课程',
      maxStudents: '最多',
      students: '名学生',
      courseFee: '课程费用',
      courseDates: '学习时长',
      studyDuration: '学习时长',
      scholarshipFee: '奖学金费用',
      originalFee: '原价',
      promotionIncludes: '优惠包含',
      placementNote: '先参加免费的在线水平测试，帮助我们在入学前为您匹配合适的英语等级。',
      scholarshipIncludes: ['英语水平测试', '报名费', '书本与学习材料', '签证费'],
      mandarinPlacementNote: '普通话学生如有需要，可在入班前参加水平测试。',
      mandarinScholarshipIncludes: ['水平测试（如有需要）', '报名费', '学习材料'],
      monthLabel: (count: number) => `${count}个月`,
      scholarshipDurationLabel: (studyMonths: number, bonusMonths: number, totalMonths: number) => `${studyMonths} + ${bonusMonths}个月免费（共${totalMonths}个月）`,
      scholarshipDurationDesc: (studyMonths: number, bonusMonths: number, totalMonths: number) => `学习${studyMonths}个月，获赠${bonusMonths}个月免费课程 - 共${totalMonths}个月`,
      registerNow: '立即报名',
      contactUs: '联系我们',
      learningOutcomes: '学习成果',
      curriculum: '课程大纲',
      weeks: '周',
      reviews: '学生评价',
      notSureLevel: '不确定自己的水平？',
      notSureDesc: '参加免费水平测试，找到最适合您的课程。',
      takePlacement: '参加水平测试',
      features: '课程特点',
      related: '相关课程',
      readyStart: '准备开始学习了吗？',
      readyDescPrefix: '加入',
      readyDescSuffix: '，迈出英语学习旅程的下一步。',
    });
  }
  const getCourseTitle = (id: string, fallback: string) => {
    if (isChinese) {
      const map: Record<string, string> = {
        'beginner-english': '初级英语',
        'intermediate-english': '中级英语',
        'advanced-english': '高级英语',
        'ielts-preparation': 'IELTS 备考',
        'ielts-intensive': 'IELTS 强化课程',
        'business-english': '商务英语',
        'mandarin-course': '普通话课程',
        'academic-writing': '学术写作',
      };
      return map[id] || fallback;
    }
    if (!isArabic) return fallback;
    const map: Record<string, string> = {
      'beginner-english': 'اللغة الإنجليزية للمبتدئين',
      'ielts-preparation': 'التحضير لاختبار IELTS',
      'intermediate-english': 'اللغة الإنجليزية المتوسطة',
    };
    return map[id] || fallback;
  };
  const getCourseDescription = (id: string, fallback: string) => {
    if (isChinese) {
      const map: Record<string, string> = {
        'beginner-english': '适合刚开始英语学习旅程的学生。打好语法、词汇和基础会话能力。',
        'intermediate-english': '建立日常交流所需的流利度与自信，适用于工作、旅行和社交场景。',
        'advanced-english': '掌握复杂语法结构和专业场景所需的高级词汇。',
        'ielts-preparation': '通过专家指导实现目标 IELTS 分数，全面准备听说读写四个部分。',
        'ielts-intensive': '通过密集课程、重点练习和考试策略快速备考 IELTS。',
        'business-english': '提升会议、演示、邮件和商务沟通所需的专业英语能力。',
        'mandarin-course': '通过结构化课程和 HSK 导向学习，建立实用普通话沟通能力。',
        'academic-writing': '掌握论文、研究报告和大学学术英语写作。',
      };
      return map[id] || fallback;
    }
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
    if (isChinese) {
      const map: Record<string, string[]> = {
        'beginner-english': [
          '理解并使用基础英语短语',
          '自信地介绍自己和他人',
          '提出并回答简单问题',
          '撰写简单邮件和信息',
          '用英语处理日常情境',
        ],
        'intermediate-english': [
          '在多数日常场景中流利沟通',
          '理解英语电影和电视节目',
          '撰写专业邮件和报告',
          '自信进行演示',
          '积极参与小组讨论',
        ],
        'advanced-english': [
          '在专业场景中清晰表达复杂想法',
          '使用高级语法和词汇',
          '提升正式写作和演讲能力',
          '理解真实材料中的细节和语气',
          '在学术和职场交流中更自信',
        ],
        'ielts-preparation': [
          '掌握 IELTS 听说读写四个部分',
          '学习有效的时间管理策略',
          '建立考试日信心',
          '提升目标分数所需的答题能力',
          '获得个性化反馈和改进方向',
        ],
        'ielts-intensive': [
          '每日练习 IELTS 听说读写',
          '快速加强薄弱题型',
          '学习高效考试策略',
          '完成模拟测试并获得反馈',
          '为近期 IELTS 考试做好准备',
        ],
        'business-english': [
          '在会议和商务讨论中自信表达',
          '撰写清晰专业的邮件',
          '提升演示和谈判表达能力',
          '掌握职场常用词汇',
          '更自然地进行跨文化商务沟通',
        ],
        'mandarin-course': [
          '理解并使用基础普通话词汇和句型',
          '在日常场景中自信交流',
          '认读并书写基础汉字',
          '建立听、说、读、写能力',
          '根据学习时长准备 HSK 1、2 或 3 级',
        ],
        'academic-writing': [
          '组织清晰的学术文章结构',
          '撰写论文和研究报告',
          '使用正式学术表达',
          '正确引用和整合资料',
          '提升大学学习所需的英语写作能力',
        ],
      };
      return map[id] || fallback;
    }
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
  const { courseId } = useParams();
  const routeCourseId = courseId || '';
  const courseIdKey = courseData[routeCourseId] ? routeCourseId : courseAliasMap[routeCourseId] || routeCourseId;
  const course = courseData[courseIdKey];
  const localizedOutcomes = course ? getLocalizedOutcomes(courseIdKey, course.outcomes) : [];
  const whatsappNumber = '60175045565';
  const englishScholarshipOptions = [
    { value: '2-plus-1', studyMonths: 2, bonusMonths: 1, totalMonths: 3, originalFee: 'RM 8,450', scholarshipFee: 'RM 5,800' },
    { value: '4-plus-2', studyMonths: 4, bonusMonths: 2, totalMonths: 6, originalFee: 'RM 19,200', scholarshipFee: 'RM 13,900' },
    { value: '5-plus-3', studyMonths: 5, bonusMonths: 3, totalMonths: 8, originalFee: 'RM 25,300', scholarshipFee: 'RM 17,350' },
    { value: '6-plus-6', studyMonths: 6, bonusMonths: 6, totalMonths: 12, originalFee: 'RM 35,900', scholarshipFee: 'RM 20,000' },
  ];
  const mandarinScholarshipOptions = [
    { value: '1-plus-1', studyMonths: 1, bonusMonths: 1, totalMonths: 2, originalFee: 'RM 5,800', scholarshipFee: 'RM 3,150' },
    { value: '2-plus-2', studyMonths: 2, bonusMonths: 2, totalMonths: 4, originalFee: 'RM 11,100', scholarshipFee: 'RM 5,800' },
    { value: '3-plus-3', studyMonths: 3, bonusMonths: 3, totalMonths: 6, originalFee: 'RM 16,400', scholarshipFee: 'RM 8,450' },
  ];
  const isMandarinCourse = courseIdKey === 'mandarin-course';
  const scholarshipOptions = isMandarinCourse ? mandarinScholarshipOptions : englishScholarshipOptions;
  const promotionIncludes = isMandarinCourse ? ui.mandarinScholarshipIncludes || ui.scholarshipIncludes : ui.scholarshipIncludes;
  const placementNote = isMandarinCourse ? ui.mandarinPlacementNote || ui.notSureDesc : ui.placementNote;
  const [selectedScholarshipValue, setSelectedScholarshipValue] = useState(scholarshipOptions[0].value);
  const selectedScholarship = scholarshipOptions.find(option => option.value === selectedScholarshipValue) || scholarshipOptions[0];

  const buildWhatsAppUrl = (intent: 'register' | 'contact') => {
    const courseName = getCourseTitle(courseIdKey, course.title);
    const durationDetails = ` Study duration: ${ui.scholarshipDurationDesc(selectedScholarship.studyMonths, selectedScholarship.bonusMonths, selectedScholarship.totalMonths)}. Scholarship fee: ${selectedScholarship.scholarshipFee}.`;
    const message = isArabic
      ? intent === 'register'
        ? `السلام عليكم، أريد التسجيل في دورة ${courseName}.${durationDetails}`
        : `السلام عليكم، أريد الاستفسار عن دورة ${courseName}.`
      : intent === 'register'
        ? `Hi, I want to register for ${courseName}.${durationDetails}`
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
          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_386px]">
            <div className="max-w-3xl">
              <div>
                <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm mb-3">
                  {course.level}
                </div>
                <h1 className="mb-3 text-white">{getCourseTitle(courseIdKey, course.title)}</h1>
                <p className="text-lg text-blue-100">{getCourseDescription(courseIdKey, course.description)}</p>
              </div>
              <div className="mt-6 rounded-xl border border-white/20 bg-white/10 p-5 shadow-[0_18px_42px_rgba(0,0,0,0.14)] backdrop-blur-sm">
                <p className="mb-4 text-sm font-bold uppercase tracking-[0.16em] text-white">
                  {ui.promotionIncludes}
                </p>
                <p className="mb-4 text-sm leading-relaxed text-blue-100">
                  {isArabic ? ui.notSureDesc : placementNote}
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {promotionIncludes.map((item: string) => (
                    <div key={item} className="flex items-center gap-3 rounded-lg bg-white/12 px-4 py-3 text-sm font-semibold text-white">
                      <CheckCircle className="h-5 w-5 shrink-0 text-brand-orange" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4 rounded-xl border border-brand-orange/40 bg-brand-orange/15 p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-white">{ui.notSureLevel}</h3>
                    <p className="mt-1 text-sm text-blue-100">{isArabic ? ui.notSureDesc : 'Take the online placement test before registering.'}</p>
                  </div>
                  <Link to="/placement-test" className="shrink-0">
                    <Button variant="primary" className="w-full bg-brand-orange hover:brightness-95 sm:w-auto">
                      {ui.takePlacement}
                      <ArrowRight className={`h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="rounded-xl bg-white p-6 text-gray-900 shadow-lg">
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-600">{ui.scholarshipFee}</p>
                <p className="mt-1 text-3xl text-brand-blue">{selectedScholarship.scholarshipFee}</p>
                <p className="text-sm text-gray-500">
                  {ui.originalFee}: <span className="line-through">{selectedScholarship.originalFee}</span>
                </p>
              </div>
              <div className="mb-5 rounded-lg border border-blue-100 bg-blue-50/60 p-4 text-left" dir={isRTL ? 'rtl' : 'ltr'}>
                <div className="mb-3 flex items-center gap-2 text-brand-blue">
                  <Calendar className="h-5 w-5" />
                  <h3 className="text-base font-semibold">{ui.courseDates}</h3>
                </div>
                <label htmlFor="course-study-duration" className="mb-2 block text-sm font-medium text-gray-700">
                  {ui.studyDuration}
                </label>
                <select
                  id="course-study-duration"
                  value={selectedScholarshipValue}
                  onChange={(event) => setSelectedScholarshipValue(event.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 pr-9 text-sm text-gray-900 outline-none transition-colors focus:border-brand-blue"
                  aria-label={ui.studyDuration}
                >
                  {scholarshipOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {ui.scholarshipDurationLabel(option.studyMonths, option.bonusMonths, option.totalMonths)}
                    </option>
                  ))}
                </select>
                <div className="mt-3 rounded-lg bg-white px-3 py-2 text-sm text-gray-700">
                  <p>{ui.scholarshipDurationDesc(selectedScholarship.studyMonths, selectedScholarship.bonusMonths, selectedScholarship.totalMonths)}</p>
                </div>
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

      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="overflow-hidden">
            <div className="mb-6 flex flex-col gap-2 border-b border-orange-100 pb-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-orange">What You Will Learn</p>
                <h2 className="mt-1">{ui.learningOutcomes}</h2>
              </div>
              <span className="text-sm text-gray-500">{localizedOutcomes.length} key outcomes</span>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {localizedOutcomes.map((outcome: string, index: number) => (
                <div key={index} className="flex items-start gap-4 rounded-xl border border-orange-100 bg-orange-50/40 p-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-orange text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <p className="text-gray-800">{outcome}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}



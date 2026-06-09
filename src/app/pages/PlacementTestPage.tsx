import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/card';
import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';

const questions = [
  { id: 1, question: 'Did you ______ anywhere interesting last weekend?', options: ['go', 'going', 'was', 'went'], correct: 0 },
  { id: 2, question: 'I work as a teacher and my wife ______, too.', options: ['do', 'is', 'work', 'does'], correct: 3 },
  { id: 3, question: 'I think ______ taxi driver.', options: ['her job is', "she's a", 'her job is an', "she's"], correct: 1 },
  { id: 4, question: 'What is your home town ______?', options: ['situated', 'age', 'like', 'located'], correct: 2 },
  { id: 5, question: "I'm afraid I ______ here for your birthday party.", options: ['have not to be', 'am not being', 'will be not', "can't be"], correct: 3 },
  { id: 6, question: 'How ______ are you?', options: ['high', 'wide', 'long', 'heavy'], correct: 2 },
  { id: 7, question: 'How long ______ married?', options: ['have you been', 'are you', 'have you', 'been'], correct: 0 },
  { id: 8, question: 'Would you like ______ help?', options: ['a', 'some', 'me', 'I'], correct: 1 },
  { id: 9, question: 'They ______ to the cinema tomorrow.', options: ['go', 'much', 'rare', 'seldom'], correct: 0 },
  { id: 10, question: "He hasn't played since he ______ the accident.", options: ['had', 'has had', 'has', 'had had'], correct: 0 },
  { id: 11, question: "This is the best tea I've ______ tasted.", options: ['never', 'ever', 'already', 'still'], correct: 1 },
  { id: 12, question: "I'm looking ______ the summer holidays.", options: ['before', 'forward', 'for', 'forward to'], correct: 3 },
  { id: 13, question: 'My girlfriend ______ born on the 2nd of September 1974.', options: ['is', 'was', 'had', 'has been'], correct: 1 },
  { id: 14, question: 'This beer tastes ______.', options: ['badly', 'lovely', 'well', 'normally'], correct: 1 },
  { id: 15, question: "In life ______ can make a mistake; we're all human.", options: ['anyone', 'some people', 'not anybody', 'someone'], correct: 0 },
  { id: 16, question: 'She knows that she ______ to pay now.', options: ['had better', "needn't", 'should', 'ought'], correct: 0 },
  { id: 17, question: 'If he ______ about it, I\'m sure he\'d help.', options: ['had know', 'knew', 'has known', 'knows'], correct: 1 },
  { id: 18, question: "I'll return the newspaper when I ______ through it.", options: ['will have looked', 'looked', 'have looked', 'look'], correct: 2 },
  { id: 19, question: 'They said they ______ come, but they didn\'t.', options: ['can', 'will', 'may', 'might'], correct: 3 },
  { id: 20, question: 'They were ______ hard questions that I had no chance.', options: ['so', 'some', 'such', 'quite'], correct: 2 },
  { id: 21, question: "I don't have a cent to give you. I ______ bought a new computer.", options: ['just buy', 'had just bought', "'ve just", 'soon will'], correct: 2 },
  { id: 22, question: 'Mum gave ______ her job when I was born.', options: ['in', 'up', 'off', 'away'], correct: 1 },
  { id: 23, question: "It's all right, we ______ hurry. We have plenty of time.", options: ["mustn't", "shouldn't", "can't", "needn't"], correct: 3 },
  { id: 24, question: 'You have a terrible fever! ______ call a doctor?', options: ['Shall I', 'Do I', 'Must I', 'Will I'], correct: 0 },
  { id: 25, question: 'Joanna looks ______ in her new dress.', options: ['nice', 'nicely', 'like nice', 'such nice'], correct: 0 },
  { id: 26, question: 'Mr Haines wants ______ to his office.', options: ['that you come', 'you come to', 'you come', 'you to come'], correct: 3 },
  { id: 27, question: 'There are ______ around to start a cricket team.', options: ['enough young boys', 'boys enough young', 'young boys enough', 'enough youngest boys'], correct: 0 },
  { id: 28, question: 'These bottles ______ of plastic.', options: ['are making', 'are make', 'are made', 'made are'], correct: 2 },
  { id: 29, question: 'Do you know where ______?', options: ['did I put the keys', 'I put the keys', 'I the keys', 'I the keys put'], correct: 1 },
  { id: 30, question: 'Magda knows a lot about badgers, but she ______ a live one.', options: ["doesn't ever see", "hasn't ever seen", "hasn't ever saw", "didn't ever see"], correct: 1 },
  { id: 31, question: 'We wash the curtains ______ year.', options: ['three times a', 'once', 'three every', 'every couple'], correct: 3 },
  { id: 32, question: "The loudspeakers won't work unless you ______ those cables.", options: ['connected', 'connect', "don't connect", "can't connect"], correct: 1 },
  { id: 33, question: 'You should give ______.', options: ['to your mother this letter', 'this letter your mother', 'letter this to your mother', 'this letter to your mother'], correct: 3 },
  { id: 34, question: 'Marian has ______ old books.', options: ['very much', 'a lot of', 'lots', 'a very lot'], correct: 1 },
  { id: 35, question: 'Hania has got two children, ______?', options: ["hasn't she", 'has she got', 'has she', "haven't she"], correct: 0 },
  { id: 36, question: "Let's think ______ something nice.", options: ['after', 'about', 'for', 'to'], correct: 1 },
  { id: 37, question: 'A Jaguar is ______ than a Fiat.', options: ['more expensive', 'expensiver', 'much expensive', 'expensive'], correct: 0 },
  { id: 38, question: "The TV's too loud. Please, ______.", options: ['turn down', 'turn it up', 'turn it down', 'turn down it'], correct: 2 },
  { id: 39, question: "It's a pity you ______ here last night.", options: ["weren't", "aren't", "I'll not be", 'not be'], correct: 0 },
  { id: 40, question: 'What about ______ for a walk?', options: ['to go', 'I going', 'going', 'go'], correct: 2 },
  { id: 41, question: 'I made one or two mistakes, but ______ of my answers were correct.', options: ['much', 'most', 'more', 'few'], correct: 1 },
  { id: 42, question: "You can't cross the road when the light ______ red.", options: ["I'll be", 'was', 'were', 'is'], correct: 3 },
  { id: 43, question: 'I have a problem. ______ help me please?', options: ['Could you', 'Should you', 'Were you able to', 'Will you able to'], correct: 0 },
  { id: 44, question: 'Our neighbour is ______ to Ireland.', options: ['going travel', 'going to travelling', 'go', 'going to travel'], correct: 3 },
  { id: 45, question: "Do penguins fly? No, they ______.", options: ["aren't", "haven't", "don't", "won't"], correct: 2 },
  { id: 46, question: '______ train are you taking, the express to Poznan or to Skwierzyna?', options: ['Which', 'How', 'Whose', 'Who'], correct: 0 },
  { id: 47, question: 'This is ______ story.', options: ['a very interesting', 'very an interesting', 'very interesting', 'very interested'], correct: 0 },
  { id: 48, question: 'Marta takes the dog for a walk ______ the evening.', options: ['in', 'at', 'on', 'to'], correct: 0 },
  { id: 49, question: "We haven't got ______ Polish friends.", options: ['no', 'any', 'none', 'some'], correct: 1 },
  { id: 50, question: "Simon can't ______ to you now. He's busy.", options: ['talked', 'to talk', 'talking', 'talk'], correct: 1 },
].map((q) => ({
  ...q,
  options: [...q.options, "I don't know"],
}));

const countryOptions = [
  'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia',
  'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium',
  'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria',
  'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cambodia', 'Cameroon', 'Canada', 'Central African Republic', 'Chad',
  'Chile', 'China', 'Colombia', 'Comoros', 'Congo', 'Costa Rica', "Cote d'Ivoire", 'Croatia', 'Cuba', 'Cyprus',
  'Czechia', 'Democratic Republic of the Congo', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic',
  'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia', 'Fiji',
  'Finland', 'France', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala',
  'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran',
  'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kuwait',
  'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania',
  'Luxembourg', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania',
  'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique',
  'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria',
  'North Korea', 'North Macedonia', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Palestine', 'Panama',
  'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia',
  'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino',
  'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore',
  'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Korea', 'South Sudan', 'Spain',
  'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania',
  'Thailand', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu',
  'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan',
  'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'
].sort((a, b) => a.localeCompare(b));

const classLevelOptions = [
  'Beginner',
  'Elementary',
  'Pre-Intermediate',
  'Intermediate',
  'Upper-Intermediate',
  'Advanced',
] as const;

const classLevelCourseMap: Record<(typeof classLevelOptions)[number], { id: string; title: string; description: string; duration: string }> = {
  Beginner: {
    id: 'beginner-english',
    title: 'Beginner English',
    description: 'Perfect for those starting their English learning journey',
    duration: '12 weeks',
  },
  Elementary: {
    id: 'beginner-english',
    title: 'Beginner English',
    description: 'Ideal for building basic grammar and everyday vocabulary skills',
    duration: '12 weeks',
  },
  'Pre-Intermediate': {
    id: 'intermediate-english',
    title: 'Intermediate English',
    description: 'Great for improving confidence in everyday communication',
    duration: '16 weeks',
  },
  Intermediate: {
    id: 'intermediate-english',
    title: 'Intermediate English',
    description: 'Build confidence and fluency in everyday conversations',
    duration: '16 weeks',
  },
  'Upper-Intermediate': {
    id: 'intermediate-english',
    title: 'Intermediate English',
    description: 'Strengthen fluency and prepare for more advanced English use',
    duration: '16 weeks',
  },
  Advanced: {
    id: 'ielts-preparation',
    title: 'IELTS Preparation',
    description: 'Achieve your target IELTS score with expert guidance',
    duration: '10 weeks',
  },
};

const placementUiText = {
  en: {
    heroTitle: 'Free Placement Test',
    heroSubtitle: 'Discover your English level in 50 questions',
    beforeBegin: 'Before You Begin',
    beforeBeginDesc: 'Complete our 50-question grammar and vocabulary test to find your CEFR level (A1-C2) and get personalized course recommendations.',
    questionCountTitle: '50 carefully designed questions',
    questionCountDesc: 'Up to 60 minutes to complete',
    recommendationTitle: 'Personalized course recommendations',
    recommendationDesc: 'Find the perfect course for your level',
    email: 'Email *',
    emailPlaceholder: 'your@email.com',
    country: 'Country *',
    countryPlaceholder: 'Select your country',
    classLevel: 'Class Level *',
    classLevelPlaceholder: 'Select class level',
    age: 'Age *',
    agePlaceholder: 'Your age',
    startTest: 'Start Test Now',
    emailError: 'Please enter a valid email address to start the test.',
    countryError: 'Please select your country to start the test.',
    classLevelError: 'Please select your class level to start the test.',
    ageError: 'Please enter a valid age to start the test.',
    congrats: 'Congratulations!',
    complete: 'Your placement test is complete',
    resultFollowUpTitle: 'Thank you for completing the test',
    resultFollowUpDesc: 'Our team will review your answers and get back to you with your placement result and the best course recommendation.',
    englishLevel: 'Your English Level',
    youScored: 'You scored',
    outOf: 'out of',
    correct: 'questions correctly',
    quote: '"With the right course, you can improve your English faster than you think."',
    recommendedCourses: 'Recommended Courses for You',
    perfectMatch: 'Perfect Match',
    duration: 'Duration',
    viewCourse: 'View Course',
    journeyTitle: 'Start Your Learning Journey Today',
    journeyDesc: 'Join Wordsworth Language Centre and take the next step toward English fluency. Our expert instructors are ready to guide you to success.',
    applyNow: 'Apply Now',
    talkToAdvisor: 'Talk to an Advisor',
    callUsNow: 'Or call us now:',
    retake: 'Retake Test',
    questionLabel: 'Question',
    of: 'of',
    timeRemaining: 'Time Remaining',
    sectionBTitle: 'SECTION B: WRITING (10 MARKS)',
    sectionBA: '(A) Pick a topic and write a paragraph describing it. Use many adjectives about physical appearance, attitudes or manners. (Maximum 50 words.)',
    sectionBTopics: 'Topics:',
    topicMother: 'My Mother',
    topicCountry: 'My Country',
    topicOr: 'or',
    sectionBB: '(B) Imagine you returned from a two-week holiday. Write an email to a friend about the journey, where you stayed, what you did, and the people you met.',
    writingPlaceholder: 'Write your paragraph/email here...',
    writingError: 'Please complete the writing section before submitting.',
    submitTest: 'Submit Test',
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
    levelDescBeginner: 'Perfect for beginner level students to build strong foundations',
    levelDescIntermediate: 'Perfect for intermediate level students to build strong foundations',
    levelDescAdvanced: 'Perfect for advanced level students to build strong foundations',
    englishSuffix: 'English',
    cefrLabel: 'CEFR Level',
    ieltsTitle: 'IELTS Preparation',
    ieltsDesc: 'Achieve your target IELTS score with expert guidance',
    businessTitle: 'Business English',
    businessDesc: 'Professional English for workplace success',
  },
  ar: {
    heroTitle: 'اختبار تحديد المستوى المجاني',
    heroSubtitle: 'اكتشف مستواك في اللغة الإنجليزية من خلال 50 سؤالًا',
    beforeBegin: 'قبل أن تبدأ',
    beforeBeginDesc: 'أكمل اختبار القواعد والمفردات المكوّن من 50 سؤالًا لمعرفة مستواك وفق CEFR (A1-C2) والحصول على توصيات مخصصة للدورات.',
    questionCountTitle: '50 سؤالًا مصممًا بعناية',
    questionCountDesc: 'حتى 60 دقيقة لإكمال الاختبار',
    recommendationTitle: 'توصيات دورات مخصصة',
    recommendationDesc: 'اعثر على الدورة الأنسب لمستواك',
    email: 'البريد الإلكتروني *',
    emailPlaceholder: 'your@email.com',
    country: 'الدولة *',
    countryPlaceholder: 'اختر دولتك',
    classLevel: 'مستوى الفصل *',
    classLevelPlaceholder: 'اختر مستوى الفصل',
    age: 'العمر *',
    agePlaceholder: 'عمرك',
    startTest: 'ابدأ الاختبار الآن',
    emailError: 'يرجى إدخال بريد إلكتروني صحيح لبدء الاختبار.',
    countryError: 'يرجى اختيار دولتك لبدء الاختبار.',
    classLevelError: 'يرجى اختيار مستوى الفصل لبدء الاختبار.',
    ageError: 'يرجى إدخال عمر صحيح لبدء الاختبار.',
    congrats: 'تهانينا!',
    complete: 'اكتمل اختبار تحديد المستوى',
    englishLevel: 'مستواك في اللغة الإنجليزية',
    youScored: 'حصلت على',
    outOf: 'من أصل',
    correct: 'إجابة صحيحة',
    quote: '"مع الدورة المناسبة، يمكنك تطوير لغتك الإنجليزية أسرع مما تتوقع."',
    recommendedCourses: 'الدورات الموصى بها لك',
    perfectMatch: 'الأنسب لك',
    duration: 'المدة',
    viewCourse: 'عرض الدورة',
    journeyTitle: 'ابدأ رحلتك التعليمية اليوم',
    journeyDesc: 'انضم إلى مركز ووردزورث للغات واتخذ الخطوة التالية نحو الطلاقة في الإنجليزية. مدرسونا الخبراء جاهزون لدعمك.',
    applyNow: 'سجل الآن',
    talkToAdvisor: 'تحدث مع مستشار',
    callUsNow: 'أو اتصل بنا الآن:',
    retake: 'إعادة الاختبار',
    questionLabel: 'السؤال',
    of: 'من',
    timeRemaining: 'الوقت المتبقي',
    sectionBTitle: 'القسم ب: الكتابة (10 درجات)',
    sectionBA: '(أ) اختر موضوعًا واكتب فقرة تصفه. استخدم العديد من الصفات عن المظهر الجسدي أو السلوك أو الطباع. (الحد الأقصى 50 كلمة).',
    sectionBTopics: 'الموضوعات:',
    topicMother: 'أمي',
    topicCountry: 'بلدي',
    topicOr: 'أو',
    sectionBB: '(ب) تخيّل أنك عدت من عطلة لمدة أسبوعين. اكتب بريدًا إلكترونيًا لصديق عن الرحلة، وأين أقمت، وماذا فعلت، والأشخاص الذين قابلتهم.',
    writingPlaceholder: 'اكتب فقرتك/رسالتك هنا...',
    writingError: 'يرجى إكمال قسم الكتابة قبل الإرسال.',
    submitTest: 'إرسال الاختبار',
    beginner: 'مبتدئ',
    intermediate: 'متوسط',
    advanced: 'متقدم',
    levelDescBeginner: 'مناسب لطلاب المستوى المبتدئ لبناء أساس قوي',
    levelDescIntermediate: 'مناسب لطلاب المستوى المتوسط لبناء أساس قوي',
    levelDescAdvanced: 'مناسب لطلاب المستوى المتقدم لتطوير مهاراتهم',
    englishSuffix: 'الإنجليزية',
    cefrLabel: 'مستوى CEFR',
    ieltsTitle: 'التحضير لاختبار IELTS',
    ieltsDesc: 'حقق درجتك المستهدفة في IELTS بإرشاد خبراء',
    businessTitle: 'الإنجليزية للأعمال',
    businessDesc: 'لغة إنجليزية احترافية للنجاح في بيئة العمل',
  },
  zh: {
    heroTitle: '免费水平测试',
    heroSubtitle: '通过50道题了解您的英语水平',
    beforeBegin: '开始之前',
    beforeBeginDesc: '完成50道语法和词汇题，了解您的 CEFR 等级（A1-C2），并获得适合您的课程推荐。',
    questionCountTitle: '50道精心设计的问题',
    questionCountDesc: '最多60分钟完成',
    recommendationTitle: '个性化课程建议',
    recommendationDesc: '找到最适合您水平的课程',
    email: '邮箱 *',
    emailPlaceholder: 'your@email.com',
    country: '国家 *',
    countryPlaceholder: '选择您的国家',
    classLevel: '班级水平 *',
    classLevelPlaceholder: '选择班级水平',
    age: '年龄 *',
    agePlaceholder: '您的年龄',
    startTest: '立即开始测试',
    emailError: '请输入有效邮箱以开始测试。',
    countryError: '请选择国家以开始测试。',
    classLevelError: '请选择班级水平以开始测试。',
    ageError: '请输入有效年龄以开始测试。',
    congrats: '恭喜！',
    complete: '您的水平测试已完成',
    resultFollowUpTitle: '感谢您完成测试',
    resultFollowUpDesc: '我们的团队将审核您的答案，并尽快与您联系，告知水平测试结果和最适合您的课程建议。',
    journeyTitle: '今天开始您的学习旅程',
    journeyDesc: '加入 Wordsworth Language Centre，迈出提升英语流利度的下一步。我们的专业导师将为您提供指导。',
    applyNow: '立即申请',
    talkToAdvisor: '咨询顾问',
    callUsNow: '或立即致电：',
    retake: '重新测试',
    questionLabel: '问题',
    of: '共',
    timeRemaining: '剩余时间',
    sectionBTitle: 'B 部分：写作（10分）',
    sectionBA: '（A）选择一个主题并写一段描述。请使用描述外貌、态度或行为的形容词。（最多50词）',
    sectionBTopics: '主题：',
    topicMother: '我的母亲',
    topicCountry: '我的国家',
    topicOr: '或',
    sectionBB: '（B）想象您刚结束两周假期。请写一封邮件给朋友，介绍旅程、住宿地点、活动和遇到的人。',
    writingPlaceholder: '请在这里写下您的段落/邮件...',
    writingError: '提交前请完成写作部分。',
    submitTest: '提交测试',
  },
  ms: {} as Record<string, string>,
} as const;

export function PlacementTestPage() {
  const { language } = useLanguage();
  const isRTL = false;
  const heroIsRTL = language === 'ar';
  const TEST_DURATION_SECONDS = 60 * 60;
  const [testStarted, setTestStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showWritingSection, setShowWritingSection] = useState(false);
  const [writingAnswer, setWritingAnswer] = useState('');
  const [writingError, setWritingError] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [isSubmittingPlacement, setIsSubmittingPlacement] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(TEST_DURATION_SECONDS);
  const [leadForm, setLeadForm] = useState({
    email: '',
    country: '',
    classLevel: '',
    age: '',
  });
  const [leadError, setLeadError] = useState('');

  useEffect(() => {
    if (!testStarted || showResults) return;

    const timer = window.setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          window.clearInterval(timer);
          setShowResults(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [testStarted, showResults]);

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 300);
    } else {
      setTimeout(() => {
        setShowWritingSection(true);
      }, 300);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    answers.forEach((answer, index) => {
      if (questions[index] && answer === questions[index].correct) {
        correct++;
      }
    });
    return correct;
  };

  const submitPlacementTest = async () => {
    const score = calculateScore();
    const level = getLevel(score);
    const grammarAnswers = questions.map((q, index) => {
      const selectedIndex = answers[index];
      return {
        questionId: q.id,
        selectedIndex: Number.isFinite(selectedIndex) ? selectedIndex : null,
        selectedText: Number.isFinite(selectedIndex) ? q.options[selectedIndex] ?? null : null,
        correctIndex: q.correct,
        isCorrect: selectedIndex === q.correct,
      };
    });

    const response = await fetch('/api/placement-submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        source: 'Placement Test Page',
        email: leadForm.email,
        country: leadForm.country,
        classLevel: leadForm.classLevel,
        age: Number(leadForm.age),
        score,
        totalQuestions: questions.length,
        cefrLevel: level.desc,
        recommendedCourseId: level.course,
        writingAnswer: writingAnswer.trim(),
        grammarAnswers,
      }),
    });

    const contentType = response.headers.get('content-type') || '';
    let result: any = null;
    if (contentType.includes('application/json')) {
      result = await response.json();
    } else {
      const text = await response.text();
      result = { error: text || 'Submission failed. Please try again.' };
    }

    if (!response.ok) {
      throw new Error(result?.error || 'Submission failed. Please try again.');
    }
  };

  const getLevel = (score: number) => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return { level: 'Advanced', desc: 'C1-C2', course: 'advanced-english' };
    if (percentage >= 60) return { level: 'Intermediate', desc: 'B1-B2', course: 'intermediate-english' };
    return { level: 'Beginner', desc: 'A1-A2', course: 'beginner-english' };
  };

  const activeUi = language === 'ar' ? placementUiText.ar : language === 'zh' ? placementUiText.zh : placementUiText.en;
  const ui = activeUi;
  const heroUi = activeUi;
  const startUi = activeUi;
  const classLevelLabels: Record<(typeof classLevelOptions)[number], string> = language === 'ar'
    ? {
        Beginner: 'مبتدئ',
        Elementary: 'أساسي',
        'Pre-Intermediate': 'قبل المتوسط',
        Intermediate: 'متوسط',
        'Upper-Intermediate': 'فوق المتوسط',
        Advanced: 'متقدم',
      }
    : {
        Beginner: 'Beginner',
        Elementary: 'Elementary',
        'Pre-Intermediate': 'Pre-Intermediate',
        Intermediate: 'Intermediate',
        'Upper-Intermediate': 'Upper-Intermediate',
        Advanced: 'Advanced',
      };
  const localizedClassLevelLabels: Record<(typeof classLevelOptions)[number], string> = language === 'zh'
    ? {
        Beginner: '初级',
        Elementary: '基础',
        'Pre-Intermediate': '初中级',
        Intermediate: '中级',
        'Upper-Intermediate': '中高级',
        Advanced: '高级',
      }
    : classLevelLabels;

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const hours = String(Math.floor(remainingSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((remainingSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(remainingSeconds % 60).padStart(2, '0');

  if (showResults) {
    return (
      <div className="min-h-screen bg-gray-50 py-12" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <Card className="text-center border border-gray-200 rounded-2xl shadow-sm p-4 sm:p-6">
              <div className="mb-6">
                <div className="bg-brand-green/10 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-16 h-16 text-brand-green" />
                </div>
              </div>
              <h1 className="mb-4">{ui.congrats}</h1>
              <p className="text-gray-600 mb-8">{ui.complete}</p>

              <div className="bg-gradient-to-r from-brand-blue to-brand-blue-dark text-white rounded-2xl p-6 sm:p-8">
                <CheckCircle className="w-12 h-12 mx-auto mb-4 text-brand-orange" />
                <h2 className="mb-3 text-white">{ui.resultFollowUpTitle}</h2>
                <p className="text-blue-100 max-w-2xl mx-auto">
                  {ui.resultFollowUpDesc}
                </p>
              </div>
            </Card>

            <Card className="bg-gradient-to-r from-brand-blue to-brand-blue-dark text-white text-center border-0 rounded-2xl shadow-sm p-6 sm:p-8">
              <CheckCircle className="w-16 h-16 mx-auto mb-4 text-brand-orange" />
              <h2 className="mb-4 text-white">{ui.journeyTitle}</h2>
              <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                {ui.journeyDesc}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                <Link to="/register">
                  <Button variant="secondary" size="lg" className="bg-brand-orange hover:brightness-95 text-white border-0">
                    {ui.applyNow}
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <button
                  onClick={() => {
                    const chatButton = document.querySelector('[aria-label="Open chat"]') as HTMLButtonElement;
                    if (chatButton) chatButton.click();
                  }}
                  className="px-8 py-4 bg-white/10 border-2 border-white text-white rounded-lg hover:bg-white hover:text-brand-blue transition-all"
                >
                  {ui.talkToAdvisor}
                </button>
              </div>
              <p className="text-sm text-blue-100">
                {ui.callUsNow} <a href="tel:+60175045565" className="text-white hover:underline">+60 17-504 5565</a>
              </p>
            </Card>

            <div className="text-center">
              <button
                onClick={() => {
                  setTestStarted(false);
                  setCurrentQuestion(0);
                  setAnswers([]);
                  setShowWritingSection(false);
                  setWritingAnswer('');
                  setWritingError('');
                  setShowResults(false);
                  setRemainingSeconds(TEST_DURATION_SECONDS);
                }}
                className="text-brand-blue hover:underline"
              >
                {ui.retake}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (!testStarted) {
    return (
      <div className="min-h-screen bg-gray-50" dir={heroIsRTL ? 'rtl' : 'ltr'}>
        <section className="relative overflow-hidden bg-white text-white py-3 sm:py-4 min-h-[196px] sm:min-h-[210px] flex items-center">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,#f5a21f_0%,#f5a21f_24%,#ffffff_24%,#ffffff_58%,#06115a_58%,#06115a_100%)]" />
          <div className="absolute inset-0 opacity-90 bg-[radial-gradient(circle_at_18%_28%,rgba(255,255,255,0.45)_0_14%,transparent_15%),linear-gradient(120deg,transparent_0_42%,rgba(245,162,31,0.9)_42%_50%,transparent_50%_100%)]" />
          <div className="absolute -left-20 top-0 h-full w-64 -skew-x-12 bg-brand-blue" />
          <div className="absolute right-0 bottom-0 h-28 w-72 -skew-x-12 bg-brand-orange/90" />
          <div className="absolute inset-0 bg-brand-blue/30" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center" dir={heroIsRTL ? 'rtl' : 'ltr'}>
            <div className="mx-auto max-w-2xl rounded-xl bg-brand-blue/45 px-4 py-2.5 sm:px-6 sm:py-3 backdrop-blur-[1px]">
              <h1 className="mb-3 text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.45)]">{heroUi.heroTitle}</h1>
              <p className="text-xl text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.45)]">
                {heroUi.heroSubtitle}
              </p>
            </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card className="max-w-2xl mx-auto p-5 sm:p-6 gap-4">
            <div className="text-center mb-5">
              <div className="bg-brand-blue/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-brand-blue" />
              </div>
              <h2 className="mb-4">{startUi.beforeBegin}</h2>
              <p className="text-gray-600">
                {startUi.beforeBeginDesc}
              </p>
            </div>

            <div className="space-y-3 mb-5">
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-brand-blue flex-shrink-0 mt-1" />
                <div>
                  <p>{startUi.questionCountTitle}</p>
                  <p className="text-sm text-gray-600">{startUi.questionCountDesc}</p>
                </div>
              </div>
             
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-brand-blue flex-shrink-0 mt-1" />
                <div>
                  <p>{startUi.recommendationTitle}</p>
                  <p className="text-sm text-gray-600">{startUi.recommendationDesc}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-5">
              <div>
                <label htmlFor="placement-email" className="block mb-2 text-gray-700">
                  {startUi.email}
                </label>
                <input
                  id="placement-email"
                  type="email"
                  value={leadForm.email}
                  onChange={(e) => {
                    setLeadForm((prev) => ({ ...prev, email: e.target.value }));
                    if (leadError) setLeadError('');
                  }}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-brand-blue transition-colors"
                  placeholder={startUi.emailPlaceholder}
                />
              </div>
              <div>
                <label htmlFor="placement-country" className="block mb-2 text-gray-700">
                  {startUi.country}
                </label>
                <input
                  id="placement-country"
                  list="placement-country-options"
                  type="text"
                  value={leadForm.country}
                  onChange={(e) => {
                    setLeadForm((prev) => ({ ...prev, country: e.target.value }));
                    if (leadError) setLeadError('');
                  }}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-brand-blue transition-colors"
                  placeholder={startUi.countryPlaceholder}
                  autoComplete="country-name"
                />
                <datalist id="placement-country-options">
                  {countryOptions.map((country) => (
                    <option key={country} value={country} />
                  ))}
                </datalist>
              </div>
              <div>
                <label htmlFor="placement-class-level" className="block mb-2 text-gray-700">
                  {startUi.classLevel}
                </label>
                <select
                  id="placement-class-level"
                  value={leadForm.classLevel}
                  onChange={(e) => {
                    setLeadForm((prev) => ({ ...prev, classLevel: e.target.value }));
                    if (leadError) setLeadError('');
                  }}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-brand-blue transition-colors"
                >
                  <option value="" disabled>
                    {startUi.classLevelPlaceholder}
                  </option>
                  {classLevelOptions.map((level) => (
                    <option key={level} value={level}>
                      {localizedClassLevelLabels[level]}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="placement-age" className="block mb-2 text-gray-700">
                  {startUi.age}
                </label>
                <input
                  id="placement-age"
                  type="number"
                  min={1}
                  value={leadForm.age}
                  onChange={(e) => {
                    setLeadForm((prev) => ({ ...prev, age: e.target.value }));
                    if (leadError) setLeadError('');
                  }}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-brand-blue transition-colors"
                  placeholder={startUi.agePlaceholder}
                />
              </div>
              {leadError && <p className="text-sm text-red-600">{leadError}</p>}
            </div>

            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={() => {
                const validEmail = /\S+@\S+\.\S+/.test(leadForm.email.trim());
                if (!validEmail) {
                  setLeadError(startUi.emailError);
                  return;
                }
                if (!leadForm.country) {
                  setLeadError(startUi.countryError);
                  return;
                }
                if (!leadForm.classLevel) {
                  setLeadError(startUi.classLevelError);
                  return;
                }
                const ageNumber = Number(leadForm.age);
                if (!leadForm.age || !Number.isFinite(ageNumber) || ageNumber < 1) {
                  setLeadError(startUi.ageError);
                  return;
                }
                setLeadError('');
                setShowWritingSection(false);
                setWritingAnswer('');
                setWritingError('');
                setRemainingSeconds(TEST_DURATION_SECONDS);
                setTestStarted(true);
              }}
            >
              {startUi.startTest}
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  if (showWritingSection) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-blue to-brand-blue-dark flex items-center justify-center px-4 py-6" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="max-w-3xl w-full">
          <div className="mb-4 rounded-xl border border-white/25 bg-white/10 px-4 py-3 sm:px-5 sm:py-4">
            <div className="flex items-center justify-between gap-3">
              <span className="text-blue-100 text-base sm:text-lg">{ui.timeRemaining}</span>
              <span className="text-white text-2xl sm:text-3xl font-bold tracking-wider tabular-nums">
                {hours}:{minutes}:{seconds}
              </span>
            </div>
          </div>

          <Card className="p-4 sm:p-5 md:p-6 rounded-2xl border border-gray-200 shadow-sm">
            <h2 className="mb-5 text-2xl sm:text-3xl leading-tight">{ui.sectionBTitle}</h2>
            <div className="space-y-4 text-gray-800">
              <p>{ui.sectionBA}</p>
              <p>
                {ui.sectionBTopics} <strong>{ui.topicMother}</strong> {ui.topicOr} <strong>{ui.topicCountry}</strong>
              </p>
              <p>{ui.sectionBB}</p>
            </div>
            <textarea
              value={writingAnswer}
              onChange={(e) => {
                setWritingAnswer(e.target.value);
                if (writingError) setWritingError('');
              }}
              placeholder={ui.writingPlaceholder}
              className="mt-4 h-[min(34vh,19rem)] min-h-56 w-full rounded-xl border-2 border-gray-200 p-4 text-gray-900 focus:outline-none focus:border-brand-blue"
            />
            {writingError && <p className="mt-3 text-sm text-red-600">{writingError}</p>}
            <div className="mt-5 flex justify-end">
              <Button
                variant="primary"
                onClick={async () => {
                  if (!writingAnswer.trim()) {
                    setWritingError(ui.writingError);
                    return;
                  }
                  setWritingError('');
                  setIsSubmittingPlacement(true);
                  try {
                    await submitPlacementTest();
                    setShowResults(true);
                  } catch (error) {
                    setWritingError(error instanceof Error ? error.message : 'Submission failed. Please try again.');
                  } finally {
                    setIsSubmittingPlacement(false);
                  }
                }}
                disabled={isSubmittingPlacement}
              >
                {isSubmittingPlacement ? 'Submitting...' : ui.submitTest}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-blue to-brand-blue-dark flex items-center justify-center px-4 py-12" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-3xl w-full">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white">{ui.questionLabel} {currentQuestion + 1} {ui.of} {questions.length}</span>
            <span className="text-white">{Math.round(progress)}%</span>
          </div>
          <div className="mb-4 rounded-xl border border-white/25 bg-white/10 px-4 py-3 sm:px-5 sm:py-4">
            <div className="flex items-center justify-between gap-3">
              <span className="text-blue-100 text-base sm:text-lg">{ui.timeRemaining}</span>
              <span className="text-white text-2xl sm:text-3xl font-bold tracking-wider tabular-nums">
                {hours}:{minutes}:{seconds}
              </span>
            </div>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
            <motion.div
              className="bg-brand-orange h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-5 sm:p-6 md:p-7 rounded-2xl border border-gray-200 shadow-sm">
            <h2 className="mb-6 text-2xl sm:text-3xl leading-tight">{question.question}</h2>
            <div className="space-y-4">
              {question.options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className="w-full p-4 text-left border-2 border-gray-200 rounded-xl hover:border-brand-blue hover:bg-blue-50 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center flex-shrink-0">
                      {String.fromCharCode(65 + index)}
                    </div>
                    <p className="text-gray-800">{option}</p>
                  </div>
                </motion.button>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}



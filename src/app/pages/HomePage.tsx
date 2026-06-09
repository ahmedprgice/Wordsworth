import { Link } from 'react-router';
import { ArrowRight, CheckCircle, Globe, Users, Award, BookOpen, Play, ChevronDown, Send, X, FileText } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/textarea';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export function HomePage() {
  const { t, language, isRTL } = useLanguage();
  const isArabic = language === 'ar';
  const isMalay = language === 'ms';
  const baseUi = isArabic
    ? {
        browserNoVideo: 'متصفحك لا يدعم تشغيل الفيديو.',
        sendMessageTitle: 'أرسل لنا رسالة',
        sendMessageSubtitle: 'أخبرنا بما تحتاجه وسنرد عليك بسرعة.',
        messageSent: 'تم إرسال الرسالة!',
        messageSentSubtitle: 'سنتواصل معك خلال 24 ساعة.',
        nameLabel: 'الاسم *',
        namePlaceholder: 'اسمك',
        emailLabel: 'البريد الإلكتروني *',
        phoneLabel: 'رقم الهاتف *',
        subjectLabel: 'الموضوع *',
        messagePlaceholder: 'أخبرنا بمزيد من التفاصيل عن استفسارك...',
        messageAriaLabel: 'الرسالة (اختياري)',
        otpNotice: 'قم بتأكيد بريدك الإلكتروني عبر رمز التحقق قبل إرسال رسالتك.',
        sendingOtp: 'جاري إرسال الرمز...',
        sendOtp: 'إرسال رمز التحقق',
        otpInputPlaceholder: 'أدخل رمز التحقق المكون من 6 أرقام',
        verifyingOtp: 'جاري التحقق...',
        verifyOtp: 'تأكيد الرمز',
        verified: 'تم التحقق',
        sendMessageBtn: 'إرسال الرسالة',
        sendingMessage: 'جاري الإرسال...',
        placementTitle: 'اختبار تحديد المستوى المجاني في الإنجليزية',
        placementDesc:
          'أكمل اختبارنا المكون من 50 سؤالًا في القواعد والمفردات لمعرفة مستواك وفق CEFR (A1-C2) والحصول على توصيات مناسبة للدورات.',
        startPlacementTest: '3 أشهر أو أقل',
        exploreCourses: 'أكثر من 3 أشهر',
        placementButtonDesc: 'مناسب للبرامج قصيرة المدة التي لا تتطلب تأشيرة دراسية.',
        coursesButtonDesc: 'مناسب للدراسة لأكثر من 3 أشهر ويتطلب إجراءات التأشيرة.',
        detailsFormTitle: 'نموذج معلومات التسجيل',
        detailsFormSubtitle: 'املأ بياناتك وسيتواصل معك فريقنا بخصوص الخيار الذي اخترته.',
        selectedPlanLabel: 'الخيار المحدد',
        closeModal: 'إغلاق',
        submitDetailsBtn: 'إرسال البيانات',
        detailsSentSuccess: 'تم إرسال بياناتك بنجاح. سنتواصل معك قريبًا.',
        visaGuideTitle: 'ابدأ دراستك في ماليزيا مع Wordsworth',
        visaGuideSubtitle: 'اضغط على الزر أدناه للحصول على دليل واضح حول كيفية بدء دراستك في Wordsworth Language Centre في ماليزيا.',
        scholarshipTitle: 'منح دراسية لتعلّم الإنجليزية في ماليزيا',
        scholarshipDesc: 'اطّلع على منشور المنح الدراسية الرسمي من Wordsworth Language Centre للحصول على التفاصيل الكاملة حول الأهلية والمزايا.',
        viewFlyer: 'عرض المنشور',
        downloadFlyer: 'تحميل PDF',
        guideBadge: 'دليل فيديو لاختبار تحديد المستوى',
        guideTitle: 'شاهد الدليل قبل أن تبدأ',
        guideIntro:
          'يحتوي هذا القسم على فيديو مسجل يشرح بالتفصيل كيفية استخدام نظام اختبار تحديد المستوى من البداية حتى النهاية.',
        guideIntro2:
          'في بضع دقائق، ستتعلم كيفية التسجيل، والإجابة عن كل سؤال بشكل صحيح، وإرسال الاختبار، وفهم نتيجتك النهائية بثقة.',
        walkthroughTitle: 'شرح النظام خطوة بخطوة',
        walkthroughDesc: 'تعليمات واضحة لكل مرحلة من مراحل اختبار تحديد المستوى',
        answerTitle: 'كيفية الإجابة بشكل صحيح',
        answerDesc: 'أفضل الممارسات لتجنب الأخطاء وإكمال الاختبار بسهولة',
        resultTitle: 'النتيجة والخطوة التالية',
        resultDesc: 'تعرّف كيف يتم حساب مستواك وأي دورة تناسبك بعد ذلك',
        nameRequired: 'الاسم مطلوب',
        emailRequired: 'البريد الإلكتروني مطلوب',
        emailInvalid: 'يرجى إدخال بريد إلكتروني صحيح',
        phoneRequired: 'رقم الهاتف مطلوب',
        subjectRequired: 'الموضوع مطلوب',
        verifyOtpBeforeSubmit: 'يرجى التحقق من رمز OTP قبل إرسال رسالتك.',
        failedSendMessage: 'فشل إرسال الرسالة',
        sentSuccessApi: 'تم إرسال الرسالة بنجاح. سنتواصل معك قريبًا.',
        genericError: 'حدث خطأ ما. يرجى المحاولة مرة أخرى.',
        emailPhoneFirst: 'يرجى إدخال البريد الإلكتروني ورقم الهاتف أولًا.',
        failedSendOtp: 'فشل إرسال رمز OTP.',
        otpSentStatus: 'تم إرسال رمز OTP إلى بريدك الإلكتروني. أدخل الرمز المكون من 6 أرقام أدناه.',
        enterOtpCode: 'يرجى إدخال رمز OTP.',
        failedVerifyOtp: 'فشل التحقق من رمز OTP.',
        otpVerifiedStatus: 'تم التحقق من رمز OTP بنجاح.',
      }
    : {
        browserNoVideo: 'Your browser does not support the video tag.',
        sendMessageTitle: 'Send Us a Message',
        sendMessageSubtitle: 'Tell us what you need, and we will reply quickly.',
        messageSent: 'Message Sent!',
        messageSentSubtitle: "We'll get back to you within 24 hours.",
        nameLabel: 'Name *',
        namePlaceholder: 'Your name',
        emailLabel: 'Email *',
        phoneLabel: 'Phone Number *',
        subjectLabel: 'Subject *',
        messagePlaceholder: 'Tell us more about your inquiry...',
        messageAriaLabel: 'Message (Optional)',
        otpNotice: 'Verify your email with OTP before sending your message.',
        sendingOtp: 'Sending OTP...',
        sendOtp: 'Send OTP',
        otpInputPlaceholder: 'Enter 6-digit OTP',
        verifyingOtp: 'Verifying...',
        verifyOtp: 'Verify OTP',
        verified: 'Verified',
        sendMessageBtn: 'Send Message',
        sendingMessage: 'Sending...',
        placementTitle: 'Free English Placement Test',
        placementDesc:
          'Complete our 50-question grammar and vocabulary test to find your CEFR level (A1-C2) and get personalized course recommendations.',
        startPlacementTest: 'Click here to start',
        exploreCourses: 'More Than 3 Months',
        placementButtonDesc: 'Short-term programs that do not require a student visa.',
        coursesButtonDesc: 'Long term programs that require visa processing.',
        detailsFormTitle: 'Registration Details Form',
        detailsFormSubtitle: 'Fill in your details and our team will contact you about the option you selected.',
        selectedPlanLabel: 'Selected Option',
        closeModal: 'Close',
        submitDetailsBtn: 'Submit Details',
        detailsSentSuccess: 'Your details were sent successfully. Our team will contact you soon.',
        visaGuideTitle: 'Start Your Studies in Malaysia with Wordsworth',
        visaGuideSubtitle: 'Click the button below to get a guide on how to start your studies in Wordsworth Language Centre in Malaysia.',
        scholarshipTitle: 'English Scholarship in Malaysia',
        scholarshipDesc: 'Explore the official scholarship flyer from Wordsworth Language Centre for full eligibility and benefit details.',
        viewFlyer: 'View Flyer',
        downloadFlyer: 'Download PDF',
        guideBadge: 'Placement Test Video Guide',
        guideTitle: 'Watch the Tutorial Before You Start',
        guideIntro:
          'This section contains a recorded video tutorial that explains exactly how to use the placement test system from start to finish.',
        guideIntro2:
          'In a few minutes, you will learn how to register, answer each question properly, submit your test, and understand your final English level result with confidence.',
        walkthroughTitle: 'System Walkthrough',
        walkthroughDesc: 'Clear instructions for every step of the placement test flow',
        answerTitle: 'How to Answer Correctly',
        answerDesc: 'Best practices to avoid mistakes and complete the test smoothly',
        resultTitle: 'Result and Next Step',
        resultDesc: 'See how your level is calculated and which course to choose next',
        nameRequired: 'Name is required',
        emailRequired: 'Email is required',
        emailInvalid: 'Please enter a valid email',
        phoneRequired: 'Phone number is required',
        subjectRequired: 'Subject is required',
        verifyOtpBeforeSubmit: 'Please verify OTP before sending your message.',
        failedSendMessage: 'Failed to send message',
        sentSuccessApi: 'Message sent successfully. We will contact you soon.',
        genericError: 'Something went wrong. Please try again.',
        emailPhoneFirst: 'Please enter email and phone number first.',
        failedSendOtp: 'Failed to send OTP.',
        otpSentStatus: 'OTP sent to your email. Enter the 6-digit code below.',
        enterOtpCode: 'Please enter the OTP code.',
        failedVerifyOtp: 'Failed to verify OTP.',
        otpVerifiedStatus: 'OTP verified successfully.',
      };

  const msUiOverrides = {
    sendMessageTitle: 'Hantar Mesej Kepada Kami',
    sendMessageSubtitle: 'Beritahu kami keperluan anda, dan kami akan membalas dengan segera.',
    messageSent: 'Mesej Berjaya Dihantar!',
    messageSentSubtitle: 'Kami akan menghubungi anda dalam masa 24 jam.',
    nameLabel: 'Nama *',
    namePlaceholder: 'Nama anda',
    emailLabel: 'Emel *',
    phoneLabel: 'Nombor Telefon *',
    subjectLabel: 'Subjek *',
    messagePlaceholder: 'Berikan maklumat lanjut tentang pertanyaan anda...',
    messageAriaLabel: 'Mesej (Pilihan)',
    otpNotice: 'Sahkan emel anda dengan OTP sebelum menghantar mesej.',
    sendingOtp: 'Menghantar OTP...',
    sendOtp: 'Hantar OTP',
    otpInputPlaceholder: 'Masukkan OTP 6 digit',
    verifyingOtp: 'Mengesahkan...',
    verifyOtp: 'Sahkan OTP',
    verified: 'Disahkan',
    sendMessageBtn: 'Hantar Mesej',
    sendingMessage: 'Sedang dihantar...',
    placementTitle: 'Ujian Penempatan Bahasa Inggeris Percuma',
    placementDesc: 'Lengkapkan 50 soalan tatabahasa dan kosa kata untuk mengetahui tahap CEFR anda (A1-C2) serta cadangan kursus yang sesuai.',
    startPlacementTest: '3 Bulan atau Kurang',
    exploreCourses: 'Lebih Daripada 3 Bulan',
    placementButtonDesc: 'Sesuai untuk program jangka pendek yang tidak memerlukan visa pelajar.',
    coursesButtonDesc: 'Sesuai untuk tempoh belajar melebihi 3 bulan dan memerlukan pemprosesan visa.',
    detailsFormTitle: 'Borang Maklumat Pendaftaran',
    detailsFormSubtitle: 'Isi maklumat anda dan pasukan kami akan menghubungi anda berdasarkan pilihan yang dipilih.',
    selectedPlanLabel: 'Pilihan Dipilih',
    closeModal: 'Tutup',
    submitDetailsBtn: 'Hantar Maklumat',
    detailsSentSuccess: 'Maklumat anda berjaya dihantar. Pasukan kami akan menghubungi anda tidak lama lagi.',
    visaGuideTitle: 'Mulakan Pengajian Anda di Malaysia bersama Wordsworth',
    visaGuideSubtitle: 'Klik butang di bawah untuk mendapatkan panduan bagaimana memulakan pengajian anda di Wordsworth Language Centre di Malaysia.',
    scholarshipTitle: 'Biasiswa Bahasa Inggeris di Malaysia',
    scholarshipDesc: 'Lihat risalah biasiswa rasmi daripada Wordsworth Language Centre untuk syarat kelayakan dan manfaat penuh.',
    viewFlyer: 'Lihat Risalah',
    downloadFlyer: 'Muat Turun PDF',
    guideBadge: 'Panduan Video Ujian Penempatan',
    guideTitle: 'Tonton Tutorial Sebelum Anda Mula',
    guideIntro: 'Bahagian ini mengandungi video rakaman yang menerangkan cara menggunakan sistem ujian penempatan dari awal hingga akhir.',
    guideIntro2: 'Dalam beberapa minit, anda akan belajar cara mendaftar, menjawab soalan dengan betul, menghantar ujian, dan memahami keputusan akhir dengan yakin.',
    walkthroughTitle: 'Panduan Sistem Langkah Demi Langkah',
    walkthroughDesc: 'Arahan jelas untuk setiap langkah ujian penempatan',
    answerTitle: 'Cara Menjawab Dengan Betul',
    answerDesc: 'Amalan terbaik untuk mengelakkan kesilapan dan menyiapkan ujian dengan lancar',
    resultTitle: 'Keputusan dan Langkah Seterusnya',
    resultDesc: 'Ketahui cara tahap anda dikira dan kursus yang sesuai untuk anda',
    nameRequired: 'Nama diperlukan',
    emailRequired: 'Emel diperlukan',
    emailInvalid: 'Sila masukkan emel yang sah',
    phoneRequired: 'Nombor telefon diperlukan',
    subjectRequired: 'Subjek diperlukan',
    verifyOtpBeforeSubmit: 'Sila sahkan OTP sebelum menghantar mesej anda.',
    failedSendMessage: 'Gagal menghantar mesej',
    sentSuccessApi: 'Mesej berjaya dihantar. Kami akan menghubungi anda tidak lama lagi.',
    genericError: 'Ralat berlaku. Sila cuba lagi.',
    emailPhoneFirst: 'Sila masukkan emel dan nombor telefon terlebih dahulu.',
    failedSendOtp: 'Gagal menghantar OTP.',
    otpSentStatus: 'OTP telah dihantar ke emel anda. Masukkan kod 6 digit di bawah.',
    enterOtpCode: 'Sila masukkan kod OTP.',
    failedVerifyOtp: 'Gagal mengesahkan OTP.',
    otpVerifiedStatus: 'OTP berjaya disahkan.',
  };

  const ui = isMalay ? { ...baseUi, ...msUiOverrides } : baseUi;

  const subjectOptions = [
    { value: 'Summer Camp', label: isArabic ? 'المعسكر الصيفي' : 'Summer Camp' },
    { value: 'Scholarship', label: isArabic ? 'المنح الدراسية' : 'Scholarship' },
    { value: 'Offers', label: isArabic ? 'العروض' : 'Offers' },
    { value: 'Courses', label: isArabic ? 'الدورات' : 'Courses' },
    { value: 'Fees', label: isArabic ? 'الرسوم' : 'Fees' },
    { value: 'Others', label: isArabic ? 'أخرى' : 'Others' },
  ];
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);

  const courses = [
    {
      id: 'beginner-english',
      title: 'Beginner English',
      description: 'Perfect for those starting their English learning journey',
      duration: '12 weeks',
      level: 'A1-A2',
      color: 'bg-blue-50'
    },
    {
      id: 'intermediate-english',
      title: 'Intermediate English',
      description: 'Build confidence and fluency in everyday conversations',
      duration: '16 weeks',
      level: 'B1-B2',
      color: 'bg-green-50'
    },
    {
      id: 'ielts-preparation',
      title: 'IELTS Preparation',
      description: 'Achieve your target IELTS score with expert guidance',
      duration: '10 weeks',
      level: 'B2+',
      color: 'bg-orange-50'
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Tan',
      course: 'IELTS Preparation',
      rating: 5,
      text: 'I scored 7.5 on my IELTS exam! The teachers at Wordsworth are incredibly supportive and the curriculum is well-structured.',
      image: '👩‍🎓'
    },
    {
      name: 'Ahmad Rahman',
      course: 'Business English',
      rating: 5,
      text: 'My professional communication skills improved dramatically. I got promoted within 3 months of completing the course!',
      image: '👨‍💼'
    },
    {
      name: 'Li Wei',
      course: 'Intermediate English',
      rating: 5,
      text: 'The interactive lessons and personalized feedback helped me gain confidence in speaking English naturally.',
      image: '👨‍🎓'
    },
  ];

  const events = [
    {
      id: 1,
      title: 'IELTS Workshop 2026',
      description: 'Intensive workshop with mock tests',
      image: '📝',
      category: 'Workshop'
    },
    {
      id: 2,
      title: 'Cultural Exchange Day',
      description: 'Students from 15+ countries',
      image: '🌍',
      category: 'Event'
    },
    {
      id: 3,
      title: 'English Speaking Club',
      description: 'Weekly conversation practice',
      image: '🗣️',
      category: 'Activity'
    },
    {
      id: 4,
      title: 'Graduation Ceremony 2025',
      description: '150+ students celebrated',
      image: '🎓',
      category: 'Event'
    },
    {
      id: 5,
      title: 'Business English Seminar',
      description: 'Professional development session',
      image: '💼',
      category: 'Seminar'
    },
    {
      id: 6,
      title: 'Student Achievement Awards',
      description: 'Recognizing top performers',
      image: '🏆',
      category: 'Event'
    },
  ];

  const socialPosts = [
    {
      id: 1,
      platform: 'Instagram',
      thumbnail: '🎬',
      title: 'Student Success Story',
      link: 'https://www.instagram.com/wordsworth.edu/'
    },
    {
      id: 2,
      platform: 'Instagram',
      thumbnail: '📚',
      title: 'IELTS Tips & Tricks',
      link: 'https://www.instagram.com/wordsworth.edu/'
    },
    {
      id: 3,
      platform: 'Instagram',
      thumbnail: '🌟',
      title: 'Classroom Highlights',
      link: 'https://www.instagram.com/wordsworth.edu/'
    },
    {
      id: 4,
      platform: 'Instagram',
      thumbnail: '🎓',
      title: 'Graduation Day 2025',
      link: 'https://www.instagram.com/wordsworth.edu/'
    },
  ];

  const [contactForm, setContactForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: 'Summer Camp',
    message: '',
  });
  const [isSendingContact, setIsSendingContact] = useState(false);
  const [contactStatus, setContactStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactErrors, setContactErrors] = useState<Record<string, string>>({});
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpStatus, setOtpStatus] = useState('');
  const [isRequestingOtp, setIsRequestingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [visaModalOpen, setVisaModalOpen] = useState(false);
  const [visaForm, setVisaForm] = useState({
    email: '',
    subject: '',
  });
  const [visaSubmitting, setVisaSubmitting] = useState(false);
  const [visaStatus, setVisaStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const teachers = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      title: 'Senior IELTS Instructor',
      photo: '/assets/images/teachers/sarah-johnson.jpg',
      specialization: 'IELTS & Academic English',
      experience: '12+ Years',
      qualifications: [
        'PhD in Applied Linguistics',
        'Cambridge CELTA Certified',
        'IELTS Examiner Training',
        'Published researcher in language acquisition'
      ],
      teachingStyle: 'Interactive and student-centered. Dr. Johnson focuses on practical application and real-world communication skills. She uses multimedia resources and personalized feedback to ensure each student reaches their potential.',
      availability: 'Mon-Fri: 2PM-8PM, Sat: 10AM-4PM',
      languages: ['English', 'Mandarin', 'Bahasa Malaysia'],
      bio: 'With over a decade of experience in English language instruction, Dr. Johnson has helped thousands of students achieve their IELTS goals. Her research-based teaching methods and compassionate approach make her one of the most sought-after instructors at Wordsworth.'
    },
    {
      id: 2,
      name: 'Mr. Ahmad Rashid',
      title: 'Business English Specialist',
      photo: '/assets/images/teachers/ahmad-rashid.jpg',
      specialization: 'Business & Professional English',
      experience: '10+ Years',
      qualifications: [
        'MA in TESOL from University of London',
        'Cambridge Delta Certified',
        'Corporate Training Expert',
        'Former Business Consultant'
      ],
      teachingStyle: 'Practical and results-oriented. Mr. Ahmad brings real-world business experience into the classroom, focusing on workplace communication, presentation skills, and professional networking.',
      availability: 'Mon-Wed: 6PM-9PM, Sat-Sun: 9AM-5PM',
      languages: ['English', 'Arabic', 'Bahasa Malaysia'],
      bio: 'After 5 years in corporate consulting, Mr. Ahmad transitioned to education to help professionals advance their careers through improved English communication. He specializes in preparing students for international business environments.'
    },
    {
      id: 3,
      name: 'Ms. Li Wei',
      title: 'Conversation & Fluency Coach',
      photo: '/assets/images/teachers/li-wei.jpg',
      specialization: 'Speaking & Pronunciation',
      experience: '8+ Years',
      qualifications: [
        'MA in English Language Teaching',
        'Trinity CertTESOL',
        'Accent Reduction Specialist',
        'Voice & Speech Coach'
      ],
      teachingStyle: 'Encouraging and dynamic. Ms. Li creates a supportive environment where students feel confident to practice speaking. She uses role-playing, debates, and authentic materials to build fluency.',
      availability: 'Tue-Thu: 3PM-9PM, Sat: 10AM-6PM',
      languages: ['English', 'Mandarin', 'Cantonese'],
      bio: 'Ms. Li is passionate about helping students overcome their fear of speaking English. Her specialized training in pronunciation and accent reduction has helped countless students communicate more clearly and confidently.'
    },
    {
      id: 4,
      name: 'Mr. David Thompson',
      title: 'Grammar & Writing Expert',
      photo: '/assets/images/teachers/david-thompson.jpg',
      specialization: 'Academic Writing & Grammar',
      experience: '15+ Years',
      qualifications: [
        'MA in English Literature',
        'Cambridge CELTA & DELTA',
        'Academic Writing Instructor',
        'Published Author'
      ],
      teachingStyle: 'Systematic and detailed. Mr. Thompson breaks down complex grammar rules into understandable concepts. He provides extensive written feedback and personalized writing improvement plans.',
      availability: 'Mon-Fri: 9AM-3PM',
      languages: ['English'],
      bio: 'A veteran educator with a passion for the written word, Mr. Thompson has authored several English language textbooks and helps students master grammar and writing for academic and professional success.'
    },
  ];

  const scheduleData = [
    { day: 'Monday', time: '9:00 AM - 11:00 AM', course: 'Beginner English', teacher: 'Mr. Thompson', seats: 3 },
    { day: 'Monday', time: '2:00 PM - 4:00 PM', course: 'IELTS Preparation', teacher: 'Dr. Johnson', seats: 5 },
    { day: 'Tuesday', time: '6:00 PM - 8:00 PM', course: 'Business English', teacher: 'Mr. Ahmad', seats: 2 },
    { day: 'Wednesday', time: '10:00 AM - 12:00 PM', course: 'Intermediate English', teacher: 'Ms. Li Wei', seats: 4 },
    { day: 'Thursday', time: '3:00 PM - 5:00 PM', course: 'Conversation Club', teacher: 'Ms. Li Wei', seats: 8 },
    { day: 'Saturday', time: '10:00 AM - 1:00 PM', course: 'IELTS Intensive', teacher: 'Dr. Johnson', seats: 1 },
  ];

  const validateContactForm = () => {
    const newErrors: Record<string, string> = {};

    if (!contactForm.fullName.trim()) {
      newErrors.fullName = ui.nameRequired;
    }

    if (!contactForm.email.trim()) {
      newErrors.email = ui.emailRequired;
    } else if (!/\S+@\S+\.\S+/.test(contactForm.email)) {
      newErrors.email = ui.emailInvalid;
    }

    if (!contactForm.phone.trim()) {
      newErrors.phone = ui.phoneRequired;
    }

    if (!contactForm.subject.trim()) {
      newErrors.subject = ui.subjectRequired;
    }

    setContactErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContactSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateContactForm()) {
      return;
    }
    setIsSendingContact(true);
    setContactStatus(null);
    if (!otpVerified) {
      setContactStatus({ type: 'error', message: ui.verifyOtpBeforeSubmit });
      setIsSendingContact(false);
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactForm),
      });

      const contentType = response.headers.get('content-type') || '';
      let result: any = null;
      if (contentType.includes('application/json')) {
        result = await response.json();
      } else {
        const text = await response.text();
        result = { error: text || ui.failedSendMessage };
      }

      if (!response.ok) {
        throw new Error(result?.error || ui.failedSendMessage);
      }

      setContactStatus({ type: 'success', message: ui.sentSuccessApi });
      setContactForm({
        fullName: '',
        email: '',
        phone: '',
        subject: 'Summer Camp',
        message: '',
      });
      setContactErrors({});
      setOtpCode('');
      setOtpSent(false);
      setOtpVerified(false);
      setOtpStatus('');
      setContactSubmitted(true);
      setTimeout(() => setContactSubmitted(false), 3000);
    } catch (error) {
      setContactStatus({
        type: 'error',
        message: error instanceof Error ? error.message : ui.genericError,
      });
    } finally {
      setIsSendingContact(false);
    }
  };

  const requestOtp = async () => {
    if (!contactForm.email || !contactForm.phone) {
      setContactStatus({ type: 'error', message: ui.emailPhoneFirst });
      return;
    }
    setContactStatus(null);
    setOtpStatus('');
    setIsRequestingOtp(true);
    try {
      const response = await fetch('/api/contact-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'request',
          email: contactForm.email,
          phone: contactForm.phone,
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result?.error || ui.failedSendOtp);
      setOtpSent(true);
      setOtpVerified(false);
      setOtpStatus(ui.otpSentStatus);
    } catch (error) {
      setOtpStatus(error instanceof Error ? error.message : ui.failedSendOtp);
    } finally {
      setIsRequestingOtp(false);
    }
  };

  const verifyOtp = async () => {
    if (!otpCode.trim()) {
      setOtpStatus(ui.enterOtpCode);
      return;
    }
    setIsVerifyingOtp(true);
    try {
      const response = await fetch('/api/contact-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'verify',
          email: contactForm.email,
          phone: contactForm.phone,
          otp: otpCode.trim(),
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result?.error || ui.failedVerifyOtp);
      setOtpVerified(true);
      setOtpStatus(ui.otpVerifiedStatus);
    } catch (error) {
      setOtpVerified(false);
      setOtpStatus(error instanceof Error ? error.message : ui.failedVerifyOtp);
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;

    const tryPlay = () => {
      video.play().catch(() => {
        // Some browsers block unmuted autoplay until first user interaction.
      });
    };

    tryPlay();
    window.addEventListener('pointerdown', tryPlay, { once: true });

    return () => window.removeEventListener('pointerdown', tryPlay);
  }, []);

  const openVisaDetailsForm = (subject: string) => {
    setVisaForm((prev) => ({ ...prev, subject }));
    setVisaStatus(null);
    setVisaModalOpen(true);
  };

  const closeVisaDetailsForm = () => {
    setVisaModalOpen(false);
    setVisaStatus(null);
  };

  const handleVisaDetailsSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!visaForm.email.trim() || !visaForm.subject.trim()) {
      setVisaStatus({ type: 'error', message: ui.emailRequired });
      return;
    }
    if (!/\S+@\S+\.\S+/.test(visaForm.email)) {
      setVisaStatus({ type: 'error', message: ui.emailInvalid });
      return;
    }

    setVisaSubmitting(true);
    setVisaStatus(null);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...visaForm,
          courseInterest: visaForm.subject,
          source: 'Home Visa Guide Popup',
        }),
      });
      const contentType = response.headers.get('content-type') || '';
      let result: any = null;
      if (contentType.includes('application/json')) {
        result = await response.json();
      } else {
        const text = await response.text();
        result = { error: text || ui.failedSendMessage };
      }
      if (!response.ok) throw new Error(result?.error || ui.failedSendMessage);
      setVisaStatus({ type: 'success', message: ui.detailsSentSuccess });
      const brochureUrl = '/assets/brochures/fee-structure-redesigned-2026.pdf';
      const downloadLink = document.createElement('a');
      downloadLink.href = brochureUrl;
      downloadLink.download = 'wordsworth-study-guide.pdf';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      setVisaForm({ email: '', subject: visaForm.subject });
    } catch (error) {
      setVisaStatus({ type: 'error', message: error instanceof Error ? error.message : ui.genericError });
    } finally {
      setVisaSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50" dir={isRTL ? 'rtl' : 'ltr'}>
      <section className="relative w-full overflow-hidden rounded-none">
        <video
          ref={heroVideoRef}
          className="block w-full h-auto object-contain"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="/assets/videos/hero-banner-final.mp4" type="video/mp4" />
          {ui.browserNoVideo}
        </video>
      </section>
      
      <section className="bg-gradient-to-br from-brand-blue bg-brand-orange text-white py-8 md:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center justify-center gap-4">
              <div className="bg-brand-orange rounded-full p-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-3xl font-bold">5,000+</p>
                <p className="text-blue-100">{t('stats.students')}</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4">
              <div className="bg-brand-green rounded-full p-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-3xl font-bold">95%</p>
                <p className="text-blue-100">{t('stats.successRate')}</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4">
              <div className="bg-brand-blue-light rounded-full p-4">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-3xl font-bold">30+</p>
                <p className="text-blue-100">{t('stats.countries')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white py-8 md:py-10 border-b border-blue-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <h2 className="text-gray-900 mb-2">{ui.visaGuideTitle}</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">{ui.visaGuideSubtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div
              role="button"
              tabIndex={0}
              onClick={() => openVisaDetailsForm(ui.startPlacementTest)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') openVisaDetailsForm(ui.startPlacementTest);
              }}
              className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-white p-6 shadow-[0_16px_40px_rgba(6,17,90,0.08)] text-center flex flex-col items-center justify-center cursor-pointer transition-transform hover:-translate-y-0.5"
            >
              <Button
                variant="primary"
                size="lg"
                className="w-full sm:w-auto pointer-events-none relative overflow-hidden border border-blue-300 bg-gradient-to-b from-blue-300 via-blue-500 to-blue-700 text-white shadow-[0_10px_0_0_rgba(30,64,175,0.95),0_24px_30px_rgba(37,99,235,0.38),inset_0_1px_0_rgba(255,255,255,0.75)]"
              >
                <span className="inline-flex items-center gap-2">
                  {ui.startPlacementTest}
                  <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                </span>
              </Button>
              <p className="mt-4 text-sm sm:text-base text-gray-600 leading-7">
                {ui.placementButtonDesc}
              </p>
            </div>
            <div
              role="button"
              tabIndex={0}
              onClick={() => openVisaDetailsForm(ui.exploreCourses)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') openVisaDetailsForm(ui.exploreCourses);
              }}
              className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/70 to-white p-6 shadow-[0_16px_40px_rgba(30,64,175,0.10)] text-center flex flex-col items-center justify-center cursor-pointer transition-transform hover:-translate-y-0.5"
            >
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto pointer-events-none relative overflow-hidden border border-blue-200 bg-gradient-to-b from-white via-blue-100 to-blue-200 text-brand-blue shadow-[0_10px_0_0_rgba(59,130,246,0.85),0_24px_30px_rgba(96,165,250,0.24),inset_0_1px_0_rgba(255,255,255,0.98)]"
              >
                <span className="inline-flex items-center gap-2">
                  {ui.exploreCourses}
                  <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                </span>
              </Button>
              <p className="mt-4 text-sm sm:text-base text-gray-600 leading-7">
                {ui.coursesButtonDesc}
              </p>
            </div>
          </div>
        </div>
      </section>
      {visaModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/55">
          <div className="w-full max-w-xl rounded-2xl border border-blue-100 bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-200 p-5">
              <div>
                <h3 className="text-gray-900">{ui.detailsFormTitle}</h3>
                <p className="text-sm text-gray-600 mt-1">{ui.detailsFormSubtitle}</p>
              </div>
              <button
                type="button"
                onClick={closeVisaDetailsForm}
                className="h-10 w-10 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 flex items-center justify-center"
                aria-label={ui.closeModal}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form className="p-5 space-y-4" onSubmit={handleVisaDetailsSubmit}>
              <div className="rounded-lg bg-blue-50 border border-blue-100 px-4 py-3 text-sm text-brand-blue">
                <span className="font-semibold">{ui.selectedPlanLabel}:</span> {visaForm.subject}
              </div>
              <Input
                label={ui.emailLabel}
                type="email"
                placeholder="your@email.com"
                value={visaForm.email}
                onChange={(e) => setVisaForm((prev) => ({ ...prev, email: e.target.value }))}
                required
              />
              {visaStatus?.type === 'error' && (
                <p className="text-sm text-red-600">
                  {visaStatus.message}
                </p>
              )}
              <div className="flex items-center justify-end gap-3 pt-1">
                <Button type="button" variant="outline" onClick={closeVisaDetailsForm}>
                  {ui.closeModal}
                </Button>
                <Button type="submit" variant="primary" disabled={visaSubmitting}>
                  {visaSubmitting ? ui.sendingMessage : ui.submitDetailsBtn}
                  <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
      <section id="contact-form" className="py-16 md:py-20 bg-gradient-to-b from-gray-50 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-7 sm:p-10 md:p-12 rounded-2xl border border-blue-100/80 bg-white/95 backdrop-blur-sm shadow-[0_14px_30px_rgba(245,162,31,0.18),0_26px_60px_rgba(245,162,31,0.16),0_0_45px_rgba(245,162,31,0.22)]">
            <div className="mb-8 text-center">
              <h2 className="mb-3 text-4xl sm:text-5xl leading-tight font-extrabold text-gray-900 [text-shadow:0_4px_0_rgba(4,15,79,0.12),0_0_16px_rgba(245,162,31,0.35)]">
                {ui.sendMessageTitle}
              </h2>
              <p className="text-gray-700 text-base sm:text-lg">{ui.sendMessageSubtitle}</p>
            </div>
            {contactSubmitted ? (
              <div className="text-center py-6">
                <div className="bg-green-100 text-green-800 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-3">
                  <Send className="w-7 h-7" />
                </div>
                <h3 className="mb-1 text-green-800">{ui.messageSent}</h3>
                <p className="text-gray-600">{ui.messageSentSubtitle}</p>
              </div>
            ) : (
            <form className="space-y-6" onSubmit={handleContactSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Input
                  label={ui.nameLabel}
                  placeholder={ui.namePlaceholder}
                  value={contactForm.fullName}
                  onChange={(e) => {
                    setContactForm((prev) => ({ ...prev, fullName: e.target.value }));
                    if (contactErrors.fullName) {
                      setContactErrors((prev) => ({ ...prev, fullName: '' }));
                    }
                  }}
                  error={contactErrors.fullName}
                  required
                />
                <Input
                  label={ui.emailLabel}
                  type="email"
                  placeholder="your@email.com"
                  value={contactForm.email}
                  onChange={(e) => {
                    setContactForm((prev) => ({ ...prev, email: e.target.value }));
                    setOtpSent(false);
                    setOtpVerified(false);
                    setOtpCode('');
                    setOtpStatus('');
                    if (contactErrors.email) {
                      setContactErrors((prev) => ({ ...prev, email: '' }));
                    }
                  }}
                  error={contactErrors.email}
                  required
                />
              </div>
              <Input
                label={ui.phoneLabel}
                type="tel"
                placeholder="+60 12-345 6789"
                value={contactForm.phone}
                onChange={(e) => {
                  setContactForm((prev) => ({ ...prev, phone: e.target.value }));
                  setOtpSent(false);
                  setOtpVerified(false);
                  setOtpCode('');
                  setOtpStatus('');
                  if (contactErrors.phone) {
                    setContactErrors((prev) => ({ ...prev, phone: '' }));
                  }
                }}
                error={contactErrors.phone}
                required
              />
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-3 sm:p-4">
                <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                  <p className="text-sm text-gray-700">
                    {ui.otpNotice}
                  </p>
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    className="sm:w-auto"
                    onClick={requestOtp}
                    disabled={isRequestingOtp}
                  >
                    {isRequestingOtp ? ui.sendingOtp : ui.sendOtp}
                  </Button>
                </div>
                {otpSent && (
                  <div className="mt-3 flex flex-col sm:flex-row gap-3 sm:items-center">
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                      placeholder={ui.otpInputPlaceholder}
                      className="w-full sm:max-w-xs px-4 py-2.5 rounded-lg border-2 border-gray-300 bg-white text-gray-900 focus:outline-none focus:border-brand-blue transition-colors"
                    />
                    <Button
                      type="button"
                      variant="primary"
                      size="sm"
                      onClick={verifyOtp}
                      disabled={isVerifyingOtp}
                    >
                      {isVerifyingOtp ? ui.verifyingOtp : ui.verifyOtp}
                    </Button>
                    {otpVerified && <span className="text-sm text-green-700">{ui.verified}</span>}
                  </div>
                )}
                {otpStatus && (
                  <p className={`mt-2 text-sm ${otpVerified ? 'text-green-700' : 'text-gray-700'}`}>{otpStatus}</p>
                )}
              </div>
              <div>
                <label htmlFor="home-subject" className="block mb-2 text-gray-700">{ui.subjectLabel}</label>
                <div className="relative">
                  <select
                    id="home-subject"
                    value={contactForm.subject}
                    onChange={(e) => {
                      setContactForm((prev) => ({ ...prev, subject: e.target.value }));
                      if (contactErrors.subject) {
                        setContactErrors((prev) => ({ ...prev, subject: '' }));
                      }
                    }}
                    className={`w-full appearance-none px-4 py-3 ${isRTL ? 'pl-12' : 'pr-12'} rounded-lg border-2 bg-white text-gray-900 shadow-sm focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-colors ${
                      contactErrors.subject ? 'border-red-500' : 'border-gray-300'
                    }`}
                    required
                  >
                    {subjectOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className={`pointer-events-none absolute ${isRTL ? 'left-4' : 'right-4'} top-1/2 h-4 w-4 -translate-y-1/2 text-gray-600`} />
                </div>
                {contactErrors.subject && <p className="mt-1 text-sm text-red-600">{contactErrors.subject}</p>}
              </div>
              <Textarea
                className="min-h-36 border-2 border-gray-300 bg-white text-gray-900 shadow-sm placeholder:text-gray-500 focus-visible:border-brand-blue focus-visible:ring-2 focus-visible:ring-brand-blue/20"
                placeholder={ui.messagePlaceholder}
                aria-label={ui.messageAriaLabel}
                value={contactForm.message}
                onChange={(e) => setContactForm((prev) => ({ ...prev, message: e.target.value }))}
              />
              {contactStatus && (
                <p className={contactStatus.type === 'success' ? 'text-sm text-green-700' : 'text-sm text-red-600'}>
                  {contactStatus.message}
                </p>
              )}
              <div>
                <Button type="submit" variant="primary" className="w-full shadow-[0_10px_24px_rgba(245,162,31,0.38)]" disabled={isSendingContact}>
                  {isSendingContact ? ui.sendingMessage : ui.sendMessageBtn}
                  <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                </Button>
              </div>
            </form>
            )}
          </Card>
        </div>
      </section>
      <section className="pt-0 pb-16 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-brand-orange rounded-2xl p-6 sm:p-8 md:p-12 text-white text-center">
            <BookOpen className="w-16 h-16 mx-auto mb-4" />
            <h2 className="mb-4 text-white text-xl sm:text-2xl md:text-3xl">{ui.placementTitle}</h2>
            <p className="text-base sm:text-lg md:text-xl mb-6 text-orange-100 max-w-2xl mx-auto">
              {ui.placementDesc}
            </p>
            <Link to="/placement-test">
              <Button variant="secondary" size="lg">
                {ui.startPlacementTest}
                <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-100 via-[#eceff4] to-[#f7f7f8] py-14 md:py-20">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/5 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center max-w-3xl mx-auto">
            <p className="inline-block rounded-full bg-brand-blue/10 px-3 py-1 text-xs tracking-[0.14em] text-brand-blue uppercase mb-3">
              Scholarship Flyers
            </p>
            <h2 className="mb-3">Explore Our Scholarship Opportunities</h2>
            <p className="text-gray-600 text-base sm:text-lg">
              Browse the English and Mandarin scholarship flyers to compare current offers, eligibility details, and key benefits before applying.
            </p>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 justify-items-center">
            <div className="relative flex justify-center [perspective:2200px]">
              <div className="group relative">
                <a href="/assets/brochures/english-scholarship-flyers.pdf" download="English Scholarship Flyers.pdf" className="block relative">
                  <div className="absolute right-[-10%] top-[6%] h-[86%] w-[30%] rounded-r-xl border border-gray-200 bg-white shadow-[24px_26px_42px_rgba(0,0,0,0.23)] z-0">
                    <div className="h-full w-full rounded-r-xl bg-[linear-gradient(180deg,#ffffff_0%,#f6f7f9_100%)] p-2">
                      <div className="h-full rounded-lg overflow-hidden bg-gradient-to-b from-[#f7f8fb] to-[#e8ebf2] border border-gray-100">
                        <div className="h-full w-full flex items-center justify-center">
                          <span className="text-[11px] sm:text-xs tracking-[0.12em] text-gray-500 uppercase">Flyer Back Preview</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute right-[-10.2%] top-[6%] h-[86%] w-[1.2%] bg-gradient-to-r from-gray-300 to-gray-100 rounded-full z-10" />
                  <div className="absolute inset-y-[6.5%] right-[-10.5%] w-[10.5%] rounded-r-xl border-l border-slate-300/80 bg-gradient-to-r from-slate-300 via-slate-200 to-slate-50 shadow-[16px_18px_28px_rgba(0,0,0,0.26)] z-10" />
                  <div className="absolute left-[25%] top-[1.2%] h-[7%] w-[45%] rounded-t-xl border-b border-slate-300/85 bg-gradient-to-b from-slate-50 via-slate-200 to-slate-300 shadow-[0_10px_18px_rgba(0,0,0,0.2)]" />
                  <div className="relative z-20 w-[360px] max-w-[76vw] aspect-[401/833] rounded-xl bg-white border border-orange-300/70 shadow-[0_36px_54px_rgba(0,0,0,0.26),0_0_0_1px_rgba(245,162,31,0.45),0_0_24px_rgba(245,162,31,0.38)] transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-[-0.2deg] [transform-style:preserve-3d] [transform:rotateY(-8deg)_rotateX(1.2deg)] overflow-hidden">
                    <img src="/assets/images/scholarship-cover.png" alt="English Scholarship Cover" className="h-full w-full object-cover object-center" />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-black/8" />
                  </div>
                  <div className="mx-auto mt-3 h-4 w-[72%] rounded-full bg-black/25 blur-lg" />
                </a>
                <div className="mt-3 text-center">
                  <a href="/assets/brochures/english-scholarship-flyers.pdf" download="English Scholarship Flyers.pdf" className="inline-flex items-center gap-2 rounded-lg bg-brand-orange px-5 py-2.5 text-white shadow-lg hover:bg-brand-blue-dark transition-colors">
                    Download English PDF
                  </a>
                </div>
              </div>
            </div>

            <div className="relative flex justify-center [perspective:2200px]">
              <div className="group relative">
                <a href="/assets/brochures/mandarin-scholarship-flyers.pdf" download="Mandarin Scholarship Flyers.pdf" className="block relative">
                  <div className="absolute right-[-10%] top-[6%] h-[86%] w-[30%] rounded-r-xl border border-gray-200 bg-white shadow-[24px_26px_42px_rgba(0,0,0,0.23)] z-0">
                    <div className="h-full w-full rounded-r-xl bg-[linear-gradient(180deg,#ffffff_0%,#f6f7f9_100%)] p-2">
                      <div className="h-full rounded-lg overflow-hidden bg-gradient-to-b from-[#f7f8fb] to-[#e8ebf2] border border-gray-100">
                        <div className="h-full w-full flex items-center justify-center">
                          <span className="text-[11px] sm:text-xs tracking-[0.12em] text-gray-500 uppercase">Flyer Back Preview</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute right-[-10.2%] top-[6%] h-[86%] w-[1.2%] bg-gradient-to-r from-gray-300 to-gray-100 rounded-full z-10" />
                  <div className="absolute inset-y-[6.5%] right-[-10.5%] w-[10.5%] rounded-r-xl border-l border-slate-300/80 bg-gradient-to-r from-slate-300 via-slate-200 to-slate-50 shadow-[16px_18px_28px_rgba(0,0,0,0.26)] z-10" />
                  <div className="absolute left-[25%] top-[1.2%] h-[7%] w-[45%] rounded-t-xl border-b border-slate-300/85 bg-gradient-to-b from-slate-50 via-slate-200 to-slate-300 shadow-[0_10px_18px_rgba(0,0,0,0.2)]" />
                  <div className="relative z-20 w-[360px] max-w-[76vw] aspect-[401/833] rounded-xl bg-white border border-orange-300/70 shadow-[0_36px_54px_rgba(0,0,0,0.26),0_0_0_1px_rgba(245,162,31,0.45),0_0_24px_rgba(245,162,31,0.38)] transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-[-0.2deg] [transform-style:preserve-3d] [transform:rotateY(-8deg)_rotateX(1.2deg)] overflow-hidden">
                    <img src="/assets/images/mandarin-cover.png" alt="Mandarin Scholarship Cover" className="h-full w-full object-cover object-center" />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-black/8" />
                  </div>
                  <div className="mx-auto mt-3 h-4 w-[72%] rounded-full bg-black/25 blur-lg" />
                </a>
                <div className="mt-3 text-center">
                  <a href="/assets/brochures/mandarin-scholarship-flyers.pdf" download="Mandarin Scholarship Flyers.pdf" className="inline-flex items-center gap-2 rounded-lg bg-brand-orange px-5 py-2.5 text-white shadow-lg hover:bg-brand-blue-dark transition-colors">
                    Download Mandarin PDF
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white pt-8 pb-16 md:pt-10 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <div className="inline-flex items-center justify-center px-5 py-2.5 bg-brand-orange/10 rounded-full text-brand-orange text-sm leading-none mb-4">
                {ui.guideBadge}
              </div>
              <h2 className="mb-6">{ui.guideTitle}</h2>
              <p className="text-gray-700 mb-4 text-lg">
                {ui.guideIntro}
              </p>
              <p className="text-gray-600 mb-6">
                {ui.guideIntro2}
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-brand-blue/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-6 h-6 text-brand-blue" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{ui.walkthroughTitle}</h4>
                    <p className="text-sm text-gray-600">{ui.walkthroughDesc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-brand-green/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-brand-green" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{ui.answerTitle}</h4>
                    <p className="text-sm text-gray-600">{ui.answerDesc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-brand-orange/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-brand-orange" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{ui.resultTitle}</h4>
                    <p className="text-sm text-gray-600">{ui.resultDesc}</p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <Link to="/placement-test">
                  <Button variant="primary" size="lg" className="bg-brand-orange hover:brightness-95">
                    {ui.startPlacementTest}
                    <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative order-first md:order-last">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <video
                  className="w-full h-auto aspect-video object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src="/assets/videos/classroom.mp4" type="video/mp4" />
                  {ui.browserNoVideo}
                </video>
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors cursor-pointer group">
                  <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-brand-blue ml-1" fill="currentColor" />
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-brand-blue/20 rounded-full blur-3xl -z-10"></div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-brand-orange/20 rounded-full blur-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>





  

    </div>
  );
}

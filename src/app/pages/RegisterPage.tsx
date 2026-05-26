import { useState } from 'react';
import { Link } from 'react-router';
import { Eye, EyeOff, Mail, Lock, User, CheckCircle, Play, GraduationCap, Award, Users } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';

export function RegisterPage() {
  const { language, isRTL } = useLanguage();
  const isArabic = language === 'ar';
  const ui = isArabic
    ? {
        fullNameRequired: 'الاسم الكامل مطلوب',
        fullNameMin: 'يجب أن يكون الاسم 3 أحرف على الأقل',
        emailRequired: 'البريد الإلكتروني مطلوب',
        emailInvalid: 'يرجى إدخال بريد إلكتروني صحيح',
        passwordRequired: 'كلمة المرور مطلوبة',
        passwordMin: 'يجب أن تكون كلمة المرور 8 أحرف على الأقل',
        passwordComplex: 'يجب أن تحتوي كلمة المرور على أحرف كبيرة وصغيرة ورقم',
        confirmRequired: 'يرجى تأكيد كلمة المرور',
        confirmMismatch: 'كلمتا المرور غير متطابقتين',
        termsRequired: 'يجب الموافقة على الشروط والأحكام',
        registerSuccess: 'تم إنشاء الحساب بنجاح! (نسخة تجريبية)',
        createAccount: 'إنشاء حساب',
        startJourney: 'ابدأ رحلتك نحو الطلاقة في الإنجليزية اليوم',
        fullName: 'الاسم الكامل',
        email: 'البريد الإلكتروني',
        password: 'كلمة المرور',
        confirmPassword: 'تأكيد كلمة المرور',
        fullNamePlaceholder: 'أدخل اسمك الكامل',
        emailPlaceholder: 'your.email@example.com',
        passwordPlaceholder: 'أنشئ كلمة مرور قوية',
        confirmPasswordPlaceholder: 'أعد إدخال كلمة المرور',
        termsPrefix: 'أوافق على',
        terms: 'الشروط والأحكام',
        and: 'و',
        privacy: 'سياسة الخصوصية',
        createAccountBtn: 'إنشاء الحساب',
        alreadyHave: 'هل لديك حساب بالفعل؟',
        login: 'تسجيل الدخول',
        socialProof: 'انضم إلى أكثر من 5,000 طالب يتعلمون معنا',
        watchStories: 'شاهد قصص نجاح الطلاب',
        helpedThousands: 'اكتشف كيف ساعدنا الآلاف على النجاح',
        expertInstructors: 'مدربون خبراء',
        expertInstructorsDesc: 'تعلّم على يد مدرسين مؤهلين بشهادات دولية',
        provenResults: 'نتائج مثبتة',
        provenResultsDesc: '95% من طلابنا يحققون أهدافهم اللغوية',
        globalCommunity: 'مجتمع عالمي',
        globalCommunityDesc: 'انضم إلى طلاب من أكثر من 30 دولة حول العالم',
        browserNoVideo: 'متصفحك لا يدعم تشغيل الفيديو.',
        quote: '"ووردزورث غيّر مهاراتي في الإنجليزية. انتقلت من مبتدئ إلى متحدث واثق خلال 6 أشهر فقط!"',
        quoteAuthor: '- سارة ت.، طالبة IELTS',
      }
    : {
        fullNameRequired: 'Full name is required',
        fullNameMin: 'Name must be at least 3 characters',
        emailRequired: 'Email is required',
        emailInvalid: 'Please enter a valid email',
        passwordRequired: 'Password is required',
        passwordMin: 'Password must be at least 8 characters',
        passwordComplex: 'Password must contain uppercase, lowercase, and number',
        confirmRequired: 'Please confirm your password',
        confirmMismatch: 'Passwords do not match',
        termsRequired: 'You must agree to the terms and conditions',
        registerSuccess: 'Registration successful! (This is a demo)',
        createAccount: 'Create Account',
        startJourney: 'Start your journey to English fluency today',
        fullName: 'Full Name',
        email: 'Email Address',
        password: 'Password',
        confirmPassword: 'Confirm Password',
        fullNamePlaceholder: 'Enter your full name',
        emailPlaceholder: 'your.email@example.com',
        passwordPlaceholder: 'Create a strong password',
        confirmPasswordPlaceholder: 'Re-enter your password',
        termsPrefix: 'I agree to the',
        terms: 'Terms and Conditions',
        and: 'and',
        privacy: 'Privacy Policy',
        createAccountBtn: 'Create Account',
        alreadyHave: 'Already have an account?',
        login: 'Log in',
        socialProof: 'Join 5,000+ students already learning with us',
        watchStories: 'Watch student success stories',
        helpedThousands: "See how we've helped thousands succeed",
        expertInstructors: 'Expert Instructors',
        expertInstructorsDesc: 'Learn from qualified teachers with international certifications',
        provenResults: 'Proven Results',
        provenResultsDesc: '95% of our students achieve their language goals',
        globalCommunity: 'Global Community',
        globalCommunityDesc: 'Join students from 30+ countries worldwide',
        browserNoVideo: 'Your browser does not support the video tag.',
        quote: '"Wordsworth transformed my English skills. I went from beginner to confident speaker in just 6 months!"',
        quoteAuthor: '- Sarah T., IELTS Student',
      };

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = ui.fullNameRequired;
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = ui.fullNameMin;
    }

    if (!formData.email) {
      newErrors.email = ui.emailRequired;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = ui.emailInvalid;
    }

    if (!formData.password) {
      newErrors.password = ui.passwordRequired;
    } else if (formData.password.length < 8) {
      newErrors.password = ui.passwordMin;
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = ui.passwordComplex;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = ui.confirmRequired;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = ui.confirmMismatch;
    }

    if (!agreedToTerms) {
      newErrors.terms = ui.termsRequired;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      alert(ui.registerSuccess);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: '',
      });
    }
  };

  return (
    <div className="min-h-screen flex" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Left Section - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white px-6 py-12 lg:px-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Header */}
          <div className="mb-10">
            <Link to="/" className="inline-flex items-center gap-2 mb-6 group">
              <GraduationCap className="w-8 h-8 text-brand-blue group-hover:scale-110 transition-transform" />
              <span className="text-xl text-brand-blue">Wordsworth</span>
            </Link>
            <h1 className="text-3xl mb-3">{ui.createAccount}</h1>
            <p className="text-gray-600">
              {ui.startJourney}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm mb-2 text-gray-700">
                {ui.fullName}
              </label>
              <div className="relative">
                <User className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400`} />
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full ${isRTL ? 'pr-12 pl-4' : 'pl-12 pr-4'} py-3.5 rounded-xl border-2 ${
                    errors.fullName ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50'
                  } focus:outline-none focus:border-brand-blue focus:bg-white transition-all`}
                  placeholder={ui.fullNamePlaceholder}
                />
              </div>
              {errors.fullName && (
                <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm mb-2 text-gray-700">
                {ui.email}
              </label>
              <div className="relative">
                <Mail className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400`} />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full ${isRTL ? 'pr-12 pl-4' : 'pl-12 pr-4'} py-3.5 rounded-xl border-2 ${
                    errors.email ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50'
                  } focus:outline-none focus:border-brand-blue focus:bg-white transition-all`}
                  placeholder={ui.emailPlaceholder}
                />
              </div>
              {errors.email && (
                <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm mb-2 text-gray-700">
                {ui.password}
              </label>
              <div className="relative">
                <Lock className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400`} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full ${isRTL ? 'pr-12 pl-12' : 'pl-12 pr-12'} py-3.5 rounded-xl border-2 ${
                    errors.password ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50'
                  } focus:outline-none focus:border-brand-blue focus:bg-white transition-all`}
                  placeholder={ui.passwordPlaceholder}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute ${isRTL ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors`}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm mb-2 text-gray-700">
                {ui.confirmPassword}
              </label>
              <div className="relative">
                <Lock className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400`} />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full ${isRTL ? 'pr-12 pl-12' : 'pl-12 pr-12'} py-3.5 rounded-xl border-2 ${
                    errors.confirmPassword ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50'
                  } focus:outline-none focus:border-brand-blue focus:bg-white transition-all`}
                  placeholder={ui.confirmPasswordPlaceholder}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className={`absolute ${isRTL ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors`}
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Terms Checkbox */}
            <div>
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => {
                      setAgreedToTerms(e.target.checked);
                      if (errors.terms) {
                        setErrors({ ...errors, terms: '' });
                      }
                    }}
                    className="w-5 h-5 rounded border-2 border-gray-300 text-brand-blue focus:ring-2 focus:ring-brand-blue/20 cursor-pointer"
                  />
                </div>
                <span className="text-sm text-gray-600 leading-relaxed">
                  {ui.termsPrefix}{' '}
                  <a href="#" className="text-brand-blue hover:underline">
                    {ui.terms}
                  </a>{' '}
                  {ui.and}{' '}
                  <a href="#" className="text-brand-blue hover:underline">
                    {ui.privacy}
                  </a>
                </span>
              </label>
              {errors.terms && (
                <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                  {errors.terms}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              className="w-full py-4 text-lg bg-brand-blue hover:bg-brand-blue-dark shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
            >
              {ui.createAccountBtn}
            </Button>
          </form>

          {/* Login Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              {ui.alreadyHave}{' '}
              <Link to="/login" className="text-brand-blue hover:underline font-medium">
                {ui.login}
              </Link>
            </p>
          </div>

          {/* Social Proof */}
          <div className="mt-10 pt-8 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center mb-4">
              {ui.socialProof}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Right Section - Media Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-brand-blue via-brand-blue-dark to-indigo-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-blue-light rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="relative z-10 flex flex-col justify-center items-center p-12 text-white w-full">
          {/* Video/Image Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12 w-full max-w-lg"
          >
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
              {!isVideoPlaying ? (
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-700">
                  <img
                    src="/assets/images/register-hero.jpg"
                    alt="Students learning"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-center justify-center">
                    <button
                      onClick={() => setIsVideoPlaying(true)}
                      className="group"
                    >
                      <div className="bg-white/90 backdrop-blur-sm rounded-full p-6 group-hover:bg-white group-hover:scale-110 transition-all shadow-2xl">
                        <Play className="w-10 h-10 text-brand-blue" fill="currentColor" />
                      </div>
                    </button>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
                    <p className="text-white text-lg">{ui.watchStories}</p>
                    <p className="text-sm text-blue-100">{ui.helpedThousands}</p>
                  </div>
                </div>
              ) : (
                <video
                  className="absolute inset-0 w-full h-full object-cover"
                  controls
                  autoPlay
                  playsInline
                >
                  <source src="/assets/videos/intro.mp4" type="video/mp4" />
                  {ui.browserNoVideo}
                </video>
              )}
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6 w-full max-w-lg"
          >
            <div className="flex items-start gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                <CheckCircle className="w-6 h-6 text-brand-orange" />
              </div>
              <div>
                <h3 className="text-lg mb-1">{ui.expertInstructors}</h3>
                <p className="text-blue-100 text-sm">{ui.expertInstructorsDesc}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                <Award className="w-6 h-6 text-brand-orange" />
              </div>
              <div>
                <h3 className="text-lg mb-1">{ui.provenResults}</h3>
                <p className="text-blue-100 text-sm">{ui.provenResultsDesc}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                <Users className="w-6 h-6 text-brand-orange" />
              </div>
              <div>
                <h3 className="text-lg mb-1">{ui.globalCommunity}</h3>
                <p className="text-blue-100 text-sm">{ui.globalCommunityDesc}</p>
              </div>
            </div>
          </motion.div>

          {/* Quote */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 text-center max-w-lg"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <p className="text-lg italic mb-3">
                {ui.quote}
              </p>
              <div className="flex items-center justify-center gap-2">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <CheckCircle key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" />
                  ))}
                </div>
                <span className="text-sm text-blue-100">{ui.quoteAuthor}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

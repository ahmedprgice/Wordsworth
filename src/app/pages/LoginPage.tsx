import { useState } from 'react';
import { Link } from 'react-router';
import { Eye, EyeOff, Mail, Lock, GraduationCap, BookOpen, TrendingUp, Globe } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';

export function LoginPage() {
  const { language, isRTL } = useLanguage();
  const isArabic = language === 'ar';

  const ui = isArabic
    ? {
        emailRequired: 'البريد الإلكتروني مطلوب',
        emailInvalid: 'يرجى إدخال بريد إلكتروني صحيح',
        passwordRequired: 'كلمة المرور مطلوبة',
        passwordMin: 'يجب أن تكون كلمة المرور 6 أحرف على الأقل',
        loginSuccess: 'تم تسجيل الدخول بنجاح! (نسخة تجريبية)',
        welcomeBack: 'مرحبًا بعودتك',
        continueJourney: 'واصل رحلتك في تعلم اللغة الإنجليزية',
        emailLabel: 'البريد الإلكتروني',
        emailPlaceholder: 'your.email@example.com',
        passwordLabel: 'كلمة المرور',
        passwordPlaceholder: 'أدخل كلمة المرور',
        rememberMe: 'تذكرني',
        forgotPassword: 'هل نسيت كلمة المرور؟',
        loginBtn: 'تسجيل الدخول',
        continueWith: 'أو المتابعة عبر',
        noAccount: 'ليس لديك حساب؟',
        signUp: 'إنشاء حساب',
        panelTitle: 'واصل رحلتك التعليمية',
        panelSubtitle: 'ادخل إلى دوراتك، وتابع تقدمك، وحقق أهدافك في اللغة الإنجليزية',
        courses: 'الدورات',
        successRate: 'نسبة النجاح',
        countries: 'الدول',
      }
    : {
        emailRequired: 'Email is required',
        emailInvalid: 'Please enter a valid email',
        passwordRequired: 'Password is required',
        passwordMin: 'Password must be at least 6 characters',
        loginSuccess: 'Login successful! (This is a demo)',
        welcomeBack: 'Welcome Back',
        continueJourney: 'Continue your English learning journey',
        emailLabel: 'Email Address',
        emailPlaceholder: 'your.email@example.com',
        passwordLabel: 'Password',
        passwordPlaceholder: 'Enter your password',
        rememberMe: 'Remember me',
        forgotPassword: 'Forgot password?',
        loginBtn: 'Log In',
        continueWith: 'Or continue with',
        noAccount: "Don't have an account?",
        signUp: 'Sign up',
        panelTitle: 'Continue Your Learning Journey',
        panelSubtitle: 'Access your courses, track your progress, and achieve your English language goals',
        courses: 'Courses',
        successRate: 'Success Rate',
        countries: 'Countries',
      };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [rememberMe, setRememberMe] = useState(false);

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = ui.emailRequired;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = ui.emailInvalid;
    }

    if (!password) {
      newErrors.password = ui.passwordRequired;
    } else if (password.length < 6) {
      newErrors.password = ui.passwordMin;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      alert(ui.loginSuccess);
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
            <h1 className="text-3xl mb-3">{ui.welcomeBack}</h1>
            <p className="text-gray-600">
              {ui.continueJourney}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm mb-2 text-gray-700">
                {ui.emailLabel}
              </label>
              <div className="relative">
                <Mail className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400`} />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                {ui.passwordLabel}
              </label>
              <div className="relative">
                <Lock className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400`} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-5 h-5 rounded border-2 border-gray-300 text-brand-blue focus:ring-2 focus:ring-brand-blue/20 cursor-pointer"
                />
                <span className="text-sm text-gray-700">{ui.rememberMe}</span>
              </label>
              <a href="#" className="text-sm text-brand-blue hover:underline font-medium">
                {ui.forgotPassword}
              </a>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              className="w-full py-4 text-lg bg-brand-blue hover:bg-brand-blue-dark shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
            >
              {ui.loginBtn}
            </Button>
          </form>

          {/* Divider */}
          <div className="mt-8 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">{ui.continueWith}</span>
            </div>
          </div>

          {/* Social Login */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-sm font-medium">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all">
              <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span className="text-sm font-medium">Facebook</span>
            </button>
          </div>

          {/* Register Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              {ui.noAccount}{' '}
              <Link to="/register" className="text-brand-blue hover:underline font-medium">
                {ui.signUp}
              </Link>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Right Section - Hero Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-brand-blue via-brand-blue-dark to-indigo-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-blue-light rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="relative z-10 flex flex-col justify-center items-center p-12 text-white w-full">
          {/* Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl mb-4 text-white">
              {ui.panelTitle}
            </h2>
            <p className="text-xl text-blue-100 max-w-md">
              {ui.panelSubtitle}
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-3 gap-6 w-full max-w-2xl mb-12"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
              <BookOpen className="w-8 h-8 text-brand-orange mx-auto mb-3" />
              <p className="text-3xl mb-1">50+</p>
              <p className="text-sm text-blue-100">{ui.courses}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
              <TrendingUp className="w-8 h-8 text-brand-orange mx-auto mb-3" />
              <p className="text-3xl mb-1">95%</p>
              <p className="text-sm text-blue-100">{ui.successRate}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
              <Globe className="w-8 h-8 text-brand-orange mx-auto mb-3" />
              <p className="text-3xl mb-1">30+</p>
              <p className="text-sm text-blue-100">{ui.countries}</p>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="w-full max-w-lg"
          >
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-700">
                <img
                  src="/assets/images/login-hero.jpg"
                  alt="Online learning"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

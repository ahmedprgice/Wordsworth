import { useState } from 'react';
import { MapPin, Phone, Mail, MessageCircle, Clock, Send } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/card';
import { useLanguage } from '../contexts/LanguageContext';

export function ContactPage() {
  const { language, isRTL } = useLanguage();
  const isArabic = language === 'ar';
  const isChinese = language === 'zh';
  const ui = isArabic
    ? {
        contactTitle: 'اتصل بنا',
        contactSubtitle: 'لديك أسئلة؟ يسعدنا سماعك. أرسل لنا رسالة وسنرد عليك في أقرب وقت.',
        sendTitle: 'أرسل لنا رسالة',
        sendSubtitle: 'أخبرنا بما تحتاجه وسنرد عليك بسرعة.',
        sent: 'تم إرسال الرسالة!',
        sentDesc: 'سنتواصل معك خلال 24 ساعة.',
        name: 'الاسم *',
        email: 'البريد الإلكتروني *',
        phone: 'رقم الهاتف (اختياري)',
        subject: 'الموضوع *',
        message: 'الرسالة *',
        submit: 'إرسال الرسالة',
        visit: 'قم بزيارة مركزنا',
        call: 'اتصل بنا',
        emailUs: 'راسلنا',
        openMaps: 'فتح في خرائط جوجل ←',
        officeHours: 'ساعات العمل',
        quickContact: 'تواصل سريع',
        mapTitle: 'اعثر علينا على الخريطة',
        faq: 'الأسئلة الشائعة',
        namePlaceholder: 'اسمك',
        emailPlaceholder: 'your@email.com',
        phonePlaceholder: '+60 12-345 6789',
        subjectPlaceholder: 'كيف يمكننا مساعدتك؟',
        messagePlaceholder: 'أخبرنا بمزيد من التفاصيل عن استفسارك...',
        availableHours: 'متاح من الإثنين إلى الجمعة، 9 صباحًا - 9 مساءً',
        replyWithin: 'نرد خلال 24 ساعة',
        mondayFriday: 'الإثنين - الجمعة',
        saturdaySunday: 'السبت - الأحد',
        weekdayTime: '9:00 صباحًا - 9:00 مساءً',
        weekendTime: '10:00 صباحًا - 6:00 مساءً',
        quickContactDesc: 'تفضل المراسلة الفورية؟ تواصل معنا عبر واتساب للحصول على رد سريع.',
        whatsappUs: 'راسلنا عبر واتساب',
        callUsNow: 'اتصل بنا الآن',
        directLine: 'الخط المباشر',
        mapEmbedTitle: 'مركز ووردزورث للغات - Megan Avenue 2',
        faq1Q: 'ما أحجام الفصول لديكم؟',
        faq1A: 'نحافظ على أحجام فصول صغيرة بحد أقصى 12-20 طالبًا حسب الدورة، لضمان اهتمام شخصي لكل طالب.',
        faq2Q: 'هل تقدمون فصولًا عبر الإنترنت؟',
        faq2A: 'نعم! نقدم فصولًا حضورية وعبر الإنترنت لتناسب تفضيلات التعلم والجداول المختلفة.',
        faq3Q: 'ما طرق الدفع المتاحة؟',
        faq3A: 'نقبل التحويل البنكي وبطاقات الائتمان/الخصم، كما نوفر خطط دفع بالتقسيط للدورات الطويلة.',
        faq4Q: 'هل يمكنني الحصول على حصة تجريبية؟',
        faq4A: 'بالتأكيد! نقدم حصصًا تجريبية مجانية لتجربة أسلوب التدريس قبل التسجيل.',
      }
    : {
        contactTitle: 'Contact Us',
        contactSubtitle: "Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
        sendTitle: 'Send Us a Message',
        sendSubtitle: 'Tell us what you need, and we will reply quickly.',
        sent: 'Message Sent!',
        sentDesc: "We'll get back to you within 24 hours.",
        name: 'Name *',
        email: 'Email *',
        phone: 'Phone Number (Optional)',
        subject: 'Subject *',
        message: 'Message *',
        submit: 'Send Message',
        visit: 'Visit Our Centre',
        call: 'Call Us',
        emailUs: 'Email Us',
        openMaps: 'Open in Google Maps →',
        officeHours: 'Office Hours',
        quickContact: 'Quick Contact',
        mapTitle: 'Find Us on the Map',
        faq: 'Frequently Asked Questions',
        namePlaceholder: 'Your name',
        emailPlaceholder: 'your@email.com',
        phonePlaceholder: '+60 12-345 6789',
        subjectPlaceholder: 'How can we help you?',
        messagePlaceholder: 'Tell us more about your inquiry...',
        availableHours: 'Available Mon-Fri, 9AM-9PM',
        replyWithin: 'We reply within 24 hours',
        mondayFriday: 'Monday - Friday',
        saturdaySunday: 'Saturday - Sunday',
        weekdayTime: '9:00 AM - 9:00 PM',
        weekendTime: '10:00 AM - 6:00 PM',
        quickContactDesc: 'Prefer instant messaging? Reach us on WhatsApp for quick responses.',
        whatsappUs: 'WhatsApp Us',
        callUsNow: 'Call Us Now',
        directLine: 'Direct Line',
        mapEmbedTitle: 'Wordsworth Language Centre - Megan Avenue 2',
        faq1Q: 'What are your class sizes?',
        faq1A: 'We maintain small class sizes with a maximum of 12-20 students depending on the course, ensuring personalized attention for each student.',
        faq2Q: 'Do you offer online classes?',
        faq2A: 'Yes! We offer both in-person and online classes to accommodate different learning preferences and schedules.',
        faq3Q: 'What payment methods do you accept?',
        faq3A: 'We accept bank transfers, credit/debit cards, and offer installment payment plans for longer courses.',
        faq4Q: 'Can I get a trial class?',
        faq4A: 'Absolutely! We offer free trial classes so you can experience our teaching methodology before enrolling.',
      };
  if (isChinese) {
    Object.assign(ui, {
      contactTitle: '联系我们',
      contactSubtitle: '有任何问题？欢迎给我们留言，我们会尽快回复您。',
      sendTitle: '给我们留言',
      sendSubtitle: '告诉我们您的需求，我们会尽快回复。',
      sent: '消息已发送！',
      sentDesc: '我们将在24小时内回复您。',
      name: '姓名 *',
      email: '邮箱 *',
      phone: '电话号码（可选）',
      subject: '主题 *',
      message: '留言 *',
      submit: '发送消息',
      visit: '参观我们的中心',
      call: '致电我们',
      emailUs: '发送邮件',
      openMaps: '在 Google 地图中打开 →',
      officeHours: '办公时间',
      quickContact: '快速联系',
      mapTitle: '在地图上找到我们',
      faq: '常见问题',
      namePlaceholder: '您的姓名',
      subjectPlaceholder: '我们可以如何帮助您？',
      messagePlaceholder: '请告诉我们更多咨询内容...',
      availableHours: '周一至周五，上午9点至晚上9点',
      replyWithin: '我们会在24小时内回复',
      mondayFriday: '周一至周五',
      saturdaySunday: '周六至周日',
      weekdayTime: '上午9:00 - 晚上9:00',
      weekendTime: '上午10:00 - 下午6:00',
      quickContactDesc: '偏好即时消息？通过 WhatsApp 联系我们以获得快速回复。',
      whatsappUs: 'WhatsApp 联系我们',
      callUsNow: '立即致电',
      directLine: '直线电话',
      faq1Q: '你们的班级人数是多少？',
      faq1A: '我们保持小班教学，每班最多12-20名学生，具体取决于课程。',
      faq2Q: '你们提供线上课程吗？',
      faq2A: '是的，我们提供线下和线上课程，以适合不同学习偏好和时间安排。',
      faq3Q: '你们接受哪些付款方式？',
      faq3A: '我们接受银行转账、信用卡/借记卡，并为长期课程提供分期付款计划。',
      faq4Q: '我可以参加试听课吗？',
      faq4A: '当然可以！我们提供免费试听课，让您在报名之前体验我们的教学方式。',
    });
  }
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = isArabic ? 'الاسم مطلوب' : 'Name is required';
    }

    if (!formData.email) {
      newErrors.email = isArabic ? 'البريد الإلكتروني مطلوب' : 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = isArabic ? 'يرجى إدخال بريد إلكتروني صحيح' : 'Please enter a valid email';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = isArabic ? 'الموضوع مطلوب' : 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = isArabic ? 'الرسالة مطلوبة' : 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = isArabic ? 'يجب أن تتكون الرسالة من 10 أحرف على الأقل' : 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitted(true);
      setTimeout(() => {
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        setSubmitted(false);
      }, 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    <div className="min-h-screen bg-gray-50" dir={isRTL ? 'rtl' : 'ltr'}>
      <section className="bg-gradient-to-r from-brand-blue to-brand-blue-dark text-white py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="mb-4 text-white">{ui.contactTitle}</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            {ui.contactSubtitle}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <Card className="p-7 sm:p-10 md:p-12 rounded-3xl border border-blue-100 bg-white/95 backdrop-blur-sm shadow-[0_20px_40px_rgba(245,162,31,0.18),0_35px_80px_rgba(245,162,31,0.16),0_0_80px_rgba(245,162,31,0.22)] gap-3">
            <div className="text-center mb-4">
              <h2 className="mb-2 text-4xl sm:text-5xl leading-tight font-extrabold text-gray-900 [text-shadow:0_0_16px_rgba(245,162,31,0.35)]">
                {ui.sendTitle}
              </h2>
              <p className="text-gray-700">{ui.sendSubtitle}</p>
            </div>
            {submitted ? (
              <div className="text-center py-6">
                <div className="bg-green-100 text-green-800 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-3">
                  <Send className="w-7 h-7" />
                </div>
                <h3 className="mb-1 text-green-800">{ui.sent}</h3>
                <p className="text-gray-600">{ui.sentDesc}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block mb-2 text-gray-700">{ui.name}</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border-2 ${errors.name ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:border-brand-blue transition-colors`}
                      placeholder={ui.namePlaceholder}
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-2 text-gray-700">{ui.email}</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border-2 ${errors.email ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:border-brand-blue transition-colors`}
                      placeholder={ui.emailPlaceholder}
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="block mb-2 text-gray-700">{ui.phone}</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-brand-blue transition-colors"
                    placeholder={ui.phonePlaceholder}
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block mb-2 text-gray-700">{ui.subject}</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border-2 ${errors.subject ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:border-brand-blue transition-colors`}
                    placeholder={ui.subjectPlaceholder}
                  />
                  {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject}</p>}
                </div>
                <div>
                  <label htmlFor="message" className="block mb-2 text-gray-700">{ui.message}</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className={`w-full px-4 py-3 rounded-lg border-2 ${errors.message ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:border-brand-blue transition-colors resize-none`}
                    placeholder={ui.messagePlaceholder}
                  />
                  {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
                </div>
                <Button type="submit" variant="primary" size="lg" className="w-full shadow-[0_10px_24px_rgba(245,162,31,0.38)]">
                  {ui.submit}
                  <Send className="w-5 h-5" />
                </Button>
              </form>
            )}
          </Card>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5 mb-8">
          <Card className="text-center p-3 sm:p-4 gap-2">
            <div className="bg-brand-blue/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
              <MapPin className="w-6 h-6 text-brand-blue" />
            </div>
            <h3 className="mb-1 text-xl">{ui.visit}</h3>
            <p className="text-gray-600 text-sm">
              Megan Avenue 2<br />
              Jalan Yap Kwan Seng<br />
              Kuala Lumpur, Malaysia
            </p>
          </Card>

          <Card className="text-center p-3 sm:p-4 gap-2">
            <div className="bg-brand-blue/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
              <Phone className="w-6 h-6 text-brand-blue" />
            </div>
            <h3 className="mb-1 text-xl">{ui.call}</h3>
            <p className="text-gray-600 text-sm">
              <a href="tel:+60175045565" className="hover:text-brand-blue transition-colors">
                +60 17-504 5565
              </a>
            </p>
            <p className="text-xs text-gray-500 mt-1">{ui.availableHours}</p>
          </Card>

          <Card className="text-center p-3 sm:p-4 gap-2">
            <div className="bg-brand-blue/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
              <Mail className="w-6 h-6 text-brand-blue" />
            </div>
            <h3 className="mb-1 text-xl">{ui.emailUs}</h3>
            <p className="text-gray-600 text-sm">
              <a href="mailto:info@wordsworth.edu.my" className="hover:text-brand-blue transition-colors">
                info@wordsworth.edu.my
              </a>
            </p>
            <p className="text-xs text-gray-500 mt-1">{ui.replyWithin}</p>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          <div className="hidden md:block" />
          <div className="space-y-5">
            <Card className="p-4 sm:p-5 gap-3">
              <h3 className="mb-3">{ui.officeHours}</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-brand-blue" />
                  <div>
                    <p>{ui.mondayFriday}</p>
                    <p className="text-sm text-gray-600">{ui.weekdayTime}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-brand-blue" />
                  <div>
                    <p>{ui.saturdaySunday}</p>
                    <p className="text-sm text-gray-600">{ui.weekendTime}</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-brand-green to-green-600 text-white p-4 sm:p-5 gap-3">
              <h3 className="mb-3 text-white">{ui.quickContact}</h3>
              <p className="mb-4 text-green-100">
                {ui.quickContactDesc}
              </p>
              <div className="space-y-2">
                <a
                  href="https://wa.me/60175045565"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  <div>
                    <p>{ui.whatsappUs}</p>
                    <p className="text-sm text-green-100">+60 17-504 5565</p>
                  </div>
                </a>
                <a
                  href="tel:+60175045565"
                  className="flex items-center gap-3 p-4 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  <div>
                    <p>{ui.callUsNow}</p>
                    <p className="text-sm text-green-100">{ui.directLine}</p>
                  </div>
                </a>
              </div>
            </Card>

            <Card className="p-4 sm:p-5 gap-3">
              <h3 className="mb-3">{ui.mapTitle}</h3>
              <div className="bg-gray-200 rounded-lg overflow-hidden" style={{ height: '300px' }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3983.8587341668437!2d101.71636931475394!3d3.1574337977223846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc37d348415c3d%3A0x7c4f3c0f8e0c0c0c!2sMegan%20Avenue%202%2C%20Jalan%20Yap%20Kwan%20Seng%2C%20Kuala%20Lumpur%2C%20Federal%20Territory%20of%20Kuala%20Lumpur!5e0!3m2!1sen!2smy!4v1234567890123!5m2!1sen!2smy"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={ui.mapEmbedTitle}
                />
              </div>
              <div className="mt-4 text-center">
                <a
                  href="https://maps.google.com/?q=Megan+Avenue+2,+Jalan+Yap+Kwan+Seng,+Kuala+Lumpur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-blue hover:underline text-sm"
                >
                  {ui.openMaps}
                </a>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <section className="bg-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="mb-4">{ui.faq}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            <Card className="p-4 sm:p-5 gap-2">
              <h4 className="mb-2">{ui.faq1Q}</h4>
              <p className="text-gray-600 text-sm">
                {ui.faq1A}
              </p>
            </Card>
            <Card className="p-4 sm:p-5 gap-2">
              <h4 className="mb-2">{ui.faq2Q}</h4>
              <p className="text-gray-600 text-sm">
                {ui.faq2A}
              </p>
            </Card>
            <Card className="p-4 sm:p-5 gap-2">
              <h4 className="mb-2">{ui.faq3Q}</h4>
              <p className="text-gray-600 text-sm">
                {ui.faq3A}
              </p>
            </Card>
            <Card className="p-4 sm:p-5 gap-2">
              <h4 className="mb-2">{ui.faq4Q}</h4>
              <p className="text-gray-600 text-sm">
                {ui.faq4A}
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}


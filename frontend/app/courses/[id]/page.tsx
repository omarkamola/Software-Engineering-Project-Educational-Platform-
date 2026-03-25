'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Clock, Star, Users, Play, Check, ArrowRight, Video, 
  Award, Globe, Download, MessageCircle, Shield, Sparkles,
  ChevronDown, PlayCircle, Lock, FileText, GraduationCap
} from 'lucide-react';
import { courseAPI, enrollmentAPI } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import toast from 'react-hot-toast';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';

// Course images mapping based on subject
const subjectImages: Record<string, string> = {
  'رياضيات': 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&q=80',
  'لغة عربية': 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1200&q=80',
  'علوم': 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200&q=80',
  'لغة إنجليزية': 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&q=80',
  'فيزياء': 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=1200&q=80',
  'كيمياء': 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=1200&q=80',
  'أحياء': 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=1200&q=80',
  'دراسات': 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1200&q=80',
  'حاسب آلي': 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=80',
  'default': 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1200&q=80',
};

const getCourseImage = (course: any) => {
  if (course?.subject && subjectImages[course.subject]) {
    return subjectImages[course.subject];
  }
  if (course?.title) {
    const title = course.title.toLowerCase();
    if (title.includes('رياضيات') || title.includes('جبر') || title.includes('هندسة')) return subjectImages['رياضيات'];
    if (title.includes('عربي') || title.includes('نحو')) return subjectImages['لغة عربية'];
    if (title.includes('english') || title.includes('إنجليزي')) return subjectImages['لغة إنجليزية'];
    if (title.includes('علوم')) return subjectImages['علوم'];
    if (title.includes('فيزياء')) return subjectImages['فيزياء'];
    if (title.includes('كيمياء')) return subjectImages['كيمياء'];
    if (title.includes('أحياء')) return subjectImages['أحياء'];
    if (title.includes('تاريخ') || title.includes('جغرافيا')) return subjectImages['دراسات'];
    if (title.includes('برمجة') || title.includes('python')) return subjectImages['حاسب آلي'];
  }
  return subjectImages['default'];
};

// Sample course curriculum
const generateCurriculum = (course: any) => [
  { 
    title: 'المقدمة والأساسيات', 
    duration: '45 دقيقة', 
    lessons: [
      { title: 'مرحباً بك في الدورة', duration: '5:00', free: true },
      { title: 'نظرة عامة على المحتوى', duration: '8:00', free: true },
      { title: 'المتطلبات الأساسية', duration: '12:00', free: false },
      { title: 'إعداد بيئة العمل', duration: '10:00', free: false },
      { title: 'نصائح للتعلم الفعال', duration: '10:00', free: false },
    ]
  },
  { 
    title: 'الجزء الأول - المفاهيم الأساسية', 
    duration: '1.5 ساعة', 
    lessons: [
      { title: 'المفهوم الأول بالتفصيل', duration: '15:00', free: false },
      { title: 'تطبيقات عملية', duration: '20:00', free: false },
      { title: 'أمثلة محلولة', duration: '18:00', free: false },
      { title: 'تمارين تفاعلية', duration: '15:00', free: false },
      { title: 'اختبار قصير', duration: '10:00', free: false },
    ]
  },
  { 
    title: 'الجزء الثاني - المستوى المتوسط', 
    duration: '2 ساعة', 
    lessons: [
      { title: 'مفاهيم متقدمة', duration: '20:00', free: false },
      { title: 'ربط المفاهيم', duration: '18:00', free: false },
      { title: 'حل المشكلات', duration: '25:00', free: false },
      { title: 'دراسات حالة', duration: '22:00', free: false },
      { title: 'مشروع تطبيقي', duration: '30:00', free: false },
    ]
  },
  { 
    title: 'الجزء الثالث - التطبيقات العملية', 
    duration: '1.5 ساعة', 
    lessons: [
      { title: 'مشاريع واقعية', duration: '25:00', free: false },
      { title: 'تحديات وحلول', duration: '20:00', free: false },
      { title: 'أفضل الممارسات', duration: '18:00', free: false },
      { title: 'نصائح احترافية', duration: '12:00', free: false },
    ]
  },
  { 
    title: 'المراجعة النهائية والاختبار', 
    duration: '45 دقيقة', 
    lessons: [
      { title: 'ملخص شامل', duration: '15:00', free: false },
      { title: 'مراجعة سريعة', duration: '12:00', free: false },
      { title: 'الاختبار النهائي', duration: '18:00', free: false },
    ]
  },
];

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [expandedSection, setExpandedSection] = useState<number | null>(0);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetchCourse();
      checkEnrollment();
    }
  }, [params.id]);

  const fetchCourse = async () => {
    try {
      const res = await courseAPI.getById(params.id as string);
      setCourse(res.data);
    } catch (err) {
      toast.error('❌ فشل تحميل الكورس');
      router.push('/');
    } finally {
      setLoading(false);
    }
  };

  const checkEnrollment = async () => {
    if (!isAuthenticated) return;
    try {
      const res = await enrollmentAPI.getMyEnrollments();
      const enrolled = res.data.some((e: any) => e.course_id === parseInt(params.id as string));
      setIsEnrolled(enrolled);
    } catch (err) {
      // Ignore
    }
  };

  const handleEnroll = async () => {
    if (!isAuthenticated) {
      toast.error('يجب تسجيل الدخول أولاً');
      router.push('/login');
      return;
    }

    setEnrolling(true);
    try {
      await enrollmentAPI.enroll(course.id);
      toast.success('✅ تم التسجيل في الكورس بنجاح!');
      setIsEnrolled(true);
    } catch (err: any) {
      toast.error(err.response?.data?.message || '❌ فشل التسجيل');
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-950 flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto">
            <div className="absolute inset-0 border-4 border-indigo-200 dark:border-indigo-800 rounded-full" />
            <div className="absolute inset-0 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          </div>
          <p className="mt-6 text-slate-600 dark:text-slate-400 text-lg">جاري تحميل الكورس...</p>
        </div>
      </div>
    );
  }

  if (!course) return null;

  const curriculum = generateCurriculum(course);
  const totalLessons = curriculum.reduce((acc, section) => acc + section.lessons.length, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-950 transition-colors duration-500">
      {/* Header */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-lg sticky top-0 z-50 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors">
              <ArrowRight className="w-5 h-5" />
              <span className="font-medium">العودة للرئيسية</span>
            </Link>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              {!isAuthenticated && (
                <Link href="/login">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-5 py-2 bg-indigo-600 text-white rounded-xl font-medium shadow-lg shadow-indigo-500/30"
                  >
                    تسجيل الدخول
                  </motion.button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 py-16 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Course Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-white"
            >
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium">
                  {course.grade || 'جميع المراحل'}
                </span>
                {course.subject && (
                  <span className="bg-indigo-500/30 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium">
                    {course.subject}
                  </span>
                )}
                <span className="bg-amber-500/30 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  4.8 (250 تقييم)
                </span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                {course.title}
              </h1>
              
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                {course.description || 'تعلم المفاهيم الأساسية والمتقدمة مع أفضل المعلمين المتخصصين. احصل على شهادة معتمدة عند إتمام الدورة.'}
              </p>

              <div className="flex flex-wrap items-center gap-6 mb-8 text-slate-300">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>1,234 طالب مسجل</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>5 ساعات و 45 دقيقة</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  <span>{totalLessons} درس</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <img 
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(course.teacher_name || 'Teacher')}&background=6366f1&color=fff&size=64`}
                  alt={course.teacher_name}
                  className="w-14 h-14 rounded-full border-2 border-white/30"
                />
                <div>
                  <p className="font-semibold text-lg">{course.teacher_name}</p>
                  <p className="text-slate-400 text-sm">معلم معتمد • خبرة 10+ سنوات</p>
                </div>
              </div>
            </motion.div>

            {/* Video Preview Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden">
                {/* Video Preview */}
                <div 
                  className="relative aspect-video bg-gradient-to-br from-slate-800 to-slate-900 cursor-pointer group"
                  onClick={() => setShowVideo(true)}
                >
                  <img 
                    src={getCourseImage(course)} 
                    alt={course.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl"
                    >
                      <Play className="w-8 h-8 text-indigo-600 mr-1" fill="currentColor" />
                    </motion.div>
                  </div>
                  <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-lg text-white text-sm">
                    شاهد الفيديو التعريفي
                  </div>
                </div>

                {/* Enrollment Card */}
                <div className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
                      {course.price} <span className="text-xl">ج.م</span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm line-through">
                      {Math.round(course.price * 1.5)} ج.م
                    </p>
                    <span className="inline-block bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-3 py-1 rounded-full text-sm font-medium mt-2">
                      خصم 35% - ينتهي قريباً!
                    </span>
                  </div>

                  {isEnrolled ? (
                    <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-500 rounded-2xl p-5 text-center">
                      <div className="w-16 h-16 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
                      </div>
                      <p className="text-green-700 dark:text-green-400 font-bold text-lg mb-2">
                        أنت مسجل في هذا الكورس
                      </p>
                      <Link href="/dashboard">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full bg-green-600 text-white py-3 rounded-xl font-bold mt-3"
                        >
                          ابدأ التعلم الآن
                        </motion.button>
                      </Link>
                    </div>
                  ) : (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(99, 102, 241, 0.3)' }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleEnroll}
                        disabled={enrolling}
                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all disabled:opacity-50"
                      >
                        {enrolling ? (
                          <span className="flex items-center justify-center gap-2">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            جاري التسجيل...
                          </span>
                        ) : (
                          '🎯 سجل الآن'
                        )}
                      </motion.button>

                      <p className="text-center text-slate-500 dark:text-slate-400 text-sm mt-4">
                        ضمان استرداد المال خلال 30 يوم
                      </p>
                    </>
                  )}

                  {/* Features */}
                  <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700 space-y-3">
                    {[
                      { icon: Globe, text: 'وصول مدى الحياة' },
                      { icon: Award, text: 'شهادة عند الإكمال' },
                      { icon: Download, text: 'موارد قابلة للتحميل' },
                      { icon: MessageCircle, text: 'دعم مباشر من المعلم' },
                      { icon: Shield, text: 'ضمان استرداد 30 يوم' },
                    ].map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                        <feature.icon className="w-5 h-5 text-indigo-500" />
                        <span className="text-sm">{feature.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* What You'll Learn */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-8 border border-slate-100 dark:border-slate-700"
            >
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                <Sparkles className="w-7 h-7 text-amber-500" />
                ماذا ستتعلم؟
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  'فهم المفاهيم الأساسية بعمق',
                  'حل المسائل بطرق متعددة ومبتكرة',
                  'تطبيقات عملية على أرض الواقع',
                  'أمثلة من الحياة اليومية',
                  'تمارين تفاعلية وممتعة',
                  'دعم مستمر ومتابعة من المعلم',
                  'اختبارات لقياس مستوى التقدم',
                  'شهادة معتمدة عند الإتمام',
                ].map((item, idx) => (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-start gap-3 bg-slate-50 dark:bg-slate-700/50 p-4 rounded-xl"
                  >
                    <div className="w-6 h-6 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                    </div>
                    <span className="text-slate-700 dark:text-slate-300">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Course Curriculum */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-8 border border-slate-100 dark:border-slate-700"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                  <BookOpen className="w-7 h-7 text-indigo-500" />
                  محتوى الكورس
                </h2>
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  {curriculum.length} أقسام • {totalLessons} درس
                </div>
              </div>

              <div className="space-y-4">
                {curriculum.map((section, sectionIdx) => (
                  <div
                    key={sectionIdx}
                    className="border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden"
                  >
                    <button
                      onClick={() => setExpandedSection(expandedSection === sectionIdx ? null : sectionIdx)}
                      className="w-full flex items-center justify-between p-5 bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg flex items-center justify-center">
                          <span className="text-indigo-600 dark:text-indigo-400 font-bold text-sm">
                            {sectionIdx + 1}
                          </span>
                        </div>
                        <div className="text-right">
                          <h3 className="font-semibold text-slate-900 dark:text-white">{section.title}</h3>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            {section.lessons.length} دروس • {section.duration}
                          </p>
                        </div>
                      </div>
                      <motion.div
                        animate={{ rotate: expandedSection === sectionIdx ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-5 h-5 text-slate-400" />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {expandedSection === sectionIdx && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: 'auto' }}
                          exit={{ height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="p-4 space-y-2 bg-white dark:bg-slate-800">
                            {section.lessons.map((lesson, lessonIdx) => (
                              <div
                                key={lessonIdx}
                                className="flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-xl transition-colors"
                              >
                                <div className="flex items-center gap-3">
                                  {lesson.free ? (
                                    <PlayCircle className="w-5 h-5 text-indigo-500" />
                                  ) : (
                                    <Lock className="w-5 h-5 text-slate-400" />
                                  )}
                                  <span className="text-slate-700 dark:text-slate-300">{lesson.title}</span>
                                  {lesson.free && (
                                    <span className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-2 py-0.5 rounded text-xs font-medium">
                                      مجاني
                                    </span>
                                  )}
                                </div>
                                <span className="text-sm text-slate-500 dark:text-slate-400">{lesson.duration}</span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Requirements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-8 border border-slate-100 dark:border-slate-700"
            >
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                <FileText className="w-7 h-7 text-purple-500" />
                المتطلبات
              </h2>
              <ul className="space-y-3">
                {[
                  'لا يوجد متطلبات مسبقة - نبدأ من الصفر',
                  'جهاز كمبيوتر أو هاتف للوصول للمحتوى',
                  'الرغبة في التعلم والمثابرة',
                  'وقت للممارسة والتطبيق (30 دقيقة يومياً)',
                ].map((req, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                    <div className="w-2 h-2 bg-purple-500 rounded-full" />
                    {req}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Right Column - Sticky Card */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="sticky top-24 bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-6 border border-slate-100 dark:border-slate-700"
            >
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <GraduationCap className="w-6 h-6 text-indigo-500" />
                تفاصيل الكورس
              </h3>
              
              <div className="space-y-5">
                {[
                  { icon: Clock, label: 'المدة الإجمالية', value: '5 ساعات و 45 دقيقة' },
                  { icon: BookOpen, label: 'عدد الدروس', value: `${totalLessons} درس` },
                  { icon: FileText, label: 'الموارد', value: '15 ملف قابل للتحميل' },
                  { icon: Award, label: 'الشهادة', value: 'شهادة معتمدة' },
                  { icon: Globe, label: 'اللغة', value: 'العربية' },
                  { icon: Star, label: 'المستوى', value: course.grade || 'جميع المستويات' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/50 rounded-xl flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{item.label}</p>
                      <p className="font-semibold text-slate-900 dark:text-white">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Instructor */}
              <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
                <h4 className="font-semibold text-slate-900 dark:text-white mb-4">المعلم</h4>
                <div className="flex items-center gap-4">
                  <img 
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(course.teacher_name || 'Teacher')}&background=6366f1&color=fff&size=64`}
                    alt={course.teacher_name}
                    className="w-16 h-16 rounded-full"
                  />
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">{course.teacher_name}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">معلم معتمد</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="text-sm text-slate-600 dark:text-slate-400">4.9 تقييم</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowVideo(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden max-w-4xl w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="aspect-video bg-slate-900 flex items-center justify-center">
                <div className="text-center text-white">
                  <Play className="w-20 h-20 mx-auto mb-4 opacity-50" />
                  <p className="text-xl">الفيديو التعريفي</p>
                  <p className="text-slate-400 mt-2">سيتم إضافة الفيديو قريباً</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{course.title}</h3>
                <p className="text-slate-600 dark:text-slate-400">{course.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

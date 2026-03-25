'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { courseAPI, enrollmentAPI } from '@/lib/api';
import { BookOpen, LogOut, User, Users, Settings, Play, Clock, Award, GraduationCap, ChevronRight, Star, TrendingUp, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';

// Course images mapping
const subjectImages: Record<string, string> = {
  'رياضيات': 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&q=80',
  'لغة عربية': 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&q=80',
  'علوم': 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&q=80',
  'لغة إنجليزية': 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80',
  'فيزياء': 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=600&q=80',
  'كيمياء': 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=600&q=80',
  'أحياء': 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=600&q=80',
  'دراسات': 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&q=80',
  'حاسب آلي': 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80',
  'default': 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&q=80',
};

const getCourseImage = (course: any) => {
  if (course?.subject && subjectImages[course.subject]) return subjectImages[course.subject];
  if (course?.title) {
    const title = course.title.toLowerCase();
    if (title.includes('رياضيات') || title.includes('جبر')) return subjectImages['رياضيات'];
    if (title.includes('عربي') || title.includes('نحو')) return subjectImages['لغة عربية'];
    if (title.includes('english') || title.includes('إنجليزي')) return subjectImages['لغة إنجليزية'];
    if (title.includes('فيزياء')) return subjectImages['فيزياء'];
    if (title.includes('كيمياء')) return subjectImages['كيمياء'];
    if (title.includes('أحياء')) return subjectImages['أحياء'];
    if (title.includes('برمجة') || title.includes('python')) return subjectImages['حاسب آلي'];
  }
  return subjectImages['default'];
};

export default function DashboardPage() {
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    // Set default tab based on role
    if (user) {
      if (user.role_id === 1) setActiveTab('my-courses');
      else if (user.role_id === 3) setActiveTab('teaching');
      else if (user.role_id === 5) setActiveTab('admin-stats');
      else setActiveTab('all-courses');
    }
    fetchData();
  }, [isAuthenticated, user]);

  const fetchData = async () => {
    try {
      const [coursesRes, enrolledRes] = await Promise.all([
        courseAPI.getAll(),
        user?.role_id === 1 ? enrollmentAPI.getMyEnrollments() : Promise.resolve({ data: [] }),
      ]);
      setCourses(coursesRes.data);
      setEnrolledCourses(enrolledRes.data);
    } catch (err) {
      toast.error('❌ فشل تحميل البيانات');
    } finally {
      setLoading(false);
    }
  };

  const teachingCourses = courses.filter((c: any) => c.teacher_id === user?.id);

  const getStats = () => {
    if (user?.role_id === 3) {
      return [
        { label: 'كورساتي', value: teachingCourses.length, icon: BookOpen, color: 'from-indigo-500 to-blue-500' },
        { label: 'إجمالي الطلاب', value: 124, icon: Users, color: 'from-purple-500 to-pink-500' },
        { label: 'التقييم العام', value: '4.9', icon: Star, color: 'from-amber-500 to-orange-500' },
        { label: 'الأرباح (ج.م)', value: '2,450', icon: TrendingUp, color: 'from-green-500 to-emerald-500' },
      ];
    }
    if (user?.role_id === 5) {
      return [
        { label: 'إجمالي المستخدمين', value: 1250, icon: Users, color: 'from-blue-500 to-cyan-500' },
        { label: 'إجمالي الكورسات', value: courses.length, icon: BookOpen, color: 'from-purple-500 to-pink-500' },
        { label: 'بلاغات نشطة', value: 3, icon: Award, color: 'from-red-500 to-orange-500' },
        { label: 'حالة النظام', value: 'نشط', icon: TrendingUp, color: 'from-green-500 to-emerald-500' },
      ];
    }
    return [
      { label: 'كورساتي', value: enrolledCourses.length, icon: BookOpen, color: 'from-blue-500 to-cyan-500' },
      { label: 'ساعات التعلم', value: enrolledCourses.length * 5, icon: Clock, color: 'from-purple-500 to-pink-500' },
      { label: 'الشهادات', value: 0, icon: Award, color: 'from-orange-500 to-red-500' },
      { label: 'التقدم', value: '0%', icon: TrendingUp, color: 'from-green-500 to-emerald-500' },
    ];
  };

  const getTabs = () => {
    const tabs = [];
    if (user?.role_id === 1) {
      tabs.push({ id: 'my-courses', label: 'كورساتي المسجلة', icon: BookOpen });
    }
    if (user?.role_id === 3) {
      tabs.push({ id: 'teaching', label: 'كورساتي التعليمية', icon: BookOpen });
    }
    if (user?.role_id === 5) {
      tabs.push({ id: 'admin-stats', label: 'إحصائيات النظام', icon: TrendingUp });
    }
    tabs.push({ id: 'all-courses', label: 'تصفح الكورسات', icon: GraduationCap });
    return tabs;
  };

  const handleEnroll = async (courseId: number) => {
    try {
      await enrollmentAPI.enroll(courseId);
      toast.success('✅ تم التسجيل في الدورة بنجاح!');
      fetchData();
    } catch (err: any) {
      toast.error(err.response?.data?.message || '❌ فشل التسجيل');
    }
  };

  const handleLogout = () => {
    logout();
    toast.success('👋 تم تسجيل الخروج بنجاح');
    router.push('/');
  };

  const getRoleName = (roleId: number) => {
    const roles: Record<number, string> = {
      1: 'طالب',
      2: 'ولي أمر',
      3: 'معلم',
      4: 'مساعد',
      5: 'مدير النظام',
    };
    return roles[roleId] || 'مستخدم';
  };

  const isEnrolled = (courseId: number) => {
    return enrolledCourses.some((e: any) => e.course_id === courseId);
  };

  if (!isAuthenticated || !user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-950 transition-colors duration-500">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-lg sticky top-0 z-50 border-b border-slate-200 dark:border-slate-700"
      >
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* User Info */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <User className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">{user.full_name}</h2>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-600 dark:text-slate-400">{getRoleName(user.role_id)}</span>
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                  <span className="text-xs text-green-600 dark:text-green-400">متصل</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <ThemeToggle />
              {(user.role_id === 3 || user.role_id === 5) && (
                <Link href="/create-course">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-medium shadow-lg shadow-green-500/30"
                  >
                    <BookOpen className="w-4 h-4" />
                    إنشاء كورس
                  </motion.button>
                </Link>
              )}
              <Link href="/profile">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2.5 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all"
                >
                  <Settings className="w-5 h-5" />
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-medium shadow-lg shadow-red-500/30"
              >
                <LogOut className="w-4 h-4" />
                خروج
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
            مرحباً {user.full_name.split(' ')[0]}! 👋
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            {user.role_id === 3 ? 'إليك نظرة على أداء كورساتك اليوم' : 
             user.role_id === 5 ? 'لوحة تحكم إدارة النظام' :
             'استمر في رحلتك التعليمية واكتشف كورسات جديدة'}
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {getStats().map((stat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-lg shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700"
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-3 shadow-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</div>
              <div className="text-slate-500 dark:text-slate-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 bg-white dark:bg-slate-800 p-1.5 rounded-xl shadow-lg shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700 w-fit">
          {getTabs().map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dynamic Content Sections */}
        {activeTab === 'my-courses' && user.role_id === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none p-8 border border-slate-100 dark:border-slate-700"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                <BookOpen className="w-7 h-7 text-indigo-500" />
                كورساتي المسجلة
              </h2>
              <span className="text-sm text-slate-500 dark:text-slate-400">
                {enrolledCourses.length} كورس
              </span>
            </div>

            {enrolledCourses.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-10 h-10 text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  لم تسجل في أي كورس بعد
                </h3>
                <p className="text-slate-500 dark:text-slate-400 mb-6">
                  تصفح الكورسات المتاحة وابدأ رحلتك التعليمية
                </p>
                <button
                  onClick={() => setActiveTab('all-courses')}
                  className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-indigo-700 transition-colors"
                >
                  تصفح الكورسات
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrolledCourses.map((enrollment: any) => (
                  <Link key={enrollment.id} href={`/courses/${enrollment.course_id}`}>
                    <motion.div
                      whileHover={{ y: -5 }}
                      className="group bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 border-2 border-indigo-100 dark:border-indigo-800 rounded-2xl overflow-hidden hover:shadow-xl transition-all"
                    >
                      {/* Image Source logic remains same but improved UI */}
                      <div className="relative h-36 overflow-hidden">
                        <img
                          src={getCourseImage(enrollment)}
                          alt={enrollment.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-3 right-3 bg-indigo-500 px-3 py-1 rounded-full text-white text-xs font-medium">
                          طالب
                        </div>
                      </div>

                      <div className="p-5">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 line-clamp-1">
                          {enrollment.title}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm mb-3 line-clamp-2">
                          {enrollment.description}
                        </p>
                        
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(enrollment.enrolled_at).toLocaleDateString('ar-EG')}
                          </span>
                          <span className="text-indigo-600 dark:text-indigo-400 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                            دراسة
                            <ChevronRight className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'teaching' && user.role_id === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none p-8 border border-slate-100 dark:border-slate-700"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                <BookOpen className="w-7 h-7 text-green-500" />
                كورساتي التعليمية
              </h2>
              <Link href="/create-course">
                <button className="text-sm bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
                  + إضافة كورس جديد
                </button>
              </Link>
            </div>

            {teachingCourses.length === 0 ? (
              <div className="text-center py-16">
                <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300">لم تقم بإنشاء أي كورس بعد</h3>
                <p className="text-slate-500 mt-2">ابدأ بمشاركة علمك مع الطلاب اليوم!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teachingCourses.map((course: any) => (
                  <Link key={course.id} href={`/courses/${course.id}`}>
                    <motion.div
                      whileHover={{ y: -5 }}
                      className="group bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-2xl overflow-hidden hover:shadow-xl transition-all"
                    >
                      <div className="relative h-36">
                        <img src={getCourseImage(course)} alt={course.title} className="w-full h-full object-cover" />
                        <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">نشط</div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-lg mb-1">{course.title}</h3>
                        <div className="flex justify-between items-center text-sm text-slate-500">
                          <span>120 طالب</span>
                          <span className="text-green-600 font-bold">{course.price} ج.م</span>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'all-courses' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none p-8 border border-slate-100 dark:border-slate-700"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                <GraduationCap className="w-7 h-7 text-purple-500" />
                تصفح جميع الكورسات
              </h2>
            </div>

            {loading ? (
              <div className="text-center py-10">جاري التحميل...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course: any) => (
                  <motion.div
                    key={course.id}
                    whileHover={{ y: -5 }}
                    className="bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-2xl overflow-hidden shadow-sm"
                  >
                    <div className="relative h-40">
                      <img src={getCourseImage(course)} alt={course.title} className="w-full h-full object-cover" />
                      <div className="absolute top-2 right-2 bg-indigo-600 text-white text-[10px] px-2 py-1 rounded-full">{course.grade}</div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold mb-2 line-clamp-1">{course.title}</h3>
                      <div className="flex items-center gap-2 mb-4 text-xs text-slate-500">
                        <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(course.teacher_name)}&background=random`} className="w-5 h-5 rounded-full" />
                        {course.teacher_name}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-indigo-600">{course.price} ج.م</span>
                        {user.role_id === 1 && (
                          isEnrolled(course.id) ? (
                            <span className="text-green-500 text-sm font-medium">✓ مسجل</span>
                          ) : (
                            <button onClick={() => handleEnroll(course.id)} className="bg-indigo-600 text-white px-4 py-1.5 rounded-lg text-sm transition-colors hover:bg-indigo-700">سجل الآن</button>
                          )
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Admin Dashboard Placeholder */}
        {activeTab === 'admin-stats' && user.role_id === 5 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-xl">
              <h2 className="text-2xl font-bold mb-6">المستخدمين الجدد</h2>
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">👤</div>
                      <div>
                        <div className="font-bold">مستخدم جديد {i}</div>
                        <div className="text-xs text-slate-500">انضم منذ 5 ساعات</div>
                      </div>
                    </div>
                    <button className="text-indigo-600 text-sm">عرض</button>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-xl">
              <h2 className="text-2xl font-bold mb-6">الكورسات الأكثر مبيعاً</h2>
              <div className="space-y-4">
                {courses.slice(0, 3).map((c: any) => (
                  <div key={c.id} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl">
                    <div className="font-bold truncate max-w-[150px]">{c.title}</div>
                    <div className="text-indigo-600 font-bold">45 طالب</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

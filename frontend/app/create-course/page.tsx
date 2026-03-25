'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { BookOpen, DollarSign, GraduationCap, ArrowRight, FileText, Layers } from 'lucide-react';
import { courseAPI } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import toast from 'react-hot-toast';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';

const grades = [
  { value: '', label: 'اختر الصف' },
  { value: 'الصف الأول الابتدائي', label: 'الصف الأول الابتدائي' },
  { value: 'الصف الثاني الابتدائي', label: 'الصف الثاني الابتدائي' },
  { value: 'الصف الثالث الابتدائي', label: 'الصف الثالث الابتدائي' },
  { value: 'الصف الرابع الابتدائي', label: 'الصف الرابع الابتدائي' },
  { value: 'الصف الخامس الابتدائي', label: 'الصف الخامس الابتدائي' },
  { value: 'الصف السادس الابتدائي', label: 'الصف السادس الابتدائي' },
  { value: 'الصف الأول الإعدادي', label: 'الصف الأول الإعدادي' },
  { value: 'الصف الثاني الإعدادي', label: 'الصف الثاني الإعدادي' },
  { value: 'الصف الثالث الإعدادي', label: 'الصف الثالث الإعدادي' },
  { value: 'الصف الأول الثانوي', label: 'الصف الأول الثانوي' },
  { value: 'الصف الثاني الثانوي', label: 'الصف الثاني الثانوي' },
  { value: 'الصف الثالث الثانوي', label: 'الصف الثالث الثانوي' },
  { value: 'جميع المراحل', label: 'جميع المراحل' },
];

const subjects = [
  { value: '', label: 'اختر المادة' },
  { value: 'رياضيات', label: 'رياضيات' },
  { value: 'لغة عربية', label: 'لغة عربية' },
  { value: 'لغة إنجليزية', label: 'لغة إنجليزية' },
  { value: 'علوم', label: 'علوم' },
  { value: 'فيزياء', label: 'فيزياء' },
  { value: 'كيمياء', label: 'كيمياء' },
  { value: 'أحياء', label: 'أحياء' },
  { value: 'دراسات', label: 'دراسات اجتماعية' },
  { value: 'حاسب آلي', label: 'حاسب آلي' },
];

export default function CreateCoursePage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    grade: '',
    subject: '',
  });

  if (!isAuthenticated || user?.role_id !== 3) {
    router.push('/dashboard');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await courseAPI.create({
        ...formData,
        price: parseFloat(formData.price),
      });
      toast.success('✅ تم إنشاء الكورس بنجاح!');
      router.push('/dashboard');
    } catch (err: any) {
      toast.error(err.response?.data?.message || '❌ فشل إنشاء الكورس');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-950 py-12 transition-colors duration-500">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 mb-8">
        <div className="flex justify-between items-center">
          <Link href="/dashboard" className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors">
            <ArrowRight className="w-5 h-5" />
            <span className="font-medium">العودة للوحة التحكم</span>
          </Link>
          <ThemeToggle />
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none p-8 border border-slate-100 dark:border-slate-700"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-xl shadow-indigo-500/30 mb-4">
              <GraduationCap className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              إنشاء كورس جديد
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              شارك معرفتك مع الآلاف من الطلاب
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                عنوان الكورس *
              </label>
              <div className="relative">
                <BookOpen className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="مثال: رياضيات الصف الأول الثانوي"
                  className="w-full pr-12 pl-4 py-4 border-2 border-slate-200 dark:border-slate-600 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 dark:focus:border-indigo-400 transition-all"
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                وصف الكورس *
              </label>
              <div className="relative">
                <FileText className="absolute right-4 top-4 text-slate-400 w-5 h-5" />
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="اشرح ما سيتعلمه الطلاب في هذا الكورس..."
                  rows={4}
                  className="w-full pr-12 pl-4 py-4 border-2 border-slate-200 dark:border-slate-600 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 dark:focus:border-indigo-400 transition-all resize-none"
                  required
                />
              </div>
            </div>

            {/* Grid for Grade, Subject, Price */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* Grade */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  الصف الدراسي *
                </label>
                <div className="relative">
                  <Layers className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
                  <select
                    value={formData.grade}
                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                    className="w-full pr-12 pl-4 py-4 border-2 border-slate-200 dark:border-slate-600 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 dark:focus:border-indigo-400 transition-all appearance-none cursor-pointer"
                    required
                  >
                    {grades.map((grade) => (
                      <option key={grade.value} value={grade.value}>{grade.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  المادة *
                </label>
                <div className="relative">
                  <BookOpen className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full pr-12 pl-4 py-4 border-2 border-slate-200 dark:border-slate-600 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 dark:focus:border-indigo-400 transition-all appearance-none cursor-pointer"
                    required
                  >
                    {subjects.map((subject) => (
                      <option key={subject.value} value={subject.value}>{subject.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  السعر (ج.م) *
                </label>
                <div className="relative">
                  <DollarSign className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="200"
                    min="0"
                    step="0.01"
                    className="w-full pr-12 pl-4 py-4 border-2 border-slate-200 dark:border-slate-600 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 dark:focus:border-indigo-400 transition-all"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(99, 102, 241, 0.3)' }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  جاري الإنشاء...
                </span>
              ) : (
                '🚀 نشر الكورس'
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

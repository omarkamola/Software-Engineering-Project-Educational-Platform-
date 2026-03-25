'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { use } from 'react';
import { 
  GraduationCap, Users, BookOpen, ChevronLeft, ArrowRight,
  Play, Star, Clock, FileText, Video, Award
} from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';

// بيانات السنوات والمواد
const yearsData: Record<number, any> = {
  1: { name: 'الصف الأول الابتدائي', stage: 'ابتدائي' },
  2: { name: 'الصف الثاني الابتدائي', stage: 'ابتدائي' },
  3: { name: 'الصف الثالث الابتدائي', stage: 'ابتدائي' },
  4: { name: 'الصف الرابع الابتدائي', stage: 'ابتدائي' },
  5: { name: 'الصف الخامس الابتدائي', stage: 'ابتدائي' },
  6: { name: 'الصف السادس الابتدائي', stage: 'ابتدائي' },
  7: { name: 'الصف الأول الإعدادي', stage: 'إعدادي' },
  8: { name: 'الصف الثاني الإعدادي', stage: 'إعدادي' },
  9: { name: 'الصف الثالث الإعدادي', stage: 'إعدادي' },
  10: { name: 'الصف الأول الثانوي', stage: 'ثانوي' },
  11: { name: 'الصف الثاني الثانوي', stage: 'ثانوي' },
  12: { name: 'الصف الثالث الثانوي', stage: 'ثانوي' },
};

const subjects = [
  { id: 1, name: 'الرياضيات', icon: '📐', color: '#3b82f6', teachers: 3, lessons: 45 },
  { id: 2, name: 'اللغة العربية', icon: '📚', color: '#10b981', teachers: 2, lessons: 52 },
  { id: 3, name: 'اللغة الإنجليزية', icon: '🌍', color: '#8b5cf6', teachers: 2, lessons: 38 },
  { id: 4, name: 'العلوم', icon: '🔬', color: '#f59e0b', teachers: 2, lessons: 35 },
  { id: 5, name: 'الدراسات الاجتماعية', icon: '🗺️', color: '#ec4899', teachers: 1, lessons: 28 },
  { id: 6, name: 'الحاسب الآلي', icon: '💻', color: '#06b6d4', teachers: 1, lessons: 20 },
];

const teachers = [
  { id: 1, name: 'أ/ محمد أحمد', subject: 'رياضيات', rating: 4.9, students: 2500, avatar: '👨‍🏫' },
  { id: 2, name: 'أ/ سارة محمود', subject: 'لغة عربية', rating: 4.8, students: 2200, avatar: '👩‍🏫' },
  { id: 3, name: 'أ/ أحمد علي', subject: 'علوم', rating: 4.9, students: 1800, avatar: '👨‍🔬' },
  { id: 4, name: 'أ/ منى حسن', subject: 'إنجليزي', rating: 4.7, students: 1500, avatar: '👩‍💼' },
];

const featuredCourses = [
  { id: 1, title: 'شرح الجبر كامل', teacher: 'أ/ محمد أحمد', lessons: 24, duration: '12 ساعة', price: 200 },
  { id: 2, title: 'النحو من البداية', teacher: 'أ/ سارة محمود', lessons: 30, duration: '15 ساعة', price: 180 },
  { id: 3, title: 'Grammar Master', teacher: 'أ/ منى حسن', lessons: 20, duration: '10 ساعة', price: 150 },
];

export default function YearDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const yearId = parseInt(resolvedParams.id);
  const yearData = yearsData[yearId] || { name: 'غير موجود', stage: '' };

  const [activeTab, setActiveTab] = useState('subjects');

  return (
    <div className="page-wrapper">
      {/* Header */}
      <header className="header">
        <div className="header-container">
          <Link href="/years" className="back-link">
            <ArrowRight size={20} />
            <span>السنوات الدراسية</span>
          </Link>
          
          <ThemeToggle />
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">
            <GraduationCap size={18} />
            <span>المرحلة {yearData.stage}</span>
          </div>
          <h1>{yearData.name}</h1>
          <p>اختر المادة أو المعلم وابدأ التعلم الآن</p>
          
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-value">{subjects.length}</span>
              <span className="stat-label">مادة</span>
            </div>
            <div className="stat">
              <span className="stat-value">{teachers.length}</span>
              <span className="stat-label">معلم</span>
            </div>
            <div className="stat">
              <span className="stat-value">150+</span>
              <span className="stat-label">درس</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="tabs-container">
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'subjects' ? 'active' : ''}`}
            onClick={() => setActiveTab('subjects')}
          >
            <BookOpen size={18} />
            المواد الدراسية
          </button>
          <button 
            className={`tab ${activeTab === 'teachers' ? 'active' : ''}`}
            onClick={() => setActiveTab('teachers')}
          >
            <Users size={18} />
            المدرسين
          </button>
          <button 
            className={`tab ${activeTab === 'courses' ? 'active' : ''}`}
            onClick={() => setActiveTab('courses')}
          >
            <Video size={18} />
            الكورسات المميزة
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="content-container">
        {/* Subjects Tab */}
        {activeTab === 'subjects' && (
          <div className="subjects-grid animate-fadeIn">
            {subjects.map((subject, index) => (
              <Link 
                href={`/years/${yearId}/subjects/${subject.id}`}
                key={subject.id} 
                className="subject-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="subject-icon" style={{ backgroundColor: `${subject.color}15` }}>
                  <span>{subject.icon}</span>
                </div>
                <div className="subject-info">
                  <h3>{subject.name}</h3>
                  <div className="subject-stats">
                    <span><Users size={14} /> {subject.teachers} معلم</span>
                    <span><Video size={14} /> {subject.lessons} درس</span>
                  </div>
                </div>
                <div className="subject-arrow" style={{ backgroundColor: subject.color }}>
                  <ChevronLeft size={20} />
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Teachers Tab */}
        {activeTab === 'teachers' && (
          <div className="teachers-grid animate-fadeIn">
            {teachers.map((teacher, index) => (
              <div key={teacher.id} className="teacher-card" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="teacher-avatar">{teacher.avatar}</div>
                <h3>{teacher.name}</h3>
                <span className="teacher-subject">{teacher.subject}</span>
                <div className="teacher-stats">
                  <div className="stat-item">
                    <Star size={16} fill="#eab308" color="#eab308" />
                    <span>{teacher.rating}</span>
                  </div>
                  <div className="stat-item">
                    <Users size={16} />
                    <span>{teacher.students}</span>
                  </div>
                </div>
                <Link href={`/teachers/${teacher.id}`} className="btn-view">
                  عرض الدروس
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* Courses Tab */}
        {activeTab === 'courses' && (
          <div className="courses-grid animate-fadeIn">
            {featuredCourses.map((course, index) => (
              <div key={course.id} className="course-card" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="course-image">
                  <Play size={32} />
                </div>
                <div className="course-content">
                  <h3>{course.title}</h3>
                  <span className="course-teacher">{course.teacher}</span>
                  <div className="course-meta">
                    <span><Video size={14} /> {course.lessons} درس</span>
                    <span><Clock size={14} /> {course.duration}</span>
                  </div>
                  <div className="course-footer">
                    <span className="course-price">{course.price} ج.م</span>
                    <button className="btn-enroll">اشترك الآن</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .page-wrapper {
          min-height: 100vh;
          background: linear-gradient(180deg, var(--bg-gradient-start) 0%, var(--bg-gradient-end) 100%);
        }

        .header {
          position: sticky;
          top: 0;
          z-index: 100;
          background: var(--header-bg);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border-color);
        }

        .header-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 16px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .back-link {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-secondary);
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s;
        }

        .back-link:hover {
          color: var(--accent);
        }

        /* Hero */
        .hero {
          text-align: center;
          padding: 60px 24px;
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1));
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--accent-light);
          color: var(--accent);
          padding: 8px 16px;
          border-radius: 50px;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 16px;
        }

        .hero h1 {
          font-size: 40px;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 12px;
        }

        .hero p {
          font-size: 18px;
          color: var(--text-muted);
          margin-bottom: 32px;
        }

        .hero-stats {
          display: flex;
          justify-content: center;
          gap: 48px;
        }

        .stat {
          text-align: center;
        }

        .stat-value {
          display: block;
          font-size: 36px;
          font-weight: 800;
          color: var(--text-primary);
        }

        .stat-label {
          font-size: 14px;
          color: var(--text-muted);
        }

        /* Tabs */
        .tabs-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 24px 24px 0;
        }

        .tabs {
          display: flex;
          gap: 8px;
          background: var(--card-bg);
          padding: 8px;
          border-radius: 16px;
          border: 1px solid var(--card-border);
          width: fit-content;
        }

        .tab {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          border: none;
          border-radius: 12px;
          background: transparent;
          color: var(--text-secondary);
          font-weight: 600;
          font-size: 15px;
          cursor: pointer;
          transition: all 0.3s;
        }

        .tab:hover {
          color: var(--accent);
        }

        .tab.active {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: white;
        }

        /* Content */
        .content-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 32px 24px 60px;
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Subjects Grid */
        .subjects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 16px;
        }

        .subject-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px;
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          border-radius: 20px;
          text-decoration: none;
          transition: all 0.3s;
        }

        .subject-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 30px var(--shadow-lg);
        }

        .subject-icon {
          width: 60px;
          height: 60px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
        }

        .subject-info {
          flex: 1;
        }

        .subject-info h3 {
          font-size: 18px;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 8px;
        }

        .subject-stats {
          display: flex;
          gap: 16px;
          font-size: 13px;
          color: var(--text-muted);
        }

        .subject-stats span {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .subject-arrow {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        /* Teachers Grid */
        .teachers-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
        }

        .teacher-card {
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          border-radius: 20px;
          padding: 28px;
          text-align: center;
          transition: all 0.3s;
        }

        .teacher-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 15px 40px var(--shadow-lg);
        }

        .teacher-avatar {
          font-size: 56px;
          margin-bottom: 16px;
        }

        .teacher-card h3 {
          font-size: 18px;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 8px;
        }

        .teacher-subject {
          display: inline-block;
          background: var(--accent-light);
          color: var(--accent);
          padding: 4px 12px;
          border-radius: 50px;
          font-size: 13px;
          font-weight: 500;
          margin-bottom: 16px;
        }

        .teacher-stats {
          display: flex;
          justify-content: center;
          gap: 24px;
          margin-bottom: 20px;
        }

        .stat-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          color: var(--text-secondary);
        }

        .btn-view {
          display: block;
          padding: 12px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border-radius: 12px;
          color: white;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s;
        }

        .btn-view:hover {
          transform: scale(1.02);
        }

        /* Courses Grid */
        .courses-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 20px;
        }

        .course-card {
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          border-radius: 20px;
          overflow: hidden;
          transition: all 0.3s;
        }

        .course-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 30px var(--shadow-lg);
        }

        .course-image {
          height: 160px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .course-content {
          padding: 20px;
        }

        .course-content h3 {
          font-size: 18px;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 8px;
        }

        .course-teacher {
          font-size: 14px;
          color: var(--text-muted);
          display: block;
          margin-bottom: 12px;
        }

        .course-meta {
          display: flex;
          gap: 16px;
          font-size: 13px;
          color: var(--text-secondary);
          margin-bottom: 16px;
        }

        .course-meta span {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .course-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 16px;
          border-top: 1px solid var(--card-border);
        }

        .course-price {
          font-size: 22px;
          font-weight: 700;
          color: var(--accent);
        }

        .btn-enroll {
          padding: 10px 24px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border: none;
          border-radius: 12px;
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }

        .btn-enroll:hover {
          transform: scale(1.05);
        }

        @media (max-width: 640px) {
          .hero h1 {
            font-size: 28px;
          }

          .hero-stats {
            gap: 24px;
          }

          .tabs {
            width: 100%;
            overflow-x: auto;
          }

          .tab {
            padding: 10px 16px;
            font-size: 13px;
          }
        }
      `}</style>
    </div>
  );
}


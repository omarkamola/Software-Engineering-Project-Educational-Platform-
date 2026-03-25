'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { 
  BookOpen, User, GraduationCap, Search, Play, Star, Users, 
  Award, TrendingUp, ChevronLeft, BookMarked, Video, FileText,
  Clock, CheckCircle
} from 'lucide-react';
import { courseAPI } from '@/lib/api';
import ThemeToggle from '@/components/ThemeToggle';

// السنوات الدراسية
const academicYears = [
  { id: 1, name: 'الصف الأول الابتدائي', icon: '1️⃣', color: '#3b82f6', students: 1250 },
  { id: 2, name: 'الصف الثاني الابتدائي', icon: '2️⃣', color: '#10b981', students: 1180 },
  { id: 3, name: 'الصف الثالث الابتدائي', icon: '3️⃣', color: '#f59e0b', students: 1320 },
  { id: 4, name: 'الصف الأول الإعدادي', icon: '🔵', color: '#6366f1', students: 980 },
  { id: 5, name: 'الصف الثاني الإعدادي', icon: '🟣', color: '#8b5cf6', students: 1050 },
  { id: 6, name: 'الصف الثالث الإعدادي', icon: '🔴', color: '#ef4444', students: 1420 },
  { id: 7, name: 'الصف الأول الثانوي', icon: '🌟', color: '#ec4899', students: 890 },
  { id: 8, name: 'الصف الثاني الثانوي', icon: '⭐', color: '#14b8a6', students: 760 },
  { id: 9, name: 'الصف الثالث الثانوي', icon: '🏆', color: '#f97316', students: 2100 },
];

// المدرسين المميزين
const featuredTeachers = [
  { id: 1, name: 'أ/ محمد أحمد', subject: 'رياضيات', rating: 4.9, students: 5200, image: '👨‍🏫' },
  { id: 2, name: 'أ/ سارة محمود', subject: 'لغة عربية', rating: 4.8, students: 4800, image: '👩‍🏫' },
  { id: 3, name: 'أ/ أحمد علي', subject: 'فيزياء', rating: 4.9, students: 3900, image: '👨‍🔬' },
  { id: 4, name: 'أ/ منى حسن', subject: 'كيمياء', rating: 4.7, students: 3200, image: '👩‍🔬' },
];

// منتجات المتجر
const storeProducts = [
  { id: 1, name: 'مذكرة الرياضيات الشاملة', price: 50, type: 'مذكرة', icon: '📘' },
  { id: 2, name: 'مراجعة نهائية فيزياء', price: 40, type: 'مراجعة', icon: '📗' },
  { id: 3, name: 'بنك أسئلة كيمياء', price: 35, type: 'بنك أسئلة', icon: '📙' },
  { id: 4, name: 'ملخص اللغة العربية', price: 45, type: 'ملخص', icon: '📕' },
];

export default function HomePage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    fetchCourses();
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await courseAPI.getAll();
      setCourses(res.data || []);
    } catch (err) {
      console.error('فشل تحميل الدورات');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      {/* Header */}
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
          <Link href="/" className="logo">
            <Image src="/logo.png" alt="Nexus Edu Logo" width={150} height={50} className="object-contain" priority />
          </Link>

          <nav className="nav-links">
            <Link href="/years" className="nav-link">السنوات الدراسية</Link>
            <Link href="/teachers" className="nav-link">المدرسين</Link>
            <Link href="/store" className="nav-link">المتجر</Link>
          </nav>

          <div className="header-actions">
            <ThemeToggle />
            <Link href="/login" className="btn-outline">تسجيل الدخول</Link>
            <Link href="/register" className="btn-primary">ابدأ الآن</Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-shape shape-1"></div>
          <div className="hero-shape shape-2"></div>
          <div className="hero-shape shape-3"></div>
        </div>
        
        <div className="hero-content">
          <div className="hero-badge animate-fadeInUp">
            <Award size={18} />
            <span>أكثر من 10,000 طالب يتعلمون معنا</span>
          </div>
          
          <h1 className="hero-title animate-fadeInUp stagger-1">
            تعلّم مع <span className="gradient-text">أفضل المعلمين</span>
            <br />في مصر والوطن العربي
          </h1>
          
          <p className="hero-subtitle animate-fadeInUp stagger-2">
            منصة تعليمية متكاملة تقدم دروس مباشرة، مذكرات، كويزات، وواجبات
          </p>

          <div className="hero-search animate-fadeInUp stagger-3">
            <Search size={22} className="search-icon" />
            <input
              type="text"
              placeholder="ابحث عن مادة، معلم، أو درس..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-btn">بحث</button>
          </div>

          <div className="hero-stats animate-fadeInUp stagger-4">
            <div className="hero-stat">
              <span className="stat-value">{courses.length || '50'}+</span>
              <span className="stat-label">كورس</span>
            </div>
            <div className="stat-divider"></div>
            <div className="hero-stat">
              <span className="stat-value">20+</span>
              <span className="stat-label">معلم</span>
            </div>
            <div className="stat-divider"></div>
            <div className="hero-stat">
              <span className="stat-value">10K+</span>
              <span className="stat-label">طالب</span>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Years Section */}
      <section className="section years-section">
        <div className="section-header">
          <div>
            <h2 className="section-title">السنوات الدراسية</h2>
            <p className="section-subtitle">اختر سنتك الدراسية وابدأ التعلم</p>
          </div>
          <Link href="/years" className="view-all">
            عرض الكل <ChevronLeft size={18} />
          </Link>
        </div>

        <div className="years-grid">
          {academicYears.map((year, index) => (
            <Link 
              href={`/years/${year.id}`} 
              key={year.id} 
              className="year-card animate-fadeInUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="year-icon" style={{ backgroundColor: `${year.color}15` }}>
                <span>{year.icon}</span>
              </div>
              <div className="year-info">
                <h3>{year.name}</h3>
                <span className="year-students">
                  <Users size={14} /> {year.students} طالب
                </span>
              </div>
              <ChevronLeft size={20} className="year-arrow" />
            </Link>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="section features-section">
        <div className="features-grid">
          {[
            { icon: Video, title: 'دروس مباشرة', desc: 'حضور دروس لايف مع المعلم', color: '#6366f1' },
            { icon: FileText, title: 'مذكرات PDF', desc: 'تحميل مذكرات وملخصات', color: '#10b981' },
            { icon: CheckCircle, title: 'كويزات تفاعلية', desc: 'اختبر نفسك بعد كل درس', color: '#f59e0b' },
            { icon: BookMarked, title: 'واجبات منزلية', desc: 'تسليم ومتابعة الواجبات', color: '#ec4899' },
          ].map((feature, index) => (
            <div key={index} className="feature-card animate-fadeInScale" style={{ animationDelay: `${index * 0.15}s` }}>
              <div className="feature-icon" style={{ backgroundColor: `${feature.color}15`, color: feature.color }}>
                <feature.icon size={28} />
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Teachers */}
      <section className="section teachers-section">
        <div className="section-header">
          <div>
            <h2 className="section-title">المدرسين المميزين</h2>
            <p className="section-subtitle">تعلم من أفضل المعلمين في مصر</p>
          </div>
          <Link href="/teachers" className="view-all">
            عرض الكل <ChevronLeft size={18} />
          </Link>
        </div>

        <div className="teachers-grid">
          {featuredTeachers.map((teacher, index) => (
            <div key={teacher.id} className="teacher-card animate-fadeInUp" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="teacher-avatar">{teacher.image}</div>
              <h3>{teacher.name}</h3>
              <span className="teacher-subject">{teacher.subject}</span>
              <div className="teacher-stats">
                <div className="teacher-rating">
                  <Star size={16} fill="#eab308" color="#eab308" />
                  <span>{teacher.rating}</span>
                </div>
                <div className="teacher-students">
                  <Users size={16} />
                  <span>{teacher.students}</span>
                </div>
              </div>
              <button className="btn-teacher">عرض الدروس</button>
            </div>
          ))}
        </div>
      </section>

      {/* Store Section */}
      <section className="section store-section">
        <div className="section-header">
          <div>
            <h2 className="section-title">متجر المذكرات</h2>
            <p className="section-subtitle">مذكرات ومراجعات من أفضل المعلمين</p>
          </div>
          <Link href="/store" className="view-all">
            عرض الكل <ChevronLeft size={18} />
          </Link>
        </div>

        <div className="store-grid">
          {storeProducts.map((product, index) => (
            <div key={product.id} className="product-card animate-fadeInUp" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="product-icon">{product.icon}</div>
              <span className="product-type">{product.type}</span>
              <h3>{product.name}</h3>
              <div className="product-footer">
                <span className="product-price">{product.price} ج.م</span>
                <button className="btn-buy">شراء</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>هل أنت معلم؟</h2>
          <p>انضم لمنصتنا وابدأ بتقديم دروسك لآلاف الطلاب</p>
          <Link href="/teacher-register" className="btn-cta">
            انضم كمعلم
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
              <Image src="/logo.png" alt="Nexus Edu Logo" width={150} height={50} className="object-contain" />
            <p>منصة تعليمية متكاملة لجميع المراحل الدراسية</p>
          </div>
          <div className="footer-links">
            <h4>روابط سريعة</h4>
            <Link href="/years">السنوات الدراسية</Link>
            <Link href="/teachers">المدرسين</Link>
            <Link href="/store">المتجر</Link>
          </div>
          <div className="footer-links">
            <h4>الدعم</h4>
            <Link href="/contact">تواصل معنا</Link>
            <Link href="/faq">الأسئلة الشائعة</Link>
            <Link href="/terms">الشروط والأحكام</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 منصة التعليم العربية. جميع الحقوق محفوظة.</p>
        </div>
      </footer>

      <style jsx>{`
        .page-wrapper {
          min-height: 100vh;
          background: linear-gradient(180deg, var(--bg-gradient-start) 0%, var(--bg-gradient-end) 100%);
        }

        /* Header */
        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          padding: 16px 0;
          transition: all 0.3s ease;
        }

        .header.scrolled {
          background: var(--header-bg);
          backdrop-filter: blur(20px);
          box-shadow: 0 4px 30px var(--shadow);
          padding: 12px 0;
        }

        .header-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
        }

        .logo-icon {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 8px 25px rgba(99, 102, 241, 0.35);
        }

        .logo-text {
          display: flex;
          flex-direction: column;
        }

        .logo-title {
          font-size: 20px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .logo-subtitle {
          font-size: 12px;
          color: var(--text-muted);
        }

        .nav-links {
          display: flex;
          gap: 32px;
        }

        .nav-link {
          color: var(--text-secondary);
          text-decoration: none;
          font-weight: 500;
          font-size: 15px;
          transition: color 0.3s;
        }

        .nav-link:hover {
          color: var(--accent);
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .btn-outline {
          padding: 10px 20px;
          border: 2px solid var(--border-color);
          border-radius: 12px;
          color: var(--text-primary);
          text-decoration: none;
          font-weight: 600;
          font-size: 14px;
          transition: all 0.3s;
        }

        .btn-outline:hover {
          border-color: var(--accent);
          color: var(--accent);
        }

        .btn-primary {
          padding: 10px 24px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border-radius: 12px;
          color: white;
          text-decoration: none;
          font-weight: 600;
          font-size: 14px;
          box-shadow: 0 4px 15px rgba(99, 102, 241, 0.35);
          transition: all 0.3s;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(99, 102, 241, 0.45);
        }

        /* Hero */
        .hero {
          position: relative;
          padding: 160px 24px 80px;
          text-align: center;
          overflow: hidden;
        }

        .hero-bg {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }

        .hero-shape {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.5;
        }

        .shape-1 {
          width: 400px;
          height: 400px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          top: -100px;
          right: -100px;
          animation: float 8s ease-in-out infinite;
        }

        .shape-2 {
          width: 300px;
          height: 300px;
          background: linear-gradient(135deg, #ec4899, #f472b6);
          bottom: 0;
          left: -50px;
          animation: float 6s ease-in-out infinite reverse;
        }

        .shape-3 {
          width: 200px;
          height: 200px;
          background: linear-gradient(135deg, #10b981, #34d399);
          top: 50%;
          left: 50%;
          animation: float 7s ease-in-out infinite;
        }

        .hero-content {
          position: relative;
          z-index: 1;
          max-width: 800px;
          margin: 0 auto;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--accent-light);
          color: var(--accent);
          padding: 10px 20px;
          border-radius: 50px;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 24px;
        }

        .hero-title {
          font-size: 52px;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1.2;
          margin-bottom: 20px;
        }

        .hero-subtitle {
          font-size: 20px;
          color: var(--text-muted);
          margin-bottom: 40px;
          line-height: 1.6;
        }

        .hero-search {
          display: flex;
          align-items: center;
          max-width: 600px;
          margin: 0 auto 40px;
          background: var(--card-bg);
          border: 2px solid var(--border-color);
          border-radius: 16px;
          padding: 8px;
          box-shadow: 0 10px 40px var(--shadow);
        }

        .search-icon {
          margin: 0 16px;
          color: var(--text-muted);
        }

        .hero-search input {
          flex: 1;
          border: none;
          background: transparent;
          font-size: 16px;
          padding: 12px 0;
        }

        .search-btn {
          padding: 12px 32px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border: none;
          border-radius: 12px;
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }

        .search-btn:hover {
          transform: scale(1.02);
        }

        .hero-stats {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 32px;
        }

        .hero-stat {
          text-align: center;
        }

        .stat-value {
          display: block;
          font-size: 32px;
          font-weight: 800;
          color: var(--text-primary);
        }

        .stat-label {
          font-size: 14px;
          color: var(--text-muted);
        }

        .stat-divider {
          width: 1px;
          height: 40px;
          background: var(--border-color);
        }

        /* Sections */
        .section {
          max-width: 1280px;
          margin: 0 auto;
          padding: 60px 24px;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 32px;
        }

        .section-title {
          font-size: 28px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 8px;
        }

        .section-subtitle {
          color: var(--text-muted);
          font-size: 16px;
        }

        .view-all {
          display: flex;
          align-items: center;
          gap: 4px;
          color: var(--accent);
          text-decoration: none;
          font-weight: 600;
          font-size: 15px;
        }

        /* Years Grid */
        .years-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .year-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px;
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          border-radius: 16px;
          text-decoration: none;
          transition: all 0.3s;
        }

        .year-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 30px var(--shadow-lg);
          border-color: var(--accent);
        }

        .year-icon {
          width: 56px;
          height: 56px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
        }

        .year-info {
          flex: 1;
        }

        .year-info h3 {
          font-size: 16px;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 4px;
        }

        .year-students {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: var(--text-muted);
        }

        .year-arrow {
          color: var(--text-muted);
          transition: transform 0.3s;
        }

        .year-card:hover .year-arrow {
          transform: translateX(-4px);
          color: var(--accent);
        }

        /* Features */
        .features-section {
          background: var(--card-bg);
          border-radius: 24px;
          margin: 0 24px;
          max-width: calc(1280px - 48px);
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        .feature-card {
          text-align: center;
          padding: 32px 20px;
        }

        .feature-icon {
          width: 64px;
          height: 64px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
        }

        .feature-card h3 {
          font-size: 18px;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 8px;
        }

        .feature-card p {
          font-size: 14px;
          color: var(--text-muted);
        }

        /* Teachers */
        .teachers-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
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
          margin-bottom: 4px;
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
          gap: 20px;
          margin-bottom: 16px;
        }

        .teacher-rating, .teacher-students {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          color: var(--text-secondary);
        }

        .btn-teacher {
          width: 100%;
          padding: 12px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border: none;
          border-radius: 12px;
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }

        .btn-teacher:hover {
          transform: scale(1.02);
        }

        /* Store */
        .store-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        .product-card {
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          border-radius: 20px;
          padding: 24px;
          text-align: center;
          transition: all 0.3s;
        }

        .product-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 30px var(--shadow-lg);
        }

        .product-icon {
          font-size: 48px;
          margin-bottom: 12px;
        }

        .product-type {
          display: inline-block;
          background: var(--bg-secondary);
          padding: 4px 12px;
          border-radius: 50px;
          font-size: 12px;
          color: var(--text-muted);
          margin-bottom: 12px;
        }

        .product-card h3 {
          font-size: 16px;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 16px;
        }

        .product-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .product-price {
          font-size: 20px;
          font-weight: 700;
          color: var(--accent);
        }

        .btn-buy {
          padding: 8px 20px;
          background: var(--accent);
          border: none;
          border-radius: 10px;
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }

        .btn-buy:hover {
          transform: scale(1.05);
        }

        /* CTA */
        .cta-section {
          margin: 60px 24px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border-radius: 24px;
          padding: 60px;
          text-align: center;
          max-width: calc(1280px - 48px);
          margin-left: auto;
          margin-right: auto;
        }

        .cta-content h2 {
          font-size: 32px;
          font-weight: 700;
          color: white;
          margin-bottom: 12px;
        }

        .cta-content p {
          color: rgba(255,255,255,0.8);
          font-size: 18px;
          margin-bottom: 24px;
        }

        .btn-cta {
          display: inline-block;
          padding: 14px 36px;
          background: white;
          border-radius: 14px;
          color: #6366f1;
          text-decoration: none;
          font-weight: 700;
          font-size: 16px;
          transition: all 0.3s;
        }

        .btn-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }

        /* Footer */
        .footer {
          background: var(--card-bg);
          border-top: 1px solid var(--border-color);
          padding: 60px 24px 24px;
          margin-top: 60px;
        }

        .footer-content {
          max-width: 1280px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 48px;
          margin-bottom: 40px;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          color: var(--accent);
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 16px;
        }

        .footer-brand p {
          color: var(--text-muted);
          line-height: 1.6;
        }

        .footer-links h4 {
          font-size: 16px;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 16px;
        }

        .footer-links a {
          display: block;
          color: var(--text-muted);
          text-decoration: none;
          margin-bottom: 12px;
          transition: color 0.3s;
        }

        .footer-links a:hover {
          color: var(--accent);
        }

        .footer-bottom {
          text-align: center;
          padding-top: 24px;
          border-top: 1px solid var(--border-color);
        }

        .footer-bottom p {
          color: var(--text-muted);
          font-size: 14px;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .years-grid, .features-grid, .teachers-grid, .store-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .nav-links {
            display: none;
          }
        }

        @media (max-width: 640px) {
          .hero-title {
            font-size: 32px;
          }
          
          .years-grid, .features-grid, .teachers-grid, .store-grid {
            grid-template-columns: 1fr;
          }
          
          .footer-content {
            grid-template-columns: 1fr;
          }
          
          .btn-outline {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}

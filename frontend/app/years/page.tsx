'use client';

import Link from 'next/link';
import { useState } from 'react';
import { GraduationCap, Users, BookOpen, ChevronLeft, ArrowRight } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';

const stages = [
  {
    id: 'primary',
    name: 'المرحلة الابتدائية',
    icon: '🎒',
    color: '#3b82f6',
    years: [
      { id: 1, name: 'الصف الأول الابتدائي', students: 1250, courses: 12 },
      { id: 2, name: 'الصف الثاني الابتدائي', students: 1180, courses: 14 },
      { id: 3, name: 'الصف الثالث الابتدائي', students: 1320, courses: 15 },
      { id: 4, name: 'الصف الرابع الابتدائي', students: 1450, courses: 18 },
      { id: 5, name: 'الصف الخامس الابتدائي', students: 1380, courses: 20 },
      { id: 6, name: 'الصف السادس الابتدائي', students: 1520, courses: 22 },
    ]
  },
  {
    id: 'preparatory',
    name: 'المرحلة الإعدادية',
    icon: '📚',
    color: '#8b5cf6',
    years: [
      { id: 7, name: 'الصف الأول الإعدادي', students: 980, courses: 16 },
      { id: 8, name: 'الصف الثاني الإعدادي', students: 1050, courses: 18 },
      { id: 9, name: 'الصف الثالث الإعدادي', students: 1420, courses: 24 },
    ]
  },
  {
    id: 'secondary',
    name: 'المرحلة الثانوية',
    icon: '🎓',
    color: '#ec4899',
    years: [
      { id: 10, name: 'الصف الأول الثانوي', students: 890, courses: 20 },
      { id: 11, name: 'الصف الثاني الثانوي', students: 760, courses: 22 },
      { id: 12, name: 'الصف الثالث الثانوي', students: 2100, courses: 30 },
    ]
  }
];

export default function YearsPage() {
  const [selectedStage, setSelectedStage] = useState('all');

  const filteredStages = selectedStage === 'all' 
    ? stages 
    : stages.filter(s => s.id === selectedStage);

  return (
    <div className="page-wrapper">
      {/* Header */}
      <header className="header">
        <div className="header-container">
          <Link href="/" className="back-link">
            <ArrowRight size={20} />
            <span>الرئيسية</span>
          </Link>
          
          <div className="header-center">
            <GraduationCap size={28} />
            <span>السنوات الدراسية</span>
          </div>
          
          <ThemeToggle />
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <h1>اختر سنتك الدراسية</h1>
        <p>تصفح جميع المراحل الدراسية واختر الصف المناسب لك</p>
      </section>

      {/* Filters */}
      <div className="filters">
        <button 
          className={`filter-btn ${selectedStage === 'all' ? 'active' : ''}`}
          onClick={() => setSelectedStage('all')}
        >
          الكل
        </button>
        {stages.map(stage => (
          <button
            key={stage.id}
            className={`filter-btn ${selectedStage === stage.id ? 'active' : ''}`}
            onClick={() => setSelectedStage(stage.id)}
            style={{ '--accent-color': stage.color } as any}
          >
            {stage.icon} {stage.name}
          </button>
        ))}
      </div>

      {/* Stages */}
      <div className="stages-container">
        {filteredStages.map((stage, stageIndex) => (
          <section key={stage.id} className="stage-section" style={{ animationDelay: `${stageIndex * 0.2}s` }}>
            <div className="stage-header">
              <div className="stage-icon" style={{ backgroundColor: `${stage.color}15`, color: stage.color }}>
                <span>{stage.icon}</span>
              </div>
              <h2>{stage.name}</h2>
            </div>

            <div className="years-grid">
              {stage.years.map((year, yearIndex) => (
                <Link 
                  href={`/years/${year.id}`} 
                  key={year.id} 
                  className="year-card"
                  style={{ 
                    animationDelay: `${(stageIndex * 0.2) + (yearIndex * 0.1)}s`,
                    '--card-color': stage.color 
                  } as any}
                >
                  <div className="year-content">
                    <h3>{year.name}</h3>
                    <div className="year-stats">
                      <div className="year-stat">
                        <Users size={16} />
                        <span>{year.students} طالب</span>
                      </div>
                      <div className="year-stat">
                        <BookOpen size={16} />
                        <span>{year.courses} كورس</span>
                      </div>
                    </div>
                  </div>
                  <div className="year-arrow">
                    <ChevronLeft size={24} />
                  </div>
                  <div className="year-decoration"></div>
                </Link>
              ))}
            </div>
          </section>
        ))}
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

        .header-center {
          display: flex;
          align-items: center;
          gap: 12px;
          color: var(--text-primary);
          font-size: 20px;
          font-weight: 700;
        }

        .hero {
          text-align: center;
          padding: 60px 24px 40px;
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
        }

        .filters {
          display: flex;
          justify-content: center;
          gap: 12px;
          padding: 0 24px 40px;
          flex-wrap: wrap;
        }

        .filter-btn {
          padding: 12px 24px;
          background: var(--card-bg);
          border: 2px solid var(--border-color);
          border-radius: 50px;
          color: var(--text-secondary);
          font-weight: 600;
          font-size: 15px;
          cursor: pointer;
          transition: all 0.3s;
        }

        .filter-btn:hover {
          border-color: var(--accent);
          color: var(--accent);
        }

        .filter-btn.active {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border-color: transparent;
          color: white;
        }

        .stages-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px 60px;
        }

        .stage-section {
          margin-bottom: 48px;
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .stage-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 24px;
        }

        .stage-icon {
          width: 56px;
          height: 56px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
        }

        .stage-header h2 {
          font-size: 24px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .years-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 16px;
        }

        .year-card {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px;
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          border-radius: 20px;
          text-decoration: none;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }

        .year-card:hover {
          transform: translateY(-4px) translateX(-4px);
          box-shadow: 8px 12px 30px var(--shadow-lg);
          border-color: var(--card-color);
        }

        .year-decoration {
          position: absolute;
          top: 0;
          left: 0;
          width: 4px;
          height: 100%;
          background: var(--card-color);
          transform: scaleY(0);
          transition: transform 0.4s ease;
        }

        .year-card:hover .year-decoration {
          transform: scaleY(1);
        }

        .year-content h3 {
          font-size: 18px;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 12px;
        }

        .year-stats {
          display: flex;
          gap: 20px;
        }

        .year-stat {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          color: var(--text-muted);
        }

        .year-arrow {
          width: 44px;
          height: 44px;
          background: var(--bg-secondary);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
          transition: all 0.3s;
        }

        .year-card:hover .year-arrow {
          background: var(--card-color);
          color: white;
          transform: translateX(-4px);
        }

        @media (max-width: 640px) {
          .hero h1 {
            font-size: 28px;
          }

          .filters {
            gap: 8px;
          }

          .filter-btn {
            padding: 10px 16px;
            font-size: 13px;
          }

          .years-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}


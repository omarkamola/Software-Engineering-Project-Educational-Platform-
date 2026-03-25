'use client';

import Link from 'next/link';
import { useState } from 'react';
import { 
  GraduationCap, User, Mail, Phone, Lock, Key, 
  BookOpen, ArrowRight, CheckCircle, AlertCircle
} from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function TeacherRegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [codeVerified, setCodeVerified] = useState(false);
  
  const [formData, setFormData] = useState({
    teacherCode: '',
    assistantCode: '',
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    subject: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const verifyCode = async () => {
    if (!formData.teacherCode) {
      setErrors({ ...errors, teacherCode: 'برجاء إدخال كود المعلم' });
      return;
    }

    setLoading(true);
    
    // محاكاة التحقق من الكود
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // أكواد صالحة للتجربة
    const validCodes = ['TEACHER2024', 'EDU123', 'PROF456'];
    
    if (validCodes.includes(formData.teacherCode.toUpperCase())) {
      setCodeVerified(true);
      setStep(2);
      toast.success('تم التحقق من الكود بنجاح!');
    } else {
      setErrors({ ...errors, teacherCode: 'كود غير صالح. تواصل مع الإدارة للحصول على كود' });
      toast.error('كود غير صالح');
    }
    
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const newErrors: Record<string, string> = {};
    if (!formData.fullName) newErrors.fullName = 'الاسم مطلوب';
    if (!formData.email) newErrors.email = 'البريد الإلكتروني مطلوب';
    if (!formData.phone) newErrors.phone = 'رقم الهاتف مطلوب';
    if (!formData.subject) newErrors.subject = 'المادة مطلوبة';
    if (!formData.password) newErrors.password = 'كلمة المرور مطلوبة';
    if (formData.password.length < 6) newErrors.password = 'كلمة المرور يجب أن تكون 6 أحرف على الأقل';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'كلمة المرور غير متطابقة';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    
    // محاكاة التسجيل
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast.success('تم تسجيل حسابك بنجاح! يرجى انتظار موافقة الإدارة');
    router.push('/login');
  };

  return (
    <div className="page-wrapper">
      {/* Header */}
      <header className="header">
        <div className="header-container">
          <Link href="/" className="back-link">
            <ArrowRight size={20} />
            <span>الرئيسية</span>
          </Link>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <div className="register-container">
          {/* Logo & Title */}
          <div className="header-section">
            <div className="flex justify-center mb-6">
              <Image src="/logo.png" alt="Nexus Edu Logo" width={100} height={100} className="object-contain" />
            </div>
            <h1>تسجيل معلم جديد</h1>
            <p>انضم لمنصتنا وابدأ بتقديم دروسك لآلاف الطلاب</p>
          </div>

          {/* Progress Steps */}
          <div className="progress-steps">
            <div className={`step ${step >= 1 ? 'active' : ''} ${codeVerified ? 'completed' : ''}`}>
              <div className="step-icon">
                {codeVerified ? <CheckCircle size={20} /> : <Key size={20} />}
              </div>
              <span>التحقق من الكود</span>
            </div>
            <div className="step-line"></div>
            <div className={`step ${step >= 2 ? 'active' : ''}`}>
              <div className="step-icon">
                <User size={20} />
              </div>
              <span>البيانات الشخصية</span>
            </div>
          </div>

          {/* Step 1: Code Verification */}
          {step === 1 && (
            <div className="step-content animate-fadeIn">
              <div className="info-box">
                <AlertCircle size={20} />
                <p>للتسجيل كمعلم، يجب أن يكون لديك كود خاص من الإدارة. تواصل معنا للحصول على الكود.</p>
              </div>

              <div className="form-group">
                <label>
                  <Key size={18} />
                  كود المعلم
                </label>
                <input
                  type="text"
                  name="teacherCode"
                  placeholder="أدخل كود المعلم الخاص بك"
                  value={formData.teacherCode}
                  onChange={handleChange}
                  className={errors.teacherCode ? 'error' : ''}
                />
                {errors.teacherCode && <span className="error-text">{errors.teacherCode}</span>}
              </div>

              <div className="form-group">
                <label>
                  <Key size={18} />
                  كود المساعد (اختياري)
                </label>
                <input
                  type="text"
                  name="assistantCode"
                  placeholder="إذا كان لديك كود مساعد"
                  value={formData.assistantCode}
                  onChange={handleChange}
                />
                <span className="helper-text">كود المساعد يمنحك صلاحيات إضافية في إدارة الدروس</span>
              </div>

              <button 
                className="btn-primary"
                onClick={verifyCode}
                disabled={loading}
              >
                {loading ? (
                  <span className="loading-spinner"></span>
                ) : (
                  'تحقق من الكود'
                )}
              </button>
            </div>
          )}

          {/* Step 2: Personal Info */}
          {step === 2 && (
            <form onSubmit={handleSubmit} className="step-content animate-fadeIn">
              <div className="form-row">
                <div className="form-group">
                  <label>
                    <User size={18} />
                    الاسم الكامل
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="أدخل اسمك الكامل"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={errors.fullName ? 'error' : ''}
                  />
                  {errors.fullName && <span className="error-text">{errors.fullName}</span>}
                </div>

                <div className="form-group">
                  <label>
                    <BookOpen size={18} />
                    المادة الدراسية
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={errors.subject ? 'error' : ''}
                  >
                    <option value="">اختر المادة</option>
                    <option value="math">الرياضيات</option>
                    <option value="arabic">اللغة العربية</option>
                    <option value="english">اللغة الإنجليزية</option>
                    <option value="science">العلوم</option>
                    <option value="physics">الفيزياء</option>
                    <option value="chemistry">الكيمياء</option>
                    <option value="biology">الأحياء</option>
                  </select>
                  {errors.subject && <span className="error-text">{errors.subject}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>
                    <Mail size={18} />
                    البريد الإلكتروني
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="example@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? 'error' : ''}
                  />
                  {errors.email && <span className="error-text">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label>
                    <Phone size={18} />
                    رقم الهاتف
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="01xxxxxxxxx"
                    value={formData.phone}
                    onChange={handleChange}
                    className={errors.phone ? 'error' : ''}
                  />
                  {errors.phone && <span className="error-text">{errors.phone}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>
                    <Lock size={18} />
                    كلمة المرور
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="********"
                    value={formData.password}
                    onChange={handleChange}
                    className={errors.password ? 'error' : ''}
                  />
                  {errors.password && <span className="error-text">{errors.password}</span>}
                </div>

                <div className="form-group">
                  <label>
                    <Lock size={18} />
                    تأكيد كلمة المرور
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="********"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={errors.confirmPassword ? 'error' : ''}
                  />
                  {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
                </div>
              </div>

              <div className="form-actions">
                <button 
                  type="button" 
                  className="btn-secondary"
                  onClick={() => setStep(1)}
                >
                  رجوع
                </button>
                <button 
                  type="submit" 
                  className="btn-primary"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="loading-spinner"></span>
                  ) : (
                    'إنشاء الحساب'
                  )}
                </button>
              </div>
            </form>
          )}

          {/* Footer Link */}
          <p className="login-link">
            لديك حساب بالفعل؟{' '}
            <Link href="/login">تسجيل الدخول</Link>
          </p>
        </div>
      </main>

      <style jsx>{`
        .page-wrapper {
          min-height: 100vh;
          background: linear-gradient(180deg, var(--bg-gradient-start) 0%, var(--bg-gradient-end) 100%);
        }

        .header {
          background: var(--header-bg);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border-color);
        }

        .header-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 16px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .back-link {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-secondary);
          text-decoration: none;
          font-weight: 500;
        }

        .main-content {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: calc(100vh - 80px);
          padding: 40px 24px;
        }

        .register-container {
          width: 100%;
          max-width: 640px;
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          border-radius: 24px;
          padding: 40px;
        }

        .header-section {
          text-align: center;
          margin-bottom: 32px;
        }

        .logo-icon {
          width: 72px;
          height: 72px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          margin: 0 auto 20px;
          box-shadow: 0 8px 25px rgba(99, 102, 241, 0.35);
        }

        .header-section h1 {
          font-size: 28px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 8px;
        }

        .header-section p {
          color: var(--text-muted);
          font-size: 16px;
        }

        /* Progress Steps */
        .progress-steps {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 32px;
        }

        .step {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-muted);
          font-size: 14px;
          font-weight: 500;
        }

        .step.active {
          color: var(--accent);
        }

        .step.completed {
          color: #10b981;
        }

        .step-icon {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: var(--bg-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .step.active .step-icon {
          background: var(--accent-light);
        }

        .step.completed .step-icon {
          background: rgba(16, 185, 129, 0.15);
        }

        .step-line {
          width: 60px;
          height: 2px;
          background: var(--border-color);
          margin: 0 16px;
        }

        /* Form */
        .step-content {
          animation: fadeIn 0.5s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .info-box {
          display: flex;
          gap: 12px;
          padding: 16px;
          background: var(--accent-light);
          color: var(--accent);
          border-radius: 12px;
          margin-bottom: 24px;
          font-size: 14px;
          line-height: 1.6;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 8px;
        }

        .form-group input,
        .form-group select {
          width: 100%;
          padding: 14px 16px;
          border: 2px solid var(--border-color);
          border-radius: 12px;
          font-size: 15px;
          transition: all 0.3s;
        }

        .form-group input:focus,
        .form-group select:focus {
          border-color: var(--accent);
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
        }

        .form-group input.error,
        .form-group select.error {
          border-color: #ef4444;
        }

        .error-text {
          font-size: 13px;
          color: #ef4444;
          margin-top: 6px;
          display: block;
        }

        .helper-text {
          font-size: 12px;
          color: var(--text-muted);
          margin-top: 6px;
          display: block;
        }

        .form-actions {
          display: flex;
          gap: 12px;
          margin-top: 24px;
        }

        .btn-primary {
          flex: 1;
          padding: 14px 24px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border: none;
          border-radius: 12px;
          color: white;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .btn-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(99, 102, 241, 0.35);
        }

        .btn-primary:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .btn-secondary {
          padding: 14px 24px;
          background: var(--bg-secondary);
          border: 2px solid var(--border-color);
          border-radius: 12px;
          color: var(--text-primary);
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }

        .btn-secondary:hover {
          border-color: var(--accent);
          color: var(--accent);
        }

        .loading-spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .login-link {
          text-align: center;
          margin-top: 24px;
          color: var(--text-muted);
          font-size: 15px;
        }

        .login-link a {
          color: var(--accent);
          text-decoration: none;
          font-weight: 600;
        }

        @media (max-width: 640px) {
          .register-container {
            padding: 24px;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .progress-steps {
            flex-direction: column;
            gap: 16px;
          }

          .step-line {
            width: 2px;
            height: 30px;
            margin: 0;
          }
        }
      `}</style>
    </div>
  );
}


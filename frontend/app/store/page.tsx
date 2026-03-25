'use client';

import Link from 'next/link';
import { useState } from 'react';
import { 
  ArrowRight, Search, Filter, ShoppingCart, FileText, 
  Download, Star, BookOpen, Tag, Check
} from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import toast from 'react-hot-toast';
import { useCart } from '@/contexts/CartContext';

const categories = [
  { id: 'all', name: 'الكل', icon: '📚' },
  { id: 'notes', name: 'مذكرات', icon: '📘' },
  { id: 'reviews', name: 'مراجعات', icon: '📗' },
  { id: 'exams', name: 'بنوك أسئلة', icon: '📙' },
  { id: 'summaries', name: 'ملخصات', icon: '📕' },
];

const products = [
  {
    id: 1,
    name: 'مذكرة الرياضيات الشاملة - الصف الثالث الثانوي',
    category: 'notes',
    subject: 'رياضيات',
    grade: 'ثالثة ثانوي',
    price: 75,
    oldPrice: 100,
    rating: 4.9,
    sales: 1250,
    pages: 180,
    teacher: 'أ/ محمد أحمد',
    icon: '📐',
    color: '#3b82f6',
    features: ['شرح مبسط', 'أمثلة محلولة', 'تمارين متدرجة'],
  },
  {
    id: 2,
    name: 'مراجعة نهائية فيزياء - الصف الثالث الثانوي',
    category: 'reviews',
    subject: 'فيزياء',
    grade: 'ثالثة ثانوي',
    price: 60,
    oldPrice: 80,
    rating: 4.8,
    sales: 980,
    pages: 120,
    teacher: 'أ/ أحمد علي',
    icon: '⚡',
    color: '#06b6d4',
    features: ['مراجعة شاملة', 'نماذج امتحانات', 'إجابات نموذجية'],
  },
  {
    id: 3,
    name: 'بنك أسئلة كيمياء - جميع الوحدات',
    category: 'exams',
    subject: 'كيمياء',
    grade: 'ثالثة ثانوي',
    price: 50,
    rating: 4.7,
    sales: 750,
    pages: 200,
    teacher: 'أ/ منى حسن',
    icon: '🧪',
    color: '#f97316',
    features: ['1000+ سؤال', 'إجابات تفصيلية', 'تصنيف بالوحدات'],
  },
  {
    id: 4,
    name: 'ملخص النحو والصرف - كل الثانوية',
    category: 'summaries',
    subject: 'لغة عربية',
    grade: 'ثالثة ثانوي',
    price: 45,
    rating: 4.9,
    sales: 1100,
    pages: 80,
    teacher: 'أ/ سارة محمود',
    icon: '📚',
    color: '#10b981',
    features: ['قواعد مختصرة', 'أمثلة تطبيقية', 'خرائط ذهنية'],
  },
  {
    id: 5,
    name: 'مذكرة اللغة الإنجليزية - Grammar & Vocabulary',
    category: 'notes',
    subject: 'إنجليزي',
    grade: 'ثالثة ثانوي',
    price: 65,
    rating: 4.8,
    sales: 890,
    pages: 150,
    teacher: 'أ/ أحمد سعيد',
    icon: '🌍',
    color: '#8b5cf6',
    features: ['Grammar rules', 'Vocabulary lists', 'Practice tests'],
  },
  {
    id: 6,
    name: 'بنك أسئلة أحياء - نظام جديد',
    category: 'exams',
    subject: 'أحياء',
    grade: 'ثالثة ثانوي',
    price: 55,
    rating: 4.6,
    sales: 620,
    pages: 180,
    teacher: 'أ/ هند محمد',
    icon: '🧬',
    color: '#84cc16',
    features: ['أسئلة النظام الجديد', 'شرح مختصر', 'نماذج وزارة'],
  },
];

export default function StorePage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { cart, addToCart, cartTotal, isInCart } = useCart();

  const filteredProducts = products.filter(p => {
    const matchCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       p.subject.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  /* Removed local cart logic functions as they are now in CartContext */

  return (
    <div className="page-wrapper">
      {/* Header */}
      <header className="header">
        <div className="header-container">
          <Link href="/" className="back-link">
            <ArrowRight size={20} />
            <span>الرئيسية</span>
          </Link>
          
          <h1 className="page-title">
            <BookOpen size={24} />
            متجر المذكرات
          </h1>
          
          <div className="header-actions">
            <ThemeToggle />
            <Link href="/cart" className="cart-btn">
              <ShoppingCart size={20} />
              {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <h2>مذكرات ومراجعات من أفضل المعلمين</h2>
        <p>احصل على أفضل المذكرات والملخصات لجميع المراحل الدراسية</p>
        
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="ابحث عن مذكرة، مادة، أو معلم..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </section>

      {/* Categories */}
      <div className="categories-section">
        <div className="categories">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              <span>{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="products-section">
        <div className="section-header">
          <h3>{filteredProducts.length} منتج</h3>
          <button className="filter-btn">
            <Filter size={18} />
            تصفية
          </button>
        </div>

        <div className="products-grid">
          {filteredProducts.map((product, index) => (
            <div 
              key={product.id} 
              className="product-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {product.oldPrice && (
                <div className="sale-badge">
                  <Tag size={14} />
                  خصم {Math.round((1 - product.price / product.oldPrice) * 100)}%
                </div>
              )}

              <div className="product-header" style={{ backgroundColor: `${product.color}15` }}>
                <span className="product-icon">{product.icon}</span>
                <div className="product-meta">
                  <span className="product-subject" style={{ color: product.color }}>
                    {product.subject}
                  </span>
                  <span className="product-grade">{product.grade}</span>
                </div>
              </div>

              <div className="product-content">
                <h4>{product.name}</h4>
                <p className="product-teacher">{product.teacher}</p>

                <div className="product-features">
                  {product.features.map((feature, i) => (
                    <span key={i} className="feature">
                      <Check size={14} />
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="product-stats">
                  <div className="stat">
                    <Star size={14} fill="#eab308" color="#eab308" />
                    <span>{product.rating}</span>
                  </div>
                  <div className="stat">
                    <Download size={14} />
                    <span>{product.sales}</span>
                  </div>
                  <div className="stat">
                    <FileText size={14} />
                    <span>{product.pages} صفحة</span>
                  </div>
                </div>

                <div className="product-footer">
                  <div className="product-price">
                    <span className="current-price">{product.price} ج.م</span>
                    {product.oldPrice && (
                      <span className="old-price">{product.oldPrice} ج.م</span>
                    )}
                  </div>
                  <button 
                    className={`add-to-cart ${isInCart(product.id) ? 'added' : ''}`}
                    onClick={() => addToCart(product)}
                  >
                    {isInCart(product.id) ? (
                      <>
                        <Check size={18} />
                        في السلة
                      </>
                    ) : (
                      <>
                        <ShoppingCart size={18} />
                        أضف للسلة
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Cart */}
      {cart.length > 0 && (
        <div className="floating-cart animate-slideUp">
          <div className="cart-info">
            <ShoppingCart size={20} />
            <span>{cart.length} منتج</span>
          </div>
          <div className="cart-total">
            <span>الإجمالي:</span>
            <strong>{cartTotal} ج.م</strong>
          </div>
          <Link href="/cart" className="checkout-btn">
            عرض السلة
          </Link>
        </div>
      )}

      <style jsx>{`
        .page-wrapper {
          min-height: 100vh;
          background: linear-gradient(180deg, var(--bg-gradient-start) 0%, var(--bg-gradient-end) 100%);
          padding-bottom: 100px;
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
        }

        .page-title {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 20px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .cart-btn {
          position: relative;
          width: 44px;
          height: 44px;
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          border-radius: 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-primary);
        }

        .cart-count {
          position: absolute;
          top: -4px;
          right: -4px;
          width: 20px;
          height: 20px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: white;
          font-size: 12px;
          font-weight: 600;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Hero */
        .hero {
          text-align: center;
          padding: 60px 24px 40px;
        }

        .hero h2 {
          font-size: 36px;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 12px;
        }

        .hero p {
          color: var(--text-muted);
          font-size: 18px;
          margin-bottom: 32px;
        }

        .search-box {
          max-width: 500px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 20px;
          background: var(--card-bg);
          border: 2px solid var(--border-color);
          border-radius: 16px;
        }

        .search-box input {
          flex: 1;
          border: none;
          background: transparent;
          font-size: 16px;
        }

        /* Categories */
        .categories-section {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px 24px;
        }

        .categories {
          display: flex;
          gap: 12px;
          overflow-x: auto;
          padding-bottom: 8px;
        }

        .category-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background: var(--card-bg);
          border: 2px solid var(--card-border);
          border-radius: 50px;
          font-size: 15px;
          font-weight: 600;
          color: var(--text-secondary);
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.3s;
        }

        .category-btn:hover {
          border-color: var(--accent);
          color: var(--accent);
        }

        .category-btn.active {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border-color: transparent;
          color: white;
        }

        /* Products */
        .products-section {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .section-header h3 {
          font-size: 18px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .filter-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          border-radius: 12px;
          color: var(--text-secondary);
          font-weight: 500;
          cursor: pointer;
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 20px;
        }

        .product-card {
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          border-radius: 20px;
          overflow: hidden;
          transition: all 0.3s;
          position: relative;
          animation: fadeInUp 0.5s ease-out forwards;
          opacity: 0;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .product-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 30px var(--shadow-lg);
        }

        .sale-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 6px 12px;
          background: linear-gradient(135deg, #ef4444, #dc2626);
          color: white;
          font-size: 12px;
          font-weight: 600;
          border-radius: 8px;
          z-index: 1;
        }

        .product-header {
          padding: 24px;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
        }

        .product-icon {
          font-size: 48px;
        }

        .product-meta {
          text-align: left;
        }

        .product-subject {
          display: block;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 4px;
        }

        .product-grade {
          font-size: 12px;
          color: var(--text-muted);
        }

        .product-content {
          padding: 0 24px 24px;
        }

        .product-content h4 {
          font-size: 16px;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 8px;
          line-height: 1.4;
        }

        .product-teacher {
          font-size: 14px;
          color: var(--text-muted);
          margin-bottom: 16px;
        }

        .product-features {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 16px;
        }

        .feature {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 4px 10px;
          background: var(--bg-secondary);
          border-radius: 6px;
          font-size: 12px;
          color: var(--text-secondary);
        }

        .product-stats {
          display: flex;
          gap: 16px;
          margin-bottom: 16px;
        }

        .stat {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 13px;
          color: var(--text-muted);
        }

        .product-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 16px;
          border-top: 1px solid var(--card-border);
        }

        .product-price {
          display: flex;
          flex-direction: column;
        }

        .current-price {
          font-size: 22px;
          font-weight: 700;
          color: var(--accent);
        }

        .old-price {
          font-size: 14px;
          color: var(--text-muted);
          text-decoration: line-through;
        }

        .add-to-cart {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border: none;
          border-radius: 12px;
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }

        .add-to-cart:hover {
          transform: scale(1.05);
        }

        .add-to-cart.added {
          background: linear-gradient(135deg, #10b981, #059669);
        }

        /* Floating Cart */
        .floating-cart {
          position: fixed;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 24px;
          padding: 16px 24px;
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          border-radius: 20px;
          box-shadow: 0 10px 40px var(--shadow-lg);
          z-index: 100;
        }

        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }

        @keyframes slideUp {
          from { transform: translate(-50%, 100%); opacity: 0; }
          to { transform: translate(-50%, 0); opacity: 1; }
        }

        .cart-info {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-secondary);
          font-weight: 500;
        }

        .cart-total {
          display: flex;
          flex-direction: column;
          font-size: 14px;
          color: var(--text-muted);
        }

        .cart-total strong {
          font-size: 18px;
          color: var(--text-primary);
        }

        .checkout-btn {
          padding: 12px 32px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border: none;
          border-radius: 12px;
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }

        .checkout-btn:hover {
          transform: scale(1.05);
        }

        @media (max-width: 640px) {
          .hero h2 {
            font-size: 24px;
          }

          .products-grid {
            grid-template-columns: 1fr;
          }

          .floating-cart {
            width: calc(100% - 32px);
            gap: 12px;
          }
        }
      `}</style>
    </div>
  );
}


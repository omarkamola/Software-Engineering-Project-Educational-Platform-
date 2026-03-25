'use client';

import Link from 'next/link';
import { 
  ArrowRight, ShoppingCart, Trash2, CreditCard, 
  ShoppingBag, CheckCircle2, ChevronLeft
} from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import ThemeToggle from '@/components/ThemeToggle';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

export default function CartPage() {
  const { cart, removeFromCart, cartTotal, clearCart } = useCart();

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error('السلة فارغة');
      return;
    }
    // For now, just simulate checkout
    toast.success('جاري تحويلك لإتمام الدفع...');
  };

  return (
    <div className="page-wrapper">
      {/* Header */}
      <header className="header">
        <div className="header-container">
          <Link href="/store" className="back-link">
            <ArrowRight size={20} />
            <span>العودة للمتجر</span>
          </Link>
          
          <h1 className="page-title">
            <ShoppingCart size={24} />
            سلة المشتريات
          </h1>
          
          <div className="header-actions">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="cart-container">
          <AnimatePresence mode="wait">
            {cart.length === 0 ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="empty-cart"
              >
                <div className="empty-icon">
                  <ShoppingBag size={64} />
                </div>
                <h2>سلة المشتريات فارغة</h2>
                <p>يبدو أنك لم تقم بإضافة أي مذكرات أو مراجعات بعد.</p>
                <Link href="/store" className="start-shopping-btn">
                  ابدأ التسوق الآن
                  <ChevronLeft size={20} />
                </Link>
              </motion.div>
            ) : (
              <div key="content" className="cart-content">
                <div className="cart-items">
                  <AnimatePresence>
                    {cart.map((item) => (
                      <motion.div 
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="cart-card"
                      >
                        <div className="item-icon" style={{ backgroundColor: `${item.color}15` }}>
                          <span className="icon-text">{item.icon}</span>
                        </div>
                        
                        <div className="item-info">
                          <h3>{item.name}</h3>
                          <p className="item-teacher">{item.teacher}</p>
                          <div className="item-meta">
                            <span className="item-subject" style={{ color: item.color }}>{item.subject}</span>
                            <span className="dot">•</span>
                            <span>{item.grade}</span>
                          </div>
                        </div>

                        <div className="item-price-actions">
                          <span className="item-price">{item.price} ج.م</span>
                          <button 
                            className="remove-btn"
                            onClick={() => removeFromCart(item.id)}
                            title="حذف"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  
                  <button className="clear-cart-btn" onClick={clearCart}>
                    <Trash2 size={16} />
                    مسح السلة بالكامل
                  </button>
                </div>

                <div className="cart-summary">
                  <div className="summary-card">
                    <h3>ملخص الطلب</h3>
                    <div className="summary-rows">
                      <div className="summary-row">
                        <span>عدد المنتجات</span>
                        <span>{cart.length}</span>
                      </div>
                      <div className="summary-row">
                        <span>المجموع الفرعي</span>
                        <span>{cartTotal} ج.م</span>
                      </div>
                      <div className="summary-row divider"></div>
                      <div className="summary-row total">
                        <span>الإجمالي</span>
                        <span>{cartTotal} ج.م</span>
                      </div>
                    </div>

                    <button className="checkout-btn" onClick={handleCheckout}>
                      <CreditCard size={20} />
                      إتمام الشراء والدفع
                    </button>

                    <div className="secure-payment">
                      <CheckCircle2 size={14} />
                      <span>دفع آمن 100%</span>
                    </div>
                  </div>

                  <Link href="/store" className="continue-link">
                    <ArrowRight size={16} />
                    مواصلة التسوق
                  </Link>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </main>

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
        }

        .main-content {
          max-width: 1280px;
          margin: 0 auto;
          padding: 40px 24px;
        }

        /* Empty Cart */
        .empty-cart {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 80px 24px;
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          border-radius: 24px;
          box-shadow: 0 10px 30px var(--shadow-lg);
        }

        .empty-icon {
          width: 120px;
          height: 120px;
          background: var(--accent-light);
          color: var(--accent);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
        }

        .empty-cart h2 {
          font-size: 28px;
          margin-bottom: 12px;
          color: var(--text-primary);
        }

        .empty-cart p {
          color: var(--text-muted);
          margin-bottom: 32px;
          font-size: 18px;
        }

        .start-shopping-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 14px 32px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: white;
          border-radius: 16px;
          font-weight: 600;
          text-decoration: none;
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .start-shopping-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(99, 102, 241, 0.4);
        }

        /* Cart Content */
        .cart-content {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 32px;
          align-items: start;
        }

        .cart-items {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .cart-card {
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          border-radius: 20px;
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 20px;
          transition: transform 0.3s;
        }

        .cart-card:hover {
          transform: scale(1.01);
          border-color: var(--accent);
        }

        .item-icon {
          width: 80px;
          height: 80px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          flex-shrink: 0;
        }

        .item-info {
          flex: 1;
        }

        .item-info h3 {
          font-size: 18px;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 4px;
        }

        .item-teacher {
          font-size: 14px;
          color: var(--text-muted);
          margin-bottom: 8px;
        }

        .item-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: var(--text-muted);
        }

        .item-subject {
          font-weight: 600;
        }

        .dot {
          opacity: 0.5;
        }

        .item-price-actions {
          text-align: left;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 12px;
        }

        .item-price {
          font-size: 20px;
          font-weight: 700;
          color: var(--accent);
        }

        .remove-btn {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          color: #ef4444;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s;
        }

        .remove-btn:hover {
          background: #fee2e2;
          border-color: #ef4444;
          transform: rotate(8deg);
        }

        .clear-cart-btn {
          align-self: flex-start;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          background: transparent;
          border: none;
          color: var(--text-muted);
          font-size: 14px;
          cursor: pointer;
          transition: color 0.3s;
        }

        .clear-cart-btn:hover {
          color: #ef4444;
        }

        /* Summary */
        .cart-summary {
          position: sticky;
          top: 100px;
        }

        .summary-card {
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          border-radius: 24px;
          padding: 24px;
          box-shadow: 0 10px 30px var(--shadow-lg);
          margin-bottom: 16px;
        }

        .summary-card h3 {
          font-size: 20px;
          margin-bottom: 24px;
          color: var(--text-primary);
        }

        .summary-rows {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          color: var(--text-secondary);
          font-size: 15px;
        }

        .divider {
          height: 1px;
          background: var(--border-color);
          margin: 8px 0;
        }

        .summary-row.total {
          font-size: 20px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .summary-row.total span:last-child {
          color: var(--accent);
        }

        .checkout-btn {
          width: 100%;
          margin-top: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 16px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: white;
          border: none;
          border-radius: 16px;
          font-size: 18px;
          font-weight: 700;
          cursor: pointer;
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .checkout-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(99, 102, 241, 0.4);
        }

        .secure-payment {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          margin-top: 16px;
          color: #10b981;
          font-size: 13px;
          font-weight: 500;
        }

        .continue-link {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          color: var(--text-muted);
          text-decoration: none;
          font-size: 15px;
          font-weight: 500;
          transition: color 0.3s;
        }

        .continue-link:hover {
          color: var(--accent);
        }

        @media (max-width: 968px) {
          .cart-content {
            grid-template-columns: 1fr;
          }
          
          .cart-summary {
            position: static;
          }
        }

        @media (max-width: 640px) {
          .cart-card {
            flex-direction: column;
            text-align: center;
          }
          
          .item-price-actions {
            flex-direction: row;
            width: 100%;
            justify-content: space-between;
            align-items: center;
            margin-top: 12px;
            padding-top: 12px;
            border-top: 1px solid var(--card-border);
          }
        }
      `}</style>
    </div>
  );
}

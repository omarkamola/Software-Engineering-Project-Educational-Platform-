'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { Sun, Moon, Sparkles } from 'lucide-react';
import { useState, useRef } from 'react';

export default function ThemeToggle() {
  const { isDark, toggleTheme, mounted } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);
  const [wavePosition, setWavePosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setWavePosition({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    }
    
    setIsAnimating(true);
    setTimeout(() => {
      toggleTheme();
    }, 200);
    setTimeout(() => {
      setIsAnimating(false);
    }, 800);
  };

  if (!mounted) {
    return <div className="toggle-placeholder" />;
  }

  return (
    <>
      {/* Wave Effect Overlay */}
      {isAnimating && (
        <div className="wave-overlay">
          <div 
            className="wave-circle"
            style={{
              left: wavePosition.x,
              top: wavePosition.y,
              background: isDark 
                ? 'radial-gradient(circle, #fbbf24 0%, #f97316 50%, transparent 70%)'
                : 'radial-gradient(circle, #312e81 0%, #1e1b4b 50%, transparent 70%)',
            }}
          />
        </div>
      )}

      <button
        ref={buttonRef}
        onClick={handleClick}
        className={`toggle-button ${isDark ? 'dark' : 'light'} ${isAnimating ? 'animating' : ''}`}
        aria-label="Toggle theme"
      >
        <div className="toggle-inner">
          {isDark ? (
            <div className="icon-wrapper moon">
              <Moon size={18} />
              <Sparkles size={10} className="sparkle s1" />
              <Sparkles size={8} className="sparkle s2" />
              <Sparkles size={6} className="sparkle s3" />
            </div>
          ) : (
            <div className="icon-wrapper sun">
              <Sun size={20} />
              <div className="sun-rays">
                {[...Array(8)].map((_, i) => (
                  <span key={i} className="ray" style={{ transform: `rotate(${i * 45}deg)` }} />
                ))}
              </div>
            </div>
          )}
        </div>
      </button>

      <style jsx>{`
        .toggle-placeholder {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          background: var(--bg-secondary);
        }

        .wave-overlay {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 9999;
          overflow: hidden;
        }

        .wave-circle {
          position: absolute;
          width: 100px;
          height: 100px;
          border-radius: 50%;
          transform: translate(-50%, -50%) scale(0);
          animation: waveExpand 0.8s ease-out forwards;
        }

        @keyframes waveExpand {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0.8;
          }
          100% {
            transform: translate(-50%, -50%) scale(50);
            opacity: 0;
          }
        }

        .toggle-button {
          position: relative;
          width: 48px;
          height: 48px;
          border-radius: 14px;
          border: none;
          cursor: pointer;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        .toggle-button.light {
          background: linear-gradient(135deg, #fbbf24, #f97316);
          box-shadow: 0 4px 15px rgba(251, 191, 36, 0.4);
        }

        .toggle-button.dark {
          background: linear-gradient(135deg, #312e81, #1e1b4b);
          box-shadow: 0 4px 15px rgba(49, 46, 129, 0.4);
        }

        .toggle-button:hover {
          transform: scale(1.1) rotate(10deg);
        }

        .toggle-button.animating {
          animation: buttonPop 0.4s ease;
        }

        @keyframes buttonPop {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(0.8); }
        }

        .toggle-inner {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .icon-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .icon-wrapper.sun {
          animation: rotateSun 20s linear infinite;
        }

        @keyframes rotateSun {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .sun-rays {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .ray {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 2px;
          height: 6px;
          background: rgba(255, 255, 255, 0.6);
          border-radius: 1px;
          transform-origin: center -8px;
          animation: rayPulse 2s ease-in-out infinite;
        }

        @keyframes rayPulse {
          0%, 100% { opacity: 0.6; height: 6px; }
          50% { opacity: 1; height: 8px; }
        }

        .icon-wrapper.moon {
          animation: moonFloat 3s ease-in-out infinite;
        }

        @keyframes moonFloat {
          0%, 100% { transform: translateY(0) rotate(-10deg); }
          50% { transform: translateY(-3px) rotate(-10deg); }
        }

        .sparkle {
          position: absolute;
          color: rgba(255, 255, 255, 0.8);
          animation: sparkle 1.5s ease-in-out infinite;
        }

        .sparkle.s1 {
          top: -8px;
          right: -8px;
          animation-delay: 0s;
        }

        .sparkle.s2 {
          bottom: -6px;
          right: -6px;
          animation-delay: 0.3s;
        }

        .sparkle.s3 {
          top: -4px;
          left: -8px;
          animation-delay: 0.6s;
        }

        @keyframes sparkle {
          0%, 100% { opacity: 0.4; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </>
  );
}

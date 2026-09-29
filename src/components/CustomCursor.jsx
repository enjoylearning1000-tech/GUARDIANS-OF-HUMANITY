import React, { useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [cursorType, setCursorType] = useState('default'); // 'default', 'pointer', 'alert', 'map'
  const [ripples, setRipples] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable custom cursor if fine pointer (mouse) is detected
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) {
      return;
    }

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      const target = e.target;
      if (!target) return;

      if (
        target.closest('[data-cursor="alert"]') || 
        target.closest('.emergency-alert-item') ||
        target.closest('.bg-red-600') ||
        target.closest('.bg-\\[\\#e11d48\\]')
      ) {
        setCursorType('alert');
      } else if (
        target.closest('[data-cursor="map"]') || 
        target.closest('.leaflet-container') ||
        target.closest('.google-pin-container')
      ) {
        setCursorType('map');
      } else if (
        target.closest('button') || 
        target.closest('a') || 
        target.closest('[role="button"]') || 
        target.closest('input') ||
        target.closest('select') ||
        target.closest('.cursor-pointer')
      ) {
        setCursorType('pointer');
      } else {
        setCursorType('default');
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleClick = (e) => {
      const newRipple = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        color: cursorType === 'alert' ? 'rgba(239, 68, 68, 0.7)' : 'rgba(59, 130, 246, 0.6)'
      };
      setRipples((prev) => [...prev.slice(-6), newRipple]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 700);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('click', handleClick);
    };
  }, [cursorType]);

  // Smooth lerp trailing ring
  useEffect(() => {
    let animId;
    const follow = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.22,
        y: prev.y + (position.y - prev.y) * 0.22
      }));
      animId = requestAnimationFrame(follow);
    };
    animId = requestAnimationFrame(follow);
    return () => cancelAnimationFrame(animId);
  }, [position]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Click Ripples */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full pointer-events-none animate-ping"
          style={{
            left: ripple.x - 24,
            top: ripple.y - 24,
            width: 48,
            height: 48,
            borderColor: ripple.color,
            borderWidth: 2,
            opacity: 0.85
          }}
        />
      ))}

      {/* Trailing Ring */}
      <div
        className={`absolute rounded-full transition-all duration-150 ease-out border pointer-events-none -translate-x-1/2 -translate-y-1/2 ${
          cursorType === 'alert'
            ? 'w-12 h-12 border-red-500 bg-red-500/15 shadow-[0_0_20px_rgba(239,68,68,0.7)] scale-110'
            : cursorType === 'map'
            ? 'w-12 h-12 border-cyan-400 bg-cyan-500/10 shadow-[0_0_15px_rgba(34,211,238,0.5)] scale-110'
            : cursorType === 'pointer'
            ? 'w-12 h-12 border-blue-400/80 bg-blue-500/15 shadow-[0_0_15px_rgba(59,130,246,0.4)] scale-125'
            : 'w-8 h-8 border-slate-400/40 bg-transparent'
        }`}
        style={{
          left: trailingPos.x,
          top: trailingPos.y
        }}
      />

      {/* Center Dot or Map Pin Icon */}
      {cursorType === 'map' ? (
        <div
          className="absolute pointer-events-none -translate-x-1/2 -translate-y-full text-cyan-400 drop-shadow-[0_0_8px_#22d3ee]"
          style={{
            left: position.x,
            top: position.y - 2
          }}
        >
          <MapPin className="w-5 h-5 fill-cyan-400/30 text-cyan-400 stroke-[2.5]" />
        </div>
      ) : (
        <div
          className={`absolute rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-colors duration-150 ${
            cursorType === 'alert'
              ? 'w-3 h-3 bg-red-500 shadow-[0_0_12px_#ef4444]'
              : cursorType === 'pointer'
              ? 'w-2.5 h-2.5 bg-blue-400 shadow-[0_0_10px_#60a5fa]'
              : 'w-2 h-2 bg-white/90 shadow-[0_0_6px_#ffffff]'
          }`}
          style={{
            left: position.x,
            top: position.y
          }}
        />
      )}
    </div>
  );
}

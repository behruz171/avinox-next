'use client';

import { useEffect, useRef } from 'react';

const HOVER_SELECTORS = 'a, button, .product-card, .gallery-item, .testimonial-dot-btn, .form-input';

/**
 * Custom luxury cursor + mouse glow.
 * mode="full"   → eased ring/glow physics and hover states (home page)
 * mode="simple" → ring/glow follow the mouse directly (product detail page)
 */
export default function CustomCursor({ mode = 'full' }) {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    const glow = glowRef.current;
    if (!cursor || !ring || !glow) return;

    if (mode === 'simple') {
      const onMove = (e) => {
        cursor.style.left = ring.style.left = glow.style.left = e.clientX + 'px';
        cursor.style.top = ring.style.top = glow.style.top = e.clientY + 'px';
      };
      const onDown = () => { cursor.classList.add('active'); ring.classList.add('active'); };
      const onUp = () => { cursor.classList.remove('active'); ring.classList.remove('active'); };
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mousedown', onDown);
      document.addEventListener('mouseup', onUp);
      return () => {
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mousedown', onDown);
        document.removeEventListener('mouseup', onUp);
      };
    }

    let mouseX = -100, mouseY = -100;
    let ringX = -100, ringY = -100;
    let glowX = -100, glowY = -100;
    let frameId;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    };
    const onEnter = () => { cursor.style.opacity = ring.style.opacity = glow.style.opacity = '1'; };
    const onLeave = () => { cursor.style.opacity = ring.style.opacity = glow.style.opacity = '0'; };

    const physics = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.left = ringX + 'px';
      ring.style.top = ringY + 'px';

      glowX += (mouseX - glowX) * 0.08;
      glowY += (mouseY - glowY) * 0.08;
      glow.style.left = glowX + 'px';
      glow.style.top = glowY + 'px';

      frameId = requestAnimationFrame(physics);
    };
    physics();

    // Event delegation so dynamically rendered elements get hover states too
    const onOver = (e) => {
      if (e.target.closest?.(HOVER_SELECTORS)) {
        cursor.classList.add('cursor-hover');
        ring.classList.add('cursor-ring-hover');
      }
    };
    const onOut = (e) => {
      const from = e.target.closest?.(HOVER_SELECTORS);
      const to = e.relatedTarget?.closest?.(HOVER_SELECTORS);
      if (from && from !== to) {
        cursor.classList.remove('cursor-hover');
        ring.classList.remove('cursor-ring-hover');
      }
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseenter', onEnter);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);

    return () => {
      cancelAnimationFrame(frameId);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseenter', onEnter);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
    };
  }, [mode]);

  return (
    <>
      <div className="custom-cursor" id="cursor" ref={cursorRef}></div>
      <div className="custom-cursor-ring" id="cursor-ring" ref={ringRef}></div>
      <div className="mouse-glow" id="mouse-glow" ref={glowRef}></div>
    </>
  );
}

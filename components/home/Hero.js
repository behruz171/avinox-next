'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/LanguageProvider';

/* 4. HERO SECTION + gold floating particles */
export default function Hero() {
  const { t } = useLanguage();
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    class GoldParticle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * width;
        this.y = height + Math.random() * 80;
        this.size = Math.random() * 2.5 + 0.8;
        this.speedY = Math.random() * 0.4 + 0.15;
        this.speedX = (Math.random() - 0.5) * 0.2;
        this.opacity = Math.random() * 0.4 + 0.15;
        this.maxOpacity = this.opacity;
      }
      update() {
        this.y -= this.speedY;
        this.x += this.speedX;
        if (this.y < height * 0.8) this.opacity -= 0.001;
        if (this.y < 0 || this.opacity <= 0) this.reset();
      }
      draw() {
        ctx.fillStyle = `rgba(200, 164, 77, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const particles = Array.from({ length: 35 }, () => new GoldParticle());
    let frameId;
    const loop = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => { p.update(); p.draw(); });
      frameId = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <section className="hero-section" id="home">
      <div className="hero-bg-container">
        <div className="hero-bg" id="hero-background-img"></div>
      </div>
      <div className="hero-glow-light"></div>

      <canvas id="hero-particles" ref={canvasRef}></canvas>

      <div className="hero-content">
        <span className="section-tag" id="hero-tag">{t('hero.tag')}</span>
        <h1 className="heading-lg hero-title" id="hero-main-title">
          <span>{t('hero.title.1')}</span> <span>{t('hero.title.2')}</span> <span>{t('hero.title.3')}</span> <br />
          <span>{t('hero.title.4')}</span> <span>{t('hero.title.5')}</span> <span>{t('hero.title.6')}</span> <span>{t('hero.title.7')}</span>
        </h1>
        <p className="hero-subtitle" id="hero-sub">{t('hero.subtitle')}</p>
        <div className="hero-ctas" id="hero-buttons">
          <Link href="/product" className="btn-gold" id="btn-view-products">{t('hero.cta.products')}</Link>
          <a href="#contact" className="btn-outline" id="btn-contact-us">{t('hero.cta.contact')}</a>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { setLenis, startLenis } from '@/lib/lenisStore';
import { useLanguage } from '@/components/LanguageProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import Loader from './Loader';
import Hero from './Hero';
import Stats from './Stats';
import ProductsSection from './ProductsSection';
import Gallery from './Gallery';
import About from './About';
import WhyUs from './WhyUs';
import Testimonials from './Testimonials';
import Contact from './Contact';

gsap.registerPlugin(ScrollTrigger);

export default function HomeClient() {
  const rootRef = useRef(null);
  const { t, lang } = useLanguage();

  // Translate <title> and meta description like the original applyTranslations()
  useEffect(() => {
    document.title = t('page-title');
    document.querySelector('meta[name="description"]')?.setAttribute('content', t('meta-description'));
  }, [lang, t]);

  useEffect(() => {
    /* 1. LENIS SMOOTH SCROLL */
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });
    setLenis(lenis);
    lenis.stop(); // lock scroll while loading

    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    /* 5. SCROLL TRIGGER ANIMATIONS */
    const ctx = gsap.context(() => {
      gsap.from('#products-heading', {
        scrollTrigger: { trigger: '#products', start: 'top 80%' },
        opacity: 0, y: 50, duration: 1.2, ease: 'power3.out',
      });

      gsap.from('.product-card', {
        scrollTrigger: { trigger: '#product-cards-container', start: 'top 80%' },
        opacity: 0, y: 70, duration: 1.4, stagger: 0.12, ease: 'power3.out',
      });

      gsap.from('.gallery-item', {
        scrollTrigger: { trigger: '#masonry-gallery', start: 'top 80%' },
        opacity: 0, y: 40, scale: 0.8, duration: 1.2, ease: 'power3.out',
      });

      gsap.from('#about-heading, #about-content-col p', {
        scrollTrigger: { trigger: '#about', start: 'top 80%' },
        opacity: 0, y: 40, duration: 1.2, stagger: 0.2, ease: 'power3.out',
      });

      gsap.from('.timeline-item', {
        scrollTrigger: { trigger: '#about-timeline', start: 'top 80%' },
        opacity: 0, x: -30, duration: 1.2, stagger: 0.2, ease: 'power3.out',
      });

      gsap.from('#testimonial-slider-box', {
        scrollTrigger: { trigger: '#testimonials', start: 'top 80%' },
        opacity: 0, y: 50, duration: 1.4, ease: 'power3.out',
      });

      gsap.from('.why-card', {
        scrollTrigger: { trigger: '#why-features-grid', start: 'top 80%' },
        opacity: 0, y: 50, duration: 1.2, ease: 'power3.out',
      });

      gsap.from('#contact-info-panel', {
        scrollTrigger: { trigger: '#contact', start: 'top 80%' },
        opacity: 0, x: -50, duration: 1.4, ease: 'power3.out',
      });

      gsap.from('#form-panel', {
        scrollTrigger: { trigger: '#contact', start: 'top 80%' },
        opacity: 0, x: 50, duration: 1.4, ease: 'power3.out',
      });
    }, rootRef);

    return () => {
      ctx.revert();
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  /* Called by the loader when it finishes */
  const handleLoaded = () => {
    startLenis();
    ScrollTrigger.refresh();

    // Hero entrance timeline
    gsap.to('#hero-background-img', { scale: 1, duration: 1.5, ease: 'power2.out' });
    gsap.to('#hero-particles', { opacity: 1, duration: 1, ease: 'power1.out' });
    gsap.to('#hero-sub', { opacity: 1, y: 0, duration: 0.5, ease: 'power1.out' });
    gsap.to('#hero-buttons', { opacity: 1, y: 0, duration: 0.8, ease: 'power1.out' });
  };

  return (
    <div ref={rootRef}>
      <div className="noise-overlay"></div>
      <CustomCursor mode="full" />
      <Loader onComplete={handleLoaded} />
      <Navbar variant="home" />

      <main id="scroll-wrapper">
        <Hero />
        <Stats />
        <ProductsSection />
        <Gallery />
        <About />
        <WhyUs />
        <Testimonials />
        <Contact />
        <Footer variant="home" />
      </main>
    </div>
  );
}

'use client';

import { useEffect, useRef } from 'react';
import { useLanguage } from '@/components/LanguageProvider';

const companyItems = [
  { image: '/company_imgs/sushu_yummy.webp', titleKey: 'companies.slide1.title', descKey: 'companies.slide1.desc' },
  { image: '/company_imgs/palinger_burger.jpg', titleKey: 'companies.slide2.title', descKey: 'companies.slide2.desc' },
  { image: '/company_imgs/kultur_turk.png', titleKey: 'companies.slide3.title', descKey: 'companies.slide3.desc' },
  { image: '/company_imgs/toshkent_restarani.webp', titleKey: 'companies.slide4.title', descKey: 'companies.slide4.desc' },
];

export default function WhyUs() {
  const { t } = useLanguage();
  const trackRef = useRef(null);

  const calculateCarousel = () => {
    const track = trackRef.current;
    if (!track) return;
    const firstSlide = track.querySelector('.company-slide');
    if (firstSlide) {
      const cardWidth = firstSlide.offsetWidth;
      const gapStyle = window.getComputedStyle(track).gap || '0px';
      const gap = parseFloat(gapStyle);
      const itemCount = companyItems.length;

      const moveDistance = (cardWidth + gap) * itemCount;
      const duration = itemCount * 2.5;

      track.style.setProperty('--move-distance', `-${moveDistance}px`);
      track.style.setProperty('--slide-duration', `${duration}s`);
    }
  };

  useEffect(() => {
    calculateCarousel();
    const timer = setTimeout(calculateCarousel, 150);
    window.addEventListener('resize', calculateCarousel);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', calculateCarousel);
    };
  }, []);

  return (
    <section className="why-us-section" id="why-us">
      <div className="container">
        <div className="why-header">
          <span className="section-tag">{t('why.tag')}</span>
          <h2 className="heading-md" id="why-heading">
            {t('why.heading')}
          </h2>
        </div>

        {/* Company Carousel */}
        <div className="company-carousel-wrapper glass-panel">
          <div className="company-carousel-header">
            <div>
              <span className="section-tag">{t('companies.tag')}</span>
              <h3 className="heading-sm">{t('companies.heading')}</h3>
            </div>
          </div>

          <div className="company-carousel-simple">
            <div className="company-carousel-track" id="company-carousel" ref={trackRef}>
              {[...companyItems, ...companyItems].map((item, i) => (
                <article key={i} className="company-slide">
                  <img src={item.image} alt={t(item.titleKey)} className="company-image" />
                  <div className="company-slide-content">
                    <span className="company-pill">{t('companies.label')}</span>
                    <h4 className="company-title">{t(item.titleKey)}</h4>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="why-grid" id="why-features-grid">
          <div className="glass-panel why-card" id="why-card-precision">
            <div className="why-icon-box" id="icon-precision">
              <i className="fa-solid fa-microscope"></i>
            </div>
            <h3 className="heading-sm why-title">{t('why.precision.title')}</h3>
            <p className="why-desc">{t('why.precision.text')}</p>
          </div>

          <div className="glass-panel why-card" id="why-card-material">
            <div className="why-icon-box" id="icon-material">
              <i className="fa-solid fa-shield-halved"></i>
            </div>
            <h3 className="heading-sm why-title">{t('why.material.title')}</h3>
            <p className="why-desc">{t('why.material.text')}</p>
          </div>

          <div className="glass-panel why-card" id="why-card-custom">
            <div className="why-icon-box" id="icon-custom">
              <i className="fa-solid fa-compass-drafting"></i>
            </div>
            <h3 className="heading-sm why-title">{t('why.custom.title')}</h3>
            <p className="why-desc">{t('why.custom.text')}</p>
          </div>

          <div className="glass-panel why-card" id="why-card-lifetime">
            <div className="why-icon-box" id="icon-lifetime">
              <i className="fa-solid fa-infinity"></i>
            </div>
            <h3 className="heading-sm why-title">{t('why.lifetime.title')}</h3>
            <p className="why-desc">{t('why.lifetime.text')}</p>
          </div>

          <div className="glass-panel why-card" id="why-card-install">
            <div className="why-icon-box" id="icon-install">
              <i className="fa-solid fa-screwdriver-wrench"></i>
            </div>
            <h3 className="heading-sm why-title">{t('why.install.title')}</h3>
            <p className="why-desc">{t('why.install.text')}</p>
          </div>

          <div className="glass-panel why-card" id="why-card-warranty">
            <div className="why-icon-box" id="icon-warranty">
              <i className="fa-solid fa-file-shield"></i>
            </div>
            <h3 className="heading-sm why-title">{t('why.warranty.title')}</h3>
            <p className="why-desc">{t('why.warranty.text')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

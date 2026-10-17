'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/components/LanguageProvider';

const testimonials = [
  {
    img: '/imgs/tables.png',
    quoteKey: 'testimonials.slide1.quote',
    nameKey: 'testimonials.slide1.name',
    companyKey: 'testimonials.slide1.company',
  },
  {
    img: '/imgs/factory.png',
    quoteKey: 'testimonials.slide2.quote',
    nameKey: 'testimonials.slide2.name',
    companyKey: 'testimonials.slide2.company',
  },
  {
    img: '/imgs/basins.png',
    quoteKey: 'testimonials.slide3.quote',
    nameKey: 'testimonials.slide3.name',
    companyKey: 'testimonials.slide3.company',
  },
];

export default function Testimonials() {
  const { t } = useLanguage();
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [activeSlide]);

  return (
    <section className="testimonials-section" id="testimonials">
      <div className="container">
        <div className="testimonials-header">
          <span className="section-tag">{t('testimonials.tag')}</span>
          <h2 className="heading-md" id="testimonials-heading">
            {t('testimonials.heading')}
          </h2>
        </div>

        <div className="testimonials-slider-container glass-panel" id="testimonial-slider-box">
          {testimonials.map((testi, index) => (
            <div
              key={index}
              className={`testimonial-slide${activeSlide === index ? ' active' : ''}`}
              data-slide={index}
              id={`testi-slide-${index + 1}`}
            >
              <div className="testimonial-img-wrapper">
                <img src={testi.img} alt={t(testi.nameKey)} className="testimonial-img" />
              </div>
              <div className="testimonial-stars">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </div>
              <blockquote className="testimonial-quote">
                {t(testi.quoteKey)}
              </blockquote>
              <p className="testimonial-author-name">{t(testi.nameKey)}</p>
              <p className="testimonial-author-company">{t(testi.companyKey)}</p>
            </div>
          ))}

          <div className="testimonial-controls" id="slider-nav">
            <div className="testimonial-dot-nav" id="slider-dots">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`testimonial-dot-btn${activeSlide === index ? ' active' : ''}`}
                  data-slide={index}
                  aria-label={`Go to Slide ${index + 1}`}
                  onClick={() => setActiveSlide(index)}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

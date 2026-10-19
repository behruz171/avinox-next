'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { stopLenis, startLenis } from '@/lib/lenisStore';

const galleryItems = [
  {
    className: 'gallery-item wide',
    src: '/imgs/hero_bg.png',
    title: 'Prism-welded Commercial Preparation Line',
    tag: 'Project 01',
    infoTitle: 'Prism-welded Prep Line',
  },
  {
    className: 'gallery-item tall',
    src: '/imgs/sinks.png',
    title: 'Bespoke Double-Bowl Commercial Sinks',
    tag: 'Project 02',
    infoTitle: 'Bespoke Double-Bowl Sinks',
  },
  {
    className: 'gallery-item',
    src: '/imgs/factory.png',
    title: 'Precision Laser Sheet Metal Cutting',
    tag: 'Process 03',
    infoTitle: 'Precision Fabrication',
  },
  {
    className: 'gallery-item',
    src: '/imgs/tables.png',
    title: 'Minimalist Chef Work Table',
    tag: 'Project 04',
    infoTitle: 'Minimalist Chef Work Table',
  },
  {
    className: 'gallery-item',
    src: '/imgs/shelves.png',
    title: 'Seamless Wall-mounted Shelving Integration',
    tag: 'Project 05',
    infoTitle: 'Wall-mounted Shelving',
  },
  {
    className: 'gallery-item wide',
    src: '/imgs/basins.png',
    title: 'Smart Commercial Sanitation Basin',
    tag: 'Project 06',
    infoTitle: 'Smart Sanitation Basin',
  },
];

export default function Gallery() {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(null);

  const openLightbox = (index) => {
    setActiveIndex(index);
    stopLenis();
  };

  const closeLightbox = () => {
    setActiveIndex(null);
    startLenis();
  };

  const nextImage = (e) => {
    e?.stopPropagation();
    setActiveIndex((prev) => (prev + 1) % galleryItems.length);
  };

  const prevImage = (e) => {
    e?.stopPropagation();
    setActiveIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  };

  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex]);

  return (
    <section className="gallery-section" id="gallery">
      <div className="container">
        <div className="gallery-header">
          <span className="section-tag">{t('gallery.tag')}</span>
          <h2 className="heading-md" id="gallery-heading">
            {t('gallery.heading')}
          </h2>
        </div>

        <div className="gallery-grid" id="masonry-gallery">
          {galleryItems.map((item, index) => (
            <div
              key={index}
              className={item.className}
              data-index={index}
              data-src={item.src}
              data-title={item.title}
              onClick={() => openLightbox(index)}
            >
              <img src={item.src} alt={item.infoTitle} loading="lazy" />
              <div className="gallery-overlay">
                <span className="gallery-info-tag">{item.tag}</span>
                <h4 className="gallery-info-title">{item.infoTitle}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <div
        className={`lightbox${activeIndex !== null ? ' active' : ''}`}
        id="lightbox-viewer"
        onClick={closeLightbox}
      >
        <button
          className="lightbox-close"
          id="lightbox-close-btn"
          aria-label="Close Lightbox"
          onClick={closeLightbox}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
        <button
          className="lightbox-nav lightbox-prev"
          id="lightbox-prev-btn"
          aria-label="Previous Image"
          onClick={prevImage}
        >
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
          {activeIndex !== null && (
            <img
              src={galleryItems[activeIndex].src}
              alt={galleryItems[activeIndex].title}
              className="lightbox-img"
              id="lightbox-display-img"
            />
          )}
          <div className="lightbox-caption">
            <p className="lightbox-title" id="lightbox-display-title">
              {activeIndex !== null ? galleryItems[activeIndex].title : ''}
            </p>
          </div>
        </div>
        <button
          className="lightbox-nav lightbox-next"
          id="lightbox-next-btn"
          aria-label="Next Image"
          onClick={nextImage}
        >
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </section>
  );
}

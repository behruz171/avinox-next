'use client';

import { useLanguage } from '@/components/LanguageProvider';

const products = [
  {
    id: 'prod-tables',
    img: '/imgs/tables.png',
    alt: 'Stainless Steel Kitchen Table',
    titleKey: 'products.table.title',
    descKey: 'products.table.desc',
    actionId: 'action-tables',
  },
  {
    id: 'prod-sinks',
    img: '/imgs/Vitichka.png',
    alt: 'Industrial Stainless Steel Sink',
    titleKey: 'products.vitichka.title',
    descKey: 'products.vitichka.desc',
    actionId: 'action-sinks',
  },
  {
    id: 'prod-basins',
    img: '/imgs/basins.png',
    alt: 'Stainless Wash Basin',
    titleKey: 'products.basins.title',
    descKey: 'products.basins.desc',
    actionId: 'action-basins',
  },
  {
    id: 'prod-shelves',
    img: '/imgs/a-shelves.png',
    alt: 'Stainless Steel Kitchen Shelves',
    titleKey: 'products.shelves.title',
    descKey: 'products.shelves.desc',
    actionId: 'action-shelves',
  },
  {
    id: 'prod-cabinets',
    img: '/imgs/tables.png',
    style: { filter: 'hue-rotate(15deg) brightness(0.6)' },
    alt: 'Stainless Steel Cabinets',
    titleKey: 'products.cabinets.title',
    descKey: 'products.cabinets.desc',
    actionId: 'action-cabinets',
  },
  {
    id: 'prod-furniture',
    img: '/imgs/factory.png',
    alt: 'Restaurant Furniture',
    titleKey: 'products.furniture.title',
    descKey: 'products.furniture.desc',
    actionId: 'action-furniture',
  },
  {
    id: 'prod-ventilation',
    img: '/imgs/hero_bg.png',
    alt: 'Ventilation Hoods',
    titleKey: 'products.ventilation.title',
    descKey: 'products.ventilation.desc',
    actionId: 'action-ventilation',
  },
  {
    id: 'prod-custom',
    img: '/imgs/factory.png',
    style: { filter: 'brightness(0.5) sepia(0.2) hue-rotate(-20deg)' },
    alt: 'Custom Stainless Products',
    titleKey: 'products.custom.title',
    descKey: 'products.custom.desc',
    actionId: 'action-custom',
  },
];

export default function ProductsSection() {
  const { t } = useLanguage();

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const inner = card.querySelector('.product-card-inner');
    if (!inner) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const width = rect.width;
    const height = rect.height;

    const rotateX = (y / height - 0.5) * -12;
    const rotateY = (x / width - 0.5) * 12;

    inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    const inner = card.querySelector('.product-card-inner');
    if (inner) {
      inner.style.transform = 'rotateX(0deg) rotateY(0deg) translateY(0deg)';
    }
  };

  return (
    <section className="products-section" id="products">
      <div className="container">
        <div className="products-header">
          <div className="left-col">
            <span className="section-tag">{t('products.tag')}</span>
            <h2 className="heading-md" id="products-heading">
              {t('products.heading')}
            </h2>
          </div>
          <div className="right-col">
            <a href="#contact" className="btn-outline" id="btn-request-catalog">
              {t('products.cta')}
            </a>
          </div>
        </div>

        <div className="products-grid" id="product-cards-container">
          {products.map((prod) => (
            <div
              key={prod.id}
              className="product-card"
              id={prod.id}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div className="product-card-inner">
                <div className="product-image-wrapper">
                  <img
                    src={prod.img}
                    alt={prod.alt}
                    className="product-img"
                    style={prod.style}
                  />
                </div>
                <div className="product-card-content">
                  <h3 className="heading-sm product-title">
                    {t(prod.titleKey)}
                  </h3>
                  <p className="product-desc">{t(prod.descKey)}</p>
                  <a
                    href="#contact"
                    className="product-action"
                    id={prod.actionId}
                  >
                    {t('products.viewDetails')}{' '}
                    <i className="fa-solid fa-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

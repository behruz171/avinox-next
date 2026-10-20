'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/components/LanguageProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import { categories } from '@/lib/categories';
import allProducts from '@/lib/products-data.json';

function ProductsContent() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const initialCategoryParam = searchParams.get('category');

  const [activeCategoryId, setActiveCategoryId] = useState(() => {
    if (initialCategoryParam && categories.some((c) => c.id === initialCategoryParam)) {
      return initialCategoryParam;
    }
    return categories[0].id;
  });

  useEffect(() => {
    if (initialCategoryParam && categories.some((c) => c.id === initialCategoryParam)) {
      setActiveCategoryId(initialCategoryParam);
    }
  }, [initialCategoryParam]);

  const activeCategory =
    categories.find((c) => c.id === activeCategoryId) || categories[0];

  const filteredProducts = allProducts.filter(
    (p) => p.category === activeCategory.id
  );

  return (
    <div>
      <div className="noise-overlay"></div>
      <CustomCursor mode="simple" />
      <Navbar variant="products" />

      <main id="scroll-wrapper">
        <section className="products-hero">
          <div className="container">
            <div className="hero-content">
              <span className="section-tag">{t('productsPage.tag')}</span>
              <h1 className="heading-lg">{t('productsPage.heading')}</h1>
              <p className="hero-subtitle">{t('productsPage.subtitle')}</p>
            </div>
          </div>
        </section>

        <section className="products-section" id="product-categories">
          <div className="container">
            <div className="products-header">
              <div className="left-col">
                <span className="section-tag">{t('productsPage.categoriesTag')}</span>
                <h2 className="heading-md" id="product-view">
                  {t('productsPage.categoriesHeading')}
                </h2>
              </div>
              <div className="right-col">
                <a href="/#contact" className="btn-outline">
                  {t('productsPage.requestQuote')}
                </a>
              </div>
            </div>

            <div className="category-nav" id="category-nav">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  className={`category-btn${cat.id === activeCategoryId ? ' active' : ''}`}
                  onClick={() => setActiveCategoryId(cat.id)}
                >
                  {cat.title}
                </button>
              ))}
            </div>

            <div className="category-description" id="category-description">
              {activeCategory.description}
            </div>

            <div className="products-grid" id="products-grid">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.id}`}
                    className="product-card"
                    style={{ textDecoration: 'none', color: 'inherit', display: 'block', cursor: 'pointer' }}
                  >
                    <div className="product-card-inner">
                      <div className="product-image-wrapper">
                        <img
                          src={`/${product.poster}`}
                          alt={product.name}
                          className="product-img"
                        />
                      </div>
                      <div className="product-card-content">
                        <h3 className="heading-sm product-title">{product.title}</h3>
                        <p className="product-desc">
                          {product.description?.substring(0, 120)}...
                        </p>
                        <span className="product-action">
                          <span>{t('products.viewDetails')}</span>{' '}
                          <i className="fa-solid fa-arrow-right"></i>
                        </span>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <p
                  style={{
                    gridColumn: '1/-1',
                    textAlign: 'center',
                    color: 'var(--text-muted)',
                  }}
                >
                  No products in this category yet.
                </p>
              )}
            </div>
          </div>
        </section>

        <Footer variant="products" />
      </main>
    </div>
  );
}

export default function ProductListingPage() {
  return (
    <Suspense fallback={null}>
      <ProductsContent />
    </Suspense>
  );
}

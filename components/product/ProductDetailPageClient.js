'use client';

import { useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useLanguage } from '@/components/LanguageProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import { BASE_URL, sendToTelegram } from '@/lib/config';
import allProducts from '@/lib/products-data.json';

export default function ProductDetailPageClient({ id }) {
  const { t } = useLanguage();
  const product = allProducts.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  const [modalOpen, setModalOpen] = useState(false);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [feedback, setFeedback] = useState({ text: '', isSuccess: false, isError: false });
  const [submitting, setSubmitting] = useState(false);

  const categoryKey = `category.${product.category}`;
  const categoryLabel = t(categoryKey, product.category);

  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    if (!inquiryName.trim() || !inquiryPhone.trim()) return;

    setSubmitting(true);
    const productUrl = `${BASE_URL}product/${product.id}`;
    const imageUrl = `${BASE_URL}${product.image.replace(/\\/g, '/')}`;

    const text = `
📩 <b>Product Inquiry</b>

👤 <b>Name:</b> ${inquiryName.trim()}
📞 <b>Phone:</b> ${inquiryPhone.trim()}

<b>Product:</b> ${product.title}
🆔 <b>ID:</b> ${product.id}
🔗 <b>Link:</b> <a href="${productUrl}">${productUrl}</a>
`;

    try {
      await sendToTelegram({ text, photo: imageUrl });
      setFeedback({ 
        text: t('product.inquiry.success', 'Request sent successfully! Our managers will contact you soon.'), 
        isSuccess: true, 
        isError: false 
      });
      setInquiryName('');
      setInquiryPhone('');

      setTimeout(() => {
        setModalOpen(false);
        setFeedback({ text: '', isSuccess: false, isError: false });
      }, 3500);
    } catch (err) {
      console.error(err);
      setFeedback({
        text: t('product.inquiry.error', err.message || 'Failed to send request.'),
        isSuccess: false,
        isError: true,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="noise-overlay"></div>
      <CustomCursor mode="simple" />
      <Navbar variant="detail" />

      <main id="scroll-wrapper">
        <section className="product-detail-section">
          <div className="container">
            {/* Breadcrumb */}
            <div className="breadcrumb" id="breadcrumb">
              <Link href="/product" id="breadcrumb-products">
                Products
              </Link>
              <span className="breadcrumb-separator">/</span>
              <span id="breadcrumb-category">{categoryLabel}</span>
              <span className="breadcrumb-separator">/</span>
              <span id="breadcrumb-product">{product.name}</span>
            </div>

            <div className="product-detail-grid">
              {/* Product Image */}
              <div className="product-detail-image-col">
                <div className="product-detail-image-wrapper glass-panel">
                  <img
                    id="product-main-image"
                    src={`/${product.image}`}
                    alt={product.name}
                    className="product-detail-image"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Product Info */}
              <div className="product-detail-info-col">
                <h1 className="product-detail-title" id="product-title">
                  {product.title}
                </h1>

                <div className="product-detail-meta">
                  <span
                    className={`product-category-badge category-${product.category}`}
                    id="product-category"
                  >
                    {categoryLabel}
                  </span>
                  <span className="product-id-text" id="product-id-display">
                    ID: {product.id}
                  </span>
                </div>

                <p className="product-detail-description" id="product-description">
                  {product.description}
                </p>

                {/* Call to Action */}
                <div className="product-detail-cta">
                  <button
                    type="button"
                    className="btn-gold"
                    id="btn-contact-about-product"
                    onClick={() => {
                      setFeedback({ text: '', isSuccess: false, isError: false });
                      setModalOpen(true);
                    }}
                  >
                    <i className="fa-solid fa-envelope"></i>{' '}
                    {t('product.button.about')}
                  </button>
                  <Link
                    href="/product"
                    className="btn-outline"
                    id="btn-back-to-products"
                  >
                    <i className="fa-solid fa-arrow-left"></i>{' '}
                    {t('product.button.back')}
                  </Link>
                </div>

                {/* Specifications */}
                <div className="product-detail-additional glass-panel">
                  <h3 className="additional-info-title">
                    {t('product.specifications')}
                  </h3>
                  <ul className="additional-info-list">
                    <li id="product_metal_type">
                      <strong>{t('product.metal.type')}</strong> {product.metal_type || 'N/A'}
                    </li>
                    <li id="product_size">
                      <strong>{t('product.size')}</strong> {product.size || 'N/A'}
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
              <div className="related-products-section">
                <h2 className="heading-md">{t('related')}</h2>
                <div className="related-products-grid" id="related-products-grid">
                  {relatedProducts.map((p) => (
                    <Link
                      key={p.id}
                      href={`/product/${p.id}`}
                      className="product-card"
                      style={{ textDecoration: 'none', color: 'inherit', display: 'block', cursor: 'pointer' }}
                    >
                      <div className="product-card-inner">
                        <div className="product-image-wrapper">
                          <img
                            src={`/${p.image}`}
                            alt={p.name}
                            className="product-img"
                            loading="lazy"
                          />
                        </div>
                        <div className="product-card-content">
                          <h3 className="heading-sm product-title">{p.title}</h3>
                          <p className="product-desc">
                            {p.description?.substring(0, 100)}...
                          </p>
                          <span className="product-action">
                            <span>{t('products.viewDetails')}</span>{' '}
                            <i className="fa-solid fa-arrow-right"></i>
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        <Footer variant="detail" />
      </main>

      {/* Inquiry Modal */}
      <div
        className={`modal-overlay${modalOpen ? ' active' : ''}`}
        id="inquiry-modal"
        onClick={() => setModalOpen(false)}
      >
        <div
          className="modal-content glass-panel"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="modal-close"
            id="modal-close-btn"
            onClick={() => setModalOpen(false)}
          >
            &times;
          </button>
          <h3 className="modal-title">
            {t('product.inquiry.title', 'Inquire About This Product')}
          </h3>
          <form id="inquiry-form" onSubmit={handleInquirySubmit}>
            <div className="form-group">
              <label htmlFor="inquiry-name">{t('contact.form.name.label')}</label>
              <input
                type="text"
                id="inquiry-name"
                className="form-input"
                value={inquiryName}
                onChange={(e) => setInquiryName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="inquiry-phone">{t('contact.form.phone.label')}</label>
              <input
                type="tel"
                id="inquiry-phone"
                className="form-input"
                value={inquiryPhone}
                onChange={(e) => setInquiryPhone(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="btn-gold modal-submit"
              disabled={submitting}
            >
              {submitting ? '...' : t('product.inquiry.submit', 'Send Request')}
            </button>
            {feedback.text && (
              <div
                className={`inquiry-feedback-banner ${feedback.isSuccess ? 'success' : 'error'}`}
              >
                <div className="feedback-icon-box">
                  <i className={`fa-solid ${feedback.isSuccess ? 'fa-circle-check' : 'fa-circle-exclamation'}`}></i>
                </div>
                <div className="feedback-content">
                  <p className="feedback-title">
                    {feedback.isSuccess 
                      ? (t('feedback.successTitle', 'Muvaffaqiyatli!')) 
                      : (t('feedback.errorTitle', 'Xatolik!'))}
                  </p>
                  <p className="feedback-desc">{feedback.text}</p>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

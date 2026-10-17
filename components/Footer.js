'use client';

import Link from 'next/link';
import { useLanguage } from './LanguageProvider';

function HomeFooter() {
  const { t } = useLanguage();
  return (
    <footer className="footer" id="footer-section">
      <div className="footer-top">
        <div className="footer-brand-col">
          <a href="#" className="footer-logo" id="footer-brand-logo">AVINOX</a>
          <p className="footer-desc">{t('footer.about')}</p>
          <div className="footer-socials">
            <a href="https://www.instagram.com/avinox.uz/" className="footer-social-link" id="foot-soc-instagram" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
            <a href="https://t.me/avinox2025" className="footer-social-link" id="foot-soc-telegram" aria-label="Telegram"><i className="fa-brands fa-telegram"></i></a>
            <a href="#" className="footer-social-link" id="soc-pinterest" aria-label="Pinterest"><i className="fa-brands fa-pinterest-p"></i></a>
            <a href="#" className="footer-social-link" id="soc-youtube" aria-label="YouTube"><i className="fa-brands fa-youtube"></i></a>
          </div>
        </div>

        <div>
          <h4 className="footer-col-title">{t('footer.nav.title')}</h4>
          <ul className="footer-links">
            <li><Link href="/" id="foot-home">{t('footer.nav.home')}</Link></li>
            <li><Link href="/product" id="foot-products">{t('footer.nav.products')}</Link></li>
            <li><a href="/#gallery" id="foot-gallery">{t('footer.nav.gallery')}</a></li>
            <li><a href="/#about" id="foot-about">{t('footer.nav.about')}</a></li>
            <li><a href="/#contact" id="foot-contact">{t('footer.nav.contact')}</a></li>
          </ul>
        </div>

        <div>
          <h4 className="footer-col-title">{t('footer.products.title')}</h4>
          <ul className="footer-links">
            <li><Link href="/product?category=stoly" id="foot-tables">{t('footer.products.tables')}</Link></li>
            <li><Link href="/product?category=moyki" id="foot-sinks">{t('footer.products.sinks')}</Link></li>
            <li><Link href="/product?category=stellazhy" id="foot-shelves">{t('footer.products.shelves')}</Link></li>
            <li><Link href="/product?category=shkafy" id="foot-cabinets">{t('footer.products.cabinets')}</Link></li>
            <li><Link href="/product?category=marmit" id="foot-custom">{t('footer.products.custom')}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="footer-col-title">{t('footer.hq.title')}</h4>
          <p
            style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.7 }}
            dangerouslySetInnerHTML={{ __html: t('footer.hq.text') }}
          />
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-copy">{t('footer.copy')}</p>
        <div className="footer-legal-links">
          <a href="#" id="legal-privacy">{t('footer.legal.privacy')}</a>
          <a href="#" id="legal-terms">{t('footer.legal.terms')}</a>
          <a href="#" id="legal-specs">{t('footer.legal.specs')}</a>
        </div>
      </div>
    </footer>
  );
}

function ProductsFooter() {
  return (
    <footer className="footer" id="footer-section">
      <div className="footer-top">
        <div className="footer-brand-col">
          <Link href="/" className="footer-logo">AVINOX</Link>
          <p className="footer-desc">Explore our separate product categories and contact AVINOX to order custom stainless steel solutions.</p>
        </div>
        <div>
          <h4 className="footer-col-title">Quick Links</h4>
          <ul className="footer-links">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/product">Products</Link></li>
            <li><a href="/#gallery">Gallery</a></li>
            <li><a href="/#about">About</a></li>
            <li><a href="/#contact">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="footer-copy">&copy; 2026 AVINOX Steel Inc. All rights reserved.</p>
      </div>
    </footer>
  );
}

function DetailFooter() {
  const { t } = useLanguage();
  return (
    <footer className="footer" id="footer-section">
      <div className="footer-top">
        <div className="footer-brand-col">
          <Link href="/" className="footer-logo">AVINOX</Link>
          <p className="footer-desc">{t('footer.about')}</p>
          <div className="footer-socials">
            <a href="https://www.instagram.com/avinox.uz/" className="footer-social-link" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
            <a href="https://t.me/avinox2025" className="footer-social-link" aria-label="Telegram"><i className="fa-brands fa-telegram"></i></a>
          </div>
        </div>

        <div>
          <h4 className="footer-col-title">{t('footer.nav.title')}</h4>
          <ul className="footer-links">
            <li><Link href="/">{t('footer.nav.home')}</Link></li>
            <li><Link href="/product">{t('footer.nav.products')}</Link></li>
            <li><a href="/#contact">{t('footer.nav.contact')}</a></li>
          </ul>
        </div>

        <div>
          <h4 className="footer-col-title">Contact</h4>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            +998 (97) 335-33-33<br />
            projects@avinox-steel.com
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-copy">{t('footer.copy')}</p>
      </div>
    </footer>
  );
}

export default function Footer({ variant = 'home' }) {
  if (variant === 'products') return <ProductsFooter />;
  if (variant === 'detail') return <DetailFooter />;
  return <HomeFooter />;
}

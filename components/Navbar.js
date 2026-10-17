'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from './LanguageProvider';
import { startLenis, stopLenis } from '@/lib/lenisStore';

const LINKS = {
  home: [
    ['link-home', '#', 'nav.home', 'Home'],
    ['link-products', '/product', 'nav.products', 'Products'],
    ['link-gallery', '#gallery', 'nav.gallery', 'Gallery'],
    ['link-about', '#about', 'nav.about', 'About'],
    ['link-why-us', '#why-us', 'nav.why', 'Why Us'],
    ['link-testimonials', '#testimonials', 'nav.testimonials', 'Testimonials'],
    ['link-contact', '#contact', 'nav.contact', 'Contact'],
  ],
  products: [
    ['link-home', '/', 'nav.home', 'Home'],
    ['link-products', '/product', 'nav.products', 'Products'],
    ['link-gallery', '/#gallery', 'nav.gallery', 'Gallery'],
    ['link-about', '/#about', 'nav.about', 'About'],
    ['link-why-us', '/#why-us', 'nav.why', 'Why Us'],
    ['link-testimonials', '/#testimonials', 'nav.testimonials', 'Testimonials'],
    ['link-contact', '/#contact', 'nav.contact', 'Contact'],
  ],
  detail: [
    ['link-home', '/', 'nav.home', 'Home'],
    ['link-products', '/product', 'nav.products', 'Products'],
    ['link-gallery', '/#gallery', 'nav.gallery', 'Gallery'],
    ['link-about', '/#about', 'nav.about', 'About'],
    ['link-contact', '/#contact', 'nav.contact', 'Contact'],
  ],
};

export default function Navbar({ variant = 'home' }) {
  const { lang, setLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Navbar scrolling style
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleMenu = () => {
    const next = !menuOpen;
    setMenuOpen(next);
    // Stop scrolling background while the mobile drawer is open
    next ? stopLenis() : startLenis();
  };

  const closeMenu = () => {
    setMenuOpen(false);
    startLenis();
  };

  const isHome = variant === 'home';

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`} id="main-nav">
      <a href={isHome ? '#' : '/'} className="nav-brand" id="logo-link">
        <img src="/imgs/logo.png" alt="AVINOX Logo" id="logo-img" />
        <span>AVINOX</span>
      </a>

      <ul className={`nav-links${menuOpen ? ' active' : ''}`} id="nav-menu">
        {LINKS[variant].map(([id, href, key, fallback]) => (
          <li key={id}>
            {href.startsWith('/') && !href.includes('#') ? (
              <Link href={href} className="nav-link" id={id} onClick={closeMenu}>
                {t(key, fallback)}
              </Link>
            ) : (
              <a href={href} className="nav-link" id={id} onClick={closeMenu}>
                {t(key, fallback)}
              </a>
            )}
          </li>
        ))}
        <li>
          <a href="https://www.instagram.com/avinox.uz/" className="navbar-social-link instagram" id="soc-instagram" aria-label="Instagram">
            <i className="fa-brands fa-instagram"></i>
          </a>
        </li>
        <li>
          <a href="https://t.me/avinox2025" className="navbar-social-link telegram" id="soc-telegram" aria-label="Telegram">
            <i className="fa-brands fa-telegram"></i>
          </a>
        </li>
      </ul>

      <div className="nav-controls">
        <select
          className="language-switcher"
          id="language-switcher"
          aria-label="Select language"
          value={lang}
          onChange={(e) => setLang(e.target.value)}
        >
          <option value="en">EN</option>
          <option value="ru">RU</option>
          <option value="uz">UZ</option>
        </select>
        <button className="nav-toggle" id="menu-toggle" aria-label="Toggle Navigation Menu" onClick={toggleMenu}>
          <i className={menuOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'} id="toggle-icon"></i>
        </button>
      </div>
    </nav>
  );
}

'use client';

import { useState } from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { sendToTelegram } from '@/lib/config';

export default function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    business: '',
    message: '',
  });
  const [feedback, setFeedback] = useState({ message: '', isSuccess: false, isError: false });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const text = `
📩 <b>New Website Request</b>

👤 <b>Name:</b> ${formData.name}
🏢 <b>Business:</b> ${formData.business}
📞 <b>Phone:</b> ${formData.phone}

💬 <b>Message:</b>
${formData.message}
`;

    try {
      await sendToTelegram({ text });

      setFeedback({
        message: t('contact.form.feedback') || 'Message sent successfully!',
        isSuccess: true,
        isError: false,
      });

      setFormData({ name: '', phone: '', business: '', message: '' });

      setTimeout(() => {
        setFeedback({ message: '', isSuccess: false, isError: false });
      }, 6000);
    } catch (err) {
      console.error(err);
      setFeedback({
        message: err.message || 'Failed to send message.',
        isSuccess: false,
        isError: true,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="contact-section" id="contact">
      <div className="container">
        <div className="contact-grid">
          {/* Info Column */}
          <div className="contact-info-col" id="contact-info-panel">
            <div className="contact-info-block">
              <span className="section-tag">{t('contact.tag')}</span>
              <h2 className="heading-md" id="contact-info-heading">
                {t('contact.heading')}
              </h2>
              <p
                style={{
                  color: 'var(--text-muted)',
                  lineHeight: 1.7,
                  fontWeight: 300,
                }}
              >
                {t('contact.desc')}
              </p>
            </div>

            <div className="contact-info-block" style={{ gap: '2rem' }}>
              <div className="contact-item">
                <div className="contact-item-icon">
                  <i className="fa-solid fa-location-dot"></i>
                </div>
                <div>
                  <h4 className="contact-item-title">{t('contact.office.title')}</h4>
                  <p className="contact-item-text">{t('contact.office.text')}</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-item-icon">
                  <i className="fa-solid fa-phone"></i>
                </div>
                <div>
                  <h4 className="contact-item-title">{t('contact.phone.title')}</h4>
                  <p className="contact-item-text">+998 (97) 335-33-33</p>
                  <p className="contact-item-text">+998 (97) 959-00-07</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-item-icon">
                  <i className="fa-solid fa-envelope"></i>
                </div>
                <div>
                  <h4 className="contact-item-title">{t('contact.mail.title')}</h4>
                  <p className="contact-item-text">projects@avinox-steel.com</p>
                </div>
              </div>
            </div>

            <div className="contact-map-wrapper" id="office-map">
              <iframe
                id="map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2994.838526586222!2d69.22595590353012!3d41.3558633373593!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38aef52158742e91%3A0x98fe9c641f52ffad!2sOOO%20AVINOX!5e0!3m2!1sru!2s!4v1782901377212!5m2!1sru!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen=""
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Form Column */}
          <div className="glass-panel contact-form-panel" id="form-panel">
            <form className="contact-form" id="project-contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  id="form-name"
                  className="form-input"
                  placeholder=" "
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="form-name" className="form-label">
                  {t('contact.form.name.label')}
                </label>
              </div>

              <div className="form-group">
                <input
                  type="tel"
                  name="phone"
                  id="form-phone"
                  className="form-input"
                  placeholder=" "
                  value={formData.phone}
                  onChange={handleChange}
                />
                <label htmlFor="form-phone" className="form-label">
                  {t('contact.form.phone.label')}
                </label>
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="business"
                  id="form-business"
                  className="form-input"
                  placeholder=" "
                  value={formData.business}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="form-business" className="form-label">
                  {t('contact.form.business.label')}
                </label>
              </div>

              <div className="form-group">
                <textarea
                  name="message"
                  id="form-message"
                  className="form-input"
                  rows="4"
                  placeholder=" "
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
                <label htmlFor="form-message" className="form-label">
                  {t('contact.form.message.label')}
                </label>
              </div>

              <button
                type="submit"
                className="btn-gold contact-submit-btn"
                id="btn-submit-form"
                disabled={submitting}
              >
                {t('contact.form.submit')}
              </button>

              <div
                className={`form-feedback${feedback.message ? ' visible' : ''}`}
                id="form-message-feedback"
                style={{
                  color: feedback.isError ? '#ff4d4f' : '#4CAF50',
                  display: feedback.message ? 'block' : 'none',
                }}
              >
                {feedback.message}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

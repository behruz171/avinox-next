'use client';

import { useLanguage } from '@/components/LanguageProvider';

export default function About() {
  const { t } = useLanguage();

  return (
    <section className="about-section" id="about">
      <div className="container">
        <div className="about-grid">
          <div className="about-left" id="about-content-col">
            <span className="section-tag">{t('about.tag')}</span>
            <h2 className="heading-md" id="about-heading">
              {t('about.heading')}
            </h2>
            <p className="about-desc">{t('about.desc')}</p>

            <div className="timeline" id="about-timeline">
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <h3 className="timeline-title">
                  {t('about.timeline.craft.title')}
                </h3>
                <p className="timeline-text">
                  {t('about.timeline.craft.text')}
                </p>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <h3 className="timeline-title">
                  {t('about.timeline.alloys.title')}
                </h3>
                <p className="timeline-text">
                  {t('about.timeline.alloys.text')}
                </p>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <h3 className="timeline-title">
                  {t('about.timeline.prototyping.title')}
                </h3>
                <p className="timeline-text">
                  {t('about.timeline.prototyping.text')}
                </p>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <h3 className="timeline-title">
                  {t('about.timeline.global.title')}
                </h3>
                <p className="timeline-text">
                  {t('about.timeline.global.text')}
                </p>
              </div>
            </div>
          </div>

          <div className="about-right" id="about-visual-col">
            <img
              src="/imgs/factory.png"
              alt="AVINOX Metalwork Factory Workshop"
              id="about-factory-img"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/components/LanguageProvider';

export default function Stats() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const [triggered, setTriggered] = useState(false);
  const [counts, setCounts] = useState({
    projects: 0,
    years: 0,
    clients: 0,
    custom: 0,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !triggered) {
          setTriggered(true);

          const duration = 2500; // 2.5s
          const fps = 60;
          const totalFrames = (duration / 1000) * fps;
          let frame = 0;

          const targets = {
            projects: 500,
            years: 5,
            clients: 30,
            custom: 100,
          };

          const timer = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;

            setCounts({
              projects: Math.min(targets.projects, Math.floor(targets.projects * progress)),
              years: Math.min(targets.years, Math.floor(targets.years * progress)),
              clients: Math.min(targets.clients, Math.floor(targets.clients * progress)),
              custom: Math.min(targets.custom, Math.floor(targets.custom * progress)),
            });

            if (frame >= totalFrames) {
              clearInterval(timer);
              setCounts(targets);
            }
          }, 1000 / fps);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [triggered]);

  return (
    <section className="stats-section" id="stats" ref={sectionRef}>
      <div className="container">
        <div className="stats-grid">
          <div className="stat-card" id="stat-projects">
            <div className="stat-number" id="stat-count-projects">
              {triggered ? `${counts.projects}+` : '0'}
            </div>
            <div className="stat-label">{t('stats.projects')}</div>
          </div>
          <div className="stat-card" id="stat-years">
            <div className="stat-number" id="stat-count-years">
              {triggered ? `${counts.years}+` : '0'}
            </div>
            <div className="stat-label">{t('stats.years')}</div>
          </div>
          <div className="stat-card" id="stat-clients">
            <div className="stat-number" id="stat-count-clients">
              {triggered ? `${counts.clients}+` : '0'}
            </div>
            <div className="stat-label">{t('stats.clients')}</div>
          </div>
          <div className="stat-card" id="stat-custom">
            <div className="stat-number" id="stat-count-custom">
              {triggered ? `${counts.custom}%` : '0'}
            </div>
            <div className="stat-label">{t('stats.custom')}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

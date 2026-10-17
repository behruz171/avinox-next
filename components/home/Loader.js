'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

/* 2. LOADING SCREEN */
export default function Loader({ onComplete }) {
  const loaderRef = useRef(null);
  const barRef = useRef(null);
  const percRef = useRef(null);
  const logoRef = useRef(null);
  const onCompleteRef = useRef(onComplete);
  const [hidden, setHidden] = useState(false);

  onCompleteRef.current = onComplete;

  useEffect(() => {
    let progress = 0;
    let tl;

    gsap.to(logoRef.current, { opacity: 1, y: 0, duration: 1, ease: 'power2.out' });

    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 12) + 6;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);

        tl = gsap.timeline({
          onComplete: () => {
            setHidden(true);
            onCompleteRef.current?.();
          },
        });

        tl.to(barRef.current, { width: '100%', duration: 0.3 })
          .to(percRef.current, { opacity: 0, y: -10, duration: 0.3 })
          .to(logoRef.current, { opacity: 0, y: -20, duration: 0.4 }, '-=0.2')
          .to(loaderRef.current, { opacity: 0, yPercent: -100, duration: 1.2, ease: 'power4.inOut' }, '-=0.2');
      }

      if (barRef.current) barRef.current.style.width = progress + '%';
      if (percRef.current) percRef.current.textContent = progress + '%';
    }, 70);

    return () => {
      clearInterval(interval);
      tl?.kill();
    };
  }, []);

  return (
    <div className="loader-wrapper" id="loader" ref={loaderRef} style={hidden ? { display: 'none' } : undefined}>
      <div className="loader-logo" id="loader-logo" ref={logoRef}>AVINOX</div>
      <div className="loader-bar-container">
        <div className="loader-bar" id="loader-bar" ref={barRef}></div>
      </div>
      <div className="loader-percentage" id="loader-perc" ref={percRef}>0%</div>
    </div>
  );
}

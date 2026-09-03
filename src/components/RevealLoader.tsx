'use client';

import { useEffect } from 'react';

export default function RevealLoader() {
  useEffect(() => {
    const selector =
      '.fade-up, .fade-down, .fade-left, .fade-right, .zoom-in-bounce, .scale-in, .company-fade-up, .network-fade-up, .services-reveal, .map-reveal, .flip-up';

    const revealElements = document.querySelectorAll<HTMLElement>(selector);
    if (revealElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );

    revealElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
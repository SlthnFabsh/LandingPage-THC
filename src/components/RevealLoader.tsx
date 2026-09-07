'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function RevealLoader() {
  const pathname = usePathname();

  useEffect(() => {
    const selector =
      '.fade-up, .fade-down, .fade-left, .fade-right, .zoom-in-bounce, .scale-in, .company-fade-up, .network-fade-up, .services-reveal, .map-reveal, .flip-up';

    const activate = (el: Element) => el.classList.add('active');

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

    revealElements.forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight) {
        activate(el);
      } else {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
document.addEventListener('DOMContentLoaded', () => {
  // 1. Floating Navbar scroll transformation
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        navbar.classList.add('py-1', 'sm:py-1.5', 'bg-[#dcdfe4]/98', 'shadow-2xl', 'shadow-slate-950/30');
        navbar.classList.remove('py-1.5', 'sm:py-2', 'bg-[#dcdfe4]/95');
      } else {
        navbar.classList.remove('py-1', 'sm:py-1.5', 'bg-[#dcdfe4]/98', 'shadow-2xl', 'shadow-slate-950/30');
        navbar.classList.add('py-1.5', 'sm:py-2', 'bg-[#dcdfe4]/95');
      }
    });
  }

  // 2. Mobile Menu Drawer Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuClose = document.getElementById('mobile-menu-close');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.remove('hidden');
      setTimeout(() => {
        mobileMenu.classList.remove('opacity-0', 'translate-x-full');
      }, 10);
    });

    if (mobileMenuClose) {
      mobileMenuClose.addEventListener('click', closeMobileMenu);
    }

    // Close when clicking link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });
  }

  function closeMobileMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.add('opacity-0', 'translate-x-full');
    setTimeout(() => {
      mobileMenu.classList.add('hidden');
    }, 300);
  }

  // 3. FAQ Accordion Toggle
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    const content = item.querySelector('.faq-content');
    const icon = item.querySelector('.faq-icon');

    if (header && content) {
      header.addEventListener('click', () => {
        const isOpen = !content.classList.contains('hidden');

        // Close all other FAQ items for a accordion feel
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            const otherContent = otherItem.querySelector('.faq-content');
            const otherIcon = otherItem.querySelector('.faq-icon');
            if (otherContent) otherContent.classList.add('hidden');
            if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
          }
        });

        // Toggle current FAQ item
        if (isOpen) {
          content.classList.add('hidden');
          if (icon) icon.style.transform = 'rotate(0deg)';
        } else {
          content.classList.remove('hidden');
          if (icon) icon.style.transform = 'rotate(180deg)';
        }
      });
    }
  });

  // 4. Back to Top Button
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
        backToTopBtn.classList.add('opacity-100', 'translate-y-0');
      } else {
        backToTopBtn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
        backToTopBtn.classList.remove('opacity-100', 'translate-y-0');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 5. Number Counter Animation (Efek Hitung dari 0 ke Angka Tujuan)
  const counterElements = document.querySelectorAll('[data-counter-target]');
  if (counterElements.length > 0) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const targetEl = entry.target;
          const targetNum = parseInt(targetEl.getAttribute('data-counter-target'), 10);
          const suffix = targetEl.getAttribute('data-counter-suffix') || '';
          const prefix = targetEl.getAttribute('data-counter-prefix') || '';
          const duration = 2200; // Durasi 2.2 detik
          const startTime = performance.now();

          function updateCounter(currentTime) {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            
            // Easing Out Expo untuk gerakan halus
            const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            const currentNum = Math.floor(easeProgress * targetNum);

            targetEl.textContent = `${prefix}${currentNum}${suffix}`;

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              targetEl.textContent = `${prefix}${targetNum}${suffix}`;
            }
          }

          requestAnimationFrame(updateCounter);
          observer.unobserve(targetEl);
        }
      });
    }, { threshold: 0.2 });

    counterElements.forEach(el => counterObserver.observe(el));
  }

  // 6. Scroll Reveal Animation (Animasi Kedatangan Teks & Kartu)
  const fadeUpElements = document.querySelectorAll('.fade-up');
  if (fadeUpElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.15 });

    fadeUpElements.forEach(el => revealObserver.observe(el));
  }

  // 7. Video Fallback Warning Console Log & Status check
  const videoElem = document.getElementById('hero-bg-video');
  if (videoElem) {
    videoElem.addEventListener('error', () => {
      console.log('Video background note: No video file present yet in src. Displaying aesthetic blue gradient fallback.');
    });
  }
});

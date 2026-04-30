/* ============================================
   Popaism corporate site — main.js
   GSAP 3.x + ScrollTrigger
   ============================================ */

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {

  /* ===== NAV: shadow on scroll ===== */
  const nav = document.getElementById('nav');
  if (nav) {
    const onScroll = () => {
      if (window.scrollY > 20) nav.classList.add('nav-scrolled');
      else nav.classList.remove('nav-scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ===== HERO: entrance animation ===== */
  gsap.from('.hero-circle, .hero-circle-outline, .hero-circle-small', {
    opacity: 0,
    scale: 0.85,
    duration: 1.4,
    stagger: 0.12,
    ease: 'power2.out'
  });

  /* Hero entrance handled by CSS @keyframes hero-fade-in */

  /* ===== COUNTER UP ===== */
  document.querySelectorAll('.counter-number').forEach(el => {
    const target = parseInt(el.dataset.target, 10);
    if (Number.isNaN(target)) return;
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = Math.ceil(obj.val);
          },
          onComplete: () => {
            el.textContent = target;
          }
        });
      }
    });
  });

  /* ===== Section headers (shared reveal) ===== */
  gsap.utils.toArray('.section-header').forEach(el => {
    gsap.set(el.children, { opacity: 0, y: 28 });
    gsap.to(el.children, {
      scrollTrigger: { trigger: el, start: 'top 85%' },
      opacity: 1,
      y: 0,
      stagger: 0.1,
      duration: 0.7,
      ease: 'power2.out',
      overwrite: 'auto'
    });
  });

  /* ===== SERVICES cards ===== */
  gsap.set('.service-card', { opacity: 0, y: 60 });
  gsap.to('.service-card', {
    scrollTrigger: { trigger: '.service-grid', start: 'top 78%' },
    opacity: 1,
    y: 0,
    stagger: 0.15,
    duration: 0.8,
    ease: 'power2.out',
    overwrite: 'auto'
  });

  /* ===== PHILOSOPHY ===== */
  gsap.utils.toArray('.philosophy-item').forEach((item) => {
    const isEven = Array.from(item.parentNode.children).indexOf(item) % 2 === 1;
    const letter = item.querySelector('.philosophy-letter');
    const content = item.querySelector('.philosophy-content');
    gsap.set(letter, { opacity: 0, x: isEven ? 60 : -60 });
    gsap.set(content, { opacity: 0, y: 30 });
    gsap.to(letter, {
      scrollTrigger: { trigger: item, start: 'top 80%' },
      opacity: 1,
      x: 0,
      duration: 0.9,
      ease: 'power2.out',
      overwrite: 'auto'
    });
    gsap.to(content, {
      scrollTrigger: { trigger: item, start: 'top 80%' },
      opacity: 1,
      y: 0,
      duration: 0.7,
      delay: 0.15,
      ease: 'power2.out',
      overwrite: 'auto'
    });
  });

  /* ===== DECK card ===== */
  gsap.set('.deck-card', { opacity: 0, y: 40 });
  gsap.to('.deck-card', {
    scrollTrigger: { trigger: '.deck-wrapper', start: 'top 80%' },
    opacity: 1,
    y: 0,
    duration: 0.9,
    ease: 'power2.out',
    overwrite: 'auto'
  });

  /* ===== PROCESS steps ===== */
  gsap.set('.process-step', { opacity: 0, x: -40 });
  gsap.to('.process-step', {
    scrollTrigger: { trigger: '.process-section', start: 'top 75%' },
    opacity: 1,
    x: 0,
    stagger: 0.18,
    duration: 0.7,
    ease: 'power2.out',
    overwrite: 'auto'
  });

  /* ===== RESULTS cards ===== */
  gsap.set('.result-card', { opacity: 0, y: 50 });
  gsap.to('.result-card', {
    scrollTrigger: { trigger: '.results-grid', start: 'top 80%' },
    opacity: 1,
    y: 0,
    stagger: 0.12,
    duration: 0.7,
    ease: 'power2.out',
    overwrite: 'auto'
  });

  /* ===== TEAM cards ===== */
  gsap.set('.team-card', { opacity: 0, y: 50 });
  gsap.to('.team-card', {
    scrollTrigger: { trigger: '.team-grid', start: 'top 80%' },
    opacity: 1,
    y: 0,
    stagger: 0.18,
    duration: 0.8,
    ease: 'power2.out',
    overwrite: 'auto'
  });

  /* ===== CTA ===== */
  gsap.set('.cta-content > *', { opacity: 0, y: 40 });
  gsap.to('.cta-content > *', {
    scrollTrigger: { trigger: '.cta-section', start: 'top 78%' },
    opacity: 1,
    y: 0,
    stagger: 0.12,
    duration: 0.75,
    ease: 'power2.out',
    overwrite: 'auto'
  });

  /* ===== Smooth in-page scroll (offset for fixed nav) ===== */
  const NAV_OFFSET = 80;
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

});

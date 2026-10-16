/* ============================================
   Best Process LP — bp.js
   GSAP 3.x + ScrollTrigger (progressive enhancement)
   ============================================ */

const bpHasGsap = typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined';
if (bpHasGsap) gsap.registerPlugin(ScrollTrigger);

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

  /* ===== COST simulator ===== */
  const costSim = document.getElementById('bp-cost-sim');
  const costTotal = document.getElementById('bp-cost-total-val');
  if (costSim && costTotal) {
    const fields = costSim.querySelectorAll('.bp-cost-field');
    const toHalfWidth = s => s.replace(/[０-９．]/g, ch => '0123456789.'['０１２３４５６７８９．'.indexOf(ch)]);
    const update = () => {
      let total = 0;
      fields.forEach(f => {
        const v = parseFloat(toHalfWidth(f.value).replace(/[^0-9.]/g, ''));
        if (!Number.isNaN(v)) total += v;
      });
      const rounded = Math.round(total * 10) / 10;
      costTotal.textContent = rounded.toLocaleString('ja-JP');
    };
    fields.forEach(f => f.addEventListener('input', update));
    update();
  }

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

  if (!bpHasGsap) return;

  /* ===== HERO: entrance animation ===== */
  gsap.from('.hero-circle, .hero-circle-outline, .hero-circle-small', {
    opacity: 0,
    scale: 0.85,
    duration: 1.4,
    stagger: 0.12,
    ease: 'power2.out'
  });

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

  /* ===== PROBLEM cards ===== */
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
  gsap.set('.bp-cause-band', { opacity: 0, y: 40 });
  gsap.to('.bp-cause-band', {
    scrollTrigger: { trigger: '.bp-cause-band', start: 'top 85%' },
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power2.out',
    overwrite: 'auto'
  });

  /* ===== COST cards ===== */
  gsap.set('.bp-cost-card', { opacity: 0, y: 50 });
  gsap.to('.bp-cost-card', {
    scrollTrigger: { trigger: '.bp-cost-grid', start: 'top 80%' },
    opacity: 1,
    y: 0,
    stagger: 0.15,
    duration: 0.8,
    ease: 'power2.out',
    overwrite: 'auto'
  });

  /* ===== SERVICE steps ===== */
  gsap.utils.toArray('.bp-step').forEach(item => {
    gsap.set(item, { opacity: 0, x: -40 });
    gsap.to(item, {
      scrollTrigger: { trigger: item, start: 'top 82%' },
      opacity: 1,
      x: 0,
      duration: 0.7,
      ease: 'power2.out',
      overwrite: 'auto'
    });
  });
  gsap.set('.bp-highlight, .bp-report-band', { opacity: 0, y: 40 });
  gsap.utils.toArray('.bp-highlight, .bp-report-band').forEach(el => {
    gsap.to(el, {
      scrollTrigger: { trigger: el, start: 'top 82%' },
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: 'power2.out',
      overwrite: 'auto'
    });
  });
  gsap.set('.bp-shot', { opacity: 0, y: 40 });
  gsap.to('.bp-shot', {
    scrollTrigger: { trigger: '.bp-shots-grid', start: 'top 82%' },
    opacity: 1,
    y: 0,
    stagger: 0.1,
    duration: 0.7,
    ease: 'power2.out',
    overwrite: 'auto'
  });

  /* ===== PRICE cards ===== */
  gsap.set('.bp-plan-card', { opacity: 0, y: 50 });
  gsap.to('.bp-plan-card', {
    scrollTrigger: { trigger: '.bp-plan-grid', start: 'top 80%' },
    opacity: 1,
    y: 0,
    stagger: 0.12,
    duration: 0.8,
    ease: 'power2.out',
    overwrite: 'auto'
  });
  gsap.set('.bp-includes-band', { opacity: 0, y: 40 });
  gsap.to('.bp-includes-band', {
    scrollTrigger: { trigger: '.bp-includes-band', start: 'top 85%' },
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power2.out',
    overwrite: 'auto'
  });

  /* ===== FLOW steps ===== */
  gsap.set('.process-step', { opacity: 0, x: -40 });
  gsap.to('.process-step', {
    scrollTrigger: { trigger: '.bp-flow-section', start: 'top 75%' },
    opacity: 1,
    x: 0,
    stagger: 0.15,
    duration: 0.7,
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

});

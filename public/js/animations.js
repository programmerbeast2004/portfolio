/**
 * animations.js — GSAP-based animation system
 * Handles all scroll-triggered, stagger, and timeline animations
 * Requires: GSAP + ScrollTrigger plugin (loaded in index.html)
 */

let animationCtx = gsap.context(() => {});

// ── Initialize all animations ──────────────────────────────────────────────
function initAnimations() {
  if (typeof ScrollTrigger !== 'undefined') {
    ScrollTrigger.getAll().forEach(t => t.kill());
  }
  if (animationCtx) animationCtx.revert();

  animationCtx = gsap.context(() => {
    // User requested a simple "one second animation and gone"
    // No more hiding or waving away on scroll. Just a clean fade-in.
    const targets = document.querySelectorAll('main, section');
    if (targets.length > 0) {
      gsap.from(targets, {
        opacity: 0,
        y: 10,
        duration: 1,
        ease: 'power2.out',
        stagger: 0.05
      });
    }
  });
}



// ── Hero Intro Animation ──────────────────────────────────────────────────
function animateHeroIntro() {
  // FIX: null guard every element — hero may not be mounted on some routes
  const chromaCard = document.querySelector('.chroma-card');
  const hContent   = document.querySelector('.h-content');
  const arcLinks   = document.querySelector('.arc');
  const scrollInd  = document.querySelector('.scroll-ind');

  if (!chromaCard || !hContent) return; // minimum required elements

  const elements = [chromaCard, hContent, arcLinks, scrollInd].filter(Boolean);
  gsap.set(elements, { opacity: 0 });

  const tl = gsap.timeline();

  tl.to(chromaCard, { opacity: 1, duration: 0.6, ease: 'power2.out' })
    .to(hContent,   { opacity: 1, duration: 0.6, ease: 'power2.out' }, 0.1);

  if (arcLinks)  tl.to(arcLinks,  { opacity: 1, duration: 0.5, ease: 'power2.out' }, 0.2);
  if (scrollInd) tl.to(scrollInd, { opacity: 1, duration: 0.4, ease: 'power2.out' }, 0.3);

  return tl;
}

// ── Page Transition ───────────────────────────────────────────────────────
function animatePageTransition(fromPage, toPage) {
  if (!toPage) return; // FIX: guard against missing target page

  if (fromPage) {
    gsap.to(fromPage, { opacity: 0, duration: 0.3, ease: 'power2.in' });
  }

  const tl = gsap.timeline();
  tl.to(toPage, {
    opacity: 1,
    duration: 0.3,
    ease: 'power2.out',
    onStart: () => toPage.classList.add('active')
  });

  return tl;
}

// ── Smooth Scroll ─────────────────────────────────────────────────────────
function smoothScrollTo(element, offset = 100) {
  if (!element) return; // FIX: guard
  const elementPosition = element.getBoundingClientRect().top + window.scrollY - offset;
  gsap.to(window, { scrollTo: elementPosition, duration: 0.8, ease: 'power2.inOut' });
}

// ── Stat Counters ─────────────────────────────────────────────────────────
function animateStatCounters() {
  const statValues = document.querySelectorAll('.stat-v');
  if (statValues.length === 0) return;

  statValues.forEach(stat => {
    const targetText = stat.textContent;
    const numMatch   = targetText.match(/\d+/);
    if (!numMatch) return; // FIX: skip if no number found

    const target   = parseInt(numMatch[0]);
    const original = stat.textContent;

    gsap.to({ value: 0 }, {
      value: target,
      duration: 2,
      ease: 'power2.out',
      onUpdate: function () {
        stat.textContent = original.replace(/\d+/, Math.round(this.targets()[0].value));
      },
      scrollTrigger: {
        trigger: '#about',
        start: 'top 65%',
        once: true
      }
    });
  });
}

// ── Export ────────────────────────────────────────────────────────────────
window.AnimationAPI = {
  initAnimations,
  animateHeroIntro,
  animatePageTransition,
  smoothScrollTo,
  animateStatCounters,
  killAll: () => animationCtx.revert()
};
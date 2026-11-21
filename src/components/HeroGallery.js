import { HERO_IMAGES } from '../data/assets.js';

/**
 * MAISON MISTYY — Hero image gallery.
 * Exactly three original images in a tilted editorial composition.
 * Only the container layers animate (entrance / float / parallax);
 * the <img> files are shown exactly as supplied.
 */

const CARD_STYLES = [
  { position: 'a', tilt: '-4deg', delay: '0.25s', floatDuration: '7s', floatDelay: '0s', depth: 14 },
  { position: 'b', tilt: '3deg', delay: '0.4s', floatDuration: '8.5s', floatDelay: '0.8s', depth: 22 },
  { position: 'c', tilt: '-2deg', delay: '0.55s', floatDuration: '7.8s', floatDelay: '1.6s', depth: 18 },
];

export function heroGalleryHtml() {
  const cards = HERO_IMAGES.map((image, i) => {
    const s = CARD_STYLES[i];
    return `
      <figure
        class="hero-card hero-card--${s.position}"
        style="--tilt:${s.tilt}; --card-delay:${s.delay}; --float-duration:${s.floatDuration}; --float-delay:${s.floatDelay}"
        data-depth="${s.depth}"
      >
        <div class="hero-card__parallax">
          <div class="hero-card__enter">
            <div class="hero-card__float">
              <div class="hero-card__frame">
                <img
                  src="${image.src}"
                  alt="${image.alt}"
                  loading="eager"
                  decoding="async"
                  ${i === 0 ? 'fetchpriority="high"' : 'fetchpriority="low"'}
                />
                <div class="hero-card__image-error" role="status" hidden>
                  <p>The original image could not be loaded.</p>
                  <button type="button" data-retry-image>Retry image</button>
                </div>
                <figcaption class="hero-card__caption">${image.caption}</figcaption>
              </div>
            </div>
          </div>
        </div>
      </figure>
    `;
  }).join('');

  return `
    <div class="hero-gallery" aria-label="Featured original works from the MAISON MISTYY collection">
      ${cards}
      <p class="hero-gallery__note">Original Collection — Maison Mistyy</p>
    </div>
  `;
}

/**
 * Smooth mouse parallax on desktop (fine pointers only).
 * Returns a cleanup function. Respects prefers-reduced-motion.
 */
export function mountHeroParallax(root) {
  const finePointer = window.matchMedia('(pointer: fine)').matches;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const gallery = root.querySelector('.hero-gallery');
  const hero = root.querySelector('.hero');
  if (!finePointer || reducedMotion || !gallery || !hero) return () => {};

  const layers = [...gallery.querySelectorAll('.hero-card__parallax')].map((el) => ({
    el,
    depth: Number(el.closest('.hero-card')?.dataset.depth || 12),
  }));

  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let rafId = null;

  function tick() {
    currentX += (targetX - currentX) * 0.06;
    currentY += (targetY - currentY) * 0.06;
    layers.forEach(({ el, depth }) => {
      el.style.transform = `translate3d(${(currentX * depth).toFixed(2)}px, ${(currentY * depth).toFixed(2)}px, 0)`;
    });
    if (Math.abs(targetX - currentX) > 0.001 || Math.abs(targetY - currentY) > 0.001) {
      rafId = requestAnimationFrame(tick);
    } else {
      rafId = null;
    }
  }

  function onMove(event) {
    const rect = hero.getBoundingClientRect();
    targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    targetY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    if (!rafId) rafId = requestAnimationFrame(tick);
  }

  function onLeave() {
    targetX = 0;
    targetY = 0;
    if (!rafId) rafId = requestAnimationFrame(tick);
  }

  hero.addEventListener('mousemove', onMove);
  hero.addEventListener('mouseleave', onLeave);

  return () => {
    hero.removeEventListener('mousemove', onMove);
    hero.removeEventListener('mouseleave', onLeave);
    if (rafId) cancelAnimationFrame(rafId);
    layers.forEach(({ el }) => {
      el.style.transform = '';
    });
  };
}

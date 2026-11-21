import { ICONS } from './icons.js';

/**
 * MAISON MISTYY — Hero copy block (headline, lead, CTAs).
 * Primary CTA → The Studio (/studio). Secondary CTA → The Academy (/academy).
 */
export function heroTextHtml() {
  return `
    <div class="hero-copy">
      <p class="eyebrow" data-reveal style="--reveal-delay:0.05s">Maison Mistyy — Creative Studio</p>

      <h1 class="hero-copy__headline" id="hero-heading" data-reveal style="--reveal-delay:0.15s">
        <span class="line">Your Imagination.</span>
        <span class="line line--italic">Our Creative Intelligence.</span>
      </h1>

      <p class="hero-copy__lead" data-reveal style="--reveal-delay:0.28s">
        Explore a world where artificial intelligence meets creativity. Discover
        visual experiences, creative resources, digital education and tools
        designed to help you create more.
      </p>

      <div class="hero-copy__ctas" data-reveal style="--reveal-delay:0.4s">
        <a class="btn btn--primary" href="/studio">
          Explore Our Services
          <span class="btn__arrow" aria-hidden="true">${ICONS.arrow}</span>
        </a>
        <a class="btn btn--secondary" href="/academy">
          Discover Masterclasses
          <span class="btn__arrow" aria-hidden="true">${ICONS.arrow}</span>
        </a>
      </div>

      <ul class="hero-copy__disciplines" data-reveal style="--reveal-delay:0.52s" aria-label="Creative disciplines">
        <li>AI Creativity</li>
        <li>Visual Direction</li>
        <li>Photography</li>
        <li>Digital Education</li>
      </ul>
    </div>
  `;
}

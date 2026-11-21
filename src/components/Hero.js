import { heroTextHtml } from './HeroText.js';
import { heroGalleryHtml, mountHeroParallax } from './HeroGallery.js';

/** MAISON MISTYY — Hero section (text + three-image tilted grid). */
export function renderHero() {
  return {
    html: `
      <section class="hero" aria-labelledby="hero-heading">
        <div class="shell hero__inner">
          ${heroTextHtml()}
          ${heroGalleryHtml()}
        </div>
      </section>
    `,
    mount(root) {
      return mountHeroParallax(root);
    },
  };
}

import { renderHero } from '../components/Hero.js';

/** Home — Hero Section & Navigation only (stage 1). */
export function renderHomePage() {
  const hero = renderHero();
  return {
    title: 'MAISON MISTYY — Your Imagination. Our Creative Intelligence.',
    html: hero.html,
    mount(root) {
      return hero.mount(root);
    },
  };
}

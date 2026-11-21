import { PLACEHOLDER_ROUTES } from '../data/navigation.js';
import { ICONS } from '../components/icons.js';

/**
 * Clearly defined placeholder route page.
 * Used for every destination whose full page has not been built yet —
 * it intentionally does NOT build those pages.
 */
export function renderPlaceholderPage(routeKey) {
  const meta = PLACEHOLDER_ROUTES[routeKey] ?? {
    title: 'Coming Soon',
    description: 'This destination is being prepared.',
  };

  return {
    title: `${meta.title} — MAISON MISTYY`,
    html: `
      <section class="placeholder" aria-labelledby="placeholder-heading">
        <div class="placeholder__inner">
          <div class="placeholder__mark" aria-hidden="true"></div>
          <p class="eyebrow" style="margin-top:1.4rem">Maison Mistyy</p>
          <h1 class="placeholder__title" id="placeholder-heading">${meta.title}</h1>
          <p class="placeholder__text">${meta.description}</p>
          <a class="btn btn--primary" href="/">
            Return Home
            <span class="btn__arrow" aria-hidden="true">${ICONS.arrow}</span>
          </a>
        </div>
      </section>
    `,
    mount() {
      return () => {};
    },
  };
}

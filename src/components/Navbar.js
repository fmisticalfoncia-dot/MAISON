import { NAV_LINKS, UTILITY_LINKS, PLACEHOLDER_ROUTES } from '../data/navigation.js';
import { ICONS } from './icons.js';

/**
 * MAISON MISTYY — Navigation bar component.
 * Desktop horizontal nav + mobile slide-out menu + search overlay.
 * Search / Account / Cart are reusable controls: Account & Cart link to
 * their placeholder routes; Search opens a functional overlay that
 * filters every registered destination.
 */

function navLinkHtml(link, currentPath, className) {
  const active = link.path === currentPath ? ' is-active' : '';
  const current = link.path === currentPath ? ' aria-current="page"' : '';
  return `<a class="${className}${active}" href="${link.path}"${current}>${link.label}</a>`;
}

function iconButtonHtml({ id, label, icon, href, badge, extraClass = '' }) {
  const badgeHtml = badge ? `<span class="icon-btn__badge" aria-hidden="true">${badge}</span>` : '';
  if (href) {
    return `<a class="icon-btn ${extraClass}" href="${href}" aria-label="${label}" data-icon-btn="${id}">${ICONS[icon]}${badgeHtml}</a>`;
  }
  return `<button class="icon-btn ${extraClass}" type="button" aria-label="${label}" data-icon-btn="${id}">${ICONS[icon]}${badgeHtml}</button>`;
}

export function createNavbar() {
  const header = document.createElement('header');
  header.className = 'site-header';

  const desktopLinks = NAV_LINKS.map((link) =>
    `<li>${navLinkHtml(link, '/', 'site-nav__link')}</li>`,
  ).join('');

  header.innerHTML = `
    <div class="shell site-header__inner">
      <a class="brand" href="/" aria-label="MAISON MISTYY — home">
        <span class="brand__word">Maison <em>Mistyy</em></span>
        <span class="brand__mark" aria-hidden="true"></span>
      </a>

      <nav class="site-nav" aria-label="Primary">
        <ul class="site-nav__list">${desktopLinks}</ul>
      </nav>

      <div class="header-tools">
        ${iconButtonHtml({ id: 'search', label: 'Search', icon: 'search', extraClass: 'icon-btn--desktop' })}
        ${iconButtonHtml({ id: 'account', label: 'Account', icon: 'account', href: UTILITY_LINKS.account.path, extraClass: 'icon-btn--desktop' })}
        ${iconButtonHtml({ id: 'cart', label: 'Cart, 0 items', icon: 'cart', href: UTILITY_LINKS.cart.path, badge: '0', extraClass: 'icon-btn--desktop' })}
        <button class="menu-btn" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu" data-menu-btn>
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  `;

  /* --- Mobile slide-out menu --- */
  const mobileMenu = document.createElement('div');
  mobileMenu.className = 'mobile-menu';
  mobileMenu.id = 'mobile-menu';
  mobileMenu.setAttribute('aria-hidden', 'true');
  mobileMenu.inert = true;
  mobileMenu.innerHTML = `
    <div class="mobile-menu__scrim" data-menu-scrim></div>
    <div class="mobile-menu__panel" role="dialog" aria-modal="true" aria-label="Menu">
      <button class="icon-btn" type="button" aria-label="Close menu" data-menu-close style="position:absolute;top:5rem;right:1rem">${ICONS.close}</button>
      <nav aria-label="Mobile">
        <ul class="mobile-menu__list">
          ${NAV_LINKS.map((link, i) => `
            <li>
              <a class="mobile-menu__link" href="${link.path}" data-mobile-link>
                <span>${link.label}</span><small>0${i + 1}</small>
              </a>
            </li>`).join('')}
        </ul>
      </nav>
      <div class="mobile-menu__tools">
        ${iconButtonHtml({ id: 'search', label: 'Search', icon: 'search' })}
        ${iconButtonHtml({ id: 'account', label: 'Account', icon: 'account', href: UTILITY_LINKS.account.path })}
        ${iconButtonHtml({ id: 'cart', label: 'Cart, 0 items', icon: 'cart', href: UTILITY_LINKS.cart.path, badge: '0' })}
      </div>
      <p class="mobile-menu__note">Your Imagination. Our Creative Intelligence.</p>
    </div>
  `;

  /* --- Search overlay --- */
  const searchOverlay = document.createElement('div');
  searchOverlay.className = 'search-overlay';
  searchOverlay.setAttribute('role', 'dialog');
  searchOverlay.setAttribute('aria-modal', 'true');
  searchOverlay.setAttribute('aria-label', 'Search MAISON MISTYY');
  searchOverlay.innerHTML = `
    <button class="icon-btn search-overlay__close" type="button" aria-label="Close search" data-search-close>${ICONS.close}</button>
    <div class="search-overlay__box">
      <label class="search-overlay__label" for="site-search">Search the Maison</label>
      <input class="search-overlay__input" id="site-search" type="search" placeholder="Try “Academy”…" autocomplete="off" />
      <ul class="search-overlay__results" data-search-results></ul>
    </div>
  `;

  document.body.append(mobileMenu, searchOverlay);

  const menuBtn = header.querySelector('[data-menu-btn]');
  const searchInput = searchOverlay.querySelector('#site-search');
  const searchResults = searchOverlay.querySelector('[data-search-results]');
  let lastFocused = null;

  const SEARCH_INDEX = [
    ...NAV_LINKS.map((l) => ({ label: l.label, path: l.path, kind: 'Destination' })),
    ...Object.values(PLACEHOLDER_ROUTES).map((r) => ({ label: r.title, path: `/${Object.keys(PLACEHOLDER_ROUTES).find((k) => PLACEHOLDER_ROUTES[k] === r)}`, kind: 'Destination' })),
    { label: 'Account', path: UTILITY_LINKS.account.path, kind: 'Utility' },
    { label: 'Cart', path: UTILITY_LINKS.cart.path, kind: 'Utility' },
  ];

  function renderSearchResults(query = '') {
    const q = query.trim().toLowerCase();
    const matches = SEARCH_INDEX.filter((item) => item.label.toLowerCase().includes(q));
    searchResults.innerHTML = matches.length
      ? matches.map((item) => `
          <li><a class="search-overlay__result" href="${item.path}" data-search-result>
            <span>${item.label}</span><small>${item.kind}</small>
          </a></li>`).join('')
      : `<li class="search-overlay__empty">Nothing found — try “Studio” or “Academy”.</li>`;
  }

  function openMenu() {
    lastFocused = document.activeElement;
    mobileMenu.inert = false;
    mobileMenu.classList.add('is-open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    menuBtn.setAttribute('aria-expanded', 'true');
    menuBtn.setAttribute('aria-label', 'Close menu');
    document.body.style.overflow = 'hidden';
    mobileMenu.querySelector('[data-mobile-link]')?.focus();
  }

  function closeMenu() {
    if (!mobileMenu.classList.contains('is-open')) return;
    mobileMenu.inert = true;
    mobileMenu.classList.remove('is-open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-label', 'Open menu');
    document.body.style.overflow = '';
    lastFocused?.focus?.();
  }

  function openSearch() {
    closeMenu();
    lastFocused = document.activeElement;
    searchOverlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    renderSearchResults(searchInput.value);
    searchInput.focus();
  }

  function closeSearch() {
    searchOverlay.classList.remove('is-open');
    document.body.style.overflow = '';
    lastFocused?.focus?.();
  }

  menuBtn.addEventListener('click', () =>
    mobileMenu.classList.contains('is-open') ? closeMenu() : openMenu(),
  );
  mobileMenu.querySelector('[data-menu-scrim]').addEventListener('click', closeMenu);
  mobileMenu.querySelector('[data-menu-close]').addEventListener('click', closeMenu);
  mobileMenu.addEventListener('click', (e) => {
    if (e.target.closest('a[href]')) closeMenu();
  });

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-icon-btn="search"]');
    if (btn) {
      e.preventDefault();
      openSearch();
    }
    if (e.target.closest('[data-search-close]')) closeSearch();
    if (e.target.closest('[data-search-result]')) closeSearch();
  });

  searchInput.addEventListener('input', () => renderSearchResults(searchInput.value));
  searchOverlay.addEventListener('click', (e) => {
    if (e.target === searchOverlay) closeSearch();
  });

  document.addEventListener('keydown', (e) => {
    const activeOverlay = searchOverlay.classList.contains('is-open')
      ? searchOverlay : mobileMenu.classList.contains('is-open') ? mobileMenu : null;
    if (e.key === 'Tab' && activeOverlay) {
      const focusable = [...activeOverlay.querySelectorAll('a[href], button, input')];
      const first = focusable[0];
      const last = focusable.at(-1);
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first?.focus();
      }
    }
    if (e.key !== 'Escape') return;
    if (searchOverlay.classList.contains('is-open')) closeSearch();
    else if (mobileMenu.classList.contains('is-open')) closeMenu();
  });

  /* Sticky header shadow on scroll */
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /** Highlight the active route in both desktop & mobile navs. */
  function setActive(path) {
    header.querySelectorAll('.site-nav__link').forEach((a) => {
      const active = a.getAttribute('href') === path;
      a.classList.toggle('is-active', active);
      if (active) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
    mobileMenu.querySelectorAll('.mobile-menu__link').forEach((a) => {
      a.classList.toggle('is-active', a.getAttribute('href') === path);
    });
    closeMenu();
  }

  return { element: header, setActive };
}

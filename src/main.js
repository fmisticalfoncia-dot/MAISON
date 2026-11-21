import './styles/tokens.css';
import './styles/base.css';
import './styles/navbar.css';
import './styles/hero.css';
import './styles/placeholder.css';

import { createNavbar } from './components/Navbar.js';
import { renderHomePage } from './pages/HomePage.js';
import { renderPlaceholderPage } from './pages/PlaceholderPage.js';
import { installLinkInterception } from './router.js';

/* Route table — placeholder routes are clearly defined here. */
const ROUTES = {
  '/': () => renderHomePage(),
  '/studio': () => renderPlaceholderPage('studio'),
  '/vault': () => renderPlaceholderPage('vault'),
  '/academy': () => renderPlaceholderPage('academy'),
  '/bookshelf': () => renderPlaceholderPage('bookshelf'),
  '/marketplace': () => renderPlaceholderPage('marketplace'),
  '/lab': () => renderPlaceholderPage('lab'),
  '/community': () => renderPlaceholderPage('community'),
  '/account': () => renderPlaceholderPage('account'),
  '/cart': () => renderPlaceholderPage('cart'),
};

const app = document.querySelector('#app');
const navbar = createNavbar();

app.innerHTML = `
  <a class="skip-link" href="#main">Skip to content</a>
  <main id="main" tabindex="-1"></main>
`;
app.prepend(navbar.element);

const main = app.querySelector('#main');
let cleanupPage = null;

function renderRoute(path) {
  if (typeof cleanupPage === 'function') cleanupPage();
  const page = (ROUTES[path] ?? (() => renderPlaceholderPage('studio')))();
  main.innerHTML = page.html;
  document.title = page.title;
  navbar.setActive(path);
  cleanupPage = page.mount(main) || null;
}

window.addEventListener('app:navigate', (event) => {
  renderRoute(event.detail.path);
});

installLinkInterception();
renderRoute(window.location.pathname);

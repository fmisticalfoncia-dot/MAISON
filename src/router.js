/**
 * MAISON MISTYY — tiny history router.
 * Internal links use plain hrefs ("/studio", …) so they work with
 * keyboard navigation, right-click and direct URL entry.
 */

export function navigate(path) {
  if (path !== window.location.pathname) {
    window.history.pushState({}, '', path);
  }
  window.dispatchEvent(new CustomEvent('app:navigate', { detail: { path } }));
  window.scrollTo({ top: 0, behavior: 'auto' });
}

/** Intercept clicks on internal links anywhere in the document. */
export function installLinkInterception() {
  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href^="/"]');
    if (!link) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (link.target === '_blank') return;
    event.preventDefault();
    navigate(link.getAttribute('href'));
  });

  window.addEventListener('popstate', () => {
    window.dispatchEvent(
      new CustomEvent('app:navigate', { detail: { path: window.location.pathname } }),
    );
    window.scrollTo({ top: 0, behavior: 'auto' });
  });
}

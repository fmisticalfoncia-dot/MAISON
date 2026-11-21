/**
 * MAISON MISTYY — Navigation & route registry.
 *
 * Every destination is defined once here. Routes whose full pages have
 * not been built yet resolve to the shared PlaceholderPage — clearly
 * defined placeholder routes, without building those pages.
 */

export const NAV_LINKS = [
  { label: 'Home', path: '/', route: 'home' },
  { label: 'The Studio', path: '/studio', route: 'studio' },
  { label: 'The Vault', path: '/vault', route: 'vault' },
  { label: 'The Academy', path: '/academy', route: 'academy' },
  { label: 'The Bookshelf', path: '/bookshelf', route: 'bookshelf' },
  { label: 'The Marketplace', path: '/marketplace', route: 'marketplace' },
  { label: 'The Creative Lab', path: '/lab', route: 'lab' },
  { label: 'The Community', path: '/community', route: 'community' },
];

/** Reusable header controls — placeholder destinations until built. */
export const UTILITY_LINKS = {
  account: { label: 'Account', path: '/account', route: 'account' },
  cart: { label: 'Cart', path: '/cart', route: 'cart' },
};

/** Placeholder route metadata (title + short description). */
export const PLACEHOLDER_ROUTES = {
  studio: {
    title: 'The Studio',
    description: 'Our creative services and visual direction practice are being prepared.',
  },
  vault: {
    title: 'The Vault',
    description: 'A curated archive of original creative work is being prepared.',
  },
  academy: {
    title: 'The Academy',
    description: 'Masterclasses and digital education pathways are being prepared.',
  },
  bookshelf: {
    title: 'The Bookshelf',
    description: 'Guides, journals and creative resources are being prepared.',
  },
  marketplace: {
    title: 'The Marketplace',
    description: 'Digital products and creative tools are being prepared.',
  },
  lab: {
    title: 'The Creative Lab',
    description: 'Experiments in AI creativity and new media are being prepared.',
  },
  community: {
    title: 'The Community',
    description: 'A space for creators to connect and share is being prepared.',
  },
  account: {
    title: 'Your Account',
    description: 'Customer account access is being prepared.',
  },
  cart: {
    title: 'Your Cart',
    description: 'Your shopping cart is being prepared.',
  },
};

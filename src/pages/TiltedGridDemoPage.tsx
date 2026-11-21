import { createRoot } from 'react-dom/client';
import TiltedGridHeroDemo from '@/components/ui/demo';

/** Mount a React island with explicit cleanup in the existing history router. */
export function renderTiltedGridDemoPage() {
  return {
    title: 'Tilted Grid Hero Demo — MAISON MISTYY',
    html: '<section class="shell" aria-label="Tilted grid hero demonstration" style="padding-block:2rem"><div data-tilted-grid-root></div><p><a href="/">← Return to MAISON MISTYY</a></p></section>',
    mount(container: HTMLElement) {
      const element = container.querySelector('[data-tilted-grid-root]');
      if (!element) return () => {};
      const root = createRoot(element);
      root.render(<TiltedGridHeroDemo />);
      return () => root.unmount();
    },
  };
}

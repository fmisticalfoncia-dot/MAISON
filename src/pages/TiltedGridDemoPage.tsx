import { createRoot } from 'react-dom/client';
import TiltedGridHeroDemo from '@/components/ui/demo';

/** Mount a React island with explicit cleanup in the existing history router. */
export function renderTiltedGridDemoPage() {
  return {
    title: 'MAISON MISTYY — Your Imagination. Our Creative Intelligence.',
    html: '<div data-tilted-grid-root></div>',
    mount(container: HTMLElement) {
      const element = container.querySelector('[data-tilted-grid-root]');
      if (!element) return () => {};
      const root = createRoot(element);
      root.render(<TiltedGridHeroDemo />);
      return () => root.unmount();
    },
  };
}

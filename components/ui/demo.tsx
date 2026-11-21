import { useEffect, useRef } from 'react';
import { renderHero } from '@/src/components/Hero';

/**
 * The MAISON preview shares the homepage's exact content and original assets.
 * Do not pass the protected collection to the cylindrical strip component:
 * its object-cover slicing would violate the original preservation brief.
 */
export default function TiltedGridHeroDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const hero = renderHero();

  useEffect(() => {
    if (!ref.current) return;
    return renderHero().mount(ref.current);
  }, []);

  return <div ref={ref} dangerouslySetInnerHTML={{ __html: hero.html }} />;
}

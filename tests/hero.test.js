import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { IMAGE_COLLECTION, HERO_IMAGES, RESERVED_IMAGES } from '../src/data/assets.js';
import { renderHero } from '../src/components/Hero.js';
import { mountImageLoading } from '../src/components/imageLoading.js';

test('all nine originals are registered, exactly three appear in the hero', () => {
  assert.equal(IMAGE_COLLECTION.length, 9);
  assert.equal(new Set(IMAGE_COLLECTION.map(image => image.src)).size, 9);
  assert.equal(HERO_IMAGES.length, 3);
  assert.equal(RESERVED_IMAGES.length, 6);
  const { html } = renderHero();
  assert.equal((html.match(/<img\s/g) ?? []).length, 3);
  for (const image of HERO_IMAGES) assert.ok(html.includes(image.src));
  for (const image of RESERVED_IMAGES) assert.ok(!html.includes(image.src));
  assert.ok(html.includes('Your Imagination.'));
  assert.ok(html.includes('Our Creative Intelligence.'));
  assert.ok(html.includes('href="/studio"'));
  assert.ok(html.includes('href="/academy"'));
});

test('React preview shares original hero instead of stock images and generic content', () => {
  const demo = readFileSync(new URL('../components/ui/demo.tsx', import.meta.url), 'utf8');
  assert.ok(demo.includes('renderHero()'));
  assert.ok(!demo.includes('images.unsplash.com'));
  assert.ok(!demo.includes('Every frame,'));
  const css = readFileSync(new URL('../src/styles/hero.css', import.meta.url), 'utf8');
  assert.ok(css.includes('background: var(--ivory);'));
  assert.ok(css.includes('object-fit: contain;'));
});

test('failed original images report errors and retry the exact source; cleanup removes handlers', () => {
  const image = Object.assign(new EventTarget(), {
    src: HERO_IMAGES[0].src, hidden: false, complete: true, naturalWidth: 0,
    getAttribute() { return HERO_IMAGES[0].src; },
  });
  const error = { hidden: true };
  const button = Object.assign(new EventTarget(), { disabled: false, textContent: 'Retry image' });
  const frame = { querySelector: selector => selector === 'img' ? image : selector.includes('error') ? error : button };
  const cleanup = mountImageLoading({ querySelectorAll: () => [frame] });
  assert.equal(error.hidden, false);
  assert.equal(image.hidden, true);
  button.dispatchEvent(new Event('click'));
  assert.equal(image.src, HERO_IMAGES[0].src);
  assert.equal(button.disabled, true);
  image.dispatchEvent(new Event('load'));
  assert.equal(error.hidden, true);
  assert.equal(image.hidden, false);
  cleanup();
  image.dispatchEvent(new Event('error'));
  assert.equal(error.hidden, true);
});

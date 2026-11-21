/**
 * MAISON MISTYY — Centralised original image asset collection.
 *
 * All nine supplied images are registered here exactly as supplied.
 * These URLs are the single source of truth for every future section.
 * Do not regenerate, transform, re-host or replace them.
 *
 * Hero usage is controlled by HERO_IMAGE_IDS below — exactly three
 * images appear in the Hero Section; the remaining six stay registered
 * here for future sections and are never rendered in the hero.
 */

export const IMAGE_COLLECTION = [
  {
    id: 'image-01',
    src: 'https://res.cloudinary.com/mjmmjbqu/image/upload/v1789455530/WhatsApp_Image_2026-09-14_at_00.09.44_2_wozdtb.jpg',
    alt: 'MAISON MISTYY original collection — portrait one',
    caption: 'Original Collection — N°01',
  },
  {
    id: 'image-02',
    src: 'https://res.cloudinary.com/mjmmjbqu/image/upload/v1789455565/WhatsApp_Image_2026-09-14_at_00.09.44_iagfpw.jpg',
    alt: 'MAISON MISTYY original collection — portrait two',
    caption: 'Original Collection — N°02',
  },
  {
    id: 'image-03',
    src: 'https://res.cloudinary.com/mjmmjbqu/image/upload/v1789455582/WhatsApp_Image_2026-09-14_at_00.09.43_1_xrabsc.jpg',
    alt: 'MAISON MISTYY original collection — portrait three',
    caption: 'Original Collection — N°03',
  },
  {
    id: 'image-04',
    src: 'https://res.cloudinary.com/mjmmjbqu/image/upload/v1789455602/WhatsApp_Image_2026-09-14_at_00.09.43_caacrq.jpg',
    alt: 'MAISON MISTYY original collection — portrait four',
    caption: 'Original Collection — N°04',
  },
  {
    id: 'image-05',
    src: 'https://res.cloudinary.com/mjmmjbqu/image/upload/v1789589623/WhatsApp_Image_2026-09-16_at_20.51.36_kcayhi.jpg',
    alt: 'MAISON MISTYY original collection — portrait five',
    caption: 'Original Collection — N°05',
  },
  {
    id: 'image-06',
    src: 'https://res.cloudinary.com/mjmmjbqu/image/upload/v1789625334/file_0000000070c4820882cbd4f0133ae19f_l4q7sr.png',
    alt: 'MAISON MISTYY original collection — artwork six',
    caption: 'Original Collection — N°06',
  },
  {
    id: 'image-07',
    src: 'https://res.cloudinary.com/mjmmjbqu/image/upload/v1789627172/WhatsApp_Image_2026-09-16_at_12.51.36_hbidwj.jpg',
    alt: 'MAISON MISTYY original collection — portrait seven',
    caption: 'Original Collection — N°07',
  },
  {
    id: 'image-08',
    src: 'https://res.cloudinary.com/mjmmjbqu/image/upload/v1789627195/WhatsApp_Image_2026-09-16_at_12.51.36_1_xqvfej.jpg',
    alt: 'MAISON MISTYY original collection — portrait eight',
    caption: 'Original Collection — N°08',
  },
  {
    id: 'image-09',
    src: 'https://res.cloudinary.com/mjmmjbqu/image/upload/v1789627401/WhatsApp_Image_2026-09-16_at_12.51.38_hee0lp.jpg',
    alt: 'MAISON MISTYY original collection — portrait nine',
    caption: 'Original Collection — N°09',
  },
];

/** Exactly three images are featured in the Hero Section. */
export const HERO_IMAGE_IDS = ['image-01', 'image-05', 'image-07'];

/** Resolve the hero trio (in display order) from the collection. */
export const HERO_IMAGES = HERO_IMAGE_IDS.map(
  (id) => IMAGE_COLLECTION.find((image) => image.id === id),
).filter(Boolean);

/** The six registered images reserved for future sections. */
export const RESERVED_IMAGES = IMAGE_COLLECTION.filter(
  (image) => !HERO_IMAGE_IDS.includes(image.id),
);

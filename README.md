# MAISON MISTYY

Luxury editorial hero and navigation, with a matching React preview.

## Development

```sh
npm install
npm run dev
npm run typecheck
npm run build
```

- `/` — original MAISON hero; exactly three unchanged original images.
- `/demo/tilted-grid` — React preview using the same MAISON hero, copy, CTAs and original trio as `/`.
- Existing destination routes remain placeholders.

## React, TypeScript, Tailwind and shadcn setup

The original application is vanilla JavaScript with modular CSS. React is integrated as a mounted island on the demo route, with `root.unmount()` on navigation. No global state or context providers are required. The preview shares the homepage hero renderer and motion cleanup so the two routes cannot drift in copy, images or background.

The repository now includes React, React DOM, TypeScript, React types, the Vite React plugin, Tailwind v4 and its Vite plugin, plus `clsx` and `tailwind-merge`. Installation and configuration are already complete; no CLI scaffolding is necessary. To add future shadcn components:

```sh
npx shadcn@latest add button
```

`components.json` configures the CLI for this non-RSC Vite application. No icon library is necessary for the supplied component: it contains no icons. Existing navigation icons are unchanged.

### Paths

- Reusable React UI: `/components/ui` (import `@/components/ui/...`).
- Class-name helper: `/lib/utils.ts` (import `@/lib/utils`).
- Existing vanilla components: `/src/components`.
- Existing editorial styles: `/src/styles/*.css`.
- Tailwind entry and shadcn-compatible theme tokens: `/src/styles/tailwind.css`.
- Demo route adapter: `/src/pages/TiltedGridDemoPage.tsx`.

The new `/components/ui` folder deliberately separates reusable React primitives from legacy DOM components. It gives the shadcn CLI a stable destination and makes upstream component imports work without path rewrites. Both Vite and TypeScript resolve `@/` to the repository root. Tailwind Preflight is omitted to avoid resetting existing editorial styles.

## Tilted grid component

`components/ui/tilted-grid-hero.tsx` exports `TiltedGridHero` and its image/props types. Pass a stable array of `{ src, alt? }`, optional overlay children, and an explicit height such as `className="h-[560px] w-full"` (container-size queries require height).

Props retain the supplied defaults: `speed=4`, `tileHeight=26`, `aspectRatio=16/9`, `gap=6`, `axis=56`, `curve=80`, `fade=12`. Use positive speed, tile height and aspect ratio, nonnegative gap, and fade between 0 and 50. Curve is clamped to 5–85 degrees. Width is responsive and tile width is capped at 55% of the container. Reduced-motion users see a stationary band. The decorative band is aria-hidden; meaningful accessible content belongs in its children.

The curved component remains available as a reusable primitive, but is not used for the protected MAISON originals: its strip cropping and bending conflict with the original preservation brief. Both visible hero routes now share the original MAISON layout instead. All Unsplash stock images and generic demo text have been removed from the preview. Both routes display exactly three supplied originals; the other six remain registered in `/src/data/assets.js`. The background is solid warm ivory `#F8F5EF`, with espresso, champagne gold and beige accents.

Original Cloudinary files are requested directly without transformations or URL replacements. Delivery requires browser network access; the sandbox cannot reach Cloudinary to confirm availability. Failed requests now display a clear error and a keyboard-accessible retry control which requests the same original URL, rather than leaving an unexplained blank card. No stock fallback is substituted.

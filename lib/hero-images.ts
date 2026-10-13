import type { ImageLoaderProps } from 'next/image';

export const heroImageSizes = '(min-width: 1366px) 1366px, 100vw';

// Pre-generated assets avoid depending on runtime image resizing in Workers.
const heroAssets: Record<string, { name: string; widths: number[] }> = {
  '/hero-bg.jpg': { name: 'hero-bg', widths: [640, 960, 1488] },
  '/hero-bg2.jpg': { name: 'hero-bg2', widths: [480, 694] },
  '/about-img.jpg': { name: 'about-img', widths: [640, 888] },
};

export function heroImageLoader({ src, width }: ImageLoaderProps): string {
  const asset = heroAssets[src];
  if (!asset) return src;
  const selectedWidth = asset.widths.find((candidate) => candidate >= width) ?? asset.widths.at(-1)!;
  return `/hero/${asset.name}-${selectedWidth}.webp`;
}

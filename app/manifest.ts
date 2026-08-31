import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'جمعية التحالف للإغاثة والتنمية',
    short_name: 'جمعية التحالف',
    description: 'من أجل نصرة الإنسان وبناء المستقبل',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#004b73',
    lang: 'ar',
    dir: 'rtl',
    icons: [
      {
        src: '/icon.png',
        sizes: '192x192',
        type: 'image/png',
      },
    ],
  };
}

'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { defaultHomepageContent, type HomepageContent } from '@/lib/homepage-content';

const HomepageContentContext = createContext<HomepageContent>(defaultHomepageContent);

const optimizedImages: Record<string, string> = {
  '/alliance-ghadaq-capacity.jpg': '/alliance-ghadaq-capacity.webp',
  '/project.png': '/project.webp',
  '/DonationBanner.png': '/DonationBanner.webp',
};

function optimizeLocalImages(value: unknown): unknown {
  if (typeof value === 'string') return optimizedImages[value] ?? value;
  if (Array.isArray(value)) return value.map(optimizeLocalImages);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, optimizeLocalImages(item)]));
  }
  return value;
}

export function HomepageContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState(defaultHomepageContent);
  useEffect(() => {
    let active = true;
    fetch('/api/homepage-content', { cache: 'force-cache' })
      .then((response) => response.ok ? response.json() : null)
      .then((data) => {
        if (!active || !data) return;
        setContent(optimizeLocalImages({ ...defaultHomepageContent, ...(data as Partial<HomepageContent>) }) as HomepageContent);
      })
      .catch(() => undefined);
    return () => { active = false; };
  }, []);
  return <HomepageContentContext.Provider value={content}>{children}</HomepageContentContext.Provider>;
}

export function useHomepageContent() { return useContext(HomepageContentContext); }

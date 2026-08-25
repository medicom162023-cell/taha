'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { defaultHomepageContent, type HomepageContent } from '@/lib/homepage-content';

const HomepageContentContext = createContext<HomepageContent>(defaultHomepageContent);

export function HomepageContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState(defaultHomepageContent);
  useEffect(() => {
    let active = true;
    fetch('/api/homepage-content', { cache: 'force-cache' })
      .then((response) => response.ok ? response.json() : null)
      .then((data) => {
        if (!active || !data) return;
        setContent({ ...defaultHomepageContent, ...(data as Partial<HomepageContent>) });
      })
      .catch(() => undefined);
    return () => { active = false; };
  }, []);
  return <HomepageContentContext.Provider value={content}>{children}</HomepageContentContext.Provider>;
}

export function useHomepageContent() { return useContext(HomepageContentContext); }

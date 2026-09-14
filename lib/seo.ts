import type { Metadata } from 'next';
import { cache } from 'react';
import { WORDPRESS_BASE_URL } from '@/lib/wordpress';

type RankMathHeadResponse = {
  success?: boolean;
  head?: string;
};

export type SeoFallback = {
  title: string;
  description?: string;
  canonical: string;
  image?: string | null;
  type?: 'article' | 'website';
};

const fetchRankMathHead = cache(async (sourceUrl: string): Promise<string | null> => {
  try {
    const endpoint = `${WORDPRESS_BASE_URL}/wp-json/rankmath/v1/getHead?url=${encodeURIComponent(sourceUrl)}`;
    const response = await fetch(endpoint, {
      next: { revalidate: 300 },
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) return null;

    const data = (await response.json()) as RankMathHeadResponse;
    return data.success && typeof data.head === 'string' ? data.head : null;
  } catch {
    return null;
  }
});

function decodeEntities(value: string) {
  return value
    .replace(/&#x([0-9a-f]+);/gi, (_, code: string) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCodePoint(Number.parseInt(code, 10)))
    .replace(/&quot;/gi, '"')
    .replace(/&#0?39;|&apos;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&amp;/gi, '&')
    .trim();
}

function getAttribute(tag: string, name: string) {
  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = tag.match(new RegExp(`\\s${escapedName}\\s*=\\s*(["'])([\\s\\S]*?)\\1`, 'i'));
  return match?.[2] ? decodeEntities(match[2]) : undefined;
}

function metaValues(head: string, key: string) {
  const values: string[] = [];
  const tags = head.match(/<meta\b(?:[^>"']|"[^"]*"|'[^']*')*>/gi) ?? [];

  for (const tag of tags) {
    const identifier = getAttribute(tag, 'property') ?? getAttribute(tag, 'name');
    if (identifier?.toLowerCase() !== key.toLowerCase()) continue;

    const content = getAttribute(tag, 'content');
    if (content) values.push(content);
  }

  return values;
}

function metaValue(head: string, key: string) {
  return metaValues(head, key)[0];
}

function titleValue(head: string) {
  const match = head.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i);
  return match?.[1] ? decodeEntities(match[1].replace(/<[^>]*>/g, ' ')) : undefined;
}

function absoluteUrl(value?: string) {
  if (!value) return undefined;

  try {
    return new URL(value, WORDPRESS_BASE_URL).toString();
  } catch {
    return undefined;
  }
}

function fallbackMetadata(fallback: SeoFallback): Metadata {
  const image = absoluteUrl(fallback.image ?? undefined);

  return {
    title: fallback.title,
    description: fallback.description,
    alternates: { canonical: fallback.canonical },
    openGraph: {
      title: fallback.title,
      description: fallback.description,
      url: fallback.canonical,
      siteName: 'جمعية التحالف للإغاثة والتنمية',
      type: fallback.type ?? 'website',
      images: image ? [{ url: image, alt: fallback.title }] : undefined,
    } as Metadata['openGraph'],
    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      title: fallback.title,
      description: fallback.description,
      images: image ? [image] : undefined,
    } as Metadata['twitter'],
  };
}

export async function buildRankMathMetadata(sourceUrl: string, fallback: SeoFallback): Promise<Metadata> {
  const head = await fetchRankMathHead(sourceUrl);
  if (!head) return fallbackMetadata(fallback);

  const title = titleValue(head) ?? metaValue(head, 'og:title') ?? fallback.title;
  const description = metaValue(head, 'description') ?? metaValue(head, 'og:description') ?? fallback.description;
  const canonical = fallback.canonical;
  const robots = metaValue(head, 'robots');

  const ogTitle = metaValue(head, 'og:title') ?? title;
  const ogDescription = metaValue(head, 'og:description') ?? description;
  const ogUrl = canonical;
  const ogSiteName = metaValue(head, 'og:site_name') ?? 'جمعية التحالف للإغاثة والتنمية';
  const ogTypeRaw = metaValue(head, 'og:type');
  const ogType = ogTypeRaw === 'article' || ogTypeRaw === 'website' ? ogTypeRaw : (fallback.type ?? 'website');
  const ogImageAlt = metaValue(head, 'og:image:alt') ?? title;
  const ogImages = Array.from(
    new Set(
      metaValues(head, 'og:image')
        .map((value) => absoluteUrl(value))
        .filter((value): value is string => Boolean(value)),
    ),
  );

  const fallbackImage = absoluteUrl(fallback.image ?? undefined);
  if (ogImages.length === 0 && fallbackImage) ogImages.push(fallbackImage);

  const twitterTitle = metaValue(head, 'twitter:title') ?? ogTitle;
  const twitterDescription = metaValue(head, 'twitter:description') ?? ogDescription;
  const twitterImage = absoluteUrl(metaValue(head, 'twitter:image')) ?? ogImages[0];
  const twitterCardRaw = metaValue(head, 'twitter:card');
  const twitterCard =
    twitterCardRaw === 'summary' ||
    twitterCardRaw === 'summary_large_image' ||
    twitterCardRaw === 'app' ||
    twitterCardRaw === 'player'
      ? twitterCardRaw
      : twitterImage
        ? 'summary_large_image'
        : 'summary';

  return {
    title,
    description,
    alternates: { canonical },
    robots: robots as Metadata['robots'],
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: ogUrl,
      siteName: ogSiteName,
      type: ogType,
      images: ogImages.length > 0 ? ogImages.map((url) => ({ url, alt: ogImageAlt })) : undefined,
    } as Metadata['openGraph'],
    twitter: {
      card: twitterCard,
      title: twitterTitle,
      description: twitterDescription,
      images: twitterImage ? [twitterImage] : undefined,
    } as Metadata['twitter'],
  };
}

function replaceSourceUrl(value: string, sourceUrl: string, publicUrl: string) {
  const source = sourceUrl.replace(/\/+$/, '');
  const target = publicUrl.replace(/\/+$/, '');

  if (!source || source === target) return value;

  return value
    .split(`${source}/`).join(`${target}/`)
    .split(source).join(target);
}

function rewriteSchemaUrls(value: unknown, sourceUrl: string, publicUrl: string): unknown {
  if (typeof value === 'string') return replaceSourceUrl(value, sourceUrl, publicUrl);
  if (Array.isArray(value)) return value.map((item) => rewriteSchemaUrls(item, sourceUrl, publicUrl));

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, item]) => [
        key,
        rewriteSchemaUrls(item, sourceUrl, publicUrl),
      ]),
    );
  }

  return value;
}

export async function getRankMathSchemas(sourceUrl: string, publicUrl = sourceUrl) {
  const head = await fetchRankMathHead(sourceUrl);
  if (!head) return [];

  const schemas: string[] = [];
  const scripts = /(<script\b(?:[^>"']|"[^"]*"|'[^']*')*>)([\s\S]*?)<\/script>/gi;
  let match: RegExpExecArray | null;

  while ((match = scripts.exec(head)) !== null) {
    const type = getAttribute(match[1], 'type');
    if (type?.toLowerCase() !== 'application/ld+json') continue;

    const json = match[2].trim();
    if (!json) continue;

    try {
      const parsed = JSON.parse(json) as unknown;
      const rewritten = rewriteSchemaUrls(parsed, sourceUrl, publicUrl);
      schemas.push(JSON.stringify(rewritten));
    } catch {
      schemas.push(replaceSourceUrl(json, sourceUrl, publicUrl));
    }
  }

  return schemas;
}

export function safeJsonLd(value: string) {
  return value.replace(/</g, '\\u003c');
}

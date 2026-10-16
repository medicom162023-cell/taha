import { normalizeSlug } from '@/lib/slug';

const anchorPattern = /<a\b[^>]*>[\s\S]*?<\/a>/gi;
const imagePattern = /<img\b[^>]*>/i;

function attribute(tag: string, name: string) {
  const match = tag.match(new RegExp(`\\b${name}\\s*=\\s*(["'])(.*?)\\1`, 'i'));
  return match?.[2] ?? null;
}

function galleryImage(anchor: string, postSlug: string) {
  const image = anchor.match(imagePattern)?.[0];
  const href = attribute(anchor.slice(0, anchor.indexOf('>') + 1), 'href');
  if (!image || !href || !/\battachment-thumbnail\b/.test(attribute(image, 'class') ?? '')) return null;

  try {
    const attachmentUrl = new URL(href, 'https://aard.ps');
    const imageUrl = new URL(attribute(image, 'src') ?? '', 'https://aard.ps');
    const segments = attachmentUrl.pathname.split('/').filter(Boolean);
    if (attachmentUrl.origin !== 'https://aard.ps' || segments.length !== 2 ||
        normalizeSlug(segments[0]) !== normalizeSlug(postSlug) ||
        imageUrl.origin !== 'https://aard.ps' || !imageUrl.pathname.startsWith('/wp-content/uploads/')) {
      return null;
    }

    // WordPress galleries link to an attachment page, while their img uses a sized thumbnail.
    imageUrl.pathname = imageUrl.pathname.replace(/-\d+x\d+(?=\.[^/.]+$)/, '');
    return { attachmentSlug: normalizeSlug(segments[1]), imageUrl: imageUrl.href };
  } catch {
    return null;
  }
}

export function rewriteGalleryLinks(html: string, postSlug: string) {
  return html.replace(anchorPattern, (anchor) => {
    const image = galleryImage(anchor, postSlug);
    return image ? anchor.replace(/\bhref\s*=\s*(["']).*?\1/i, `href="${image.imageUrl}"`) : anchor;
  });
}

export function findGalleryAttachment(html: string, postSlug: string, attachmentSlug: string) {
  for (const anchor of html.match(anchorPattern) ?? []) {
    const image = galleryImage(anchor, postSlug);
    if (image?.attachmentSlug === normalizeSlug(attachmentSlug)) return image.imageUrl;
  }
  return null;
}

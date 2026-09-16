export function normalizeSlug(value: string) {
  let decoded = value;

  try {
    decoded = decodeURIComponent(value);
  } catch {
    // Keep the original value when it is not valid percent-encoding.
  }

  return decoded.normalize('NFC').replace(/^\/+|\/+$/g, '');
}

export function encodeNormalizedSlug(value: string) {
  return encodeURIComponent(normalizeSlug(value));
}

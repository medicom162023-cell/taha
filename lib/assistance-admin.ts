import { getCloudflareContext } from '@opennextjs/cloudflare';

export type D1Statement = {
  bind(...values: unknown[]): D1Statement;
  run(): Promise<unknown>;
  first<T = Record<string, unknown>>(): Promise<T | null>;
  all<T = Record<string, unknown>>(): Promise<{ results?: T[] }>;
};

export type AssistanceDatabase = { prepare(query: string): D1Statement };

type AssistanceEnv = {
  ASSISTANCE_DB?: AssistanceDatabase;
  ADMIN_PASSWORD?: string;
  ADMIN_SESSION_SECRET?: string;
};

export function getAssistanceEnv() {
  const { env } = getCloudflareContext();
  return env as unknown as AssistanceEnv;
}

function bytes(value: string) {
  return new TextEncoder().encode(value);
}

function base64Url(value: ArrayBuffer) {
  const binary = String.fromCharCode(...new Uint8Array(value));
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

async function hmac(value: string, secret: string) {
  const key = await crypto.subtle.importKey('raw', bytes(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return base64Url(await crypto.subtle.sign('HMAC', key, bytes(value)));
}

async function safeEqual(left: string, right: string) {
  const leftHash = await crypto.subtle.digest('SHA-256', bytes(left));
  const rightHash = await crypto.subtle.digest('SHA-256', bytes(right));
  const a = new Uint8Array(leftHash);
  const b = new Uint8Array(rightHash);
  let difference = 0;
  for (let index = 0; index < a.length; index += 1) difference |= a[index] ^ b[index];
  return difference === 0;
}

export async function passwordMatches(candidate: string) {
  const password = getAssistanceEnv().ADMIN_PASSWORD;
  return Boolean(password && await safeEqual(candidate, password));
}

export async function createAdminSession() {
  const secret = getAssistanceEnv().ADMIN_SESSION_SECRET;
  if (!secret) throw new Error('ADMIN_SESSION_SECRET is not configured');
  const expires = Date.now() + 8 * 60 * 60 * 1000;
  const nonce = crypto.randomUUID();
  const payload = `${expires}.${nonce}`;
  return `${payload}.${await hmac(payload, secret)}`;
}

export async function isAdminRequest(request: Request) {
  const secret = getAssistanceEnv().ADMIN_SESSION_SECRET;
  if (!secret) return false;
  const cookie = request.headers.get('cookie')?.split(';').map((item) => item.trim()).find((item) => item.startsWith('aard_admin_session='));
  const token = cookie?.slice('aard_admin_session='.length);
  if (!token) return false;
  const [expiresText, nonce, signature] = token.split('.');
  const expires = Number(expiresText);
  if (!expires || expires < Date.now() || !nonce || !signature) return false;
  return safeEqual(signature, await hmac(`${expiresText}.${nonce}`, secret));
}

export function adminJson(data: unknown, status = 200) {
  return Response.json(data, { status, headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' } });
}

export function sameOrigin(request: Request) {
  const origin = request.headers.get('origin');
  return !origin || origin === new URL(request.url).origin;
}

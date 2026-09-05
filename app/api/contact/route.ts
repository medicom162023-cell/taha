import { getCloudflareContext } from '@opennextjs/cloudflare';

export const runtime = 'nodejs';

type OutgoingEmail = { readonly from: string; readonly to: string };
type EmailBinding = { send(message: OutgoingEmail): Promise<void> };
type Submission = { name?: unknown; email?: unknown; details?: unknown; website?: unknown; startedAt?: unknown };
const RECIPIENT = 'Info@aard.ps';

function clean(value: unknown, max: number) {
  if (typeof value !== 'string') return null;
  const normalized = value.trim().replace(/\r\n?/g, '\n');
  return normalized && normalized.length <= max ? normalized : null;
}

function json(message: string, status: number) {
  return Response.json({ message }, { status, headers: { 'Cache-Control': 'no-store' } });
}

function encodeHeader(value: string) {
  const bytes = new TextEncoder().encode(value);
  let binary = '';
  bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
  return `=?UTF-8?B?${btoa(binary)}?=`;
}

export async function POST(request: Request) {
  const contentType = request.headers.get('content-type') || '';
  const contentLength = Number(request.headers.get('content-length') || 0);
  if (!contentType.startsWith('application/json') || contentLength > 20_000) return json('الطلب غير صالح.', 400);
  const requestUrl = new URL(request.url);
  const origin = request.headers.get('origin');
  if (origin && origin !== requestUrl.origin) return json('مصدر الطلب غير مسموح.', 403);

  let body: Submission;
  try { body = await request.json() as Submission; }
  catch { return json('تعذر قراءة بيانات الرسالة.', 400); }

  if (body.website) return json('تم إرسال رسالتك بنجاح.', 200);
  if (typeof body.startedAt !== 'number' || Date.now() - body.startedAt < 1500 || Date.now() - body.startedAt > 86_400_000) return json('أعد تحميل الصفحة وحاول مجددًا.', 400);

  const name = clean(body.name, 120);
  const email = clean(body.email, 160);
  const details = clean(body.details, 2000);
  if (!name || !email || !details || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json('يرجى التأكد من الاسم والبريد الإلكتروني والتفاصيل.', 422);

  try {
    const { env } = getCloudflareContext();
    const binding = (env as unknown as { CONTACT_EMAIL?: EmailBinding }).CONTACT_EMAIL;
    if (!binding) return json('خدمة الإرسال غير متاحة مؤقتًا.', 503);
    const subject = `رسالة جديدة من صفحة تواصل معنا — ${name}`;
    const raw = [
      'From: AARD Website <noreply@aard.ps>', `To: ${RECIPIENT}`, `Reply-To: ${email}`,
      `Subject: ${encodeHeader(subject)}`, 'MIME-Version: 1.0', 'Content-Type: text/plain; charset=UTF-8',
      'Content-Transfer-Encoding: 8bit', '', `الاسم: ${name}`, `البريد الإلكتروني: ${email}`, '',
      'التفاصيل:', details, '', `وقت الإرسال: ${new Date().toISOString()}`,
    ].join('\r\n');
    const { EmailMessage } = await import('cloudflare:email');
    await binding.send(new EmailMessage('noreply@aard.ps', RECIPIENT, raw));
    return json('تم إرسال رسالتك بنجاح، وسنتواصل معك في أقرب وقت.', 200);
  } catch (error) {
    console.error('Contact email failed', error);
    return json('تعذر إرسال الرسالة حاليًا. يرجى المحاولة لاحقًا.', 500);
  }
}

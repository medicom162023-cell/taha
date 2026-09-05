export const runtime = 'nodejs';

type Submission = { name?: unknown; email?: unknown; details?: unknown; website?: unknown; startedAt?: unknown };
type ContactPagePayload = { content?: string };

const CONTACT_PAGE_API = 'https://aard.ps/wp-json/aard/v1/pages/contact-us-form';
const FORMINATOR_ENDPOINT = 'https://aard.ps/wp-admin/admin-ajax.php';

function clean(value: unknown, max: number) {
  if (typeof value !== 'string') return null;
  const normalized = value.trim().replace(/\r\n?/g, '\n');
  return normalized && normalized.length <= max ? normalized : null;
}

function json(message: string, status: number) {
  return Response.json({ message }, { status, headers: { 'Cache-Control': 'no-store' } });
}

function extract(html: string, pattern: RegExp) {
  return html.match(pattern)?.[1] || '';
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
  const details = clean(body.details, 180);
  if (!name || !email || !details || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json('يرجى التأكد من الاسم والبريد الإلكتروني والتفاصيل (بحد أقصى 180 حرفًا).', 422);

  try {
    const pageResponse = await fetch(CONTACT_PAGE_API, { cache: 'no-store', headers: { Accept: 'application/json' } });
    if (!pageResponse.ok) throw new Error(`Contact form configuration: ${pageResponse.status}`);
    const page = await pageResponse.json() as ContactPagePayload;
    const html = page.content || '';
    const nonce = extract(html, /name=["']forminator_nonce["'][^>]*value=["']([^"']+)/i);
    const formId = extract(html, /name=["']form_id["'][^>]*value=["']([^"']+)/i) || '2344';
    if (!nonce) throw new Error('Contact form nonce unavailable');

    const form = new FormData();
    form.set('action', 'forminator_submit_form_custom-forms');
    form.set('forminator_nonce', nonce);
    form.set('form_id', formId);
    form.set('form_type', 'default');
    form.set('render_id', '0');
    form.set('page_id', '0');
    form.set('current_url', 'https://aard.ps/contact');
    form.set('referer_url', 'https://aard.ps/contact');
    form.set('name-1', name);
    form.set('email-1', email);
    form.set('phone-1', '0097282856668');
    form.set('textarea-1', details);

    const resultResponse = await fetch(FORMINATOR_ENDPOINT, { method: 'POST', body: form, headers: { Accept: 'application/json' } });
    const result = await resultResponse.json().catch(() => null) as { success?: boolean; data?: { message?: string } } | null;
    if (!resultResponse.ok || !result?.success) throw new Error(result?.data?.message || `Form submission: ${resultResponse.status}`);
    return json('تم إرسال رسالتك بنجاح إلى Info@aard.ps، وسنتواصل معك في أقرب وقت.', 200);
  } catch (error) {
    console.error('Contact form submission failed', error);
    return json('تعذر إرسال الرسالة حاليًا. يرجى المحاولة لاحقًا أو مراسلتنا على Info@aard.ps.', 502);
  }
}

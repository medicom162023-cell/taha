import { getCloudflareContext } from '@opennextjs/cloudflare';

export const runtime = 'nodejs';

type Person = { name?: unknown; nationalId?: unknown; birthDate?: unknown; detail?: unknown };
type AssistanceDatabase = {
  prepare(query: string): {
    bind(...values: unknown[]): { run(): Promise<unknown> };
  };
};
type Submission = Record<string, unknown> & {
  fullName?: unknown;
  nationalId?: unknown;
  primaryPhone?: unknown;
  alternatePhone?: unknown;
  birthDate?: unknown;
  email?: unknown;
  maritalStatus?: unknown;
  governorate?: unknown;
  originalAddress?: unknown;
  currentGovernorate?: unknown;
  currentAddress?: unknown;
  housingStatus?: unknown;
  housingType?: unknown;
  consent?: unknown;
  website?: unknown;
  startedAt?: unknown;
  wives?: unknown;
  children?: unknown;
  chronicPatients?: unknown;
  peopleWithDisabilities?: unknown;
  warInjured?: unknown;
};

const allowedGovernorates = new Set(['شمال غزة', 'غزة', 'الوسطى', 'خانيونس', 'رفح']);
const allowedMaritalStatuses = new Set(['متزوج', 'مطلق', 'أرمل']);
const allowedHousingStatuses = new Set(['لا يوجد ضرر صالح للسكن', 'ضرر جزئي صالح للسكن', 'ضرر كلي غير صالح للسكن']);
const allowedHousingTypes = new Set(['ملك', 'إيجار', 'مركز إيواء', 'استضافة عند الأقارب', 'خيمة', '']);

function text(value: unknown, max: number, required = false) {
  if (typeof value !== 'string') return required ? null : '';
  const normalized = value.trim();
  if ((required && !normalized) || normalized.length > max) return null;
  return normalized;
}

function phone(value: unknown, required = false) {
  const valueText = text(value, 16, required);
  if (valueText === null) return null;
  if (!valueText && !required) return '';
  const digits = valueText.replace(/\D/g, '');
  return digits.length >= 8 && digits.length <= 15 ? valueText : null;
}

function isDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const timestamp = Date.parse(`${value}T00:00:00Z`);
  return Number.isFinite(timestamp) && timestamp <= Date.now();
}

function people(value: unknown, max: number, requirements: { identity?: boolean; birthDate?: boolean; detail?: boolean }) {
  if (!Array.isArray(value) || value.length > max) return null;
  const result = [];
  for (const person of value as Person[]) {
    if (!person || typeof person !== 'object') return null;
    const name = text(person.name, 120, true);
    const nationalId = requirements.identity ? text(person.nationalId, 9, true) : text(person.nationalId, 9);
    const birthDate = requirements.birthDate ? text(person.birthDate, 10, true) : text(person.birthDate, 10);
    const detail = requirements.detail ? text(person.detail, 160, true) : text(person.detail, 160);
    if (!name || nationalId === null || birthDate === null || detail === null) return null;
    if (requirements.identity && !/^\d{9}$/.test(nationalId)) return null;
    if (requirements.birthDate && !isDate(birthDate)) return null;
    result.push({ name, nationalId, birthDate, detail });
  }
  return result;
}

function json(message: string, status: number) {
  return Response.json({ message }, { status, headers: { 'Cache-Control': 'no-store' } });
}

export async function POST(request: Request) {
  const contentType = request.headers.get('content-type') || '';
  const contentLength = Number(request.headers.get('content-length') || 0);
  if (!contentType.startsWith('application/json') || contentLength > 100_000) return json('الطلب غير صالح.', 400);

  const requestUrl = new URL(request.url);
  const origin = request.headers.get('origin');
  if (origin && origin !== requestUrl.origin) return json('مصدر الطلب غير مسموح.', 403);

  let body: Submission;
  try {
    body = (await request.json()) as Submission;
  } catch {
    return json('تعذر قراءة بيانات الطلب.', 400);
  }

  if (body.website) return json('تم استلام الطلب.', 200);
  if (typeof body.startedAt !== 'number' || Date.now() - body.startedAt < 2_000 || Date.now() - body.startedAt > 86_400_000) {
    return json('انتهت جلسة النموذج. أعد تحميل الصفحة وحاول مجددًا.', 400);
  }

  const fullName = text(body.fullName, 120, true);
  const nationalId = text(body.nationalId, 9, true);
  const primaryPhone = phone(body.primaryPhone, true);
  const alternatePhone = phone(body.alternatePhone);
  const birthDate = text(body.birthDate, 10, true);
  const email = text(body.email, 160);
  const maritalStatus = text(body.maritalStatus, 20, true);
  const governorate = text(body.governorate, 30, true);
  const originalAddress = text(body.originalAddress, 240, true);
  const currentGovernorate = text(body.currentGovernorate, 30, true);
  const currentAddress = text(body.currentAddress, 240, true);
  const housingStatus = text(body.housingStatus, 80, true);
  const housingType = text(body.housingType, 80);

  if (!fullName || !nationalId || !/^\d{9}$/.test(nationalId) || !primaryPhone || !birthDate || !isDate(birthDate)) return json('تحقق من البيانات الأساسية ورقم الهوية.', 422);
  if (alternatePhone === null || email === null || (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) return json('تحقق من بيانات التواصل.', 422);
  if (!maritalStatus || !allowedMaritalStatuses.has(maritalStatus) || !governorate || !allowedGovernorates.has(governorate) || !currentGovernorate || !allowedGovernorates.has(currentGovernorate)) return json('تحقق من الحالة الاجتماعية والمحافظة.', 422);
  if (!originalAddress || !currentAddress || !housingStatus || !allowedHousingStatuses.has(housingStatus) || housingType === null || !allowedHousingTypes.has(housingType)) return json('تحقق من بيانات السكن.', 422);
  if (body.consent !== 'yes') return json('يجب الموافقة على التعهد قبل الإرسال.', 422);

  const wives = maritalStatus === 'متزوج' ? people(body.wives, 4, { identity: true, birthDate: true }) : [];
  const children = people(body.children, 20, { identity: true, birthDate: true });
  const chronicPatients = people(body.chronicPatients, 10, { detail: true });
  const peopleWithDisabilities = people(body.peopleWithDisabilities, 10, { detail: true });
  const warInjured = people(body.warInjured, 10, { detail: true });
  if (!wives || !children || !chronicPatients || !peopleWithDisabilities || !warInjured) return json('تحقق من بيانات أفراد الأسرة.', 422);

  const submittedAt = new Date().toISOString();
  const rawPayload = JSON.stringify({
    version: 1,
    wives,
    children,
    chronicPatients,
    peopleWithDisabilities,
    warInjured,
  });
  if (rawPayload.length > 64_000) return json('حجم البيانات المدخلة كبير جدًا.', 413);

  try {
    const { env } = getCloudflareContext();
    const database = (env as unknown as { ASSISTANCE_DB?: AssistanceDatabase }).ASSISTANCE_DB;
    if (!database) return json('خدمة التسجيل غير متاحة مؤقتًا.', 503);
    await database.prepare(`
      INSERT INTO assistance_applications (
        national_id, submitted_at, full_name, primary_phone, alternate_phone,
        birth_date, email, marital_status, governorate, original_address,
        current_governorate, current_address, housing_status, housing_type,
        consent, source, raw_payload, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, 'native-web-form', ?, CURRENT_TIMESTAMP)
      ON CONFLICT(national_id) DO UPDATE SET
        submitted_at = excluded.submitted_at,
        full_name = excluded.full_name,
        primary_phone = excluded.primary_phone,
        alternate_phone = excluded.alternate_phone,
        birth_date = excluded.birth_date,
        email = excluded.email,
        marital_status = excluded.marital_status,
        governorate = excluded.governorate,
        original_address = excluded.original_address,
        current_governorate = excluded.current_governorate,
        current_address = excluded.current_address,
        housing_status = excluded.housing_status,
        housing_type = excluded.housing_type,
        consent = 1,
        source = 'native-web-form',
        raw_payload = excluded.raw_payload,
        updated_at = CURRENT_TIMESTAMP
    `).bind(
      nationalId, submittedAt, fullName, primaryPhone, alternatePhone || null,
      birthDate, email || null, maritalStatus, governorate, originalAddress,
      currentGovernorate, currentAddress, housingStatus, housingType || null, rawPayload,
    ).run();
    return json('تم تسجيل طلبك بنجاح. عند وجود طلب سابق لنفس رقم الهوية، تم اعتماد هذا الطلب باعتباره الأحدث.', 200);
  } catch (error) {
    console.error('Assistance application submission failed', error);
    return json('تعذر حفظ الطلب حاليًا. يرجى المحاولة لاحقًا.', 500);
  }
}

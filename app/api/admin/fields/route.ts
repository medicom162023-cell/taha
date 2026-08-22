import { adminJson, getAssistanceEnv, isAdminRequest, sameOrigin } from '@/lib/assistance-admin';

export const runtime = 'nodejs';

const types = new Set(['text','number','date','textarea','select','radio','checkbox']);

function clean(value: unknown, max: number) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

export async function GET(request: Request) {
  if (!(await isAdminRequest(request))) return adminJson({ message: 'غير مصرح.' }, 401);
  const database = getAssistanceEnv().ASSISTANCE_DB;
  if (!database) return adminJson({ message: 'قاعدة البيانات غير متاحة.' }, 503);
  const result = await database.prepare(`
    SELECT id, field_key AS fieldKey, label, field_type AS fieldType, help_text AS helpText,
      options_json AS optionsJson, is_required AS isRequired, is_active AS isActive,
      sort_order AS sortOrder, is_core AS isCore, updated_at AS updatedAt
    FROM assistance_form_fields ORDER BY sort_order, id
  `).all<Record<string, unknown>>();
  return adminJson({ fields: (result.results || []).map((field) => ({
    ...field,
    options: JSON.parse(String(field.optionsJson || '[]')),
    isRequired: Boolean(field.isRequired), isActive: Boolean(field.isActive), isCore: Boolean(field.isCore),
  })) });
}

export async function POST(request: Request) {
  if (!(await isAdminRequest(request))) return adminJson({ message: 'غير مصرح.' }, 401);
  if (!sameOrigin(request)) return adminJson({ message: 'مصدر الطلب غير مسموح.' }, 403);
  const database = getAssistanceEnv().ASSISTANCE_DB;
  if (!database) return adminJson({ message: 'قاعدة البيانات غير متاحة.' }, 503);
  const body = await request.json() as Record<string, unknown>;
  const label = clean(body.label, 120);
  const fieldType = clean(body.fieldType, 20);
  const helpText = clean(body.helpText, 240);
  const options = Array.isArray(body.options) ? body.options.map((item) => clean(item, 120)).filter(Boolean).slice(0, 30) : [];
  const fieldKey = `custom_${crypto.randomUUID().replace(/-/g, '').slice(0, 20)}`;
  if (!label || !types.has(fieldType)) return adminJson({ message: 'تحقق من اسم ونوع الحقل.' }, 422);
  if ((fieldType === 'select' || fieldType === 'radio') && options.length < 2) return adminJson({ message: 'أضف خيارين على الأقل.' }, 422);
  await database.prepare(`
    INSERT INTO assistance_form_fields (field_key,label,field_type,help_text,options_json,is_required,is_active,sort_order)
    VALUES (?,?,?,?,?,?,1,?)
  `).bind(fieldKey, label, fieldType, helpText, JSON.stringify(options), body.isRequired ? 1 : 0, Number(body.sortOrder) || 100).run();
  await database.prepare(`INSERT INTO assistance_admin_audit (action,entity_type,entity_id,details_json) VALUES ('create','field',?,?)`)
    .bind(fieldKey, JSON.stringify({ label, fieldType })).run();
  return adminJson({ message: 'تمت إضافة الحقل.' }, 201);
}

export async function PATCH(request: Request) {
  if (!(await isAdminRequest(request))) return adminJson({ message: 'غير مصرح.' }, 401);
  if (!sameOrigin(request)) return adminJson({ message: 'مصدر الطلب غير مسموح.' }, 403);
  const database = getAssistanceEnv().ASSISTANCE_DB;
  if (!database) return adminJson({ message: 'قاعدة البيانات غير متاحة.' }, 503);
  const body = await request.json() as Record<string, unknown>;
  const id = Number(body.id);
  const current = await database.prepare('SELECT is_core AS isCore, field_key AS fieldKey FROM assistance_form_fields WHERE id = ?').bind(id).first<{ isCore: number; fieldKey: string }>();
  if (!current) return adminJson({ message: 'الحقل غير موجود.' }, 404);
  const label = clean(body.label, 120);
  const fieldType = current.isCore ? 'text' : clean(body.fieldType, 20);
  const helpText = clean(body.helpText, 240);
  const options = Array.isArray(body.options) ? body.options.map((item) => clean(item, 120)).filter(Boolean).slice(0, 30) : [];
  if (!label || !types.has(fieldType)) return adminJson({ message: 'تحقق من بيانات الحقل.' }, 422);
  const active = current.isCore ? 1 : (body.isActive ? 1 : 0);
  const required = current.isCore ? 1 : (body.isRequired ? 1 : 0);
  await database.prepare(`
    UPDATE assistance_form_fields SET label=?, field_type=?, help_text=?, options_json=?,
      is_required=?, is_active=?, sort_order=?, updated_at=CURRENT_TIMESTAMP WHERE id=?
  `).bind(label, fieldType, helpText, JSON.stringify(options), required, active, Number(body.sortOrder) || 100, id).run();
  await database.prepare(`INSERT INTO assistance_admin_audit (action,entity_type,entity_id,details_json) VALUES ('update','field',?,?)`)
    .bind(current.fieldKey, JSON.stringify({ label, fieldType, active })).run();
  return adminJson({ message: 'تم تعديل الحقل.' });
}

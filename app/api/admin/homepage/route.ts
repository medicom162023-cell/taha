import { adminJson, getAssistanceEnv, isAdminRequest, sameOrigin } from '@/lib/assistance-admin';
import { defaultHomepageContent, isHomepageSection, type HomepageContent } from '@/lib/homepage-content';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  if (!(await isAdminRequest(request))) return adminJson({ message: 'غير مصرح.' }, 401);
  const database = getAssistanceEnv().ASSISTANCE_DB;
  if (!database) return adminJson({ message: 'قاعدة البيانات غير متاحة.' }, 503);
  try {
    const result = await database.prepare('SELECT section_key, content_json, updated_at FROM homepage_content').all<{ section_key: string; content_json: string; updated_at: string }>();
    const content: HomepageContent = structuredClone(defaultHomepageContent);
    const updatedAt: Record<string, string> = {};
    for (const row of result.results || []) {
      if (!isHomepageSection(row.section_key)) continue;
      try { Object.assign(content, { [row.section_key]: JSON.parse(row.content_json) }); updatedAt[row.section_key] = row.updated_at; } catch { /* retain defaults */ }
    }
    return adminJson({ content, updatedAt });
  } catch {
    return adminJson({ content: defaultHomepageContent, updatedAt: {}, needsMigration: true });
  }
}

export async function PATCH(request: Request) {
  if (!(await isAdminRequest(request))) return adminJson({ message: 'غير مصرح.' }, 401);
  if (!sameOrigin(request)) return adminJson({ message: 'مصدر الطلب غير مسموح.' }, 403);
  const database = getAssistanceEnv().ASSISTANCE_DB;
  if (!database) return adminJson({ message: 'قاعدة البيانات غير متاحة.' }, 503);
  let body: { section?: unknown; content?: unknown };
  try { body = await request.json() as typeof body; } catch { return adminJson({ message: 'الطلب غير صالح.' }, 400); }
  if (typeof body.section !== 'string' || !isHomepageSection(body.section) || !body.content || typeof body.content !== 'object') return adminJson({ message: 'بيانات القسم غير صالحة.' }, 400);
  if (!safeContent(body.content)) return adminJson({ message: 'مسارات الصور أو الروابط غير صالحة.' }, 400);
  const serialized = JSON.stringify(body.content);
  if (serialized.length > 100_000) return adminJson({ message: 'محتوى القسم أكبر من الحد المسموح.' }, 413);
  await database.prepare(`INSERT INTO homepage_content (section_key, content_json, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP)
    ON CONFLICT(section_key) DO UPDATE SET content_json = excluded.content_json, updated_at = CURRENT_TIMESTAMP`).bind(body.section, serialized).run();
  await database.prepare("INSERT INTO assistance_admin_audit (action, entity_type, entity_id, details_json) VALUES ('update', 'homepage_section', ?, '{}')").bind(body.section).run();
  return adminJson({ message: 'تم حفظ القسم بنجاح.' });
}

function safeContent(value: unknown, key = ''): boolean {
  if (Array.isArray(value)) return value.length <= 20 && value.every((item) => safeContent(item, key));
  if (value && typeof value === 'object') return Object.entries(value as Record<string, unknown>).every(([childKey, child]) => safeContent(child, childKey));
  if (typeof value !== 'string') return typeof value === 'number' || typeof value === 'boolean';
  if (value.length > 10_000) return false;
  if (key === 'buttonHref') return value.startsWith('/') || value.startsWith('#') || value.startsWith('https://');
  if (key === 'image' || key === 'logo') return value.startsWith('/');
  return true;
}

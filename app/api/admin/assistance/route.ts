import { adminJson, getAssistanceEnv, isAdminRequest } from '@/lib/assistance-admin';

export const runtime = 'nodejs';

type ApplicationRow = {
  id: number; national_id: string; full_name: string; primary_phone: string;
  governorate: string; submitted_at: string; updated_at: string;
};

export async function GET(request: Request) {
  if (!(await isAdminRequest(request))) return adminJson({ message: 'غير مصرح.' }, 401);
  const database = getAssistanceEnv().ASSISTANCE_DB;
  if (!database) return adminJson({ message: 'قاعدة البيانات غير متاحة.' }, 503);
  const url = new URL(request.url);
  const query = (url.searchParams.get('q') || '').trim().slice(0, 120);
  const page = Math.max(1, Math.min(100000, Number(url.searchParams.get('page') || 1) || 1));
  const limit = 50;
  const pattern = `%${query.replace(/[\\%_]/g, '\\$&')}%`;
  const where = query ? "WHERE full_name LIKE ? ESCAPE '\\' OR national_id LIKE ? ESCAPE '\\' OR primary_phone LIKE ? ESCAPE '\\'" : '';
  const values = query ? [pattern, pattern, pattern] : [];
  const count = await database.prepare(`SELECT COUNT(*) AS total FROM assistance_applications ${where}`).bind(...values).first<{ total: number }>();
  const result = await database.prepare(`
    SELECT id, national_id, full_name, primary_phone, governorate, submitted_at, updated_at
    FROM assistance_applications ${where}
    ORDER BY submitted_at DESC LIMIT ? OFFSET ?
  `).bind(...values, limit, (page - 1) * limit).all<ApplicationRow>();
  return adminJson({ items: result.results || [], total: count?.total || 0, page, limit });
}

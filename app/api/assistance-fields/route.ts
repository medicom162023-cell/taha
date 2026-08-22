import { adminJson, getAssistanceEnv } from '@/lib/assistance-admin';

export const runtime = 'nodejs';

export async function GET() {
  const database = getAssistanceEnv().ASSISTANCE_DB;
  if (!database) return adminJson({ fields: [] });
  try {
    const result = await database.prepare(`
      SELECT field_key AS fieldKey, label, field_type AS fieldType, help_text AS helpText,
        options_json AS optionsJson, is_required AS isRequired, sort_order AS sortOrder
      FROM assistance_form_fields WHERE is_active = 1 AND is_core = 0 ORDER BY sort_order, id
    `).all<Record<string, unknown>>();
    return adminJson({ fields: (result.results || []).map((field) => ({
      ...field,
      options: JSON.parse(String(field.optionsJson || '[]')),
      isRequired: Boolean(field.isRequired),
    })) });
  } catch {
    return adminJson({ fields: [] });
  }
}

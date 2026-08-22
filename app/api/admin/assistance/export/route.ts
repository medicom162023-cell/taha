import { getAssistanceEnv, isAdminRequest } from '@/lib/assistance-admin';

export const runtime = 'nodejs';

type ExportRow = Record<string, string | number | null> & { id:number; raw_payload:string|null };
type CustomFieldRow = { field_key:string; label:string };

function csvCell(value: unknown) {
  const text = value == null ? '' : String(value);
  return `"${text.replace(/"/g, '""')}"`;
}

export async function GET(request: Request) {
  if (!(await isAdminRequest(request))) return Response.json({ message: 'غير مصرح.' }, { status: 401 });
  const database = getAssistanceEnv().ASSISTANCE_DB;
  if (!database) return Response.json({ message: 'قاعدة البيانات غير متاحة.' }, { status: 503 });
  const coreHeaders = ['national_id','full_name','primary_phone','alternate_phone','birth_date','email','marital_status','governorate','original_address','current_governorate','current_address','housing_status','housing_type','submitted_at','updated_at'];
  let customFields: CustomFieldRow[] = [];
  try {
    const configured = await database.prepare('SELECT field_key, label FROM assistance_form_fields ORDER BY sort_order, id').all<CustomFieldRow>();
    customFields = configured.results || [];
  } catch {
    customFields = [];
  }
  let cursor = 0;
  let sentHeader = false;
  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async pull(controller) {
      if (!sentHeader) {
        const labels = [...coreHeaders, ...customFields.map((field) => field.label)];
        controller.enqueue(encoder.encode(`\uFEFF${labels.map(csvCell).join(',')}\r\n`));
        sentHeader = true;
        return;
      }
      const result = await database.prepare(`
        SELECT id, national_id, full_name, primary_phone, alternate_phone, birth_date, email,
          marital_status, governorate, original_address, current_governorate, current_address,
          housing_status, housing_type, submitted_at, updated_at, raw_payload
        FROM assistance_applications WHERE id > ? ORDER BY id LIMIT 500
      `).bind(cursor).all<ExportRow>();
      const rows = result.results || [];
      if (!rows.length) { controller.close(); return; }
      cursor = rows[rows.length - 1].id;
      const chunk = rows.map((row) => {
        let custom:Record<string,unknown> = {};
        try { custom = (JSON.parse(row.raw_payload || '{}') as { customFields?:Record<string,unknown> }).customFields || {}; } catch { custom = {}; }
        return [...coreHeaders.map((header) => csvCell(row[header])), ...customFields.map((field) => csvCell(custom[field.field_key]))].join(',');
      }).join('\r\n') + '\r\n';
      controller.enqueue(encoder.encode(chunk));
    },
  });
  return new Response(stream, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="assistance-applications-${new Date().toISOString().slice(0, 10)}.csv"`,
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

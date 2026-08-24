import { getAssistanceEnv } from '@/lib/assistance-admin';
import { isHomepageSection, type HomepageContent } from '@/lib/homepage-content';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const database = getAssistanceEnv().ASSISTANCE_DB;
  if (!database) return Response.json({}, { headers: { 'Cache-Control': 'no-store' } });
  try {
    const result = await database.prepare('SELECT section_key, content_json FROM homepage_content').all<{ section_key: string; content_json: string }>();
    const content: Partial<HomepageContent> = {};
    for (const row of result.results || []) {
      if (!isHomepageSection(row.section_key)) continue;
      try { Object.assign(content, { [row.section_key]: JSON.parse(row.content_json) }); } catch { /* retain defaults */ }
    }
    return Response.json(content, { headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' } });
  } catch {
    return Response.json({}, { headers: { 'Cache-Control': 'no-store' } });
  }
}

import { createAdminSession, passwordMatches, sameOrigin, adminJson } from '@/lib/assistance-admin';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  if (!sameOrigin(request)) return adminJson({ message: 'مصدر الطلب غير مسموح.' }, 403);
  let password = '';
  try {
    const body = await request.json() as { password?: unknown };
    password = typeof body.password === 'string' ? body.password : '';
  } catch {
    return adminJson({ message: 'الطلب غير صالح.' }, 400);
  }
  if (!password || password.length > 256 || !(await passwordMatches(password))) {
    return adminJson({ message: 'كلمة المرور غير صحيحة.' }, 401);
  }
  const token = await createAdminSession();
  const response = adminJson({ message: 'تم تسجيل الدخول.' });
  response.headers.append('Set-Cookie', `aard_admin_session=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=28800`);
  return response;
}

export async function DELETE(request: Request) {
  if (!sameOrigin(request)) return adminJson({ message: 'مصدر الطلب غير مسموح.' }, 403);
  const response = adminJson({ message: 'تم تسجيل الخروج.' });
  response.headers.append('Set-Cookie', 'aard_admin_session=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0');
  return response;
}

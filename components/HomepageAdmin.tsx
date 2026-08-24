'use client';
/* eslint-disable react-hooks/set-state-in-effect -- initial admin data is loaded after session verification */

import { FormEvent, useCallback, useEffect, useState } from 'react';
import { defaultHomepageContent, homepageSectionLabels, type HomepageContent, type HomepageSection } from '@/lib/homepage-content';

const sections = Object.keys(homepageSectionLabels) as HomepageSection[];
const fieldLabels: Record<string, string> = {
  eyebrow: 'العنوان التمهيدي', title: 'العنوان', description: 'الوصف', image: 'مسار الصورة', badge: 'الشارة', slides: 'شرائح Hero',
  buttonLabel: 'نص الزر', buttonHref: 'رابط الزر', imageBadge: 'شارة الصورة', imageCaption: 'تعليق الصورة', stats: 'الإحصاءات',
  items: 'العناصر', category: 'التصنيف', points: 'النقاط', number: 'الرقم', label: 'المسمى', icon: 'الأيقونة', name: 'الاسم', logo: 'مسار الشعار',
};
const arrayTemplates: Record<string, unknown> = {
  slides: { image: '/hero-bg.jpg', badge: 'شارة جديدة', title: 'عنوان جديد', description: 'وصف الشريحة' },
  stats: { number: '0', label: 'مسمى الإحصائية', icon: 'users' },
  items: { title: 'عنوان جديد', category: 'التصنيف', description: 'الوصف', image: '/hero-bg.jpg' },
  points: 'نقطة جديدة',
};

function arrayTemplate(path: string, key: string) {
  if (path === 'partners.items') return { name: 'اسم الشريك', logo: '/partners/undp.png' };
  return arrayTemplates[key] ?? '';
}

function clone<T>(value: T): T { return JSON.parse(JSON.stringify(value)) as T; }

export default function HomepageAdmin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [active, setActive] = useState<HomepageSection>('hero');
  const [content, setContent] = useState<HomepageContent>(clone(defaultHomepageContent));
  const [saving, setSaving] = useState(false);
  const [needsMigration, setNeedsMigration] = useState(false);

  const load = useCallback(async () => {
    const response = await fetch('/api/admin/homepage', { cache: 'no-store' });
    if (response.status === 401) { setAuthenticated(false); return; }
    const data = await response.json() as { content?: HomepageContent; needsMigration?: boolean };
    if (response.ok) { setAuthenticated(true); setContent(data.content || clone(defaultHomepageContent)); setNeedsMigration(Boolean(data.needsMigration)); }
  }, []);
  useEffect(() => { void load(); }, [load]);

  async function login(event: FormEvent) {
    event.preventDefault(); setMessage('جارٍ التحقق...');
    const response = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) });
    const data = await response.json() as { message?: string }; setMessage(data.message || '');
    if (response.ok) { setPassword(''); await load(); }
  }

  async function save() {
    setSaving(true); setMessage('جارٍ حفظ القسم...');
    const response = await fetch('/api/admin/homepage', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ section: active, content: content[active] }) });
    const data = await response.json() as { message?: string }; setMessage(data.message || ''); setSaving(false);
  }

  if (!authenticated) return <form onSubmit={login} className="mx-auto mt-16 max-w-md rounded-2xl border bg-white p-7 shadow-lg"><h1 className="mb-2 text-2xl font-extrabold text-[#00466f]">دخول إدارة الصفحة الرئيسية</h1><p className="mb-6 text-sm text-slate-500">استخدم كلمة مرور الإدارة نفسها</p><input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required className="form-input" placeholder="كلمة مرور الإدارة" /><button className="mt-4 w-full rounded-lg bg-[#51c698] p-3 font-bold text-white">دخول</button>{message && <p className="mt-3 text-sm">{message}</p>}</form>;

  return <div className="mx-auto max-w-[1450px] space-y-5">
    <header className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-[#00466f] p-6 text-white shadow-lg"><div><p className="text-sm text-[#8ee0c0]">لوحة إدارة المحتوى</p><h1 className="mt-1 text-3xl font-extrabold">إدارة الصفحة الرئيسية</h1><p className="mt-2 text-sm text-white/70">تعديل النصوص والصور والعناصر مع حفظ كل قسم منفصلًا</p></div><div className="flex gap-2"><a href="/" target="_blank" className="rounded-lg bg-white/10 px-4 py-2 font-bold">معاينة الموقع ↗</a><a href="/assistance-admin" className="rounded-lg bg-white/10 px-4 py-2 font-bold">إدارة المساعدات</a><button onClick={async () => { await fetch('/api/admin/login', { method: 'DELETE' }); setAuthenticated(false); }} className="rounded-lg border border-white/30 px-4 py-2">خروج</button></div></header>
    {needsMigration && <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm font-bold text-amber-800">يلزم تنفيذ ملف الهجرة 0002_homepage_dashboard.sql قبل أول حفظ.</div>}
    {message && <div className="rounded-xl bg-blue-50 p-3 text-sm text-blue-900">{message}</div>}
    <div className="grid gap-5 lg:grid-cols-[250px_1fr]">
      <nav className="h-fit rounded-2xl border bg-white p-3 shadow-sm">{sections.map((section) => <button key={section} onClick={() => { setActive(section); setMessage(''); }} className={`mb-1 w-full rounded-xl px-4 py-3 text-right text-sm font-bold transition ${active === section ? 'bg-[#00466f] text-white' : 'hover:bg-slate-100'}`}>{homepageSectionLabels[section]}</button>)}</nav>
      <section className="rounded-2xl border bg-white p-5 shadow-sm md:p-7"><div className="mb-6 flex items-center justify-between gap-3 border-b pb-5"><div><h2 className="text-2xl font-extrabold text-[#00466f]">{homepageSectionLabels[active]}</h2><p className="mt-1 text-xs text-slate-500">احفظ هذا القسم بعد الانتهاء من تعديله</p></div><button onClick={save} disabled={saving || needsMigration} className="rounded-xl bg-[#51c698] px-6 py-3 font-bold text-white disabled:opacity-50">{saving ? 'جارٍ الحفظ...' : 'حفظ القسم'}</button></div>
        <ValueEditor value={content[active]} path={active} onChange={(value) => setContent({ ...content, [active]: value })} />
      </section>
    </div>
  </div>;
}

function ValueEditor({ value, path, onChange }: { value: unknown; path: string; onChange: (value: never) => void }) {
  const key = path.split('.').pop() || path;
  if (Array.isArray(value)) return <ArrayEditor values={value} path={path} onChange={onChange} />;
  if (value && typeof value === 'object') return <div className="grid gap-5 md:grid-cols-2">{Object.entries(value as Record<string, unknown>).map(([childKey, childValue]) => <div key={childKey} className={(Array.isArray(childValue) || (typeof childValue === 'string' && childValue.length > 80)) ? 'md:col-span-2' : ''}><ValueEditor value={childValue} path={`${path}.${childKey}`} onChange={(next) => onChange({ ...(value as object), [childKey]: next } as never)} /></div>)}</div>;
  const label = fieldLabels[key] || key;
  const isLong = typeof value === 'string' && (value.length > 80 || key === 'description');
  const isImage = key === 'image' || key === 'logo';
  return <label className="block text-sm font-bold text-[#304b5b]">{label}{isImage ? <span className="mr-2 text-xs font-normal text-slate-400">مثال: /hero-bg.jpg</span> : null}{isLong ? <textarea className="form-input mt-2 min-h-28 resize-y" value={String(value ?? '')} onChange={(event) => onChange(event.target.value as never)} /> : <input className="form-input mt-2" value={String(value ?? '')} onChange={(event) => onChange((typeof value === 'number' ? Number(event.target.value) : event.target.value) as never)} />}{isImage && String(value || '').startsWith('/') && <span className="mt-3 block h-32 rounded-lg border bg-cover bg-center" style={{ backgroundImage: `url('${String(value).replace(/'/g, '')}')` }} />}</label>;
}

function ArrayEditor({ values, path, onChange }: { values: unknown[]; path: string; onChange: (value: never) => void }) {
  const key = path.split('.').pop() || path; const label = fieldLabels[key] || key;
  const update = (index: number, next: unknown) => onChange(values.map((value, position) => position === index ? next : value) as never);
  return <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 md:col-span-2"><div className="mb-4 flex items-center justify-between"><h3 className="font-extrabold text-[#00466f]">{label}</h3><button type="button" onClick={() => onChange([...values, clone(arrayTemplate(path, key))] as never)} className="rounded-lg bg-[#00466f] px-4 py-2 text-xs font-bold text-white">+ إضافة عنصر</button></div><div className="space-y-4">{values.map((value, index) => <div key={index} className="rounded-xl border bg-white p-4"><div className="mb-4 flex items-center justify-between"><b className="text-sm text-slate-500">العنصر {index + 1}</b><div className="flex gap-2"><button type="button" disabled={index === 0} onClick={() => { const next = [...values]; [next[index - 1], next[index]] = [next[index], next[index - 1]]; onChange(next as never); }} className="rounded border px-2 disabled:opacity-30">↑</button><button type="button" disabled={index === values.length - 1} onClick={() => { const next = [...values]; [next[index + 1], next[index]] = [next[index], next[index + 1]]; onChange(next as never); }} className="rounded border px-2 disabled:opacity-30">↓</button><button type="button" onClick={() => onChange(values.filter((_, position) => position !== index) as never)} className="rounded border border-red-200 px-3 text-red-600">حذف</button></div></div><ValueEditor value={value} path={`${path}.${index}`} onChange={(next) => update(index, next)} /></div>)}</div></div>;
}

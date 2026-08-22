'use client';
/* eslint-disable react-hooks/set-state-in-effect -- effects intentionally refresh remote admin data */

import { FormEvent, useCallback, useEffect, useState } from 'react';

type Application = { id:number; national_id:string; full_name:string; primary_phone:string; governorate:string; submitted_at:string };
type Field = { id:number; fieldKey:string; label:string; fieldType:string; helpText:string; options:string[]; isRequired:boolean; isActive:boolean; isCore:boolean; sortOrder:number; updatedAt?:string };

export default function AssistanceAdmin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [tab, setTab] = useState<'applications'|'fields'>('applications');
  const [items, setItems] = useState<Application[]>([]);
  const [total, setTotal] = useState(0);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [fields, setFields] = useState<Field[]>([]);

  const loadApplications = useCallback(async () => {
    const response = await fetch(`/api/admin/assistance?q=${encodeURIComponent(query)}&page=${page}`, { cache: 'no-store' });
    if (response.status === 401) { setAuthenticated(false); return; }
    const data = await response.json() as { items?:Application[]; total?:number };
    setItems(data.items || []); setTotal(data.total || 0); setAuthenticated(true);
  }, [query, page]);

  const loadFields = useCallback(async () => {
    const response = await fetch('/api/admin/fields', { cache: 'no-store' });
    if (!response.ok) return;
    const data = await response.json() as { fields?:Field[] }; setFields(data.fields || []);
  }, []);

  useEffect(() => { void loadApplications(); }, [loadApplications]);
  useEffect(() => { if (authenticated) void loadFields(); }, [authenticated, loadFields]);

  async function login(event: FormEvent) {
    event.preventDefault(); setMessage('جارٍ التحقق...');
    const response = await fetch('/api/admin/login', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ password }) });
    const data = await response.json() as { message?:string }; setMessage(data.message || '');
    if (response.ok) { setPassword(''); setAuthenticated(true); await loadApplications(); }
  }

  async function saveField(field: Partial<Field>, creating = false) {
    const response = await fetch('/api/admin/fields', { method:creating?'POST':'PATCH', headers:{'Content-Type':'application/json'}, body:JSON.stringify(field) });
    const data = await response.json() as { message?:string }; setMessage(data.message || ''); if (response.ok) await loadFields();
  }

  if (!authenticated) return <form onSubmit={login} className="mx-auto max-w-md rounded-2xl border bg-white p-7 shadow-lg"><h1 className="mb-6 text-2xl font-extrabold text-[#00466f]">دخول إدارة المساعدات</h1><input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required className="form-input" placeholder="كلمة مرور الإدارة" /><button className="mt-4 w-full rounded-lg bg-[#51c698] p-3 font-bold text-white">دخول</button>{message&&<p className="mt-3 text-sm">{message}</p>}</form>;

  return <div className="mx-auto max-w-7xl space-y-5">
    <div className="flex flex-wrap items-center justify-between gap-3"><div><h1 className="text-3xl font-extrabold text-[#00466f]">إدارة طلبات المساعدات</h1><p className="text-sm text-slate-500">بيانات خاصة — للمخولين فقط</p></div><button onClick={async()=>{await fetch('/api/admin/login',{method:'DELETE'});setAuthenticated(false);}} className="rounded-lg border px-4 py-2">تسجيل الخروج</button></div>
    <div className="flex gap-2"><button onClick={()=>setTab('applications')} className={`rounded-lg px-5 py-2 font-bold ${tab==='applications'?'bg-[#00466f] text-white':'bg-white'}`}>المستفيدون</button><button onClick={()=>setTab('fields')} className={`rounded-lg px-5 py-2 font-bold ${tab==='fields'?'bg-[#00466f] text-white':'bg-white'}`}>إدارة الحقول</button></div>
    {message&&<div className="rounded-lg bg-blue-50 p-3 text-sm">{message}</div>}
    {tab==='applications' ? <div className="rounded-2xl border bg-white p-5">
      <div className="mb-5 flex flex-wrap gap-3"><form onSubmit={(e)=>{e.preventDefault();setPage(1);void loadApplications();}} className="flex flex-1 gap-2"><input value={query} onChange={(e)=>setQuery(e.target.value)} className="form-input" placeholder="بحث بالاسم أو الهوية أو الجوال"/><button className="rounded-lg bg-[#00466f] px-5 text-white">بحث</button></form><a href="/api/admin/assistance/export" className="rounded-lg bg-[#51c698] px-5 py-3 font-bold text-white">تنزيل CSV</a></div>
      <p className="mb-3 text-sm font-bold">إجمالي السجلات: {total.toLocaleString('ar')}</p><div className="overflow-x-auto"><table className="w-full min-w-[800px] text-right text-sm"><thead className="bg-slate-100"><tr>{['الهوية','الاسم','الجوال','المحافظة','تاريخ التسجيل'].map(h=><th key={h} className="p-3">{h}</th>)}</tr></thead><tbody>{items.map(item=><tr key={item.id} className="border-b"><td className="p-3">{item.national_id}</td><td className="p-3 font-bold">{item.full_name}</td><td className="p-3">{item.primary_phone}</td><td className="p-3">{item.governorate}</td><td className="p-3">{new Date(item.submitted_at).toLocaleString('ar')}</td></tr>)}</tbody></table></div>
      <div className="mt-4 flex justify-between"><button disabled={page===1} onClick={()=>setPage(p=>p-1)} className="rounded border px-4 py-2 disabled:opacity-40">السابق</button><span>صفحة {page}</span><button disabled={page*50>=total} onClick={()=>setPage(p=>p+1)} className="rounded border px-4 py-2 disabled:opacity-40">التالي</button></div>
    </div> : <FieldManager fields={fields} save={saveField}/>} 
  </div>;
}

function FieldManager({fields,save}:{fields:Field[];save:(field:Partial<Field>,creating?:boolean)=>Promise<void>}) {
  const empty:Partial<Field>={label:'',fieldType:'text',helpText:'',options:[],isRequired:false,isActive:true,sortOrder:100};
  const [draft,setDraft]=useState<Partial<Field>>(empty);
  return <div className="space-y-4"><div className="rounded-2xl border bg-white p-5"><h2 className="mb-4 text-xl font-bold">إضافة حقل</h2><FieldEditor field={draft} onChange={setDraft}/><button onClick={async()=>{await save(draft,true);setDraft(empty);}} className="mt-4 rounded-lg bg-[#51c698] px-6 py-3 font-bold text-white">إضافة الحقل</button></div>{fields.map(field=><EditableField key={`${field.id}-${field.updatedAt}`} field={field} save={save}/>)}</div>;
}

function EditableField({field,save}:{field:Field;save:(field:Partial<Field>)=>Promise<void>}) { const [draft,setDraft]=useState<Field>(field); return <div className="rounded-2xl border bg-white p-5"><div className="mb-3 flex justify-between"><b>{field.label}</b>{field.isCore&&<span className="rounded bg-amber-100 px-2 text-xs">حقل أساسي محمي</span>}</div><FieldEditor field={draft} onChange={(v)=>setDraft({...draft,...v})}/><button onClick={()=>save(draft)} className="mt-4 rounded-lg bg-[#00466f] px-5 py-2 font-bold text-white">حفظ التعديل</button></div>; }

function FieldEditor({field,onChange}:{field:Partial<Field>;onChange:(field:Partial<Field>)=>void}) { const options=(field.options||[]).join('\n'); return <div className="grid gap-4 md:grid-cols-2"><label>اسم الحقل<input className="form-input mt-1" value={field.label||''} onChange={e=>onChange({...field,label:e.target.value})}/></label><label>النوع<select className="form-input mt-1" value={field.fieldType} onChange={e=>onChange({...field,fieldType:e.target.value})}>{[['text','نص'],['number','رقم'],['date','تاريخ'],['textarea','نص طويل'],['select','قائمة'],['radio','اختيار واحد'],['checkbox','مربع اختيار']].map(([v,l])=><option key={v} value={v}>{l}</option>)}</select></label><label>نص المساعدة<input className="form-input mt-1" value={field.helpText||''} onChange={e=>onChange({...field,helpText:e.target.value})}/></label><label>الترتيب<input type="number" className="form-input mt-1" value={field.sortOrder||100} onChange={e=>onChange({...field,sortOrder:Number(e.target.value)})}/></label>{(field.fieldType==='select'||field.fieldType==='radio')&&<label className="md:col-span-2">الخيارات — خيار في كل سطر<textarea className="form-input mt-1 min-h-28" value={options} onChange={e=>onChange({...field,options:e.target.value.split('\n')})}/></label>}<label className="flex gap-2"><input type="checkbox" checked={Boolean(field.isRequired)} disabled={field.isCore} onChange={e=>onChange({...field,isRequired:e.target.checked})}/>إلزامي</label><label className="flex gap-2"><input type="checkbox" checked={Boolean(field.isActive)} disabled={field.isCore} onChange={e=>onChange({...field,isActive:e.target.checked})}/>ظاهر في الاستمارة</label></div>; }

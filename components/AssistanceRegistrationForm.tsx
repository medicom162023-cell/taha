'use client';

import { FormEvent, useRef, useState } from 'react';

type Person = { name: string; nationalId?: string; birthDate?: string; detail?: string };
type Status = { type: 'idle' | 'loading' | 'success' | 'error'; message: string };

const governorates = ['شمال غزة', 'غزة', 'الوسطى', 'خانيونس', 'رفح'];
const housingStatuses = ['لا يوجد ضرر صالح للسكن', 'ضرر جزئي صالح للسكن', 'ضرر كلي غير صالح للسكن'];
const housingTypes = ['ملك', 'إيجار', 'مركز إيواء', 'استضافة عند الأقارب', 'خيمة'];

const emptyPerson = (): Person => ({ name: '', nationalId: '', birthDate: '', detail: '' });

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-[#17364c]">
        {label} {required && <span className="text-red-600">*</span>}
      </span>
      {children}
    </label>
  );
}

function Repeater({
  title,
  items,
  setItems,
  max,
  detailLabel,
  includeIdentity = false,
  includeBirthDate = false,
}: {
  title: string;
  items: Person[];
  setItems: (items: Person[]) => void;
  max: number;
  detailLabel?: string;
  includeIdentity?: boolean;
  includeBirthDate?: boolean;
}) {
  const update = (index: number, key: keyof Person, value: string) => {
    const next = [...items];
    next[index] = { ...next[index], [key]: value };
    setItems(next);
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="rounded-xl border border-[#dce7e9] bg-[#f9fbfb] p-4">
          <div className="mb-4 flex items-center justify-between">
            <h4 className="font-bold text-[#00466f]">{title} {index + 1}</h4>
            {items.length > 1 && (
              <button type="button" onClick={() => setItems(items.filter((_, i) => i !== index))} className="text-sm font-semibold text-red-600">
                حذف
              </button>
            )}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="الاسم الرباعي" required>
              <input value={item.name} onChange={(e) => update(index, 'name', e.target.value)} required className="form-input" maxLength={120} />
            </Field>
            {includeIdentity && (
              <Field label="رقم الهوية" required>
                <input value={item.nationalId} onChange={(e) => update(index, 'nationalId', e.target.value.replace(/\D/g, '').slice(0, 9))} required inputMode="numeric" pattern="[0-9]{9}" className="form-input" />
              </Field>
            )}
            {includeBirthDate && (
              <Field label="تاريخ الميلاد" required>
                <input type="date" value={item.birthDate} onChange={(e) => update(index, 'birthDate', e.target.value)} required className="form-input" />
              </Field>
            )}
            {detailLabel && (
              <Field label={detailLabel} required>
                <input value={item.detail} onChange={(e) => update(index, 'detail', e.target.value)} required className="form-input" maxLength={160} />
              </Field>
            )}
          </div>
        </div>
      ))}
      {items.length < max && (
        <button type="button" onClick={() => setItems([...items, emptyPerson()])} className="rounded-lg border border-[#51c698] px-4 py-2 text-sm font-bold text-[#318c6a] hover:bg-[#effaf6]">
          + إضافة
        </button>
      )}
    </div>
  );
}

export default function AssistanceRegistrationForm() {
  const startedAt = useRef(0);
  const [maritalStatus, setMaritalStatus] = useState('');
  const [housingStatus, setHousingStatus] = useState('');
  const [hasChronic, setHasChronic] = useState('لا');
  const [hasDisability, setHasDisability] = useState('لا');
  const [hasWarInjury, setHasWarInjury] = useState('لا');
  const [wives, setWives] = useState<Person[]>([emptyPerson()]);
  const [children, setChildren] = useState<Person[]>([emptyPerson()]);
  const [chronicPatients, setChronicPatients] = useState<Person[]>([emptyPerson()]);
  const [peopleWithDisabilities, setPeopleWithDisabilities] = useState<Person[]>([emptyPerson()]);
  const [warInjured, setWarInjured] = useState<Person[]>([emptyPerson()]);
  const [status, setStatus] = useState<Status>({ type: 'idle', message: '' });

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    setStatus({ type: 'loading', message: 'جارٍ إرسال الطلب...' });
    const fields = Object.fromEntries(new FormData(form).entries());
    const payload = {
      ...fields,
      startedAt: startedAt.current,
      wives: maritalStatus === 'متزوج' ? wives : [],
      children: children.filter((person) => person.name.trim()),
      chronicPatients: hasChronic === 'نعم' ? chronicPatients : [],
      peopleWithDisabilities: hasDisability === 'نعم' ? peopleWithDisabilities : [],
      warInjured: hasWarInjury === 'نعم' ? warInjured : [],
    };

    try {
      const response = await fetch('/api/assistance-applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(result.message || 'تعذر إرسال الطلب.');
      setStatus({ type: 'success', message: result.message || 'تم تسجيل الطلب بنجاح.' });
      form.reset();
      setMaritalStatus('');
      setHousingStatus('');
      setHasChronic('لا');
      setHasDisability('لا');
      setHasWarInjury('لا');
      setWives([emptyPerson()]);
      setChildren([emptyPerson()]);
      setChronicPatients([emptyPerson()]);
      setPeopleWithDisabilities([emptyPerson()]);
      setWarInjured([emptyPerson()]);
      startedAt.current = 0;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      setStatus({ type: 'error', message: error instanceof Error ? error.message : 'تعذر إرسال الطلب.' });
    }
  }

  const yesNo = (name: string, value: string, setValue: (value: string) => void) => (
    <div className="flex gap-5">
      {['نعم', 'لا'].map((option) => (
        <label key={option} className="flex cursor-pointer items-center gap-2 text-sm">
          <input type="radio" name={name} value={option} checked={value === option} onChange={() => setValue(option)} required className="accent-[#51c698]" />
          {option}
        </label>
      ))}
    </div>
  );

  return (
    <form onFocus={() => { if (!startedAt.current) startedAt.current = Date.now(); }} onSubmit={submit} className="space-y-7 rounded-2xl border border-[#e0e8eb] bg-white p-5 shadow-[0_12px_45px_rgba(0,63,102,0.08)] sm:p-8">
      {status.message && (
        <div role="status" className={`rounded-xl border p-4 text-sm font-semibold ${status.type === 'success' ? 'border-green-200 bg-green-50 text-green-800' : status.type === 'error' ? 'border-red-200 bg-red-50 text-red-800' : 'border-blue-200 bg-blue-50 text-blue-800'}`}>
          {status.message}
        </div>
      )}

      <div className="hidden" aria-hidden="true"><input name="website" tabIndex={-1} autoComplete="off" /></div>

      <section className="form-section">
        <h2 className="form-section-title">البيانات الأساسية لرب الأسرة</h2>
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="الاسم الرباعي" required><input name="fullName" required maxLength={120} autoComplete="name" className="form-input" placeholder="أدخل الاسم الرباعي" /></Field>
          <Field label="رقم الهوية" required><input name="nationalId" required inputMode="numeric" pattern="[0-9]{9}" maxLength={9} className="form-input" placeholder="9 أرقام" /></Field>
          <Field label="رقم الجوال" required><input name="primaryPhone" required inputMode="tel" pattern="[0-9+ -]{8,16}" maxLength={16} className="form-input" placeholder="رقم الجوال الأساسي" /></Field>
          <Field label="رقم جوال بديل"><input name="alternatePhone" inputMode="tel" pattern="[0-9+ -]{8,16}" maxLength={16} className="form-input" /></Field>
          <Field label="تاريخ الميلاد" required><input name="birthDate" type="date" required className="form-input" /></Field>
          <Field label="البريد الإلكتروني"><input name="email" type="email" maxLength={160} className="form-input" placeholder="example@email.com" /></Field>
        </div>
      </section>

      <section className="form-section">
        <h2 className="form-section-title">الحالة الاجتماعية وأفراد الأسرة</h2>
        <Field label="الحالة الاجتماعية" required>
          <select name="maritalStatus" value={maritalStatus} onChange={(e) => setMaritalStatus(e.target.value)} required className="form-input"><option value="">اختر الحالة</option><option>متزوج</option><option>مطلق</option><option>أرمل</option></select>
        </Field>
        {maritalStatus === 'متزوج' && <Repeater title="الزوجة" items={wives} setItems={setWives} max={4} includeIdentity includeBirthDate />}
        <div className="pt-2"><h3 className="mb-4 font-bold text-[#17364c]">الأبناء</h3><Repeater title="الابن/الابنة" items={children} setItems={setChildren} max={20} includeIdentity includeBirthDate /></div>
      </section>

      <section className="form-section">
        <h2 className="form-section-title">العنوان والسكن</h2>
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="المحافظة الأصلية" required><select name="governorate" required className="form-input"><option value="">اختر المحافظة</option>{governorates.map((item) => <option key={item}>{item}</option>)}</select></Field>
          <Field label="العنوان الأصلي" required><input name="originalAddress" required maxLength={240} className="form-input" /></Field>
          <Field label="مكان الإقامة الحالي" required><select name="currentGovernorate" required className="form-input"><option value="">اختر المحافظة</option>{governorates.map((item) => <option key={item}>{item}</option>)}</select></Field>
          <Field label="عنوان الإقامة الحالي" required><input name="currentAddress" required maxLength={240} className="form-input" /></Field>
          <Field label="حالة السكن" required><select name="housingStatus" value={housingStatus} onChange={(e) => setHousingStatus(e.target.value)} required className="form-input"><option value="">اختر الحالة</option>{housingStatuses.map((item) => <option key={item}>{item}</option>)}</select></Field>
          {housingStatus === 'ضرر كلي غير صالح للسكن' && <Field label="نوع السكن الحالي" required><select name="housingType" required className="form-input"><option value="">اختر النوع</option>{housingTypes.map((item) => <option key={item}>{item}</option>)}</select></Field>}
        </div>
      </section>

      <section className="form-section">
        <h2 className="form-section-title">الحالة الصحية للأسرة</h2>
        <div className="space-y-6">
          <Field label="هل يوجد أفراد يعانون من أمراض مزمنة؟" required>{yesNo('hasChronic', hasChronic, setHasChronic)}</Field>
          {hasChronic === 'نعم' && <Repeater title="المريض" items={chronicPatients} setItems={setChronicPatients} max={10} detailLabel="نوع المرض" />}
          <Field label="هل يوجد أشخاص من ذوي الاحتياجات الخاصة؟" required>{yesNo('hasDisability', hasDisability, setHasDisability)}</Field>
          {hasDisability === 'نعم' && <Repeater title="الشخص" items={peopleWithDisabilities} setItems={setPeopleWithDisabilities} max={10} detailLabel="نوع الإعاقة أو الاحتياج" />}
          <Field label="هل يوجد مصابون نتيجة الحرب؟" required>{yesNo('hasWarInjury', hasWarInjury, setHasWarInjury)}</Field>
          {hasWarInjury === 'نعم' && <Repeater title="المصاب" items={warInjured} setItems={setWarInjured} max={10} detailLabel="نوع الإصابة" />}
        </div>
      </section>

      <label className="flex items-start gap-3 rounded-xl border border-[#dce7e9] bg-[#f7faf9] p-4 text-sm leading-7 text-[#405563]">
        <input name="consent" type="checkbox" value="yes" required className="mt-1.5 accent-[#51c698]" />
        <span>أقر بصحة البيانات المدخلة، وأوافق على استخدامها من جمعية التحالف للإغاثة والتنمية لدراسة الاحتياج والتواصل بخصوص برامج المساعدات.</span>
      </label>

      <button type="submit" disabled={status.type === 'loading'} className="min-h-14 w-full rounded-xl bg-[#51c698] px-6 py-3 text-base font-extrabold text-white transition hover:bg-[#45b287] disabled:cursor-wait disabled:opacity-60 sm:w-auto sm:min-w-48">
        {status.type === 'loading' ? 'جارٍ الإرسال...' : 'إرسال الطلب'}
      </button>
    </form>
  );
}

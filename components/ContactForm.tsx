'use client';

import { FormEvent, useRef, useState } from 'react';

type Status = { kind: 'idle' | 'loading' | 'success' | 'error'; message: string };

export default function ContactForm() {
  const startedAt = useRef(0);
  const [status, setStatus] = useState<Status>({ kind: 'idle', message: '' });

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    setStatus({ kind: 'loading', message: 'جارٍ إرسال رسالتك...' });
    const values = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...values, startedAt: startedAt.current }) });
      const result = await response.json() as { message?: string };
      if (!response.ok) throw new Error(result.message || 'تعذر إرسال الرسالة.');
      setStatus({ kind: 'success', message: result.message || 'تم إرسال رسالتك بنجاح.' });
      form.reset();
      startedAt.current = 0;
    } catch (error) {
      setStatus({ kind: 'error', message: error instanceof Error ? error.message : 'تعذر إرسال الرسالة.' });
    }
  }

  const inputClass = 'min-h-[54px] w-full border border-[#cfd8dd] bg-transparent px-5 text-right text-[12px] text-[#082b4b] outline-none transition placeholder:text-[#a0a0a0] focus:border-[#51c698] focus:ring-1 focus:ring-[#51c698]';
  return (
    <form onFocus={() => { if (!startedAt.current) startedAt.current = Date.now(); }} onSubmit={submit} className="space-y-3" aria-label="نموذج التواصل">
      <div className="hidden" aria-hidden="true"><input name="website" tabIndex={-1} autoComplete="off" /></div>
      <div className="grid gap-3 sm:grid-cols-2">
        <input name="name" required maxLength={120} autoComplete="name" placeholder="الاسم" aria-label="الاسم" className={inputClass} />
        <input name="email" type="email" required maxLength={160} autoComplete="email" placeholder="البريد الإلكتروني" aria-label="البريد الإلكتروني" className={inputClass} dir="rtl" />
      </div>
      <textarea name="details" required maxLength={180} placeholder="التفاصيل" aria-label="التفاصيل" className={`${inputClass} min-h-[195px] resize-y py-5`} />
      {status.message && <p role="status" className={`px-1 text-xs leading-6 ${status.kind === 'success' ? 'text-emerald-700' : status.kind === 'error' ? 'text-red-700' : 'text-[#00406d]'}`}>{status.message}</p>}
      <button type="submit" disabled={status.kind === 'loading'} className="min-h-[54px] w-full bg-[#082b4b] px-6 text-sm font-semibold text-white transition duration-300 hover:bg-[#51c698] disabled:cursor-wait disabled:opacity-60">{status.kind === 'loading' ? 'جارٍ الإرسال...' : 'إرسال'}</button>
    </form>
  );
}

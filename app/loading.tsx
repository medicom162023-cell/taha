export default function Loading() {
  return (
    <main className="min-h-[60vh] bg-[#f7faf9] px-5 py-20" aria-busy="true">
      <div role="status" className="mx-auto max-w-[1180px] text-center text-[#00406d]">
        <span aria-hidden="true" className="mx-auto mb-5 block h-9 w-9 rounded-full border-4 border-[#dceee7] border-t-[#45bd91] motion-safe:animate-spin" />
        <p className="text-lg font-semibold">جارٍ تحميل الصفحة…</p>
      </div>
    </main>
  );
}

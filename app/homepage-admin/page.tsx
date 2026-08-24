import HomepageAdmin from '@/components/HomepageAdmin';

export const metadata = { title: 'إدارة الصفحة الرئيسية' };
export const dynamic = 'force-dynamic';

export default function HomepageAdminPage() {
  return <main dir="rtl" className="min-h-screen bg-[#f4f7f8] px-4 py-10"><HomepageAdmin /></main>;
}

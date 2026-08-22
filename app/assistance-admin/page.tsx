import AssistanceAdmin from '@/components/AssistanceAdmin';

export const metadata = { title: 'إدارة طلبات المساعدات' };
export const dynamic = 'force-dynamic';

export default function AssistanceAdminPage() {
  return <main dir="rtl" className="min-h-screen bg-[#f4f7f8] px-4 py-12"><AssistanceAdmin /></main>;
}

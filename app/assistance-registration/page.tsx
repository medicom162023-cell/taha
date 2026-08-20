import type { Metadata } from 'next';
import AssistanceRegistrationForm from '@/components/AssistanceRegistrationForm';

export const metadata: Metadata = {
  title: 'التسجيل للمساعدات | جمعية التحالف للإغاثة والتنمية',
  description: 'استمارة تسجيل الأسرة للاستفادة من برامج المساعدات الإنسانية.',
};

export default function AssistanceRegistrationPage() {
  return (
    <main className="min-h-screen bg-[#f6f8f9] font-[Alexandria]">
      <section className="relative overflow-hidden bg-[#00466f] px-5 py-14 text-white sm:py-16">
        <div className="absolute inset-0 opacity-15 [background-image:radial-gradient(circle_at_20%_20%,#51c698_0,transparent_35%),radial-gradient(circle_at_85%_75%,#ffffff_0,transparent_30%)]" />
        <div className="relative mx-auto max-w-[1080px] text-center">
          <span className="mb-3 inline-block text-sm font-bold text-[#76dbb4]">التسجيل للمساعدات</span>
          <h1 className="text-3xl font-extrabold leading-relaxed sm:text-4xl">استمارة تسجيل الأسرة</h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-8 text-white/80 sm:text-base">
            يرجى إدخال بيانات الأسرة بدقة. تُستخدم المعلومات لدراسة الاحتياج ولا تعني التسجيلات تلقائيًا استحقاق المساعدة.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1080px] px-4 py-8 sm:px-6 sm:py-12">
        <AssistanceRegistrationForm />
      </section>
    </main>
  );
}

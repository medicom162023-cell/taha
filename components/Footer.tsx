import Image from 'next/image';
import Link from 'next/link';

const quickLinks = [
  { label: 'الرئيسية', href: '/' },
  { label: 'من نحن', href: '/about' },
  { label: 'المشاريع', href: '/projects' },
  { label: 'المركز الإعلامي', href: '/media' },
  { label: 'تواصل معنا', href: '/contact' },
];

export default function Footer() {
  return (
    <footer className="bg-[#003f66] font-[Alexandria] text-white">
      <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-10 px-5 py-14 md:grid-cols-3 md:px-8">
        <div>
          <div className="relative mb-5 h-14 w-[230px] rounded-md bg-white px-3 py-2">
            <Image
              src="/full-logo.svg"
              alt="جمعية التحالف للإغاثة والتنمية"
              fill
              className="object-contain object-right p-2"
            />
          </div>
          <p className="max-w-sm text-sm leading-7 text-white/75">
            مؤسسة إنسانية مستقلة تعمل على الاستجابة للاحتياجات العاجلة وبناء برامج تنموية مستدامة تحفظ كرامة الإنسان وتعزز قدرته على الصمود.
          </p>
        </div>

        <div>
          <h3 className="mb-5 text-lg font-bold">روابط سريعة</h3>
          <div className="grid grid-cols-2 gap-x-5 gap-y-3 text-sm text-white/75">
            {quickLinks.map((link) => (
              <Link key={link.href} href={link.href} className="transition hover:text-[#51c698]">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-5 text-lg font-bold">تواصل معنا</h3>
          <div className="space-y-3 text-sm leading-7 text-white/75">
            <p>قطاع غزة - فلسطين</p>
            <p>البريد الإلكتروني: info@aard.ps</p>
            <p>تابع أخبار الجمعية وبرامجها عبر قنواتنا الرسمية.</p>
          </div>
          <Link
            href="/donate"
            className="mt-5 inline-flex rounded-lg bg-[#51c698] px-6 py-2.5 text-sm font-bold text-white transition hover:bg-[#45b287]"
          >
            تبرع الآن
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1180px] flex-col gap-2 px-5 py-5 text-center text-xs text-white/60 md:flex-row md:items-center md:justify-between md:px-8 md:text-right">
          <span>© {new Date().getFullYear()} جمعية التحالف للإغاثة والتنمية. جميع الحقوق محفوظة.</span>
          <span>Althahaluf Association for Relief & Development</span>
        </div>
      </div>
    </footer>
  );
}

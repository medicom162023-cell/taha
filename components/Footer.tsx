import Image from 'next/image';
import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaXTwitter, FaYoutube } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';

const quickLinks = [
  { label: 'الرئيسية', href: '/' },
  { label: 'من نحن', href: '/about' },
  { label: 'المشاريع', href: '/projects' },
  { label: 'المركز الإعلامي', href: '/media' },
  { label: 'تواصل معنا', href: '/contact' },
];

const socialLinks = [
  { label: 'فيسبوك', href: 'https://www.facebook.com/profile.php?id=100067786261535', icon: FaFacebookF },
  { label: 'إنستغرام', href: 'https://www.instagram.com/aard.ps', icon: FaInstagram },
  { label: 'البريد الإلكتروني', href: 'mailto:info@aard.ps', icon: MdEmail },
  { label: 'منصة X', href: 'https://x.com/aardps', icon: FaXTwitter },
  { label: 'يوتيوب', href: 'https://www.youtube.com/', icon: FaYoutube },
];

export default function Footer() {
  return (
    <footer className="bg-[linear-gradient(100deg,#0d7b91_0%,#075878_40%,#003f66_100%)] font-[Alexandria] text-white">
      <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-10 px-5 py-12 sm:px-6 md:grid-cols-2 md:px-8 md:py-14 lg:grid-cols-[1.2fr_0.8fr_1fr] lg:gap-14">
        <div>
          <div className="relative mb-5 h-[72px] w-[154px]">
            <Image
              src="/white-mark-color-ar-en-h-plus.svg"
              alt="جمعية التحالف للإغاثة والتنمية"
              fill
              className="object-contain object-right"
            />
          </div>
          <p className="max-w-md text-sm leading-7 text-white/75">
            مؤسسة إنسانية مستقلة تعمل على الاستجابة للاحتياجات العاجلة وبناء برامج تنموية مستدامة تحفظ كرامة الإنسان وتعزز قدرته على الصمود.
          </p>
        </div>

        <div>
          <h3 className="mb-5 text-lg font-bold">روابط سريعة</h3>
          <div className="grid grid-cols-2 gap-x-5 gap-y-3 text-sm text-white/75 sm:max-w-sm md:grid-cols-1 lg:grid-cols-2">
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
            <a className="block transition hover:text-[#51c698]" href="mailto:info@aard.ps">
              info@aard.ps
            </a>
            <p>تابع أخبار الجمعية وبرامجها عبر قنواتنا الرسمية.</p>
          </div>
          <form
            action="mailto:info@aard.ps"
            method="get"
            className="mt-5 flex w-full max-w-sm overflow-hidden rounded-xl bg-white/10"
          >
            <input type="hidden" name="subject" value="اشتراك في النشرة البريدية" />
            <input
              type="email"
              name="body"
              required
              aria-label="البريد الإلكتروني للاشتراك"
              placeholder="أدخل إيميلك هنا للاشتراك"
              className="min-h-12 min-w-0 flex-1 bg-transparent px-4 text-sm text-white outline-none placeholder:text-white/45"
            />
            <button
              type="submit"
              className="min-h-12 shrink-0 bg-[#51c698] px-5 text-sm font-bold text-white transition hover:bg-[#45b287]"
            >
              اشتراك
            </button>
          </form>
        </div>
      </div>

      <div className="px-5 pb-8 sm:px-6 md:px-8">
        <div className="mx-auto flex max-w-[1090px] flex-col gap-5 rounded-2xl border border-white/5 bg-white/[0.06] px-6 py-5 text-center text-xs leading-6 text-white/60 md:flex-row md:items-center md:justify-between md:px-10 md:text-right">
          <span>© {new Date().getFullYear()} جمعية التحالف للإغاثة والتنمية. جميع الحقوق محفوظة.</span>
          <div className="flex items-center justify-center gap-5 text-white" dir="ltr" aria-label="قنوات التواصل الاجتماعي">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              const external = social.href.startsWith('http');
              return (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  title={social.label}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noreferrer' : undefined}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-lg transition hover:-translate-y-0.5 hover:bg-white/10 hover:text-[#51c698]"
                >
                  <Icon aria-hidden />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}

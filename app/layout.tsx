import './globals.css';
import Header from '@/components/Header';

export const metadata = {
  title: 'جمعية التحالف للإغاثة والتنمية',
  description: 'من أجل نصرة الإنسان وبناء المستقبل',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="font-[Alexandria] antialiased bg-white">
        <Header />
        {children}
      </body>
    </html>
  );
}

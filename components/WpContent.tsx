interface WpContentProps {
  html: string;
}

export default function WpContent({ html }: WpContentProps) {
  return (
    <div
      className="wp-content text-right text-[15px] leading-8 text-slate-600 md:text-base"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

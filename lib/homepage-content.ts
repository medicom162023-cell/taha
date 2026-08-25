export type HomepageContent = {
  hero: { slides: Array<{ image: string; badge: string; title: string; description: string }>; buttonLabel: string; buttonHref: string };
  about: { eyebrow: string; title: string; description: string; image: string; imageBadge: string; imageCaption: string; buttonLabel: string; buttonHref: string; stats: Array<{ number: string; label: string; icon: string }> };
  projects: { eyebrow: string; title: string; description: string; items: Array<{ title: string; category: string; description: string; image: string }>; buttonLabel: string; buttonHref: string };
  impact: { eyebrow: string; title: string; description: string; image: string; points: string[]; buttonLabel: string; buttonHref: string };
  donation: { badge: string; title: string; description: string; image: string; buttonLabel: string; buttonHref: string };
  news: { eyebrow: string; title: string; description: string };
  partners: { eyebrow: string; title: string; description: string; items: Array<{ name: string; logo: string }>; buttonLabel: string; buttonHref: string };
  assistance: { title: string; description: string; buttonLabel: string; buttonHref: string };
};

export type HomepageSection = keyof HomepageContent;

export const homepageSectionLabels: Record<HomepageSection, string> = {
  hero: 'الواجهة الرئيسية Hero', about: 'من نحن والأرقام', projects: 'المشاريع', impact: 'الأثر المجتمعي',
  donation: 'دعوة التبرع', news: 'الأخبار', partners: 'الشركاء', assistance: 'التسجيل للمساعدات',
};

export const defaultHomepageContent: HomepageContent = {
  hero: {
    slides: [
      { image: '/hero-bg.jpg', badge: 'استجابة إنسانية فاعلة اليوم .. وكرامة مستدامة الغد', title: 'من أجل نصرة الإنسان وبناء المستقبل', description: 'نعمل على تمكين المجتمعات الأكثر احتياجاً عبر تدخلات إنسانية وتنمية مستدامة ترتكز على الكرامة، والعدالة، والاستجابة الفاعلة للاحتياجات الحقيقية.' },
      { image: '/hero-bg2.jpg', badge: 'رعاية صحية وتكافل مجتمعي مستدام', title: 'شركاء في العطاء لصناعة الأمل', description: 'نبذل الجهود الحثيثة لتوفير الاحتياجات الأساسية ودعم الأسر المتعففة والفئات الهشة في مختلف المناطق.' },
      { image: '/about-img.jpg', badge: 'تنمية مجتمعية وتمكين مستدام', title: 'نصنع الأثر ونبني جسور المحبة', description: 'نسعى جاهدين لإحداث تغيير إيجابي ومستدام في حياة الأفراد، عبر مشاريع تنموية وإغاثية شاملة ومتكاملة.' },
    ], buttonLabel: 'تبرع وساهم معنا', buttonHref: '/donate',
  },
  about: {
    eyebrow: 'من نحن', title: 'إغاثة وتمكين وتنمية\nمن أجل أثر مستدام',
    description: 'جمعية التحالف للإغاثة والتنمية مؤسسة أهلية غير ربحية تعمل في مجالات الإغاثة والتنمية وتطوير السلوك الصحي في المجتمع، وتسعى إلى تحويل التحديات إلى فرص حقيقية تعزز كرامة الإنسان وتدعم قدرته على بناء مستقبل أفضل.',
    image: '/about-img.jpg', imageBadge: 'من قلب المجتمع', imageCaption: 'نصنع الأمل بخطوات مستدامة', buttonLabel: 'تعرف علينا أكثر', buttonHref: '/about',
    stats: [{ number: '+15000', label: 'مستفيد', icon: 'users' }, { number: '50', label: 'متطوع', icon: 'heart' }, { number: '+13', label: 'عاماً من العطاء', icon: 'star' }, { number: '20', label: 'جهة شريكة', icon: 'partners' }],
  },
  projects: {
    eyebrow: 'نشاطاتنا الميدانية', title: 'مشاريع إنسانية تصنع الأثر', description: 'نطوّر تدخلات تستجيب للاحتياجات الأكثر إلحاحاً وتربط الاستجابة الطارئة بفرص التعافي والتنمية المستدامة.',
    items: [
      { title: 'مشروع توزيع السلال الغذائية الطارئة', category: 'الأمن الغذائي', description: 'توفير الدعم الغذائي العاجل للعائلات الأكثر احتياجاً في مناطق النزوح والتخفيف من معاناتهم اليومية.', image: '/hero-bg.jpg' },
      { title: 'دعم وتأهيل القطاع الصحي والمستشفيات', category: 'القطاع الصحي', description: 'توريد الأدوية والمستهلكات الطبية الضرورية لضمان استمرار تقديم الرعاية الصحية للمرضى والجرحى.', image: '/hero-bg2.jpg' },
      { title: 'توفير المياه النظيفة ودعم المجتمعات', category: 'المياه والإصحاح', description: 'تدخلات ميدانية لتحسين الوصول إلى المياه الآمنة ودعم التجمعات السكانية الأكثر تضرراً.', image: '/project.webp' },
      { title: 'تعزيز قدرات المؤسسات والمجتمعات المحلية', category: 'التنمية المجتمعية', description: 'برامج تنموية تعزز قدرات المؤسسات المحلية وتدعم المبادرات المجتمعية الأكثر احتياجاً.', image: '/alliance-ghadaq-capacity.webp' },
    ], buttonLabel: 'عرض كافة المشاريع', buttonHref: '/projects',
  },
  impact: {
    eyebrow: 'الإغاثة والتنمية من أجل المجتمع', title: 'نعمل لدعم المجتمعات وتعزيز قدرتها على الصمود', image: '/project.webp',
    description: 'تلتزم جمعية التحالف للإغاثة والتنمية بتقديم استجابات إنسانية فعالة تسهم في التخفيف من آثار الأزمات الإنسانية وتعزيز قدرة المجتمعات على التعافي. ومن خلال برامج الإغاثة والتنمية، تعمل الجمعية على دعم الفئات الأكثر احتياجاً عبر تنفيذ مبادرات صحية وتوعوية وإنسانية تستهدف تحسين الظروف المعيشية وتعزيز الوعي المجتمعي.',
    points: ['الاستجابة للاحتياجات الإنسانية الطارئة', 'تعزيز الوعي الصحي والمجتمعي', 'دعم المبادرات التنموية المحلية'], buttonLabel: 'شاهد مشاريعنا', buttonHref: '/projects',
  },
  donation: { badge: 'عطاؤك يصل إلى من يحتاجه', title: 'تبرعك يصنع فرقاً حقيقياً', description: 'بدعمك نستطيع الاستجابة للاحتياجات الإنسانية وتقديم المساعدة للأسر الأكثر احتياجاً في قطاع غزة.', image: '/DonationBanner.webp', buttonLabel: 'تبرع الآن', buttonHref: '/donate' },
  news: { eyebrow: 'آخر المستجدات', title: 'أخبار الجمعية', description: 'تابع أحدث أنشطة الجمعية وبرامجها الإنسانية والتنموية في الميدان.' },
  partners: {
    eyebrow: 'شركاء النجاح', title: 'شركاؤنا في العطاء', description: 'نعتز بالشراكات التي توسّع أثر برامجنا الإنسانية والتنموية وتساعدنا على الوصول إلى الفئات الأكثر احتياجاً بكفاءة واستدامة.',
    items: [{ name: 'UNDP', logo: '/partners/undp.png' }, { name: 'البنك الإسلامي للتنمية', logo: '/partners/isdb.png' }, { name: 'Kuwait Fund', logo: '/partners/kuwait-fund.png' }, { name: 'BADEA', logo: '/partners/badea.png' }, { name: 'الصندوق العربي للإنماء الاقتصادي والاجتماعي', logo: '/partners/arab-fund.png' }, { name: 'البنك الإسلامي للتنمية', logo: '/partners/isdb.png' }],
    buttonLabel: 'كن شريكاً معنا', buttonHref: '/contact',
  },
  assistance: { title: 'التسجيل للمساعدات', description: 'استمارة تسجيل أسرة للاستفادة من المساعدات المقدمة من جمعية التحالف للإغاثة والتنمية', buttonLabel: 'سجل الآن', buttonHref: '/assistance-registration' },
};

export function isHomepageSection(value: string): value is HomepageSection {
  return Object.prototype.hasOwnProperty.call(defaultHomepageContent, value);
}

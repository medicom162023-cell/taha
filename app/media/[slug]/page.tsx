import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import WpContent from '@/components/WpContent';
import { buildRankMathMetadata, getRankMathSchemas, safeJsonLd } from '@/lib/seo';
import { getNewsBySlug, WORDPRESS_BASE_URL } from '@/lib/wordpress';

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getNewsBySlug(slug);

  if (!post) return {};

  const canonical = `${WORDPRESS_BASE_URL}/media/${encodeURIComponent(post.slug)}`;

  return buildRankMathMetadata(post.link, {
    title: `${post.title} | جمعية التحالف للإغاثة والتنمية`,
    description: post.excerpt || undefined,
    canonical,
    image: post.featured_image,
    type: 'article',
  });
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getNewsBySlug(slug);

  if (!post) notFound();

  const schemas = await getRankMathSchemas(post.link);

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={`rank-math-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(schema) }}
        />
      ))}

      <main className="bg-white font-[Alexandria]">
        <section className="bg-[#00406d] py-14 text-white md:py-20">
          <div className="mx-auto max-w-[980px] px-5 md:px-8">
            <span className="mb-3 block text-sm font-semibold text-[#51c698]">أخبار الجمعية</span>
            <h1 className="text-3xl font-extrabold leading-tight md:text-5xl">{post.title}</h1>
            <time className="mt-4 block text-sm text-white/70" dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('ar', { year: 'numeric', month: 'long', day: 'numeric' })}
            </time>
          </div>
        </section>

        <article className="py-12 md:py-16">
          <div className="mx-auto max-w-[900px] px-5 md:px-8">
            {post.featured_image ? (
              <img
                src={post.featured_image}
                alt={post.title}
                className="mb-10 max-h-[520px] w-full rounded-2xl object-cover"
              />
            ) : null}
            <WpContent html={post.content} />
          </div>
        </article>
      </main>
    </>
  );
}

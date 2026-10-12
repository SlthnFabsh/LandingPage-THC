import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import AboutHero from '@/components/About/AboutHero';
import NewsArticle from '@/components/News/NewsArticle';
import { getAboutContent } from '@/lib/content';
import { getNewsBySlug, getNewsSlugs, getRelatedNews } from '@/lib/news-content';
import { buildMetadata } from '@/lib/seo';
import { translate } from '@/lib/i18n';

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getNewsSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const news = await getNewsBySlug(slug);

  if (!news) return {};

  return buildMetadata({
    path: `/berita/${news.slug}`,
    titleId: news.titleId,
    titleEn: news.titleEn,
    descriptionId: news.summaryId,
    descriptionEn: news.summaryEn,
    publishedTime: news.date,
  });
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const news = await getNewsBySlug(slug);

  if (!news) {
    notFound();
  }

  const [related, { contact, socials }] = await Promise.all([
    getRelatedNews(news.slug, 3),
    getAboutContent(),
  ]);

  return (
    <>
      <Navbar />
      <main>
        <AboutHero
          category={translate('en', 'news.category')}
          breadcrumb={{ id: news.titleId, en: news.titleEn }}
          title={{ id: news.titleId, en: news.titleEn }}
          subtitle={{ id: news.summaryId, en: news.summaryEn }}
        />
        <NewsArticle news={news} related={related} />
      </main>
      <Footer contact={contact} socials={socials} />
      <BackToTop />
    </>
  );
}

import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import AboutHero from '@/components/About/AboutHero';
import NewsArchive from '@/components/News/NewsArchive';
import { getAboutContent } from '@/lib/content';
import { getAllNews } from '@/lib/news-content';
import { buildMetadata } from '@/lib/seo';
import { translate } from '@/lib/i18n';

export const revalidate = 60;

export const metadata: Metadata = buildMetadata({
  path: '/berita',
  titleId: translate('id', 'news.title'),
  titleEn: translate('en', 'news.title'),
  descriptionId: translate('id', 'news.desc'),
  descriptionEn: translate('en', 'news.desc'),
});

export default async function NewsPage() {
  const [items, { contact, socials }] = await Promise.all([
    getAllNews(),
    getAboutContent(),
  ]);

  return (
    <>
      <Navbar />
      <main>
        <AboutHero
          category={translate('en', 'news.category')}
          breadcrumb={{ id: translate('id', 'news.category'), en: translate('en', 'news.category') }}
          title={{ id: translate('id', 'news.title'), en: translate('en', 'news.title') }}
          subtitle={{ id: translate('id', 'news.desc'), en: translate('en', 'news.desc') }}
        />
        <NewsArchive items={items} />
      </main>
      <Footer contact={contact} socials={socials} />
      <BackToTop />
    </>
  );
}

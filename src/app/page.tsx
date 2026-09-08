import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import CompanySection from '@/components/CompanySection';
import NetworkMapSection from '@/components/NetworkMap/NetworkMapSection';
import Services from '@/components/Services';
import Marquee, { type MarqueeLogo } from '@/components/Marquee';
import NewsSection from '@/components/NewsSection';
import FAQSection from '@/components/FAQSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import { prisma } from '@/lib/prisma';
import { newsFallback } from '@/lib/news-data';

export const dynamic = 'force-dynamic';

const pelangganLogos: MarqueeLogo[] = [
  { file: '/assets/images/pelanggan/logo-1.svg', alt: 'Matahari' },
  { file: '/assets/images/pelanggan/logo-2.svg', alt: 'Suppercorridor' },
  { file: '/assets/images/pelanggan/logo-3.svg', alt: 'Surge' },
  { file: '/assets/images/pelanggan/logo-4.svg', alt: 'Telkom Indonesia' },
  { file: '/assets/images/pelanggan/logo-5.svg', alt: 'TM' },
  { file: '/assets/images/pelanggan/logo-6.svg', alt: 'Velo' },
  { file: '/assets/images/pelanggan/logo-7.svg', alt: 'Viberlink' },
  { file: '/assets/images/pelanggan/logo-8.svg', alt: 'WGS' },
  { file: '/assets/images/pelanggan/logo-9.svg', alt: 'Zenlayer' },
  { file: '/assets/images/pelanggan/logo-10.svg', alt: 'Alfamart' },
];

const mitraLogos: MarqueeLogo[] = [
  { file: '/assets/images/mitra/logo-1.svg', alt: 'Matahari' },
  { file: '/assets/images/mitra/logo-2.svg', alt: 'Suppercorridor' },
  { file: '/assets/images/mitra/logo-3.svg', alt: 'Surge' },
  { file: '/assets/images/mitra/logo-4.svg', alt: 'Telkom Indonesia' },
  { file: '/assets/images/mitra/logo-5.svg', alt: 'TM' },
  { file: '/assets/images/mitra/logo-6.svg', alt: 'Velo' },
  { file: '/assets/images/mitra/logo-7.svg', alt: 'Viberlink' },
  { file: '/assets/images/mitra/logo-8.svg', alt: 'WGS' },
  { file: '/assets/images/mitra/logo-9.svg', alt: 'Gramedia' },
  { file: '/assets/images/mitra/logo-10.svg', alt: 'Indomaret' },
];

async function getNews() {
  try {
    const news = await prisma.newsPost.findMany({
      where: { published: true },
      orderBy: { date: 'desc' },
      take: 12,
    });

    if (news.length === 0) return newsFallback;

    return news.map((n, i) => ({
      id: n.id,
      titleId: n.titleId,
      titleEn: n.titleEn,
      summaryId: n.summaryId,
      summaryEn: n.summaryEn,
      contentId: n.contentId,
      contentEn: n.contentEn,
      coverImage: n.coverImage,
      date: n.date.toISOString(),
      slug: n.slug,
      anim: `fade-up delay-${(i + 1) * 100}`,
    }));
  } catch {
    return newsFallback;
  }
}

export default async function Home() {
  const newsItems = await getNews();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <CompanySection />
        <NetworkMapSection />
        <Services />
        <Marquee
          titleKey="clients.title"
          descKey="clients.desc"
          direction="left"
          logos={pelangganLogos}
        />
        <Marquee
          titleKey="partners.title"
          descKey="partners.desc"
          direction="right"
          logos={mitraLogos}
          inverseCards
        />
        <NewsSection items={newsItems} />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
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
import { getSiteContent } from '@/lib/content';

export const dynamic = 'force-dynamic';

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
  const [newsItems, content] = await Promise.all([getNews(), getSiteContent()]);

  const customers: MarqueeLogo[] = content.customers.map((c) => ({ file: c.image, alt: c.name }));
  const partners: MarqueeLogo[] = content.partners.map((p) => ({ file: p.image, alt: p.name }));

  return (
    <>
      <Navbar />
      <main>
        <Hero slides={content.heroSlides} />
        <CompanySection company={content.company} stats={content.stats} />
        <NetworkMapSection />
        <Services services={content.services} />
        <Marquee
          titleKey="clients.title"
          descKey="clients.desc"
          direction="left"
          logos={customers}
        />
        <Marquee
          titleKey="partners.title"
          descKey="partners.desc"
          direction="right"
          logos={partners}
          inverseCards
        />
        <NewsSection items={newsItems} />
        <FAQSection faqs={content.faqs} contactEmail={content.contact.email} />
        <CTASection />
      </main>
      <Footer contact={content.contact} socials={content.socials} />
      <BackToTop />
    </>
  );
}
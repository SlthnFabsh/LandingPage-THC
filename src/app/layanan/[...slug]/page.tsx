import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import AboutHero from '@/components/About/AboutHero';
import ServiceSidebar from '@/components/Services/ServiceSidebar';
import ServiceBlockList from '@/components/Services/blocks/ServiceBlockList';
import { legacyServiceComponents } from '@/components/Services/legacy-registry';
import { getAboutContent } from '@/lib/content';
import { getServicePageBySlug, getServicePageMeta, getServicePageSlugs, getServiceSidebarTree } from '@/lib/service-content';
import { legacyServiceHero } from '@/lib/service-seed-data';

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getServicePageSlugs();
  return slugs.map((slug) => ({ slug: slug.split('/') }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const path = slug.join('/');
  const meta = await getServicePageMeta(path);

  if (meta) {
    return { title: meta.title, description: meta.description };
  }

  const hero = legacyServiceHero[path];
  if (hero) {
    return { title: `${hero.title} | Trans Hybrid Communication`, description: hero.subtitle };
  }

  return {};
}

export default async function ServicePageRoute({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const path = slug.join('/');

  const [{ contact, socials }, sidebar] = await Promise.all([
    getAboutContent(),
    getServiceSidebarTree(),
  ]);

  const page = await getServicePageBySlug(path);

  const hero = page
    ? {
        category: page.heroCategory,
        breadcrumb: page.heroBreadcrumb,
        title: page.heroTitle,
        subtitle: page.heroSubtitle,
      }
    : legacyServiceHero[path];

  const Legacy = page ? null : legacyServiceComponents[path];

  if (!hero || (!page && !Legacy)) notFound();

  return (
    <>
      <Navbar />
      <main>
        <AboutHero
          category={hero.category}
          breadcrumb={hero.breadcrumb}
          title={hero.title}
          subtitle={hero.subtitle}
        />

        <section className="bg-slate-50/60 py-10 md:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
              {(page ? page.heroShowSidebar : true) && <ServiceSidebar items={sidebar} />}

              <div className="min-w-0 flex-1">
                {page ? (
                  <ServiceBlockList blocks={page.sections} />
                ) : (
                  Legacy && <Legacy />
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer contact={contact} socials={socials} />
      <BackToTop />
    </>
  );
}

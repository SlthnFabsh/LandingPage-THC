import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import AboutHero from '@/components/About/AboutHero';
import ServiceSidebar from '@/components/Services/ServiceSidebar';
import ServiceBlockList from '@/components/Services/blocks/ServiceBlockList';
import { getAboutContent } from '@/lib/content';
import { getServicePageBySlug, getServicePageMeta, getServicePageSlugs, getServiceSidebarTree } from '@/lib/service-content';

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

  return {};
}

export default async function ServicePageRoute({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const path = slug.join('/');

  const [{ contact, socials }, sidebar, page] = await Promise.all([
    getAboutContent(),
    getServiceSidebarTree(),
    getServicePageBySlug(path),
  ]);

  if (!page) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main>
        <AboutHero
          category={page.heroCategory}
          breadcrumb={page.heroBreadcrumb}
          title={page.heroTitle}
          subtitle={page.heroSubtitle ?? undefined}
        />

        <section className="bg-slate-50/60 py-10 md:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
              {page.heroShowSidebar && <ServiceSidebar items={sidebar} />}

              <div className="min-w-0 flex-1">
                <ServiceBlockList blocks={page.sections} />
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
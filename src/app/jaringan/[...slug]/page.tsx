import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import AboutHero from '@/components/About/AboutHero';
import NetworkSidebar from '@/components/Network/NetworkSidebar';
import ServiceBlockList from '@/components/Services/blocks/ServiceBlockList';
import { getAboutContent } from '@/lib/content';
import { getNetworkPageBySlug, getNetworkPageMeta, getNetworkPageSlugs, getNetworkSidebarTree } from '@/lib/network-content';

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getNetworkPageSlugs();
  return slugs.map((slug) => ({ slug: slug.split('/') }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = await getNetworkPageMeta(slug.join('/'));

  if (meta) {
    return { title: meta.title, description: meta.description };
  }

  return {};
}

export default async function NetworkPageRoute({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const path = slug.join('/');

  const [{ contact, socials }, sidebar] = await Promise.all([
    getAboutContent(),
    getNetworkSidebarTree(),
  ]);

  const page = await getNetworkPageBySlug(path);

  if (!page) notFound();

  return (
    <>
      <Navbar />
      <main>
        <AboutHero
          category={page.heroCategory}
          breadcrumb={page.heroBreadcrumb}
          title={page.heroTitle}
          subtitle={page.heroSubtitle}
        />

        <section className="bg-slate-50/60 py-10 md:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
              {page.heroShowSidebar && <NetworkSidebar items={sidebar} />}

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
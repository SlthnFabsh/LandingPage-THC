import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import AboutHero from '@/components/About/AboutHero';
import ServiceSidebar from '@/components/Services/ServiceSidebar';
import MetroEthernetDetail from '@/components/Services/MetroEthernetDetail';
import { getAboutContent } from '@/lib/content';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Local-Loop Metro Ethernet | Trans Hybrid Communication',
  description:
    'High-performance fiber optic local loop connecting corporate headquarters, branch offices, and data centers across major Indonesian metropolitan areas.',
};

export default async function MetroEthernetPage() {
  const { contact, socials } = await getAboutContent();

  return (
    <>
      <Navbar />
      <main>
        <AboutHero
          category="Services › Connectivity"
          breadcrumb="Metro Ethernet"
          title="Local-Loop Metro Ethernet (INNER & INTER CITY)"
          subtitle="High-performance fiber optic network linking headquarters, branches, and data centers with sub-millisecond local latency."
        />
        <section className="bg-slate-50/60 py-10 md:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
              <ServiceSidebar />
              <div className="min-w-0 flex-1">
                <MetroEthernetDetail />
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
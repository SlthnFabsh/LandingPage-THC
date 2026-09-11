import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import AboutHero from '@/components/About/AboutHero';
import ServiceSidebar from '@/components/Services/ServiceSidebar';
import DedicatedInternetDetail from '@/components/Services/DedicatedInternetDetail';
import { getAboutContent } from '@/lib/content';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Dedicated Internet | Trans Hybrid Communication',
  description:
    'Premium 1:1 symmetrical dedicated internet with 99.9% SLA, multi-tier upstream redundancy, and 24/7 NOC support by PT Trans Hybrid Communication.',
};

export default async function DedicatedInternetPage() {
  const { contact, socials } = await getAboutContent();

  return (
    <>
      <Navbar />
      <main>
        <AboutHero
          category="Services › Internet"
          breadcrumb="Dedicated Internet"
          title="Dedicated Internet"
          subtitle="Premium 1:1 symmetrical dedicated internet with enterprise-grade SLA and 24/7 certified NOC support."
        />
        <section className="bg-slate-50/60 py-10 md:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
              <ServiceSidebar />
              <div className="min-w-0 flex-1">
                <DedicatedInternetDetail />
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

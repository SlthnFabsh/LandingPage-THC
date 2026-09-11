import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import AboutHero from '@/components/About/AboutHero';
import ServiceSidebar from '@/components/Services/ServiceSidebar';
import IeplDetail from '@/components/Services/IeplDetail';
import { getAboutContent } from '@/lib/content';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'IEPL | Trans Hybrid Communication',
  description:
    'International Ethernet Private Line with carrier-grade Layer-2 ethernet, MPLS & Metro Ethernet backed, private point-to-point and multipoint connectivity.',
};

export default async function IeplPage() {
  const { contact, socials } = await getAboutContent();

  return (
    <>
      <Navbar />
      <main>
        <AboutHero
          category="Services › Connectivity"
          breadcrumb="IEPL"
          title="International Ethernet Private Line"
          subtitle="Carrier-grade Layer-2 ethernet private line with flexible scalable bandwidth and transparent network management."
        />
        <section className="bg-slate-50/60 py-10 md:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
              <ServiceSidebar />
              <div className="min-w-0 flex-1">
                <IeplDetail />
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
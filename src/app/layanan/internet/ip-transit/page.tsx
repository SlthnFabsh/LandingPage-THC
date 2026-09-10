import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import AboutHero from '@/components/About/AboutHero';
import ServiceSidebar from '@/components/Services/ServiceSidebar';
import IPTransitDetail from '@/components/Services/IPTransitDetail';
import { getAboutContent } from '@/lib/content';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'IP Transit (ASN 24534) | Trans Hybrid Communication',
  description:
    'Carrier-grade global and domestic BGP IP Transit services under ASN 24534 with 10G-100G upstream capacity, Equinix-IX peering, and 24/7 certified NOC support.',
};

export default async function IPTransitPage() {
  const { contact, socials } = await getAboutContent();

  return (
    <>
      <Navbar />
      <main>
        <AboutHero
          category="Services › Internet"
          breadcrumb="IP Transit"
          title="IP Transit (ASN 24534)"
          subtitle="Carrier-grade global and domestic BGP routing solution with multi-Tier-1 upstream redundancy, 10G-100G capacity, and 24/7 certified NOC support."
        />
        <section className="bg-slate-50/60 py-10 md:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
              <ServiceSidebar />
              <div className="min-w-0 flex-1">
                <IPTransitDetail />
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

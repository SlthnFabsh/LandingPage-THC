import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import AboutHero from '@/components/About/AboutHero';
import NetworkSidebar from '@/components/Network/NetworkSidebar';
import GlobalNetwork from '@/components/Network/GlobalNetwork';
import { getAboutContent } from '@/lib/content';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Global Network & Peering | Trans Hybrid Communication',
  description:
    'Global network topology of PT Trans Hybrid Communication: AS63516, AS24534, AS153068, Tier-1 upstreams, and international IXP interconnections.',
};

export default async function GlobalNetworkPage() {
  const { contact, socials } = await getAboutContent();

  return (
    <>
      <Navbar />
      <main>
        <AboutHero
          category="Network"
          breadcrumb="Global Network & Peering"
          title="Global Network & Peering"
          subtitle="Multi-ASN architecture with Tier-1 global transit providers, carrier-grade exchange peering, and over 1 Terabyte upstream capacity."
        />
        <section className="bg-slate-50/60 py-10 md:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
              <NetworkSidebar />
              <div className="min-w-0 flex-1">
                <GlobalNetwork />
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

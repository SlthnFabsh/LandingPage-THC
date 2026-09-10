import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import AboutHero from '@/components/About/AboutHero';
import NetworkSidebar from '@/components/Network/NetworkSidebar';
import HubPoP from '@/components/Network/HubPoP';
import { getAboutContent } from '@/lib/content';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Hub & Point of Presence (PoP) | Trans Hybrid Communication',
  description:
    'Hierarchical backbone topology of PT Trans Hybrid Communication across Java, Sumatera, Borneo, Sulawesi, and Malaysia backbones.',
};

export default async function HubPoPPage() {
  const { contact, socials } = await getAboutContent();

  return (
    <>
      <Navbar />
      <main>
        <AboutHero
          category="Network"
          breadcrumb="Hub & PoP Architecture"
          title="Hub & Point of Presence (PoP)"
          subtitle="Hierarchical domestic and cross-border backbone rings ensuring multi-homed carrier redundancy and high network availability."
        />
        <section className="bg-slate-50/60 py-10 md:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
              <NetworkSidebar />
              <div className="min-w-0 flex-1">
                <HubPoP />
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

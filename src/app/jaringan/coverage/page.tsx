import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import AboutHero from '@/components/About/AboutHero';
import NetworkSidebar from '@/components/Network/NetworkSidebar';
import NetworkCoverage from '@/components/Network/NetworkCoverage';
import { getAboutContent } from '@/lib/content';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Network Coverage Map | Trans Hybrid Communication',
  description:
    'Terrestrial and submarine fiber optic network coverage of PT Trans Hybrid Communication connecting Indonesia, Singapore, Malaysia, Brunei, and Hong Kong.',
};

export default async function NetworkCoveragePage() {
  const { contact, socials } = await getAboutContent();

  return (
    <>
      <Navbar />
      <main>
        <AboutHero
          category="Network"
          breadcrumb="Network Coverage"
          title="Network Coverage Map"
          subtitle="Comprehensive inland and submarine fiber optic routes interconnecting major cities in Indonesia and Southeast Asian digital hubs."
        />
        <section className="bg-slate-50/60 py-10 md:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
              <NetworkSidebar />
              <div className="min-w-0 flex-1">
                <NetworkCoverage />
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

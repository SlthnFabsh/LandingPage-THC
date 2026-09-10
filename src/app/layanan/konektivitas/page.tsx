import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import AboutHero from '@/components/About/AboutHero';
import ServiceSidebar from '@/components/Services/ServiceSidebar';
import ConnectivityServices from '@/components/Services/ConnectivityServices';
import { getAboutContent } from '@/lib/content';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Connectivity Services | Trans Hybrid Communication',
  description:
    'Carrier-grade enterprise connectivity: IPLC, IEPL Layer-2, Local-Loop Metro Ethernet, and Inter Data Center Backbone (IDCB).',
};

export default async function ConnectivityServicesPage() {
  const { contact, socials } = await getAboutContent();

  return (
    <>
      <Navbar />
      <main>
        <AboutHero
          category="Services"
          breadcrumb="Connectivity Services"
          title="Connectivity Services"
          subtitle="Comprehensive connectivity solutions including International Private Leased Circuit, IEPL, Metro Ethernet, and Inter Data Center Backbone."
        />
        <section className="bg-slate-50/60 py-10 md:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
              <ServiceSidebar />
              <div className="min-w-0 flex-1">
                <ConnectivityServices />
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

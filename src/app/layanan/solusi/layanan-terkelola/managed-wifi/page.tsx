import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import AboutHero from '@/components/About/AboutHero';
import ServiceSidebar from '@/components/Services/ServiceSidebar';
import ManagedWifiDetail from '@/components/Services/ManagedWifiDetail';
import { getAboutContent } from '@/lib/content';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Managed Wi-Fi & IT | Trans Hybrid Communication',
  description:
    'Cloud-managed enterprise Wi-Fi and proactive IT operations: seamless multi-SSID roaming, captive portal & RADIUS guest auth, and real-time RF channel optimization.',
};

export default async function ManagedWifiPage() {
  const { contact, socials } = await getAboutContent();

  return (
    <>
      <Navbar />
      <main>
        <AboutHero
          category="Services › Solutions › Managed Services"
          breadcrumb="Managed Wi-Fi & IT"
          title="Managed Wi-Fi & IT"
          subtitle="Comprehensive cloud-managed enterprise Wi-Fi and proactive IT operations with 24/7 NOC monitoring."
        />
        <section className="bg-slate-50/60 py-10 md:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
              <ServiceSidebar />
              <div className="min-w-0 flex-1">
                <ManagedWifiDetail />
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
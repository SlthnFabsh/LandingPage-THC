import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import AboutHero from '@/components/About/AboutHero';
import ServiceSidebar from '@/components/Services/ServiceSidebar';
import InternetServices from '@/components/Services/InternetServices';
import { getAboutContent } from '@/lib/content';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Internet Services | Trans Hybrid Communication',
  description:
    'Dedicated high-speed fiber optic internet, IP Transit with full BGP routing, and THC IX peering exchange services by PT Trans Hybrid Communication.',
};

export default async function InternetServicesPage() {
  const { contact, socials } = await getAboutContent();

  return (
    <>
      <Navbar />
      <main>
        <AboutHero
          category="Services"
          breadcrumb="Internet Services"
          title="Internet Services"
          subtitle="High-speed internet access utilizing advanced fiber optic infrastructure, exclusively allocated for enterprises without shared bandwidth."
        />
        <section className="bg-slate-50/60 py-10 md:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
              <ServiceSidebar />
              <div className="min-w-0 flex-1">
                <InternetServices />
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

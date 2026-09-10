import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import AboutHero from '@/components/About/AboutHero';
import ServiceSidebar from '@/components/Services/ServiceSidebar';
import DataCenterServices from '@/components/Services/DataCenterServices';
import { getAboutContent } from '@/lib/content';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Data Center Services | Trans Hybrid Communication',
  description:
    'Tier-3 high-security international data center colocation server racks and enterprise hybrid THC Cloud solutions.',
};

export default async function DataCenterServicesPage() {
  const { contact, socials } = await getAboutContent();

  return (
    <>
      <Navbar />
      <main>
        <AboutHero
          category="Services"
          breadcrumb="Data Center"
          title="Data Center Services"
          subtitle="International-scale Tier-3 data centers equipped with multi-layered physical and cyber security for enterprise mission-critical data workloads."
        />
        <section className="bg-slate-50/60 py-10 md:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
              <ServiceSidebar />
              <div className="min-w-0 flex-1">
                <DataCenterServices />
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

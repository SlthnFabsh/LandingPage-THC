import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import AboutHero from '@/components/About/AboutHero';
import ServiceSidebar from '@/components/Services/ServiceSidebar';
import ManagedServices from '@/components/Services/ManagedServices';
import { getAboutContent } from '@/lib/content';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Managed Services | Trans Hybrid Communication',
  description:
    'Proactive 24/7 Managed IT Services: Managed CPE hardware provisioning, Managed Wi-Fi operations, and enterprise network telemetry monitoring.',
};

export default async function ManagedServicesPage() {
  const { contact, socials } = await getAboutContent();

  return (
    <>
      <Navbar />
      <main>
        <AboutHero
          category="Services › Solutions"
          breadcrumb="Managed Services"
          title="Managed Services"
          subtitle="24/7 proactive network monitoring, Managed CPE lifecycle provisioning, and cloud-managed enterprise Wi-Fi backed by certified NOC engineers."
        />
        <section className="bg-slate-50/60 py-10 md:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
              <ServiceSidebar />
              <div className="min-w-0 flex-1">
                <ManagedServices />
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

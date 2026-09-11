import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import AboutHero from '@/components/About/AboutHero';
import ServiceSidebar from '@/components/Services/ServiceSidebar';
import IdcbDetail from '@/components/Services/IdcbDetail';
import { getAboutContent } from '@/lib/content';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Inter Data Center Backbone (IDCB) | Trans Hybrid Communication',
  description:
    'Mission-critical ultra-high-speed backbone interconnecting data centers for real-time resource sharing, geo-redundant replication, and dynamic load balancing.',
};

export default async function IdcbPage() {
  const { contact, socials } = await getAboutContent();

  return (
    <>
      <Navbar />
      <main>
        <AboutHero
          category="Services › Connectivity"
          breadcrumb="IDCB"
          title="Inter Data Center Backbone (IDCB)"
          subtitle="Ultra-low latency data center interconnect powered by DWDM technology for real-time resource sharing and geo-redundant replication."
        />
        <section className="bg-slate-50/60 py-10 md:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
              <ServiceSidebar />
              <div className="min-w-0 flex-1">
                <IdcbDetail />
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
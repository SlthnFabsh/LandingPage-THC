import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import AboutHero from '@/components/About/AboutHero';
import ServiceSidebar from '@/components/Services/ServiceSidebar';
import ManagedCpeDetail from '@/components/Services/ManagedCpeDetail';
import { getAboutContent } from '@/lib/content';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Managed CPE | Trans Hybrid Communication',
  description:
    'Enterprise-grade CPE lifecycle management: zero-touch provisioning, continuous firmware & security patching, and hardware replacement with SLA guarantees.',
};

export default async function ManagedCpePage() {
  const { contact, socials } = await getAboutContent();

  return (
    <>
      <Navbar />
      <main>
        <AboutHero
          category="Services › Solutions › Managed Services"
          breadcrumb="Managed CPE"
          title="Managed CPE (Customer Premises Equipment)"
          subtitle="End-to-end hardware lifecycle management for enterprise-grade routers, firewalls, and access points."
        />
        <section className="bg-slate-50/60 py-10 md:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
              <ServiceSidebar />
              <div className="min-w-0 flex-1">
                <ManagedCpeDetail />
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
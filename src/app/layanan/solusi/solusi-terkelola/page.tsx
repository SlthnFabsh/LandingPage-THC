import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import AboutHero from '@/components/About/AboutHero';
import ServiceSidebar from '@/components/Services/ServiceSidebar';
import ManagedSolutions from '@/components/Services/ManagedSolutions';
import { getAboutContent } from '@/lib/content';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Managed Solutions | Trans Hybrid Communication',
  description:
    'Tailored industry digital solutions: Hospitality smart room & IPTV infrastructure, and modern education campus Wi-Fi ecosystems.',
};

export default async function ManagedSolutionsPage() {
  const { contact, socials } = await getAboutContent();

  return (
    <>
      <Navbar />
      <main>
        <AboutHero
          category="Services › Solutions"
          breadcrumb="Managed Solutions"
          title="Managed Solutions"
          subtitle="Understanding dynamic industry needs with tailored digital solutions for Hospitality, Education, CCTV surveillance, and system integration."
        />
        <section className="bg-slate-50/60 py-10 md:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
              <ServiceSidebar />
              <div className="min-w-0 flex-1">
                <ManagedSolutions />
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

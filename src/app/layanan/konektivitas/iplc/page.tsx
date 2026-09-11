import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import AboutHero from '@/components/About/AboutHero';
import ServiceSidebar from '@/components/Services/ServiceSidebar';
import IplcDetail from '@/components/Services/IplcDetail';
import { getAboutContent } from '@/lib/content';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'IPLC | Trans Hybrid Communication',
  description:
    'International Private Leased Circuit with point-to-point DWDM dedicated bandwidth, Jakabare & Indigo submarine cable redundancy, and 100G capacity.',
};

export default async function IplcPage() {
  const { contact, socials } = await getAboutContent();

  return (
    <>
      <Navbar />
      <main>
        <AboutHero
          category="Services › Connectivity"
          breadcrumb="IPLC"
          title="International Private Leased Circuit"
          subtitle="Dedicated point-to-point DWDM private link with submarine cable redundancy across Jakabare & Indigo networks."
        />
        <section className="bg-slate-50/60 py-10 md:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
              <ServiceSidebar />
              <div className="min-w-0 flex-1">
                <IplcDetail />
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

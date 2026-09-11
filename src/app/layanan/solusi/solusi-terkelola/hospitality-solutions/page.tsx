import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import AboutHero from '@/components/About/AboutHero';
import ServiceSidebar from '@/components/Services/ServiceSidebar';
import HospitalitySolutions from '@/components/Services/HospitalitySolutions';
import { getAboutContent } from '@/lib/content';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Hospitality Solutions | Trans Hybrid Communication',
  description:
    'Tailored digital infrastructure for the hospitality sector: smart room IoT & IPTV control, high-density guest Wi-Fi, and automated booking system integration.',
};

export default async function HospitalitySolutionsPage() {
  const { contact, socials } = await getAboutContent();

  return (
    <>
      <Navbar />
      <main>
        <AboutHero
          category="Services › Solutions › Managed Solutions"
          breadcrumb="Hospitality Solutions"
          title="Hospitality Solutions"
          subtitle="Smart room IoT, IPTV, and high-density guest connectivity tailored for the modern hospitality sector."
        />
        <section className="bg-slate-50/60 py-10 md:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
              <ServiceSidebar />
              <div className="min-w-0 flex-1">
                <HospitalitySolutions />
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
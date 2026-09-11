import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import AboutHero from '@/components/About/AboutHero';
import ServiceSidebar from '@/components/Services/ServiceSidebar';
import ColocationServerDetail from '@/components/Services/ColocationServerDetail';
import { getAboutContent } from '@/lib/content';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Colocation Server | Trans Hybrid Communication',
  description:
    'Tier-3 secure colocation server rack space with flexible scaling, redundant power and cooling, multi-layered security, and cost efficiency.',
};

export default async function ColocationServerPage() {
  const { contact, socials } = await getAboutContent();

  return (
    <>
      <Navbar />
      <main>
        <AboutHero
          category="Services › Data Center"
          breadcrumb="Colocation Server"
          title="Colocation Server"
          subtitle="Secure Tier-3 colocation rack space with flexible scaling, redundant infrastructure, and guaranteed uptime."
        />
        <section className="bg-slate-50/60 py-10 md:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
              <ServiceSidebar />
              <div className="min-w-0 flex-1">
                <ColocationServerDetail />
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
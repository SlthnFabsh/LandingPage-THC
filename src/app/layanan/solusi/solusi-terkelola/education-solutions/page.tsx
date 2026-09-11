import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import AboutHero from '@/components/About/AboutHero';
import ServiceSidebar from '@/components/Services/ServiceSidebar';
import EducationSolutions from '@/components/Services/EducationSolutions';
import { getAboutContent } from '@/lib/content';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Education Solutions | Trans Hybrid Communication',
  description:
    'Advancing the education sector with high-speed internet and reliable Wi-Fi, integrated with school systems and devices through smart school applications.',
};

export default async function EducationSolutionsPage() {
  const { contact, socials } = await getAboutContent();

  return (
    <>
      <Navbar />
      <main>
        <AboutHero
          category="Services › Solutions › Managed Solutions"
          breadcrumb="Education Solutions"
          title="Education Solutions"
          subtitle="Advancing the education sector with high-speed internet, reliable Wi-Fi, and integrated smart school systems."
        />
        <section className="bg-slate-50/60 py-10 md:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
              <ServiceSidebar />
              <div className="min-w-0 flex-1">
                <EducationSolutions />
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
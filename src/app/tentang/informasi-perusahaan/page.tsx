import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import AboutHero from '@/components/About/AboutHero';
import AboutSidebar from '@/components/About/AboutSidebar';
import CompanyProfile from '@/components/About/CompanyProfile';
import Milestones from '@/components/About/Milestones';
import { getAboutContent } from '@/lib/content';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Informasi Perusahaan | Trans Hybrid Communication',
  description:
    'Profil PT Trans Hybrid Communication (THC): profil perusahaan, lisensi, visi, misi, dan perjalanan perusahaan sejak 2006.',
};

export default async function InformasiPerusahaanPage() {
  const { about, contact, socials } = await getAboutContent();

  return (
    <>
      <Navbar />
      <main>
        <AboutHero
          breadcrumb="Informasi Perusahaan"
          title="Informasi Perusahaan"
        />
        <section className="bg-slate-50/60 py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
              <AboutSidebar />
              <div className="min-w-0 flex-1">
                <CompanyProfile about={about} />
              </div>
            </div>
          </div>
        </section>
        <Milestones />
      </main>
      <Footer contact={contact} socials={socials} />
      <BackToTop />
    </>
  );
}
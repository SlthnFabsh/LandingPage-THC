import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import AboutHero from '@/components/About/AboutHero';
import AboutSidebar from '@/components/About/AboutSidebar';
import NilaiInti from '@/components/About/NilaiInti';
import { getAboutContent } from '@/lib/content';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Nilai Inti | Trans Hybrid Communication',
  description:
    'Nilai-nilai inti T.C.A.R.E. yang menjadi fondasi budaya perusahaan PT Trans Hybrid Communication: Trust, Customer Centricity, Agility, Result through Collaboration, Excellence through Innovation.',
};

export default async function NilaiIntiPage() {
  const { contact, socials } = await getAboutContent();

  return (
    <>
      <Navbar />
      <main>
        <AboutHero breadcrumb="Nilai Inti" title="Nilai Inti" />
        <section className="bg-slate-50/60 py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
              <AboutSidebar />
              <div className="min-w-0 flex-1">
                <NilaiInti />
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

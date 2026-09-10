import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import AboutHero from '@/components/About/AboutHero';
import AboutSidebar from '@/components/About/AboutSidebar';
import StrukturGrup from '@/components/About/StrukturGrup';
import { getSiteContent } from '@/lib/content';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Struktur Grup Perusahaan | Trans Hybrid Communication',
  description:
    'Struktur kepemilikan grup PT Trans Hybrid Communication beserta anak perusahaan: Dukodu Digital Solution dan THC Digital Solution.',
};

export default async function StrukturGrupPage() {
  const content = await getSiteContent();

  return (
    <>
      <Navbar />
      <main>
        <AboutHero
          breadcrumb="Struktur Grup Perusahaan"
          title="Struktur Grup Perusahaan"
        />
        <section className="bg-slate-50/60 py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
              <AboutSidebar />
              <div className="min-w-0 flex-1">
                <StrukturGrup />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer contact={content.contact} socials={content.socials} />
      <BackToTop />
    </>
  );
}

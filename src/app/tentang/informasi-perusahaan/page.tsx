import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import InformasiHero from '@/components/About/InformasiHero';
import CompanyProfile from '@/components/About/CompanyProfile';
import Milestones from '@/components/About/Milestones';
import { getSiteContent } from '@/lib/content';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Informasi Perusahaan | Trans Hybrid Communication',
  description:
    'Profil PT Trans Hybrid Communication (THC): profil perusahaan, lisensi, visi, misi, dan perjalanan perusahaan sejak 2006.',
};

export default async function InformasiPerusahaanPage() {
  const content = await getSiteContent();

  return (
    <>
      <Navbar />
      <main>
        <InformasiHero />
        <CompanyProfile about={content.about} />
        <Milestones />
      </main>
      <Footer contact={content.contact} socials={content.socials} />
      <BackToTop />
    </>
  );
}
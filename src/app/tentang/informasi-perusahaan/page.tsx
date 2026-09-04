import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import InformasiHero from '@/components/About/InformasiHero';
import CompanyProfile from '@/components/About/CompanyProfile';
import Milestones from '@/components/About/Milestones';

export const metadata: Metadata = {
  title: 'Informasi Perusahaan | Trans Hybrid Communication',
  description:
    'Profil PT Trans Hybrid Communication (THC): profil perusahaan, lisensi, visi, misi, dan perjalanan perusahaan sejak 2006.',
};

export default function InformasiPerusahaanPage() {
  return (
    <>
      <Navbar />
      <main>
        <InformasiHero />
        <CompanyProfile />
        <Milestones />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}

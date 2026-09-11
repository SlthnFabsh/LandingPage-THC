import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import AboutHero from '@/components/About/AboutHero';
import ServiceSidebar from '@/components/Services/ServiceSidebar';
import ThcCloudDetail from '@/components/Services/ThcCloudDetail';
import { getAboutContent } from '@/lib/content';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'THC Cloud | Trans Hybrid Communication',
  description:
    'Enterprise hybrid and private cloud infrastructure with NVMe distributed storage, automated disaster recovery, and dedicated VPC access controls.',
};

export default async function ThcCloudPage() {
  const { contact, socials } = await getAboutContent();

  return (
    <>
      <Navbar />
      <main>
        <AboutHero
          category="Services › Data Center"
          breadcrumb="THC Cloud"
          title="THC Cloud"
          subtitle="Enterprise hybrid and private cloud with the elasticity of public cloud and the security of private infrastructure."
        />
        <section className="bg-slate-50/60 py-10 md:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
              <ServiceSidebar />
              <div className="min-w-0 flex-1">
                <ThcCloudDetail />
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
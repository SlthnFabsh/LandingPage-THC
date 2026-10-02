import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { requireCms } from '@/lib/cms-auth';
import ServicePageForm from '@/components/cms/service/ServicePageForm';
import { createServicePage } from '@/app/cms/actions/service';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = { title: 'Tambah Halaman Layanan | THC CMS' };

export default async function ServicePageNewPage() {
  await requireCms();

  const menuItems = await prisma.serviceMenuItem.findMany({
    orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
    select: { slug: true, titleEn: true },
  });

  return (
    <ServicePageForm
      mode="create"
      action={createServicePage as never}
      menuOptions={menuItems.map((item) => ({ slug: item.slug, title: item.titleEn }))}
    />
  );
}

import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { requireCms } from '@/lib/cms-auth';
import ServiceForm from '@/components/cms/ServiceForm';
import { updateService } from '@/app/cms/actions/content';

export const dynamic = 'force-dynamic';

export default async function LayananEditPage({ params }: { params: Promise<{ id: string }> }) {
  await requireCms();
  const { id } = await params;
  const service = await prisma.serviceItem.findUnique({ where: { id } });
  if (!service) notFound();

  return <ServiceForm mode="edit" action={updateService as never} initial={service} />;
}
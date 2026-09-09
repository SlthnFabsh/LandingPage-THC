import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { requireCms } from '@/lib/cms-auth';
import LogoForm from '@/components/cms/LogoForm';
import { updateLogo } from '@/app/cms/actions/content';

export const dynamic = 'force-dynamic';

export default async function MitraEditPage({ params }: { params: Promise<{ id: string }> }) {
  await requireCms();
  const { id } = await params;
  const logo = await prisma.partnerLogo.findUnique({ where: { id } });
  if (!logo) notFound();

  const action = updateLogo.bind(null, 'PartnerLogo');
  return <LogoForm entityLabel="Mitra" mode="edit" action={action as never} initial={logo} />;
}
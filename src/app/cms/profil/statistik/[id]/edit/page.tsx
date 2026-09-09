import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { requireCms } from '@/lib/cms-auth';
import StatForm from '@/components/cms/StatForm';
import { updateStat } from '@/app/cms/actions/content';

export const dynamic = 'force-dynamic';

export default async function StatistikEditPage({ params }: { params: Promise<{ id: string }> }) {
  await requireCms();
  const { id } = await params;
  const stat = await prisma.companyStat.findUnique({ where: { id } });
  if (!stat) notFound();

  return <StatForm mode="edit" action={updateStat as never} initial={stat} />;
}
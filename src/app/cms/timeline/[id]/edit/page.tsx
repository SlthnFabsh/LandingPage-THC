import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { requireCms } from '@/lib/cms-auth';
import MilestoneForm from '@/components/cms/MilestoneForm';
import { updateMilestone, type AboutFormState } from '@/app/cms/actions/about';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Edit Timeline | THC CMS',
};

export default async function TimelineEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireCms();
  const { id } = await params;
  const milestone = await prisma.milestone.findUnique({ where: { id } });
  if (!milestone) notFound();

  return (
    <MilestoneForm
      mode="edit"
      action={updateMilestone as never}
      initial={{
        id: milestone.id,
        order: milestone.order,
        year: milestone.year,
        titleId: milestone.titleId ?? '',
        titleEn: milestone.titleEn,
        pointsId: (Array.isArray(milestone.pointsId) ? milestone.pointsId : []) as string[],
        pointsEn: (Array.isArray(milestone.pointsEn) ? milestone.pointsEn : []) as string[],
        active: milestone.active,
      }}
    />
  );
}

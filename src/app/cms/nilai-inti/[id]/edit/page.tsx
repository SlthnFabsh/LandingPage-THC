import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { requireCms } from '@/lib/cms-auth';
import CoreValueForm from '@/components/cms/CoreValueForm';
import { updateCoreValue } from '@/app/cms/actions/about';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Edit Nilai Inti | THC CMS',
};

export default async function CoreValueEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireCms();
  const { id } = await params;
  const value = await prisma.coreValue.findUnique({ where: { id } });
  if (!value) notFound();

  return (
    <CoreValueForm
      mode="edit"
      action={updateCoreValue as never}
      initial={{
        id: value.id,
        letter: value.letter,
        titleId: value.titleId ?? '',
        titleEn: value.titleEn,
        descriptionId: value.descriptionId ?? '',
        descriptionEn: value.descriptionEn ?? '',
        order: value.order,
        active: value.active,
      }}
    />
  );
}

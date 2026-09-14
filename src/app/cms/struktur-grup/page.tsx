import type { Metadata } from 'next';
import GroupStructureForm from '@/components/cms/GroupStructureForm';
import { upsertGroupStructure } from '@/app/cms/actions/about';
import { getGroupStructure } from '@/lib/about-content';
import { requireCms } from '@/lib/cms-auth';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Struktur Grup | THC CMS',
};

export default async function GroupStructurePage() {
  await requireCms();
  const structure = await getGroupStructure();

  return (
    <GroupStructureForm
      action={upsertGroupStructure}
      initial={{ ...structure, active: true }}
    />
  );
}
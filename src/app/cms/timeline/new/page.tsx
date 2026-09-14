import type { Metadata } from 'next';
import { requireCms } from '@/lib/cms-auth';
import MilestoneForm from '@/components/cms/MilestoneForm';
import { createMilestone } from '@/app/cms/actions/about';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Tambah Timeline | THC CMS',
};

export default async function MilestoneNewPage() {
  await requireCms();
  return <MilestoneForm mode="create" action={createMilestone as never} />;
}

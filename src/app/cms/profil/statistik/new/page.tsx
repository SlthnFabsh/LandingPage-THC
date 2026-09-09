import { requireCms } from '@/lib/cms-auth';
import StatForm from '@/components/cms/StatForm';
import { createStat } from '@/app/cms/actions/content';

export const dynamic = 'force-dynamic';

export default async function StatistikNewPage() {
  await requireCms();
  return <StatForm mode="create" action={createStat as never} />;
}
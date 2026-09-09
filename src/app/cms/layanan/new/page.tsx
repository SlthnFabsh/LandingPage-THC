import { requireCms } from '@/lib/cms-auth';
import ServiceForm from '@/components/cms/ServiceForm';
import { createService } from '@/app/cms/actions/content';

export const dynamic = 'force-dynamic';

export default async function LayananNewPage() {
  await requireCms();
  return <ServiceForm mode="create" action={createService as never} />;
}
import { requireCms } from '@/lib/cms-auth';
import FaqForm from '@/components/cms/FaqForm';
import { createFaq } from '@/app/cms/actions/content';

export const dynamic = 'force-dynamic';

export default async function FaqNewPage() {
  await requireCms();
  return <FaqForm mode="create" action={createFaq as never} />;
}
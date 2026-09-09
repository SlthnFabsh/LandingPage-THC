import { requireCms } from '@/lib/cms-auth';
import SocialForm from '@/components/cms/SocialForm';
import { createSocial } from '@/app/cms/actions/content';

export const dynamic = 'force-dynamic';

export default async function SosmedNewPage() {
  await requireCms();
  return <SocialForm mode="create" action={createSocial as never} />;
}
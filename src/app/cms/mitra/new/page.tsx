import { requireCms } from '@/lib/cms-auth';
import LogoForm from '@/components/cms/LogoForm';
import { createLogo } from '@/app/cms/actions/content';

export const dynamic = 'force-dynamic';

export default async function MitraNewPage() {
  await requireCms();
  const action = createLogo.bind(null, 'PartnerLogo');
  return <LogoForm entityLabel="Partner" mode="create" action={action as never} />;
}
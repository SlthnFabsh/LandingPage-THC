import { requireCms } from '@/lib/cms-auth';
import LogoForm from '@/components/cms/LogoForm';
import { createLogo } from '@/app/cms/actions/content';

export const dynamic = 'force-dynamic';

export default async function PelangganNewPage() {
  await requireCms();
  const action = createLogo.bind(null, 'CustomerLogo');
  return <LogoForm entityLabel="Pelanggan" mode="create" action={action as never} />;
}
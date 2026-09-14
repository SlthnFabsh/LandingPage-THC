import type { Metadata } from 'next';
import CoreValueForm from '@/components/cms/CoreValueForm';
import { createCoreValue } from '@/app/cms/actions/about';
import { requireCms } from '@/lib/cms-auth';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Tambah Nilai Inti | THC CMS',
};

export default async function CoreValueNewPage() {
  await requireCms();

  return <CoreValueForm mode="create" action={createCoreValue} />;}

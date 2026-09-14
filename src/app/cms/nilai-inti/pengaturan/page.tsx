import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CoreValueSettingForm from '@/components/cms/CoreValueSettingForm';
import { upsertCoreValueSetting } from '@/app/cms/actions/about';
import { getCoreValueSetting } from '@/lib/about-content';
import { requireCms } from '@/lib/cms-auth';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Pengaturan Nilai Inti | THC CMS',
};

export default async function CoreValueSettingPage() {
  await requireCms();
  const ini = await getCoreValueSetting();

  return <CoreValueSettingForm action={upsertCoreValueSetting} initial={ini} />;
}

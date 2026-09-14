import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import AboutPageForm from '@/components/cms/AboutPageForm';
import { upsertAboutPage } from '@/app/cms/actions/about';
import { requireCms } from '@/lib/cms-auth';
import { getAboutPage } from '@/lib/about-content';
import type { AboutPageKey } from '@/lib/about-content';

export const dynamic = 'force-dynamic';

const ABOUT_KEYS: AboutPageKey[] = ['informasi', 'struktur', 'nilai'];

export const metadata: Metadata = {
  title: 'Edit Hero About | THC CMS',
};

export default async function AboutHeroEditPage({
  params,
}: {
  params: Promise<{ key: string }>;
}) {
  const { passwordExpired } = await requireCms();
  const { key } = await params;

  if (!(ABOUT_KEYS as string[]).includes(key)) {
    notFound();
  }

  const k = key as AboutPageKey;
  const page = await getAboutPage(k);

  return (
    <AboutPageForm
      mode="edit"
      action={upsertAboutPage}
      initial={{
        key: k,
        titleEn: page.titleEn,
        titleId: page.titleId,
        subtitleEn: page.subtitleEn,
        subtitleId: page.subtitleId,
      }}
    />
  );
}

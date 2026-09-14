import type { Metadata } from 'next';
import type { AboutPageKey } from '@/lib/about-content';
import { requireCms } from '@/lib/cms-auth';
import {
  ListHeader,
  ListCard,
  Row,
  EmptyState,
  ActiveBadge,
  PasswordExpiredBanner,
} from '@/components/cms/ListShell';
import { getAboutPage } from '@/lib/about-content';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Hero About | THC CMS',
};

const PAGE_META: Record<AboutPageKey, { label: string; note: string }> = {
  informasi: { label: 'Informasi Perusahaan', note: 'Hero halaman Informasi Perusahaan' },
  struktur: { label: 'Struktur Grup', note: 'Hero halaman Struktur Grup' },
  nilai: { label: 'Nilai Inti', note: 'Hero halaman Nilai Inti' },
};

export default async function AboutHeroListPage() {
  const { passwordExpired } = await requireCms();
  const keys: AboutPageKey[] = ['informasi', 'struktur', 'nilai'];

  return (
    <div className="space-y-6">
      <ListHeader
        title="Hero Halaman About"
        subtitle="Judul dan subtitle hero untuk tiga halaman tentang."
        addHref={undefined}
        addLabel={undefined}
      />
      {passwordExpired && <PasswordExpiredBanner />}

      <ListCard>
        {keys.map((key) => (
          <Row key={key}>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-lg bg-brand-50 px-2 py-0.5 text-xs font-bold text-brand-700">
                  {key}
                </span>
                <h3 className="font-semibold text-slate-900">{PAGE_META[key].label}</h3>
              </div>
              <p className="mt-0.5 text-sm text-slate-500">{PAGE_META[key].note}</p>
            </div>
            <Link
              href={`/cms/about-hero/${key}/edit`}
              className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200"
            >
              Edit
            </Link>
          </Row>
        ))}
      </ListCard>
    </div>
  );
}

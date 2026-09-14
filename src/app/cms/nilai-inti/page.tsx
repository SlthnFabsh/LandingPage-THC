import type { Metadata } from 'next';
import Link from 'next/link';
import { Pencil } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { requireCms } from '@/lib/cms-auth';
import DeleteContentButton from '@/components/cms/DeleteContentButton';
import { deleteCoreValue } from '@/app/cms/actions/about';
import {
  ListHeader,
  ListCard,
  Row,
  EmptyState,
  ActiveBadge,
  PasswordExpiredBanner,
} from '@/components/cms/ListShell';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Nilai Inti | THC CMS',
};

export default async function CoreValueListPage() {
  const { passwordExpired } = await requireCms();
  const values = await prisma.coreValue.findMany({ orderBy: [{ order: 'asc' }, { createdAt: 'asc' }] });

  return (
    <div className="space-y-6">
      <ListHeader
        title="Nilai Inti (T.C.A.R.E.)"
        subtitle="Lima huruf nilai inti pada halaman Nilai Inti."
        addHref="/cms/nilai-inti/new"
        addLabel="Tambah Nilai Inti"
      />
      {passwordExpired && <PasswordExpiredBanner />}

      {values.length === 0 ? (
        <EmptyState message="Belum ada nilai inti. Klik Tambah Nilai Inti untuk mulai." />
      ) : (
        <ListCard>
          {values.map((v) => (
            <Row key={v.id}>
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-sm font-black text-brand-700">
                {v.letter}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold text-slate-900">{v.titleEn}</h3>
                  {v.titleId && <span className="text-sm text-slate-400">/ {v.titleId}</span>}
                </div>
                <p className="mt-0.5 line-clamp-1 text-sm text-slate-500">{v.descriptionEn}</p>
              </div>
              <ActiveBadge active={v.active} />
              <Link
                href={`/cms/nilai-inti/${v.id}/edit`}
                className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200"
              >
                Edit
              </Link>
              <DeleteContentButton
                action={deleteCoreValue}
                id={v.id}
                disabled={passwordExpired}
                confirmText="Hapus nilai inti ini?"
              />
            </Row>
          ))}
        </ListCard>
      )}
    </div>
  );
}

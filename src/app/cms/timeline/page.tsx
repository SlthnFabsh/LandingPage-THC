import Link from 'next/link';
import { Pencil } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { requireCms } from '@/lib/cms-auth';
import DeleteContentButton from '@/components/cms/DeleteContentButton';
import { deleteMilestone } from '@/app/cms/actions/about';
import {
  ListHeader,
  ListCard,
  Row,
  EmptyState,
  ActiveBadge,
  PasswordExpiredBanner,
} from '@/components/cms/ListShell';

export const dynamic = 'force-dynamic';

function toPoints(v: unknown): string[] {
  return Array.isArray(v) ? (v as string[]) : [];
}

export default async function TimelineListPage() {
  const { passwordExpired } = await requireCms();
  const milestones = await prisma.milestone.findMany({
    orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
  });

  return (
    <div className="space-y-6">
      <ListHeader
        title="Timeline Perusahaan"
        subtitle="Pencapaian penting per tahun pada halaman Informasi Perusahaan."
        addHref="/cms/timeline/new"
        addLabel="Tambah Timeline"
      />
      {passwordExpired && <PasswordExpiredBanner />}

      {milestones.length === 0 ? (
        <EmptyState message="Belum ada timeline. Klik Tambah Timeline untuk mulai." />
      ) : (
        <ListCard>
          {milestones.map((m) => (
            <Row key={m.id}>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-lg bg-brand-50 px-2 py-0.5 text-xs font-bold text-brand-700">
                    {m.year}
                  </span>
                  <h3 className="font-semibold text-slate-900">{m.titleEn}</h3>
                </div>
                {toPoints(m.pointsEn)[0] && (
                  <p className="mt-0.5 line-clamp-1 text-sm text-slate-500">
                    {toPoints(m.pointsEn)[0]}
                  </p>
                )}
              </div>
              <ActiveBadge active={m.active} />
              <Link
                href={`/cms/timeline/${m.id}/edit`}
                className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200"
              >
                Edit
              </Link>
              <DeleteContentButton action={deleteMilestone} id={m.id} disabled={passwordExpired} confirmText="Hapus timeline ini?" />
            </Row>
          ))}
        </ListCard>
      )}
    </div>
  );
}

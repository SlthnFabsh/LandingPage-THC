import Link from 'next/link';
import { Pencil } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { requireCms } from '@/lib/cms-auth';
import DeleteContentButton from '@/components/cms/DeleteContentButton';
import { deleteStat } from '@/app/cms/actions/content';
import { ListHeader, ListCard, Row, EmptyState, PasswordExpiredBanner } from '@/components/cms/ListShell';

export const dynamic = 'force-dynamic';

export default async function StatistikListPage() {
  const { passwordExpired } = await requireCms();
  const stats = await prisma.companyStat.findMany({ orderBy: { order: 'asc' } });

  return (
    <div className="space-y-6">
      <ListHeader
        title="Statistics"
        subtitle="Supporting numbers in the company profile section (e.g. 150+ clients)."
        addHref="/cms/profil/statistik/new"
        addLabel="Add Statistic"
      />
      {passwordExpired && <PasswordExpiredBanner />}
      {stats.length === 0 ? (
        <EmptyState message="No statistics yet. Add your first one." />
      ) : (
        <ListCard>
          {stats.map((stat) => (
            <Row key={stat.id}>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-slate-900">
                    {stat.value}
                    {stat.suffix}
                  </span>
                  <span className="text-xs text-slate-400">Order {stat.order}</span>
                </div>
                <p className="text-sm text-slate-600">{stat.labelEn}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Link
                  href={`/cms/profil/statistik/${stat.id}/edit`}
                  title="Edit"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
                >
                  <Pencil className="h-4 w-4" />
                </Link>
                <DeleteContentButton action={deleteStat} id={stat.id} disabled={passwordExpired} confirmText="Delete this statistic?" />
              </div>
            </Row>
          ))}
        </ListCard>
      )}
    </div>
  );
}
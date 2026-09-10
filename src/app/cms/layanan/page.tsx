import Link from 'next/link';
import { Pencil } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { requireCms } from '@/lib/cms-auth';
import DeleteContentButton from '@/components/cms/DeleteContentButton';
import { deleteService } from '@/app/cms/actions/content';
import { ListHeader, ListCard, Row, EmptyState, ActiveBadge, PasswordExpiredBanner } from '@/components/cms/ListShell';

export const dynamic = 'force-dynamic';

export default async function LayananListPage() {
  const { passwordExpired } = await requireCms();
  const services = await prisma.serviceItem.findMany({ orderBy: [{ order: 'asc' }, { createdAt: 'asc' }] });

  return (
    <div className="space-y-6">
      <ListHeader
        title="Services"
        subtitle="Service cards on the home page."
        addHref="/cms/layanan/new"
        addLabel="Add Service"
      />
      {passwordExpired && <PasswordExpiredBanner />}
      {services.length === 0 ? (
        <EmptyState message="No services yet. Add your first service." />
      ) : (
        <ListCard>
          {services.map((service) => (
            <Row key={service.id}>
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-2xl font-bold ${service.iconColor}`}
              >
                ·
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <Link
                    href={`/cms/layanan/${service.id}/edit`}
                    className="truncate text-sm font-semibold text-slate-900 hover:text-brand-600"
                  >
                    {service.titleEn}
                  </Link>
                  <ActiveBadge active={service.active} />
                </div>
                <p className="truncate text-xs text-slate-500">Icon {service.icon} · Order {service.order}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Link
                  href={`/cms/layanan/${service.id}/edit`}
                  title="Edit"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
                >
                  <Pencil className="h-4 w-4" />
                </Link>
                <DeleteContentButton action={deleteService} id={service.id} disabled={passwordExpired} confirmText="Delete this service?" />
              </div>
            </Row>
          ))}
        </ListCard>
      )}
    </div>
  );
}
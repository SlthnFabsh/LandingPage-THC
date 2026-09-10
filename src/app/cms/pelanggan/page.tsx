import Link from 'next/link';
import { Pencil } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { requireCms } from '@/lib/cms-auth';
import DeleteContentButton from '@/components/cms/DeleteContentButton';
import { deleteLogo } from '@/app/cms/actions/content';
import { ListHeader, ListCard, Row, EmptyState, ActiveBadge, PasswordExpiredBanner } from '@/components/cms/ListShell';

export const dynamic = 'force-dynamic';

export default async function PelangganListPage() {
  const { passwordExpired } = await requireCms();
  const logos = await prisma.customerLogo.findMany({ orderBy: [{ order: 'asc' }, { name: 'asc' }] });
  const deleteAction = deleteLogo.bind(null, 'CustomerLogo');

  return (
    <div className="space-y-6">
      <ListHeader
        title="Customers"
        subtitle="Customer logos in the scrolling row on the home page."
        addHref="/cms/pelanggan/new"
        addLabel="Add Customer"
      />
      {passwordExpired && <PasswordExpiredBanner />}
      {logos.length === 0 ? (
        <EmptyState message="No customers yet. Add your first customer logo." />
      ) : (
        <ListCard>
          {logos.map((logo) => (
            <Row key={logo.id}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logo.image} alt="" className="h-10 w-16 shrink-0 rounded-lg bg-slate-50 object-contain" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <Link
                    href={`/cms/pelanggan/${logo.id}/edit`}
                    className="truncate text-sm font-semibold text-slate-900 hover:text-brand-600"
                  >
                    {logo.name}
                  </Link>
                  <ActiveBadge active={logo.active} />
                </div>
                <p className="text-xs text-slate-500">Order {logo.order}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Link
                  href={`/cms/pelanggan/${logo.id}/edit`}
                  title="Edit"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
                >
                  <Pencil className="h-4 w-4" />
                </Link>
                <DeleteContentButton action={deleteAction} id={logo.id} disabled={passwordExpired} confirmText="Delete this customer?" />
              </div>
            </Row>
          ))}
        </ListCard>
      )}
    </div>
  );
}
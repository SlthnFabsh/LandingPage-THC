import Link from 'next/link';
import { Pencil } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { requireCms } from '@/lib/cms-auth';
import DeleteContentButton from '@/components/cms/DeleteContentButton';
import { deleteFaq } from '@/app/cms/actions/content';
import { ListHeader, ListCard, Row, EmptyState, ActiveBadge, PasswordExpiredBanner } from '@/components/cms/ListShell';

export const dynamic = 'force-dynamic';

export default async function FaqListPage() {
  const { passwordExpired } = await requireCms();
  const faqs = await prisma.faqEntry.findMany({ orderBy: [{ order: 'asc' }, { createdAt: 'asc' }] });

  return (
    <div className="space-y-6">
      <ListHeader
        title="FAQ"
        subtitle="Pertanyaan yang sering diajukan di halaman utama."
        addHref="/cms/faq/new"
        addLabel="Tambah FAQ"
      />
      {passwordExpired && <PasswordExpiredBanner />}
      {faqs.length === 0 ? (
        <EmptyState message="Belum ada FAQ. Tambahkan pertanyaan pertama." />
      ) : (
        <ListCard>
          {faqs.map((faq) => (
            <Row key={faq.id}>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <Link
                    href={`/cms/faq/${faq.id}/edit`}
                    className="truncate text-sm font-semibold text-slate-900 hover:text-brand-600"
                  >
                    {faq.questionId}
                  </Link>
                  <ActiveBadge active={faq.active} />
                </div>
                <p className="truncate text-xs text-slate-500">Urutan {faq.order}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Link
                  href={`/cms/faq/${faq.id}/edit`}
                  title="Edit"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
                >
                  <Pencil className="h-4 w-4" />
                </Link>
                <DeleteContentButton action={deleteFaq} id={faq.id} disabled={passwordExpired} confirmText="Hapus FAQ ini?" />
              </div>
            </Row>
          ))}
        </ListCard>
      )}
    </div>
  );
}
import Link from 'next/link';
import { Pencil, ExternalLink } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { requireCms } from '@/lib/cms-auth';
import DeleteContentButton from '@/components/cms/DeleteContentButton';
import { deleteServicePage } from '@/app/cms/actions/service';
import { serviceHref } from '@/lib/service-content';
import {
  ListHeader,
  ListCard,
  Row,
  EmptyState,
  ActiveBadge,
  PasswordExpiredBanner,
} from '@/components/cms/ListShell';

export const dynamic = 'force-dynamic';

export const metadata = { title: 'Halaman Layanan | THC CMS' };

const BLOCK_LABELS_SHORT: Record<string, string> = {
  INTRO: 'Teks',
  BADGES: 'Lencana',
  METRICS: 'Statistik',
  FEATURES: 'Fitur',
  CARDS: 'Kartu',
  TABS: 'Tab',
  TABLE: 'Tabel',
  PROCESS: 'Proses',
  IMAGE: 'Gambar',
  CTA: 'CTA',
};

export default async function ServicePagesIndexPage() {
  const { passwordExpired } = await requireCms();

  const pages = await prisma.servicePage.findMany({
    orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
    include: { sections: { select: { type: true }, orderBy: { order: 'asc' } } },
  });

  return (
    <div className="space-y-6">
      <ListHeader
        title="Halaman Layanan"
        subtitle="Konten seluruh halaman di /layanan beserta hero, SEO, dan blok isinya."
        addHref="/cms/layanan-halaman/new"
        addLabel="Tambah Halaman"
      />

      <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm shadow-sm">
        <span className="font-semibold text-slate-700">Menu navigasi</span>
        <span className="text-slate-500">Mengatur item Navbar &amp; Sidebar.</span>
        <Link
          href="/cms/layanan-halaman/menu"
          className="ml-auto rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200"
        >
          Kelola Menu
        </Link>
      </div>

      {passwordExpired && <PasswordExpiredBanner />}

      {pages.length === 0 ? (
        <EmptyState message="Belum ada halaman layanan. Klik Tambah Halaman untuk membuat." />
      ) : (
        <ListCard>
          {pages.map((page) => (
            <Row key={page.id}>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold text-slate-900">{page.heroTitle}</h3>
                  <span className="rounded-lg bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600">
                    {page.layout === 'CATEGORY' ? 'Kategori' : 'Detail'}
                  </span>
                </div>
                <p className="mt-0.5 font-mono text-xs text-slate-400">{page.slug}</p>
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {page.sections.map((section, index) => (
                    <span
                      key={index}
                      className="rounded-md bg-brand-50 px-1.5 py-0.5 text-[11px] font-semibold text-brand-700"
                    >
                      {BLOCK_LABELS_SHORT[section.type] ?? section.type}
                    </span>
                  ))}
                  {page.sections.length === 0 && (
                    <span className="text-[11px] text-slate-400">Belum ada blok</span>
                  )}
                </div>
              </div>
              <ActiveBadge active={page.active} />
              <a
                href={serviceHref(page.slug)}
                target="_blank"
                rel="noreferrer"
                title="Lihat di website"
                className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-slate-50"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
              <Link
                href={`/cms/layanan-halaman/${page.slug}`}
                className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200"
              >
                <Pencil className="h-3.5 w-3.5" />
                Edit
              </Link>
              <DeleteContentButton
                action={deleteServicePage}
                id={page.id}
                disabled={passwordExpired}
                confirmText={`Hapus halaman "${page.heroTitle}" beserta seluruh bloknya?`}
              />
            </Row>
          ))}
        </ListCard>
      )}
    </div>
  );
}

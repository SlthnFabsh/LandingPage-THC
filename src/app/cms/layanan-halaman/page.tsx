import Link from 'next/link';
import { FolderTree } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { requireCms } from '@/lib/cms-auth';
import { deleteServicePage } from '@/app/cms/actions/service';
import { buildServiceTree } from '@/lib/service-cms-tree';
import ServiceTreeNav from '@/components/cms/service/ServiceTreeNav';
import {
  ListHeader,
  EmptyState,
  PasswordExpiredBanner,
} from '@/components/cms/ListShell';

export const dynamic = 'force-dynamic';

export const metadata = { title: 'Halaman /layanan | THC CMS' };

const dateFormatter = new Intl.DateTimeFormat('id-ID', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  timeZone: 'Asia/Jakarta',
});

export default async function ServicePagesIndexPage() {
  const { passwordExpired } = await requireCms();

  const [menuRows, pages] = await Promise.all([
    prisma.serviceMenuItem.findMany({ orderBy: [{ order: 'asc' }, { createdAt: 'asc' }] }),
    prisma.servicePage.findMany({
      orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
      select: {
        id: true,
        slug: true,
        heroTitle: true,
        layout: true,
        active: true,
        updatedAt: true,
        sections: { select: { type: true }, orderBy: { order: 'asc' } },
      },
    }),
  ]);

  const { roots, orphans } = buildServiceTree(
    menuRows.map((row) => ({
      id: row.id,
      parentId: row.parentId,
      slug: row.slug,
      titleEn: row.titleEn,
      isGroup: row.isGroup,
      showInNavbar: row.showInNavbar,
      showInSidebar: row.showInSidebar,
      order: row.order,
      active: row.active,
    })),
    pages.map((page) => ({
      slug: page.slug,
      id: page.id,
      heroTitle: page.heroTitle,
      layout: page.layout,
      active: page.active,
      blockTypes: page.sections.map((section) => section.type),
      updatedLabel: dateFormatter.format(page.updatedAt),
    }))
  );

  return (
    <div className="space-y-6">
      <ListHeader
        title="Halaman /layanan"
        subtitle="Isi seluruh halaman di /layanan, dikelompokkan mengikuti menu website. Klik Edit untuk mengubah hero, SEO, dan blok konten."
        addHref="/cms/layanan-halaman/new"
        addLabel="Tambah Halaman"
      />

      {passwordExpired && <PasswordExpiredBanner />}

      <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm shadow-sm">
        <FolderTree className="h-5 w-5 text-slate-400" />
        <div>
          <p className="font-semibold text-slate-700">Struktur menu</p>
          <p className="text-slate-500">
            Mengatur group, urutan, dan anak-anaknya. Tampil di Navbar &amp; Sidebar website.
          </p>
        </div>
        <Link
          href="/cms/layanan-halaman/menu"
          className="ml-auto rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200"
        >
          Kelola Struktur Menu
        </Link>
      </div>

      {roots.length === 0 && orphans.length === 0 ? (
        <EmptyState message="Belum ada menu layanan. Mulai dari Kelola Struktur Menu, lalu buat halaman di bawahnya." />
      ) : (
        <ServiceTreeNav
          roots={roots}
          orphans={orphans}
          deleteAction={deleteServicePage}
          disabled={passwordExpired}
        />
      )}
    </div>
  );
}

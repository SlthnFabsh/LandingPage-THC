import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { requireCms } from '@/lib/cms-auth';
import ServicePageForm from '@/components/cms/service/ServicePageForm';
import { createServicePage } from '@/app/cms/actions/service';
import { buildServiceTree } from '@/lib/service-cms-tree';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = { title: 'Tambah Halaman Layanan | THC CMS' };

export default async function ServicePageNewPage({
  searchParams,
}: {
  searchParams: Promise<{ parent?: string }>;
}) {
  await requireCms();
  const { parent } = await searchParams;

  const menuRows = await prisma.serviceMenuItem.findMany({
    orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
  });

  const parentNode = parent
    ? buildServiceTree(
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
        []
      )
    : null;

  const parentTitle = parent
    ? (() => {
        let found: string | null = null;
        const walk = (nodes: ReturnType<typeof buildServiceTree>['roots']) => {
          nodes.forEach((node) => {
            if (node.slug === parent) found = node.title;
            walk(node.children);
          });
        };
        if (parentNode) walk(parentNode.roots);
        return found;
      })()
    : null;

  return (
    <div className="space-y-6">
      <Link
        href="/cms/layanan-halaman"
        className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Semua Halaman
      </Link>

      <ServicePageForm
        mode="create"
        action={createServicePage as never}
        menuOptions={menuRows.map((item) => ({ slug: item.slug, title: item.titleEn }))}
        defaultParentSlug={parent ?? ''}
        initial={parent ? { slug: `${parent}/` } : null}
        parentHint={
          parentTitle
            ? `Halaman baru akan menjadi anak dari "${parentTitle}" (/layanan/${parent}). Slug sudah diisi awal; ubah bagian setelah garis miring bila perlu.`
            : undefined
        }
      />
    </div>
  );
}

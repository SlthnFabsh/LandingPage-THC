import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Plus, Eye } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { requireCms } from '@/lib/cms-auth';
import { normalizeBlocks, BLOCK_LABELS, BLOCK_TYPES, type BlockType } from '@/lib/service-blocks';
import { isBlockTypeValue } from '@/lib/service-form';
import { serviceHref } from '@/lib/service-content';
import ServicePageForm from '@/components/cms/service/ServicePageForm';
import BlockEditor from '@/components/cms/service/BlockEditor';
import CreateBlockForm from '@/components/cms/service/CreateBlockForm';
import {
  updateServicePage,
  updateServiceSection,
  deleteServiceSection,
  moveServiceSection,
  createServiceSection,
} from '@/app/cms/actions/service';

export const dynamic = 'force-dynamic';

export const metadata = { title: 'Edit Halaman Layanan | THC CMS' };

export default async function ServicePageEditPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ tambah?: string }>;
}) {
  const { passwordExpired } = await requireCms();
  const { slug } = await params;
  const { tambah } = await searchParams;
  const path = slug.join('/');

  const page = await prisma.servicePage.findUnique({
    where: { slug: path },
    include: { sections: { orderBy: [{ order: 'asc' }, { createdAt: 'asc' }] } },
  });
  if (!page) notFound();

  const blocks = normalizeBlocks(
    page.sections.map((section) => ({ type: section.type, data: section.data }))
  );
  const blockById = new Map(page.sections.map((section) => [section.id, section]));

  const menuItems = await prisma.serviceMenuItem.findMany({
    orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
    select: { slug: true, titleEn: true },
  });

  const newType = tambah && isBlockTypeValue(tambah) ? (tambah as BlockType) : null;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <Link
          href="/cms/layanan-halaman"
          className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Semua Halaman
        </Link>
        <a
          href={serviceHref(page.slug)}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
        >
          <Eye className="h-3.5 w-3.5" />
          Lihat di website
        </a>
        <span className="font-mono text-xs text-slate-400">/layanan/{page.slug}</span>
      </div>

      <ServicePageForm
        mode="edit"
        action={updateServicePage as never}
        menuOptions={menuItems.map((item) => ({ slug: item.slug, title: item.titleEn }))}
        initial={{
          id: page.id,
          slug: page.slug,
          layout: page.layout === 'CATEGORY' ? 'CATEGORY' : 'DETAIL',
          heroCategory: page.heroCategory ?? '',
          heroBreadcrumb: page.heroBreadcrumb,
          heroTitle: page.heroTitle,
          heroSubtitle: page.heroSubtitle ?? '',
          heroShowSidebar: page.heroShowSidebar,
          metaTitle: page.metaTitle ?? '',
          metaDescription: page.metaDescription ?? '',
          order: page.order,
          active: page.active,
        }}
      />

      {/* Blok konten */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Blok Konten</h2>
            <p className="text-sm text-slate-500">
              Urutan blok mengikuti urutan di halaman website. Setiap blok disimpan terpisah.
            </p>
          </div>
          <Link
            href={`/cms/layanan-halaman/${page.slug}?tambah=INTRO`}
            className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
          >
            <Plus className="h-4 w-4" />
            Tambah Blok
          </Link>
        </div>

        {newType && (
          <CreateBlockForm
            pageId={page.id}
            type={newType}
            backHref={`/cms/layanan-halaman/${page.slug}`}
            action={createServiceSection}
          />
        )}

        {!newType && (
          <div className="flex flex-wrap gap-2 rounded-2xl border border-dashed border-slate-300 bg-white p-4">
            <span className="w-full text-xs font-semibold uppercase tracking-wider text-slate-500">
              Tambah langsung dengan tipe:
            </span>
            {BLOCK_TYPES.map((type) => (
              <Link
                key={type}
                href={`/cms/layanan-halaman/${page.slug}?tambah=${type}`}
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
              >
                {BLOCK_LABELS[type]}
              </Link>
            ))}
          </div>
        )}

        {blocks.length === 0 && (
          <p className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
            Belum ada blok. Tambahkan blok pertama untuk mengisi isi halaman.
          </p>
        )}

        {blocks.map((block, index) => {
          const section = blockById.get(page.sections[index]?.id ?? '');
          if (!section) return null;

          return (
            <BlockEditor
              key={section.id}
              section={{
                id: section.id,
                order: section.order,
                type: block.type,
                data: block.data,
                active: section.active,
              }}
              index={index}
              total={blocks.length}
              saveAction={updateServiceSection}
              deleteAction={deleteServiceSection}
              moveAction={moveServiceSection}
              disabled={passwordExpired}
            />
          );
        })}
      </div>
    </div>
  );
}

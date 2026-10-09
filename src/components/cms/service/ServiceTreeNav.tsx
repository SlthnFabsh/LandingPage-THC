'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ChevronRight,
  ExternalLink,
  FileStack,
  FolderTree,
  Pencil,
  Plus,
  TriangleAlert,
} from 'lucide-react';
import type { ServiceTreeNode, ServiceTreePageRow } from '@/lib/service-cms-tree';
import { countPages } from '@/lib/service-cms-tree';
import DeleteContentButton from '@/components/cms/DeleteContentButton';

type DeleteAction = (formData: FormData) => Promise<void> | void;

const ICON_BTN =
  'inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900';

export default function ServiceTreeNav({
  roots,
  orphans,
  deleteAction,
  disabled,
  cmsBase = '/cms/layanan-halaman',
  publicBase = '/layanan',
}: {
  roots: ServiceTreeNode[];
  orphans: ServiceTreePageRow[];
  deleteAction: DeleteAction;
  disabled?: boolean;
  cmsBase?: string;
  publicBase?: string;
}) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const slugs = useMemo(() => {
    const list: string[] = [];
    const walk = (nodes: ServiceTreeNode[]) =>
      nodes.forEach((node) => {
        list.push(node.slug);
        walk(node.children);
      });
    walk(roots);
    return list;
  }, [roots]);

  const currentSlug = useMemo(() => {
    if (!pathname?.startsWith(`${cmsBase}/`)) return null;
    const rest = pathname.slice(`${cmsBase}/`.length);
    if (!rest || rest.startsWith('new') || rest.startsWith('menu')) return null;
    return rest;
  }, [pathname, cmsBase]);

  const collapseAll = (value: boolean) =>
    setCollapsed(Object.fromEntries(slugs.map((slug) => [slug, value])));

  const renderNode = (node: ServiceTreeNode) => {
    const isOpen = !collapsed[node.slug];
    const isCurrent = currentSlug === node.slug;
    const indent = { paddingLeft: `${node.depth * 1.25 + 0.75}rem` };
    const pageCount = countPages(node);

    return (
      <li key={node.id} className="border-b border-slate-100 last:border-b-0">
        <div
          style={indent}
          className={`flex flex-wrap items-center gap-2 py-3 pr-4 transition-colors ${
            isCurrent ? 'bg-brand-50/70' : ''
          }`}
        >
          {node.children.length > 0 ? (
            <button
              type="button"
              onClick={() => setCollapsed((prev) => ({ ...prev, [node.slug]: isOpen }))}
              aria-label={isOpen ? 'Tutup bagian' : 'Buka bagian'}
              className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            >
              <ChevronRight className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
            </button>
          ) : (
            <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center text-slate-300">
              <span className="h-1.5 w-1.5 rounded-full bg-current" />
            </span>
          )}

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              {node.children.length > 0 ? (
                <FolderTree className="h-4 w-4 shrink-0 text-slate-400" />
              ) : (
                <FileStack className="h-4 w-4 shrink-0 text-slate-400" />
              )}
              <span
                className={`text-sm font-semibold ${
                  isCurrent ? 'text-brand-800' : 'text-slate-900'
                }`}
              >
                {node.title}
              </span>
              {node.isGroup && (
                <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[11px] font-semibold text-slate-600">
                  Group
                </span>
              )}
              {!node.hasPage && (
                <span className="rounded-md bg-amber-50 px-1.5 py-0.5 text-[11px] font-semibold text-amber-700">
                  Belum ada halaman
                </span>
              )}
              {node.hasPage && !node.pageActive && (
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-500">
                  Disembunyikan
                </span>
              )}
            </div>

            <p className="mt-0.5 font-mono text-xs text-slate-400">
              {publicBase}/{node.slug}
              {node.updatedLabel ? ` · diubah ${node.updatedLabel}` : ''}
            </p>

            {node.blockLabels.length > 0 && (
              <div className="mt-1.5 flex flex-wrap gap-1">
                {node.blockLabels.map((label) => (
                  <span
                    key={label}
                    className="rounded-md bg-brand-50 px-1.5 py-0.5 text-[11px] font-semibold text-brand-700"
                  >
                    {label}
                  </span>
                ))}
              </div>
            )}
          </div>

          {node.children.length > 0 && (
            <span className="shrink-0 text-xs font-semibold text-slate-400">
              {pageCount} halaman
            </span>
          )}

          <div className="flex shrink-0 items-center gap-2">
            <Link
              href={`${cmsBase}/new?parent=${encodeURIComponent(node.slug)}`}
              title="Tambah halaman anak di sini"
              className={ICON_BTN}
            >
              <Plus className="h-4 w-4" />
            </Link>

            {node.hasPage ? (
              <>
                <a
                  href={`${publicBase}/${node.slug}`}
                  target="_blank"
                  rel="noreferrer"
                  title="Lihat di website"
                  className={ICON_BTN}
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
                <Link
                  href={`${cmsBase}/${node.slug}`}
                  title="Edit halaman"
                  className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-slate-100 px-3 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-200"
                >
                  <Pencil className="h-3.5 w-3.5" />
                  Edit
                </Link>
                <DeleteContentButton
                  action={deleteAction}
                  id={node.pageId ?? node.id}
                  disabled={disabled}
                  confirmText={`Hapus halaman "${publicBase}/${node.slug}" beserta seluruh bloknya?`}
                />
              </>
            ) : (
              <Link
                href={`${cmsBase}/new?parent=${encodeURIComponent(node.slug)}`}
                className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-brand-600 px-3 text-xs font-semibold text-white transition-colors hover:bg-brand-700"
              >
                <Pencil className="h-3.5 w-3.5" />
                Buat
              </Link>
            )}
          </div>
        </div>

        {node.children.length > 0 && isOpen && (
          <ul className="border-t border-slate-100/80 bg-slate-50/40">{node.children.map(renderNode)}</ul>
        )}
      </li>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm">
        <p className="text-slate-500">
          Group bisa punya anak. Halaman dibuat di bawah group agar muncul juga di sidebar website.
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => collapseAll(false)}
            className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200"
          >
            Buka semua
          </button>
          <button
            type="button"
            onClick={() => collapseAll(true)}
            className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200"
          >
            Tutup semua
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <ul>{roots.map(renderNode)}</ul>
      </div>

      {orphans.length > 0 && (
        <div className="space-y-2 rounded-2xl border border-amber-200 bg-amber-50/60 p-4">
          <p className="flex items-center gap-2 text-sm font-semibold text-amber-800">
            <TriangleAlert className="h-4 w-4" />
            Halaman tanpa item menu ({orphans.length})
          </p>
          <p className="text-xs text-amber-700">
            Halaman di bawah tidak punya menu, jadi tidak muncul di navbar maupun sidebar. Tambahkan
            lewat &ldquo;Struktur Menu&rdquo;.
          </p>
          <ul className="space-y-1">
            {orphans.map((orphan) => (
              <li key={orphan.slug} className="flex flex-wrap items-center gap-2 text-sm">
                <Link
                  href={`${cmsBase}/${orphan.slug}`}
                  className="font-mono text-xs font-semibold text-brand-700 underline-offset-2 hover:underline"
                >
                  {publicBase}/{orphan.slug}
                </Link>
                <span className="text-xs text-slate-500">{orphan.heroTitle}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

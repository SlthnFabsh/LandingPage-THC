'use client';

import { useActionState, useState } from 'react';
import { ChevronDown, ChevronRight, Plus, Trash2, ArrowUp, ArrowDown, Save } from 'lucide-react';
import { inputCls } from '@/components/cms/ui';
import { serviceIconNames } from '@/lib/service-icons';
import type { ServiceFormState } from '@/app/cms/actions/service';

export interface MenuItemView {
  id: string;
  slug: string;
  parentSlug: string;
  titleId: string;
  titleEn: string;
  descEn: string;
  icon: string;
  isGroup: boolean;
  showInNavbar: boolean;
  showInSidebar: boolean;
  order: number;
  active: boolean;
  children: MenuItemView[];
}

type SaveAction = (state: ServiceFormState, formData: FormData) => Promise<ServiceFormState>;
type SimpleAction = (formData: FormData) => Promise<void> | void;

export interface MenuActions {
  create: SaveAction;
  update: SaveAction;
  remove: SimpleAction;
  move: SimpleAction;
}

function Checked({
  name,
  label,
  defaultChecked,
}: {
  name: string;
  label: string;
  defaultChecked: boolean;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-700">
      <input type="checkbox" name={name} defaultChecked={defaultChecked} className="h-4 w-4 accent-brand-600" />
      {label}
    </label>
  );
}

function IconSelect({ defaultValue }: { defaultValue: string }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-slate-700">Ikon</label>
      <select name="icon" defaultValue={defaultValue} className={inputCls}>
        {serviceIconNames.map((icon) => (
          <option key={icon} value={icon}>
            {icon}
          </option>
        ))}
      </select>
    </div>
  );
}

function MenuItemForm({
  item,
  depth,
  parentOptions,
  actions,
  disabled,
  collapsed,
  onToggle,
  children,
}: {
  item: MenuItemView;
  depth: number;
  parentOptions: { slug: string; title: string }[];
  actions: MenuActions;
  disabled: boolean;
  collapsed: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  const [state, formAction] = useActionState(actions.update, {} as ServiceFormState);

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50/70 px-3 py-2">
          {item.children.length > 0 ? (
            <button type="button" onClick={onToggle} className="text-slate-500">
              {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
          ) : (
            <span className="w-4" />
          )}
          <span className="text-sm font-semibold text-slate-800">{item.titleEn}</span>
          <span className="font-mono text-[11px] text-slate-400">{item.slug}</span>
          {item.isGroup && (
            <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-700">
              GROUP (tanpa URL)
            </span>
          )}
          {!item.active && (
            <span className="rounded bg-slate-200 px-1.5 py-0.5 text-[10px] font-bold text-slate-600">
              NONAKTIF
            </span>
          )}
          <span className="ml-auto text-[11px] text-slate-400">#{item.order}</span>
        </div>

        <form action={formAction} className="space-y-3 p-4">
          <input type="hidden" name="id" value={item.id} />

          {state?.error && (
            <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{state.error}</div>
          )}

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Judul (English)</label>
              <input name="titleEn" defaultValue={item.titleEn} required className={inputCls} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Judul (Indonesia)</label>
              <input name="titleId" defaultValue={item.titleId} className={inputCls} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Slug</label>
              <input name="slug" defaultValue={item.slug} required className={inputCls} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Induk</label>
              <select name="parentSlug" defaultValue={item.parentSlug} className={inputCls}>
                <option value="">Menu utama</option>
                {parentOptions.map((option) => (
                  <option key={option.slug} value={option.slug}>
                    {option.title} ({option.slug})
                  </option>
                ))}
              </select>
            </div>
            <IconSelect defaultValue={item.icon} />
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Urutan</label>
              <input name="order" type="number" defaultValue={item.order} className={inputCls} />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Keterangan (tampil di dropdown Navbar)
              </label>
              <input name="descEn" defaultValue={item.descEn} className={inputCls} />
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <Checked name="isGroup" label="Group (tanpa halaman & URL)" defaultChecked={item.isGroup} />
            <Checked name="showInNavbar" label="Tampil di Navbar" defaultChecked={item.showInNavbar} />
            <Checked name="showInSidebar" label="Tampil di Sidebar" defaultChecked={item.showInSidebar} />
            <Checked name="active" label="Aktif" defaultChecked={item.active} />
          </div>

          <div className="flex flex-wrap items-center gap-2 border-t border-slate-100 pt-3">
            <button
              type="submit"
              disabled={disabled}
              className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              Simpan
            </button>
            <button
              formAction={actions.move}
              name="direction"
              value="up"
              disabled={disabled}
              className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50 disabled:opacity-40"
              title="Naikkan urutan"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
            <button
              formAction={actions.move}
              name="direction"
              value="down"
              disabled={disabled}
              className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50 disabled:opacity-40"
              title="Turunkan urutan"
            >
              <ArrowDown className="h-4 w-4" />
            </button>
            <button
              formAction={actions.remove}
              disabled={disabled}
              onClick={(event) => {
                if (!confirm(`Hapus menu "${item.titleEn}"? Semua anak menu ikut terhapus.`)) {
                  event.preventDefault();
                }
              }}
              className="ml-auto rounded-lg border border-slate-200 p-2 text-red-600 hover:bg-red-50 disabled:opacity-40"
              title="Hapus menu"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </form>
      </div>

      {!collapsed && children}
    </>
  );
}

/**
 * Editor pohon menu. Setiap item punya form sendiri supaya admin bisa
 * menyimpan satu per satu tanpa takut menimpa edit lain.
 */
export default function MenuTreeEditor({
  tree,
  allOptions,
  actions,
  disabled,
}: {
  tree: MenuItemView[];
  allOptions: { slug: string; title: string }[];
  actions: MenuActions;
  disabled: boolean;
}) {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const [createState, createFormAction] = useActionState(actions.create, {} as ServiceFormState);

  const parentOptions = (excludeSlug: string) =>
    allOptions.filter(
      (option) => option.slug !== excludeSlug && !option.slug.startsWith(`${excludeSlug}/`)
    );

  const renderItem = (item: MenuItemView, depth: number) => (
    <div key={item.id} className={depth > 0 ? 'ml-4 mt-3' : ''}>
      <MenuItemForm
        item={item}
        depth={depth}
        parentOptions={parentOptions(item.slug)}
        actions={actions}
        disabled={disabled}
        collapsed={collapsed[item.id] === true}
        onToggle={() => setCollapsed({ ...collapsed, [item.id]: collapsed[item.id] !== true })}
      >
        {item.children.map((child) => renderItem(child, depth + 1))}
      </MenuItemForm>
    </div>
  );

  return (
    <div className="space-y-4">
      {tree.map((item) => renderItem(item, 0))}

      <details className="rounded-2xl border border-dashed border-brand-300 bg-brand-50/40 p-4">
        <summary className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-brand-700">
          <Plus className="h-4 w-4" />
          Tambah Item Menu
        </summary>

        <form
          action={createFormAction}
          className="mt-4 space-y-3"
        >
          <p className="text-sm font-semibold text-slate-800">Item Menu Baru</p>
          {createState?.error && (
            <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{createState.error}</div>
          )}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Judul (English)</label>
              <input name="titleEn" required className={inputCls} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Judul (Indonesia)</label>
              <input name="titleId" className={inputCls} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Slug</label>
              <input name="slug" required placeholder="internet/contoh" className={inputCls} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Induk</label>
              <select name="parentSlug" defaultValue="" className={inputCls}>
                <option value="">Menu utama</option>
                {allOptions.map((option) => (
                  <option key={option.slug} value={option.slug}>
                    {option.title} ({option.slug})
                  </option>
                ))}
              </select>
            </div>
            <IconSelect defaultValue="Layers" />
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Urutan</label>
              <input name="order" type="number" defaultValue={0} className={inputCls} />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium text-slate-700">Keterangan</label>
              <input name="descEn" className={inputCls} />
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <Checked name="isGroup" label="Group (tanpa URL)" defaultChecked={false} />
            <Checked name="showInNavbar" label="Tampil di Navbar" defaultChecked />
            <Checked name="showInSidebar" label="Tampil di Sidebar" defaultChecked />
            <Checked name="active" label="Aktif" defaultChecked />
          </div>

          <button
            type="submit"
            disabled={disabled}
            className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-50"
          >
            Simpan Item Menu
          </button>
        </form>
      </details>
    </div>
  );
}

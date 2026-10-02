'use client';

import { useState } from 'react';
import { Plus, Trash2, ChevronDown, ChevronRight } from 'lucide-react';
import { inputCls } from '@/components/cms/ui';
import { serviceIconNames } from '@/lib/service-icons';
import { BLOCK_LABELS, BLOCK_TYPES, type BlockData, type BlockType } from '@/lib/service-blocks';
import { fieldName } from '@/lib/service-form';
import ImagePathField from '@/components/cms/service/ImagePathField';

/**
 * Editor blok konten.
 *
 * Semua input uncontrolled Except daftar berulang (baris/kolom/tab) yang
 * memakai state lokal supaya admin bisa menambah/menghapus baris tanpa
 * menyentuh server. Nama input mengikuti path sederhana:
 *   <prefix>.items[0].title
 * yang dibaca kembali oleh `readFormTree()`.
 */

type Row = Record<string, string>;

interface FieldSpec {
  key: string;
  label: string;
  type?: 'text' | 'textarea' | 'icon' | 'select' | 'checkbox';
  rows?: number;
  placeholder?: string;
  options?: { value: string; label: string }[];
  hint?: string;
}

function Field({
  spec,
  name,
  value,
}: {
  spec: FieldSpec;
  name: string;
  value: string | undefined;
}) {
  if (spec.type === 'checkbox') {
    return (
      <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-700">
        <input
          type="checkbox"
          name={name}
          defaultChecked={value === 'true' || value === 'on'}
          className="h-4 w-4 accent-brand-600"
        />
        {spec.label}
      </label>
    );
  }

  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-slate-700">{spec.label}</label>
      {spec.type === 'textarea' ? (
        <textarea
          name={name}
          defaultValue={value ?? ''}
          rows={spec.rows ?? 3}
          placeholder={spec.placeholder}
          className={inputCls}
        />
      ) : spec.type === 'select' ? (
        <select name={name} defaultValue={value ?? spec.options?.[0]?.value} className={inputCls}>
          {spec.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : spec.type === 'icon' ? (
        <select name={name} defaultValue={value ?? 'Layers'} className={inputCls}>
          {serviceIconNames.map((icon) => (
            <option key={icon} value={icon}>
              {icon}
            </option>
          ))}
        </select>
      ) : (
        <input
          name={name}
          type="text"
          defaultValue={value ?? ''}
          placeholder={spec.placeholder}
          className={inputCls}
        />
      )}
      {spec.hint && <p className="mt-1 text-xs text-slate-400">{spec.hint}</p>}
    </div>
  );
}

function RepeatField({
  name,
  specs,
  rows,
  addLabel,
  emptyLabel,
}: {
  name: string;
  specs: FieldSpec[];
  rows: Row[];
  addLabel: string;
  emptyLabel: string;
}) {
  const blank = (): Row => {
    const row: Row = {};
    specs.forEach((spec) => {
      row[spec.key] =
        spec.type === 'checkbox'
          ? 'false'
          : spec.type === 'select'
            ? (spec.options?.[0]?.value ?? '')
            : spec.key === 'icon'
              ? 'Layers'
              : '';
    });
    return row;
  };

  const initial = rows.length > 0 ? rows : [blank()];
  const [items, setItems] = useState<{ uid: number; values: Row }[]>(() =>
    initial.map((values, index) => ({ uid: index, values }))
  );

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={item.uid} className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {index + 1}
            </span>
            <button
              type="button"
              onClick={() => setItems(items.filter((entry) => entry.uid !== item.uid))}
              className="rounded-lg border border-slate-200 p-1.5 text-red-600 hover:bg-red-50"
              title="Hapus baris"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {specs.map((spec) => (
              <Field
                key={spec.key}
                spec={spec}
                name={fieldName(name, index, spec.key)}
                value={item.values[spec.key]}
              />
            ))}
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() => setItems([...items, { uid: Date.now() + Math.random(), values: blank() }])}
        className="inline-flex items-center gap-2 rounded-lg border border-dashed border-brand-300 px-3 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50"
      >
        <Plus className="h-4 w-4" />
        {addLabel}
      </button>

      {items.length === 1 && rows.length === 0 && (
        <p className="text-xs text-slate-400">{emptyLabel}</p>
      )}
    </div>
  );
}

/** Baris plain (tipe data) dipakai RepeatField di atas. */
function toRows(value: unknown, keys: string[], listKeys: string[] = []): Row[] {
  if (!Array.isArray(value)) return [];
  return value.map((entry) => {
    const record = (entry ?? {}) as Record<string, unknown>;
    const row: Row = {};
    keys.forEach((key) => {
      row[key] = fieldToText(record[key], listKeys.includes(key));
    });
    return row;
  });
}

function fieldToText(raw: unknown, isList: boolean): string {
  if (typeof raw === 'boolean') return String(raw);
  if (typeof raw === 'string') return raw;
  if (raw === null || raw === undefined) return '';
  if (isList && Array.isArray(raw)) return raw.map((item) => String(item ?? '')).join('\n');
  return String(raw);
}

/** Nilai awal textarea daftar: satu butir per baris. */
function listToText(value: unknown): string {
  if (Array.isArray(value)) return value.map((item) => String(item ?? '')).join('\n');
  return typeof value === 'string' ? value : '';
}

/**
 * Daftar teks pendek (lencana, poin kartu, sel tabel, catatan).
 * Satu butir per baris supaya mudah dibaca dan tidak perlu tombol tambah/hapus.
 */
function StringListField({
  name,
  label,
  value,
  rows = 4,
  hint,
}: {
  name: string;
  label: string;
  value: unknown;
  rows?: number;
  hint?: string;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-slate-700">{label}</label>
      <textarea
        name={name}
        defaultValue={listToText(value)}
        rows={rows}
        className={inputCls}
      />
      {hint && <p className="mt-1 text-xs text-slate-400">{hint}</p>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Spesifikasi field per tipe blok                                     */
/* ------------------------------------------------------------------ */

const INTRO_SPEC: FieldSpec[] = [
  { key: 'eyebrow', label: 'Label kecil (opsional)' },
  { key: 'title', label: 'Judul' },
  { key: 'body', label: 'Paragraf', type: 'textarea', rows: 5 },
  { key: 'image', label: 'Gambar (path/URL, opsional)' },
  { key: 'imageAlt', label: 'Alt gambar' },
];

const METRICS_SPEC: FieldSpec[] = [
  { key: 'value', label: 'Nilai', placeholder: '10G - 100G' },
  { key: 'label', label: 'Keterangan', placeholder: 'Backbone Capacity' },
];

const FEATURES_SPEC: FieldSpec[] = [
  { key: 'title', label: 'Judul fitur' },
  { key: 'icon', label: 'Ikon', type: 'icon' },
  { key: 'desc', label: 'Deskripsi', type: 'textarea', rows: 3 },
];

const CARDS_SPEC: FieldSpec[] = [
  { key: 'title', label: 'Judul kartu' },
  { key: 'shortTitle', label: 'Judul singkat (untuk accordion)' },
  { key: 'icon', label: 'Ikon', type: 'icon' },
  { key: 'badge', label: 'Badge' },
  { key: 'description', label: 'Deskripsi', type: 'textarea', rows: 4 },
  { key: 'features', label: 'Poin (satu per baris)', type: 'textarea', rows: 4 },
  { key: 'href', label: 'Tautan tujuan', placeholder: '/layanan/internet/ip-transit' },
  { key: 'ctaLabel', label: 'Label tombol' },
];

/** Key yang isinya daftar teks (bukan objek) dan harus ditulis per baris. */
const LIST_KEYS: Record<string, string[]> = {
  cards: ['features'],
  rows: ['cells', 'footnotes'],
};

const COLUMNS_SPEC: FieldSpec[] = [
  { key: 'key', label: 'Kunci kolom', hint: 'Dipakai sebagai identitas, mis. premium' },
  { key: 'label', label: 'Judul kolom' },
  { key: 'highlight', label: 'Sorotan (mis. kolom utama)', type: 'checkbox' },
];

const ROWS_SPEC: FieldSpec[] = [
  { key: 'key', label: 'Kunci baris' },
  { key: 'label', label: 'Label baris' },
  { key: 'cells', label: 'Isi sel (satu butir per baris)', type: 'textarea', rows: 5 },
  { key: 'footnotes', label: 'Catatan baris (satu per baris)', type: 'textarea', rows: 2 },
];

const PROCESS_SPEC: FieldSpec[] = [
  { key: 'title', label: 'Judul langkah' },
  { key: 'desc', label: 'Keterangan', type: 'textarea', rows: 3 },
];

const IMAGE_SPEC: FieldSpec[] = [
  { key: 'src', label: 'Path / URL gambar', placeholder: '/assets/images/topologi.webp' },
  { key: 'alt', label: 'Alt gambar' },
  { key: 'caption', label: 'Keterangan gambar' },
];

const CTA_SPEC: FieldSpec[] = [
  { key: 'title', label: 'Judul ajakan' },
  { key: 'description', label: 'Deskripsi', type: 'textarea', rows: 3 },
  { key: 'label', label: 'Label tombol' },
  { key: 'href', label: 'Tautan tombol' },
];

export default function BlockFields({
  type,
  data,
  namePrefix,
  nested = false,
}: {
  type: BlockType;
  data: BlockData;
  namePrefix: string;
  nested?: boolean;
}) {
  const value = (data ?? {}) as unknown as Record<string, unknown>;
  const text = (key: string) => (typeof value[key] === 'string' ? (value[key] as string) : '');

  switch (type) {
    case 'INTRO':
      return (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {INTRO_SPEC.filter((spec) => spec.key !== 'image').map((spec) => (
            <Field key={spec.key} spec={spec} name={fieldName(namePrefix, spec.key)} value={text(spec.key)} />
          ))}
          <ImagePathField
            name={fieldName(namePrefix, 'image')}
            label="Gambar (opsional)"
            defaultValue={text('image')}
          />
        </div>
      );

    case 'BADGES':
      return (
        <StringListField
          name={fieldName(namePrefix, 'items')}
          label="Teks lencana (satu per baris)"
          value={value.items}
          rows={4}
          hint="Tiap baris akan menjadi satu lencana."
        />
      );

    case 'METRICS':
      return (
        <RepeatField
          name={fieldName(namePrefix, 'items')}
          specs={METRICS_SPEC}
          rows={toRows(value.items, ['value', 'label'])}
          addLabel="Tambah angka statistik"
          emptyLabel="Belum ada statistik."
        />
      );

    case 'FEATURES':
      return (
        <div className="space-y-4">
          <Field spec={{ key: 'heading', label: 'Judul seksi (opsional)' }} name={fieldName(namePrefix, 'heading')} value={text('heading')} />
          <RepeatField
            name={fieldName(namePrefix, 'items')}
            specs={FEATURES_SPEC}
            rows={toRows(value.items, ['title', 'icon', 'desc'])}
            addLabel="Tambah fitur"
            emptyLabel="Belum ada fitur."
          />
        </div>
      );

    case 'CARDS':
      return (
        <div className="space-y-4">
          <Field
            spec={{
              key: 'style',
              label: 'Tampilan',
              type: 'select',
              options: [
                { value: 'accordion', label: 'Akordeon (kartu bisa diklik)' },
                { value: 'grid', label: 'Grid Biasa' },
              ],
            }}
            name={fieldName(namePrefix, 'style')}
            value={text('style')}
          />
          <RepeatField
            name={fieldName(namePrefix, 'items')}
            specs={CARDS_SPEC}
            rows={toRows(
              value.items,
              ['title', 'shortTitle', 'icon', 'badge', 'description', 'features', 'href', 'ctaLabel'],
              LIST_KEYS.cards
            )}
            addLabel="Tambah kartu"
            emptyLabel="Belum ada kartu."
          />
        </div>
      );

    case 'TABS':
      return nested ? (
        <p className="text-xs text-amber-700">
          Tab di dalam tab belum didukung. Pindahkan blok tab ke level utama halaman.
        </p>
      ) : (
        <TabsField namePrefix={namePrefix} data={value} />
      );

    case 'TABLE':
      return (
        <div className="space-y-5">
          <div>
            <h4 className="mb-2 text-sm font-bold text-slate-800">Kolom</h4>
            <RepeatField
              name={fieldName(namePrefix, 'columns')}
              specs={COLUMNS_SPEC}
              rows={toRows(value.columns, ['key', 'label', 'highlight'])}
              addLabel="Tambah kolom"
              emptyLabel="Belum ada kolom."
            />
          </div>
          <div>
            <h4 className="mb-2 text-sm font-bold text-slate-800">Baris</h4>
            <RepeatField
              name={fieldName(namePrefix, 'rows')}
              specs={ROWS_SPEC}
              rows={toRows(value.rows, ['key', 'label', 'cells', 'footnotes'], LIST_KEYS.rows)}
              addLabel="Tambah baris"
              emptyLabel="Belum ada baris."
            />
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <StringListField
              name={fieldName(namePrefix, 'footnotes')}
              label="Catatan tabel (satu per baris)"
              value={value.footnotes}
              rows={2}
            />
          </div>
        </div>
      );

    case 'PROCESS':
      return (
        <div className="space-y-4">
          <Field spec={{ key: 'heading', label: 'Judul seksi (opsional)' }} name={fieldName(namePrefix, 'heading')} value={text('heading')} />
          <RepeatField
            name={fieldName(namePrefix, 'items')}
            specs={PROCESS_SPEC}
            rows={toRows(value.items, ['title', 'desc'])}
            addLabel="Tambah langkah"
            emptyLabel="Belum ada langkah."
          />
        </div>
      );

    case 'IMAGE':
      return (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {IMAGE_SPEC.filter((spec) => spec.key !== 'src').map((spec) => (
            <Field key={spec.key} spec={spec} name={fieldName(namePrefix, spec.key)} value={text(spec.key)} />
          ))}
          <ImagePathField
            name={fieldName(namePrefix, 'src')}
            label="Gambar"
            defaultValue={text('src')}
          />
        </div>
      );

    case 'CTA':
      return (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {CTA_SPEC.map((spec) => (
            <Field key={spec.key} spec={spec} name={fieldName(namePrefix, spec.key)} value={text(spec.key)} />
          ))}
        </div>
      );

    default:
      return null;
  }
}

/* ------------------------------------------------------------------ */
/* Tab (hanya di level utama)                                          */
/* ------------------------------------------------------------------ */

const NESTABLE = BLOCK_TYPES.filter((type) => type !== 'TABS');

function TabsField({ namePrefix, data }: { namePrefix: string; data: Record<string, unknown> }) {
  const initialTabs = Array.isArray(data.items)
    ? (data.items as { label?: string; blocks?: { type?: string; data?: unknown }[] }[]).map((tab) => ({
        label: typeof tab?.label === 'string' ? tab.label : '',
        blocks: (Array.isArray(tab?.blocks) ? tab.blocks : []).map((block) => ({
          type: typeof block?.type === 'string' ? block.type : 'INTRO',
          data: (block?.data ?? {}) as BlockData,
        })),
      }))
    : [{ label: 'Tab 1', blocks: [] }];

  const [tabs, setTabs] = useState(initialTabs);
  const [open, setOpen] = useState<Record<number, boolean>>({});

  return (
    <div className="space-y-3">
      {tabs.map((tab, tabIndex) => (
        <div key={tabIndex} className="rounded-xl border border-slate-200">
          <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-3 py-2">
            <button
              type="button"
              onClick={() => setOpen({ ...open, [tabIndex]: !open[tabIndex] })}
              className="flex items-center gap-2 text-sm font-bold text-slate-700"
            >
              {open[tabIndex] ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              {tab.label || `Tab ${tabIndex + 1}`}
            </button>
            <button
              type="button"
              onClick={() => setTabs(tabs.filter((_, i) => i !== tabIndex))}
              className="ml-auto rounded-lg border border-slate-200 p-1.5 text-red-600 hover:bg-red-50"
              title="Hapus tab"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>

          {open[tabIndex] !== false && (
            <div className="space-y-4 p-4">
              <Field
                spec={{ key: 'label', label: 'Nama tab' }}
                name={fieldName(namePrefix, 'items', tabIndex, 'label')}
                value={tab.label}
              />

              <div className="space-y-3">
                {tab.blocks.map((block, blockIndex) => (
                  <div key={blockIndex} className="rounded-lg border border-slate-200 bg-slate-50/40 p-3">
                    <div className="mb-3 flex items-center gap-2">
                      <select
                        name={fieldName(namePrefix, 'items', tabIndex, 'blocks', blockIndex, 'type')}
                        value={block.type}
                        onChange={(event) => {
                          const type = event.target.value as BlockType;
                          setTabs(
                            tabs.map((entry, i) =>
                              i === tabIndex
                                ? {
                                    ...entry,
                                    blocks: entry.blocks.map((item, j) =>
                                      j === blockIndex
                                        ? { type, data: item.type === type ? item.data : ({} as BlockData) }
                                        : item
                                    ),
                                  }
                                : entry
                            )
                          );
                        }}
                        className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs font-semibold"
                      >
                        {NESTABLE.map((type) => (
                          <option key={type} value={type}>
                            {BLOCK_LABELS[type]}
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={() => {
                          const next = tabs.map((t, i) =>
                            i === tabIndex
                              ? { ...t, blocks: t.blocks.filter((_, j) => j !== blockIndex) }
                              : t
                          );
                          setTabs(next);
                        }}
                        className="ml-auto rounded-lg border border-slate-200 p-1.5 text-red-600 hover:bg-red-50"
                        title="Hapus blok"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <BlockFields
                      type={(NESTABLE as string[]).includes(block.type) ? (block.type as BlockType) : 'INTRO'}
                      data={block.data}
                      namePrefix={fieldName(namePrefix, 'items', tabIndex, 'blocks', blockIndex, 'data')}
                      nested
                    />
                  </div>
                ))}

                <div className="flex flex-wrap gap-2">
                  {NESTABLE.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => {
                        const next = tabs.map((t, i) =>
                          i === tabIndex ? { ...t, blocks: [...t.blocks, { type, data: {} as BlockData }] } : t
                        );
                        setTabs(next);
                      }}
                      className="inline-flex items-center gap-1 rounded-lg border border-dashed border-brand-300 px-2.5 py-1.5 text-xs font-semibold text-brand-700 hover:bg-brand-50"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      {BLOCK_LABELS[type]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={() => setTabs([...tabs, { label: `Tab ${tabs.length + 1}`, blocks: [] }])}
        className="inline-flex items-center gap-2 rounded-lg border border-dashed border-brand-300 px-3 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50"
      >
        <Plus className="h-4 w-4" />
        Tambah tab
      </button>
    </div>
  );
}

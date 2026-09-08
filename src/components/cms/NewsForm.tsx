'use client';

import { useActionState } from 'react';
import type { NewsPost } from '@/generated/prisma/client';

interface NewsFormProps {
  mode: 'create' | 'edit';
  action: (prevState: Record<string, unknown>, formData: FormData) => Promise<{ error?: string } | void>;
  initial?: NewsPost | null;
}

function formatDate(date: Date | string | undefined): string {
  if (!date) return '';
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
    d.getDate()
  ).padStart(2, '0')}`;
}

export default function NewsForm({ mode, action, initial }: NewsFormProps) {
  const [state, formAction, pending] = useActionState(action as any, {} as { error?: string });
  const stateObj = (state || {}) as { error?: string };

  return (
    <form
      action={formAction}
      className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      {initial && <input type="hidden" name="id" value={initial.id} />}

      {stateObj.error && (
        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{stateObj.error}</div>
      )}

      <div>
        <h2 className="text-lg font-bold text-slate-900">
          {mode === 'create' ? 'Tambah Berita' : 'Edit Berita'}
        </h2>
        <p className="text-sm text-slate-500">
          Isi konten dalam Bahasa Indonesia (ID) dan Bahasa Inggris (EN) untuk mendukung
          multi-bahasa situs.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Judul (ID) *
          </label>
          <input
            name="titleId"
            defaultValue={initial?.titleId}
            required
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/20"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Judul (EN)
          </label>
          <input
            name="titleEn"
            defaultValue={initial?.titleEn}
            required
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/20"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Ringkasan (ID) *
          </label>
          <textarea
            name="summaryId"
            defaultValue={initial?.summaryId}
            required
            rows={3}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/20"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Ringkasan (EN)
          </label>
          <textarea
            name="summaryEn"
            defaultValue={initial?.summaryEn}
            required
            rows={3}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/20"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Konten Lengkap (ID)
          </label>
          <textarea
            name="contentId"
            defaultValue={initial?.contentId ?? ''}
            rows={5}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/20"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Konten Lengkap (EN)
          </label>
          <textarea
            name="contentEn"
            defaultValue={initial?.contentEn ?? ''}
            rows={5}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/20"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Tanggal</label>
          <input
            name="date"
            type="date"
            defaultValue={formatDate(initial?.date)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/20"
          />
        </div>
        <div className="flex items-end">
          <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-700">
            <input
              name="published"
              type="checkbox"
              defaultChecked={initial?.published ?? false}
              className="h-4 w-4 accent-brand-600"
            />
            Terbitkan sekarang
          </label>
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Gambar Sampul</label>
        <p className="mb-2 text-xs text-slate-400">
          Unggah file (otomatis dikompres ke WebP) atau tempel URL gambar. Salah satu wajib diisi
          pada pembuatan baru.
        </p>
        {mode === 'edit' && initial?.coverImage && (
          <div className="mb-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={initial.coverImage}
              alt="Cover saat ini"
              className="h-32 w-48 rounded-lg border border-slate-200 object-cover"
            />
            <p className="mt-1 text-xs text-slate-400">Cover saat ini</p>
          </div>
        )}
        <input
          name="coverImage"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
          className="block w-full text-sm text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-brand-600 file:px-3 file:py-2 file:text-white hover:file:bg-brand-700"
        />
        <label className="mt-3 block">
          <span className="mb-1 block text-xs font-medium text-slate-500">atau URL gambar:</span>
          <input
            name="coverUrl"
            type="text"
            placeholder="/assets/images/berita.webp atau https://..."
            defaultValue={mode === 'edit' && initial?.coverImage.startsWith('/') ? initial.coverImage : ''}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/20"
          />
        </label>
      </div>

      <div className="flex items-center gap-3 border-t border-slate-100 pt-5">
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-50"
        >
          {pending ? 'Menyimpan...' : mode === 'create' ? 'Simpan Berita' : 'Perbarui Berita'}
        </button>
        <a
          href="/cms/news"
          className="rounded-lg px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100"
        >
          Batal
        </a>
      </div>
    </form>
  );
}
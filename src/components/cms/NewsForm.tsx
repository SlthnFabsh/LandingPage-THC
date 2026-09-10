'use client';

import { useActionState } from 'react';
import type { NewsPost } from '@/generated/prisma/client';
import SubmitButton from '@/components/cms/SubmitButton';
import LoadingOverlay from '@/components/cms/LoadingOverlay';

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
  const [state, formAction] = useActionState(action as any, {} as { error?: string });
  const stateObj = (state || {}) as { error?: string };

  return (
    <form
      action={formAction}
      className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <LoadingOverlay />
      {initial && <input type="hidden" name="id" value={initial.id} />}

      {stateObj.error && (
        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{stateObj.error}</div>
      )}

      <div>
        <h2 className="text-lg font-bold text-slate-900">
          {mode === 'create' ? 'Add News' : 'Edit News'}
        </h2>
        <p className="text-sm text-slate-500">
          Fill in the news content in English.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Title *
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
            Summary *
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
            Full Content
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
          <label className="mb-1 block text-sm font-medium text-slate-700">Date</label>
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
            Publish now
          </label>
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Cover Image</label>
        <p className="mb-2 text-xs text-slate-400">
          Upload a file (auto-compressed to WebP) or paste an image URL. One is required for new items.
        </p>
        {mode === 'edit' && initial?.coverImage && (
          <div className="mb-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={initial.coverImage}
              alt="Current cover"
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
          <span className="mb-1 block text-xs font-medium text-slate-500">or image URL:</span>
          <input
            name="coverUrl"
            type="text"
            placeholder="/assets/images/news.webp or https://..."
            defaultValue={mode === 'edit' && initial?.coverImage.startsWith('/') ? initial.coverImage : ''}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/20"
          />
        </label>
      </div>

      <div className="flex items-center gap-3 border-t border-slate-100 pt-5">
        <SubmitButton
          label={mode === 'create' ? 'Save News' : 'Update News'}
          pendingLabel="Saving..."
          className="rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-50"
        />
        <a
          href="/cms/news"
          className="rounded-lg px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100"
        >
          Cancel
        </a>
      </div>
    </form>
  );
}
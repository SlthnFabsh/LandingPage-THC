'use client';

import type { ReactNode } from 'react';
import SubmitButton from '@/components/cms/SubmitButton';
import LoadingOverlay from '@/components/cms/LoadingOverlay';

interface ContentFormProps {
  title: string;
  subtitle: string;
  error?: string;
  submitLabel: string;
  pendingLabel?: string;
  cancelHref: string;
  action: (payload: FormData) => void;
  id?: string;
  children: ReactNode;
}

export default function ContentForm({
  title,
  subtitle,
  error,
  submitLabel,
  pendingLabel,
  cancelHref,
  action,
  id,
  children,
}: ContentFormProps) {
  return (
    <form action={action} className="max-w-3xl space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <LoadingOverlay />
      {id && <input type="hidden" name="id" value={id} />}

      {error && <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

      <div>
        <h2 className="text-lg font-bold text-slate-900">{title}</h2>
        <p className="text-sm text-slate-500">{subtitle}</p>
      </div>

      {children}

      <div className="flex items-center gap-3 border-t border-slate-100 pt-5">
        <SubmitButton
          label={submitLabel}
          pendingLabel={pendingLabel ?? 'Menyimpan...'}
          className="rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-50"
        />
        <a href={cancelHref} className="rounded-lg px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100">
          Batal
        </a>
      </div>
    </form>
  );
}
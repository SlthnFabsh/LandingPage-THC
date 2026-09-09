import Link from 'next/link';
import { Plus } from 'lucide-react';
import type { ReactNode } from 'react';

export function ListHeader({
  title,
  subtitle,
  addHref,
  addLabel,
}: {
  title: string;
  subtitle: string;
  addHref?: string;
  addLabel?: string;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
        <p className="text-sm text-slate-500">{subtitle}</p>
      </div>
      {addHref && (
        <Link
          href={addHref}
          className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
        >
          <Plus className="h-4 w-4" />
          {addLabel ?? 'Tambah'}
        </Link>
      )}
    </div>
  );
}

export function PasswordExpiredBanner() {
  return (
    <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
      Kata sandi kedaluwarsa. Aksi perubahan diblokir sampai Anda{' '}
      <Link href="/cms/password" className="font-bold underline">
        mengganti kata sandi
      </Link>
      .
    </div>
  );
}

export function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
      <p className="text-sm text-slate-500">{message}</p>
    </div>
  );
}

export function ListCard({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <ul className="divide-y divide-slate-100">{children}</ul>
    </div>
  );
}

export function Row({ children }: { children: ReactNode }) {
  return <li className="flex items-center gap-4 px-5 py-4">{children}</li>;
}

export function ActiveBadge({ active }: { active: boolean }) {
  return active ? (
    <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
      Tampil
    </span>
  ) : (
    <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-500">
      Disembunyikan
    </span>
  );
}
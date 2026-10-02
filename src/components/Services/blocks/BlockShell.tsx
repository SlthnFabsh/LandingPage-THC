import type { ReactNode } from 'react';

/**
 * Pembungkus kartu putih yang dipakai bersama oleh blok server dan client.
 * Sengaja tanpa directive supaya bisa diimpor dari kedua sisi.
 */
export default function BlockShell({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-soft ${className}`}
    >
      <div className="p-6 sm:p-8 lg:p-12">{children}</div>
    </div>
  );
}

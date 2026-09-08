'use client';

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-2xl font-bold text-slate-900">Terjadi kesalahan</h1>
      <p className="text-sm text-slate-500">Tidak dapat memuat halaman ini. Silakan coba lagi.</p>
      <button
        onClick={() => reset()}
        className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
      >
        Coba lagi
      </button>
    </div>
  );
}
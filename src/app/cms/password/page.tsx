'use client';

import { useActionState } from 'react';
import { useSearchParams } from 'next/navigation';
import { AlertTriangle } from 'lucide-react';
import { changePasswordAction } from '@/app/cms/actions/auth';
import SubmitButton from '@/components/cms/SubmitButton';
import LoadingOverlay from '@/components/cms/LoadingOverlay';

const initialState: { error?: string; success?: boolean } = {};

export default function ChangePasswordPage() {
  const [state, formAction] = useActionState(changePasswordAction, initialState);
  const searchParams = useSearchParams();
  const expired = searchParams.get('expired') === '1';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Ganti Kata Sandi</h1>
        <p className="text-sm text-slate-500">
          Perbarui kata sandi akun Anda. Berlaku kebijakan sandi 90 hari.
        </p>
      </div>

      {expired && !state.success && (
        <div className="flex items-center gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          <AlertTriangle className="h-5 w-5 shrink-0" />
          Kata sandi Anda telah kedaluwarsa. Anda wajib mengganti sebelum melanjutkan.
        </div>
      )}

      {state.success ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h2 className="text-lg font-bold text-emerald-700">Kata sandi berhasil diperbarui.</h2>
          <p className="mt-1 text-sm text-slate-500">
            Gunakan kata sandi baru untuk login berikutnya.
          </p>
        </div>
      ) : (
        <form
          action={formAction}
          className="max-w-lg space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <LoadingOverlay />
          {state.error && (
            <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
              {state.error}
            </div>
          )}

          <div>
            <label htmlFor="current" className="mb-1 block text-sm font-medium text-slate-700">
              Kata Sandi Saat Ini
            </label>
            <input
              id="current"
              name="current"
              type="password"
              required
              autoComplete="current-password"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/20"
            />
          </div>

          <div>
            <label htmlFor="new" className="mb-1 block text-sm font-medium text-slate-700">
              Kata Sandi Baru
            </label>
            <input
              id="new"
              name="new"
              type="password"
              required
              autoComplete="new-password"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/20"
            />
            <p className="mt-2 text-xs text-slate-500">
              Minimal 8 karakter, kombinasi huruf besar, huruf kecil, angka, dan simbol.
            </p>
          </div>

          <SubmitButton
              label="Perbarui Kata Sandi"
              pendingLabel="Menyimpan..."
              className="w-full rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-50"
            />
        </form>
      )}
    </div>
  );
}
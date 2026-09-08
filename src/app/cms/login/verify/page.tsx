'use client';

import { useActionState } from 'react';
import { verify2faAction } from '@/app/cms/actions/auth';
import SubmitButton from '@/components/cms/SubmitButton';

const initialState = { error: '' as string };

export default function Verify2faPage() {
  const [state, formAction] = useActionState(verify2faAction, initialState);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600 font-bold text-white">
              6
            </div>
            <h1 className="text-xl font-bold text-slate-900">Verifikasi 2FA</h1>
            <p className="mt-1 text-sm text-slate-500">
              Masukkan kode 6 digit dari aplikasi Google Authenticator
            </p>
          </div>

          {state.error && (
            <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
              {state.error}
            </div>
          )}

          <form action={formAction} className="space-y-4">
            <div>
              <input
                name="token"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                required
                placeholder="000000"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-center text-2xl font-bold tracking-widest text-slate-900 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/20"
              />
            </div>
            <SubmitButton
              label="Verifikasi"
              pendingLabel="Memverifikasi..."
              className="w-full rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-50"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
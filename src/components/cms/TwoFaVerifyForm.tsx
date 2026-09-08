'use client';

import { useActionState } from 'react';
import { enable2faAction } from '@/app/cms/actions/twofa';
import SubmitButton from '@/components/cms/SubmitButton';

const initialState: { error?: string } = {};

export default function TwoFaVerifyForm() {
  const [state, formAction] = useActionState(enable2faAction, initialState);

  return (
    <form action={formAction} className="mt-6 space-y-4">
      {state.error && (
        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{state.error}</div>
      )}
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">
          Kode 6 digit dari aplikasi
        </label>
        <input
          name="token"
          type="text"
          inputMode="numeric"
          maxLength={6}
          required
          placeholder="000000"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-center text-2xl font-bold tracking-widest text-slate-900 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/20"
        />
      </div>
      <SubmitButton
        label="Verifikasi & Aktifkan"
        pendingLabel="Menyimpan..."
        className="w-full rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-50"
      />
    </form>
  );
}
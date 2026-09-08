'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { loginAction } from '@/app/cms/actions/auth';
import SubmitButton from '@/components/cms/SubmitButton';

const initialState = { error: '' as string };

export default function LoginPage() {
  const [state, formAction] = useActionState(loginAction, initialState);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-6 text-center">
            <img
              src="/assets/images/logo1.webp"
              alt="Trans Hybrid Communication"
              className="mx-auto mb-3 h-16 w-auto max-w-full object-contain"
            />
            <h1 className="text-xl font-bold text-slate-900">Masuk ke CMS</h1>
            <p className="mt-1 text-sm text-slate-500">
              Trans Hybrid Communication Content Management System
            </p>
          </div>

          {state.error && (
            <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
              {state.error}
            </div>
          )}

          <form action={formAction} className="space-y-4">
            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/20"
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-1 block text-sm font-medium text-slate-700">
                Kata Sandi
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/20"
              />
            </div>
            <SubmitButton
              label="Masuk"
              pendingLabel="Memproses..."
              className="w-full rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-50"
            />
          </form>

          <div className="mt-6 flex justify-center">
            <Link href="/" className="text-sm text-brand-600 hover:underline">
              &larr; Kembali ke situs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
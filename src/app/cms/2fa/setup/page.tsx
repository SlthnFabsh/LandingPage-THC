import QRCode from 'qrcode';
import { redirect } from 'next/navigation';
import { ShieldCheck } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/session';
import { totpSecretUri } from '@/lib/totp';
import { getPendingTotpSecret, start2faAction, disable2faAction } from '@/app/cms/actions/twofa';
import TwoFaVerifyForm from '@/components/cms/TwoFaVerifyForm';
import SubmitButton from '@/components/cms/SubmitButton';

export const dynamic = 'force-dynamic';

export default async function TwoFaSetupPage({
  searchParams,
}: {
  searchParams: Promise<{ step?: string; enabled?: string; disabled?: string }>;
}) {
  const user = await getCurrentUser();
  if (!user) redirect('/cms/login');

  const { step, enabled, disabled } = await searchParams;

  const userData = await prisma.user.findUnique({
    where: { id: user.id },
    select: { is2faEnabled: true },
  });

  // Sudah aktif
  if (userData?.is2faEnabled) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Keamanan 2FA</h1>
          <p className="text-sm text-slate-500">Autentikasi dua faktor (Google Authenticator).</p>
        </div>
        {enabled === '1' && (
          <div className="rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            2FA berhasil diaktifkan.
          </div>
        )}
        <div className="max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600/10 text-emerald-600">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <p className="font-semibold text-slate-900">2FA Sedang Aktif</p>
              <p className="text-sm text-slate-500">Akun Anda dilindungi autentikasi dua faktor.</p>
            </div>
          </div>
          <form action={disable2faAction}>
            <SubmitButton
              label="Nonaktifkan 2FA"
              pendingLabel="Menyimpan..."
              className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-100 disabled:opacity-50"
            />
          </form>
        </div>
      </div>
    );
  }

  // Butuh verifikasi (tahap setup setengah jalan)
  if (step === 'verify') {
    const secret = await getPendingTotpSecret();
    if (secret) {
      const uri = totpSecretUri(user.email, secret);
      const qrDataUrl = await QRCode.toDataURL(uri, { width: 260, margin: 1 });
      return (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Aktifkan 2FA</h1>
            <p className="text-sm text-slate-500">
              Pindai QR menggunakan Google Authenticator, lalu masukkan kode.
            </p>
          </div>
          <div className="max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={qrDataUrl}
              alt="QR Code Google Authenticator"
              className="mx-auto h-64 w-64 rounded-lg"
            />
            <TwoFaVerifyForm />
          </div>
        </div>
      );
    }
  }

  // Belum aktif & belum mulai
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Keamanan 2FA</h1>
        <p className="text-sm text-slate-500">Autentikasi dua faktor (Google Authenticator).</p>
      </div>
      {disabled === '1' && (
        <div className="rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800">
          2FA dinonaktifkan.
        </div>
      )}
      <div className="max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <p className="font-semibold text-slate-900">2FA Belum Aktif</p>
            <p className="text-sm text-slate-500">
              Aktifkan untuk menambahkan lapisan keamanan ekstra saat login.
            </p>
          </div>
        </div>
        <form action={start2faAction}>
          <SubmitButton
            label="Mulai Setup 2FA"
            pendingLabel="Menyiapkan..."
            className="rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-50"
          />
        </form>
      </div>
    </div>
  );
}
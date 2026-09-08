'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/session';
import { encryptSecret } from '@/lib/crypto';
import { generateTotpSecret, verifyTotpToken } from '@/lib/totp';
import { writeAudit } from '@/lib/audit';

const TOTP_PENDING_COOKIE = 'thc_cms_totp_pending';

export async function start2faAction() {
  const user = await getCurrentUser();
  if (!user) redirect('/cms/login');

  const userData = await prisma.user.findUnique({
    where: { id: user.id },
    select: { is2faEnabled: true },
  });

  if (userData?.is2faEnabled) {
    redirect('/cms/2fa/setup?already=1');
  }

  // Jika secret pending sudah ada, jangan regenerate agar QR & verifikasi konsisten.
  const cookieStore = await cookies();
  const existing = cookieStore.get(TOTP_PENDING_COOKIE)?.value;
  if (!existing) {
    const secret = generateTotpSecret();
    const encrypted = await encryptSecret(secret);
    cookieStore.set(TOTP_PENDING_COOKIE, encrypted, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 10 * 60,
    });
  }

  redirect('/cms/2fa/setup?step=verify');
}

export async function getPendingTotpSecret(): Promise<string | null> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(TOTP_PENDING_COOKIE)?.value;
  if (!raw) return null;
  try {
    const { decryptSecret } = await import('@/lib/crypto');
    return await decryptSecret(raw);
  } catch {
    return null;
  }
}

export async function enable2faAction(
  prevState: unknown,
  formData: FormData
) {
  const user = await getCurrentUser();
  if (!user) return { error: 'Tidak terautentikasi.' };

  const token = String(formData.get('token') || '');
  const secret = await getPendingTotpSecret();
  if (!secret) return { error: 'Sesi setup kedaluwarsa. Mulai ulang.' };

  if (!verifyTotpToken(token, secret)) {
    await writeAudit('TWO_FA_ENABLED', { userId: user.id, detail: 'Gagal: kode salah' });
    return { error: 'Kode autentikasi salah.' };
  }

  const encrypted = await encryptSecret(secret);
  await prisma.user.update({
    where: { id: user.id },
    data: { is2faEnabled: true, totpSecretEncrypted: encrypted },
  });

  const cookieStore = await cookies();
  cookieStore.delete(TOTP_PENDING_COOKIE);

  await writeAudit('TWO_FA_ENABLED', { userId: user.id });
  redirect('/cms/2fa/setup?enabled=1');
}

export async function disable2faAction() {
  const user = await getCurrentUser();
  if (!user) return;

  await prisma.user.update({
    where: { id: user.id },
    data: { is2faEnabled: false, totpSecretEncrypted: null },
  });
  await writeAudit('TWO_FA_DISABLED', { userId: user.id });
  redirect('/cms/2fa/setup?disabled=1');
}

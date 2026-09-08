'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import {
  hashPassword,
  verifyPassword,
  isPasswordExpired,
  validatePasswordPolicy,
} from '@/lib/password';
import { createSession, destroySession, getCurrentUser } from '@/lib/session';
import {
  createPending2fa,
  resolvePending2fa,
  PENDING_COOKIE,
} from '@/lib/pending2fa';
import { decryptSecret } from '@/lib/crypto';
import { verifyTotpToken } from '@/lib/totp';
import { writeAudit } from '@/lib/audit';

const MAX_FAILED_ATTEMPTS = 5;
const LOCK_MS = 15 * 60 * 1000;

export async function loginAction(prevState: unknown, formData: FormData) {
  const email = String(formData.get('email') || '').trim().toLowerCase();
  const password = String(formData.get('password') || '');

  if (!email || !password) {
    return { error: 'Email dan kata sandi wajib diisi.' };
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    await writeAudit('LOGIN_FAILED', { detail: `Email tidak ditemukan: ${email}` });
    return { error: 'Email atau kata sandi salah.' };
  }

  if (user.lockedUntil && user.lockedUntil > new Date()) {
    await writeAudit('LOGIN_FAILED', { userId: user.id, detail: 'Akun terkunci' });
    return { error: 'Akun terkunci. Coba lagi nanti.' };
  }

  const valid = await verifyPassword(user.passwordHash, password);
  if (!valid) {
    const attempts = user.failedLoginAttempts + 1;
    let lockedUntil: Date | null = null;
    if (attempts >= MAX_FAILED_ATTEMPTS) {
      lockedUntil = new Date(Date.now() + LOCK_MS);
    }
    await prisma.user.update({
      where: { id: user.id },
      data: { failedLoginAttempts: attempts, lockedUntil },
    });
    await writeAudit('LOGIN_FAILED', { userId: user.id, detail: 'Kata sandi salah' });
    return { error: 'Email atau kata sandi salah.' };
  }

  if (user.lockedUntil && user.lockedUntil > new Date()) {
    await writeAudit('LOGIN_FAILED', { userId: user.id, detail: 'Akun terkunci' });
    return { error: 'Akun terkunci. Coba lagi nanti.' };
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { failedLoginAttempts: 0, lockedUntil: null },
  });

  await writeAudit('LOGIN_SUCCESS', { userId: user.id, detail: 'Kata sandi benar' });

  if (user.is2faEnabled) {
    const token = await createPending2fa(user.id);
    const cookieStore = await cookies();
    cookieStore.set(PENDING_COOKIE, token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 10 * 60,
    });
    redirect('/cms/login/verify');
  }

  await createSession({
    userId: user.id,
    email: user.email,
    role: user.role,
  });
  redirect('/cms');
}

export async function verify2faAction(prevState: unknown, formData: FormData) {
  const token = String(formData.get('token') || '');
  const cookieStore = await cookies();
  const pending = cookieStore.get(PENDING_COOKIE)?.value;

  if (!pending) {
    return { error: 'Sesi tidak valid. Silakan login ulang.' };
  }

  const userId = await resolvePending2fa(pending);
  if (!userId) {
    return { error: 'Sesi kedaluwarsa. Silakan login ulang.' };
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user || !user.is2faEnabled || !user.totpSecretEncrypted) {
    return { error: '2FA tidak aktif untuk akun ini.' };
  }

  const secret = await decryptSecret(user.totpSecretEncrypted);
  if (!verifyTotpToken(token, secret)) {
    await writeAudit('LOGIN_2FA_FAILED', { userId: user.id });
    return { error: 'Kode autentikasi salah.' };
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { lastLoginAt: new Date() },
  });

  cookieStore.delete(PENDING_COOKIE);
  await writeAudit('LOGIN_2FA_SUCCESS', { userId: user.id });

  await createSession({ userId: user.id, email: user.email, role: user.role });
  redirect('/cms');
}

export async function logoutAction() {
  const user = await getCurrentUser();
  if (user) {
    await writeAudit('LOGOUT', { userId: user.id });
  }
  await destroySession();
  redirect('/cms/login');
}

export async function changePasswordAction(
  prevState: unknown,
  formData: FormData
) {
  const currentPassword = String(formData.get('current') || '');
  const newPassword = String(formData.get('new') || '');

  const user = await getCurrentUser();
  if (!user) return { error: 'Tidak terautentikasi.' };

  const valid = await verifyPassword(user.passwordHash, currentPassword);
  if (!valid) {
    await writeAudit('PASSWORD_CHANGED', { userId: user.id, detail: 'Gagal: kata sandi saat ini salah' });
    return { error: 'Kata sandi saat ini salah.' };
  }

  const policy = validatePasswordPolicy(newPassword);
  if (!policy.valid) return { error: policy.message };

  const newHash = await hashPassword(newPassword);
  await prisma.user.update({
    where: { id: user.id },
    data: { passwordHash: newHash, passwordChangedAt: new Date() },
  });
  await writeAudit('PASSWORD_CHANGED', { userId: user.id, detail: 'Kata sandi diperbarui' });
  return { success: true };
}

export async function checkPasswordExpiry(): Promise<boolean> {
  const user = await getCurrentUser();
  if (!user) return false;
  return isPasswordExpired(user.passwordChangedAt);
}

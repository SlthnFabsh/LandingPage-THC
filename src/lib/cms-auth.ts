import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/session';
import { isPasswordExpired } from '@/lib/password';

export async function requireCms() {
  const user = await getCurrentUser();
  if (!user) redirect('/cms/login');
  return { user, passwordExpired: isPasswordExpired(user.passwordChangedAt) };
}
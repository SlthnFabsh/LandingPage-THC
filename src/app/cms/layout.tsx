import { getCurrentUser } from '@/lib/session';
import { isPasswordExpired } from '@/lib/password';
import CmsShell from '@/components/cms/CmsShell';

export const dynamic = 'force-dynamic';

export default async function CmsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  const passwordExpired = user ? isPasswordExpired(user.passwordChangedAt) : false;

  return (
    <CmsShell user={user} passwordExpired={passwordExpired}>
      {children}
    </CmsShell>
  );
}

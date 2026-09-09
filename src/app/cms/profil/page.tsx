import { prisma } from '@/lib/prisma';
import { requireCms } from '@/lib/cms-auth';
import ProfileForm from '@/components/cms/ProfileForm';
import { upsertProfile } from '@/app/cms/actions/content';
import { PasswordExpiredBanner } from '@/components/cms/ListShell';

export const dynamic = 'force-dynamic';

export default async function ProfilePage() {
  const { passwordExpired } = await requireCms();
  const company = await prisma.companyContent.findFirst();

  return (
    <div className="space-y-6">
      {passwordExpired && <PasswordExpiredBanner />}
      <ProfileForm action={upsertProfile as never} initial={company} />
    </div>
  );
}
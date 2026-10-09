import { prisma } from '@/lib/prisma';
import { requireCms } from '@/lib/cms-auth';
import MediaForm from '@/components/cms/MediaForm';
import { upsertHomeMedia } from '@/app/cms/actions/content';
import { PasswordExpiredBanner } from '@/components/cms/ListShell';

export const dynamic = 'force-dynamic';

export default async function MediaPage() {
  const { passwordExpired } = await requireCms();
  const media = await prisma.homeMedia.findFirst();

  return (
    <div className="space-y-6">
      {passwordExpired && <PasswordExpiredBanner />}
      <MediaForm action={upsertHomeMedia as never} initial={media} />
    </div>
  );
}
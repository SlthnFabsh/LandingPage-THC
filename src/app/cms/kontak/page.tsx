import { prisma } from '@/lib/prisma';
import { requireCms } from '@/lib/cms-auth';
import ContactForm from '@/components/cms/ContactForm';
import { upsertContact } from '@/app/cms/actions/content';
import { PasswordExpiredBanner } from '@/components/cms/ListShell';

export const dynamic = 'force-dynamic';

export default async function KontakPage() {
  const { passwordExpired } = await requireCms();
  const contact = await prisma.contactSetting.findFirst();

  return (
    <div className="space-y-6">
      {passwordExpired && <PasswordExpiredBanner />}
      <ContactForm action={upsertContact as never} initial={contact} />
    </div>
  );
}
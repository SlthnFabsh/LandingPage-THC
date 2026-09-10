import Link from 'next/link';
import { Pencil } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { requireCms } from '@/lib/cms-auth';
import DeleteContentButton from '@/components/cms/DeleteContentButton';
import { deleteSocial } from '@/app/cms/actions/content';
import { ListHeader, ListCard, Row, EmptyState, ActiveBadge, PasswordExpiredBanner } from '@/components/cms/ListShell';

export const dynamic = 'force-dynamic';

const platformLabels: Record<string, string> = {
  x: 'X (Twitter)',
  facebook: 'Facebook',
  youtube: 'YouTube',
  linkedin: 'LinkedIn',
  instagram: 'Instagram',
};

export default async function SosmedListPage() {
  const { passwordExpired } = await requireCms();
  const socials = await prisma.socialMediaLink.findMany({ orderBy: [{ order: 'asc' }, { createdAt: 'asc' }] });

  return (
    <div className="space-y-6">
      <ListHeader
        title="Social Media"
        subtitle="Social media links in the footer."
        addHref="/cms/sosmed/new"
        addLabel="Add Link"
      />
      {passwordExpired && <PasswordExpiredBanner />}
      {socials.length === 0 ? (
        <EmptyState message="No social media links yet." />
      ) : (
        <ListCard>
          {socials.map((social) => (
            <Row key={social.id}>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-slate-900">
                    {platformLabels[social.platform] ?? social.platform}
                  </span>
                  <ActiveBadge active={social.active} />
                </div>
                <p className="truncate text-xs text-slate-500">{social.url}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Link
                  href={`/cms/sosmed/${social.id}/edit`}
                  title="Edit"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
                >
                  <Pencil className="h-4 w-4" />
                </Link>
                <DeleteContentButton action={deleteSocial} id={social.id} disabled={passwordExpired} confirmText="Delete this link?" />
              </div>
            </Row>
          ))}
        </ListCard>
      )}
    </div>
  );
}
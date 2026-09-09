import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { requireCms } from '@/lib/cms-auth';
import SocialForm from '@/components/cms/SocialForm';
import { updateSocial } from '@/app/cms/actions/content';

export const dynamic = 'force-dynamic';

export default async function SosmedEditPage({ params }: { params: Promise<{ id: string }> }) {
  await requireCms();
  const { id } = await params;
  const social = await prisma.socialMediaLink.findUnique({ where: { id } });
  if (!social) notFound();

  return <SocialForm mode="edit" action={updateSocial as never} initial={social} />;
}
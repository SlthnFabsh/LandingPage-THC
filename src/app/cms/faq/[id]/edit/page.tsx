import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { requireCms } from '@/lib/cms-auth';
import FaqForm from '@/components/cms/FaqForm';
import { updateFaq } from '@/app/cms/actions/content';

export const dynamic = 'force-dynamic';

export default async function FaqEditPage({ params }: { params: Promise<{ id: string }> }) {
  await requireCms();
  const { id } = await params;
  const faq = await prisma.faqEntry.findUnique({ where: { id } });
  if (!faq) notFound();

  return <FaqForm mode="edit" action={updateFaq as never} initial={faq} />;
}
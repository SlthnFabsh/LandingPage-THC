import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { requireCms } from '@/lib/cms-auth';
import SliderForm from '@/components/cms/SliderForm';
import { updateHeroSlide } from '@/app/cms/actions/content';

export const dynamic = 'force-dynamic';

export default async function SliderEditPage({ params }: { params: Promise<{ id: string }> }) {
  await requireCms();
  const { id } = await params;
  const slide = await prisma.heroSlide.findUnique({ where: { id } });
  if (!slide) notFound();

  return <SliderForm mode="edit" action={updateHeroSlide as never} initial={slide} />;
}
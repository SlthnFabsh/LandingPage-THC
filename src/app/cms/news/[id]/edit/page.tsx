import { notFound, redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/session';
import { updateNews } from '@/app/cms/actions/news';
import NewsForm from '@/components/cms/NewsForm';

export const dynamic = 'force-dynamic';

export default async function EditNewsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getCurrentUser();
  if (!user) redirect('/cms/login');

  const news = await prisma.newsPost.findUnique({ where: { id } });
  if (!news) notFound();

  return (
    <div>
      <NewsForm mode="edit" action={updateNews} initial={news} />
    </div>
  );
}
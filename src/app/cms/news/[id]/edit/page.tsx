import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/session';
import { isPasswordExpired } from '@/lib/password';
import { updateNews } from '@/app/cms/actions/news';
import NewsForm from '@/components/cms/NewsForm';
import DeleteNewsButton from '@/components/cms/DeleteNewsButton';

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

  const passwordExpired = isPasswordExpired(user.passwordChangedAt);

  return (
    <div className="space-y-6">
      <div>
        <Link
          href={`/cms/news/${news.id}`}
          className="mb-2 inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to news details
        </Link>
        <h1 className="text-2xl font-bold text-slate-900">Edit News</h1>
      </div>
      <NewsForm mode="edit" action={updateNews} initial={news} />
      <div className="flex items-center justify-between gap-4 rounded-2xl border border-red-100 bg-red-50/50 px-6 py-4">
        <p className="text-sm text-slate-600">
          Delete this news permanently. This action cannot be undone.
        </p>
        <DeleteNewsButton
          id={news.id}
          disabled={passwordExpired}
          label="Delete News"
          className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-40"
        />
      </div>
    </div>
  );
}
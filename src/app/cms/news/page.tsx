import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Plus, Pencil, Eye, EyeOff, ArrowUpRight } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/session';
import { isPasswordExpired } from '@/lib/password';
import DeleteNewsButton from '@/components/cms/DeleteNewsButton';

export const dynamic = 'force-dynamic';

export default async function NewsListPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const where = status === 'draft' ? { published: false } : {};

  const user = await getCurrentUser();
  if (!user) redirect('/cms/login');
  const passwordExpired = isPasswordExpired(user.passwordChangedAt);

  const news = await prisma.newsPost.findMany({
    where,
    orderBy: { date: 'desc' },
    include: { author: { select: { name: true, email: true } } },
  });

  const countPublished = await prisma.newsPost.count({ where: { published: true } });
  const countDraft = await prisma.newsPost.count({ where: { published: false } });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Berita</h1>
          <p className="text-sm text-slate-500">Kelola berita yang tampil di halaman utama.</p>
        </div>
        <Link
          href="/cms/news/new"
          className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
        >
          <Plus className="h-4 w-4" />
          Tambah Berita
        </Link>
      </div>

      {passwordExpired && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Kata sandi kedaluwarsa. Aksi perubahan diblokir sampai Anda{' '}
          <Link href="/cms/password" className="font-bold underline">
            mengganti kata sandi
          </Link>
          .
        </div>
      )}

      <div className="flex items-center gap-2 text-sm">
        <Link
          href="/cms/news"
          className={`rounded-full px-4 py-1.5 font-semibold ${!status ? 'bg-brand-600 text-white' : 'bg-white text-slate-600'}`}
        >
          Semua ({countPublished + countDraft})
        </Link>
        <Link
          href="/cms/news?status=draft"
          className={`rounded-full px-4 py-1.5 font-semibold ${status === 'draft' ? 'bg-brand-600 text-white' : 'bg-white text-slate-600'}`}
        >
          Draf ({countDraft})
        </Link>
      </div>

      {news.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <p className="text-sm text-slate-500">Belum ada berita. Tambahkan berita pertama Anda.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <ul className="divide-y divide-slate-100">
            {news.map((item) => (
              <li key={item.id} className="flex items-center gap-4 px-5 py-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.coverImage}
                  alt=""
                  className="h-14 w-20 shrink-0 rounded-lg bg-slate-100 object-cover"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    {item.published ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                        <Eye className="h-3 w-3" /> Terbit
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-700">
                        <EyeOff className="h-3 w-3" /> Draf
                      </span>
                    )}
                    <span className="text-xs text-slate-400">
                      {new Date(item.date).toLocaleDateString('id-ID')}
                    </span>
                  </div>
                  <Link
                    href={`/cms/news/${item.id}`}
                    className="block truncate text-sm font-semibold text-slate-900 hover:text-brand-600"
                  >
                    {item.titleId}
                  </Link>
                  <p className="truncate text-xs text-slate-500">oleh {item.author?.email}</p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <Link
                    href={`/cms/news/${item.id}`}
                    title="Lihat detail"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href={`/cms/news/${item.id}/edit`}
                    title="Edit"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
                  >
                    <Pencil className="h-4 w-4" />
                  </Link>
                  <DeleteNewsButton id={item.id} disabled={passwordExpired} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
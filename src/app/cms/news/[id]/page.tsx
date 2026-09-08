import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { ArrowLeft, Eye, EyeOff, PenLine, Plus } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/session';
import { isPasswordExpired } from '@/lib/password';
import DeleteNewsButton from '@/components/cms/DeleteNewsButton';

export const dynamic = 'force-dynamic';

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getCurrentUser();
  if (!user) redirect('/cms/login');

  const news = await prisma.newsPost.findUnique({
    where: { id },
    include: { author: { select: { name: true, email: true } } },
  });
  if (!news) notFound();

  const passwordExpired = isPasswordExpired(user.passwordChangedAt);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link
            href="/cms/news"
            className="mb-2 inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke daftar berita
          </Link>
          <h1 className="text-2xl font-bold text-slate-900">{news.titleId}</h1>
          <p className="text-sm text-slate-500">
            {news.titleEn && (
              <span className="block text-slate-500">{news.titleEn}</span>
            )}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/cms/news/new"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            <Plus className="h-4 w-4" />
            Tambah
          </Link>
          <Link
            href={`/cms/news/${news.id}/edit`}
            className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
          >
            <PenLine className="h-4 w-4" />
            Edit
          </Link>
          <DeleteNewsButton
            id={news.id}
            disabled={passwordExpired}
            label="Hapus Berita"
            className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-40"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {news.coverImage && (
          <div className="aspect-[16/6] w-full bg-slate-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={news.coverImage}
              alt={news.titleId}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        <div className="space-y-6 p-6">
          <div className="flex flex-wrap items-center gap-3">
            {news.published ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                <Eye className="h-3 w-3" /> Terbit
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">
                <EyeOff className="h-3 w-3" /> Draf
              </span>
            )}
            <span className="text-sm text-slate-500">
              {new Date(news.date).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 border-t border-slate-100 pt-6 sm:grid-cols-2">
            <div>
              <h2 className="mb-2 text-sm font-bold text-slate-900">Ringkasan (ID)</h2>
              <p className="text-sm leading-relaxed text-slate-600">{news.summaryId}</p>
            </div>
            <div>
              <h2 className="mb-2 text-sm font-bold text-slate-900">Ringkasan (EN)</h2>
              <p className="text-sm leading-relaxed text-slate-600">{news.summaryEn}</p>
            </div>
          </div>

          {news.contentId && (
            <div className="border-t border-slate-100 pt-6">
              <h2 className="mb-2 text-sm font-bold text-slate-900">Konten Lengkap (ID)</h2>
              <p className="whitespace-pre-line text-sm leading-relaxed text-slate-600">
                {news.contentId}
              </p>
            </div>
          )}

          {news.contentEn && (
            <div className="border-t border-slate-100 pt-6">
              <h2 className="mb-2 text-sm font-bold text-slate-900">Konten Lengkap (EN)</h2>
              <p className="whitespace-pre-line text-sm leading-relaxed text-slate-600">
                {news.contentEn}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 border-t border-slate-100 pt-6 text-sm text-slate-500 sm:grid-cols-3">
            <div>
              <span className="block text-xs font-semibold uppercase text-slate-400">Penulis</span>
              <span className="text-slate-700">{news.author?.name || news.author?.email}</span>
            </div>
            <div>
              <span className="block text-xs font-semibold uppercase text-slate-400">
                Dibuat pada
              </span>
              <span className="text-slate-700">
                {new Date(news.createdAt).toLocaleString('id-ID')}
              </span>
            </div>
            <div>
              <span className="block text-xs font-semibold uppercase text-slate-400">
                Diperbarui
              </span>
              <span className="text-slate-700">
                {new Date(news.updatedAt).toLocaleString('id-ID')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import type { NewsPost } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { newsFallback } from '@/lib/news-data';
import type { NewsFallback } from '@/lib/news-data';

export type NewsItem = NewsFallback;

function mapRow(n: NewsPost, index: number): NewsItem {
  return {
    id: n.id,
    titleId: n.titleId,
    titleEn: n.titleEn,
    summaryId: n.summaryId,
    summaryEn: n.summaryEn,
    contentId: n.contentId,
    contentEn: n.contentEn,
    coverImage: n.coverImage,
    date: n.date.toISOString(),
    slug: n.slug,
    anim: `fade-up delay-${(index + 1) * 100}`,
  };
}

/** Semua berita yang sudah terbit, terbaru lebih dahulu. Fallback ke data statis. */
export async function getAllNews(): Promise<NewsItem[]> {
  try {
    const news = await prisma.newsPost.findMany({
      where: { published: true },
      orderBy: { date: 'desc' },
    });

    if (news.length === 0) return newsFallback;

    return news.map((n, i) => mapRow(n, i));
  } catch {
    return newsFallback;
  }
}

/** Satu berita berdasarkan slug. Mengembalikan null bila tidak ditemukan. */
export async function getNewsBySlug(slug: string): Promise<NewsItem | null> {
  try {
    const news = await prisma.newsPost.findFirst({
      where: { slug, published: true },
    });
    if (news) return mapRow(news, 0);
  } catch {
    // jatuh ke fallback di bawah
  }

  return newsFallback.find((item) => item.slug === slug) ?? null;
}

/** Berita lain sebagai rekomendasi, mengecualikan slug yang sedang dibaca. */
export async function getRelatedNews(slug: string, limit = 3): Promise<NewsItem[]> {
  const all = await getAllNews();
  return all.filter((item) => item.slug !== slug).slice(0, limit);
}

/** Daftar slug berita terbit, untuk generateStaticParams dan sitemap. */
export async function getNewsSlugs(): Promise<string[]> {
  try {
    const news = await prisma.newsPost.findMany({
      where: { published: true },
      select: { slug: true },
      orderBy: { date: 'desc' },
    });
    if (news.length > 0) return news.map((n) => n.slug);
  } catch {
    // jatuh ke fallback di bawah
  }

  return newsFallback.map((item) => item.slug);
}
